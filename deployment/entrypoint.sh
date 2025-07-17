#!/bin/bash

set -e

INDEX_PATH="./vectra_index"

echo "Starting Fuel MCP Server..."

# Verify index exists (should be created by init container)
if [ -d "$INDEX_PATH" ] && [ -f "$INDEX_PATH/index.json" ] && [ -s "$INDEX_PATH/index.json" ]; then
    echo "Vector index found at $INDEX_PATH"
else
    echo "Vector index not found at $INDEX_PATH"
    echo "This indicates the init container failed to create the index."
    echo "Check init container logs for indexing errors."
    exit 1
fi

# Start the server
echo "Starting HTTP server on port 3500..."
export VECTRA_INDEX_PATH="$INDEX_PATH"
exec bun run src/cli.ts --transport http --port 3500