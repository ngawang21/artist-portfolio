/**
 * One-time local import of the artist's real source photos into optimized,
 * web-ready WebP under public/images/uploads/. Source lives in the gitignored
 * `data/` folder (only the artist has the originals), so this never runs on CI —
 * it is a developer convenience to regenerate the shipped images.
 *
 * Run with: node scripts/import-works.mjs
 *
 * Covers are trimmed to the painting edge (removing the wall around the
 * documentation shot); detail / in-situ shots are kept whole.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, rmSync, existsSync } from 'node:fs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'data');
const OUT = join(ROOT, 'public/images/uploads');

// slug -> { folder, cover, extras[], trim?, crop? }
// `cover`/`extras` are filenames inside data/works/<folder>/.
// `crop` (normalized {l,t,w,h} on the EXIF-rotated image) overrides auto-trim
// for that file when trim is unreliable.
// `trim` defaults to 34; dark paintings on a light wall with soft shadows
// (Poignée, Lapin bleu) need a higher threshold to shed the wall cleanly.
const WORKS = [
  { slug: 'lapin-bleu', folder: 'Lapin bleu, 2026', cover: 'base.JPG', trim: 62, extras: ['1.JPG', '2.JPG'] },
  { slug: 'in-between-red-room', folder: 'In between 1, Red room, 2025', cover: 'base.jpg', trim: 34, extras: [] },
  { slug: 'through-the-veil', folder: 'Through the veil, 2025', cover: 'base.jpg', trim: 34, extras: ['1.jpg', '2.JPG'] },
  { slug: 'entre-deux-mondes', folder: 'Entre deux mondes, 2024', cover: 'base.jpg', trim: 34, extras: ['1.jpg'] },
  { slug: 'images-fluctuantes', folder: 'Images fluctuantes, 2024', cover: 'base.jpg', trim: 34, extras: ['1.jpg'] },
  { slug: 'un-personne-cent-mille', folder: 'Un, personne et cent mille, 2023', cover: 'base.jpg', trim: 34, extras: ['2.jpg', '1.jpg', '3.jpg'] },
  { slug: 'poignee-de-porte', folder: 'Poignée de porte, 2022', cover: 'base.jpg', trim: 82, extras: ['1.jpg'] },
];

async function load(src, { trim = 0 } = {}) {
  let img = sharp(src, { failOn: 'none' }).rotate(); // bake EXIF orientation
  if (trim) img = img.trim({ threshold: trim });
  return img;
}

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

// Some source folders use NFD (decomposed) accents on disk (e.g. "Poignée").
const workFile = (folder, file) => join(SRC, 'works', folder, file).normalize('NFD');

async function run() {
  const report = {};
  for (const w of WORKS) {
    const dir = join(OUT, 'works', w.slug);
    if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });

    const coverSrc = workFile(w.folder, w.cover);
    const coverOut = join(dir, 'cover.webp');
    await emit(await load(coverSrc, { trim: w.trim ?? 34 }), coverOut, { max: 2000, quality: 84 });
    const cd = await dims(coverOut);

    const extraDims = [];
    let n = 2;
    for (const ex of w.extras) {
      const out = join(dir, String(n).padStart(2, '0') + '.webp');
      await emit(await load(workFile(w.folder, ex), { trim: false }), out, { max: 2000, quality: 80 });
      extraDims.push({ file: out, ...(await dims(out)) });
      n++;
    }
    report[w.slug] = { cover: cd, extras: extraDims.length };
    console.log(`${w.slug}\tcover ${cd.width}x${cd.height} (r=${(cd.width / cd.height).toFixed(3)})\t+${w.extras.length} extra`);
  }

  // Portrait — chosen: DSCF1237 (most elegant composition).
  await emit(await load(join(SRC, 'portrait', 'DSCF1237.JPG')), join(OUT, 'portrait.webp'), { max: 1500, quality: 84 });
  const pd = await dims(join(OUT, 'portrait.webp'));
  console.log(`portrait\t${pd.width}x${pd.height}`);

  // Hero (full-bleed homepage) — "Entre deux mondes": the blue liminal room
  // that names her whole practice, and tonally on the blue-hour palette.
  await emit(await load(join(SRC, 'works', 'Entre deux mondes, 2024', 'base.jpg'), { trim: 34 }), join(OUT, 'hero.webp'), { max: 2600, quality: 82 });
  // Social-share card (1200×630) cropped from the hero painting.
  await sharp(join(OUT, 'hero.webp')).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 84 }).toFile(join(OUT, 'og.jpg'));
  console.log('hero.webp + og.jpg');

  console.log('\nDone.');
}

run();
