import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL in Vercel (Project → Settings → Environment Variables) to the
// final address, e.g. https://www.example.de — canonicals, sitemap and Open
// Graph tags are built from it.
const site = process.env.SITE_URL || 'https://skyline-service.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') })],
});
