# Bun ChromaDB Markdown Indexer

This project demonstrates indexing markdown documents into ChromaDB using Bun, Typescript, and open-source embeddings (via Transformers.js).

## Project Structure

```
.
├── docs/                 # Directory containing sample markdown files
│   ├── bun-intro.md
│   └── chroma-client.md
├── src/
│   ├── chunker.ts        # Logic for splitting markdown into chunks
│   ├── chunker.test.ts   # Tests for the chunker
│   ├── indexer.ts        # Main script to index docs into ChromaDB
│   ├── indexer.test.ts   # Tests for the indexer
│   └── query.ts          # Script to query the ChromaDB collection
├── package.json
├── bun.lockb
├── tsconfig.json
└── README.md
```

## Prerequisites

*   **Bun:** Install from [https://bun.sh/](https://bun.sh/)
*   **ChromaDB:** A running instance is required. The easiest way is using Docker:
    ```bash
    docker pull chromadb/chroma
    # Run ChromaDB (non-persistent, data lost on container stop)
    # docker run -p 8000:8000 chromadb/chroma

    # To make data persistent, use a volume mount:
    
    # Option 1: Bind Mount (Maps to a specific host directory)
    # Creates a directory named "chroma_data" in your current working directory on the host
    docker run -p 8000:8000 -v "$(pwd)/chroma_data":/data chromadb/chroma
    
    # Option 2: Named Volume (Alternative)
    # Creates a docker-managed volume named "chroma_data"
    # docker run -p 8000:8000 -v chroma_data:/data chromadb/chroma
    ```
    The bind mount option (`-v "$(pwd)/chroma_data":/data`) is shown by default. It tells Docker to store the database data (located inside the container at `/data`) into a `chroma_data` directory within your current host working directory.

    The scripts assume ChromaDB is accessible at `http://localhost:8000`.

## Installation

Install dependencies:

```bash
bun install
```

## Usage

1.  **Add Documents:** Place your markdown files (`.md`) inside the `docs/` directory (or specify a different directory when running the script).

2.  **Run Tests (Optional):**

    ```bash
    bun test
    ```

3.  **Index Documents:** Run the indexer script. This will read files from `./docs`, chunk them, generate embeddings using `Xenova/all-MiniLM-L6-v2`, and add them to the `bun_chroma_docs` collection in ChromaDB.

    ```bash
    bun run src/indexer.ts
    ```

    *Optional Environment Variables for Indexer:*
    *   `CHROMA_COLLECTION`: Specify a different collection name (default: `bun_chroma_docs`).
    *   `EMBEDDING_MODEL`: Specify a different Sentence Transformer model from Hugging Face compatible with Transformers.js (default: `Xenova/all-MiniLM-L6-v2`).
    *   `CHUNK_SIZE`: Target token size for chunks (default: `2000`).

    *Example with custom directory and collection:*
    ```bash
    CHROMA_COLLECTION=my_custom_docs bun run src/indexer.ts ./path/to/my/markdown
    ```

4.  **Query Documents:** Run the query script with your question as a command-line argument.
    You **must** include the `--run` flag before your query.

    ```bash
    bun run src/query.ts --run "What is Bun?"
    ```

    ```bash
    bun run src/query.ts --run "How do I add documents to Chroma?"
    ```

    *Optional Environment Variables for Query:*
    *   `CHROMA_COLLECTION`: Specify the collection to query (should match the one used for indexing).
    *   `EMBEDDING_MODEL`: Specify the embedding model (should match the one used for indexing).
    *   `NUM_RESULTS`: Number of results to retrieve (default: `5`).

    *Example with custom collection and number of results:*
    ```bash
    CHROMA_COLLECTION=my_custom_docs NUM_RESULTS=3 bun run src/query.ts --run "My query text"
    ```

## Implementation Details

*   **Chunking (`src/chunker.ts`):** Splits markdown by code blocks (` ``` `) first. Text sections are then further split by paragraphs (`\n\n`) aiming for the `