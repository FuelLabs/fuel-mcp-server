import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { registerDocTools } from "./docs/query.js";
import { registerBlockchainTools } from "./ignition/tools.js";
import { env } from '@xenova/transformers';

// Disable local cache for transformers.js models
env.cacheDir = '';

/**
 * Create and configure a new Fuel MCP server
 */
export function createServer() {
  // Get package.json version
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  /**
   * Main Fuel MCP Server
   * 
   * Provides access to Fuel documentation and blockchain tools through the
   * Model Context Protocol
   */
  const server = new McpServer({
    name: "fuel",
    version: packageJson.version,
    description: "Fuel Network MCP Server for documentation search and blockchain interaction"
  });

  // Register documentation tools
  registerDocTools(server);
  
  // Register blockchain tools
  registerBlockchainTools(server);

  return server;
}

/**
 * Connect and start the MCP server
 */
export async function startServer(server: McpServer, transport: StdioServerTransport) {
  console.error("Fuel MCP Server starting...");

  try {
    await server.connect(transport);
    console.error("Fuel MCP Server running on stdio");

    // Keep the process running
    process.on('SIGINT', () => {
      console.error("Server shutting down...");
      process.exit(0);
    });
    
    return true;
  } catch (error) {
    console.error("Failed to start server:", error);
    return false;
  }
}

/**
 * Main entry point
 */
async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  
  const success = await startServer(server, transport);
  if (!success) {
    process.exit(1);
  }
}

// Only run the main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}

// Export main for testing
export { main };
