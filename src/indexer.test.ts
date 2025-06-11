import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import * as fsPromises from 'node:fs/promises';
import path from 'node:path';
import { LocalIndex } from 'vectra';
import { pipeline } from '@xenova/transformers';
import { indexDocsVectra } from './indexer';
import { chunkMarkdown } from './chunker';

// --- Mocks ---

// Mock fs/promises
mock.module('node:fs/promises', () => ({
    readdir: mock(async (dirPath: string) => {
        if (dirPath === './test-docs-empty') return [];
        if (dirPath === './test-docs-no-md') return ['not-a-markdown.txt'];
        if (dirPath === './test-docs') return ['doc1.md', 'doc2.md', 'image.png'];
        if (dirPath === './test-docs-large') {
            return Array.from({ length: 150 }, (_, i) => `large_doc_${i + 1}.md`);
        }
        throw new Error(`ENOENT: no such file or directory, scandir '${dirPath}'`);
    }),
    readFile: mock(async (filePath: string, encoding: string) => {
        expect(encoding).toBe('utf-8');
        const fileName = path.basename(filePath);
        if (fileName === 'doc1.md') return '# Doc 1\n\nContent paragraph.';
        if (fileName === 'doc2.md') return '## Doc 2 Title\n\n```js\nconsole.log("hello");\n```\n\nMore text.';
        if (fileName.startsWith('large_doc_')) return `# Large Doc ${fileName}\n\nSome content.`;
        throw new Error(`ENOENT: no such file or directory, open '${filePath}'`);
    }),
}));

// Mock @xenova/transformers pipeline
let mockEmbedder = mock((texts: string[], options: any) => {
    console.log(`Default mock embedder called with ${texts.length} texts.`);
    const embeddingDim = 384;
    const embeddings = texts.map((_, i) => Array(embeddingDim).fill(i * 0.1));
    const flatEmbeddings = new Float32Array(texts.length * embeddingDim);
    embeddings.forEach((emb, textIdx) => {
        emb.forEach((val, dimIdx) => {
            flatEmbeddings[textIdx * embeddingDim + dimIdx] = val;
        });
    });
    return Promise.resolve({ data: flatEmbeddings, dims: [texts.length, embeddingDim] });
});

const pipelineMock = mock(async (task: string, model: string) => {
    console.log(`Mock pipeline loaded for task: ${task}, model: ${model}`);
    expect(task).toBe('feature-extraction');
    return mockEmbedder;
});

mock.module('@xenova/transformers', () => ({
    pipeline: pipelineMock,
    env: { cacheDir: '' },
}));

// Mock Vectra LocalIndex
const mockLocalIndexInstance = {
    isIndexCreated: mock(async () => {
        console.log('Mock isIndexCreated called');
        return mockLocalIndexInstance.simulateIndexExists;
    }),
    createIndex: mock(async () => {
        console.log('Mock createIndex called');
        mockLocalIndexInstance.simulateIndexExists = true;
        return true;
    }),
    insertItem: mock(async (item: { vector: number[], metadata: any }) => {
        console.log(`Mock insertItem called with metadata source: ${item.metadata.source}`);
        expect(item.vector).toBeArray();
        expect(item.vector.length).toBe(384);
        expect(item.metadata).toBeObject();
        expect(item.metadata.source).toBeString();
        expect(item.metadata.type).toBeString();
        expect(item.metadata.content).toBeString();
        mockLocalIndexInstance.insertItemCallCount += 1;
        mockLocalIndexInstance.itemsInserted.push(item);
        return { id: `item_${mockLocalIndexInstance.insertItemCallCount}` };
    }),
    // Mock state
    simulateIndexExists: false,
    insertItemCallCount: 0,
    itemsInserted: [] as any[],
    resetMock: () => {
        mockLocalIndexInstance.isIndexCreated.mockClear();
        mockLocalIndexInstance.createIndex.mockClear();
        mockLocalIndexInstance.insertItem.mockClear();
        mockLocalIndexInstance.simulateIndexExists = false;
        mockLocalIndexInstance.insertItemCallCount = 0;
        mockLocalIndexInstance.itemsInserted = [];
    }
};

mock.module('vectra', () => ({
    LocalIndex: mock((indexPath: string) => {
        console.log(`Mock LocalIndex created with path: ${indexPath}`);
        return mockLocalIndexInstance;
    })
}));

// --- Test Suite ---

describe('indexDocsVectra', () => {
    const consoleLogMock = mock();
    const consoleErrorMock = mock();
    const originalLog = console.log;
    const originalError = console.error;

    beforeEach(() => {
        // Reset specific mocks used globally or across tests
        pipelineMock.mockClear();
        mockEmbedder.mockClear();
        // Reset LocalIndex mock state
        mockLocalIndexInstance.resetMock();
        (LocalIndex as any).mockClear();

        // Reset console mocks
        consoleLogMock.mockClear();
        consoleErrorMock.mockClear();
        console.log = consoleLogMock;
        console.error = consoleErrorMock;

        // Reset environment variables
        delete process.env.VECTRA_INDEX_PATH;
        delete process.env.EMBEDDING_MODEL;
        delete process.env.CHUNK_SIZE;
    });

    afterEach(() => {
        console.log = originalLog;
        console.error = originalError;
    });

    it('should successfully index markdown files', async () => {
        const docsDir = './test-docs';
        const indexPath = './test-index';

        await indexDocsVectra(docsDir, indexPath);

        expect(LocalIndex).toHaveBeenCalledWith(indexPath);
        expect(mockLocalIndexInstance.isIndexCreated).toHaveBeenCalledTimes(1);
        expect(mockLocalIndexInstance.createIndex).toHaveBeenCalledTimes(1);
        expect(mockLocalIndexInstance.insertItem).toHaveBeenCalledTimes(mockLocalIndexInstance.itemsInserted.length);

        expect(mockLocalIndexInstance.itemsInserted.length).toBeGreaterThan(0);
        const firstItem = mockLocalIndexInstance.itemsInserted[0];
        expect(firstItem.metadata.source).toMatch(/doc[12]\.md/);
        expect(firstItem.metadata.content).toBeString();
        expect(firstItem.vector.length).toBe(384);

        expect(pipelineMock).toHaveBeenCalledTimes(1);
        expect(mockEmbedder).toHaveBeenCalledTimes(1);

        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Starting Vectra indexing process...`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Found 2 markdown files to process.`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Vectra index not found at '${indexPath}'. Creating...`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Adding batch 1 items to Vectra index...`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Vectra Indexing finished!`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Total chunks added to Vectra index: ${mockLocalIndexInstance.itemsInserted.length}`));
        expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    it('should use existing index if found', async () => {
        const docsDir = './test-docs';
        const indexPath = './test-index';
        mockLocalIndexInstance.simulateIndexExists = true;

        await indexDocsVectra(docsDir, indexPath);

        expect(mockLocalIndexInstance.isIndexCreated).toHaveBeenCalledTimes(1);
        expect(mockLocalIndexInstance.createIndex).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.insertItem).toHaveBeenCalledTimes(mockLocalIndexInstance.itemsInserted.length);
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Vectra index already exists at '${indexPath}'.`));
        expect(consoleLogMock).not.toHaveBeenCalledWith(expect.stringContaining(`Creating...`));
    });

    it('should handle directories with no markdown files', async () => {
        const docsDir = './test-docs-no-md';
        await indexDocsVectra(docsDir);

        // Pipeline should not be called if no files are processed
        expect(pipelineMock).not.toHaveBeenCalled();
        expect(LocalIndex).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.isIndexCreated).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.createIndex).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.insertItem).not.toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("No markdown files found in the specified directory."));
    });

    it('should handle empty directories', async () => {
        const docsDir = './test-docs-empty';
        await indexDocsVectra(docsDir);

        expect(pipelineMock).not.toHaveBeenCalled();
        expect(LocalIndex).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.isIndexCreated).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.createIndex).not.toHaveBeenCalled();
        expect(mockLocalIndexInstance.insertItem).not.toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("No markdown files found in the specified directory."));
    });

    it('should handle errors during Vectra index creation', async () => {
        const docsDir = './test-docs';
        const indexPath = './error-index';
        const createError = new Error("Index creation failed");
        mockLocalIndexInstance.createIndex.mockImplementationOnce(async () => {
             throw createError;
        });

        await expect(indexDocsVectra(docsDir, indexPath))
            .rejects
            .toThrow(`Failed to ensure Vectra index: ${createError.message}`);

        expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining(`Error ensuring Vectra index exists at '${indexPath}'`), expect.any(Error));
        // Ensure pipeline wasn't called if index creation failed early
        expect(pipelineMock).not.toHaveBeenCalled();
    });

    it('should handle errors during embedding', async () => {
        const docsDir = './test-docs';
        const indexPath = './embed-error-index';
        const embedError = new Error("Embedding failed");
        
        // Mock the pipeline function to reject (not the embedder)
        pipelineMock.mockRejectedValueOnce(embedError);

        await expect(indexDocsVectra(docsDir, indexPath))
            .rejects
            .toThrow(`Failed to load embedding model: ${embedError.message}`);

        expect(pipelineMock).toHaveBeenCalledTimes(1);
        expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining("Error loading embedding model"), embedError);
        expect(mockLocalIndexInstance.insertItem).not.toHaveBeenCalled();
    });

    it('should handle errors during item insertion', async () => {
        const docsDir = './test-docs';
        const indexPath = './insert-error-index';
        const insertError = new Error("Item insertion failed");
        mockLocalIndexInstance.insertItem.mockImplementationOnce(async () => {
            throw insertError;
        });

        // This should not throw because we continue with other items after an insertion error
        await indexDocsVectra(docsDir, indexPath);

        expect(pipelineMock).toHaveBeenCalledTimes(1);
        expect(mockEmbedder).toHaveBeenCalledTimes(1);
        expect(mockLocalIndexInstance.insertItem).toHaveBeenCalled();
        expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining("Error adding item"), insertError);
        // Should have attempted more items after the first error
        expect(mockLocalIndexInstance.insertItem.mock.calls.length).toBeGreaterThan(1);
    });

    it('should use environment variables for configuration', async () => {
        process.env.VECTRA_INDEX_PATH = './env-test-index';
        process.env.EMBEDDING_MODEL = 'Xenova/custom-model';
        process.env.CHUNK_SIZE = '500';

        const docsDir = './test-docs';
        const expectedIndexPath = process.env.VECTRA_INDEX_PATH;
        const expectedModelName = process.env.EMBEDDING_MODEL;
        const expectedChunkSize = parseInt(process.env.CHUNK_SIZE, 10);

        await indexDocsVectra(docsDir, expectedIndexPath, expectedModelName, expectedChunkSize);

        // Check logs for expected values from env vars
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Vectra index path: ${expectedIndexPath}`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Embedding Model: ${expectedModelName}`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Target Chunk Size (tokens): ${expectedChunkSize}`));

        // Check LocalIndex called with index path from env var
        expect(LocalIndex).toHaveBeenCalledWith(expectedIndexPath);

        // Check pipeline called with model from env var
        expect(pipelineMock).toHaveBeenCalledWith('feature-extraction', expectedModelName);
    });

    it('should process files in batches', async () => {
        const docsDir = './test-docs-large';
        const indexPath = './batch-test-index';
        const batchSize = 100;

        const sampleContent = `# Large Doc large_doc_1.md\n\nSome content.`;
        const sampleChunks = chunkMarkdown(sampleContent, 2000, (t) => t.split(/\s+/).length);
        const expectedTotalChunks = 150 * sampleChunks.length;
        const expectedBatches = Math.ceil(expectedTotalChunks / batchSize);

        await indexDocsVectra(docsDir, indexPath);

        expect(mockLocalIndexInstance.insertItem).toHaveBeenCalledTimes(expectedTotalChunks);
        expect(mockLocalIndexInstance.itemsInserted.length).toBe(expectedTotalChunks);

        for (let i = 1; i <= expectedBatches; i++) {
            expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Processing batch ${i} of ${expectedBatches}`));
        }
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Total chunks added to Vectra index: ${expectedTotalChunks}`));
    });

    it('should handle chunks with different types (text and code)', async () => {
        const docsDir = './test-docs';
        await indexDocsVectra(docsDir, './type-test-index');

        expect(mockLocalIndexInstance.itemsInserted.length).toBeGreaterThan(0);
        
        // Check that we have both text and code chunks
        const textChunks = mockLocalIndexInstance.itemsInserted.filter(item => item.metadata.type === 'text');
        const codeChunks = mockLocalIndexInstance.itemsInserted.filter(item => item.metadata.type === 'code');
        
        expect(textChunks.length).toBeGreaterThan(0);
        expect(codeChunks.length).toBeGreaterThan(0);
        
        // Verify code chunk contains expected content
        const jsCodeChunk = codeChunks.find(item => item.metadata.content.includes('console.log("hello")'));
        expect(jsCodeChunk).toBeDefined();
        expect(jsCodeChunk.metadata.type).toBe('code');
    });
});