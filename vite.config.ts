import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import fs from 'fs';

// Plugin to fix FOUC by removing inline styles from pre-rendered HTML
function fixPrerenderFOUC(): Plugin {
  return {
    name: 'fix-prerender-fouc',
    apply: 'build',
    closeBundle() {
      const htmlFiles = [
        'dist/upgrade-subscription/index.html',
      ];

      htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
          let html = fs.readFileSync(file, 'utf-8');

          // Remove inline styles and ready class from #root element
          html = html.replace(
            /<div id="root" class="ready" style="[^"]*">/,
            '<div id="root">'
          );
          html = html.replace(
            /<div id="root" style="[^"]*">/,
            '<div id="root">'
          );

          fs.writeFileSync(file, html);
          console.log(`✓ Fixed FOUC in ${file}`);
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        // '/',
        // '/map',
        // '/faqs',
        // '/terms-of-service',
        // '/privacy-policy',
        // '/refund-policy',
        // '/surveys',
        // '/how-it-works',
        '/upgrade-subscription',
        // '/manage-in-app-credits', // Temporarily disabled - causes styling issues with pre-render
      ],
      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: 'render-event',
        timeout: 30000, // Increase timeout to wait for styles
      }),
    }),
    fixPrerenderFOUC(),
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
