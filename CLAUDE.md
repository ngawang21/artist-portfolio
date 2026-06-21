# CLAUDE.md

Guidance for working in this repository.

## What this is

The portfolio website of the painter **Kunga Dempa Tsang** (b. 1999, Tibet; lives and works in Paris).
It is a **showcase only** — no prices, no shop, no checkout. Interested buyers and galleries contact her
through the form. Bilingual **English / French**. Hosted on **Netlify**, content edited by the artist
through a Git-based CMS (no developer needed for day-to-day updates).

## Commands

```bash
pnpm install      # install dependencies
pnpm dev          # local dev server (http://localhost:4321)
pnpm build        # production build → dist/
pnpm preview      # serve the production build locally
pnpm icons        # regenerate PWA / favicon / OG icons from the brand mark
```

`node scripts/import-works.mjs` (local-only) re-optimizes the artist's source photos from the gitignored
`data/` folder into `public/images/uploads/` (trims covers to the painting edge, writes WebP + the OG card).

Requires Node 20+ and pnpm. The build must stay green; run `pnpm build` before committing UI changes.

## Stack

- **Astro 5** (static output) + **Tailwind 3** (utility classes + design tokens).
- **i18n**: Astro's native routing — English at `/`, French under `/fr/`. No third-party i18n lib.
- **Content collections** (`src/content/`): `artworks` (one JSON per piece) and `profile`
  (a single `profile.json` powering Home/About/Contact). Schemas + validation in `src/content/config.ts`.
- **CMS**: Sveltia CMS (`public/admin/`), GitHub backend. Same `config.yml` works with Decap as a fallback.
- **PWA**: `@vite-pwa/astro` generates the service worker + `manifest.webmanifest`.
- Fonts are **self-hosted** via `@fontsource-variable/*` (no Google Fonts CDN — faster and GDPR-safe).

## Layout of the code

```
src/
  consts.ts                 # SITE.url (must equal the live domain), locales
  i18n/utils.ts             # UI string dictionary (EN/FR) + getLangFromUrl/useTranslations/localizePath
  i18n/langToggle.ts        # alternate-language URL for the current page
  lib/artworks.ts           # getArtworks / getArtworksByYear / getProfile — localize + sort
  layouts/BaseLayout.astro  # <head> (SEO, hreflang, JSON-LD, PWA links), Nav, Footer, BackToTop, reveal observer
  components/               # Nav, Footer, Seo, ArtworkCard, WorksByYear, Lightbox, BackToTop, LanguageToggle, InstagramIcon
  components/sections/      # Home, Works, About, Contact — the page bodies (shared by EN + FR routes)
  pages/                    # thin route files: each wraps a section in BaseLayout
  styles/global.css         # design tokens (:root), base, components, motion
  content/                  # artworks/*.json, profile/profile.json (the CMS edits these)
scripts/generate-icons.mjs  # sharp-based icon generator
```

Route files are intentionally tiny — `pages/works.astro` and `pages/fr/works.astro` both render
`components/sections/Works.astro`, which derives its language from the URL. Add page logic in the
section component, not in the route file.

## Design system (apply when touching UI)

"Blue-hour / liminal." Tokens live in `src/styles/global.css`:
- ground `#E7E8E6` (cool fog), ink `#1B2027`, accent `#3D4C5E` (dusk slate), plus muted/faint/line.
- Type: **Raleway** — one variable typeface (the artist's choice), upright + italic, self-hosted
  via `@fontsource-variable/raleway` (no Google Fonts CDN). Hierarchy comes from weight (light ~300
  for display, 400 body, 500 tracked-uppercase labels), size and **italic — which always carries the
  artwork titles** (the artist's rule). Centralised as the `--font` token in `global.css`.
- Motion: custom easing curves (`--ease-out`, `--ease-in-out`), GPU-only (transform/opacity),
  `prefers-reduced-motion` honored, hover effects gated behind `(hover: hover)`.

Three design skills inform this project and should be loaded before significant UI work:
`artifact-design` (overall taste/process), `emil-design-eng` (interaction polish), and
`review-animations` (motion review bar). Keep the palette quiet so the paintings carry the colour.

## Conventions

- **Bilingual fields fall back to English** when a French value is blank (see `pick()` in `lib/artworks.ts`).
  Always read localized content through `getArtworks`/`getProfile`, never `getCollection` directly in a page.
- **Links** are built with `localizePath('/works', lang)` so the locale prefix is correct.
- **No prices, no commerce.** Don't reintroduce price/checkout fields.
- New UI strings go in **both** `en` and `fr` in `src/i18n/utils.ts`.
- **Artwork titles render in italic** (the artist's rule) — handled in CSS (`.art-title`, `.lb-title`),
  not in the data. Each artwork's `image` is the cover; `images[]` are extra views shown after it.
- **Home is a single full-bleed painting with the nav laid over it and no scroll** — `BaseLayout`
  drops the footer/back-to-top and adds `body.is-home`; `Nav` takes a `transparent` prop for the overlay.
- Works are grouped by year (`WorksByYear`), shown in a centred consistent-row-height flex grid (uniform
  gaps), with `YearNav` (sticky scroll-spy jump links) and a multi-image carousel `Lightbox`.

## Gotchas

- `SITE.url` in `src/consts.ts` feeds canonical URLs, the sitemap, OG tags, and JSON-LD. It must match the
  live domain (`https://kungadempatsang.com`). `public/robots.txt` references the sitemap URL — keep them in sync.
- `netlify.toml` deliberately has **no SPA catch-all redirect** — Astro emits one HTML file per route.
- **Images are the artist's real work** (no more placeholders), optimized into `public/images/uploads/`
  by `scripts/import-works.mjs` (a local-only utility — its `data/` sources are gitignored and absent on CI).
  Covers are trimmed to the painting edge; their pixel `width`/`height` are stored per artwork for a
  zero-layout-shift grid. The home hero is *Entre deux mondes*; the portrait is `portrait.webp`.
- **Deploys are batched, not per-save.** Sveltia commits carry `[skip ci]` (`skip_ci: true` in
  `public/admin/config.yml`), so CMS edits accumulate without redeploying; the artist publishes them all
  at once via a Netlify **build hook** (see `docs/deployment.md`). Developer pushes (no `[skip ci]`) deploy
  normally. NOTE: the *live* site was last deployed from a stale, non-repo origin — confirm Netlify is
  building from the `ngawang21/artist-portfolio` GitHub repo / `main`.
- The contact form uses **Netlify Forms**; submissions only work on the deployed site, not in `pnpm dev`.
