/// <reference types="vitest" />
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.BACKEND_HOST || 'https://sbbk.lixtar.org',
        changeOrigin: true,
      },
      '/ws': {
        target: process.env.BACKEND_HOST?.replace('https://', 'wss://') || 'wss://sbbk.lixtar.org',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/app/tests/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
  },
});
