// src/query.test.ts
import { test, expect, mock, beforeEach, afterEach, describe } from "bun:test";
import { queryDocs } from "./query";
// Import types for clarity, though not strictly required for mocks
// import type { ChromaClient as ChromaClientType, Collection } from 'chromadb';
// import type { Pipeline, PipelineType } from '@xenova/transformers';

// --- Mock Implementations ---
// Define mock functions outside describe for easier access in beforeEach/tests
let mockGetCollection = mock(async (args: { name: string }) => ({ query: mock() }));
let mockCollectionQuery = mock(async (args: any) => ({})); // Placeholder return
let mockPipelineFn = mock(async (task: string, model: string) => mock()); // Returns another mock (embedder)
let mockEmbedderFn = mock(async (text: string, opts: any) => ({})); // Placeholder return

// Mock ChromaClient constructor and its methods
const mockChromaInstance = {
    getCollection: mockGetCollection, // Assign the mock function
    tenant: "mock_tenant",
    database: "mock_db",
};
const MockChromaClient = mock(() => mockChromaInstance); // Mock the constructor

// --- Module Mocking ---
mock.module("chromadb", () => ({
    ChromaClient: MockChromaClient,
}));

mock.module("@xenova/transformers", () => ({
    pipeline: mockPipelineFn, // Assign the mock function
    env: { cacheDir: "" },
}));

// Mock console logs globally
// mock.module("console", () => ({
//     log: mock(),
//     error: mock(),
// }));

describe("queryDocs", () => {

    beforeEach(() => {
        // Reset call counts and implementations for all top-level mocks
        MockChromaClient.mockClear();
        mockGetCollection.mockClear();
        mockPipelineFn.mockClear();
        // Reset inner mocks created during previous tests
        mockCollectionQuery.mockClear();
        mockEmbedderFn.mockClear();

        // --- Re-configure mocks for each test ---

        // Configure getCollection to return an object containing the specific mockCollectionQuery
        mockGetCollection.mockResolvedValue({
            query: mockCollectionQuery,
        });

        // Configure pipeline to return the specific mockEmbedderFn
        mockPipelineFn.mockResolvedValue(mockEmbedderFn);

        // --- Set default resolved values for inner mocks ---

        // Mock the embedder's output
        mockEmbedderFn.mockResolvedValue({
            data: new Float32Array([0.1, 0.2, 0.3]),
        });

        // Mock the collection query result
        mockCollectionQuery.mockResolvedValue({
            ids: [["doc1"]],
            distances: [[0.5]],
            metadatas: [[{ source: "file1.md" }]],
            embeddings: null,
            documents: [["Document content"]],
        });
    });

    // afterEach(() => {
    //     // Bun usually handles cleanup, mock.restore() might be needed in complex scenarios
    // });

    test("should successfully query documents with valid input", async () => {
        const queryText = "test query";
        const collectionName = "test_collection";
        const modelName = "test_model";
        const nResults = 1;
        const baseEmbedding = [0.1, 0.2, 0.3]; // Base values
        const expectedEmbedding = Array.from(new Float32Array(baseEmbedding)); // Match code generation
        const expectedResults = { // Based on mockCollectionQuery setup
             ids: [["doc1"]],
            distances: [[0.5]],
            metadatas: [[{ source: "file1.md" }]],
            embeddings: null,
            documents: [["Document content"]],
        };

        const results = await queryDocs(queryText, collectionName, modelName, nResults);

        expect(results).toEqual(expectedResults);
        // Verify calls
        expect(MockChromaClient).toHaveBeenCalledTimes(1);
        expect(mockGetCollection).toHaveBeenCalledTimes(1);
        expect(mockGetCollection).toHaveBeenCalledWith({ name: collectionName });
        expect(mockPipelineFn).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', modelName);
        expect(mockEmbedderFn).toHaveBeenCalledTimes(1);
        expect(mockEmbedderFn).toHaveBeenCalledWith(queryText, { pooling: 'mean', normalize: true });
        expect(mockCollectionQuery).toHaveBeenCalledTimes(1);
        expect(mockCollectionQuery).toHaveBeenCalledWith({
            queryEmbeddings: [expectedEmbedding],
            nResults: nResults,
        });
    });

    test("should throw an error if query text is empty", async () => {
        await expect(queryDocs("")).rejects.toThrow("Query text cannot be empty.");
        expect(MockChromaClient).not.toHaveBeenCalled();
        expect(mockPipelineFn).not.toHaveBeenCalled();
    });

    test("should throw an error if getting the collection fails", async () => {
        const collectionError = new Error("Failed to connect");
        mockGetCollection.mockRejectedValue(collectionError);

        await expect(queryDocs("test query", "bad_collection")).rejects.toThrow(
            `Failed to get ChromaDB collection: ${collectionError.message}`
        );
        expect(MockChromaClient).toHaveBeenCalledTimes(1);
        expect(mockGetCollection).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).not.toHaveBeenCalled();
    });

     test("should throw an error if loading the embedding model fails", async () => {
        const modelError = new Error("Model not found");
        mockPipelineFn.mockRejectedValue(modelError);

        await expect(queryDocs("test query", "test_collection", "bad_model")).rejects.toThrow(
             `Failed to load embedding model: ${modelError.message}`
        );
        expect(MockChromaClient).toHaveBeenCalledTimes(1);
        expect(mockGetCollection).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', "bad_model");
        expect(mockEmbedderFn).not.toHaveBeenCalled();
        expect(mockCollectionQuery).not.toHaveBeenCalled();
    });

    test("should throw an error if generating the query embedding fails", async () => {
        const embeddingError = new Error("Embedding generation failed");
        mockEmbedderFn.mockRejectedValue(embeddingError);

        await expect(queryDocs("test query")).rejects.toThrow(
             `Failed during query embedding: ${embeddingError.message}`
        );
        expect(MockChromaClient).toHaveBeenCalledTimes(1);
        expect(mockGetCollection).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).toHaveBeenCalledTimes(1);
        expect(mockEmbedderFn).toHaveBeenCalledTimes(1);
        expect(mockCollectionQuery).not.toHaveBeenCalled();
    });

     test("should throw an error if querying the collection fails", async () => {
        const queryError = new Error("Chroma query failed");
        mockCollectionQuery.mockRejectedValue(queryError);

        await expect(queryDocs("test query")).rejects.toThrow(
             `Failed during ChromaDB query: ${queryError.message}`
        );
        expect(MockChromaClient).toHaveBeenCalledTimes(1);
        expect(mockGetCollection).toHaveBeenCalledTimes(1);
        expect(mockPipelineFn).toHaveBeenCalledTimes(1);
        expect(mockEmbedderFn).toHaveBeenCalledTimes(1);
        expect(mockCollectionQuery).toHaveBeenCalledTimes(1);
    });

     test("should handle alternative embedding structure { embedding: [...] }", async () => {
        const altEmbedding = [0.4, 0.5, 0.6];
        mockEmbedderFn.mockResolvedValue({
            embedding: altEmbedding, // Alternative structure
        });

        await queryDocs("test query", "test_collection", "alt_model", 1);

        expect(mockCollectionQuery).toHaveBeenCalledWith({
            queryEmbeddings: [altEmbedding],
            nResults: 1,
        });
    });

     test("should handle alternative embedding structure [{ embedding: [...] }]", async () => {
         const arrayEmbedding = [0.7, 0.8, 0.9];
        mockEmbedderFn.mockResolvedValue([ // Array structure
             { embedding: arrayEmbedding }
        ]);

        await queryDocs("test query", "test_collection", "array_model", 1);

        expect(mockCollectionQuery).toHaveBeenCalledWith({
            queryEmbeddings: [arrayEmbedding],
            nResults: 1,
        });
    });

      test("should throw an error if embedding structure is unknown", async () => {
        mockEmbedderFn.mockResolvedValue({ some_other_key: [1, 2, 3] }); // Unrecognized structure

        await expect(queryDocs("test query")).rejects.toThrow(
             "Failed during query embedding: Could not extract embedding from pipeline output for query."
        );
        expect(mockCollectionQuery).not.toHaveBeenCalled();
    });

    test("should use default collection, model, and nResults if not provided", async () => {
        const queryText = "default test";
        const baseEmbedding = [0.1, 0.2, 0.3]; // Base values from default mock setup
        const expectedEmbedding = Array.from(new Float32Array(baseEmbedding)); // Match code generation

        // No need to reset mocks here as beforeEach handles it

        await queryDocs(queryText); // Call with only required arg

        expect(mockGetCollection).toHaveBeenCalledWith({ name: "bun_chroma_docs" }); // Check default collection
        expect(mockPipelineFn).toHaveBeenCalledWith('feature-extraction', "Xenova/all-MiniLM-L6-v2"); // Check default model
        expect(mockCollectionQuery).toHaveBeenCalledWith({ // Check default nResults
            queryEmbeddings: [expectedEmbedding],
            nResults: 5,
        });
     });
}); 