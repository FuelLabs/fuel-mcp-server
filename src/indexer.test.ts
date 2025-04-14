import { describe, it, expect, mock, beforeEach, afterEach, afterAll, spyOn } from "bun:test";
import { indexDocs } from "./indexer";
import * as fsPromises from "fs/promises";
import * as ChromaDB from "chromadb";
import * as Transformers from "@xenova/transformers";
import * as Chunker from "./chunker";

// --- Mocks ---
const mockFsPromises = {
  readdir: mock(async (dirPath: string): Promise<string[]> => {
    console.log(`Mock readdir called with: ${dirPath}`);
    // Simulate finding specific files for testing
    if (dirPath === "./test_docs_errors") return Promise.reject(new Error("Failed to read dir"));
    if (dirPath === "./test_docs_empty") return Promise.resolve(['image.png', 'other.file']);
    if (dirPath === "./test_docs_mixed") return Promise.resolve(['doc1.md', 'image.png', 'doc2.md']);
    // Default mock for success case
    return Promise.resolve(["doc1.md", "doc2.md", "not-markdown.txt"]);
  }),
  readFile: mock(async (path: string, encoding: string): Promise<string> => {
    console.log(`Mock readFile called with: ${path}, ${encoding}`);
    if (path.endsWith("doc1.md")) return "# Doc 1\nContent 1\n```js\ncode1\n```";
    if (path.endsWith("doc2.md")) return "## Doc 2\nContent 2";
    if (path.includes("fail_read")) return Promise.reject(new Error("Read failed"));
    return "other content";
  }),
};
mock.module("fs/promises", () => mockFsPromises);

const mockCollection = {
  add: mock(async (data: any) => {
    console.log("Mock collection.add called with ids:", data?.ids);
    if (data?.ids?.includes("trigger_add_fail.md-0")) throw new Error("Chroma add failed");
    return Promise.resolve();
  }),
  // Add other methods if needed by indexer
};
const mockChromaClient = {
    getOrCreateCollection: mock(async () => mockCollection),
    deleteCollection: mock(async () => {}), // Keep this for potential future use
};
mock.module("chromadb", () => ({
  ChromaClient: mock(() => mockChromaClient),
}));

// Mock the pipeline function specifically
// This mock simulates the outer `pipeline` function from transformers.js
const mockPipelineLoader = mock(async (task: string, model: string) => {
    console.log(`Mock pipeline loader called with task: ${task}, model: ${model}`);
    if (task === 'feature-extraction') {
        // Return the actual function that performs the embedding simulation
        const embedderFn = async (texts: string | string[], options?: any) => {
            console.log(`Mock embedder function called with texts: ${JSON.stringify(texts).substring(0, 50)}...`);
            // Simulate embedding failure
            if (Array.isArray(texts) && texts.includes("fail_embedding")) {
                throw new Error("Embedding failed");
            }
            // Simulate successful embedding
            const actualTexts = Array.isArray(texts) ? texts : [texts];
            const embeddings = actualTexts.map((t, i) => (
                Array(5).fill(0.1 * (i + 1)) // Simple deterministic embedding
            ));
            // Mimic the structure often returned by the feature-extraction pipeline
            // Note: Real structure might vary; adjust indexer.ts if needed
            return embeddings.map(emb => ({ embedding: emb }));
        };
        return embedderFn;
    }
    throw new Error(`Mock pipeline loader only supports feature-extraction task for model ${model}`);
});

mock.module("@xenova/transformers", () => ({
  pipeline: mockPipelineLoader, // Use the loader mock here
  env: { cacheDir: '' } // Mock env as well
}));

describe("indexDocs", () => {
  const DOCS_DIR = "./test_docs";
  const COLLECTION_NAME = "test_collection";
  const MODEL_NAME = "Xenova/all-MiniLM-L6-v2"; // Keep consistent
  const TARGET_TOKEN_SIZE = 200;

  beforeEach(() => {
    // Reset standard mocks
    mockCollection.add.mockClear();
    mockFsPromises.readdir.mockClear();
    mockFsPromises.readFile.mockClear();
    mockPipelineLoader.mockClear();
    mockChromaClient.getOrCreateCollection.mockClear();

    // Setup spy for chunkMarkdown for this test suite
    spyOn(Chunker, 'chunkMarkdown').mockImplementation((content: string, size: number, estimator: (text: string) => number) => {
        console.log(`Spy on chunkMarkdown called with content starting: ${content.substring(0, 20)}...`);
        // Specific overrides for indexer tests
        if (content.includes("# Doc 1")) {
            return [
                { content: "# Doc 1\nContent 1", type: "text" },
                { content: "```js\ncode1\n```", type: "code" },
            ];
        }
        if (content.includes("## Doc 2")) {
            return [{ content: "## Doc 2\nContent 2", type: "text" }];
        }
        if (content.includes("fail_embedding")) {
            return [{ content: "fail_embedding", type: "text" }];
        }
        if (content.includes("fail_add")) {
             return [{ content: "fail_add content", type: "text", id: "trigger_add_fail.md-0" }];
        }
        // If no override matches, return empty array to match original signature
        console.warn("Spy on chunkMarkdown called with unhandled content in indexer.test.ts");
        return [];
    });

  });

  afterEach(() => {
      // Restore the original chunkMarkdown implementation after each test
      (Chunker.chunkMarkdown as any).mockRestore();
  });

  it("should read markdown files, chunk, embed, and add to ChromaDB", async () => {
    await indexDocs(DOCS_DIR, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE);

    // Verify file reading
    expect(mockFsPromises.readdir).toHaveBeenCalledWith(DOCS_DIR);
    expect(mockFsPromises.readFile).toHaveBeenCalledTimes(2); // Only .md files
    expect(mockFsPromises.readFile).toHaveBeenCalledWith(`test_docs/doc1.md`, "utf-8");
    expect(mockFsPromises.readFile).toHaveBeenCalledWith(`test_docs/doc2.md`, "utf-8");

    // Verify chunking (using the spy)
    expect(Chunker.chunkMarkdown).toHaveBeenCalledTimes(2);
    // Check the arguments passed to chunkMarkdown spy
    expect((Chunker.chunkMarkdown as any).mock.calls[0]![0]).toContain("# Doc 1");
    expect((Chunker.chunkMarkdown as any).mock.calls[0]![1]).toBe(TARGET_TOKEN_SIZE);
    expect((Chunker.chunkMarkdown as any).mock.calls[1]![0]).toContain("## Doc 2");

    // Verify embedding loader was called
    expect(mockPipelineLoader).toHaveBeenCalledTimes(1);
    expect(mockPipelineLoader).toHaveBeenCalledWith('feature-extraction', MODEL_NAME);

    // Note: We can't easily verify the calls to the *returned* embedderFn
    // directly using mockPipelineLoader.mock.calls without more complex mocking.
    // We rely on the fact that if `collection.add` was called with the correct
    // embeddings, the embedderFn must have been called correctly internally.

    // Verify adding to ChromaDB
    expect(mockCollection.add).toHaveBeenCalledTimes(1);
    const addedData = mockCollection.add.mock.calls[0]![0];

    expect(addedData.ids).toHaveLength(3);
    expect(addedData.ids[0]).toMatch(/^doc1\.md-\d+$/);
    expect(addedData.ids[1]).toMatch(/^doc1\.md-\d+$/);
    expect(addedData.ids[2]).toMatch(/^doc2\.md-\d+$/);

    expect(addedData.documents).toEqual([
        "# Doc 1\nContent 1",
        "```js\ncode1\n```",
        "## Doc 2\nContent 2"
    ]);

    expect(addedData.embeddings).toHaveLength(3);
    // These match the deterministic mockPipeline output
    expect(addedData.embeddings[0]).toEqual(Array(5).fill(0.1 * (0 + 1)));
    expect(addedData.embeddings[1]).toEqual(Array(5).fill(0.1 * (1 + 1)));
    expect(addedData.embeddings[2]).toEqual(Array(5).fill(0.1 * (2 + 1)));

    expect(addedData.metadatas).toEqual([
        { source: "doc1.md", type: "text" },
        { source: "doc1.md", type: "code" },
        { source: "doc2.md", type: "text" },
    ]);

  });

  it("should handle errors during file reading (readdir)", async () => {
    // Use a different dir name to trigger the readdir mock error
    const errorDir = "./test_docs_errors";
    await expect(indexDocs(errorDir, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE))
        .rejects.toThrow("Failed to read directory: Failed to read dir");

     expect(mockCollection.add).not.toHaveBeenCalled();
  });

  it("should handle errors during file reading (readFile)", async () => {
      // Setup readdir mock to return a file that causes readFile to fail
      mockFsPromises.readdir.mockResolvedValueOnce(["fail_read.md"]);
      // The indexer should catch the readFile error and log it, but continue (or potentially stop based on impl.)
      // Current implementation logs and continues, so it shouldn't throw here, but check mocks.
      await indexDocs(DOCS_DIR, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE);

      // Expect readFile to have been called and failed (error logged internally)
      expect(mockFsPromises.readFile).toHaveBeenCalledWith(`test_docs/fail_read.md`, "utf-8");
      // Expect add not to be called because no chunks were successfully processed
      expect(mockCollection.add).not.toHaveBeenCalled();
      // Note: Test could be improved by spying on console.error
    });

    it("should handle errors during embedding", async () => {
        // Setup mocks to provide content that triggers embedding failure
        mockFsPromises.readdir.mockResolvedValueOnce(["trigger_embed_fail.md"]);
        mockFsPromises.readFile.mockResolvedValueOnce("fail_embedding content");

        await expect(indexDocs(DOCS_DIR, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE))
            .rejects.toThrow("Failed during embedding generation: Embedding failed");

        expect(mockCollection.add).not.toHaveBeenCalled();
        // Ensure pipeline loader was called
        expect(mockPipelineLoader).toHaveBeenCalledWith('feature-extraction', MODEL_NAME);
        // Cannot easily assert the args passed to the *inner* embedderFn here
    });

    it("should handle errors during ChromaDB add", async () => {
         // Setup mocks to provide content that triggers add failure
        mockFsPromises.readdir.mockResolvedValueOnce(["trigger_add_fail.md"]);
        mockFsPromises.readFile.mockResolvedValueOnce("fail_add content");

        await expect(indexDocs(DOCS_DIR, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE))
            .rejects.toThrow("Failed during ChromaDB add operation: Chroma add failed");

        expect(mockCollection.add).toHaveBeenCalled(); // It was called, but failed
         // Ensure add was called with the problematic ID
        expect(mockCollection.add.mock.calls[0]![0].ids).toContain("trigger_add_fail.md-0");
        // Ensure pipeline loader was called
        expect(mockPipelineLoader).toHaveBeenCalledWith('feature-extraction', MODEL_NAME);
    });

      it("should skip non-markdown files", async () => {
        // Use a specific dir name to trigger the mixed files mock
        const mixedDir = "./test_docs_mixed";
        await indexDocs(mixedDir, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE);
        expect(mockFsPromises.readFile).toHaveBeenCalledTimes(2);
        expect(mockFsPromises.readFile).toHaveBeenCalledWith(`test_docs_mixed/doc1.md`, "utf-8");
        expect(mockFsPromises.readFile).toHaveBeenCalledWith(`test_docs_mixed/doc2.md`, "utf-8");
        expect(mockFsPromises.readFile).not.toHaveBeenCalledWith(`test_docs_mixed/image.png`, "utf-8");
    });

    it("should handle no markdown files found", async () => {
        // Use a specific dir name to trigger the empty files mock
        const emptyDir = "./test_docs_empty";
        await indexDocs(emptyDir, COLLECTION_NAME, MODEL_NAME, TARGET_TOKEN_SIZE);
        expect(mockFsPromises.readFile).not.toHaveBeenCalled();
        expect(Chunker.chunkMarkdown).not.toHaveBeenCalled(); // Check the spy
        expect(mockPipelineLoader).not.toHaveBeenCalled(); // Check the loader mock
        expect(mockCollection.add).not.toHaveBeenCalled();
         // Note: Could spy on console.log to verify the "No markdown files found" message.
    });
});