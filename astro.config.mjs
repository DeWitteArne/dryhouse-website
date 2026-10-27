// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.dryhouse.be',
  trailingSlash: 'never',
  // contact.html is served at /contact on Cloudflare Pages: same URLs as Wix, no trailing-slash redirects.
  // Inline CSS: no render-blocking stylesheet request before first paint.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/bedankt'),
      i18n: { defaultLocale: 'nl', locales: { nl: 'nl-BE' } },
    }),
  ],
  image: { layout: 'constrained', responsiveStyles: true },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { plugins: [tailwindcss()] },
});
