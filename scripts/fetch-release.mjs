#!/usr/bin/env node
/**
 * Reads app releases from GitHub and writes src/data/releases.json.
 *
 * Only `vX.Y.Z` tags count as app releases; the repository also publishes
 * `ios-runtime-*` releases for the extension runtime, which are skipped.
 * When GitHub cannot be reached the committed file is kept, so a build never
 * fails because of the API.
 */
import { readFile, writeFile } from 'node:fs/promises';

const REPO = process.env.KUCHIE_REPO ?? 'kuchie-app/Kuchie';
const OUT = new URL('../src/data/releases.json', import.meta.url);
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'kuchie-website-build',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function getJson(url) {
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

async function getSha256(asset) {
  if (!asset) return null;
  const res = await fetch(asset.browser_download_url, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) return null;
  const match = (await res.text()).match(/\b[a-f0-9]{64}\b/i);
  return match ? match[0].toLowerCase() : null;
}

async function main() {
  const all = await getJson(`https://api.github.com/repos/${REPO}/releases?per_page=30`);
  const appReleases = all.filter((r) => !r.draft && !r.prerelease && /^v\d+\.\d+\.\d+$/.test(r.tag_name));

  const releases = [];
  for (const r of appReleases) {
    const ipa = r.assets.find((a) => a.name.endsWith('.ipa'));
    if (!ipa) continue;
    const sha = r.assets.find((a) => a.name === `${ipa.name}.sha256`);
    releases.push({
      version: r.tag_name.slice(1),
      tag: r.tag_name,
      date: r.published_at,
      url: r.html_url,
      notes: r.body ?? '',
      ipa: { name: ipa.name, url: ipa.browser_download_url, size: ipa.size },
      sha256: await getSha256(sha),
    });
  }
  if (releases.length === 0) throw new Error('no app releases with an IPA found');

  const data = { repo: REPO, fetchedAt: new Date().toISOString(), releases };
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`releases.json: ${releases.length} release(s), latest ${releases[0].tag}`);
}

main().catch(async (error) => {
  const existing = await readFile(OUT, 'utf8').catch(() => null);
  console.warn(`fetch-release: ${error.message}. ${existing ? 'Keeping the committed releases.json.' : 'No cached data.'}`);
  if (!existing) process.exitCode = 1;
});
