import { LocalIndex } from 'vectra';
import { pipeline, env, type FeatureExtractionPipeline } from '@xenova/transformers';

// Disable local cache for transformers.js models
env.cacheDir = '';

// --- Constants ---
const DEFAULT_MODEL = "Xenova/all-MiniLM-L6-v2";
const DEFAULT_VECTRA_INDEX_PATH = process.env.VECTRA_INDEX_PATH || "./vectra_index";
const MIN_SCORE_THRESHOLD = 0.7; // Filter out low-relevance results
const MIN_CONTENT_LENGTH = 50; // Filter out very short snippets

export function log(...messages: any[]) {
    if (process.env.LOG_LEVEL === "debug") {
        console.log(...messages);
    }
}

/**
 * Improved query function with better result filtering and hybrid search
 */
export async function queryDocs(
    queryText: string,
    indexPath: string = DEFAULT_VECTRA_INDEX_PATH,
    modelName: string = DEFAULT_MODEL,
    nResults: number = 5
): Promise<any> {
    if (!queryText) {
        throw new Error("Query text cannot be empty.");
    }

    log(`Starting enhanced Vectra query process...`);
    log(`Index Path: ${indexPath}`);
    log(`Embedding Model: ${modelName}`);
    log(`Query: "${queryText}"`);
    log(`Number of results: ${nResults}`);

    // --- Initialize Vectra Index ---
    let index: LocalIndex;
    try {
        log(`Connecting to Vectra index at ${indexPath}...`);
        index = new LocalIndex(indexPath);
        
        if (!(await index.isIndexCreated())) {
            throw new Error(`Vectra index not found at '${indexPath}'. Please run the indexer first.`);
        }
        
        log(`Successfully connected to Vectra index.`);
    } catch (error) {
        console.error(`\n❌ Error initializing Vectra index at ${indexPath}:`, error);
        console.error(`\n   Troubleshooting Tips:`);
        console.error(`   1. Ensure the Vectra index exists at '${indexPath}'.`);
        console.error(`   2. Run the indexer script first to create the index.`);
        console.error(`   (Configure via VECTRA_INDEX_PATH env var)`);
        throw new Error(`Failed to initialize Vectra index: ${error instanceof Error ? error.message : String(error)}`);
    }

    // --- Initialize embedding model pipeline ---
    let embedder: FeatureExtractionPipeline;
    try {
        log(`Loading embedding model '${modelName}'...`);
        embedder = await pipeline('feature-extraction', modelName) as FeatureExtractionPipeline; 
        log(`Embedding model loaded successfully.`);
    } catch (error) {
        console.error(`Error loading embedding model '${modelName}':`, error);
        throw new Error(`Failed to load embedding model: ${error instanceof Error ? error.message : String(error)}`);
    }

    // --- Embed the query text ---
    let queryEmbedding: number[];
    try {
        log("Generating query embedding...");
        const output = await embedder(queryText, { pooling: 'mean', normalize: true });
        
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

    // --- Query Vectra with higher result count for filtering ---
    let rawResults: any[];
    try {
        log(`Querying Vectra index...`);
        // Get more results than requested so we can filter and still have enough
        const queryCount = Math.max(nResults * 3, 15);
        rawResults = await index.queryItems(queryEmbedding, queryCount);
        log(`Vectra query successful. Found ${rawResults.length} raw results.`);
    } catch (error) {
        console.error(`Error querying Vectra index:`, error);
        throw new Error(`Failed during Vectra query: ${error instanceof Error ? error.message : String(error)}`);
    }

    // --- Enhanced result filtering and ranking ---
    const filteredResults = filterAndRankResults(rawResults, queryText, nResults);
    log(`Filtered to ${filteredResults.length} high-quality results.`);

    // --- Hybrid search fallback if no good semantic results ---
    if (filteredResults.length === 0) {
        log("No high-quality semantic results found, attempting keyword-based fallback...");
        const keywordResults = await performKeywordSearch(index, queryText, queryEmbedding, nResults * 2);
        const fallbackResults = filterAndRankResults(keywordResults, queryText, nResults);
        log(`Keyword search found ${fallbackResults.length} results.`);
        return fallbackResults;
    }

    return filteredResults;
}

/**
 * Enhanced filtering and ranking of search results
 */
function filterAndRankResults(results: any[], queryText: string, maxResults: number): any[] {
    const queryLower = queryText.toLowerCase();
    const queryTerms = queryLower.split(/\s+/);

    return results
        .filter(result => {
            const metadata = result.item?.metadata || {};
            const content = metadata.content || '';
            const score = result.score || 0;

            // Filter criteria
            return (
                score >= MIN_SCORE_THRESHOLD || // High semantic similarity
                content.length >= MIN_CONTENT_LENGTH || // Substantial content
                containsRelevantKeywords(content, queryTerms) || // Contains query terms
                isHighQualityContent(content, metadata) // Quality indicators
            );
        })
        .map(result => {
            // Enhanced scoring that combines semantic similarity with content quality
            const metadata = result.item?.metadata || {};
            const content = metadata.content || '';
            const semanticScore = result.score || 0;
            
            // Calculate keyword relevance bonus
            const keywordScore = calculateKeywordRelevance(content, queryTerms);
            
            // Content quality bonus
            const qualityScore = calculateContentQuality(content, metadata);
            
            // Combined score
            const combinedScore = semanticScore * 0.6 + keywordScore * 0.3 + qualityScore * 0.1;
            
            return {
                ...result,
                originalScore: semanticScore,
                combinedScore,
                keywordRelevance: keywordScore,
                contentQuality: qualityScore
            };
        })
        .sort((a, b) => b.combinedScore - a.combinedScore)
        .slice(0, maxResults);
}

/**
 * Check if content contains relevant keywords
 */
function containsRelevantKeywords(content: string, queryTerms: string[]): boolean {
    const contentLower = content.toLowerCase();
    return queryTerms.some(term => 
        contentLower.includes(term) || 
        contentLower.includes(term.slice(0, -1)) // Handle plurals
    );
}

/**
 * Identify high-quality content based on various indicators
 */
function isHighQualityContent(content: string, metadata: any): boolean {
    // Avoid pure code snippets without explanation
    if (metadata.type === 'code' && content.length < 200) return false;
    
    // Look for explanatory text patterns
    const explanatoryPatterns = [
        /^[A-Z][^.]*\s+is\s+/i,           
        /^[A-Z][^.]*\s+allows?\s+/i,     
        /^[A-Z][^.]*\s+provides?\s+/i,    
        /definition|overview|introduction|explanation/i,
        /\b(what|how|why)\s+/i,
    ];
    
    return explanatoryPatterns.some(pattern => pattern.test(content)) ||
           (content.length > 150 && !content.trim().startsWith('```')); // Substantial non-code content
}

/**
 * Calculate keyword relevance score
 */
function calculateKeywordRelevance(content: string, queryTerms: string[]): number {
    const contentLower = content.toLowerCase();
    let score = 0;
    
    for (const term of queryTerms) {
        const termLower = term.toLowerCase();
        if (contentLower.includes(termLower)) {
            // Exact match bonus
            score += 0.3;
            
            // Beginning of sentence bonus
            if (contentLower.includes(`. ${termLower}`) || contentLower.startsWith(termLower)) {
                score += 0.2;
            }
            
            // Title/header bonus
            if (contentLower.includes(`# ${termLower}`) || contentLower.includes(`## ${termLower}`)) {
                score += 0.4;
            }
        }
    }
    
    return Math.min(score, 1.0); // Cap at 1.0
}

/**
 * Calculate content quality score
 */
function calculateContentQuality(content: string, metadata: any): number {
    let score = 0;
    
    // Length bonus (but not too long)
    const length = content.length;
    if (length > 100 && length < 2000) score += 0.3;
    
    // Type preference
    if (metadata.type === 'text') score += 0.2;
    
    // Structure indicators
    if (content.includes('\n\n')) score += 0.1; // Paragraphs
    if (content.match(/^#+\s/m)) score += 0.2;   // Headers
    if (content.includes('. ')) score += 0.1;    // Sentences
    
    return Math.min(score, 1.0);
}

/**
 * Keyword-based search fallback using metadata filtering
 */
async function performKeywordSearch(index: LocalIndex, queryText: string, queryEmbedding: number[], maxResults: number): Promise<any[]> {
    try {
        // Get more results for keyword filtering
        const allResults = await index.queryItems(queryEmbedding, maxResults * 3);
        
        const queryTerms = queryText.toLowerCase().split(/\s+/);
        
        // Filter by keyword presence in metadata
        return allResults.filter(result => {
            const metadata = result.item?.metadata || {};
            const searchableText = [
                metadata.content || '',
                metadata.title || '',
                metadata.section || '',
                (metadata.keywords || []).join(' ')
            ].join(' ').toLowerCase();
            
            return queryTerms.some(term => searchableText.includes(term));
        });
    } catch (error) {
        log(`Keyword search fallback failed: ${error}`);
        return [];
    }
}

// --- Example of running the script directly ---
async function run() {
    const runFlagIndex = process.argv.indexOf('--run');
    const query = process.argv.find((arg, i) => i > runFlagIndex && !arg.startsWith('--')); 

    if (runFlagIndex === -1 || !query) {
        console.error(`Usage: bun src/query.ts --run "Your query text here"`);
        process.exit(1);
    }

    const indexPath = process.env.VECTRA_INDEX_PATH || DEFAULT_VECTRA_INDEX_PATH; 
    const model = process.env.EMBEDDING_MODEL || DEFAULT_MODEL;
    const numResults = process.env.NUM_RESULTS ? parseInt(process.env.NUM_RESULTS, 10) : 5;

    if (isNaN(numResults) || numResults <= 0) {
        console.warn(`Invalid NUM_RESULTS environment variable: '${process.env.NUM_RESULTS}'. Using default ${5}.`);
    }

    try {
        log(`Executing enhanced query against Vectra: "${query}"`);
        const queryResults = await queryDocs(query, indexPath, model, numResults);
        log("\n--- Enhanced Vectra Query Results ---");
        console.log(JSON.stringify(queryResults, null, 2));
        log("\n------------------------------------");
    } catch (error) {
        console.error("\n--- Vectra Query failed ---", error);
        process.exit(1);
    }
}

// Only run if --run flag is present
if (process.argv.includes('--run')) {
    run();
}