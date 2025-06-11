import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test files pattern - run query tests with Vitest, indexer/chunker use Bun test
    include: ['src/**/query.test.ts'],
    
    // Environment
    environment: 'node',
    
    // Global setup
    globals: true,
    
    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.d.ts',
      ],
    },
    
    // Timeout
    testTimeout: 10000,
    
    // Mock settings
    clearMocks: true,
    restoreMocks: true,
  },
});