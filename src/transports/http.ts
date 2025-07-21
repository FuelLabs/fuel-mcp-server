import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { createFuelMCPServer } from "../server.js";
import { log } from "../query.js";

export interface HttpServerOptions {
  port?: number;
}

export async function startHttpServer(
  options: HttpServerOptions = {}
): Promise<never> {
  const port = options.port || 3500;

  try {
    log("Creating Fuel MCP server instance...");
    const server = createFuelMCPServer();

    const app = express();

    function validateAcceptHeader(
      req: express.Request,
      requiredTypes: string[]
    ): boolean {
      const acceptHeader = req.headers.accept;
      if (!acceptHeader) return false;

      return requiredTypes.every((type) => acceptHeader.includes(type));
    }

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Accept, Last-Event-ID"
      );
      if (req.method === "OPTIONS") {
        return res.status(204).end();
      }
      next();
    });

    app.post("/mcp", async (req, res) => {
      try {
        if (
          !validateAcceptHeader(req, ["application/json", "text/event-stream"])
        ) {
          return res.status(400).json({
            jsonrpc: "2.0",
            error: {
              code: -32000,
              message:
                "Bad Request: Accept header must include application/json and text/event-stream",
            },
            id: null,
          });
        }

        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });

        await server.connect(transport);

        await transport.handleRequest(req, res);
      } catch (error) {
        console.error("Error handling MCP request:", error);
        if (!res.headersSent) {
          res.status(500).json({
            jsonrpc: "2.0",
            error: { code: -32603, message: "Internal server error" },
            id: null,
          });
        }
      }
    });

    app.get("/mcp", async (req, res) => {
      try {
        if (!req.headers.accept?.includes("text/event-stream")) {
          return res.status(400).json({
            jsonrpc: "2.0",
            error: {
              code: -32000,
              message:
                "Bad Request: Accept header must include text/event-stream",
            },
            id: null,
          });
        }

        return res.status(404).json({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message: "Not Found: SSE endpoint disabled for stateless mode",
          },
          id: null,
        });
      } catch (error) {
        console.error("Error handling SSE request:", error);
        if (!res.headersSent) {
          res.status(500).json({
            jsonrpc: "2.0",
            error: { code: -32603, message: "Internal server error" },
            id: null,
          });
        }
      }
    });

    app.delete("/mcp", async (_, res) => {
      return res.status(404).json({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Not Found: Session termination disabled for stateless mode",
        },
        id: null,
      });
    });

    const jsonParser = express.json();
    app.get("/health", jsonParser, (_, res) => {
      const indexPath = "./vectra_index";
      const fs = require("fs");
      
      let indexStatus = "unknown";
      let indexReady = false;
      
      try {
        if (fs.existsSync(indexPath) && fs.existsSync(`${indexPath}/index.json`)) {
          const indexFile = fs.readFileSync(`${indexPath}/index.json`, 'utf8');
          if (indexFile.length > 0) {
            indexStatus = "ready";
            indexReady = true;
          } else {
            indexStatus = "empty";
          }
        } else {
          indexStatus = "missing";
        }
      } catch (error) {
        indexStatus = "error";
      }
      
      res.json({
        status: indexReady ? "ok" : "degraded",
        timestamp: new Date().toISOString(),
        index: {
          status: indexStatus,
          ready: indexReady,
          path: indexPath
        }
      });
    });

    app.use("/mcp", (_, res) => {
      res.status(405).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Method Not Allowed" },
        id: null,
      });
    });

    const httpServer = app.listen(port, "0.0.0.0", () => {
      console.log(`Fuel MCP Server running at http://0.0.0.0:${port}/mcp`);
      console.log(`Health check: http://0.0.0.0:${port}/health`);
    });

    process.on("SIGINT", async () => {
      console.log("\nShutting down HTTP server...");

      httpServer.close(() => console.log("HTTP server shutdown complete"));
      await server.close();
      process.exit(0);
    });

    return new Promise(() => {});
  } catch (error) {
    console.error("Failed to start HTTP server:", error);
    process.exit(1);
  }
}
