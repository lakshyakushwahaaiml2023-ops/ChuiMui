import puppeteer from 'puppeteer-core';

async function testHeroInteraction() {
  console.log('=== LAUNCHING PUPPETEER TO TEST HERO INTERACTION ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Monitor console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('[Browser Error]:', msg.text());
    }
  });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Verify Progress 0
  const stateAt0 = await page.evaluate(() => {
    const video = document.querySelector('.hero-scrub-video');
    const primaryBlock = document.querySelector('.hero-primary-copy-block');
    const secondaryBlock = document.querySelector('.hero-secondary-copy-block');
    const header = document.querySelector('.minimal-editorial-header');

    return {
      videoFound: !!video,
      videoPaused: video ? video.paused : null,
      currentTime: video ? video.currentTime : null,
      primaryOpacity: primaryBlock ? window.getComputedStyle(primaryBlock).opacity : null,
      secondaryOpacity: secondaryBlock ? window.getComputedStyle(secondaryBlock).opacity : null,
      headerVisible: !!header,
    };
  });

  console.log('State at Progress 0.0:', stateAt0);
  await page.screenshot({ path: 'hero_desktop_prog_0.png' });

  // 2. Scroll through 320svh section to test scrubbing and opacity fades
  const heroHeight = await page.evaluate(() => {
    const hero = document.querySelector('.hero-scroll-section');
    return hero ? hero.scrollHeight - window.innerHeight : 2000;
  });

  // Scroll to progress ~0.23 (fading stage)
  await page.evaluate((h) => {
    window.scrollTo(0, h * 0.23);
  }, heroHeight);
  await new Promise((r) => setTimeout(r, 400));

  const stateAtFade = await page.evaluate(() => {
    const video = document.querySelector('.hero-scrub-video');
    const primaryBlock = document.querySelector('.hero-primary-copy-block');
    const secondaryBlock = document.querySelector('.hero-secondary-copy-block');

    return {
      currentTime: video ? video.currentTime : null,
      primaryOpacity: primaryBlock ? parseFloat(window.getComputedStyle(primaryBlock).opacity) : null,
      secondaryOpacity: secondaryBlock ? parseFloat(window.getComputedStyle(secondaryBlock).opacity) : null,
    };
  });
  console.log('State at Progress ~0.23:', stateAtFade);
  await page.screenshot({ path: 'hero_desktop_prog_023.png' });

  // Scroll to progress ~0.40 (copy gone, mist & visual takeover)
  await page.evaluate((h) => {
    window.scrollTo(0, h * 0.40);
  }, heroHeight);
  await new Promise((r) => setTimeout(r, 400));

  const stateAt40 = await page.evaluate(() => {
    const video = document.querySelector('.hero-scrub-video');
    const primaryBlock = document.querySelector('.hero-primary-copy-block');

    return {
      currentTime: video ? video.currentTime : null,
      primaryOpacity: primaryBlock ? parseFloat(window.getComputedStyle(primaryBlock).opacity) : null,
    };
  });
  console.log('State at Progress ~0.40:', stateAt40);
  await page.screenshot({ path: 'hero_desktop_prog_040.png' });

  // Scroll to progress 1.0 (End of Hero)
  await page.evaluate((h) => {
    window.scrollTo(0, h * 1.0);
  }, heroHeight);
  await new Promise((r) => setTimeout(r, 600));

  const stateAt1 = await page.evaluate(() => {
    const video = document.querySelector('.hero-scrub-video');
    return {
      currentTime: video ? video.currentTime : null,
    };
  });
  console.log('State at Progress 1.0:', stateAt1);
  await page.screenshot({ path: 'hero_desktop_prog_100.png' });

  // Scroll back to top (exact endpoint return)
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));

  const stateBackAt0 = await page.evaluate(() => {
    const video = document.querySelector('.hero-scrub-video');
    return {
      currentTime: video ? video.currentTime : null,
    };
  });
  console.log('State Return to Progress 0.0:', stateBackAt0);

  // Mobile Viewport Check (390px)
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: 'hero_mobile_prog_0.png' });

  await browser.close();
  console.log('Hero interaction tests completed successfully.');
}

testHeroInteraction().catch(console.error);
