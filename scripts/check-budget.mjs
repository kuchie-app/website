#!/usr/bin/env node
/**
 * Fails the build when pages grow past the size budget in PLAN.md §9.
 * Sizes are gzip bytes of the HTML plus every JS/CSS file the page loads,
 * including chunks those scripts import.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = new URL('../dist/', import.meta.url).pathname;
const KB = 1024;

// [path, max HTML, max JS, max CSS] in KB (gzip).
const budgets = [
  // Home carries the Motion for React scenes (React DOM ≈ 64 KB + Motion + five scenes + story art).
  ['index.html', 60, 125, 25],
  ['id/index.html', 60, 125, 25],
  ['download/index.html', 40, 10, 20],
  ['404.html', 40, 10, 20],
  ['guides/getting-started/index.html', 40, 10, 25],
];
const MAX_FILES = 20000; // Cloudflare Pages free plan limit per deployment.

const gz = (buf) => gzipSync(buf).length;
const importRe = /(?:from|import)\s*\(?\s*"\.\/([^"]+\.js)"/g;

function assetsFor(html) {
  const refs = new Set();
  for (const m of html.matchAll(/(?:src|href|component-url|renderer-url)="(\/_astro\/[^"]+\.(?:js|css))"/g)) {
    refs.add(m[1]);
  }
  const seen = new Set();
  const totals = { js: 0, css: 0 };
  const walk = (ref) => {
    if (seen.has(ref)) return;
    seen.add(ref);
    const buf = readFileSync(join(DIST, ref));
    const kind = ref.endsWith('.js') ? 'js' : 'css';
    totals[kind] += gz(buf);
    if (kind === 'js') {
      for (const m of buf.toString().matchAll(importRe)) walk(`/_astro/${m[1]}`);
    }
  };
  refs.forEach(walk);
  return totals;
}

function countFiles(dir) {
  return readdirSync(dir).reduce((n, name) => {
    const p = join(dir, name);
    return n + (statSync(p).isDirectory() ? countFiles(p) : 1);
  }, 0);
}

let failed = false;
console.log('page'.padEnd(40), 'HTML', '  JS', ' CSS  (KB gzip)');
for (const [page, maxHtml, maxJs, maxCss] of budgets) {
  const html = readFileSync(join(DIST, page));
  const { js, css } = assetsFor(html.toString());
  const row = [gz(html), js, css].map((b) => (b / KB).toFixed(1).padStart(5));
  const over = gz(html) > maxHtml * KB || js > maxJs * KB || css > maxCss * KB;
  failed ||= over;
  console.log(page.padEnd(40), row.join(' '), over ? `  ✗ over budget (${maxHtml}/${maxJs}/${maxCss})` : '  ✓');
}

const files = countFiles(DIST);
console.log(`files in dist: ${files} (limit ${MAX_FILES})`);
if (files > MAX_FILES) failed = true;

if (failed) {
  console.error('Size budget exceeded.');
  process.exit(1);
}
