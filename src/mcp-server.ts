#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryDocs, log } from "./query"; // Adjust path if necessary
import { env } from '@xenova/transformers';
import { spawn, exec } from 'child_process';
import net from 'net';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { promisify } from 'util';

// Promisify exec for easier async/await usage
const execAsync = promisify(exec);

// --- Argument Parsing ---
let localRepoPath: string | undefined = undefined;
const repoArgIndex = process.argv.indexOf('--repo');
if (repoArgIndex > -1 && process.argv.length > repoArgIndex + 1) {
    const providedPath = process.argv[repoArgIndex + 1];
    // Ensure providedPath exists before using it
    if (providedPath && path.isAbsolute(providedPath)) {
        localRepoPath = providedPath;
        log(`Using local repository path from --repo argument: ${localRepoPath}`);
    } else if (providedPath) { // If path provided but not absolute
        console.warn(`Warning: Provided --repo path "${providedPath}" is not absolute. Ignoring --repo argument. Please provide an absolute path.`);
        // Optionally, exit here:
        // console.error("Error: --repo path must be absolute.");
        // process.exit(1);
    } else { // If --repo was the last argument
         console.warn(`Warning: Missing path argument after --repo. Ignoring --repo flag.`);
    }
}
// --- End Argument Parsing ---

// Disable local cache for transformers.js models, needed by queryDocs dependencies
env.cacheDir = '';

// Promise to track Qdrant readiness (clone + docker start)
let qdrantReadyPromise: Promise<void> | null = null;

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
    
    // --- Wait for Qdrant to be ready before proceeding ---
    if (!qdrantReadyPromise) {
       log("Error: Qdrant initialization was not started.");
       return {
         content: [{ type: "text", text: "Error: Qdrant initialization process not found." }],
         isError: true
       };
    }
    try {
        log("Waiting for Qdrant readiness...");
        await qdrantReadyPromise;
        log("Qdrant is ready. Proceeding with query.");
    } catch (initError: any) {
        log(`Error during Qdrant initialization: ${initError?.message}`);
        console.error("Qdrant initialization failed:", initError);
         return {
           content: [{ type: "text", text: `Error waiting for Qdrant initialization: ${initError?.message}` }],
           isError: true
         };
    }
    // --- End Qdrant Readiness Check ---

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
      console.error(`Error in searchFuelDocs tool: ${error.message}`);
      // No need for the connection retry logic here anymore,
      // as qdrantReadyPromise should handle ensuring it's running.
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
    // Initiate Qdrant check/startup in the background, pass localRepoPath
    ensureQdrantIsRunning(localRepoPath);
    log("Initiated Qdrant check/startup in background.");

    const transport = new StdioServerTransport();
    log("Connecting MCP server via stdio...");
    // Connect should now happen quickly without being blocked by clone/docker
    await server.connect(transport);
    log("MCP Server connected and ready (Qdrant initialization may still be in progress).");
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
      resolve(err.code === 'EADDRINUSE');
    });
    server.once('listening', () => {
      server.close(() => resolve(false));
    });
    server.listen(port);
  });
}

// Function to ensure Qdrant is running (Modified for async operation and local repo)
function ensureQdrantIsRunning(localRepoPath?: string) {
    // Create the promise that the tool will wait on.
    // This entire async IIFE is assigned to qdrantReadyPromise
    qdrantReadyPromise = (async () => {
        const qdrantPort = 6333;
        const tempRepoPath = path.join(os.tmpdir(), 'fuel-mcp-server');
        let needsSetup = false; // Use this flag to determine if clone/copy is needed
        let tmpDirDidExist = false;

        log(`Checking for Fuel MCP server setup at: ${tempRepoPath}`);
        try {
            await fs.access(tempRepoPath);
            tmpDirDidExist = true;
            log(`Directory ${tempRepoPath} already exists. Skipping repository setup.`);
        } catch (error) {
            log(`Directory ${tempRepoPath} not found. Repository setup required.`);
            needsSetup = true;
            // Try creating the temp directory needed for copy/clone
            try {
                await fs.mkdir(tempRepoPath, { recursive: true });
                log(`Created temporary directory: ${tempRepoPath}`);
            } catch (mkdirError) {
                 console.error(`Failed to create temporary directory ${tempRepoPath}:`, mkdirError);
                 throw new Error(`Failed to create temporary directory ${tempRepoPath}`);
            }
        }

        if (needsSetup) {
            const startTime = Date.now();
            if (localRepoPath && !tmpDirDidExist) {
                // --- Copy local repo ---
                log(`Using local repository path provided: ${localRepoPath}`);
                try {
                    // Check if source exists before attempting copy
                    await fs.access(localRepoPath);
                    log(`Copying repository from ${localRepoPath} to ${tempRepoPath}...`);
                    // Use fs.cp for recursive copying (Requires Node.js >= 16.7.0)
                    await fs.cp(localRepoPath, tempRepoPath, { recursive: true });
                    const duration = Date.now() - startTime;
                    log(`Repository copied successfully from local path to ${tempRepoPath} in ${duration}ms`);
                } catch (copyError: any) {
                    console.error(`Failed to access or copy local repository from ${localRepoPath}: ${copyError.message}`);
                    // Attempt to clean up partially created directory
                    try { await fs.rm(tempRepoPath, { recursive: true, force: true }); } catch (_) {}
                    throw new Error(`Failed to setup repository from local path ${localRepoPath}`); // Reject the promise
                }
            } else {
                // --- Clone from GitHub ---
                log(`Cloning repository (shallow clone) from GitHub into ${tempRepoPath}...`);
                try {
                    await execAsync(`git clone --depth 1 https://github.com/FuelLabs/fuel-mcp-server ${tempRepoPath}`);
                    const duration = Date.now() - startTime;
                    log(`Repository cloned successfully to ${tempRepoPath} in ${duration}ms`);
                } catch (cloneError) {
                    console.error(`Failed to clone repository: ${cloneError}`);
                     // Attempt to clean up partially created directory
                    try { await fs.rm(tempRepoPath, { recursive: true, force: true }); } catch (_) {}
                    throw new Error(`Failed to clone repository into ${tempRepoPath}`); // Reject the promise
                }
            }
        }
        // If needsSetup was false, we skip cloning/copying entirely

        // --- Start Qdrant Docker ---
        const isRunning = await isPortInUse(qdrantPort);
        if (isRunning) {
            log(`Port ${qdrantPort} is already in use. Assuming Qdrant is running.`);
            return; // Qdrant already running, promise resolves
        }

        log('Qdrant not detected, attempting to start via Docker...');
        const dockerCommand = 'docker';
        const volumeMountPath = `${tempRepoPath}/qdrant_storage:/qdrant/storage`;
        log(`Using volume mount: ${volumeMountPath}`);
        const dockerArgs = [
            'run', '-p', `${qdrantPort}:${qdrantPort}`, '-v', volumeMountPath,
            // Add --rm so the container is removed when stopped (optional but good practice)
            '--rm',
            // Give the container a name for easier management (optional)
            '--name', 'fuel-mcp-qdrant',
            'qdrant/qdrant',
        ];

        try {
            log('Attempting to start Qdrant Docker container...');
            // Spawn remains suitable for detached processes
            const qdrantProcess = spawn(dockerCommand, dockerArgs, {
                detached: true,
                stdio: 'ignore'
            });
            qdrantProcess.unref();
            log('Qdrant Docker container start command issued.');

            // --- Add a simple readiness check ---
            // Wait a few seconds and check the port again
            log('Waiting 5 seconds for Qdrant container to initialize...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            const isNowRunning = await isPortInUse(qdrantPort);
            if (isNowRunning) {
                log('Qdrant container appears to be running.');
            } else {
                 log('Warning: Qdrant container did not become available on port 6333 after 5 seconds.');
                 // Consider throwing an error here if Qdrant is strictly required
                 // throw new Error('Qdrant container failed to start.');
            }
            // --- End readiness check ---

        } catch (dockerError) {
            console.error('Failed to start Qdrant Docker container:', dockerError);
            throw new Error('Failed to start Qdrant Docker container'); // Reject the promise
        }
    })(); // Immediately invoke the async IIFE

    // Handle unhandled rejections for the promise globally (optional but good practice)
    qdrantReadyPromise?.catch(error => {
        console.error("Unhandled error during Qdrant initialization:", error);
        // Potentially exit or signal critical failure
    });
} 