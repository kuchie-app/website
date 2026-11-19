# kuchie.app

The website for [Kuchie](https://github.com/kuchie-app/Kuchie), a free, open-source iPhone reader for manga and webtoons.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). The home page scenes use [Motion](https://motion.dev) for React; everything else is static HTML with CSS animations.

## Develop

Requires Node 22.23 or later (see `.nvmrc`).

```sh
npm install
npm run dev            # http://localhost:4321
npm run build          # fetches releases from GitHub, then builds to dist/
npm run build:offline  # builds with the committed src/data/releases.json
npm run preview
```

Checks (CI runs the same):

```sh
npx astro check        # types
npm run check:budget   # page weight per page, see scripts/check-budget.mjs
npm run check:i18n     # translation coverage report
```

## Layout

| Path | What lives there |
| --- | --- |
| `src/components/scenes/` | Home page scenes (React + Motion): 3D book, exploded phone, reader, stamp desk |
| `src/components/art/` | SVG art: the Bookmark Scarf ribbon, the "Lost Bookmark" story scenes, series covers |
| `src/components/home/` | Static home sections: manga page, cover shelf, open source, FAQ, back cover |
| `src/components/pages/` | Features, Download, Changelog, FAQ and the coming-soon placeholder |
| `src/components/layout/` | Header, footer, pixel Kiri, language and theme switchers, scroll ribbon |
| `src/content/docs/` | Guides in Markdown (`guides/` is English, `id/guides/` Indonesian) |
| `src/i18n/` | Locales, UI strings (`ui/*.json`), page copy (`home.ts`, `pages.ts`), docs sidebar |
| `src/data/releases.json` | Releases cached by `scripts/fetch-release.mjs` |
| `src/pages/altstore.json.ts` | The AltStore / SideStore source, generated from releases |
| `scripts/make-og.mjs` | Renders the link-preview images in `public/og/` |
| `wrangler.jsonc` | Cloudflare deploy settings |

## Languages

The site has 23 languages, matching the app. English and Indonesian are written by hand; the others have translated navigation and fall back to English for page text. Untranslated languages point their canonical URL at English and stay out of the sitemap until they're added to `indexedLocales` in `src/i18n/locales.ts`.

To translate a language: add its copy to `src/i18n/home.ts` and `src/i18n/pages.ts`, add guides under `src/content/docs/<lang>/guides/`, then add the language to `indexedLocales`.

## Releases update the site by themselves

Every build reads the app's GitHub releases (`vX.Y.Z` tags only). The download page, the changelog and `/altstore.json` are generated from them. The deploy workflow rebuilds:

- on every push to `main`,
- every 6 hours,
- when the app repository sends a `kuchie-release` dispatch (see below),
- by hand from the Actions tab.

## Deploy (Cloudflare)

The site is served by Cloudflare Workers static assets (the successor to Cloudflare Pages), configured in `wrangler.jsonc`. It's live at **https://kuchie.kuchie-website.workers.dev** until the domain is connected.

Deploy by hand from a machine logged in with `npx wrangler login`:

```sh
SITE_URL=https://kuchie.kuchie-website.workers.dev npm run build
npx wrangler deploy
```

### Automatic deploys from GitHub Actions

The repository already has the `SITE_URL` variable and the `CLOUDFLARE_ACCOUNT_ID` secret. One more secret is needed:

1. Cloudflare → My Profile → API Tokens → **Create Token** → *Edit Cloudflare Workers* template (or a custom token with *Account → Workers Scripts → Edit*), limited to your account.
2. Repository → Settings → Secrets and variables → Actions → **New repository secret**: `CLOUDFLARE_API_TOKEN`.
3. Run the **Deploy** workflow from the Actions tab.

Until that secret exists, the workflow still builds and checks the site but skips the deploy step.

### Connecting kuchie.app later

1. Register `kuchie.app` (Cloudflare Registrar sells it at cost) or add it to Cloudflare.
2. Add `"routes": [{ "pattern": "kuchie.app", "custom_domain": true }]` to `wrangler.jsonc`, or add the domain under the Worker's *Domains & Routes* in the dashboard.
3. Change the `SITE_URL` variable to `https://kuchie.app` and run **Deploy**. Indexing and the sitemap switch on automatically for kuchie.app.

### Rebuild when the app ships a release

Add this step at the end of the app repository's `release.yml`, with a fine-grained token (`WEBSITE_DISPATCH_TOKEN`) that has *Actions: read and write* on `kuchie-app/website`:

```yaml
- name: Update kuchie.app
  run: |
    curl -fsS -X POST \
      -H "Authorization: Bearer ${{ secrets.WEBSITE_DISPATCH_TOKEN }}" \
      -H "Accept: application/vnd.github+json" \
      https://api.github.com/repos/kuchie-app/website/dispatches \
      -d '{"event_type":"kuchie-release"}'
```

Without it, the 6-hourly build picks up new releases anyway.

## Content rules

- Kuchie doesn't host or provide content. Screenshots and art never show real manga or name specific sources outside the technical guides.
- The logo is the Bookmark Scarf icon. Kiri appears only in the lavender-hood poses in `src/assets/kiri/`.

## License

[MPL-2.0](LICENSE), like the app. Kiri and the Kuchie icons come from the Kuchie design work in the app repository.
