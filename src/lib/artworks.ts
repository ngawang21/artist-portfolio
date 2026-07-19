import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from '../consts';

export interface LocalizedArtwork {
  slug: string;
  title: string;
  medium: string;
  dimensions?: string;
  description?: string;
  /** Cover image (grid thumbnail). */
  image: string;
  /** Cover + any extra views, in display order. */
  images: string[];
  /** Cover aspect ratio (width / height). Drives frame size with no layout shift. */
  ratio: number;
  /** True when `ratio` is the exact pixel ratio (stored width/height). When false
   *  (e.g. a CMS upload), the client refines it from the loaded image so the cover
   *  is never cropped. */
  ratioFixed: boolean;
  alt: string;
  year: number;
  sold: boolean;
  order: number;
}

function pick(primary: string | undefined, fallback: string): string {
  return primary && primary.trim().length > 0 ? primary : fallback;
}

/**
 * Cover aspect ratio (width / height). Prefer the stored pixel size (exact, no
 * layout shift); otherwise derive from the dimensions caption, which is written
 * height × width (standard art convention). Falls back to a gentle portrait.
 */
function ratioOf(d: CollectionEntry<'artworks'>['data']): number {
  if (d.width && d.height) return d.width / d.height;
  const m = d.dimensions?.match(/([\d.,]+)\s*[×x]\s*([\d.,]+)/i);
  if (m) {
    const h = parseFloat(m[1].replace(',', '.'));
    const w = parseFloat(m[2].replace(',', '.'));
    if (h > 0 && w > 0) return w / h;
  }
  return 0.8;
}

function localize(entry: CollectionEntry<'artworks'>, lang: Locale): LocalizedArtwork {
  const d = entry.data;
  const title = lang === 'fr' ? pick(d.title_fr, d.title_en) : d.title_en;
  const description =
    lang === 'fr' ? pick(d.description_fr, d.description_en ?? '') : (d.description_en ?? '');
  return {
    slug: entry.id,
    title,
    medium: lang === 'fr' ? pick(d.medium_fr, d.medium_en ?? '') : (d.medium_en ?? ''),
    dimensions: d.dimensions,
    description: description || undefined,
    image: d.image,
    images: [d.image, ...(d.images ?? [])],
    ratio: ratioOf(d),
    ratioFixed: !!(d.width && d.height),
    alt: pick(lang === 'fr' ? d.alt_fr : d.alt_en, title),
    year: d.year,
    sold: d.sold,
    order: d.order ?? 999,
  };
}

/** All artworks for a locale, newest first, ordered within each year. */
export async function getArtworks(lang: Locale): Promise<LocalizedArtwork[]> {
  const entries = await getCollection('artworks');
  return entries
    .map((e) => localize(e, lang))
    .sort((a, b) => b.year - a.year || a.order - b.order || a.title.localeCompare(b.title));
}

/** Artworks grouped into `{ year, items }`, newest year first. */
export async function getArtworksByYear(lang: Locale) {
  const all = await getArtworks(lang);
  const byYear = new Map<number, LocalizedArtwork[]>();
  for (const art of all) {
    const bucket = byYear.get(art.year) ?? [];
    bucket.push(art);
    byYear.set(art.year, bucket);
  }
  return [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}

export async function getProfile(lang: Locale) {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('Missing src/content/profile/profile.json');
  const d = entry.data;
  // Same fallback rule as the artworks: a blank French value shows the English
  // text (paragraph lists count as blank when empty — optList coerces null → []).
  const pickList = (fr: string[], en: string[]) => (lang === 'fr' && fr.length > 0 ? fr : en);
  return {
    name: d.name,
    role: lang === 'fr' ? pick(d.role_fr, d.role_en) : d.role_en,
    tagline: lang === 'fr' ? pick(d.tagline_fr, d.tagline_en) : d.tagline_en,
    birthline: lang === 'fr' ? pick(d.birthline_fr, d.birthline_en) : d.birthline_en,
    statement: pickList(d.statement_fr, d.statement_en),
    bio: pickList(d.bio_fr, d.bio_en),
    exhibitions: d.exhibitions.map((x) => ({
      year: x.year,
      title: x.title,
      detail: lang === 'fr' ? (x.detail_fr ?? x.detail_en) : x.detail_en,
      link: x.link,
    })),
    email: d.email,
    phone: d.phone,
    instagram: d.instagram,
    instagramHandle: d.instagram_handle,
    location: lang === 'fr' ? pick(d.location_fr, d.location_en) : d.location_en,
    portrait: d.portrait,
    heroImage: d.hero_image,
    ogImage: d.og_image,
  };
}
