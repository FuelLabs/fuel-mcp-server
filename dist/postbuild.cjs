"use strict";
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'dist', 'src', 'mcp-server.js');
const targetImport = 'import { queryDocs } from "./query";';
const replacementImport = 'import { queryDocs } from "./query.js";';
console.log(`Running post-build script to modify: ${filePath}`);
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        process.exit(1);
    }
    if (data.includes(targetImport)) {
        const updatedData = data.replace(targetImport, replacementImport);
        fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Error writing file: ${writeErr}`);
                process.exit(1);
            }
            console.log('Successfully updated import path in mcp-server.js');
        });
    }
    else {
        console.log('Target import path not found, file not modified.');
        // Check if it was already modified
        if (data.includes(replacementImport)) {
            console.log('It looks like the import path was already updated.');
        }
    }
});
