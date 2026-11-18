import { defaultLocale } from './locales';

type Dict = Record<string, string>;

const files = import.meta.glob<Dict>('./ui/*.json', { eager: true, import: 'default' });

const dictionaries: Record<string, Dict> = Object.fromEntries(
  Object.entries(files).map(([path, dict]) => [path.replace(/^\.\/ui\/|\.json$/g, ''), dict]),
);

const fallback = dictionaries[defaultLocale] ?? {};

export type UIKey = keyof typeof import('./ui/en.json');

/**
 * Returns a translator for a locale. Missing keys fall back to English, and
 * `{name}` placeholders are filled from `vars`.
 */
export function useTranslations(slug: string) {
  const dict = dictionaries[slug] ?? fallback;
  return function t(key: UIKey, vars: Record<string, string | number> = {}): string {
    const template = dict[key] ?? fallback[key] ?? key;
    return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
  };
}

/** True when the locale's strings were drafted by machine translation. */
export function needsReview(slug: string): boolean {
  return Boolean(dictionaries[slug]?._status);
}
