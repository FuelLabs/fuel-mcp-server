import { ChromaClient, type Collection } from 'chromadb';
import { pipeline, env, type Pipeline } from '@xenova/transformers';

// Disable local cache for transformers.js models
env.cacheDir = ''

// Constants - Should match the ones used in indexer.ts
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_COLLECTION = "bun_chroma_docs";

/**
 * Queries the ChromaDB collection with a given prompt.
 */
export async function queryDocs(
    queryText: string,
    collectionName: string = DEFAULT_COLLECTION,
    modelName: string = DEFAULT_MODEL,
    nResults: number = 5 // Number of results to retrieve
): Promise<any> { // Return type can be refined based on ChromaDB result structure
    if (!queryText) {
        throw new Error("Query text cannot be empty.");
    }

    console.log(`Starting query process...`);
    console.log(`Collection: ${collectionName}`);
    console.log(`Embedding Model: ${modelName}`);
    console.log(`Query: "${queryText}"`);
    console.log(`Number of results: ${nResults}`);

    // Initialize ChromaDB client and get collection
    // Explicitly set default database and tenant
    const chroma = new ChromaClient({
        path: process.env.CHROMA_URL || "http://localhost:8000",
        database: process.env.CHROMA_DATABASE || "default_database",
        tenant: process.env.CHROMA_TENANT || "default_tenant"
    });
    let collection: Collection;
    try {
        console.log(`Connecting to ChromaDB (Tenant: ${chroma.tenant}, DB: ${chroma.database}) and getting collection '${collectionName}'...`);
        // Use getCollection here, assuming it exists from indexing
        // Use type assertion to bypass strict embeddingFunction requirement
        collection = await chroma.getCollection({ name: collectionName } as any);
        console.log(`Successfully connected to collection '${collectionName}'.`);
    } catch (error) {
        const chromaPath = process.env.CHROMA_URL || "http://localhost:8000";
        const chromaTenant = process.env.CHROMA_TENANT || "default_tenant";
        const chromaDatabase = process.env.CHROMA_DATABASE || "default_database";
        console.error(`\n❌ Error getting ChromaDB collection '${collectionName}':`, error);
        console.error(`\n   Troubleshooting Tips:`);
        console.error(`   1. Ensure ChromaDB is running (e.g., via Docker).`);
        console.error(`   2. Verify the collection '${collectionName}' exists.`);
        console.error(`   3. Did you run the indexing script first (bun run src/indexer.ts)?`);
        console.error(`   4. Check if ChromaDB is accessible at ${chromaPath}`);
        console.error(`   5. Verify the tenant ('${chromaTenant}') and database ('${chromaDatabase}') exist.`);
        console.error(`   (These can be configured via CHROMA_URL, CHROMA_TENANT, CHROMA_DATABASE env vars)`);
        throw new Error(`Failed to get ChromaDB collection: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Initialize embedding model pipeline
    let embedder: any; // Using 'any' as in indexer.ts
    try {
        console.log(`Loading embedding model '${modelName}'...`);
        embedder = await pipeline('feature-extraction', modelName);
        console.log(`Embedding model loaded successfully.`);
    } catch (error) {
        console.error(`Error loading embedding model '${modelName}':`, error);
        throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Embed the query text
    let queryEmbedding: number[];
    try {
        console.log("Generating query embedding...");
        // Embed a single string
        const output = await embedder(queryText, { pooling: 'mean', normalize: true });
        // Extract the embedding - adjust based on actual output structure
        if (output && output.data instanceof Float32Array) {
            queryEmbedding = Array.from(output.data);
        } else if (output?.embedding) { // Check for structure like { embedding: [...] }
            queryEmbedding = Array.from(output.embedding);
        } else if (Array.isArray(output) && output[0]?.embedding) { // Check for [{ embedding: [...] }, ...]
             queryEmbedding = Array.from(output[0].embedding);
        } else {
            throw new Error("Could not extract embedding from pipeline output for query.");
        }
        console.log(`Query embedding generated successfully (dimensions: ${queryEmbedding.length}).`);
    } catch (error) {
        console.error("Error generating query embedding:", error);
        throw new Error(`Failed during query embedding: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Query ChromaDB
    try {
        console.log(`Querying collection '${collectionName}'...`);
        const results = await collection.query({
            queryEmbeddings: [queryEmbedding],
            nResults: nResults,
            // include: ["metadatas", "documents", "distances"] // Optionally specify fields to include
        });
        console.log(`Query successful.`);
        return results;
    } catch (error) {
        console.error(`Error querying ChromaDB collection '${collectionName}':`, error);
        throw new Error(`Failed during ChromaDB query: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Example of running the script directly
async function run() {
    const query = process.argv.find((arg, i) => i > 1 && !arg.startsWith('--')); // Find first non-flag arg after script name
    if (!query) {
        console.error("Please provide a query string as a command-line argument.");
        console.error("Example: bun src/query.ts --run \"How to install Bun?\"");
        process.exit(1);
    }

    const collectionName = process.env.CHROMA_COLLECTION || DEFAULT_COLLECTION;
    const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
    const numResults = process.env.NUM_RESULTS ? parseInt(process.env.NUM_RESULTS, 10) : 5;

    if (isNaN(numResults) || numResults <= 0) {
        console.error(`Invalid NUM_RESULTS environment variable: ${process.env.NUM_RESULTS}. Using default 5.`);
        // Keep the default, don't exit process.exit(1);
    }

    try {
        const queryResults = await queryDocs(query, collectionName, model, numResults);
        console.log("\n--- Query Results --- ");
        // Pretty print the results (can be customized)
        console.log(JSON.stringify(queryResults, null, 2));
         console.log("\n-------------------");
    } catch (error) {
        console.error("\n--- Query failed --- ", error);
        process.exit(1);
    }
}

// Only run if --run flag is present
if (process.argv.includes('--run')) {
    run();
} 