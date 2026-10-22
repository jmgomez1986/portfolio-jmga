/**
 * Generates public/og-image.png (1200x630) — the card shown when the site
 * link is shared (WhatsApp, LinkedIn, Slack). Run: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const photoPath = path.join(root, "public", "img", "hero.webp");
const outPath = path.join(root, "public", "og-image.png");

const W = 1200;
const H = 630;
const PHOTO_W = 630;

const overlay = Buffer.from(`
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <text x="90" y="200" fill="#9a9aa3" font-family="Segoe UI, Arial" font-size="17" font-weight="600" letter-spacing="4">PORTFOLIO 2026</text>
    <text x="90" y="270" fill="#ededef" font-family="Segoe UI, Arial" font-size="52" font-weight="700">Juan Matias</text>
    <text x="90" y="332" fill="#ededef" font-family="Segoe UI, Arial" font-size="52" font-weight="700">Gomez Andersen</text>
    <text x="92" y="395" fill="#7ee787" font-family="Segoe UI, Arial" font-size="36" font-weight="600" font-style="italic">Frontend Developer.</text>
    <text x="90" y="465" fill="#9a9aa3" font-family="Segoe UI, Arial" font-size="20">Angular &#183; TypeScript &#183; React &#183; Node.js</text>
    <text x="90" y="497" fill="#9a9aa3" font-family="Segoe UI, Arial" font-size="20">Base SAP/ABAP enterprise &#8212; 6 a&#241;os</text>
    <rect x="0" y="${H - 4}" width="${W}" height="4" fill="#7ee787"/>
  </svg>
`);

const photo = await sharp(photoPath)
  .resize(PHOTO_W, H, { fit: "cover" })
  .grayscale()
  .toBuffer();

await sharp({
  create: { width: W, height: H, channels: 4, background: "#0a0a0b" },
})
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: photo, left: W - PHOTO_W, top: 0 },
  ])
  .png()
  .toFile(outPath);

console.log(`og-image written to ${outPath}`);
