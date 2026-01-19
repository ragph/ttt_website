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
      ],
      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: 'render-event',
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
