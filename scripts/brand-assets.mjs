// Generates the static brand images: social share image, touch icon, logo for structured data.
// Run with `node scripts/brand-assets.mjs` after changing the mark or the tagline.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const mark = (size, stroke = '#fff') => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">
    <path d="M4 14.5 16 4l12 10.5V27a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V14.5Z" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M8 19.5h16" stroke="#00c0ff" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M16 21.8c1.5 1.8 2.2 3 2.2 3.8a2.2 2.2 0 0 1-4.4 0c0-.8.7-2 2.2-3.8Z" fill="#00c0ff"/>
  </svg>`;

const font = (await readFile('node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2')).toString('base64');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>@font-face { font-family: 'Bricolage'; src: url(data:font/woff2;base64,${font}); } text { font-family: 'Bricolage', 'Helvetica Neue', Arial, sans-serif; }</style>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.8">
      <stop offset="0" stop-color="#0a5086"/><stop offset="1" stop-color="#031a2c"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80 72)">${mark(64).replace('<svg', '<svg x="0" y="0"')}</g>
  <text x="160" y="118" fill="#fff" font-size="44" font-weight="700" letter-spacing="-1.5"><tspan fill="#00c0ff">dry</tspan>house</text>
  <text x="80" y="330" fill="#fff" font-size="92" font-weight="700" letter-spacing="-4">Wij maken je huis</text>
  <text x="80" y="430" fill="#fff" font-size="92" font-weight="700" letter-spacing="-4"><tspan fill="#00c0ff">droog</tspan>. Gegarandeerd.</text>
  <text x="80" y="540" fill="#ffffffb3" font-size="32" letter-spacing="-0.5">Vochtbestrijding met 30 jaar garantie · Gratis diagnose · Heel België</text>
</svg>`;

await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og/default.jpg');

const icon = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0a5086"/>
  <g transform="translate(5 5) scale(0.6875)">${mark(32)}</g>
</svg>`;
await sharp(Buffer.from(icon(180))).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(icon(512))).png().toFile('public/images/brand/logo.png');
console.log('brand assets written');
