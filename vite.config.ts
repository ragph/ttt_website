import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/map',
        '/faqs',
        '/terms-of-service',
        '/privacy-policy',
        '/refund-policy',
        '/surveys',
        '/how-it-works',
        '/upgrade-subscription',
      ],
      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: 'render-event',
        timeout: 30000, // Increase timeout to wait for styles
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'mui-core': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],
        },
      },
    },
  },
});
