# Fuel Network & Sway Language MCP Server

This project provides a Multi-Component Protocol (MCP) server specifically designed for the Fuel Network and Sway Language ecosystem. It allows IDEs (like VS Code with the appropriate extension) to connect and seamlessly interact with Fuel documentation, enabling easier searching, understanding, and development within Fuel projects.

This server indexes Fuel and Sway documentation (including markdown files) into a Qdrant vector database using open-source embeddings (via Transformers.js). This allows for powerful semantic search capabilities directly within the development environment.

## Project Structure

```
.
├── docs/                     # Directory containing sample markdown files
│   └── fuel-docs.md          # Example doc
├── src/
│   ├── chunker.ts            # Logic for splitting markdown into chunks
│   ├── chunker.test.ts       # Tests for the chunker
│   ├── indexer.ts            # Main script to index docs into QdrantDB
│   ├── indexer.test.ts       # Tests for the indexer
│   ├── query.ts              # Script to query the QdrantDB collection
│   ├── query.vest.ts         # Tests for querying
│   └── mcp-server.ts         # MCP server implementation
├── node_modules/             # Project dependencies
├── qdrant_storage/           # Local Qdrant data persistence (if using Docker volume)
├── Xenova/                   # Cached embedding models
├── .env.example              # Example environment variables
├── .gitignore
├── bun.lockb                 # Bun lockfile
├── package.json
├── tsconfig.json
├── vitest.config.ts          # Vitest configuration
└── README.md
```

## Prerequisites

*   **Bun:** Install from [https://bun.sh/](https://bun.sh/)
*   **QdrantDB:** A running instance is required. The easiest way is using Docker:
    ```bash
    # Pull the Qdrant image
    docker pull qdrant/qdrant

    # Run Qdrant with persistent storage (creates ./qdrant_storage)
    docker run -p 6333:6333 -p 6334:6334 \\
        -v \"$(pwd)/qdrant_storage:/qdrant/storage:z\" \\
        qdrant/qdrant
    ```
    The scripts assume QdrantDB is accessible at `http://localhost:6333`. You can configure this using the `QDRANT_URL` environment variable. If your Qdrant instance requires an API key (e.g., Qdrant Cloud), set the `QDRANT_API_KEY` environment variable.

## Installation

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **(Optional) Create a `.env` file:** Copy `.env.example` to `.env` and configure `QDRANT_URL` and `QDRANT_API_KEY` if needed.

## Usage

1.  **Add Documents:** Place your markdown files (`.md`) inside the `docs/` directory (or specify a different directory when running the indexer).

2.  **Run Tests (Optional):**
    ```bash
    bun test
    ```

3.  **Index Documents:** Run the indexer script. This will read files from the specified directory (or `./docs` by default), chunk them, generate embeddings using the configured model, and add them to the Qdrant collection.

    ```bash
    # Index files in ./docs using default settings
    bun run src/indexer.ts

    # Index files in a custom directory, specifying collection and model
    bun run src/indexer.ts ./path/to/my/markdown my_qdrant_collection Xenova/bge-small-en-v1.5
    ```

    *Script Arguments for Indexer:*
    *   `docsDir` (optional, positional): Path to the directory containing markdown files (default: `./docs`).
    *   `collectionName` (optional, positional): Name of the Qdrant collection to use (default: `bun_qdrant_docs`).
    *   `modelName` (optional, positional): Sentence Transformer model from Hugging Face (default: `Xenova/all-MiniLM-L6-v2`).
    *   `targetChunkSize` (optional, positional): Target token size for chunks (default: `2000`).

    *Environment Variables for Indexer:*
    *   `QDRANT_URL`: URL of your Qdrant instance (default: `http://localhost:6333`).
    *   `QDRANT_API_KEY`: API key for Qdrant (if required).

4.  **Query Documents:** Run the query script with your question as a command-line argument. You **must** include the `--run` flag before your query.

    ```bash
    bun run src/query.ts --run \"What is the FuelVM?\"
    ```

    *Environment Variables for Query:*
    *   `QDRANT_URL`: URL of your Qdrant instance (default: `http://localhost:6333`).
    *   `QDRANT_API_KEY`: API key for Qdrant (if required).
    *   `QDRANT_COLLECTION`: Specify the collection to query (default: `bun_qdrant_docs`). *Should match the one used for indexing.*
    *   `EMBEDDING_MODEL`: Specify the embedding model (default: `Xenova/all-MiniLM-L6-v2`). *Should match the one used for indexing.*
    *   `NUM_RESULTS`: Number of results to retrieve (default: `5`).

    *Example with custom collection and number of results:*
    ```bash
    QDRANT_COLLECTION=my_qdrant_collection NUM_RESULTS=3 bun run src/query.ts --run \"How do predicates work?\"
    ```

## MCP Server (for IDE Integration)

This project includes an MCP (Model Context Protocol) server (`src/mcp-server.ts`) that exposes the Fuel documentation search functionality as a tool. This allows compatible clients, like Cursor, to connect and use the search capabilities directly within the IDE.

### Running the MCP Server

Ensure QdrantDB is running and you have indexed your documents (see steps above).

To start the MCP server, run the following command. Configure environment variables as needed (especially `QDRANT_URL`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `EMBEDDING_MODEL` if you used non-default values during indexing/querying).

```bash
# Example using default settings
bun run mcp-server

# Example with custom settings
QDRANT_URL=http://your-qdrant-host:6333 QDRANT_COLLECTION=my_docs bun run mcp-server
```

The server will connect via standard input/output (stdio) and wait for a client to connect.

### Connecting with Cursor

1.  **Open Cursor.**
2.  **Open the Command Palette** (Cmd+Shift+P on macOS, Ctrl+Shift+P on Windows/Linux).
3.  **Search for and select \"MCP: Add MCP Server via Command\".**
4.  **Enter the command** to run the server. Since the server uses `bun run`, and Cursor needs the full path to `bun`, you'll typically need to find `bun`'s path first (`which bun` in your terminal). You also need the full path to the project directory.
    *   **Construct the Command:**
        *   Start with the full path to `bun`.
        *   Add `run`.
        *   Add the full path to the `mcp-server` script (e.g., `/path/to/fuel-mcp-server/src/mcp-server.ts`).
        *   **(Crucial)** Prepend any required environment variables *before* the `bun` command.
    *   **Example (replace paths and vars as needed):**
        ```bash
        QDRANT_COLLECTION=my_docs /path/to/your/bun run /path/to/fuel-mcp-server/src/mcp-server.ts
        ```
    *   **Important:** Ensure you provide the **full, absolute paths** and correctly set any **required environment variables** directly in the command string.
5.  **Give the server a name** (e.g., \"Fuel Docs Search\") when prompted.

Once connected, you should be able to use the `searchFuelDocs` tool (or whatever the MCP server exposes) via Cursor's chat or code actions.

## Implementation Details

*   **Chunking (`src/chunker.ts`):** Splits markdown by code blocks (\\\`\\\`\\\`) first. Text sections are then further split by paragraphs (`\\n\\n`) aiming for the target token size.
*   **Indexing (`src/indexer.ts`):** Reads markdown, chunks content, generates embeddings using Transformers.js, and upserts points (vector + payload) into a specified Qdrant collection. Uses batching for efficiency.
*   **Querying (`src/query.ts`):** Takes a text query, generates its embedding, and performs a similarity search against the Qdrant collection to retrieve the most relevant document chunks.
*   **MCP Server (`src/mcp-server.ts`):** Implements the MCP protocol, listening on stdio. Exposes the `queryDocs` functionality as an MCP tool, handling request/response cycles with the client (e.g., Cursor).
*   **Embeddings:** Uses Sentence Transformer models (e.g., `Xenova/all-MiniLM-L6-v2`) via the Transformers.js library to create vector representations of text chunks.
