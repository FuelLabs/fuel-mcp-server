import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import * as fsPromises from 'node:fs/promises';
import path from 'node:path';
import { QdrantClient } from '@qdrant/js-client-rest';
import { pipeline } from '@xenova/transformers';
import { indexDocsQdrant } from './indexer';
import { chunkMarkdown } from '../common/chunker';

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

// Mock QdrantClient
const mockQdrantClientInstance = {
    getCollections: mock(async (options?: { consistency?: any }) => {
        console.log('Mock getCollections called');
        if (mockQdrantClientInstance.simulateCollectionExists) {
            return { collections: [{ name: mockQdrantClientInstance.simulateCollectionNameExists }] };
        }
        return { collections: [] };
    }),
    createCollection: mock(async (name: string, params: any) => {
        console.log(`Mock createCollection called for '${name}'`);
        expect(name).toBeString();
        expect(params.vectors.size).toBe(384);
        expect(params.vectors.distance).toBe('Cosine');
        mockQdrantClientInstance.simulateCollectionExists = true;
        mockQdrantClientInstance.simulateCollectionNameExists = name;
        return true;
    }),
    upsert: mock(async (name: string, data: { wait: boolean, points: any[] }) => {
        console.log(`Mock upsert called for '${name}' with ${data.points.length} points.`);
        expect(name).toBeString();
        expect(data.wait).toBe(true);
        expect(Array.isArray(data.points)).toBe(true);
        data.points.forEach(p => {
            expect(p.id).toBeString();
            expect(p.vector).toBeArray();
            expect(p.vector.length).toBe(384);
            expect(p.payload).toBeObject();
            expect(p.payload.source).toBeString();
            expect(p.payload.type).toBeString();
            expect(p.payload.content).toBeString();
        });
        mockQdrantClientInstance.upsertCallCount += 1;
        mockQdrantClientInstance.pointsUpserted.push(...data.points);
        return { status: 'ok', result: { operation_id: 123, status: 'completed' } };
    }),
    simulateCollectionExists: false,
    simulateCollectionNameExists: '' as string,
    upsertCallCount: 0,
    pointsUpserted: [] as any[],
    resetMock: () => {
        mockQdrantClientInstance.getCollections.mockClear();
        mockQdrantClientInstance.createCollection.mockClear();
        mockQdrantClientInstance.upsert.mockClear();
        mockQdrantClientInstance.simulateCollectionExists = false;
        mockQdrantClientInstance.simulateCollectionNameExists = '';
        mockQdrantClientInstance.upsertCallCount = 0;
        mockQdrantClientInstance.pointsUpserted = [];
    }
};
mock.module('@qdrant/js-client-rest', () => ({
    QdrantClient: mock(() => mockQdrantClientInstance)
}));


// --- Test Suite ---

describe('indexDocsQdrant', () => {
    const consoleLogMock = mock();
    const consoleErrorMock = mock();
    const originalLog = console.log;
    const originalError = console.error;

    beforeEach(() => {
        pipelineMock.mockClear();
        mockEmbedder.mockClear();
        mockQdrantClientInstance.resetMock();

        consoleLogMock.mockClear();
        consoleErrorMock.mockClear();
        console.log = consoleLogMock;
        console.error = consoleErrorMock;

        delete process.env.QDRANT_URL;
        delete process.env.QDRANT_API_KEY;
        delete process.env.QDRANT_COLLECTION;
        delete process.env.EMBEDDING_MODEL;
        delete process.env.CHUNK_SIZE;
    });

    afterEach(() => {
        console.log = originalLog;
        console.error = originalError;
    });

    it('should successfully index markdown files', async () => {
        const docsDir = './test-docs';
        const collectionName = 'test-collection';

        await indexDocsQdrant(docsDir, collectionName);

        expect(mockQdrantClientInstance.getCollections).toHaveBeenCalledTimes(1);
        expect(mockQdrantClientInstance.createCollection).toHaveBeenCalledTimes(1);
        expect(mockQdrantClientInstance.createCollection).toHaveBeenCalledWith(collectionName, { vectors: { size: 384, distance: 'Cosine' } });
        expect(mockQdrantClientInstance.upsert).toHaveBeenCalledTimes(1);

        expect(mockQdrantClientInstance.pointsUpserted.length).toBeGreaterThan(0);
        const firstPoint = mockQdrantClientInstance.pointsUpserted[0];
        expect(firstPoint.payload.source).toMatch(/doc[12]\.md/);
        expect(firstPoint.payload.content).toBeString();
        expect(firstPoint.vector.length).toBe(384);

        expect(pipelineMock).toHaveBeenCalledTimes(1);
        expect(mockEmbedder).toHaveBeenCalledTimes(1);

        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Starting Qdrant indexing process...`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Found 2 markdown files to process.`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Collection '${collectionName}' not found. Creating...`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Upserting batch to Qdrant...`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Qdrant Indexing finished!`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Total chunks upserted to Qdrant: ${mockQdrantClientInstance.pointsUpserted.length}`));
        expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    it('should use existing collection if found', async () => {
        const docsDir = './test-docs';
        const collectionName = 'test-collection';
        mockQdrantClientInstance.simulateCollectionExists = true;
        mockQdrantClientInstance.simulateCollectionNameExists = collectionName;

        await indexDocsQdrant(docsDir, collectionName);

        expect(mockQdrantClientInstance.getCollections).toHaveBeenCalledTimes(1);
        expect(mockQdrantClientInstance.createCollection).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.upsert).toHaveBeenCalledTimes(1);
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Collection '${collectionName}' already exists.`));
        expect(consoleLogMock).not.toHaveBeenCalledWith(expect.stringContaining(`Creating...`));
    });

    it('should handle directories with no markdown files', async () => {
        const docsDir = './test-docs-no-md';
        await indexDocsQdrant(docsDir);

        expect(pipelineMock).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.getCollections).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.createCollection).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.upsert).not.toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("No markdown files found in the specified directory."));
    });

    it('should handle empty directories', async () => {
        const docsDir = './test-docs-empty';
        await indexDocsQdrant(docsDir);

        expect(pipelineMock).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.getCollections).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.createCollection).not.toHaveBeenCalled();
        expect(mockQdrantClientInstance.upsert).not.toHaveBeenCalled();
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining("No markdown files found in the specified directory."));
    });

    it('should handle errors during Qdrant connection', async () => {
        const docsDir = './test-docs';
        const collectionName = 'error-connect-collection';
        const connectError = new Error("Qdrant unavailable");
        mockQdrantClientInstance.getCollections.mockImplementationOnce(async () => {
             throw connectError;
        });

        await expect(indexDocsQdrant(docsDir, collectionName))
            .rejects
            .toThrow(`Failed to initialize Qdrant client/collection: Failed to ensure Qdrant collection: ${connectError.message}`);

        expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining(`Error initializing Qdrant client or ensuring collection '${collectionName}'`), expect.any(Error));
        expect(pipelineMock).not.toHaveBeenCalled();
    });

    it('should handle errors during embedding', async () => {
        const docsDir = './test-docs';
        const collectionName = 'error-embed-collection';
        const embedError = new Error("Embedding failed");
        mockEmbedder.mockImplementationOnce(async () => {
             throw embedError;
        });

        await expect(indexDocsQdrant(docsDir, collectionName))
            .rejects
            .toThrow(`Failed during embedding generation: ${embedError.message}`);

        expect(pipelineMock).toHaveBeenCalledTimes(1);
        expect(mockEmbedder).toHaveBeenCalledTimes(1);
        expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining("Error generating embeddings for batch 1"), embedError);
        expect(mockQdrantClientInstance.upsert).not.toHaveBeenCalled();
    });

    it('should handle errors during Qdrant upsert', async () => {
        const docsDir = './test-docs';
        const collectionName = 'error-upsert-collection';
        const upsertError = new Error("Upsert failed");
        mockQdrantClientInstance.upsert.mockImplementationOnce(async () => {
            throw upsertError;
        });

        await expect(indexDocsQdrant(docsDir, collectionName))
            .rejects
            .toThrow(`Failed during Qdrant upsert operation: ${upsertError.message}`);

        expect(pipelineMock).toHaveBeenCalledTimes(1);
        expect(mockEmbedder).toHaveBeenCalledTimes(1);
        expect(mockQdrantClientInstance.upsert).toHaveBeenCalledTimes(1);
        expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining("Error upserting batch 1 to Qdrant"), upsertError);
    });

    it('should use environment variables for configuration', async () => {
        process.env.QDRANT_URL = 'http://qdrant-prod:6333';
        process.env.QDRANT_API_KEY = 'test-key';
        process.env.QDRANT_COLLECTION = 'prod-collection';
        process.env.EMBEDDING_MODEL = 'Xenova/custom-model';
        process.env.CHUNK_SIZE = '500';

        const docsDir = './test-docs';
        const expectedCollectionName = process.env.QDRANT_COLLECTION || 'bun_qdrant_docs';
        const expectedModelName = process.env.EMBEDDING_MODEL || 'Xenova/all-MiniLM-L6-v2';
        const expectedChunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE, 10) : 2000;

        await indexDocsQdrant(docsDir, expectedCollectionName, expectedModelName, expectedChunkSize);

        const consoleCalls = consoleLogMock.mock.calls;
        const collectionLogFound = consoleCalls.some(args =>
            typeof args[0] === 'string' && args[0].includes(`Collection: ${expectedCollectionName}`)
        );
        expect(collectionLogFound).toBe(true);

        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Embedding Model: ${expectedModelName}`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Target Chunk Size (tokens): ${expectedChunkSize}`));
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Connecting to Qdrant at http://qdrant-prod:6333...`));

        expect(pipelineMock).toHaveBeenCalledWith('feature-extraction', expectedModelName);

        expect(mockQdrantClientInstance.createCollection).toHaveBeenCalledWith(expectedCollectionName, expect.anything());
        expect(mockQdrantClientInstance.upsert).toHaveBeenCalledWith(expectedCollectionName, expect.anything());
    });

    it('should process files in batches', async () => {
        const docsDir = './test-docs-large';
        const collectionName = 'batch-test-collection';
        const batchSize = 100;

        const sampleContent = `# Large Doc large_doc_1.md\n\nSome content.`;
        const sampleChunks = chunkMarkdown(sampleContent, 2000, (t) => t.split(/\s+/).length);
        const expectedTotalChunks = 150 * sampleChunks.length;
        const expectedBatches = Math.ceil(expectedTotalChunks / batchSize);

        await indexDocsQdrant(docsDir, collectionName);

        expect(mockQdrantClientInstance.upsert).toHaveBeenCalledTimes(expectedBatches);
        expect(mockQdrantClientInstance.pointsUpserted.length).toBe(expectedTotalChunks);

        for (let i = 1; i <= expectedBatches; i++) {
            expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Processing batch ${i} of ${expectedBatches}`));
        }
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining(`Total chunks upserted to Qdrant: ${expectedTotalChunks}`));
    });
});
