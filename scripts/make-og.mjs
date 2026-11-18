#!/usr/bin/env node
/**
 * Renders the Open Graph images (1200 × 630) used for link previews.
 * Run once after changing the copy: `node scripts/make-og.mjs`.
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const W = 1200;
const H = 630;
const SCARF = 'M23 92c14-12 18-29 28-42 13-18 31-23 54-24L94 40l13 11c-19 0-30 5-40 17-9 11-13 23-25 32l-2-13z';
const PAPER = 'm31 70 5-28 23-10c-9 7-16 18-21 29z';

const variants = [
  { file: 'default', lines: ['Manga and webtoons', 'on iPhone, from your', 'phone or your server'], meta: 'Free · Open source · iOS 15 or later' },
  { file: 'id', lines: ['Manga dan webtoon', 'di iPhone, dari ponselmu', 'atau servermu sendiri'], meta: 'Gratis · Open source · iOS 15 atau lebih baru' },
];

const kiri = await sharp(await readFile(new URL('../src/assets/kiri/kiri-ready.png', import.meta.url)))
  .resize({ width: 380 })
  .png()
  .toBuffer();

for (const v of variants) {
  const text = v.lines
    .map((line, i) => `<text x="80" y="${270 + i * 76}" font-size="64" font-weight="500" letter-spacing="-1.6" fill="#eeedf3">${line}</text>`)
    .join('');
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#111118"/>
    <g transform="translate(80 80)">
      <rect width="64" height="64" rx="14" fill="#18142d"/>
      <g transform="scale(0.5)"><path d="${SCARF}" fill="#b5aaff"/><path d="${PAPER}" fill="#f4f0ea"/></g>
      <text x="84" y="44" font-size="34" font-weight="600" fill="#eeedf3" font-family="Inter, Helvetica, Arial, sans-serif">Kuchie</text>
    </g>
    <g font-family="Inter, Helvetica, Arial, sans-serif">${text}</g>
    <text x="80" y="${270 + v.lines.length * 76 + 24}" font-size="24" fill="#827f92" font-family="Menlo, monospace">${v.meta}</text>
    <circle cx="1010" cy="170" r="54" fill="#f4f0ea"/>
    <path d="M760 630 V560 h40 v-40 h50 v30 h30 v-70 h60 v50 h30 v-30 h50 v40 h40 v-60 h70 v60 h20 V630 z" fill="#0b0b12"/>
    <g transform="translate(700 210) scale(2.1)" opacity="0.95"><path d="${SCARF}" fill="#b5aaff"/><path d="${PAPER}" fill="#f4f0ea"/></g>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: kiri, left: 790, top: 300 }])
    .png({ compressionLevel: 9 })
    .toFile(new URL(`../public/og/${v.file}.png`, import.meta.url).pathname);
  console.log(`og/${v.file}.png`);
}
