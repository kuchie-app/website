#!/usr/bin/env node
/**
 * Reports UI strings missing from each language file compared with English,
 * and which guides have no translation yet. Informational only: missing
 * strings fall back to English, so this never fails the build.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const uiDir = join(root, 'src/i18n/ui');
const docsDir = join(root, 'src/content/docs');

const load = (file) => JSON.parse(readFileSync(join(uiDir, file), 'utf8'));
const en = load('en.json');
const keys = Object.keys(en).filter((k) => !k.startsWith('_'));

const guides = existsSync(join(docsDir, 'guides'))
  ? readdirSync(join(docsDir, 'guides')).filter((f) => /\.mdx?$/.test(f))
  : [];

console.log(`UI strings: ${keys.length} · guides: ${guides.length}\n`);
console.log('lang'.padEnd(9), 'UI'.padStart(9), 'guides'.padStart(8), ' status');
for (const file of readdirSync(uiDir).sort()) {
  const slug = file.replace(/\.json$/, '');
  if (slug === 'en') continue;
  const dict = load(file);
  const missing = keys.filter((k) => !(k in dict));
  const translatedGuides = guides.filter((g) => existsSync(join(docsDir, slug, 'guides', g))).length;
  console.log(
    slug.padEnd(9),
    `${keys.length - missing.length}/${keys.length}`.padStart(9),
    `${translatedGuides}/${guides.length}`.padStart(8),
    dict._status ? ` ${dict._status}` : ' reviewed',
  );
}
