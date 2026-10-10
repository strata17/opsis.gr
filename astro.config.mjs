import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// Absolute URLs (share images, canonical) use SITE_URL when set; on Vercel they fall back to the
// project's production domain, so previews work before opsis.gr is connected.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://opsis.gr');

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [mdx()],
  // Pages are static; /admin opts out with `prerender = false` and runs as a Vercel function.
  output: 'static',
  adapter: vercel(),
});
