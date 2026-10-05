import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('screenshots_signature');
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

  // Scroll to #collection
  await page.evaluate(() => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));

  // 1. Screenshot default section
  await page.screenshot({ path: path.join(OUT_DIR, '01_collection_default.png') });
  console.log('Saved 01_collection_default.png');

  // 2. Hover row 0 (Oud Impérial)
  const rows = await page.$$('.signature-row-item');
  console.log(`Found ${rows.length} rows`);

  if (rows.length > 0) {
    await rows[0].hover();
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(OUT_DIR, '02_hover_oud_imperial.png') });
    console.log('Saved 02_hover_oud_imperial.png');
  }

  // 3. Hover row 1 (Rose Crépuscule)
  if (rows.length > 1) {
    await rows[1].hover();
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(OUT_DIR, '03_hover_rose_crepuscule.png') });
    console.log('Saved 03_hover_rose_crepuscule.png');
  }

  // 4. Hover row 2 (Cèdre Blanc)
  if (rows.length > 2) {
    await rows[2].hover();
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: path.join(OUT_DIR, '04_hover_cedre_blanc.png') });
    console.log('Saved 04_hover_cedre_blanc.png');
  }

  // 5. Test "View all" link attribute
  const viewAllHref = await page.$eval('.signature-view-all-link', el => el.getAttribute('href'));
  const viewAllText = await page.$eval('.signature-view-all-link .view-all-text', el => el.textContent.trim());
  console.log(`View all link: text="${viewAllText}", href="${viewAllHref}"`);

  // 6. Mobile test
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.evaluate(() => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT_DIR, '05_mobile_collection.png') });
  console.log('Saved 05_mobile_collection.png');

  await browser.close();
  console.log('Done!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
