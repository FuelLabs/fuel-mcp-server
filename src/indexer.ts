import { LocalIndex } from 'vectra';
import { pipeline, env, type Pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';
import * as fsPromises from "fs/promises";
import path from "path";
import { createHash } from "crypto";
import { chunkMarkdown, type MarkdownChunk } from './chunker';

// Disable local cache for transformers.js models
env.cacheDir = '';

// Constants
const BATCH_SIZE = 25; // Process N chunks at a time for embedding (reduced for memory)
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_VECTRA_INDEX_PATH = "./vectra_index"; // Default path for Vectra index directory
const TARGET_TOKEN_SIZE = 2000;
const EMBEDDING_DIMENSION = 384; // Dimension for Xenova/all-MiniLM-L6-v2
const METADATA_FILE = "index_metadata.json"; // File to store indexing metadata

/**
 * Estimates token count (simple whitespace split as a proxy for token count).
 * Replace with a proper tokenizer for the specific model if accuracy is critical.
 */
function estimateTokens(text: string): number {
    return text.split(/\s+/).length;
}

/**
 * Interface for storing index metadata
 */
interface IndexMetadata {
    lastIndexed: string;
    docsHash: string;
    fileCount: number;
    chunkCount: number;
    modelName: string;
    targetChunkSize: number;
    files: Record<string, {
        hash: string;
        lastModified: string;
        size: number;
    }>;
}

/**
 * Calculates SHA-256 hash of a string
 */
function calculateHash(content: string): string {
    return createHash('sha256').update(content).digest('hex');
}

/**
 * Calculates combined hash of all markdown files in a directory
 */
async function calculateDocsHash(docsDir: string): Promise<{ hash: string; files: IndexMetadata['files'] }> {
    const files = await fsPromises.readdir(docsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const fileHashes: IndexMetadata['files'] = {};
    const combinedContent: string[] = [];
    
    for (const file of markdownFiles) {
        const filePath = path.join(docsDir, file);
        try {
            const content = await fsPromises.readFile(filePath, 'utf-8');
            const stats = await fsPromises.stat(filePath);
            const fileHash = calculateHash(content);
            
            fileHashes[file] = {
                hash: fileHash,
                lastModified: stats.mtime.toISOString(),
                size: stats.size
            };
            
            combinedContent.push(fileHash);
        } catch (error) {
            console.warn(`Warning: Could not process file ${file}:`, error);
        }
    }
    
    const combinedHash = calculateHash(combinedContent.sort().join(''));
    return { hash: combinedHash, files: fileHashes };
}

/**
 * Loads index metadata from file
 */
async function loadIndexMetadata(indexPath: string): Promise<IndexMetadata | null> {
    const metadataPath = path.join(indexPath, METADATA_FILE);
    try {
        const content = await fsPromises.readFile(metadataPath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        return null;
    }
}

/**
 * Saves index metadata to file
 */
async function saveIndexMetadata(indexPath: string, metadata: IndexMetadata): Promise<void> {
    const metadataPath = path.join(indexPath, METADATA_FILE);
    await fsPromises.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
}

/**
 * Checks if index needs to be rebuilt based on docs changes
 */
async function shouldRebuildIndex(
    docsDir: string,
    indexPath: string,
    modelName: string,
    targetChunkSize: number
): Promise<{ shouldRebuild: boolean; reason: string; currentHash?: string; files?: IndexMetadata['files'] }> {
    // Check if index exists
    const index = new LocalIndex(indexPath);
    const indexExists = await index.isIndexCreated();
    
    if (!indexExists) {
        return { shouldRebuild: true, reason: "Index does not exist" };
    }
    
    // Load existing metadata
    const metadata = await loadIndexMetadata(indexPath);
    if (!metadata) {
        return { shouldRebuild: true, reason: "Index metadata not found" };
    }
    
    // Check if model or chunk size changed
    if (metadata.modelName !== modelName) {
        return { shouldRebuild: true, reason: `Model changed from ${metadata.modelName} to ${modelName}` };
    }
    
    if (metadata.targetChunkSize !== targetChunkSize) {
        return { shouldRebuild: true, reason: `Chunk size changed from ${metadata.targetChunkSize} to ${targetChunkSize}` };
    }
    
    // Calculate current docs hash
    const { hash: currentHash, files } = await calculateDocsHash(docsDir);
    
    // Check if docs have changed
    if (metadata.docsHash !== currentHash) {
        return { 
            shouldRebuild: true, 
            reason: "Documentation files have changed",
            currentHash,
            files
        };
    }
    
    return { shouldRebuild: false, reason: "Index is up to date" };
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
 * Supports conditional indexing - only rebuilds if docs have changed.
 */
export async function indexDocsVectra(
    docsDir: string,
    indexPath: string = DEFAULT_VECTRA_INDEX_PATH,
    modelName: string = DEFAULT_MODEL,
    targetChunkSize: number = TARGET_TOKEN_SIZE,
    force: boolean = false
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
        console.log("No markdown files found in the specified directory.");
        return; // Exit early if no files found
    }

    // Check if rebuild is needed (unless forced) - ONLY after we know there are files
    if (!force) {
        const rebuildCheck = await shouldRebuildIndex(docsDir, indexPath, modelName, targetChunkSize);
        if (!rebuildCheck.shouldRebuild) {
            console.log(`✅ ${rebuildCheck.reason}`);
            const metadata = await loadIndexMetadata(indexPath);
            if (metadata) {
                console.log(`📊 Index stats: ${metadata.fileCount} files, ${metadata.chunkCount} chunks`);
                console.log(`⏱️  Last indexed: ${metadata.lastIndexed}`);
            }
            return;
        }
        console.log(`🔄 Rebuilding index: ${rebuildCheck.reason}`);
    } else {
        console.log(`🔄 Force rebuild requested`);
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

    // Process files: Read, Chunk (in smaller batches to reduce memory usage)
    console.log(`Processing ${markdownFiles.length} markdown files...`);
    
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
                console.log(`  - Processed ${file}: ${chunks.length} chunks`);
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
        
        // Force garbage collection between batches to reduce memory usage
        if (typeof global !== 'undefined' && global.gc) {
            global.gc();
        }
    }

    // Save metadata after successful indexing
    const { hash: docsHash, files: fileMetadata } = await calculateDocsHash(docsDir);
    const metadata: IndexMetadata = {
        lastIndexed: new Date().toISOString(),
        docsHash,
        fileCount: markdownFiles.length,
        chunkCount: totalChunksProcessed,
        modelName,
        targetChunkSize,
        files: fileMetadata
    };
    
    try {
        await saveIndexMetadata(indexPath, metadata);
        console.log(`💾 Saved index metadata`);
    } catch (error) {
        console.warn(`Warning: Could not save index metadata:`, error);
    }

    console.log(`--------------------------------------------------`);
    console.log(`✅ Vectra Indexing finished!`);
    console.log(`📁 Total markdown files processed: ${markdownFiles.length}`);
    console.log(`📄 Total chunks added to Vectra index: ${totalChunksProcessed}`);
    console.log(`📍 Index located at: ${indexPath}`);
    console.log(`⏱️  Indexed at: ${metadata.lastIndexed}`);
    console.log(`--------------------------------------------------`);
}

// Example of running the script directly
async function runVectraIndexer() {
    // Simple check if executed directly
    if (require.main === module || (typeof Bun !== 'undefined' && Bun.main === import.meta.path)) {
        const args = process.argv.slice(2);
        const docsPath = args.find(arg => !arg.startsWith('--')) || './docs'; // Get docs path from command line or default
        const force = args.includes('--force') || args.includes('-f');
        
        const indexPath = process.env.VECTRA_INDEX_PATH || DEFAULT_VECTRA_INDEX_PATH; // Get index path from env or default
        const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
        let chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE, 10) : TARGET_TOKEN_SIZE;

         if (isNaN(chunkSize) || chunkSize <= 0) {
            console.warn(`Invalid CHUNK_SIZE environment variable: ${process.env.CHUNK_SIZE}. Using default ${TARGET_TOKEN_SIZE}.`);
            chunkSize = TARGET_TOKEN_SIZE;
         }

        try {
            await indexDocsVectra(docsPath, indexPath, model, chunkSize, force);
        } catch (error) {
            console.error("\n--- Vectra Indexing failed --- ", error);
            process.exit(1);
        }
    }
}

// Run the indexer if this script is executed directly
runVectraIndexer();
