import { defineCollection, z } from 'astro:content';

/**
 * The CMS (Sveltia / Decap) writes `null` for any field the artist leaves blank —
 * and a bare `z.number().optional()` accepts `undefined` but REJECTS `null`, which
 * fails the *entire* build (see the `order: null` deploy failure). To make the
 * content contract impossible to break from the CMS, we treat `null` / `""` as
 * "absent" for optional scalars, and `null` as "use the default" for lists and
 * booleans. Be liberal in what we accept; a half-filled piece must still deploy.
 */
const blankToUndef = (v: unknown) => (v === null || v === '' ? undefined : v);
const nullToUndef = (v: unknown) => (v === null ? undefined : v);

const optString = () => z.preprocess(blankToUndef, z.string().optional());
const optInt = () => z.preprocess(blankToUndef, z.number().int().optional());
const optNumber = () => z.preprocess(blankToUndef, z.number().optional());
// Lists: a blank list slot (e.g. a removed image in the multi-image widget) can
// serialize as a `null`/`""` *element* — `z.array(z.string())` would reject it and
// fail the build. Drop empty elements, and a null/absent whole value → [].
const optList = () =>
  z.preprocess(
    (v) => (Array.isArray(v) ? v.filter((x) => x != null && x !== '') : v == null ? undefined : v),
    z.array(z.string()).default([]),
  );

/**
 * One file per painting in `src/content/artworks/`. The CMS writes these.
 * English fields are required; French falls back to English at render time
 * when a translation is left blank, so the artist can add a piece in one
 * language and translate later.
 */
const artworks = defineCollection({
  type: 'data',
  schema: z.object({
    title_en: z.string(),
    title_fr: optString(),
    year: z.number().int(),
    /** Optional — the artist may add a work before its medium/dimensions are
     *  decided or measured, and fill them in later through /admin. */
    medium_en: optString(),
    medium_fr: optString(),
    dimensions: optString(),
    description_en: optString(),
    description_fr: optString(),
    /** Cover image shown in the grid. */
    image: z.string(),
    /** Optional extra views (detail, angle, in-situ) shown after the cover. */
    images: optList(),
    /** Cover pixel size — lets the grid reserve the exact frame (no layout shift). */
    width: optNumber(),
    height: optNumber(),
    alt_en: optString(),
    alt_fr: optString(),
    sold: z.preprocess(nullToUndef, z.boolean().default(false)),
    /** Lower numbers come first within a year; ties fall back to title. */
    order: optInt(),
  }),
});

/**
 * Single editable record (`src/content/profile/profile.json`) powering the
 * home, about and contact pages. Bilingual text is stored as arrays of
 * paragraphs so the CMS shows one clean field per paragraph.
 */
const profile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role_en: z.string(),
    role_fr: z.string(),
    tagline_en: z.string(),
    tagline_fr: z.string(),
    birthline_en: z.string(),
    birthline_fr: z.string(),
    statement_en: optList(),
    statement_fr: optList(),
    bio_en: optList(),
    bio_fr: optList(),
    exhibitions: z
      .preprocess(
        nullToUndef,
        z
          .array(
            z.object({
              year: z.string(),
              title: z.string(),
              detail_en: optString(),
              detail_fr: optString(),
              link: optString(),
            }),
          )
          .default([]),
      ),
    email: z.string(),
    phone: optString(),
    instagram: z.string(),
    instagram_handle: z.string(),
    location_en: z.string(),
    location_fr: z.string(),
    portrait: z.string(),
    hero_image: z.string(),
    og_image: optString(),
  }),
});

export const collections = { artworks, profile };
