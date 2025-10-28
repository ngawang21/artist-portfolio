import { defineCollection, z } from 'astro:content';

const artworksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title_en: z.string(),
    title_fr: z.string(),
    description_en: z.string(),
    description_fr: z.string(),
    image: z.string(),
    dimensions: z.string(),
    price: z.number(),
    year: z.number(),
    medium: z.string(),
    sold: z.boolean().default(false),
    featured: z.boolean().default(false),
    mollie_link: z.string().optional(),
  }),
});

export const collections = {
  artworks: artworksCollection,
};

