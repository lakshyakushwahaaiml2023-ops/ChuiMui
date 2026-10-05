import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('screenshots_ingredients');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  // Scroll to #ingredients
  await page.evaluate(() => {
    const el = document.getElementById('ingredients');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 800));

  // 1. Screenshot Desktop Ingredients section
  await page.screenshot({ path: path.join(OUT_DIR, '01_ingredients_desktop.png') });
  console.log('Saved 01_ingredients_desktop.png');

  // 2. Mobile Viewport 390x844
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.evaluate(() => {
    const el = document.getElementById('ingredients');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.screenshot({ path: path.join(OUT_DIR, '02_ingredients_mobile.png') });
  console.log('Saved 02_ingredients_mobile.png');

  await browser.close();
  console.log('Done!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
