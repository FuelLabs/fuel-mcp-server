# Fuel Network & Sway Language MCP Server

This project provides a Multi-Component Protocol (MCP) server specifically designed for the Fuel Network and Sway Language ecosystem. It allows IDEs (like VS Code with the appropriate extension) to connect and seamlessly interact with Fuel documentation, enabling easier searching, understanding, and development within Fuel projects.

This server indexes Fuel and Sway documentation (including markdown files and potentially other formats in the future) into a vector database (currently ChromaDB) using open-source embeddings (via Transformers.js). This allows for powerful semantic search capabilities directly within the development environment.

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
*   **QDrantDB:** A running instance is required. The easiest way is using Docker:
    ```bash
    docker pull chromadb/chroma
    # Run qdrant (w/ persistent data)
    # docker run -p 6333:6333 -v "$(pwd)/qdrant_storage":/qdrant/storage qdrant/qdrant
    ```

    The scripts assume qdrantdb is accessible at `http://localhost:6333`.

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

## MCP Server (for IDE Integration)

This project includes an MCP (Model Context Protocol) server (`src/mcp-server.ts`) that exposes the Fuel documentation search functionality as a tool. This allows compatible clients, like Cursor, to connect and use the search capabilities directly within the IDE.

### Running the MCP Server

Ensure ChromaDB is running and you have indexed your documents (see steps above).

To start the MCP server, run the following command:

```bash
bun run mcp-server
```

The server will connect via standard input/output (stdio) and wait for a client to connect.

### Connecting with Cursor

1.  **Open Cursor.**
2.  **Open the Command Palette** (Cmd+Shift+P on macOS, Ctrl+Shift+P on Windows/Linux).
3.  **Search for and select "MCP: Add MCP Server via Command".**
4.  **Enter the command** to run the server. Since the server uses `bun run`, and Cursor needs the full path to `bun`, you'll typically need to find `bun`'s path first. You can usually find this by running `which bun` in your terminal.
    *   Example command (replace `/path/to/your/bun` with the actual path from `which bun`, and `/path/to/fuel-mcp-server` with the actual path to this project's root directory):
        ```bash
        /path/to/your/bun run /path/to/fuel-mcp-server/src/mcp-server.ts
        ```
    *   **Important:** Ensure you provide the **full, absolute path** to both `bun` and the `src/mcp-server.ts` script.
5.  **Give the server a name** (e.g., "Fuel Docs Search") when prompted.

Once connected, you should be able to use the `searchFuelDocs` tool via Cursor's chat or code actions (depending on how Cursor integrates MCP tools).

## Implementation Details

*   **Chunking (`src/chunker.ts`):** Splits markdown by code blocks (` ``` `) first. Text sections are then further split by paragraphs (`\n\n`) aiming for the `