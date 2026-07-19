/**
 * One-time local import of the artist's real source photos into optimized,
 * web-ready WebP under public/images/uploads/. Source lives in the gitignored
 * `data/` folder (only the artist has the originals), so this never runs on CI —
 * it is a developer convenience to regenerate the shipped images.
 *
 * Run with: node scripts/import-works.mjs
 *
 * Convention (per the artist, feedback 12/07/2026): each work's folder in
 * data/works/ holds a `base` image — the definitive photo, used as the cover —
 * plus numbered variants (1, 2, …) shown as extra views, in numeric order.
 * NOTHING is cropped or trimmed; the original aspect ratio is always kept.
 * Images are only downscaled (never enlarged, never reshaped) so the site
 * stays fast — the painting's proportions are untouched.
 * The home hero comes from data/works/homepage.jpg.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'data');
const OUT = join(ROOT, 'public/images/uploads');

// slug -> { folder, cover, extras[] } — filenames inside data/works/<folder>/.
// `cover` is the base image (grid + first lightbox view); `extras` are the
// numbered variants, kept whole, in numeric order.
const WORKS = [
  { slug: 'lapin-bleu', folder: 'Lapin bleu, 2026', cover: 'base.JPG', extras: ['1.JPG', '2.JPG'] },
  { slug: 'guirlandes', folder: 'Guirlandes, 2025', cover: 'base.jpg', extras: [] },
  { slug: 'in-between-red-room', folder: 'In between 1, Red room, 2025', cover: 'base.jpg', extras: [] },
  { slug: 'in-between-les-pigeons', folder: 'In between 3, Les pigeons, 2025', cover: 'base.jpg', extras: [] },
  { slug: 'through-the-veil', folder: 'Through the veil, 2025', cover: 'base.jpg', extras: ['1.JPG', '2.jpg'] },
  { slug: 'un-morceau-de-reve', folder: 'Un morceau de rêve, 2025', cover: 'base.jpg', extras: [] },
  { slug: 'a-glimpse-outside', folder: 'A glimpse outside, 2024', cover: 'base.jpg', extras: ['1.JPG'] },
  { slug: 'ce-qui-reste', folder: 'Ce qui reste, 2024', cover: 'base.jpg', extras: ['1.jpg'] },
  { slug: 'entre-deux-mondes', folder: 'Entre deux mondes, 2024', cover: 'base.jpg', extras: ['1.jpg'] },
  { slug: 'images-fluctuantes', folder: 'Images fluctuantes, 2024', cover: 'base.jpg', extras: ['1.jpg'] },
  { slug: 'jaune-en-memoire', folder: 'Jaune en mémoire, 2024', cover: 'Jaune en mémoire.jpg', extras: [] },
  { slug: 'joyeux-25', folder: 'Joyeux 25, 2024', cover: 'base.jpg', extras: [] },
  { slug: 'papier-peint', folder: 'Papier peint, 2024', cover: 'base.jpg', extras: ['1.jpg'] },
  { slug: 'drown-it-out-drown-me-out', folder: 'Drown it out, drown me out, 2023', cover: 'base.jpg', extras: ['1.jpg', '2.jpg'] },
  { slug: 'paysage-de-lente-erosion', folder: 'Paysage de lente érosion, 2023', cover: 'base.jpg', extras: ['1.JPG'] },
  { slug: 'un-personne-cent-mille', folder: 'Un, personne et cent mille, 2023', cover: 'base.jpg', extras: ['1.jpg', '2.jpg', '3.jpg'] },
  { slug: 'poignee-de-porte', folder: 'Poignée de porte, 2022', cover: 'base.jpg', extras: ['1.jpg'] },
];

// No trim, no crop — only EXIF orientation is baked in.
const load = (src) => sharp(src, { failOn: 'none' }).rotate();

async function emit(pipeline, outFile, { max, quality = 82 } = {}) {
  let p = pipeline;
  if (max) p = p.resize(max, max, { fit: 'inside', withoutEnlargement: true });
  const info = await p.webp({ quality, effort: 6 }).toFile(outFile);
  return info;
}

async function dims(file) {
  const m = await sharp(file).metadata();
  return { width: m.width, height: m.height };
}

// Accented names are stored NFC or NFD depending on how the files arrived —
// resolve each path segment by Unicode-normalized comparison, never verbatim.
const nfc = (s) => s.normalize('NFC');
function resolveEntry(parent, name) {
  const hit = readdirSync(parent).find((e) => nfc(e) === nfc(name));
  if (!hit) throw new Error(`Not found: "${name}" in ${parent}`);
  return join(parent, hit);
}
const workFile = (folder, file) => resolveEntry(resolveEntry(join(SRC, 'works'), folder), file);

async function run() {
  const report = {};
  for (const w of WORKS) {
    const dir = join(OUT, 'works', w.slug);
    if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });

    const coverOut = join(dir, 'cover.webp');
    await emit(load(workFile(w.folder, w.cover)), coverOut, { max: 2000, quality: 84 });
    const cd = await dims(coverOut);

    let n = 2;
    for (const ex of w.extras) {
      const out = join(dir, String(n).padStart(2, '0') + '.webp');
      await emit(load(workFile(w.folder, ex)), out, { max: 2000, quality: 80 });
      n++;
    }
    report[w.slug] = { ...cd, extras: w.extras.length };
    console.log(`${w.slug}\tcover ${cd.width}x${cd.height} (r=${(cd.width / cd.height).toFixed(3)})\t+${w.extras.length} extra`);
  }

  // Portrait — chosen: DSCF1237 (most elegant composition).
  const portraitSrc = join(SRC, 'portrait', 'DSCF1237.JPG');
  if (existsSync(portraitSrc)) {
    await emit(load(portraitSrc), join(OUT, 'portrait.webp'), { max: 1500, quality: 84 });
    const pd = await dims(join(OUT, 'portrait.webp'));
    console.log(`portrait\t${pd.width}x${pd.height}`);
  }

  // Homepage (full-bleed hero) — the artist's dedicated homepage photo.
  await emit(load(join(SRC, 'works', 'homepage.jpg')), join(OUT, 'homepage.webp'), { max: 2600, quality: 82 });
  // Social-share card (1200×630) cropped from the homepage painting.
  await sharp(join(OUT, 'homepage.webp')).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 84 }).toFile(join(OUT, 'og.jpg'));
  console.log('homepage.webp + og.jpg');

  console.log('\nREPORT ' + JSON.stringify(report));
}

run();
