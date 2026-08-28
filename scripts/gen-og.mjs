/**
 * Gera a imagem de Open Graph (compartilhamento em redes/WhatsApp).
 * Rode com:  npm run og
 *
 * Saída:  public/og.png  (1200×630)
 *
 * Sem dependência de fontes externas — usa a pilha de fontes do sistema
 * (Segoe UI no Windows) renderizada pelo librsvg via sharp.
 */
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const W = 1200;
const H = 630;

const BG = '#0b0d12';
const SURFACE = '#171b25';
const BORDER = '#262c3a';
const TEXT = '#eef0f4';
const MUTED = '#9aa1b1';
const ACCENT = '#7c9eff';

const FONT = "'Segoe UI', 'Inter', system-ui, -apple-system, Roboto, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="120" />
    </filter>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.04" />
      <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}" />
  <rect width="${W}" height="${H}" fill="url(#edge)" />
  <ellipse cx="${W - 140}" cy="120" rx="260" ry="220" fill="${ACCENT}" fill-opacity="0.20" filter="url(#glow)" />
  <ellipse cx="120" cy="${H - 60}" rx="240" ry="200" fill="${ACCENT}" fill-opacity="0.10" filter="url(#glow)" />

  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="0" fill="none" stroke="${BORDER}" stroke-width="2" />

  <!-- marca -->
  <g transform="translate(96 82)">
    <rect width="76" height="76" rx="18" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2" />
    <g transform="translate(6 6) scale(0.98)">
      <path d="M44 20.5a17 17 0 1 0 0 23" fill="none" stroke="${TEXT}" stroke-width="7" stroke-linecap="round" />
      <circle cx="46" cy="46" r="5" fill="${ACCENT}" />
    </g>
  </g>
  <text x="196" y="118" font-family="${FONT}" font-size="30" font-weight="700" fill="${TEXT}">Cardos0</text>
  <text x="196" y="150" font-family="${FONT}" font-size="19" fill="${MUTED}">Criação de Sites — Design &amp; Código</text>

  <!-- título -->
  <text x="96" y="330" font-family="${FONT}" font-size="72" font-weight="700" fill="${TEXT}">Sites sob medida,</text>
  <text x="96" y="418" font-family="${FONT}" font-size="72" font-weight="700" fill="${TEXT}">do <tspan fill="${ACCENT}">design</tspan> à <tspan fill="${ACCENT}">publicação</tspan>.</text>

  <rect x="98" y="452" width="96" height="5" rx="2.5" fill="${ACCENT}" />

  <!-- rodapé -->
  <text x="96" y="536" font-family="${FONT}" font-size="24" fill="${MUTED}">Matheus · 8 anos criando sites em HTML, CSS e JavaScript</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(publicDir + 'og.png');

console.log(`✓ og.png (${W}×${H})`);
