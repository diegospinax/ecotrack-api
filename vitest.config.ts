import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',

    globals: true,
    setupFiles: ['./tests/setup.ts'],
    
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.d.ts',
        'vitest.config.ts'
      ]
    },
    
    testTimeout: 10000,
    
    include: [
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
  
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache'
    ]
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})