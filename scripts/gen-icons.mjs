/**
 * Gera os ícones PNG a partir de public/favicon.svg.
 * Rode com:  npm run icons
 *
 * Saídas em public/:
 *   favicon-32.png, favicon-192.png, favicon-512.png,
 *   apple-touch-icon.png, favicon-maskable.png
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const svg = await readFile(publicDir + 'favicon.svg');
const BG = '#0b0d12';

const simple = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'favicon-192.png', size: 192 },
  { file: 'favicon-512.png', size: 512 },
  // Ícone da tela de início no iOS: fundo sólido, sem cantos transparentes.
  { file: 'apple-touch-icon.png', size: 180, background: BG },
];

for (const { file, size, background } of simple) {
  let img = sharp(svg, { density: 384 }).resize(size, size);
  if (background) img = img.flatten({ background });
  await img.png().toFile(publicDir + file);
  console.log(`✓ ${file} (${size}×${size})`);
}

// Maskable (Android): fundo sólido + safe zone — conteúdo ocupa 80% central.
const canvas = 512;
const inner = Math.round(canvas * 0.8);
const innerPng = await sharp(svg, { density: 384 })
  .resize(inner, inner)
  .png()
  .toBuffer();

await sharp({
  create: { width: canvas, height: canvas, channels: 4, background: BG },
})
  .composite([{ input: innerPng, gravity: 'center' }])
  .png()
  .toFile(publicDir + 'favicon-maskable.png');
console.log(`✓ favicon-maskable.png (${canvas}×${canvas})`);
