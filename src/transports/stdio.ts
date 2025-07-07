import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createFuelMCPServer, type ServerOptions } from "../server.js";
import { log } from "../query.js";

export async function startStdioServer(options: ServerOptions = {}): Promise<void> {
    try {
        log("Creating Fuel MCP server instance...");
        const server = createFuelMCPServer(options);
        
        log("Connecting MCP server via STDIO...");
        const transport = new StdioServerTransport();
        await server.connect(transport);
        
        log("MCP Server connected and ready (repository setup may still be in progress).");
    } catch (error) {
        console.error("Failed to start STDIO MCP server:", error);
        process.exit(1);
    }
}