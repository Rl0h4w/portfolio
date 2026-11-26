import { fileURLToPath } from 'node:url';
import { env } from 'node:process';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import prerenderPortfolio from './scripts/prerender-portfolio.mjs';

export default defineConfig({
  plugins: [react(), prerenderPortfolio()],
  base: env.PORTFOLIO_BASE ?? '/portfolio/',
  build: {
    rollupOptions: {
      input: [
        fileURLToPath(new URL('./index.html', import.meta.url)),
        fileURLToPath(new URL('./ru/index.html', import.meta.url)),
      ],
    },
  },
});
