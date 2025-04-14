import { ChromaClient, type Collection } from 'chromadb';
import { pipeline, env, type Pipeline } from '@xenova/transformers';
import * as fsPromises from "fs/promises";
import path from "path";
import { chunkMarkdown, type MarkdownChunk } from './chunker';

// Disable local cache for transformers.js models
env.cacheDir = '' // Or specify a path if needed, but disabling is simpler for this script

// Constants
const BATCH_SIZE = 100; // Process N chunks at a time for embedding/adding
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_COLLECTION = "bun_chroma_docs";
const TARGET_TOKEN_SIZE = 2000;

/**
 * Estimates token count (simple whitespace split as a proxy).
 * Replace with a proper tokenizer for the specific model if accuracy is critical.
 */
function estimateTokens(text: string): number {
    return text.split(/\s+/).length;
}

/**
 * Indexes markdown documents from a directory into a ChromaDB collection.
 */
export async function indexDocs(
    docsDir: string,
    collectionName: string = DEFAULT_COLLECTION,
    modelName: string = DEFAULT_MODEL,
    targetChunkSize: number = TARGET_TOKEN_SIZE
): Promise<void> {
    console.log(`Starting indexing process...`);
    console.log(`Docs directory: ${docsDir}`);
    console.log(`Collection: ${collectionName}`);
    console.log(`Embedding Model: ${modelName}`);
    console.log(`Target Chunk Size (tokens): ${targetChunkSize}`);

    // Initialize ChromaDB client and collection
    // Explicitly set default database and tenant
    const chroma = new ChromaClient({
        path: process.env.CHROMA_URL || "http://localhost:8000", // Allow overriding URL via env var
        database: process.env.CHROMA_DATABASE || "default_database",
        tenant: process.env.CHROMA_TENANT || "default_tenant"
    });
    let collection: Collection;
    try {
        // Potential optimization: Check if collection exists and maybe clear it?
        // For now, getOrCreate handles it.
        console.log(`Connecting to ChromaDB (Tenant: ${chroma.tenant}, DB: ${chroma.database}) and getting/creating collection '${collectionName}'...`);
        collection = await chroma.getOrCreateCollection({ name: collectionName });
        console.log(`Successfully connected to collection '${collectionName}'.`);
    } catch (error) {
        const chromaPath = process.env.CHROMA_URL || "http://localhost:8000";
        const chromaTenant = process.env.CHROMA_TENANT || "default_tenant";
        const chromaDatabase = process.env.CHROMA_DATABASE || "default_database";
        console.error(`\n❌ Error connecting to ChromaDB collection '${collectionName}':`, error);
        console.error(`\n   Troubleshooting Tips:`);
        console.error(`   1. Ensure ChromaDB is running. If using Docker: docker ps | grep chromadb`);
        console.error(`   2. Check if ChromaDB is accessible at ${chromaPath}`);
        console.error(`   3. Verify the tenant ('${chromaTenant}') and database ('${chromaDatabase}') exist.`);
        console.error(`   (These can be configured via CHROMA_URL, CHROMA_TENANT, CHROMA_DATABASE env vars)`);
        throw new Error(`Failed to initialize ChromaDB collection: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Find markdown files
    let files: string[];
    try {
        files = await fsPromises.readdir(docsDir);
    } catch (error) {
        console.error(`Error reading directory '${docsDir}':`, error);
        throw new Error(`Failed to read directory: ${error instanceof Error ? error.message : String(error)}`);
    }

    const markdownFiles = files.filter(file => file.endsWith('.md'));
    if (markdownFiles.length === 0) {
        console.log("No markdown files found in the specified directory.");
        return;
    }
    console.log(`Found ${markdownFiles.length} markdown files to process.`);

    // Initialize embedding model pipeline *only if* files are found
    let embedder: any; // Use 'any' to bypass specific Pipeline type issue
    if (markdownFiles.length > 0) {
        try {
            console.log(`Loading embedding model '${modelName}'... (This might take a while the first time)`);
            embedder = await pipeline('feature-extraction', modelName);
            console.log(`Embedding model loaded successfully.`);
        } catch (error) {
            console.error(`Error loading embedding model '${modelName}':`, error);
            throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
        }
    } else {
        // If no files, we don't need the embedder, log and return
        console.log("No markdown files found. Exiting indexing process.");
        return;
    }

    let totalChunksProcessed = 0;
    let allChunks: { id: string; chunk: MarkdownChunk; source: string }[] = [];

    // Process files: Read, Chunk
    for (const file of markdownFiles) {
        const filePath = path.join(docsDir, file);
        // console.log(`Processing file: ${file}...`);
        try {
            const content = await fsPromises.readFile(filePath, "utf-8");
            const chunks = chunkMarkdown(content, targetChunkSize, estimateTokens);

            if(chunks.length > 0) {
                //console.log(`  - Chunked into ${chunks.length} segments.`);
                allChunks.push(...chunks.map((chunk, index) => ({
                    id: `${file}-${index}`, // Simple ID based on filename and chunk index
                    chunk,
                    source: file,
                })));
            } else {
                 console.log(`  - No chunks generated (file might be empty or only contain whitespace).`);
            }
        } catch (error) {
            console.error(`Error processing file ${file}:`, error);
            // Decide whether to continue with other files or stop
            // For now, we log the error and continue
        }
    }

    if (allChunks.length === 0) {
        console.log("No content chunks were generated from the markdown files.");
        return;
    }

    console.log(`Total chunks generated: ${allChunks.length}. Preparing for embedding and adding to ChromaDB...`);

    // Process Chunks in Batches: Embed, Add to Chroma
    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
        const batch = allChunks.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(allChunks.length / BATCH_SIZE)} (size: ${batch.length})...`);

        const batchTexts = batch.map(item => item.chunk.content);
        let batchEmbeddings: number[][] = [];

        try {
            console.log("  - Generating embeddings...");
            const output = await embedder(batchTexts, { pooling: 'mean', normalize: true });
            // The output structure depends on the transformers.js version and model.
            // For feature-extraction pipeline with sentence-transformers, output.data is typically the Float32Array or similar.
            // We need to convert this into an array of number arrays.
            // Adjust this based on the actual output format you observe.
            if (Array.isArray(output)) { // Check if output is an array of embeddings (newer versions?)
                 batchEmbeddings = output.map(emb => Array.from(emb.embedding || [])); // Adapt based on actual structure
            } else if (output && output.data instanceof Float32Array) { // Older structure?
                const embeddingDim = output.dims[1];
                 for(let j=0; j<output.dims[0]; ++j) {
                    batchEmbeddings.push(Array.from(output.data.slice(j * embeddingDim, (j + 1) * embeddingDim)));
                }
            } else {
                 // Fallback/Error handling if the structure is unexpected
                 console.warn("Unexpected embedding output structure:", output);
                 // Attempt a generic conversion if possible, or throw
                 try {
                     // Assuming output might be like [{ embedding: [...] }, ...]
                    if(Array.isArray(output) && output[0]?.embedding) {
                        batchEmbeddings = output.map(emb => Array.from(emb.embedding || []));
                    } else {
                         throw new Error("Could not extract embeddings from pipeline output.")
                    }
                 } catch (conversionError) {
                     console.error("Failed to convert embedding output:", conversionError);
                     throw new Error("Embedding generation produced an unexpected output format.");
                 }
            }
            console.log(`  - Generated ${batchEmbeddings.length} embeddings.`);

        } catch (error) {
            console.error(`Error generating embeddings for batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
            // Decide whether to skip batch or stop
            // Throwing error to stop the process for now
            throw new Error(`Failed during embedding generation: ${error instanceof Error ? error.message : String(error)}`);
        }

        if (batchEmbeddings.length !== batch.length) {
            console.error(`Mismatch between number of chunks (${batch.length}) and generated embeddings (${batchEmbeddings.length}) in batch ${Math.floor(i / BATCH_SIZE) + 1}. Skipping batch.`);
            continue; // Skip this batch
        }

        try {
            console.log("  - Adding batch to ChromaDB...");
            await collection.add({
                ids: batch.map(item => item.id),
                embeddings: batchEmbeddings,
                metadatas: batch.map(item => ({ source: item.source, type: item.chunk.type })),
                documents: batchTexts, // Add the original text as document content
            });
            totalChunksProcessed += batch.length;
            console.log(`  - Batch added successfully.`);
        } catch (error) {
            console.error(`Error adding batch ${Math.floor(i / BATCH_SIZE) + 1} to ChromaDB:`, error);
            // Decide whether to retry, skip batch, or stop
            // Throwing error to stop the process for now
            throw new Error(`Failed during ChromaDB add operation: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    console.log(`--------------------------------------------------`);
    console.log(`Indexing finished!`);
    console.log(`Total markdown files processed: ${markdownFiles.length}`);
    console.log(`Total chunks added to ChromaDB: ${totalChunksProcessed}`);
    console.log(`--------------------------------------------------`);
}

// Example of running the script directly
// You might want to use command-line arguments (e.g., via minimist or process.argv)
// in a real application.
async function run() {
    // Check if running as the main script
    // This check might not work perfectly depending on the execution context (e.g., bun run)
    // A simple check if a command-line argument is provided might be more robust
    if (import.meta.main) { 
        const docsPath = process.argv[2] || './docs'; // Get path from command line or default
        const collectionName = process.env.CHROMA_COLLECTION || DEFAULT_COLLECTION;
        const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
        const chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE, 10) : TARGET_TOKEN_SIZE;

         if (isNaN(chunkSize) || chunkSize <= 0) {
            console.error(`Invalid CHUNK_SIZE environment variable: ${process.env.CHUNK_SIZE}. Using default ${TARGET_TOKEN_SIZE}.`);
            process.exit(1);
        }

        try {
            await indexDocs(docsPath, collectionName, model, chunkSize);
        } catch (error) {
            console.error("\n--- Indexing failed --- ", error);
            process.exit(1);
        }
    }
}

run(); 