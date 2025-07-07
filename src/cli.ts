#!/usr/bin/env node
import { Command } from 'commander';
import { startStdioServer } from './transports/stdio.js';
import { startHttpServer, type HttpServerOptions } from './transports/http.js';
import * as path from 'path';

const program = new Command()
    .name('fuel-mcp-server')
    .description('MCP server for Fuel and Sway documentation with vector search')
    .version('0.2.0')
    .option('--transport <type>', 'Transport type: stdio or http', 'stdio')
    .option('-p, --port <port>', 'HTTP server port (only for http transport)', (val) => parseInt(val, 10), 3500)
    .option('--repo <path>', 'Local Fuel repository path (must be absolute)')
    .action(async (options) => {
        if (options.repo && !path.isAbsolute(options.repo)) {
            console.error('Error: --repo path must be absolute');
            process.exit(1);
        }

        if (!['stdio', 'http'].includes(options.transport)) {
            console.error(`Error: Unknown transport type "${options.transport}"`);
            console.error('Available transports: stdio, http');
            process.exit(1);
        }

        if (options.transport === 'http' && (isNaN(options.port) || options.port <= 0 || options.port > 65535)) {
            console.error(`Error: Invalid port "${options.port}". Must be between 1 and 65535.`);
            process.exit(1);
        }

        const serverOptions = {
            localRepoPath: options.repo,
        };

        try {
            if (options.transport === 'http') {
                const httpOptions: HttpServerOptions = {
                    ...serverOptions,
                    port: options.port,
                };
                await startHttpServer(httpOptions);
            } else {
                await startStdioServer(serverOptions);
            }
        } catch (error) {
            console.error(`Failed to start ${options.transport} server:`, error);
            process.exit(1);
        }
    });

// Error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

program.parse();