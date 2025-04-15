import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/query.vest.ts'],
    globals: true, // Ensure globals are enabled
    environment: 'node', // Specify the test environment (node is usually suitable for backend code)
  },
}); 