/** robots.txt: the real domain lists the sitemap; temporary addresses ask not to be indexed. */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://kuchie.app');
  const body =
    base.hostname === 'kuchie.app'
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', base).href}\n`
      : `# Temporary address. The site lives at kuchie.app once the domain is connected.\nUser-agent: *\nAllow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
