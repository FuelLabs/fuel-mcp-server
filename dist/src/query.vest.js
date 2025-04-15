import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// Define mock functions externally
const mockSearchFn = vi.fn();
const mockGetCollectionFn = vi.fn();
// Hoist the pipeline mock function definition to avoid ReferenceError
const { mockPipelineFn } = vi.hoisted(() => {
    return { mockPipelineFn: vi.fn() };
});
// const mockPipelineFn = vi.fn(); // Remove original definition
// Use standard vi.mock again
vi.mock('@qdrant/js-client-rest', () => {
    const QdrantClientMock = vi.fn().mockImplementation(() => ({
        search: mockSearchFn,
        getCollection: mockGetCollectionFn,
    }));
    return {
        QdrantClient: QdrantClientMock,
        __esModule: true,
    };
});
vi.mock('@xenova/transformers', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        // Use the hoisted mock function
        pipeline: mockPipelineFn,
        __esModule: true,
    };
});
// Import QdrantClient and pipeline AFTER vi.mock calls
import { QdrantClient } from '@qdrant/js-client-rest';
// Import the module under test AFTER mocks are defined
import { queryDocs } from './query';
// Define interfaces if needed, but often not strictly necessary with this pattern
// interface QdrantClientMock extends QdrantClient {
//     search: vi.Mock;
//     getCollection: vi.Mock;
// }
describe('queryDocs (Qdrant)', () => {
    // Remove queryDocs declaration, it's imported statically now
    // let queryDocs: typeof import('./query-qdrant').queryDocs;
    // Check constructor directly using the imported (mocked) QdrantClient
    const testQuery = "What is Bun?";
    const testCollection = "test_collection";
    const testModel = "test_model";
    const testNResults = 3;
    const testQdrantUrl = "http://test-qdrant:6333";
    const testApiKey = "test-api-key";
    const mockEmbedding = [0.1, 0.2, 0.3];
    const mockSearchResults = [{ id: 1, score: 0.9, payload: { text: "Bun is a runtime." } }];
    beforeEach(() => {
        vi.clearAllMocks();
        // Restore constructor mock implementation WITHOUT casting
        // Vitest should allow modifying the mock directly via the imported variable
        QdrantClient.mockImplementation(() => ({
            search: mockSearchFn,
            getCollection: mockGetCollectionFn,
        }));
        // Default successful mocks setups 
        mockPipelineFn.mockResolvedValue(async () => {
            return { data: new Float32Array(mockEmbedding) };
        });
        mockGetCollectionFn.mockResolvedValue({ name: testCollection });
        mockSearchFn.mockResolvedValue(mockSearchResults);
        // Suppress console logs 
        vi.spyOn(console, 'log').mockImplementation(() => { });
        vi.spyOn(console, 'warn').mockImplementation(() => { });
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('should query Qdrant successfully with default parameters', async () => {
        const results = await queryDocs(testQuery);
        expect(QdrantClient).toHaveBeenCalledWith({
            url: process.env.QDRANT_URL || "http://localhost:6333",
            apiKey: process.env.QDRANT_API_KEY,
        });
        expect(mockGetCollectionFn).toHaveBeenCalledWith(process.env.QDRANT_COLLECTION || "bun_qdrant_docs");
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', "Xenova/all-MiniLM-L6-v2");
        expect(mockPipelineFn).toHaveBeenCalledTimes(1);
        // Use expect.objectContaining and expect.arrayContaining with expect.closeTo for float precision
        expect(mockSearchFn).toHaveBeenCalledWith(process.env.QDRANT_COLLECTION || "bun_qdrant_docs", expect.objectContaining({
            limit: 5,
            vector: expect.arrayContaining([
                expect.closeTo(0.1, 5), // 5 decimal places precision
                expect.closeTo(0.2, 5),
                expect.closeTo(0.3, 5)
            ]),
            with_payload: true,
        }));
        expect(results).toEqual(mockSearchResults);
    });
    it('should query Qdrant successfully with custom parameters', async () => {
        const results = await queryDocs(testQuery, testCollection, testModel, testNResults, testQdrantUrl, testApiKey);
        expect(QdrantClient).toHaveBeenCalledWith({
            url: testQdrantUrl,
            apiKey: testApiKey,
        });
        expect(mockGetCollectionFn).toHaveBeenCalledWith(testCollection);
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', testModel);
        expect(mockPipelineFn).toHaveBeenCalledTimes(1);
        // Also apply float precision check here if mockEmbedding is used (it is)
        expect(mockSearchFn).toHaveBeenCalledWith(testCollection, expect.objectContaining({
            limit: testNResults,
            vector: expect.arrayContaining([
                expect.closeTo(0.1, 5),
                expect.closeTo(0.2, 5),
                expect.closeTo(0.3, 5)
            ]),
            with_payload: true,
        }));
        expect(results).toEqual(mockSearchResults);
    });
    it('should throw error if query text is empty', async () => {
        await expect(queryDocs("")).rejects.toThrow("Query text cannot be empty.");
    });
    it('should throw error if Qdrant client initialization fails', async () => {
        const initError = new Error("Connection refused");
        // Use type assertion only here where we override implementation for one test
        QdrantClient.mockImplementation(() => {
            throw initError;
        });
        await expect(queryDocs(testQuery, testCollection, testModel, testNResults, testQdrantUrl))
            .rejects.toThrow(`Failed to initialize Qdrant client: ${initError.message}`);
    });
    it('should throw error if collection does not exist', async () => {
        const collectionError = new Error("Not Found");
        collectionError.status = 404;
        mockGetCollectionFn.mockRejectedValue(collectionError);
        await expect(queryDocs(testQuery, testCollection))
            .rejects.toThrow(`Collection '${testCollection}' not found.`);
    });
    it('should throw error if checking collection fails with non-404 error', async () => {
        const otherError = new Error("Internal Server Error");
        mockGetCollectionFn.mockRejectedValue(otherError);
        await expect(queryDocs(testQuery, testCollection))
            .rejects.toThrow(`Failed to check Qdrant collection: ${otherError.message}`);
    });
    it('should throw error if embedding model loading fails', async () => {
        const modelError = new Error("Model not found");
        mockPipelineFn.mockRejectedValue(modelError);
        await expect(queryDocs(testQuery, testCollection, testModel))
            .rejects.toThrow(`Failed to load embedding model: ${modelError.message}`);
    });
    it('should throw error if query embedding generation fails', async () => {
        const embeddingError = new Error("Embedding failed");
        mockPipelineFn.mockResolvedValue(async () => { throw embeddingError; });
        await expect(queryDocs(testQuery, testCollection, testModel))
            .rejects.toThrow(`Failed during query embedding: ${embeddingError.message}`);
    });
    it('should throw error if embedding output format is unexpected', async () => {
        mockPipelineFn.mockResolvedValue(async () => {
            return { someOtherFormat: [1, 2, 3] };
        });
        await expect(queryDocs(testQuery, testCollection, testModel))
            .rejects.toThrow("Could not extract embedding from pipeline output for query.");
    });
    it('should throw error if Qdrant search fails', async () => {
        const searchError = new Error("Search failed");
        mockSearchFn.mockRejectedValue(searchError);
        await expect(queryDocs(testQuery, testCollection, testModel, testNResults, testQdrantUrl))
            .rejects.toThrow(`Failed during Qdrant query: ${searchError.message}`);
    });
});
