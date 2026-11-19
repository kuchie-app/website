import releasesData from './releases.json';

export const links = {
  github: 'https://github.com/kuchie-app/Kuchie',
  website: 'https://github.com/kuchie-app/website',
  issues: 'https://github.com/kuchie-app/Kuchie/issues',
  security: 'https://github.com/kuchie-app/Kuchie/security/advisories/new',
  altstoreSource: new URL('/altstore.json', import.meta.env.SITE).href,
};

export const altstoreUrl = `altstore://source?url=${encodeURIComponent(links.altstoreSource)}`;

export interface Release {
  version: string;
  tag: string;
  date: string;
  url: string;
  notes: string;
  ipa: { name: string; url: string; size: number };
  sha256: string | null;
}

export const releases = releasesData.releases as Release[];
export const latest = releases[0]!;

/** Marketing pages that exist (or are planned) in every language. */
export const pages = [
  'features',
  'download',
  'faq',
  'changelog',
  'news',
  'translate',
  'contribute',
  'press',
  'privacy',
  'legal',
  'credits',
] as const;

export type PageSlug = (typeof pages)[number];

/** Pages that are written. The rest render the "coming soon" placeholder. */
export const builtPages: readonly PageSlug[] = ['features', 'download', 'changelog', 'faq'];

export const nav = [
  { key: 'nav.features', path: 'features' },
  { key: 'nav.guides', path: 'guides/getting-started' },
  { key: 'nav.faq', path: 'faq' },
  { key: 'nav.changelog', path: 'changelog' },
  { key: 'nav.news', path: 'news' },
] as const;

/** UI string used as the title of each marketing page. */
export const pageTitleKey = {
  features: 'nav.features',
  download: 'nav.download',
  faq: 'nav.faq',
  changelog: 'nav.changelog',
  news: 'nav.news',
  translate: 'footer.translate',
  contribute: 'footer.contribute',
  press: 'footer.press',
  privacy: 'footer.privacy',
  legal: 'footer.legalPage',
  credits: 'footer.credits',
} as const satisfies Record<PageSlug, string>;
