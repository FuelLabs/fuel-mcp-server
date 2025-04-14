import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryDocs } from "./query.js"; // Adjust path if necessary
import { env } from '@xenova/transformers';

// Disable local cache for transformers.js models, needed by queryDocs dependencies
env.cacheDir = '';

const server = new McpServer({
  name: "FuelMCPServer",
  version: "0.1.0"
});

// Define the search tool
server.tool(
  "searchFuelDocs",
  {
    query: z.string().describe("The search query for Fuel documentation."),
    collectionName: z.string().optional().describe("Optional: Specify the ChromaDB collection name."),
    modelName: z.string().optional().describe("Optional: Specify the embedding model name."),
    nResults: z.number().int().positive().optional().describe("Optional: Specify the number of search results (default 5).")
  },
  async ({ query, collectionName, modelName, nResults }) => {
    console.log(`MCP Tool 'searchFuelDocs' called with query: "${query}"`);
    try {
      // Call the existing query function
      const results = await queryDocs(
        query,
        collectionName, // Will use default if undefined
        modelName,      // Will use default if undefined
        nResults        // Will use default if undefined
      );

      // Format results for MCP response
      // Assuming results contain 'documents', 'metadatas', 'distances' arrays
      const formattedResults = results?.documents?.[0]?.map((doc: string, index: number) => {
        const metadata = results.metadatas?.[0]?.[index] || {};
        const distance = results.distances?.[0]?.[index];
        const source = metadata.source || 'unknown'; // Extract source from metadata if available
        return `Source: ${source}\nDistance: ${distance?.toFixed(4)}\nContent:\n${doc}\n---`;
      }).join('\n\n') || JSON.stringify(results, null, 2); // Fallback to JSON if format is unexpected


      return {
        content: [{
          type: "text",
          text: `Search Results for "${query}":\n\n${formattedResults}`
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      console.error(`Error in searchFuelDocs tool: ${error.message}`);
      return {
        content: [{
          type: "text",
          text: `Error executing search: ${error.message}`
        }],
        isError: true // Indicate that an error occurred
      };
    }
  }
);

// Start the server using Stdio transport
async function startServer() {
  try {
    const transport = new StdioServerTransport();
    console.log("Connecting MCP server via stdio...");
    await server.connect(transport);
    console.log("MCP Server connected and ready.");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

startServer(); 