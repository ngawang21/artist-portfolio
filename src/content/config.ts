import { defineCollection, z } from 'astro:content';

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
    title_fr: z.string().optional(),
    year: z.number().int(),
    medium_en: z.string(),
    medium_fr: z.string().optional(),
    dimensions: z.string().optional(),
    description_en: z.string().optional(),
    description_fr: z.string().optional(),
    /** Cover image shown in the grid. */
    image: z.string(),
    /** Optional extra views (detail, angle, in-situ) shown after the cover. */
    images: z.array(z.string()).default([]),
    /** Cover pixel size — lets the grid reserve the exact frame (no layout shift). */
    width: z.number().optional(),
    height: z.number().optional(),
    alt_en: z.string().optional(),
    alt_fr: z.string().optional(),
    sold: z.boolean().default(false),
    /** Lower numbers come first within a year; ties fall back to title. */
    order: z.number().optional(),
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
    statement_en: z.array(z.string()),
    statement_fr: z.array(z.string()),
    bio_en: z.array(z.string()),
    bio_fr: z.array(z.string()),
    exhibitions: z
      .array(
        z.object({
          year: z.string(),
          title: z.string(),
          detail_en: z.string().optional(),
          detail_fr: z.string().optional(),
          link: z.string().optional(),
        }),
      )
      .default([]),
    email: z.string(),
    phone: z.string().optional(),
    instagram: z.string(),
    instagram_handle: z.string(),
    location_en: z.string(),
    location_fr: z.string(),
    portrait: z.string(),
    hero_image: z.string(),
    og_image: z.string().optional(),
  }),
});

export const collections = { artworks, profile };
