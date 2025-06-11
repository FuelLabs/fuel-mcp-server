# Fuel Network & Sway Language MCP Server

This project provides a Model Context Protocol (MCP) server for the Fuel Network and Sway Language ecosystem. It allows IDEs (like Cursor) to search and interact with Fuel documentation directly within the development environment.

The server indexes Fuel and Sway documentation into a local Vectra vector database using open-source embeddings (via Transformers.js) for powerful semantic search capabilities.

## Features
- Local semantic search of docs.fuel.network content
- No Docker dependency - runs with just Bun
- Fast file-based vector storage with Vectra
- Enhanced result filtering and formatting
- Hybrid search with keyword fallback

## Quick Install

```bash
# Clone the repo
git clone https://github.com/FuelLabs/fuel-mcp-server
cd fuel-mcp-server

# Install dependencies
bun install

# Index documentation
bun run src/indexer.ts ./docs

# Test search
bun run src/query.ts --run "What is FuelVM?"
```

## Claude/Cursor Integration

Add to your MCP config file:
```json
{
  "mcpServers": {
    "fuel-server": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/fuel-mcp-server/src/mcp-server.ts"]
    }
  }
}
```

## Project Structure

```
.
├── docs/                     # Markdown documentation files
├── src/
│   ├── chunker.ts            # Markdown chunking logic
│   ├── indexer.ts            # Document indexing script
│   ├── query.ts              # Search query script
│   ├── mcp-server.ts         # MCP server implementation
│   └── *.test.ts             # Test files
├── vectra_index/             # Local vector database (created after indexing)
├── package.json
└── README.md
```

## Prerequisites

- **Bun:** Install from [bun.sh](https://bun.sh/)

## Usage

### 1. Index Documents

Place markdown files in `./docs` or specify a different directory:

```bash
# Index docs in ./docs (default)
bun run src/indexer.ts

# Index custom directory
bun run src/indexer.ts /path/to/your/docs

# With custom settings
EMBEDDING_MODEL=Xenova/bge-small-en-v1.5 bun run src/indexer.ts ./docs
```

### 2. Search Documents

```bash
# Basic search
bun run src/query.ts --run "What is the FuelVM?"

# Custom number of results
NUM_RESULTS=10 bun run src/query.ts --run "smart contracts"
```

### 3. Run MCP Server

```bash
# Start MCP server (for IDE integration)
bun run src/mcp-server.ts

# With custom index path
VECTRA_INDEX_PATH=./my_index bun run src/mcp-server.ts
```

### 4. Run Tests

```bash
bun test
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VECTRA_INDEX_PATH` | `./vectra_index` | Vector database location |
| `EMBEDDING_MODEL` | `Xenova/all-MiniLM-L6-v2` | Hugging Face model |
| `CHUNK_SIZE` | `2000` | Target tokens per chunk |
| `NUM_RESULTS` | `5` | Search results count |
| `LOG_LEVEL` | | Set to `debug` for verbose output |

## Implementation Details

- **Chunking:** Preserves code blocks, splits by paragraphs with context awareness
- **Indexing:** Generates embeddings with enhanced metadata for better search
- **Querying:** Semantic search with quality filtering and keyword fallback
- **MCP Server:** Exposes search as tool via stdio communication
- **Storage:** File-based Vectra index (no external database required)

## API

### MCP Tools

**searchFuelDocs**
- `query` (string): Search query
- `nResults` (number, optional): Number of results (default: 5)
- `includeScore` (boolean, optional): Include relevance scores

**provideStdContext**
- Returns Sway standard library paths and types

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Index sample docs
bun run src/indexer.ts ./docs

# Test search functionality
bun run src/query.ts --run "test query"

# Start MCP server for development
bun run src/mcp-server.ts
```