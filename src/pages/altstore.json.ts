/**
 * AltStore / SideStore source, generated from the GitHub releases at build
 * time, so the stores see a new version as soon as the site rebuilds.
 */
import type { APIRoute } from 'astro';
import { releases } from '../data/site';

const SITE = 'https://kuchie.app';

export const GET: APIRoute = () => {
  const source = {
    name: 'Kuchie',
    identifier: 'app.kuchie.source',
    subtitle: 'A reader for manga and webtoons',
    description: 'The official source for Kuchie, a free and open-source iPhone reader for manga and webtoons.',
    iconURL: `${SITE}/icon-512.png`,
    website: SITE,
    tintColor: '6A58DC',
    apps: [
      {
        name: 'Kuchie',
        bundleIdentifier: 'app.kuchie.reader',
        developerName: 'Kuchie',
        subtitle: 'Manga and webtoons, from your phone or your server',
        localizedDescription:
          'Kuchie is a free, open-source reader for manga and webtoons. Keep your library on the iPhone with CBZ/ZIP imports and extension stores, or read from your own Suwayomi server. Kuchie does not host or provide any content.',
        iconURL: `${SITE}/icon-512.png`,
        tintColor: '6A58DC',
        category: 'entertainment',
        versions: releases.map((r) => ({
          version: r.version,
          date: r.date,
          localizedDescription: r.notes,
          downloadURL: r.ipa.url,
          size: r.ipa.size,
          minOSVersion: '15.0',
        })),
        appPermissions: { entitlements: [], privacy: {} },
      },
    ],
    news: [],
  };
  return new Response(JSON.stringify(source, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
