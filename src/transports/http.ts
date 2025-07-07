import { randomUUID } from 'node:crypto';
import { InMemoryEventStore } from '@modelcontextprotocol/sdk/examples/shared/inMemoryEventStore.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { createFuelMCPServer, type ServerOptions } from "../server.js";
import { log } from "../query.js";

export interface HttpServerOptions extends ServerOptions {
    port?: number;
}

export async function startHttpServer(options: HttpServerOptions = {}): Promise<never> {
    const port = options.port || 3500;
    
    try {
        log("Creating Fuel MCP server instance...");
        const server = createFuelMCPServer(options);
        
        const app = express();
        
        const activeSessions = new Map<string, {
            transport: StreamableHTTPServerTransport;
            createdAt: number;
        }>();

        function validateAcceptHeader(req: express.Request, requiredTypes: string[]): boolean {
            const acceptHeader = req.headers.accept;
            if (!acceptHeader) return false;
            
            return requiredTypes.every(type => acceptHeader.includes(type));
        }

        function validateOriginHeader(req: express.Request): boolean {
            const origin = req.headers.origin;
            if (!origin) return true;
            
            const allowedOrigins = [
                'http://localhost',
                'http://127.0.0.1',
            ];
            
            return allowedOrigins.some(allowed => origin.startsWith(allowed));
        }

        app.use((req, res, next) => {
            if (!validateOriginHeader(req)) {
                return res.status(403).json({
                    jsonrpc: '2.0',
                    error: { code: -32000, message: 'Forbidden: Invalid origin' },
                    id: null
                });
            }
            next();
        });

        // CORS setup
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Mcp-Session-Id, Accept, Last-Event-ID');
            if (req.method === 'OPTIONS') {
                return res.status(204).end();
            }
            next();
        });

        app.post('/mcp', async (req, res) => {
            try {
                if (!validateAcceptHeader(req, ['application/json', 'text/event-stream'])) {
                    return res.status(400).json({
                        jsonrpc: '2.0',
                        error: { code: -32000, message: 'Bad Request: Accept header must include application/json and text/event-stream' },
                        id: null
                    });
                }

                const sessionId = req.headers['mcp-session-id'] as string | undefined;
                let transport: StreamableHTTPServerTransport;

                if (sessionId && activeSessions.has(sessionId)) {
                    transport = activeSessions.get(sessionId)!.transport;
                } else {
                    const newSessionId = randomUUID();
                    const eventStore = new InMemoryEventStore();
                    
                    transport = new StreamableHTTPServerTransport({
                        sessionIdGenerator: () => newSessionId,
                        eventStore,
                        onsessioninitialized: (id) => {
                            activeSessions.set(id, {
                                transport,
                                createdAt: Date.now()
                            });
                            log(`Session ${id} initialized`);
                        },
                    });

                    transport.onclose = () => {
                        if (transport.sessionId) {
                            activeSessions.delete(transport.sessionId);
                            log(`Session ${transport.sessionId} closed`);
                        }
                    };

                    await server.connect(transport);
                    res.setHeader('Mcp-Session-Id', newSessionId);
                }

                await transport.handleRequest(req, res);

            } catch (error) {
                console.error('Error handling MCP request:', error);
                if (!res.headersSent) {
                    res.status(500).json({
                        jsonrpc: '2.0',
                        error: { code: -32603, message: 'Internal server error' },
                        id: null
                    });
                }
            }
        });

        app.get('/mcp', async (req, res) => {
            try {
                if (!req.headers.accept?.includes('text/event-stream')) {
                    return res.status(400).json({
                        jsonrpc: '2.0',
                        error: { code: -32000, message: 'Bad Request: Accept header must include text/event-stream' },
                        id: null
                    });
                }

                const sessionId = req.headers['mcp-session-id'] as string | undefined;
                const lastEventId = req.headers['last-event-id'] as string | undefined;
                
                if (!sessionId) {
                    return res.status(400).json({
                        jsonrpc: '2.0',
                        error: { code: -32000, message: 'Bad Request: Mcp-Session-Id header required' },
                        id: null
                    });
                }

                const session = activeSessions.get(sessionId);
                if (!session) {
                    return res.status(404).json({
                        jsonrpc: '2.0',
                        error: { code: -32000, message: 'Not Found: Invalid or expired session' },
                        id: null
                    });
                }

                res.setHeader('Content-Type', 'text/event-stream');
                
                if (lastEventId) {
                    log(`Resuming SSE stream from event ID: ${lastEventId}`);
                }

                await session.transport.handleRequest(req, res);
            } catch (error) {
                console.error('Error handling SSE request:', error);
                if (!res.headersSent) {
                    res.status(500).json({
                        jsonrpc: '2.0',
                        error: { code: -32603, message: 'Internal server error' },
                        id: null
                    });
                }
            }
        });

        // Session termination
        app.delete('/mcp', async (req, res) => {
            const sessionId = req.headers['mcp-session-id'] as string | undefined;
            
            if (!sessionId) {
                return res.status(400).json({
                    jsonrpc: '2.0',
                    error: { code: -32000, message: 'Bad Request: Mcp-Session-Id header required' },
                    id: null
                });
            }

            const session = activeSessions.get(sessionId);
            if (!session) {
                return res.status(404).json({
                    jsonrpc: '2.0',
                    error: { code: -32000, message: 'Not Found: Invalid or expired session' },
                    id: null
                });
            }

            try {
                await session.transport.close();
                activeSessions.delete(sessionId);
                log(`Session ${sessionId} terminated by client`);
                res.status(200).json({ message: 'Session terminated' });
            } catch (error) {
                console.error(`Error terminating session ${sessionId}:`, error);
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: { code: -32603, message: 'Internal server error' },
                    id: null
                });
            }
        });

        const jsonParser = express.json();
        app.get('/health', jsonParser, (_, res) => {
            res.json({ 
                status: 'ok', 
                timestamp: new Date().toISOString(),
                activeSessions: activeSessions.size
            });
        });

        app.use('/mcp', (_, res) => {
            res.status(405).json({
                jsonrpc: '2.0',
                error: { code: -32000, message: 'Method Not Allowed' },
                id: null
            });
        });

        const httpServer = app.listen(port, '127.0.0.1', () => {
            console.log(`Fuel MCP Server running at http://127.0.0.1:${port}/mcp`);
            console.log(`Health check: http://127.0.0.1:${port}/health`);
        });

        process.on('SIGINT', async () => {
            console.log('\nShutting down HTTP server...');
            
            for (const [sessionId, session] of activeSessions.entries()) {
                try {
                    await session.transport.close();
                    activeSessions.delete(sessionId);
                } catch (error) {
                    console.error(`Error closing session ${sessionId}:`, error);
                }
            }

            httpServer.close(() => console.log('HTTP server shutdown complete'));
            await server.close();
            process.exit(0);
        });

        setInterval(() => {
            const now = Date.now();
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours
            
            for (const [sessionId, session] of activeSessions.entries()) {
                if (now - session.createdAt > maxAge) {
                    session.transport.close().catch(console.error);
                    activeSessions.delete(sessionId);
                    log(`Session ${sessionId} expired and removed`);
                }
            }
        }, 60 * 60 * 1000); // Check every hour

        return new Promise(() => {});
    } catch (error) {
        console.error("Failed to start HTTP server:", error);
        process.exit(1);
    }
}