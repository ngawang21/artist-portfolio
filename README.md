# Kunga Dempa Tsang — Portfolio

The portfolio website of the contemporary painter **Kunga Dempa Tsang** (Paris).
A quiet, bilingual (EN/FR) showcase of her work — no prices, no shop; visitors get in touch directly.

- **Live:** https://kungadempatsang.com
- **Stack:** Astro (static) · Tailwind · Raleway (self-hosted) · Sveltia CMS (GitHub) · Netlify · PWA
- **Edit content:** the artist uses `/admin` — see [docs/usage.md](./docs/usage.md). Changes are batched and
  published in one click (no per-save deploys).

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # → dist/
pnpm preview
```

Node 20+ and pnpm required.

## Project structure

| Path | What |
| --- | --- |
| `src/pages/` | Routes (EN at `/`, FR under `/fr/`) — thin wrappers around section components |
| `src/components/sections/` | The page bodies: Home, Works, About, Contact |
| `src/components/` | Reusable UI: Nav, Footer, ArtworkCard, WorksByYear, Lightbox, … |
| `src/content/artworks/` | One JSON per painting (CMS-managed) |
| `src/content/profile/profile.json` | Bio, statement, exhibitions, contact (CMS-managed) |
| `src/styles/global.css` | Design tokens + base styles |
| `public/admin/` | The content manager (Sveltia CMS) |

## Documentation

- [docs/usage.md](./docs/usage.md) — how the artist adds/edits work and publishes (no code).
- [docs/deployment.md](./docs/deployment.md) — Netlify, the `kungadempatsang.com` domain, HTTPS, batched
  deploys, CMS login, SEO/Search Console.
- [CLAUDE.md](./CLAUDE.md) — architecture and conventions for developers.
- [docs/stitch-guide.md](./docs/stitch-guide.md) — optional visual-exploration workflow, aligned to the design system.
