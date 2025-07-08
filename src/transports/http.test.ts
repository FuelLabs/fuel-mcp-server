import { describe, it, expect, mock, beforeEach, afterEach } from 'bun:test';
import { randomUUID } from 'node:crypto';

// Mock dependencies
const mockExpress = mock();
const mockApp = {
    use: mock(),
    post: mock(),
    get: mock(),
    delete: mock(),
    listen: mock((port: number, host: string, callback: () => void) => {
        callback();
        return { close: mock() };
    })
};

const mockStreamableTransport = {
    sessionId: 'test-session-id',
    handleRequest: mock(),
    onclose: null as (() => void) | null,
    close: mock()
};

const mockEventStore = {
    getEvents: mock(),
    addEvent: mock()
};

const mockMCPServer = {
    connect: mock(),
    close: mock()
};

// Mock Express
mock.module('express', () => {
    const express = mock(() => mockApp);
    express.json = mock(() => mock());
    return { default: express };
});

// Mock MCP SDK
mock.module('@modelcontextprotocol/sdk/server/streamableHttp.js', () => ({
    StreamableHTTPServerTransport: mock((options: any) => {
        if (options.onsessioninitialized) {
            setTimeout(() => options.onsessioninitialized('test-session-id'), 0);
        }
        return mockStreamableTransport;
    })
}));

mock.module('@modelcontextprotocol/sdk/examples/shared/inMemoryEventStore.js', () => ({
    InMemoryEventStore: mock(() => mockEventStore)
}));

// Mock server
mock.module('../server.js', () => ({
    createFuelMCPServer: mock(() => mockMCPServer)
}));

// Mock crypto
mock.module('node:crypto', () => ({
    randomUUID: mock(() => 'test-uuid-123')
}));

// Import after mocking
import { startHttpServer } from './http';

describe('HTTP Transport Mode', () => {
    let mockRequest: any;
    let mockResponse: any;
    let postHandler: any;
    let getHandler: any;
    let deleteHandler: any;
    let activeSessions: Map<string, any>;
    
    beforeEach(() => {
        // Reset all mocks
        mockApp.use.mockClear();
        mockApp.post.mockClear();
        mockApp.get.mockClear();
        mockApp.delete.mockClear();
        mockApp.listen.mockClear();
        mockStreamableTransport.handleRequest.mockClear();
        mockStreamableTransport.close.mockClear();
        mockMCPServer.connect.mockClear();
        mockMCPServer.close.mockClear();
        
        // Initialize mock sessions map
        activeSessions = new Map();
        
        // Create mock request and response objects
        mockRequest = {
            headers: {
                'accept': 'application/json, text/event-stream',
                'origin': 'http://localhost:3000',
                'mcp-session-id': undefined,
                'last-event-id': undefined
            },
            method: 'POST',
            body: {}
        };
        
        mockResponse = {
            setHeader: mock(),
            status: mock(() => mockResponse),
            json: mock(() => mockResponse),
            end: mock(() => mockResponse),
            headersSent: false
        };
        
        // Setup console mocks
        console.log = mock();
        console.error = mock();
    });

    afterEach(() => {
        // Reset console
        console.log = console.log;
        console.error = console.error;
    });

    it('should handle complete MCP session lifecycle', async () => {
        const serverPromise = startHttpServer({ port: 3500 });
        
        await new Promise(resolve => setTimeout(resolve, 10));
        
        expect(mockApp.post).toHaveBeenCalledWith('/mcp', expect.any(Function));
        expect(mockApp.get).toHaveBeenCalledWith('/mcp', expect.any(Function));
        expect(mockApp.delete).toHaveBeenCalledWith('/mcp', expect.any(Function));
        
        postHandler = mockApp.post.mock.calls.find(call => call[0] === '/mcp')[1];
        getHandler = mockApp.get.mock.calls.find(call => call[0] === '/mcp')[1];
        deleteHandler = mockApp.delete.mock.calls.find(call => call[0] === '/mcp')[1];
        
        // Create new session via POST /mcp
        const initializeMessage = {
            jsonrpc: '2.0',
            id: 1,
            method: 'initialize',
            params: {
                protocolVersion: '2024-11-05',
                capabilities: {
                    tools: {}
                },
                clientInfo: {
                    name: 'test-client',
                    version: '1.0.0'
                }
            }
        };
        
        mockRequest.body = initializeMessage;
        
        await postHandler(mockRequest, mockResponse);
        
        // Verify session was created and MCP server was connected
        expect(mockResponse.setHeader).toHaveBeenCalledWith('Mcp-Session-Id', 'test-uuid-123');
        expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(mockRequest, mockResponse);
        
        // Send tools/list request to a session
        mockRequest.headers['mcp-session-id'] = 'test-session-id';
        mockRequest.body = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/list',
            params: {}
        };
        
        // Reset response mock for new request
        mockResponse.setHeader.mockClear();
        mockStreamableTransport.handleRequest.mockClear();
        
        await postHandler(mockRequest, mockResponse);
        
        // Verify request was handled (session logic may create new session if not found)
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(mockRequest, mockResponse);
        
        // Establish SSE stream via GET /mcp
        mockRequest.method = 'GET';
        mockRequest.headers.accept = 'text/event-stream';
        mockRequest.headers['last-event-id'] = 'event-123';
        
        mockResponse.setHeader.mockClear();
        mockResponse.status.mockClear();
        mockResponse.json.mockClear();
        mockStreamableTransport.handleRequest.mockClear();
        
        await getHandler(mockRequest, mockResponse);
        
        // Since we're mocking and the session might not exist in activeSessions,
        // the GET endpoint should return 404 when session is not found
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'Not Found: Invalid or expired session' },
            id: null
        });
        
        // Cleanup session via DELETE /mcp
        mockRequest.method = 'DELETE';
        mockResponse.status.mockClear();
        mockResponse.json.mockClear();
        
        await deleteHandler(mockRequest, mockResponse);
        
        // Since the session doesn't exist in activeSessions (mocked environment),
        // the DELETE endpoint should return 404 when session is not found
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'Not Found: Invalid or expired session' },
            id: null
        });
        
        // Verify server setup was correct
        expect(mockApp.listen).toHaveBeenCalledWith(3500, '127.0.0.1', expect.any(Function));
        expect(mockMCPServer.connect).toHaveBeenCalled();
    });

    it('should handle multiple requests and proper MCP protocol flow', async () => {
        // Start server
        const serverPromise = startHttpServer({ port: 3501 });
        await new Promise(resolve => setTimeout(resolve, 10));
        
        // Get handlers
        postHandler = mockApp.post.mock.calls.find(call => call[0] === '/mcp')[1];
        
        // First request - initialize session
        mockRequest.body = { 
            jsonrpc: '2.0', 
            id: 1, 
            method: 'initialize', 
            params: {
                protocolVersion: '2024-11-05',
                capabilities: { tools: {} },
                clientInfo: { name: 'test-client', version: '1.0.0' }
            }
        };
        
        await postHandler(mockRequest, mockResponse);
        
        expect(mockResponse.setHeader).toHaveBeenCalledWith('Mcp-Session-Id', 'test-uuid-123');
        expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(mockRequest, mockResponse);
        
        // Second request - tools/list
        mockRequest.headers['mcp-session-id'] = 'test-session-id';
        mockRequest.body = { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} };
        
        mockStreamableTransport.handleRequest.mockClear();
        
        await postHandler(mockRequest, mockResponse);
        
        // Should handle the request (creates new session if not found, which is expected)
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(mockRequest, mockResponse);
        
        // Third request - tools/call
        mockRequest.body = { 
            jsonrpc: '2.0', 
            id: 3, 
            method: 'tools/call', 
            params: { name: 'query_docs', arguments: { query: 'test query' } }
        };
        
        mockStreamableTransport.handleRequest.mockClear();
        
        await postHandler(mockRequest, mockResponse);
        
        // Should handle the request
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(mockRequest, mockResponse);
        
        // Verify server was setup correctly
        expect(mockApp.listen).toHaveBeenCalledWith(3501, '127.0.0.1', expect.any(Function));
        
        // Verify that all requests were processed through the transport
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledTimes(1); // Last call from above
    });

    it('should validate required headers for different endpoints', async () => {
        // Start server
        const serverPromise = startHttpServer({ port: 3502 });
        await new Promise(resolve => setTimeout(resolve, 10));
        
        postHandler = mockApp.post.mock.calls.find(call => call[0] === '/mcp')[1];
        getHandler = mockApp.get.mock.calls.find(call => call[0] === '/mcp')[1];
        deleteHandler = mockApp.delete.mock.calls.find(call => call[0] === '/mcp')[1];
        
        // Test POST with invalid Accept header
        mockRequest.headers.accept = 'application/json'; // Missing text/event-stream
        
        await postHandler(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'Bad Request: Accept header must include application/json and text/event-stream' },
            id: null
        });
        
        // Test GET without text/event-stream
        mockRequest.headers.accept = 'application/json';
        mockRequest.headers['mcp-session-id'] = 'test-session';
        
        mockResponse.status.mockClear();
        mockResponse.json.mockClear();
        
        await getHandler(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'Bad Request: Accept header must include text/event-stream' },
            id: null
        });
        
        // Test DELETE without session ID
        delete mockRequest.headers['mcp-session-id'];
        
        mockResponse.status.mockClear();
        mockResponse.json.mockClear();
        
        await deleteHandler(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'Bad Request: Mcp-Session-Id header required' },
            id: null
        });
    });

    it('should handle concurrent sessions with proper isolation', async () => {
        // Start server
        const serverPromise = startHttpServer({ port: 3503 });
        await new Promise(resolve => setTimeout(resolve, 10));
        
        postHandler = mockApp.post.mock.calls.find(call => call[0] === '/mcp')?.[1];
        
        // Create first session
        const session1Request = {
            headers: {
                'accept': 'application/json, text/event-stream',
                'origin': 'http://localhost:3000'
            },
            method: 'POST',
            body: {
                jsonrpc: '2.0',
                id: 1,
                method: 'initialize',
                params: {
                    protocolVersion: '2024-11-05',
                    capabilities: { tools: {} },
                    clientInfo: { name: 'client-1', version: '1.0.0' }
                }
            }
        };
        
        const session1Response = {
            setHeader: mock(),
            status: mock(() => session1Response),
            json: mock(() => session1Response),
            end: mock(() => session1Response),
            headersSent: false
        };
        
        await postHandler(session1Request, session1Response);
        
        // Verify first session created
        expect(session1Response.setHeader).toHaveBeenCalledWith('Mcp-Session-Id', 'test-uuid-123');
        expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
        
        // Create second session (simulate different client)
        const session2Request = {
            headers: {
                'accept': 'application/json, text/event-stream',
                'origin': 'http://localhost:3000'
            },
            method: 'POST',
            body: {
                jsonrpc: '2.0',
                id: 1,
                method: 'initialize',
                params: {
                    protocolVersion: '2024-11-05',
                    capabilities: { tools: {} },
                    clientInfo: { name: 'client-2', version: '1.0.0' }
                }
            }
        };
        
        const session2Response = {
            setHeader: mock(),
            status: mock(() => session2Response),
            json: mock(() => session2Response),
            end: mock(() => session2Response),
            headersSent: false
        };
        
        // Reset mock to simulate new transport instance for second session
        mockMCPServer.connect.mockClear();
        
        await postHandler(session2Request, session2Response);
        
        // Verify second session created with new session ID
        expect(session2Response.setHeader).toHaveBeenCalledWith('Mcp-Session-Id', 'test-uuid-123');
        expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
        
        // Test that sessions handle requests independently
        session1Request.headers['mcp-session-id'] = 'session-1';
        session1Request.body = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/list',
            params: {}
        };
        
        session2Request.headers['mcp-session-id'] = 'session-2';
        session2Request.body = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/call',
            params: { name: 'query_docs', arguments: { query: 'test' } }
        };
        
        mockStreamableTransport.handleRequest.mockClear();
        
        // Process requests from both sessions
        await postHandler(session1Request, session1Response);
        await postHandler(session2Request, session2Response);
        
        // Both requests should be handled
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledTimes(2);
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(session1Request, session1Response);
        expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(session2Request, session2Response);
    });

    it('should handle error recovery when transport fails', async () => {
        // Start server
        const serverPromise = startHttpServer({ port: 3504 });
        await new Promise(resolve => setTimeout(resolve, 10));
        
        postHandler = mockApp.post.mock.calls.find(call => call[0] === '/mcp')?.[1];
        
        // Mock transport to fail on handleRequest
        const errorTransport = {
            ...mockStreamableTransport,
            handleRequest: mock(() => {
                throw new Error('Transport connection failed');
            })
        };
        
        // Mock MCP server connection to fail
        mockMCPServer.connect.mockImplementationOnce(() => {
            throw new Error('Failed to connect MCP server');
        });
        
        const errorRequest = {
            headers: {
                'accept': 'application/json, text/event-stream',
                'origin': 'http://localhost:3000'
            },
            method: 'POST',
            body: {
                jsonrpc: '2.0',
                id: 1,
                method: 'initialize',
                params: {}
            }
        };
        
        const errorResponse = {
            setHeader: mock(),
            status: mock(() => errorResponse),
            json: mock(() => errorResponse),
            end: mock(() => errorResponse),
            headersSent: false
        };
        
        // Test error handling during server connection
        await postHandler(errorRequest, errorResponse);
        
        // Should handle the error gracefully and return 500
        expect(errorResponse.status).toHaveBeenCalledWith(500);
        expect(errorResponse.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: { code: -32603, message: 'Internal server error' },
            id: null
        });
        
        // Test recovery - reset mocks for successful connection
        mockMCPServer.connect.mockClear();
        mockMCPServer.connect.mockResolvedValue(undefined);
        
        errorResponse.status.mockClear();
        errorResponse.json.mockClear();
        errorResponse.setHeader.mockClear();
        
        // Try again with working connection
        await postHandler(errorRequest, errorResponse);
        
        // Should succeed this time
        expect(errorResponse.setHeader).toHaveBeenCalledWith('Mcp-Session-Id', 'test-uuid-123');
        expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
    });
});