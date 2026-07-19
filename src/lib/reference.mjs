/**
 * KDT-XXXXXX trace code — the single source of truth for the reference format.
 * Shared by the contact form's on-page script and the submission-created
 * Netlify function (which falls back to it when a submission arrives without
 * a reference, e.g. JavaScript disabled). 32-letter alphabet with no ambiguous
 * 0/O/1/I; 256 % 32 === 0, so the modulo introduces no bias.
 */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function makeRef() {
  let s = '';
  try {
    const arr = new Uint8Array(6);
    crypto.getRandomValues(arr);
    for (const x of arr) s += ALPHABET[x % ALPHABET.length];
  } catch {
    for (let i = 0; i < 6; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `KDT-${s}`;
}
