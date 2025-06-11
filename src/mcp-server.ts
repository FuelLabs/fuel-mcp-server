#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryDocs, log } from "./query"; // Adjust path if necessary
import { env } from '@xenova/transformers';
import { spawn, exec } from 'child_process';
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
    } else { // If --repo was the last argument
         console.warn(`Warning: Missing path argument after --repo. Ignoring --repo flag.`);
    }
}
// --- End Argument Parsing ---

// Disable local cache for transformers.js models, needed by queryDocs dependencies
env.cacheDir = '';

// Promise to track repository setup readiness
let repoReadyPromise: Promise<void> | null = null;

const server = new McpServer({
  name: "FuelMCPServer",
  version: "0.1.0"
});

// Define the search tool
server.tool(
  "searchFuelDocs",
  {
    query: z.string().describe("The search query for Fuel and Sway documentation."),
    indexPath: z.string().optional().describe("Optional: Specify the Vectra index path."),
    modelName: z.string().optional().describe("Optional: Specify the embedding model name."),
    nResults: z.number().int().positive().optional().describe("Optional: Specify the number of search results (default 5).")
  },
  async ({ query, indexPath, modelName, nResults }) => {
    log(`MCP Tool 'searchFuelDocs' called with query: "${query}"`);
    
    // --- Wait for repository setup to be ready before proceeding ---
    if (!repoReadyPromise) {
       log("Error: Repository setup was not initiated.");
       return {
         content: [{ type: "text", text: "Error: Repository setup process not found." }],
         isError: true
       };
    }
    try {
        log("Waiting for repository setup...");
        await repoReadyPromise;
        log("Repository is ready. Proceeding with query.");
    } catch (initError: any) {
        log(`Error during repository setup: ${initError?.message}`);
        console.error("Repository setup failed:", initError);
         return {
           content: [{ type: "text", text: `Error waiting for repository setup: ${initError?.message}` }],
           isError: true
         };
    }
    // --- End Repository Setup Check ---

    const executeQuery = async () => {
      return await queryDocs(
        query,
        indexPath,     // Will use default if undefined
        modelName,     // Will use default if undefined
        nResults       // Will use default if undefined
      );
    };

    try {
      // Execute the query
      const results = await executeQuery();

      // Format results for MCP response
      // Assuming results is an array of Vectra result objects like:
      // [{ item: { metadata: { content: '...', source: '...' } }, score: 0.9 }, ...]
      const formattedResults = Array.isArray(results)
        ? results.map((hit: any) => {
            const metadata = hit.item?.metadata || {};
            const score = hit.score;
            const content = metadata.content || 'No content found';
            const source = metadata.source || 'unknown';
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

// Define the provideStdContext tool
server.tool(
  "provideStdContext",
  {}, // No input parameters needed
  async () => {
    const filePath = path.join(__dirname, '..', 'sway', 'std_paths_data.txt'); // Construct path relative to the script's directory
    log(`MCP Tool 'provideStdContext' called. Reading file: ${filePath}`);

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      log(`Successfully read ${filePath}. Length: ${data.length}`);
      return {
        content: [{
          type: "text",
          text: `Sway Standard Library Paths and Types:\n\n${data}`
        }]
      };
    } catch (err: unknown) {
      const error = err as Error;
      console.error(`Error in provideStdContext tool reading ${filePath}: ${error.message}`);
      log(`Error reading ${filePath}: ${error.message}`);
      return {
        content: [{
          type: "text",
          text: `Error reading Sway standard library context file: ${error.message}`
        }],
        isError: true // Indicate that an error occurred
      };
    }
  }
);

// Start the server using Stdio transport
async function startServer() {
  try {
    // Initiate repository setup in the background
    ensureRepositoryIsSetup(localRepoPath);
    log("Initiated repository setup in background.");

    const transport = new StdioServerTransport();
    log("Connecting MCP server via stdio...");
    // Connect should now happen quickly without being blocked by clone/copy
    await server.connect(transport);
    log("MCP Server connected and ready (repository setup may still be in progress).");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

// Start the server directly
startServer();

// Function to ensure repository is setup (replaces Qdrant setup)
function ensureRepositoryIsSetup(localRepoPath?: string) {
    // Create the promise that the tool will wait on.
    repoReadyPromise = (async () => {
        const tempRepoPath = path.join(os.tmpdir(), 'fuel-mcp-server');
        let needsSetup = false;
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
                    throw new Error(`Failed to setup repository from local path ${localRepoPath}`);
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
                    throw new Error(`Failed to clone repository into ${tempRepoPath}`);
                }
            }
        }

        log('Repository setup completed successfully.');
    })();

    // Handle unhandled rejections for the promise globally (optional but good practice)
    repoReadyPromise?.catch(error => {
        console.error("Unhandled error during repository setup:", error);
        // Potentially exit or signal critical failure
    });
}