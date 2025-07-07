import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { queryDocs, log } from "./query.js";
import { env } from '@xenova/transformers';
import { exec } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { promisify } from 'util';

const execAsync = promisify(exec);

env.cacheDir = '';

export interface ServerOptions {
    localRepoPath?: string;
}

export class FuelMCPServerManager {
    private repoReadyPromise: Promise<void> | null = null;

    constructor(private options: ServerOptions = {}) {}

    createServer(): McpServer {
        const server = new McpServer({
            name: "FuelMCPServer",
            version: "0.1.0"
        });

        this.registerTools(server);
        this.initializeRepository();

        return server;
    }

    private registerTools(server: McpServer): void {
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
                
                if (!this.repoReadyPromise) {
                    log("Error: Repository setup was not initiated.");
                    return {
                        content: [{ type: "text", text: "Error: Repository setup process not found." }],
                        isError: true
                    };
                }

                try {
                    log("Waiting for repository setup...");
                    await this.repoReadyPromise;
                    log("Repository is ready. Proceeding with query.");
                } catch (initError: any) {
                    log(`Error during repository setup: ${initError?.message}`);
                    console.error("Repository setup failed:", initError);
                    return {
                        content: [{ type: "text", text: `Error waiting for repository setup: ${initError?.message}` }],
                        isError: true
                    };
                }

                try {
                    const results = await queryDocs(query, indexPath, modelName, nResults);
                    
                    const formattedResults = Array.isArray(results)
                        ? results.map((hit: any) => {
                            const metadata = hit.item?.metadata || {};
                            const score = hit.score;
                            const content = metadata.content || 'No content found';
                            const source = metadata.source || 'unknown';
                            return `Source: ${source}\nScore: ${score?.toFixed(4)}\nContent:\n${content}\n---`;
                        }).join('\n\n')
                        : JSON.stringify(results, null, 2);

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
                        isError: true
                    };
                }
            }
        );

        server.tool(
            "provideStdContext",
            {},
            async () => {
                const filePath = path.join(__dirname, '..', 'sway', 'std_paths_data.txt');
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
                        isError: true
                    };
                }
            }
        );
    }

    private initializeRepository(): void {
        this.repoReadyPromise = (async () => {
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
                if (this.options.localRepoPath && !tmpDirDidExist) {
                    log(`Using local repository path provided: ${this.options.localRepoPath}`);
                    try {
                        await fs.access(this.options.localRepoPath);
                        log(`Copying repository from ${this.options.localRepoPath} to ${tempRepoPath}...`);
                        await fs.cp(this.options.localRepoPath, tempRepoPath, { recursive: true });
                        const duration = Date.now() - startTime;
                        log(`Repository copied successfully from local path to ${tempRepoPath} in ${duration}ms`);
                    } catch (copyError: any) {
                        console.error(`Failed to access or copy local repository from ${this.options.localRepoPath}: ${copyError.message}`);
                        try { await fs.rm(tempRepoPath, { recursive: true, force: true }); } catch (_) {}
                        throw new Error(`Failed to setup repository from local path ${this.options.localRepoPath}`);
                    }
                } else {
                    log(`Cloning repository (shallow clone) from GitHub into ${tempRepoPath}...`);
                    try {
                        await execAsync(`git clone --depth 1 https://github.com/FuelLabs/fuel-mcp-server ${tempRepoPath}`);
                        const duration = Date.now() - startTime;
                        log(`Repository cloned successfully to ${tempRepoPath} in ${duration}ms`);
                    } catch (cloneError) {
                        console.error(`Failed to clone repository: ${cloneError}`);
                        try { await fs.rm(tempRepoPath, { recursive: true, force: true }); } catch (_) {}
                        throw new Error(`Failed to clone repository into ${tempRepoPath}`);
                    }
                }
            }

            log('Repository setup completed successfully.');
        })();

        this.repoReadyPromise?.catch(error => {
            console.error("Unhandled error during repository setup:", error);
        });
    }
}

export function createFuelMCPServer(options: ServerOptions = {}): McpServer {
    const manager = new FuelMCPServerManager(options);
    return manager.createServer();
}