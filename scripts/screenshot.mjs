/**
 * Captura uma screenshot de um site para usar como capa de projeto.
 *
 * Uso:
 *   node scripts/screenshot.mjs <url> <arquivo-saida> [larguraCSS] [alturaCSS]
 *
 * Exemplo:
 *   npm run shot -- https://gerandocomigo.com.br/ public/uploads/gerando-comigo.jpg
 *
 * Gera um JPEG ~16:10 otimizado (bom para os cards e a página de detalhe).
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const [url, out, w = '1280', h = '800'] = process.argv.slice(2);

if (!url || !out) {
  console.error(
    'Uso: node scripts/screenshot.mjs <url> <arquivo-saida> [larguraCSS] [alturaCSS]',
  );
  process.exit(1);
}

const width = Number(w);
const height = Number(h);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
// Deixa fontes/animações assentarem.
await page.waitForTimeout(1500);

const raw = await page.screenshot({
  clip: { x: 0, y: 0, width, height },
});

await browser.close();

await mkdir(dirname(out), { recursive: true });
await sharp(raw)
  .resize({ width: 1600 })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(out);

console.log(`✓ ${out}`);
