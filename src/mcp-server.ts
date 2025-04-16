#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryDocs, log } from "./query"; // Adjust path if necessary
import { env } from '@xenova/transformers';
import { spawn } from 'child_process';
import net from 'net';
import { promises as fs } from 'fs';

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
    log(`MCP Tool 'searchFuelDocs' called with query: "${query}"`);
    
    // Ensure Qdrant is running *before* executing the query logic
    await ensureQdrantIsRunning(); 

    const executeQuery = async () => {
      return await queryDocs(
        query,
        collectionName, // Will use default if undefined
        modelName,      // Will use default if undefined
        nResults        // Will use default if undefined
      );
    };

    try {
      // First attempt
      const results = await executeQuery();

      // Format results for MCP response
      // Assuming results is an array of Qdrant point objects like:
      // [{ id: '...', score: 0.9, payload: { content: '...', source: '...' } }, ...]
      const formattedResults = Array.isArray(results)
        ? results.map((hit: any) => {
            const payload = hit.payload || {};
            const score = hit.score;
            const content = payload.content || 'No content found'; // Adjust 'content' key if needed based on indexing
            const source = payload.source || 'unknown'; // Adjust 'source' key if needed
            return `Source: ${source}\\nScore: ${score?.toFixed(4)}\\nContent:\\n${content}\\n---`;
          }).join('\\n\\n')
        : JSON.stringify(results, null, 2); // Fallback if format is unexpected

      return {
        content: [{
          type: "text",
          text: `Search Results for "${query}":\\n\\n${formattedResults}`
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      console.error(`Initial error in searchFuelDocs tool: ${error.message}`);

      // Check if it's a connection error and attempt restart/retry
      if (error.message.includes("Unable to connect")) {
        log("Qdrant connection error detected. Attempting to ensure Qdrant is running...");
        try {
          await ensureQdrantIsRunning();
          // Wait a bit for Qdrant to potentially start up
          log("Waiting 5 seconds for Qdrant to initialize...");
          await new Promise(resolve => setTimeout(resolve, 5000)); 
          
          log("Retrying queryDocs call...");
          const results = await executeQuery(); // Retry the query

          // Format results again after successful retry
           const formattedResults = Array.isArray(results)
            ? results.map((hit: any) => {
                const payload = hit.payload || {};
                const score = hit.score;
                const content = payload.content || 'No content found'; 
                const source = payload.source || 'unknown';
                return `Source: ${source}\\nScore: ${score?.toFixed(4)}\\nContent:\\n${content}\\n---`;
              }).join('\\n\\n')
            : JSON.stringify(results, null, 2);

          return {
            content: [{
              type: "text",
              text: `Search Results for "${query}" (after retry):\\n\\n${formattedResults}`
            }]
          };
        } catch (retryErr: unknown) {
          const retryError = retryErr as Error;
          console.error(`Error in searchFuelDocs tool after retry: ${retryError.message}`);
          // If retry fails, return the retry error message
          return {
            content: [{
              type: "text",
              text: `Error executing search after retry: ${retryError.message}`
            }],
            isError: true // Indicate that an error occurred
          };
        }
      } else {
        // If it wasn't a connection error, return the original error message
         return {
          content: [{
            type: "text",
            text: `Error executing search: ${error.message}`
          }],
          isError: true // Indicate that an error occurred
        };
      }
    }
  }
);

// Start the server using Stdio transport
async function startServer() {
  try {
    await ensureQdrantIsRunning();
    const transport = new StdioServerTransport();
    log("Connecting MCP server via stdio...");
    await server.connect(transport);
    log("MCP Server connected and ready.");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

// Start the server directly
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

  // List files in the current directory
  try {
    const files = await fs.readdir(process.cwd()); // Get files in the current working directory
    log(`Files in ${process.cwd()}:
 ${files.join('\n ')}`); // Log the files, ensuring newline separation
  } catch (err) {
    console.error('Error reading directory:', err);
  }

  if (isRunning) {
    log(`Port ${qdrantPort} is already in use. Assuming Qdrant is running.`);
    return;
  }

  log('Qdrant not detected, attempting to start via Docker...');
  const dockerCommand = 'docker';
  const dockerArgs = [
    'run',
    '-p',
    `${qdrantPort}:${qdrantPort}`,
    '-v',
    `${process.cwd()}/fuel-mcp-server/qdrant_storage:/qdrant/storage`,
    'qdrant/qdrant',
  ];

  try {
    const qdrantProcess = spawn(dockerCommand, dockerArgs, {
      detached: true, // Run in background
      stdio: 'ignore'   // Detach stdio
    });
    qdrantProcess.unref(); // Allow parent process to exit independently
    log('Qdrant Docker container started in the background.');
  } catch (error) {
    console.error('Failed to start Qdrant Docker container:', error);
    // Decide if you want to exit the process or continue without Qdrant
    // process.exit(1);
  }
} 