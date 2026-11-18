// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { indexedLocales, localeSlugs, starlightLocales } from './src/i18n/locales.ts';
import { sidebar } from './src/i18n/sidebar.ts';

export default defineConfig({
  site: 'https://kuchie.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    react(),
    // Our own sitemap so "coming soon" pages (noindex) and the 404 stay out.
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        const first = pathname.split('/')[1] ?? '';
        const prefixed = first !== 'en' && localeSlugs.includes(first);
        // Only languages written by people (see indexedLocales in src/i18n/locales.ts).
        if (prefixed && !indexedLocales.includes(first)) return false;
        const path = prefixed ? pathname.slice(first.length + 1) : pathname;
        const soon = ['/news/', '/translate/', '/contribute/', '/press/', '/privacy/', '/legal/', '/credits/', '/404/'];
        return !soon.includes(path);
      },
    }),
    starlight({
      title: 'Kuchie',
      description:
        'Kuchie is a free, open-source iPhone reader for manga and webtoons, with a local library or your own Suwayomi server.',
      logo: { src: './src/assets/scarf-icon.png', alt: '' },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: starlightLocales(),
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kuchie-app/Kuchie' }],
      editLink: { baseUrl: 'https://github.com/kuchie-app/website/edit/main/' },
      lastUpdated: true,
      sidebar,
      customCss: ['@fontsource-variable/inter', '@fontsource/jetbrains-mono/latin-400.css', './src/styles/tokens.css', './src/styles/starlight.css'],
      disable404Route: true,
      head: [
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#111118' } },
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://kuchie.app/og/default.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://kuchie.app/og/default.png' } },
      ],
    }),
  ],
});
