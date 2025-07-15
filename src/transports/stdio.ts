import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createFuelMCPServer } from "../server.js";
import { log } from "../query.js";

export async function startStdioServer(): Promise<void> {
  try {
    log("Creating Fuel MCP server instance...");
    const server = createFuelMCPServer();

    log("Connecting MCP server via STDIO...");
    const transport = new StdioServerTransport();
    await server.connect(transport);

    log("MCP Server connected and ready.");
  } catch (error) {
    console.error("Failed to start STDIO MCP server:", error);
    process.exit(1);
  }
}
