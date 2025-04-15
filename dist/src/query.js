import { QdrantClient } from '@qdrant/js-client-rest';
import { pipeline, env } from '@xenova/transformers';
// Disable local cache for transformers.js models
env.cacheDir = '';
// Constants - Should match the ones used in indexer-qdrant.ts
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
// Ensure this matches the collection name used during indexing with Qdrant
const DEFAULT_COLLECTION = process.env.QDRANT_COLLECTION || "bun_qdrant_docs";
const DEFAULT_QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
/**
 * Queries the Qdrant collection with a given prompt.
 */
export async function queryDocs(queryText, collectionName = DEFAULT_COLLECTION, modelName = DEFAULT_MODEL, nResults = 5, // Number of results to retrieve
qdrantUrl = DEFAULT_QDRANT_URL, qdrantApiKey // Optional API key for Qdrant Cloud
) {
    if (!queryText) {
        throw new Error("Query text cannot be empty.");
    }
    console.log(`Starting Qdrant query process...`);
    console.log(`Collection: ${collectionName}`);
    console.log(`Embedding Model: ${modelName}`);
    console.log(`Query: "${queryText}"`);
    console.log(`Number of results: ${nResults}`);
    console.log(`Qdrant URL: ${qdrantUrl}`);
    if (qdrantApiKey) {
        console.log(`Qdrant API Key: Provided (hidden)`);
    }
    // Initialize Qdrant client
    let client;
    try {
        console.log(`Connecting to Qdrant at ${qdrantUrl}...`);
        client = new QdrantClient({
            url: qdrantUrl,
            apiKey: qdrantApiKey,
        });
        // Optional: Ping Qdrant to verify connection early
        // await client.api('GET', '/'); // Example ping, adjust endpoint if needed
        console.log(`Successfully initialized Qdrant client.`);
    }
    catch (error) {
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
        console.log(`Collection '${collectionName}' exists.`);
    }
    catch (error) {
        if (error?.status === 404) {
            console.error(`\n❌ Error: Collection '${collectionName}' not found in Qdrant.`);
            console.error(`   Troubleshooting Tips:`);
            console.error(`   1. Did you run the indexing script first (e.g., bun run src/indexer-qdrant.ts)?`);
            console.error(`   2. Verify the collection name matches the one used during indexing.`);
            console.error(`   (Configure via QDRANT_COLLECTION env var)`);
            throw new Error(`Collection '${collectionName}' not found.`);
        }
        else {
            // Handle other potential errors during collection check
            console.error(`\n❌ Error checking Qdrant collection '${collectionName}':`, error);
            throw new Error(`Failed to check Qdrant collection: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    // Initialize embedding model pipeline
    let embedder;
    try {
        console.log(`Loading embedding model '${modelName}'...`);
        embedder = await pipeline('feature-extraction', modelName);
        console.log(`Embedding model loaded successfully.`);
    }
    catch (error) {
        console.error(`Error loading embedding model '${modelName}':`, error);
        throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
    }
    // Embed the query text
    let queryEmbedding;
    try {
        console.log("Generating query embedding...");
        const output = await embedder(queryText, { pooling: 'mean', normalize: true });
        // Adapt embedding extraction based on transformers.js output structure
        if (output && output.data instanceof Float32Array) {
            queryEmbedding = Array.from(output.data);
        }
        else {
            console.error("Unexpected embedding output format:", output);
            throw new Error("Could not extract embedding from pipeline output for query.");
        }
        console.log(`Query embedding generated successfully (dimensions: ${queryEmbedding.length}).`);
    }
    catch (error) {
        console.error("Error generating query embedding:", error);
        throw new Error(`Failed during query embedding: ${error instanceof Error ? error.message : String(error)}`);
    }
    // Query Qdrant
    try {
        console.log(`Querying Qdrant collection '${collectionName}'...`);
        const results = await client.search(collectionName, {
            vector: queryEmbedding,
            limit: nResults,
            with_payload: true, // Include payload in results
            // with_vector: false, // Optionally include vectors
        });
        console.log(`Qdrant query successful.`);
        return results;
    }
    catch (error) {
        console.error(`Error querying Qdrant collection '${collectionName}':`, error);
        throw new Error(`Failed during Qdrant query: ${error instanceof Error ? error.message : String(error)}`);
    }
}
// Example of running the script directly
async function run() {
    const query = process.argv.find((arg, i) => i > 1 && !arg.startsWith('--')); // Find first non-flag arg after script name
    if (!query) {
        console.error("Please provide a query string as a command-line argument.");
        console.error('Example: bun src/query-qdrant.ts --run "What is Qdrant?"');
        process.exit(1);
    }
    const collectionName = DEFAULT_COLLECTION; // Uses env var QDRANT_COLLECTION or default
    const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
    const numResults = process.env.NUM_RESULTS ? parseInt(process.env.NUM_RESULTS, 10) : 5;
    const qdrantUrl = DEFAULT_QDRANT_URL; // Uses env var QDRANT_URL or default
    const qdrantApiKey = process.env.QDRANT_API_KEY; // Uses env var QDRANT_API_KEY
    if (isNaN(numResults) || numResults <= 0) {
        console.warn(`Invalid NUM_RESULTS environment variable: ${process.env.NUM_RESULTS}. Using default ${5}.`);
        // Keep the default, don't exit process.exit(1);
    }
    try {
        const queryResults = await queryDocs(query, collectionName, model, numResults, qdrantUrl, qdrantApiKey);
        console.log("\n--- Qdrant Query Results --- ");
        // Pretty print the results (can be customized)
        console.log(JSON.stringify(queryResults, null, 2));
        console.log("\n--------------------------");
    }
    catch (error) {
        console.error("\n--- Qdrant Query failed --- ", error);
        process.exit(1);
    }
}
// Only run if --run flag is present
if (process.argv.includes('--run')) {
    run();
}
