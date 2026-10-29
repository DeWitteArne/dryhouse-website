// Generates the static brand images: social share image, touch icon, logo for structured data.
// Run with `node scripts/brand-assets.mjs` after changing the mark or the tagline.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

// The logo files are vectorised from the original Dryhouse artwork (public/images/brand).
const svgInner = async (file) => (await readFile(`public/images/brand/${file}`, 'utf8')).replace(/^.*?<\/title>/s, '').replace(/<\/svg>\s*$/, '');
const markPaths = await svgInner('dryhouse-mark.svg'); // viewBox 0 0 103 108
const logoWhite = await svgInner('dryhouse-logo-white.svg'); // viewBox 0 0 445 108
const logoColor = await svgInner('dryhouse-logo.svg');

const font = (await readFile('node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')).toString('base64');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>@font-face { font-family: 'Archivo'; src: url(data:font/woff2;base64,${font}); } text { font-family: 'Archivo', 'Helvetica Neue', Arial, sans-serif; }</style>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.8">
      <stop offset="0" stop-color="#0a5086"/><stop offset="1" stop-color="#031a2c"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80 64) scale(0.6)">${logoWhite}</g>
  <text x="80" y="330" fill="#fff" font-size="92" font-weight="700" letter-spacing="-4">Wij maken je huis</text>
  <text x="80" y="430" fill="#fff" font-size="92" font-weight="700" letter-spacing="-4"><tspan fill="#00c0ff">droog</tspan>. Gegarandeerd.</text>
  <text x="80" y="540" fill="#ffffffb3" font-size="32" letter-spacing="-0.5">Vochtbestrijding met 30 jaar garantie · Gratis diagnose · België en Nederland</text>
</svg>`;

await sharp(Buffer.from(og)).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og/default.jpg');

// Mark on a white tile: reads on light and dark browser chrome alike.
const icon = (size, radius = 0) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="${radius}" fill="#fff"/>
  <g transform="translate(14.5 12) scale(0.96)">${markPaths}</g>
</svg>`;
await writeFile('public/favicon.svg', icon(32, 26).trim().replace(/\n\s*/g, ''));
await sharp(Buffer.from(icon(180))).png().toFile('public/apple-touch-icon.png');

// Logo for structured data (Google: at least 112px, on a plain background).
const logo = `
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="300" viewBox="0 0 500 150">
  <rect width="500" height="150" fill="#fff"/>
  <g transform="translate(27.5 21)">${logoColor}</g>
</svg>`;
await sharp(Buffer.from(logo)).png().toFile('public/images/brand/logo.png');
console.log('brand assets written');
