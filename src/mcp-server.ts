#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { spawn, exec } from 'child_process';
import net from 'net';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { promisify } from 'util';
import { log } from './common/utils.js';
import { createServer } from './index.js';
import { setQdrantReadyPromise } from './docs/query.js';

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

// Promise to track Qdrant readiness (clone + docker start)
let qdrantReadyPromise: Promise<void> | null = null;

/**
 * Initialize and start the Fuel MCP server
 * This is the main function for direct server startup via stdio
 */
async function startServer() {
  try {
    // Initialize server with tools from our modular structure
    const server = createServer();
    
    // Initiate Qdrant check/startup in the background
    ensureQdrantIsRunning(localRepoPath);
    console.error("Initiated Qdrant check/startup in background.");

    // Connect to stdio
    const transport = new StdioServerTransport();
    console.error("Connecting MCP server via stdio...");
    await server.connect(transport);
    console.error("MCP Server connected and ready (Qdrant initialization may still be in progress).");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

// Start the server directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

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

    // Make the promise available to the query module
    setQdrantReadyPromise(qdrantReadyPromise);

    // Handle unhandled rejections for the promise globally (optional but good practice)
    qdrantReadyPromise?.catch(error => {
        console.error("Unhandled error during Qdrant initialization:", error);
        // Potentially exit or signal critical failure
    });
}

export { startServer, ensureQdrantIsRunning };
