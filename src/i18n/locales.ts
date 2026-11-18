/**
 * Website languages. They follow the app's translations in
 * kuchie-app/Kuchie/lib/src/l10n, except that the app's `pt`, `pt_BR` and
 * `pt_PT` become `pt-br` and `pt-pt` here.
 *
 * `slug` is the URL prefix (English has none), `lang` is the BCP-47 tag used
 * for `<html lang>`, hreflang and Starlight's built-in UI strings.
 */
export interface Locale {
  slug: string;
  lang: string;
  label: string;
  dir: 'ltr' | 'rtl';
}

export const defaultLocale = 'en';

export const locales: readonly Locale[] = [
  { slug: 'en', lang: 'en', label: 'English', dir: 'ltr' },
  { slug: 'id', lang: 'id', label: 'Bahasa Indonesia', dir: 'ltr' },
  { slug: 'ar', lang: 'ar', label: 'العربية', dir: 'rtl' },
  { slug: 'ca', lang: 'ca', label: 'Català', dir: 'ltr' },
  { slug: 'de', lang: 'de', label: 'Deutsch', dir: 'ltr' },
  { slug: 'es', lang: 'es', label: 'Español', dir: 'ltr' },
  { slug: 'fil', lang: 'fil', label: 'Filipino', dir: 'ltr' },
  { slug: 'fr', lang: 'fr', label: 'Français', dir: 'ltr' },
  { slug: 'it', lang: 'it', label: 'Italiano', dir: 'ltr' },
  { slug: 'ja', lang: 'ja', label: '日本語', dir: 'ltr' },
  { slug: 'ko', lang: 'ko', label: '한국어', dir: 'ltr' },
  { slug: 'nb', lang: 'nb', label: 'Norsk bokmål', dir: 'ltr' },
  { slug: 'nl', lang: 'nl', label: 'Nederlands', dir: 'ltr' },
  { slug: 'pt-br', lang: 'pt-BR', label: 'Português (Brasil)', dir: 'ltr' },
  { slug: 'pt-pt', lang: 'pt-PT', label: 'Português (Portugal)', dir: 'ltr' },
  { slug: 'ru', lang: 'ru', label: 'Русский', dir: 'ltr' },
  { slug: 'ta', lang: 'ta', label: 'தமிழ்', dir: 'ltr' },
  { slug: 'th', lang: 'th', label: 'ไทย', dir: 'ltr' },
  { slug: 'tr', lang: 'tr', label: 'Türkçe', dir: 'ltr' },
  { slug: 'uk', lang: 'uk', label: 'Українська', dir: 'ltr' },
  { slug: 'vi', lang: 'vi', label: 'Tiếng Việt', dir: 'ltr' },
  { slug: 'zh-hans', lang: 'zh-CN', label: '简体中文', dir: 'ltr' },
  { slug: 'zh-hant', lang: 'zh-TW', label: '繁體中文', dir: 'ltr' },
];

export const localeSlugs = locales.map((l) => l.slug);

/** Locales served under a URL prefix (every locale except English). */
export const prefixedLocales = locales.filter((l) => l.slug !== defaultLocale);

export function getLocale(slug: string | undefined): Locale {
  return locales.find((l) => l.slug === slug) ?? locales[0]!;
}

/** Starlight `locales` config: English at the root, the rest under their slug. */
export function starlightLocales() {
  const entries = locales.map((l) => [
    l.slug === defaultLocale ? 'root' : l.slug,
    { label: l.label, lang: l.lang, dir: l.dir },
  ]);
  return Object.fromEntries(entries);
}

/**
 * Builds a site path for a locale. `path` is the English path without the
 * leading slash, for example `download` or `guides/getting-started`.
 */
export function localizedPath(slug: string, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const prefix = slug === defaultLocale ? '' : `/${slug}`;
  return clean ? `${prefix}/${clean}/` : `${prefix}/`;
}

/** Splits a pathname such as `/id/download/` into its locale and the rest. */
export function splitPath(pathname: string): { slug: string; path: string } {
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/');
  const first = parts[0] ?? '';
  if (first && first !== defaultLocale && localeSlugs.includes(first)) {
    return { slug: first, path: parts.slice(1).join('/') };
  }
  return { slug: defaultLocale, path: parts.join('/') };
}

/**
 * Languages whose pages are fully written by people. Pages in other languages
 * still show English body text, so they point their canonical at the English
 * page and stay out of the sitemap until their translation lands.
 */
export const indexedLocales = ['en', 'id'];

export function isIndexed(slug: string): boolean {
  return indexedLocales.includes(slug);
}
