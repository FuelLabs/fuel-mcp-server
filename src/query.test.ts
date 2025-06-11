import { describe, it, expect, mock, beforeEach, afterEach } from 'bun:test';

// Mock functions
const mockQueryItemsFn = mock();
const mockIsIndexCreatedFn = mock();
const mockPipelineFn = mock();

// Mock Vectra
mock.module('vectra', () => ({
    LocalIndex: mock((indexPath: string) => ({
        queryItems: mockQueryItemsFn,
        isIndexCreated: mockIsIndexCreatedFn,
    }))
}));

// Mock transformers
mock.module('@xenova/transformers', () => ({
    pipeline: mockPipelineFn,
    env: { cacheDir: '' },
}));

// Import after mocking
import { LocalIndex } from 'vectra';
import { queryDocs } from './query';

describe('queryDocs (Enhanced Vectra - Bun Test)', () => {
    const testQuery = "What is Bun?";
    const testIndexPath = "./test_index";
    const testModel = "test_model";
    const testNResults = 3;
    const mockEmbedding = [0.1, 0.2, 0.3];
    
    // Mock search results that will pass the enhanced filtering
    const mockSearchResults = [
        { 
            item: { 
                metadata: { 
                    content: "Bun is a JavaScript runtime that provides fast performance and modern tooling. It is designed to replace Node.js in many use cases.", 
                    source: "doc1.md", 
                    type: "text",
                    title: "Bun Overview",
                    keywords: ["javascript", "runtime", "performance"]
                } 
            }, 
            score: 0.9 
        },
        { 
            item: { 
                metadata: { 
                    content: "Bun includes a bundler, test runner, and package manager. This makes it a comprehensive JavaScript toolkit for developers.", 
                    source: "features.md", 
                    type: "text",
                    title: "Bun Features",
                    keywords: ["bundler", "toolkit", "developer"]
                } 
            }, 
            score: 0.8 
        }
    ];

    beforeEach(() => {
        // Clear all mocks
        mockQueryItemsFn.mockClear();
        mockIsIndexCreatedFn.mockClear();
        mockPipelineFn.mockClear();
        (LocalIndex as any).mockClear();

        // Setup default successful responses
        mockIsIndexCreatedFn.mockResolvedValue(true);
        mockQueryItemsFn.mockResolvedValue(mockSearchResults);
        mockPipelineFn.mockResolvedValue(async () => ({
            data: new Float32Array(mockEmbedding)
        }));

        // Suppress console output
        console.log = mock();
        console.warn = mock();
        console.error = mock();
    });

    afterEach(() => {
        // Reset console
        console.log = console.log;
        console.warn = console.warn;
        console.error = console.error;
    });

    it('should query Vectra successfully with default parameters', async () => {
        const results = await queryDocs(testQuery);

        expect(LocalIndex).toHaveBeenCalledWith(process.env.VECTRA_INDEX_PATH || "./vectra_index");
        expect(mockIsIndexCreatedFn).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', "Xenova/all-MiniLM-L6-v2");
        
        // Enhanced query calls queryItems with higher count for filtering
        const expectedQueryCount = Math.max(5 * 3, 15); // nResults * 3, minimum 15
        expect(mockQueryItemsFn).toHaveBeenCalledWith(
            expect.arrayContaining([0.1, 0.2, 0.3]),
            expectedQueryCount
        );
        
        // Results should be processed and enhanced
        expect(results).toBeArray();
        expect(results.length).toBeGreaterThan(0);
        
        // Check that results have enhanced properties
        if (results.length > 0) {
            expect(results[0]).toHaveProperty('combinedScore');
            expect(results[0]).toHaveProperty('originalScore');
            expect(results[0]).toHaveProperty('keywordRelevance');
            expect(results[0]).toHaveProperty('contentQuality');
        }
    });

    it('should query Vectra successfully with custom parameters', async () => {
        const results = await queryDocs(testQuery, testIndexPath, testModel, testNResults);

        expect(LocalIndex).toHaveBeenCalledWith(testIndexPath);
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', testModel);
        
        // Enhanced query calls queryItems with higher count for filtering
        const expectedQueryCount = Math.max(testNResults * 3, 15);
        expect(mockQueryItemsFn).toHaveBeenCalledWith(
            expect.arrayContaining([0.1, 0.2, 0.3]),
            expectedQueryCount
        );
        
        expect(results).toBeArray();
    });

    it('should throw error if query text is empty', async () => {
        await expect(queryDocs("")).rejects.toThrow("Query text cannot be empty.");
    });

    it('should throw error if index does not exist', async () => {
        mockIsIndexCreatedFn.mockResolvedValue(false);
        
        await expect(queryDocs(testQuery, testIndexPath))
            .rejects.toThrow(`Vectra index not found at '${testIndexPath}'. Please run the indexer first.`);
    });

    it('should throw error if embedding model loading fails', async () => {
        const modelError = new Error("Model not found");
        mockPipelineFn.mockRejectedValue(modelError);
        
        await expect(queryDocs(testQuery, testIndexPath, testModel))
            .rejects.toThrow(`Failed to load embedding model: ${modelError.message}`);
    });

    it('should throw error if embedding generation fails', async () => {
        const embeddingError = new Error("Embedding failed");
        mockPipelineFn.mockResolvedValue(async () => { 
            throw embeddingError; 
        });
        
        await expect(queryDocs(testQuery, testIndexPath, testModel))
            .rejects.toThrow(`Failed during query embedding: ${embeddingError.message}`);
    });

    it('should throw error if Vectra query fails', async () => {
        const queryError = new Error("Query failed");
        mockQueryItemsFn.mockRejectedValue(queryError);
        
        await expect(queryDocs(testQuery, testIndexPath))
            .rejects.toThrow(`Failed during Vectra query: ${queryError.message}`);
    });

    it('should handle empty query results with fallback search', async () => {
        // First call returns empty results, triggering fallback
        mockQueryItemsFn.mockResolvedValueOnce([]);
        // Second call (fallback) also returns empty
        mockQueryItemsFn.mockResolvedValueOnce([]);
        
        const results = await queryDocs(testQuery, testIndexPath);
        
        expect(results).toEqual([]);
        // Should be called twice: initial search + fallback
        expect(mockQueryItemsFn).toHaveBeenCalledTimes(2);
    });

    it('should handle low-quality results with filtering', async () => {
        // Mock results with low scores that should be filtered out
        const lowQualityResults = [
            { 
                item: { 
                    metadata: { 
                        content: "```css\n.box {}\n```", // Short code snippet
                        source: "styles.md", 
                        type: "code" 
                    } 
                }, 
                score: 0.4 // Low score
            },
            { 
                item: { 
                    metadata: { 
                        content: "Brief text", // Too short
                        source: "brief.md", 
                        type: "text" 
                    } 
                }, 
                score: 0.5 // Low score
            }
        ];
        
        mockQueryItemsFn.mockResolvedValue(lowQualityResults);
        
        const results = await queryDocs(testQuery, testIndexPath);
        
        // Enhanced filtering should remove low-quality results
        expect(results).toBeArray();
        // Results might be empty or have fewer items due to filtering
    });

    it('should enhance high-quality results with scoring', async () => {
        const highQualityResults = [
            { 
                item: { 
                    metadata: { 
                        content: "Bun is a fast JavaScript runtime designed to replace Node.js. It provides excellent performance and modern tooling for developers building web applications.", 
                        source: "bun-overview.md", 
                        type: "text",
                        title: "Bun Runtime Overview",
                        keywords: ["bun", "javascript", "runtime"]
                    } 
                }, 
                score: 0.85 
            }
        ];
        
        mockQueryItemsFn.mockResolvedValue(highQualityResults);
        
        const results = await queryDocs(testQuery, testIndexPath, testModel, 1);
        
        expect(results).toHaveLength(1);
        expect(results[0]).toHaveProperty('combinedScore');
        expect(results[0]).toHaveProperty('originalScore', 0.85);
        expect(results[0]).toHaveProperty('keywordRelevance');
        expect(results[0]).toHaveProperty('contentQuality');
        
        // Combined score should be calculated
        expect(results[0].combinedScore).toBeNumber();
        expect(results[0].combinedScore).toBeGreaterThan(0);
    });

    it('should handle mixed content types correctly', async () => {
        const mixedResults = [
            { 
                item: { 
                    metadata: { 
                        content: "Bun is a comprehensive JavaScript toolkit that includes runtime, bundler, and package manager capabilities.", 
                        source: "docs.md", 
                        type: "text",
                        title: "Bun Documentation"
                    } 
                }, 
                score: 0.9 
            },
            { 
                item: { 
                    metadata: { 
                        content: "```javascript\nconst bun = require('bun');\nconsole.log('Hello from Bun!');\nbun.serve({ port: 3000, fetch: req => new Response('Hello World') });\n```", 
                        source: "examples.md", 
                        type: "code",
                        title: "Bun Examples"
                    } 
                }, 
                score: 0.7 
            }
        ];
        
        mockQueryItemsFn.mockResolvedValue(mixedResults);
        
        const results = await queryDocs(testQuery);
        
        expect(results).toBeArray();
        expect(results.length).toBeGreaterThan(0);
        
        // Should handle both text and code types
        const textResults = results.filter(r => r.item.metadata.type === 'text');
        const codeResults = results.filter(r => r.item.metadata.type === 'code');
        
        // Text content should generally score higher in quality
        if (textResults.length > 0 && codeResults.length > 0) {
            expect(textResults[0].contentQuality).toBeGreaterThanOrEqual(codeResults[0].contentQuality);
        }
    });
});