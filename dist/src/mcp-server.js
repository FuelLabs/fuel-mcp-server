#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { queryDocs, log } from "./query.js"; // Adjust path if necessary
import { env } from '@xenova/transformers';
import { spawn, execSync } from 'child_process';
import net from 'net';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
// Disable local cache for transformers.js models, needed by queryDocs dependencies
env.cacheDir = '';
const server = new McpServer({
    name: "FuelMCPServer",
    version: "0.1.0"
});
// Define the search tool
server.tool("searchFuelDocs", {
    query: z.string().describe("The search query for Fuel and Sway documentation."),
    collectionName: z.string().optional().describe("Optional: Specify the ChromaDB collection name."),
    modelName: z.string().optional().describe("Optional: Specify the embedding model name."),
    nResults: z.number().int().positive().optional().describe("Optional: Specify the number of search results (default 5).")
}, async ({ query, collectionName, modelName, nResults }) => {
    log(`MCP Tool 'searchFuelDocs' called with query: "${query}"`);
    // Ensure Qdrant is running *before* executing the query logic
    // await ensureQdrantIsRunning(); // Removed: Now called non-blocking in startServer
    const executeQuery = async () => {
        return await queryDocs(query, collectionName, // Will use default if undefined
        modelName, // Will use default if undefined
        nResults // Will use default if undefined
        );
    };
    try {
        // First attempt
        const results = await executeQuery();
        // Format results for MCP response
        // Assuming results is an array of Qdrant point objects like:
        // [{ id: '...', score: 0.9, payload: { content: '...', source: '...' } }, ...]
        const formattedResults = Array.isArray(results)
            ? results.map((hit) => {
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
    }
    catch (err) {
        const error = err;
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
                    ? results.map((hit) => {
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
            }
            catch (retryErr) {
                const retryError = retryErr;
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
        }
        else {
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
});
// Start the server using Stdio transport
async function startServer() {
    try {
        // Start Qdrant check/startup in the background, don't wait for it
        ensureQdrantIsRunning();
        log("Initiated Qdrant check/startup.");
        const transport = new StdioServerTransport();
        console.log("Connecting MCP server via stdio...");
        await server.connect(transport);
        console.log("MCP Server connected and ready.");
    }
    catch (error) {
        console.error("Failed to start MCP server:", error);
        process.exit(1);
    }
}
// Start the server directly
startServer();
// Function to check if a port is in use
function isPortInUse(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(true); // Port is already in use
            }
            else {
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
    // Define the path for the cloned repo in the temp directory
    const tempRepoPath = path.join(os.tmpdir(), 'fuel-mcp-server');
    log(`Checking for Fuel MCP server repo at: ${tempRepoPath}`);
    try {
        await fs.access(tempRepoPath); // Check if directory exists
        log(`Directory ${tempRepoPath} already exists.`);
    }
    catch (error) {
        // Directory does not exist, clone it (shallow clone for speed)
        log(`Directory ${tempRepoPath} not found. Cloning repository (shallow clone)...`);
        try {
            // Use execSync to clone the repository synchronously with --depth 1
            const startTime = Date.now();
            execSync(`git clone --depth 1 https://github.com/FuelLabs/fuel-mcp-server ${tempRepoPath}`, { stdio: 'inherit' }); // 'inherit' shows git output
            const duration = Date.now() - startTime;
            log(`Repository cloned successfully to ${tempRepoPath} in ${duration}ms`);
        }
        catch (cloneError) {
            console.error(`Failed to clone repository: ${cloneError}`);
            // Decide how to handle cloning failure (e.g., exit, throw)
            throw new Error(`Failed to clone repository into ${tempRepoPath}`);
        }
    }
    if (isRunning) {
        log(`Port ${qdrantPort} is already in use. Assuming Qdrant is running.`);
        return;
    }
    log('Qdrant not detected, attempting to start via Docker...');
    const dockerCommand = 'docker';
    // Construct the correct volume path using the temp directory
    const volumeMountPath = `${tempRepoPath}/qdrant_storage:/qdrant/storage`;
    log(`Using volume mount: ${volumeMountPath}`);
    const dockerArgs = [
        'run',
        '-p',
        `${qdrantPort}:${qdrantPort}`,
        '-v',
        volumeMountPath,
        'qdrant/qdrant',
    ];
    try {
        const qdrantProcess = spawn(dockerCommand, dockerArgs, {
            detached: true, // Run in background
            stdio: 'ignore' // Detach stdio
        });
        qdrantProcess.unref(); // Allow parent process to exit independently
        log('Qdrant Docker container start command issued.');
        // Note: Container might take a few seconds to become fully available.
    }
    catch (error) {
        console.error('Failed to start Qdrant Docker container:', error);
        // Consider adding more robust error handling or user feedback here.
    }
}
