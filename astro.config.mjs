// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    // keep the CSS exactly as written: the minifier merges some duplicate rules
    // and that changes which one wins in the dark theme
    build: { cssMinify: false },
  },
});
