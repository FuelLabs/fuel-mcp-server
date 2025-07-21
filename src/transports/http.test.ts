import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";

const mockApp = {
  use: mock(),
  post: mock(),
  get: mock(),
  delete: mock(),
  listen: mock((_port: number, _host: string, callback: () => void) => {
    callback();
    return { close: mock() };
  }),
};

const mockStreamableTransport = {
  handleRequest: mock(),
  close: mock(),
};

const mockMCPServer = {
  connect: mock(),
  close: mock(),
};

mock.module("express", () => {
  const express = mock(() => mockApp);
  (express as any).json = mock(() => mock());
  return { default: express };
});

mock.module("@modelcontextprotocol/sdk/server/streamableHttp.js", () => ({
  StreamableHTTPServerTransport: mock(() => mockStreamableTransport),
}));

mock.module("../server.js", () => ({
  createFuelMCPServer: mock(() => mockMCPServer),
}));

import { startHttpServer } from "./http";

describe("HTTP Transport Mode", () => {
  let mockRequest: any;
  let mockResponse: any;
  let postHandler: any;
  let getHandler: any;
  let deleteHandler: any;

  beforeEach(() => {
    mockApp.use.mockClear();
    mockApp.post.mockClear();
    mockApp.get.mockClear();
    mockApp.delete.mockClear();
    mockApp.listen.mockClear();
    mockStreamableTransport.handleRequest.mockClear();
    mockStreamableTransport.close.mockClear();
    mockMCPServer.connect.mockClear();
    mockMCPServer.close.mockClear();

    mockRequest = {
      headers: {
        accept: "application/json, text/event-stream",
        origin: "http://localhost:3000",
        "last-event-id": undefined,
      },
      method: "POST",
      body: {},
    };

    mockResponse = {
      setHeader: mock(),
      status: mock(() => mockResponse),
      json: mock(() => mockResponse),
      end: mock(() => mockResponse),
      headersSent: false,
    };

    console.log = mock();
    console.error = mock();
  });

  afterEach(() => {
    console.log = console.log;
    console.error = console.error;
  });

  it("should handle stateless MCP requests", async () => {
    startHttpServer({ port: 3500 });

    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(mockApp.post).toHaveBeenCalledWith("/mcp", expect.any(Function));
    expect(mockApp.get).toHaveBeenCalledWith("/mcp", expect.any(Function));
    expect(mockApp.delete).toHaveBeenCalledWith("/mcp", expect.any(Function));

    postHandler = mockApp.post.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];
    getHandler = mockApp.get.mock.calls.find((call) => call[0] === "/mcp")![1];
    deleteHandler = mockApp.delete.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];

    const initializeMessage = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
        },
        clientInfo: {
          name: "test-client",
          version: "1.0.0",
        },
      },
    };

    mockRequest.body = initializeMessage;

    await postHandler(mockRequest, mockResponse);

    expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      mockRequest,
      mockResponse
    );

    mockRequest.body = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {},
    };

    mockStreamableTransport.handleRequest.mockClear();

    await postHandler(mockRequest, mockResponse);

    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      mockRequest,
      mockResponse
    );

    mockRequest.method = "GET";
    mockRequest.headers.accept = "text/event-stream";

    mockResponse.status.mockClear();
    mockResponse.json.mockClear();
    mockStreamableTransport.handleRequest.mockClear();

    await getHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Not Found: SSE endpoint disabled for stateless mode",
      },
      id: null,
    });

    mockRequest.method = "DELETE";
    mockResponse.status.mockClear();
    mockResponse.json.mockClear();

    await deleteHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Not Found: Session termination disabled for stateless mode",
      },
      id: null,
    });

    expect(mockApp.listen).toHaveBeenCalledWith(
      3500,
      "0.0.0.0",
      expect.any(Function)
    );
    expect(mockMCPServer.connect).toHaveBeenCalled();
  });

  it("should handle multiple stateless requests", async () => {
    startHttpServer({ port: 3501 });
    await new Promise((resolve) => setTimeout(resolve, 10));

    postHandler = mockApp.post.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];

    mockRequest.body = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    };

    await postHandler(mockRequest, mockResponse);

    expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      mockRequest,
      mockResponse
    );

    mockRequest.body = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {},
    };

    mockStreamableTransport.handleRequest.mockClear();

    await postHandler(mockRequest, mockResponse);

    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      mockRequest,
      mockResponse
    );

    mockRequest.body = {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "query_docs", arguments: { query: "test query" } },
    };

    mockStreamableTransport.handleRequest.mockClear();

    await postHandler(mockRequest, mockResponse);

    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      mockRequest,
      mockResponse
    );

    expect(mockApp.listen).toHaveBeenCalledWith(
      3501,
      "0.0.0.0",
      expect.any(Function)
    );

    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledTimes(1);
  });

  it("should validate required headers for different endpoints", async () => {
    startHttpServer({ port: 3502 });
    await new Promise((resolve) => setTimeout(resolve, 10));

    postHandler = mockApp.post.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];
    getHandler = mockApp.get.mock.calls.find((call) => call[0] === "/mcp")![1];
    deleteHandler = mockApp.delete.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];

    mockRequest.headers.accept = "application/json";

    await postHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message:
          "Bad Request: Accept header must include application/json and text/event-stream",
      },
      id: null,
    });

    mockRequest.headers.accept = "application/json";

    mockResponse.status.mockClear();
    mockResponse.json.mockClear();

    await getHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Bad Request: Accept header must include text/event-stream",
      },
      id: null,
    });

    mockResponse.status.mockClear();
    mockResponse.json.mockClear();

    await deleteHandler(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Not Found: Session termination disabled for stateless mode",
      },
      id: null,
    });
  });

  it("should handle concurrent stateless requests", async () => {
    startHttpServer({ port: 3503 });
    await new Promise((resolve) => setTimeout(resolve, 10));

    postHandler = mockApp.post.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];

    const request1 = {
      headers: {
        accept: "application/json, text/event-stream",
        origin: "http://localhost:3000",
      },
      method: "POST",
      body: {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          clientInfo: { name: "client-1", version: "1.0.0" },
        },
      },
    };

    const response1 = {
      setHeader: mock(),
      status: mock(() => response1),
      json: mock(() => response1),
      end: mock(() => response1),
      headersSent: false,
    };

    await postHandler(request1, response1);

    expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);

    const request2 = {
      headers: {
        accept: "application/json, text/event-stream",
        origin: "http://localhost:3000",
      },
      method: "POST",
      body: {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {},
      },
    };

    const response2 = {
      setHeader: mock(),
      status: mock(() => response2),
      json: mock(() => response2),
      end: mock(() => response2),
      headersSent: false,
    };

    mockMCPServer.connect.mockClear();

    await postHandler(request2, response2);

    expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);

    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledTimes(2);
    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      request1,
      response1
    );
    expect(mockStreamableTransport.handleRequest).toHaveBeenCalledWith(
      request2,
      response2
    );
  });

  it("should handle error recovery when transport fails", async () => {
    startHttpServer({ port: 3504 });
    await new Promise((resolve) => setTimeout(resolve, 10));

    postHandler = mockApp.post.mock.calls.find(
      (call) => call[0] === "/mcp"
    )![1];

    mockMCPServer.connect.mockImplementationOnce(() => {
      throw new Error("Failed to connect MCP server");
    });

    const errorRequest = {
      headers: {
        accept: "application/json, text/event-stream",
        origin: "http://localhost:3000",
      },
      method: "POST",
      body: {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {},
      },
    };

    const errorResponse = {
      setHeader: mock(),
      status: mock(() => errorResponse),
      json: mock(() => errorResponse),
      end: mock(() => errorResponse),
      headersSent: false,
    };

    await postHandler(errorRequest, errorResponse);

    expect(errorResponse.status).toHaveBeenCalledWith(500);
    expect(errorResponse.json).toHaveBeenCalledWith({
      jsonrpc: "2.0",
      error: { code: -32603, message: "Internal server error" },
      id: null,
    });

    mockMCPServer.connect.mockClear();
    mockMCPServer.connect.mockResolvedValue(undefined);

    errorResponse.status.mockClear();
    errorResponse.json.mockClear();
    errorResponse.setHeader.mockClear();

    await postHandler(errorRequest, errorResponse);

    expect(mockMCPServer.connect).toHaveBeenCalledWith(mockStreamableTransport);
  });
});
