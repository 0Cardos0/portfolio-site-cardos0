// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Troque pela URL final do site (usado em canonical, sitemap e Open Graph).
  site: 'https://cardos0.example.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
