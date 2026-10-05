import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const stages = [
    { name: '01_hero', progress: 0.0 },
    { name: '02_selector', progress: 0.12 },
    { name: '03_oud_imperial', progress: 0.28 },
    { name: '04_rose_crepuscule', progress: 0.45 },
    { name: '05_cedre_blanc', progress: 0.62 },
    { name: '06_santal_nocturne', progress: 0.78 },
    { name: '07_showcase_arc', progress: 0.925 },
    { name: '08_footer', progress: 1.0 },
  ];

  // 1. Desktop 1440x900
  console.log('Capturing Desktop 1440px...');
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await desktopPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const totalHeight = await desktopPage.evaluate(() => {
    return document.documentElement.scrollHeight - window.innerHeight;
  });

  for (const stage of stages) {
    const scrollTarget = totalHeight * stage.progress;
    await desktopPage.evaluate((target) => {
      window.scrollTo(0, target);
    }, scrollTarget);
    await new Promise((r) => setTimeout(r, 900));
    const filePath = path.join(SCREENSHOT_DIR, `desktop_${stage.name}.png`);
    await desktopPage.screenshot({ path: filePath });
    console.log(`Saved ${filePath}`);
  }
  await desktopPage.close();

  // 2. Mobile 390x844
  console.log('Capturing Mobile 390px...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mobilePage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileTotalHeight = await mobilePage.evaluate(() => {
    return document.documentElement.scrollHeight - window.innerHeight;
  });

  for (const stage of stages) {
    const scrollTarget = mobileTotalHeight * stage.progress;
    await mobilePage.evaluate((target) => {
      window.scrollTo(0, target);
    }, scrollTarget);
    await new Promise((r) => setTimeout(r, 900));
    const filePath = path.join(SCREENSHOT_DIR, `mobile_${stage.name}.png`);
    await mobilePage.screenshot({ path: filePath });
    console.log(`Saved ${filePath}`);
  }
  await mobilePage.close();

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
