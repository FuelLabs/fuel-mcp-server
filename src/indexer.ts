import { LocalIndex } from 'vectra';
import { pipeline, env, type Pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';
import * as fsPromises from "fs/promises";
import path from "path";
import { chunkMarkdown, type MarkdownChunk } from './chunker';

// Disable local cache for transformers.js models
env.cacheDir = '';

// Constants
const BATCH_SIZE = 100; // Process N chunks at a time for embedding
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_VECTRA_INDEX_PATH = "./vectra_index"; // Default path for Vectra index directory
const TARGET_TOKEN_SIZE = 2000;
const EMBEDDING_DIMENSION = 384; // Dimension for Xenova/all-MiniLM-L6-v2

/**
 * Estimates token count (simple whitespace split as a proxy for token count).
 * Replace with a proper tokenizer for the specific model if accuracy is critical.
 */
function estimateTokens(text: string): number {
    return text.split(/\s+/).length;
}

/**
 * Ensures a Vectra index directory exists, creating it if necessary.
 */
async function getOrCreateIndex(index: LocalIndex, indexPath: string): Promise<void> {
    try {
        if (!(await index.isIndexCreated())) {
            console.log(`Vectra index not found at '${indexPath}'. Creating...`);
            await index.createIndex();
            console.log(`Vectra index created successfully at '${indexPath}'.`);
        } else {
            console.log(`Vectra index already exists at '${indexPath}'.`);
        }
    } catch (error) {
        console.error(`Error ensuring Vectra index exists at '${indexPath}':`, error);
        throw new Error(`Failed to ensure Vectra index: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Indexes markdown documents from a directory into a Vectra local index.
 */
export async function indexDocsVectra(
    docsDir: string,
    indexPath: string = DEFAULT_VECTRA_INDEX_PATH,
    modelName: string = DEFAULT_MODEL,
    targetChunkSize: number = TARGET_TOKEN_SIZE
): Promise<void> {
    console.log(`Starting Vectra indexing process...`);
    console.log(`Docs directory: ${docsDir}`);
    console.log(`Vectra index path: ${indexPath}`);
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

    // Initialize Vectra index and check/create directory ONLY if files are found
    let index: LocalIndex;
    try {
        index = new LocalIndex(indexPath);
        await getOrCreateIndex(index, indexPath);
        console.log(`Successfully connected to/created Vectra index at '${indexPath}'.`);
    } catch (error) {
        console.error(`\n❌ Error initializing Vectra index at '${indexPath}':`, error);
        throw new Error(`Failed to initialize Vectra index: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Initialize embedding model pipeline (already confirmed files exist)
    let embedder: FeatureExtractionPipeline;
    try {
        console.log(`Loading embedding model '${modelName}'... (This might take a while the first time)`);
        embedder = await pipeline('feature-extraction', modelName);
        console.log(`Embedding model loaded successfully.`);
    } catch (error) {
        console.error(`Error loading embedding model '${modelName}':`, error);
        throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
    }

    let totalChunksProcessed = 0;
    let allChunks: { chunk: MarkdownChunk; source: string }[] = [];

    // Process files: Read, Chunk
    for (const file of markdownFiles) {
        const filePath = path.join(docsDir, file);
        try {
            const content = await fsPromises.readFile(filePath, "utf-8");
            const chunks = chunkMarkdown(content, targetChunkSize, estimateTokens);

            if (chunks.length > 0) {
                allChunks.push(...chunks.map((chunk) => ({
                    chunk,
                    source: file, // Store source filename
                })));
            } else {
                 console.log(`  - No chunks generated for ${file} (might be empty or only contain whitespace).`);
            }
        } catch (error) {
            console.error(`Error processing file ${file}:`, error);
            // Log error and continue with other files
        }
    }

    if (allChunks.length === 0) {
        console.log("No content chunks were generated from the markdown files.");
        return;
    }

    console.log(`Total chunks generated: ${allChunks.length}. Preparing for embedding and adding to Vectra...`);

    // Process Chunks in Batches: Embed, Add to Vectra
    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
        const batch = allChunks.slice(i, i + BATCH_SIZE);
        const batchIndex = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(allChunks.length / BATCH_SIZE);
        console.log(`Processing batch ${batchIndex} of ${totalBatches} (size: ${batch.length})...`);

        const batchTexts = batch.map(item => item.chunk.content);
        let batchEmbeddings: number[][] = [];

        // 1. Generate Embeddings for the batch
        try {
            console.log("  - Generating embeddings...");
            const output = await embedder(batchTexts, { pooling: 'mean', normalize: true });

            // Extract embeddings reliably
             if (output && output.data instanceof Float32Array && output.dims && output.dims.length === 2) {
                const embeddingDim = output.dims[1];
                const numEmbeddings = output.dims[0];
                if (typeof numEmbeddings !== 'number') {
                    throw new Error('numEmbeddings is undefined or not a number');
                }
                if (typeof embeddingDim !== 'number') {
                    throw new Error('embeddingDim is undefined or not a number');
                }
                 if (embeddingDim !== EMBEDDING_DIMENSION) {
                     console.warn(`Warning: Expected embedding dimension ${EMBEDDING_DIMENSION}, but got ${embeddingDim}. Ensure model matches dimension.`);
                 }
                for (let j = 0; j < numEmbeddings; ++j) {
                    batchEmbeddings.push(Array.from(output.data.slice(j * embeddingDim, (j + 1) * embeddingDim)));
                }
            } else if (Array.isArray(output) && output[0]?.embedding) { // Alternative structure check
                 batchEmbeddings = output.map(emb => Array.from(emb.embedding || []));
                  if (batchEmbeddings[0]?.length !== EMBEDDING_DIMENSION && batchEmbeddings.length > 0) {
                    console.warn(`Warning: Expected embedding dimension ${EMBEDDING_DIMENSION}, but got ${batchEmbeddings[0]?.length}. Ensure model matches dimension.`);
                }
            }
            else {
                console.warn("Unexpected embedding output structure:", output);
                throw new Error("Could not extract embeddings from pipeline output.");
            }
            console.log(`  - Generated ${batchEmbeddings.length} embeddings.`);

        } catch (error) {
            console.error(`Error generating embeddings for batch ${batchIndex}:`, error);
            // Decide if we should stop or just skip the batch
            console.warn(`  - Skipping batch ${batchIndex} due to embedding error.`);
            continue; // Skip to next batch
        }

        if (batchEmbeddings.length !== batch.length) {
            console.error(`Mismatch between number of chunks (${batch.length}) and generated embeddings (${batchEmbeddings.length}) in batch ${batchIndex}. Skipping batch.`);
            continue; // Skip this batch
        }

        // 2. Add items to Vectra index one by one (Vectra's insertItem is atomic)
        console.log(`  - Adding batch ${batchIndex} items to Vectra index...`);
        let batchItemsAdded = 0;
        for (let j = 0; j < batch.length; j++) {
            const item = batch[j];
            if (!item) {
                console.warn(`  - Warning: Skipping undefined item in batch ${batchIndex}.`);
                continue;
            }
            const vector = batchEmbeddings[j];

            if (!vector || vector.length !== EMBEDDING_DIMENSION) {
                console.warn(`  - Warning: Skipping item from ${item.source} due to missing or invalid dimension embedding in batch ${batchIndex}.`);
                continue;
            }

            try {
                 await index.insertItem({
                    vector: vector,
                    metadata: { // Store relevant metadata
                        source: item.source,
                        type: item.chunk.type,
                        content: item.chunk.content // Store original content
                    }
                 });
                 batchItemsAdded++;
            } catch (error) {
                console.error(`  - Error adding item from ${item.source} (chunk ${j}) in batch ${batchIndex} to Vectra:`, error);
                // Log and continue with the next item in the batch
            }
        }
        totalChunksProcessed += batchItemsAdded;
        console.log(`  - Added ${batchItemsAdded} items from batch ${batchIndex} to Vectra index.`);
    }

    console.log(`--------------------------------------------------`);
    console.log(`Vectra Indexing finished!`);
    console.log(`Total markdown files processed: ${markdownFiles.length}`);
    console.log(`Total chunks added to Vectra index: ${totalChunksProcessed}`);
    console.log(`Index located at: ${indexPath}`);
    console.log(`--------------------------------------------------`);
}

// Example of running the script directly
async function runVectraIndexer() {
    // Simple check if executed directly
    if (require.main === module || (typeof Bun !== 'undefined' && Bun.main === import.meta.path)) {
        const docsPath = process.argv[2] || './docs'; // Get docs path from command line or default
        const indexPath = process.env.VECTRA_INDEX_PATH || DEFAULT_VECTRA_INDEX_PATH; // Get index path from env or default
        const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
        let chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE, 10) : TARGET_TOKEN_SIZE;

         if (isNaN(chunkSize) || chunkSize <= 0) {
            console.warn(`Invalid CHUNK_SIZE environment variable: ${process.env.CHUNK_SIZE}. Using default ${TARGET_TOKEN_SIZE}.`);
            chunkSize = TARGET_TOKEN_SIZE;
         }

        try {
            await indexDocsVectra(docsPath, indexPath, model, chunkSize);
        } catch (error) {
            console.error("\n--- Vectra Indexing failed --- ", error);
            process.exit(1);
        }
    }
}

// Run the indexer if this script is executed directly
runVectraIndexer();
