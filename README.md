# Fuel Network & Sway Language MCP Server

This project provides a Multi-Component Protocol (MCP) server specifically designed for the Fuel Network and Sway Language ecosystem. It allows IDEs (like VS Code with the appropriate extension) to connect and seamlessly interact with Fuel documentation, enabling easier searching, understanding, and development within Fuel projects.

This server indexes Fuel and Sway documentation (including markdown files) into a Qdrant vector database using open-source embeddings (via Transformers.js). This allows for powerful semantic search capabilities directly within the development environment.

## Features
- Makes the entire docs.fuel.network content locally searchable to agents
- Hybrid search (RAG + keyword via qdrant)
- qdrant db can be hosted for remote LLMs
- Contains the scripts to index new docs

## Quick Install

```bash
# Git clone the repo
git clone --depth 1 https://github.com/FuelLabs/fuel-mcp-server

# Docker compose
docker compose -f fuel-mcp-server/docker-compose.yml up -d

# Copy this
realpath fuel-mcp-server
```

Edit your Cursor `mcp.json`
```json
{
  "mcpServers": {
    "fuel-sever": {
      "command": "docker",
      "args": [
        "compose",
        "-f { replace w/ real path to fuel-mcp-server }/docker-compose.yml",
        "exec",
        "-T mcp-server bun run mcp-server"
      ]
    }
  }
}
```

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

## Development Prerequisites

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

## Running with Docker (Recommended)

This project includes a `docker-compose.yml` file to easily run both the Qdrant database and the MCP server in containers.

**Prerequisites:**

*   **Docker:** Install from [https://www.docker.com/](https://www.docker.com/)
*   **Docker Compose:** Usually included with Docker Desktop.

**Steps:**

1.  **Clone the repository (if you haven't already).**
2.  **(Optional) Create a `.env` file:** Copy `.env.example` to `.env` and configure environment variables if needed (e.g., `QDRANT_API_KEY` for Qdrant Cloud). **Note:** `QDRANT_URL` is automatically handled by Docker Compose for communication between the server and Qdrant containers. You can add other variables needed by the `mcp-server` here (like `EMBEDDING_MODEL`, `QDRANT_COLLECTION`).
3.  **Build and Start Containers:** Open a terminal in the project root directory and run:
    ```bash
    docker compose up --build -d
    ```
    *   `--build`: Builds the `mcp-server` image based on the `Dockerfile`.
    *   `-d`: Runs the containers in detached mode (in the background).
    This command will:
    *   Pull the `qdrant/qdrant` image if not present.
    *   Build the `mcp-server` image.
    *   Start containers for both Qdrant and the MCP server.
    *   Set up a network for the containers to communicate.
    *   Mount `./qdrant_storage` for persistent Qdrant data.
4.  **Index Documents:** To run the indexer script *inside* the running `mcp-server` container:
    ```bash
    # Index files in ./docs using default settings defined in the container
    docker compose exec mcp-server-app bun run src/indexer.ts

    # Index files specifying arguments (run inside the container)
    docker compose exec mcp-server-app bun run src/indexer.ts /app/docs my_collection Xenova/bge-small-en-v1.5
    ```
    *   Remember that file paths (like `/app/docs`) are relative to the *container's* filesystem (`/app` is the WORKDIR defined in the `Dockerfile`). If you need to index files from your host machine, you might need to mount additional volumes in `docker-compose.yml`.
    *   Environment variables from your `.env` file should be automatically picked up by the `mcp-server` container if defined under its `environment` section in `docker-compose.yml`.
5.  **The MCP Server is Running:** The `docker compose up` command already started the MCP server as defined in the `Dockerfile` (`CMD ["bun", "run", "mcp-server"]`). It's accessible via `docker compose exec` for stdio communication.
6.  **Connect with Cursor:**
    *   Follow the previous instructions for connecting Cursor, but use the following `stdio` command:
    ```json
    {
      "mcpServers": {
        "fuel-sever": {
          "command": "docker",
          "args": [
            "compose",
            "-f { replace w/ real path to fuel-mcp-server }/docker-compose.yml",
            "exec",
            "-T mcp-server bun run mcp-server"
          ]
        }
      }
    }
    ```
    *   Replace `{ replace w/ real path to fuel-mcp-server }` with the actual absolute path to your project directory where the `docker-compose.yml` file resides.
7.  **Stop Containers:** To stop and remove the containers, network, and volumes defined in `docker-compose.yml`:
    ```bash
    docker compose down
    ```
    To stop without removing:
    ```bash
    docker compose stop
    ```

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

## Implementation Details

*   **Chunking (`src/chunker.ts`):** Splits markdown by code blocks (\\\`\\\`\\\`) first. Text sections are then further split by paragraphs (`\\n\\n`) aiming for the target token size.
*   **Indexing (`src/indexer.ts`):** Reads markdown, chunks content, generates embeddings using Transformers.js, and upserts points (vector + payload) into a specified Qdrant collection. Uses batching for efficiency.
*   **Querying (`src/query.ts`):** Takes a text query, generates its embedding, and performs a similarity search against the Qdrant collection to retrieve the most relevant document chunks.
*   **MCP Server (`src/mcp-server.ts`):** Implements the MCP protocol, listening on stdio. Exposes the `queryDocs` functionality as an MCP tool, handling request/response cycles with the client (e.g., Cursor).
*   **Embeddings:** Uses Sentence Transformer models (e.g., `Xenova/all-MiniLM-L6-v2`) via the Transformers.js library to create vector representations of text chunks.
