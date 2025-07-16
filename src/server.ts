import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { queryDocs, log } from "./query.js";
import { env } from "@xenova/transformers";
import * as fs from "fs/promises";
import * as path from "path";

env.cacheDir = "";

export function createFuelMCPServer(): McpServer {
  const server = new McpServer({
    name: "FuelMCPServer",
    version: "0.1.0",
  });

  registerTools(server);

  return server;
}

function registerTools(server: McpServer): void {
  server.tool(
    "searchFuelDocs",
    {
      query: z
        .string()
        .describe("The search query for Fuel and Sway documentation."),
      indexPath: z
        .string()
        .optional()
        .describe("Optional: Specify the Vectra index path."),
      modelName: z
        .string()
        .optional()
        .describe("Optional: Specify the embedding model name."),
      nResults: z
        .number()
        .int()
        .positive()
        .optional()
        .describe(
          "Optional: Specify the number of search results (default 5)."
        ),
    },
    async ({ query, indexPath, modelName, nResults }) => {
      log(`MCP Tool 'searchFuelDocs' called with query: "${query}"`);

      try {
        const results = await queryDocs(query, indexPath, modelName, nResults);

        const formattedResults = Array.isArray(results)
          ? results
              .map((hit: any) => {
                const metadata = hit.item?.metadata || {};
                const score = hit.score;
                const content = metadata.content || "No content found";
                const source = metadata.source || "unknown";
                return `Source: ${source}\nScore: ${score?.toFixed(
                  4
                )}\nContent:\n${content}\n---`;
              })
              .join("\n\n")
          : JSON.stringify(results, null, 2);

        return {
          content: [
            {
              type: "text",
              text: `Search Results for "${query}":\n\n${formattedResults}`,
            },
          ],
        };
      } catch (err: unknown) {
        const error = err as Error;
        console.error(`Error in searchFuelDocs tool: ${error.message}`);
        return {
          content: [
            {
              type: "text",
              text: `Error executing search: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.tool("provideStdContext", {}, async () => {
    const filePath = path.join(__dirname, "..", "sway", "std_paths_data.txt");
    log(`MCP Tool 'provideStdContext' called. Reading file: ${filePath}`);

    try {
      const data = await fs.readFile(filePath, "utf-8");
      log(`Successfully read ${filePath}. Length: ${data.length}`);
      return {
        content: [
          {
            type: "text",
            text: `Sway Standard Library Paths and Types:\n\n${data}`,
          },
        ],
      };
    } catch (err: unknown) {
      const error = err as Error;
      console.error(
        `Error in provideStdContext tool reading ${filePath}: ${error.message}`
      );
      log(`Error reading ${filePath}: ${error.message}`);
      return {
        content: [
          {
            type: "text",
            text: `Error reading Sway standard library context file: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });
}
