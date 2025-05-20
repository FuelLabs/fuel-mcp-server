import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { QdrantClient } from '@qdrant/js-client-rest';
import { pipeline, env } from '@xenova/transformers';
import { log } from "../common/utils.js";
import * as fs from 'fs/promises';
import * as path from 'path';

// Disable local cache for transformers.js models
env.cacheDir = '';

// Constants
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_COLLECTION = process.env.QDRANT_COLLECTION || "bun_qdrant_docs"; 
const DEFAULT_QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";

// Promise for tracking Qdrant readiness - to be set by mcp-server.ts
let qdrantReadyPromise: Promise<void> | null = null;

export function setQdrantReadyPromise(promise: Promise<void>) {
  qdrantReadyPromise = promise;
}

/**
 * Register all documentation-related tools with the MCP server
 */
export function registerDocTools(server: McpServer) {
  // Register search tool
  registerSearchTool(server);
  
  // Register standard context tool
  registerStdContextTool(server);
}

/**
 * Register the documentation search tool
 */
function registerSearchTool(server: McpServer) {
  server.tool(
    "searchFuelDocs",
    "Search Fuel and Sway documentation using semantic search",
    {
      query: z.string().describe("The search query for Fuel and Sway documentation."),
      collectionName: z.string().optional().describe("Optional: Specify the Qdrant collection name."),
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

      try {
        // Execute the query
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
}

/**
 * Register the standard context tool
 */
function registerStdContextTool(server: McpServer) {
  server.tool(
    "provideStdContext",
    "Provide Sway standard library context",
    {}, // No input parameters needed
    async () => {
      const filePath = path.join(__dirname, '..', '..', 'sway', 'std_paths_data.txt');
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

/**
 * Queries the Qdrant collection with a given prompt.
 */
export async function queryDocs(
    queryText: string,
    collectionName: string = DEFAULT_COLLECTION,
    modelName: string = DEFAULT_MODEL,
    nResults: number = 5, // Number of results to retrieve
    qdrantUrl: string = DEFAULT_QDRANT_URL,
    qdrantApiKey?: string // Optional API key for Qdrant Cloud
): Promise<any> { // Return type can be refined based on Qdrant result structure
    if (!queryText) {
        throw new Error("Query text cannot be empty.");
    }

    log(`Starting Qdrant query process...`);
    log(`Collection: ${collectionName}`);
    log(`Embedding Model: ${modelName}`);
    log(`Query: "${queryText}"`);
    log(`Number of results: ${nResults}`);
    log(`Qdrant URL: ${qdrantUrl}`);
    if (qdrantApiKey) {
        log(`Qdrant API Key: Provided (hidden)`);
    }

    // Initialize Qdrant client
    let client: QdrantClient;
    try {
        log(`Connecting to Qdrant at ${qdrantUrl}...`);
        client = new QdrantClient({ 
            url: qdrantUrl,
            apiKey: qdrantApiKey,
        });
        log(`Successfully initialized Qdrant client.`);
    } catch (error) {
        console.error(`\n❌ Error initializing Qdrant client at ${qdrantUrl}:`, error);
        console.error(`\n   Troubleshooting Tips:`);
        console.error(`   1. Ensure Qdrant is running (e.g., via Docker).`);
        console.error(`   2. Verify the Qdrant URL ('${qdrantUrl}') is correct.`);
        console.error(`   3. If using Qdrant Cloud, ensure the API key is valid.`);
        console.error(`   (Configure via QDRANT_URL, QDRANT_API_KEY env vars)`);
        throw new Error(`Failed to initialize Qdrant client: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    // Check if collection exists (optional but good practice)
    try {
        await client.getCollection(collectionName);
        log(`Collection '${collectionName}' exists.`);
    } catch (error: any) {
         if (error?.status === 404) {
             console.error(`\n❌ Error: Collection '${collectionName}' not found in Qdrant.`);
             console.error(`   Troubleshooting Tips:`);
             console.error(`   1. Did you run the indexing script first (e.g., bun run src/docs/indexer.ts)?`);
             console.error(`   2. Verify the collection name matches the one used during indexing.`);
             console.error(`   (Configure via QDRANT_COLLECTION env var)`);
             throw new Error(`Collection '${collectionName}' not found.`);
         } else {
            // Handle other potential errors during collection check
            console.error(`\n❌ Error checking Qdrant collection '${collectionName}':`, error);
            throw new Error(`Failed to check Qdrant collection: ${error instanceof Error ? error.message : String(error)}`);
         }
    }

    // Initialize embedding model pipeline
    let embedder: any; 
    try {
        log(`Loading embedding model '${modelName}'...`);
        embedder = await pipeline('feature-extraction', modelName);
        log(`Embedding model loaded successfully.`);
    } catch (error) {
        console.error(`Error loading embedding model '${modelName}':`, error);
        throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Embed the query text
    let queryEmbedding: number[];
    try {
        log("Generating query embedding...");
        const output = await embedder(queryText, { pooling: 'mean', normalize: true });
        
        // Adapt embedding extraction based on transformers.js output structure
        if (output && output.data instanceof Float32Array) {
            queryEmbedding = Array.from(output.data);
        } else {
            console.error("Unexpected embedding output format:", output);
            throw new Error("Could not extract embedding from pipeline output for query.");
        }
        log(`Query embedding generated successfully (dimensions: ${queryEmbedding.length}).`);
    } catch (error) {
        console.error("Error generating query embedding:", error);
        throw new Error(`Failed during query embedding: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Query Qdrant
    try {
        log(`Querying Qdrant collection '${collectionName}'...`);
        const results = await client.search(collectionName, {
            vector: queryEmbedding,
            limit: nResults,
            with_payload: true, // Include payload in results
            // with_vector: false, // Optionally include vectors
        });
        log(`Qdrant query successful.`);
        return results;
    } catch (error) {
        console.error(`Error querying Qdrant collection '${collectionName}':`, error);
        throw new Error(`Failed during Qdrant query: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Example of running the script directly
async function run() {
    const query = process.argv.find((arg, i) => i > 1 && !arg.startsWith('--')); // Find first non-flag arg after script name
    if (!query) {
        console.error("Please provide a query string as a command-line argument.");
        console.error('Example: bun run src/docs/query.ts --run "What is Qdrant?"');
        process.exit(1);
    }

    const collectionName = DEFAULT_COLLECTION; // Uses env var QDRANT_COLLECTION or default
    const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
    const numResults = process.env.NUM_RESULTS ? parseInt(process.env.NUM_RESULTS, 10) : 5;
    const qdrantUrl = DEFAULT_QDRANT_URL; // Uses env var QDRANT_URL or default
    const qdrantApiKey = process.env.QDRANT_API_KEY; // Uses env var QDRANT_API_KEY

    if (isNaN(numResults) || numResults <= 0) {
        console.warn(`Invalid NUM_RESULTS environment variable: ${process.env.NUM_RESULTS}. Using default ${5}.`);
    }

    try {
        const queryResults = await queryDocs(
            query, 
            collectionName, 
            model, 
            numResults, 
            qdrantUrl, 
            qdrantApiKey
        );
        log("\n--- Qdrant Query Results --- ");
        // Pretty print the results (can be customized)
        log(JSON.stringify(queryResults, null, 2));
        log("\n--------------------------");
    } catch (error) {
        console.error("\n--- Qdrant Query failed --- ", error);
        process.exit(1);
    }
}

// Only run if --run flag is present
if (import.meta.url === `file://${process.argv[1]}` && process.argv.includes('--run')) {
    run();
}
