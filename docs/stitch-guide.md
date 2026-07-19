# Google Stitch — optional visual exploration

The site already has a complete, hand-built visual identity (below). You **don't need** Stitch. It's here
only if you later want to explore a fresh direction for one screen and see options quickly.

> Use Stitch (https://stitch.withgoogle.com) to **decide how something should look**, never to generate the
> production code — its HTML doesn't match this Astro + bilingual + CMS setup. Treat its output as a picture,
> then a developer rebuilds the winning idea in the real components.

## The design system to stay consistent with

"Blue-hour / liminal." Quiet and gallery-like — the paintings carry all the colour.

- **Palette:** cool fog ground `#E7E8E6`, surface `#EEEFEC`, ink-blue-black text `#1B2027`, slate `--muted`
  `#5B6168`, faint `#7C817A`, hairline `#D3D5D0`, one muted dusk-slate accent `#3D4C5E`. No warm cream, no
  bright accent, no gradients on UI, no drop shadows, near-zero corners.
- **Type:** **Raleway** only (variable, self-hosted), upright + italic. Hierarchy from weight (light ~300 for
  display, 400 body, 500 for small uppercase wide-tracked labels) and **italic, which carries every artwork
  title**. No second typeface.
- **Home:** one full-bleed painting filling the viewport, the transparent nav laid on top (white), **no
  scroll, no text over the image** — the work is the whole first impression (à la fuliang.co).
- **Works:** grouped by year, newest first; each year a **large faint Raleway numeral**; a sticky year
  jump-nav; a centred grid where every work in a row shares one height and gaps are uniform; caption =
  *title* (italic) · year · medium · dimensions. Multiple images per work swipe horizontally in the lightbox.
- **About / Contact:** centred portrait with the birth-line caption; statement + bio + exhibitions EN/FR;
  a light underline-style contact form (Name*, Email*, Message*) plus email and Instagram.
- **Motion:** minimal, fast (<300ms), custom ease-out; `prefers-reduced-motion` honoured.

## Workflow

1. Sign in to Stitch (Web mode). Paste the **style brief** below, then one **screen prompt**.
2. Attach a screenshot of the current page you're reworking so Stitch matches the established look.
3. Generate → pick the closest variation → iterate.
4. Send the screenshot you like (not the code) plus one line on what you liked. The developer rebuilds it
   in the Astro components.

### Style brief (paste first)

```
A minimalist fine-art portfolio for a contemporary painter, Kunga DEMPA TSANG. Quiet, gallery-like,
generous negative space — the artwork is the hero. Cool fog off-white background (#E7E8E6), ink-blue-black
text (#1B2027), one muted dusk-slate accent (#3D4C5E). No warm cream, no bright accents, no gradients on UI,
no drop shadows, near-zero corners. One typeface: Raleway (variable), upright for everything and italic for
artwork titles; small labels are uppercase, wide letter-spacing. No prices, no buy buttons — a showcase only.
Bilingual EN/FR. Mobile-first and fully responsive.
```

### Screen prompts

- **Home:** a single atmospheric painting filling the whole screen edge to edge, no scroll, with only a thin
  transparent top nav (artist name left in Raleway; Works / About / Contact + a language toggle right) in
  white over the image. No headline, no tagline — the painting is the cover.
- **Works:** paintings grouped by year (newest first); each year introduced by a large faint Raleway numeral
  and a thin rule; a sticky row of year links to jump between years; a calm grid where each row of works
  shares the same height and the spacing between them is perfectly even; caption under each = italic title,
  year, medium, dimensions; clicking opens a large lightbox you can swipe through (a work can have several
  views). No prices.
- **About:** centred portrait with the caption "1999 — Born in Tibet. Lives and works in Paris, France";
  statement and biography in EN/FR; a short exhibitions list.
- **Contact:** a light, minimal form — Name*, Email*, Message*, one Send button — plus email and Instagram.

### Honest limits

Free-tier generation cap; exports generic HTML (not Astro/i18n/CMS); won't wire the form, the two languages,
the year nav, or the multi-image lightbox. It's a sketchpad, not a foundation.
