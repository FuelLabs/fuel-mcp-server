import { QdrantClient } from '@qdrant/js-client-rest';
import { pipeline, env, type Pipeline } from '@xenova/transformers';
import * as fsPromises from "fs/promises";
import path from "path";
import { chunkMarkdown, type MarkdownChunk } from './chunker';
import crypto from "crypto";

// Disable local cache for transformers.js models
env.cacheDir = '' // Or specify a path if needed, but disabling is simpler for this script

// Constants
const BATCH_SIZE = 100; // Process N chunks at a time for embedding/adding
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_QDRANT_COLLECTION = "bun_qdrant_docs";
const TARGET_TOKEN_SIZE = 2000;
const EMBEDDING_DIMENSION = 384; // Dimension for Xenova/all-MiniLM-L6-v2

/**
 * Estimates token count (simple whitespace split as a proxy).
 * Replace with a proper tokenizer for the specific model if accuracy is critical.
 */
function estimateTokens(text: string): number {
    return text.split(/\s+/).length;
}

/**
 * Ensures a Qdrant collection exists, creating it if necessary.
 */
async function getOrCreateQdrantCollection(client: QdrantClient, collectionName: string): Promise<void> {
    try {
        const collectionsResponse = await client.getCollections();
        const collectionExists = collectionsResponse.collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection '${collectionName}' not found. Creating...`);
            await client.createCollection(collectionName, {
                vectors: { size: EMBEDDING_DIMENSION, distance: 'Cosine' },
            });
            console.log(`Collection '${collectionName}' created successfully.`);
            // Short delay to allow collection creation to finalize
            await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            console.log(`Collection '${collectionName}' already exists.`);
        }
    } catch (error) {
        console.error(`Error ensuring collection '${collectionName}' exists:`, error);
        throw new Error(`Failed to ensure Qdrant collection: ${error instanceof Error ? error.message : String(error)}`);
    }
}


/**
 * Indexes markdown documents from a directory into a Qdrant collection.
 */
export async function indexDocsQdrant(
    docsDir: string,
    collectionName: string = DEFAULT_QDRANT_COLLECTION,
    modelName: string = DEFAULT_MODEL,
    targetChunkSize: number = TARGET_TOKEN_SIZE
): Promise<void> {
    console.log(`Starting Qdrant indexing process...`);
    console.log(`Docs directory: ${docsDir}`);
    console.log(`Collection: ${collectionName}`);
    console.log(`Embedding Model: ${modelName}`);
    console.log(`Target Chunk Size (tokens): ${targetChunkSize}`);

    // Find markdown files FIRST
    let files: string[];
    try {
        files = await fsPromises.readdir(docsDir);
    } catch (error) {
        console.error(`Error reading directory '${docsDir}':`, error);
        throw new Error(`Failed to read directory: ${error instanceof Error ? error.message : String(error)}`);
    }

    const markdownFiles = files.filter(file => file.endsWith('.md'));
    if (markdownFiles.length === 0) {
        console.log("No markdown files found in the specified directory. Exiting.");
        return; // Exit early if no files found
    }
    console.log(`Found ${markdownFiles.length} markdown files to process.`);

    // Initialize Qdrant client and check collection ONLY if files are found
    const qdrantUrl = process.env.QDRANT_URL || "http://localhost:6333";
    const qdrantApiKey = process.env.QDRANT_API_KEY; // Optional API key

    console.log(`Connecting to Qdrant at ${qdrantUrl}...`);
    let client: QdrantClient;
    try {
        client = new QdrantClient({
            url: qdrantUrl,
            apiKey: qdrantApiKey,
        });
        // Ensure the collection exists
        await getOrCreateQdrantCollection(client, collectionName);
        console.log(`Successfully ensured collection '${collectionName}' exists.`);
    } catch (error) {
        console.error(`\n❌ Error initializing Qdrant client or ensuring collection '${collectionName}':`, error);
        console.error(`\n   Troubleshooting Tips:`);
        console.error(`   1. Ensure Qdrant is running. If using Docker: docker ps | grep qdrant`);
        console.error(`   2. Check if Qdrant is accessible at ${qdrantUrl}`);
        console.error(`   3. If using an API key, ensure QDRANT_API_KEY is set correctly.`);
        console.error(`   (Configure connection via QDRANT_URL and QDRANT_API_KEY env vars)`);
        // Include original error message if available
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to initialize Qdrant client/collection: ${errorMessage}`);
    }

    // Initialize embedding model pipeline (already confirmed files exist)
    let embedder: any;
    try {
        console.log(`Loading embedding model '${modelName}'... (This might take a while the first time)`);
        embedder = await pipeline('feature-extraction', modelName);
        console.log(`Embedding model loaded successfully.`);
    } catch (error) {
        console.error(`Error loading embedding model '${modelName}':`, error);
        throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
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

            if (chunks.length > 0) {
                //console.log(`  - Chunked into ${chunks.length} segments.`);
                allChunks.push(...chunks.map((chunk, index) => ({
                    // Qdrant IDs can be numbers or UUIDs. Using string for consistency with previous indexer.
                    // Ensure these IDs are unique and stable if re-indexing.
                    id: crypto.randomUUID(),
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

    console.log(`Total chunks generated: ${allChunks.length}. Preparing for embedding and adding to Qdrant...`);

    // Process Chunks in Batches: Embed, Upsert to Qdrant
    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
        const batch = allChunks.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(allChunks.length / BATCH_SIZE)} (size: ${batch.length})...`);

        const batchTexts = batch.map(item => item.chunk.content);
        let batchEmbeddings: number[][] = [];

        try {
            console.log("  - Generating embeddings...");
            const output = await embedder(batchTexts, { pooling: 'mean', normalize: true });

            // Extract embeddings (handle potential structure variations)
            if (output && output.data instanceof Float32Array && output.dims && output.dims.length === 2) {
                const embeddingDim = output.dims[1];
                 if (embeddingDim !== EMBEDDING_DIMENSION) {
                     console.warn(`Warning: Expected embedding dimension ${EMBEDDING_DIMENSION}, but got ${embeddingDim}. Ensure model matches dimension.`);
                 }
                for (let j = 0; j < output.dims[0]; ++j) {
                    batchEmbeddings.push(Array.from(output.data.slice(j * embeddingDim, (j + 1) * embeddingDim)));
                }
            } else if (Array.isArray(output) && output[0]?.embedding) { // Alternative structure check
                 batchEmbeddings = output.map(emb => Array.from(emb.embedding || []));
                  if (batchEmbeddings[0]?.length !== EMBEDDING_DIMENSION && batchEmbeddings.length > 0) {
                    console.warn(`Warning: Expected embedding dimension ${EMBEDDING_DIMENSION}, but got ${batchEmbeddings[0]?.length}. Ensure model matches dimension.`);
                }
            } else {
                 console.warn("Unexpected embedding output structure:", output);
                 throw new Error("Could not extract embeddings from pipeline output.");
            }
            console.log(`  - Generated ${batchEmbeddings.length} embeddings.`);

        } catch (error) {
            console.error(`Error generating embeddings for batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
            throw new Error(`Failed during embedding generation: ${error instanceof Error ? error.message : String(error)}`);
        }

        if (batchEmbeddings.length !== batch.length) {
            console.error(`Mismatch between number of chunks (${batch.length}) and generated embeddings (${batchEmbeddings.length}) in batch ${Math.floor(i / BATCH_SIZE) + 1}. Skipping batch.`);
            continue; // Skip this batch
        }

        try {
            console.log("  - Upserting batch to Qdrant...");
            // Prepare points for Qdrant upsert
            const points = batch
                .map((item, index) => {
                    const vector = batchEmbeddings[index];
                    if (!vector || vector.length !== EMBEDDING_DIMENSION) {
                        console.warn(`Warning: Missing or invalid dimension embedding for chunk ${item.id} (source: ${item.source}) in batch. Skipping.`);
                        return null;
                    }
                    if (typeof item.id !== 'string' || item.id.length !== 36) {
                         console.warn(`Warning: Invalid ID format for chunk from ${item.source}. ID: ${item.id}. Skipping.`);
                         return null;
                    }
                    return {
                        id: item.id,
                        vector: vector,
                        payload: { // Payload stores metadata and the original text chunk
                            source: item.source,
                            type: item.chunk.type,
                            content: item.chunk.content, // Store original content in payload
                            // Removed start_line and end_line as they are not in MarkdownChunk
                        }
                    };
                })
                .filter(point => point !== null);

            if (points.length === 0) {
                console.log("  - No valid points to upsert in this batch.");
                continue;
            }

            // Log point details before upsert attempt
            console.log(`  - Preparing to upsert batch ${Math.floor(i / BATCH_SIZE) + 1} with ${points.length} points. Point IDs/Sources:`);
            points.forEach(p => console.log(`    - ID: ${p.id}, Source: ${p.payload?.source}`));

            await client.upsert(collectionName, {
                wait: true, // Wait for operation to complete
                points: points as any // Cast as any to bypass stricter type check after filtering nulls
                                      // QdrantClient types might need refinement for this specific structure
            });

            totalChunksProcessed += points.length;
            console.log(`  - Batch upserted successfully (${points.length} points).`);
        } catch (error) {
            console.error(`Error upserting batch ${Math.floor(i / BATCH_SIZE) + 1} to Qdrant:`, error);
            // Consider more robust error handling (e.g., retries for specific errors)
            throw new Error(`Failed during Qdrant upsert operation: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    console.log(`--------------------------------------------------`);
    console.log(`Qdrant Indexing finished!`);
    console.log(`Total markdown files processed: ${markdownFiles.length}`);
    console.log(`Total chunks upserted to Qdrant: ${totalChunksProcessed}`);
    console.log(`--------------------------------------------------`);
}

// Example of running the script directly
async function runQdrantIndexer() {
    // Simple check if executed directly (adjust if needed for specific environments)
    if (require.main === module || (typeof Bun !== 'undefined' && Bun.main === import.meta.path)) {
        const docsPath = process.argv[2] || './docs'; // Get path from command line or default
        const collectionName = process.env.QDRANT_COLLECTION || DEFAULT_QDRANT_COLLECTION;
        const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
        let chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE, 10) : TARGET_TOKEN_SIZE;

         if (isNaN(chunkSize) || chunkSize <= 0) {
            console.error(`Invalid CHUNK_SIZE environment variable: ${process.env.CHUNK_SIZE}. Using default ${TARGET_TOKEN_SIZE}.`);
            // Use default instead of exiting? Decide based on requirements.
            chunkSize = TARGET_TOKEN_SIZE;
            // process.exit(1); // Or exit if invalid size is critical
        }

        try {
            await indexDocsQdrant(docsPath, collectionName, model, chunkSize);
        } catch (error) {
            console.error("\n--- Qdrant Indexing failed --- ", error);
            process.exit(1);
        }
    }
}

// Run the indexer if this script is executed directly
runQdrantIndexer();
