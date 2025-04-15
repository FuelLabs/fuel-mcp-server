#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryDocs } from "./query"; // Adjust path if necessary
import { env } from '@xenova/transformers';
import { spawn } from 'child_process';
import net from 'net';

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
    query: z.string().describe("The search query for Fuel and Sway documentation."),
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
      // Assuming results is an array of Qdrant point objects like:
      // [{ id: '...', score: 0.9, payload: { content: '...', source: '...' } }, ...]
      const formattedResults = Array.isArray(results)
        ? results.map((hit: any) => {
            const payload = hit.payload || {};
            const score = hit.score;
            const content = payload.content || 'No content found'; // Adjust 'content' key if needed based on indexing
            const source = payload.source || 'unknown'; // Adjust 'source' key if needed
            return `Source: ${source}\nScore: ${score?.toFixed(4)}\nContent:\n${content}\n---`;
          }).join('\n\n')
        : JSON.stringify(results, null, 2); // Fallback if format is unexpected

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

// Function to check if a port is in use
function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is already in use
      } else {
        // Ignore other errors (like permission errors)
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close(() => {
        resolve(false); // Port is free
      });
    });
    server.listen(port);
  });
}

// Function to ensure Qdrant is running
async function ensureQdrantIsRunning() {
  const qdrantPort = 6333;
  const isRunning = await isPortInUse(qdrantPort);

  if (isRunning) {
    console.log(`Port ${qdrantPort} is already in use. Assuming Qdrant is running.`);
    return;
  }

  console.log('Qdrant not detected, attempting to start via Docker...');
  const dockerCommand = 'docker';
  const dockerArgs = [
    'run',
    '-p',
    `${qdrantPort}:${qdrantPort}`,
    '-v',
    `${process.cwd()}/qdrant_storage:/qdrant/storage`,
    'qdrant/qdrant'
  ];

  try {
    const qdrantProcess = spawn(dockerCommand, dockerArgs, {
      detached: true, // Run in background
      stdio: 'ignore'   // Detach stdio
    });
    qdrantProcess.unref(); // Allow parent process to exit independently
    console.log('Qdrant Docker container started in the background.');
  } catch (error) {
    console.error('Failed to start Qdrant Docker container:', error);
    // Decide if you want to exit the process or continue without Qdrant
    // process.exit(1);
  }
}

// Ensure Qdrant is running before starting the server
ensureQdrantIsRunning().then(() => {
  startServer();
}); 