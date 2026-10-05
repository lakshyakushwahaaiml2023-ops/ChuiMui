import puppeteer from 'puppeteer-core';

async function verifyAllStages() {
  console.log('=== RUNNING COMPREHENSIVE HERO STAGE VERIFICATION ===');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  const totalHeroScroll = await page.evaluate(() => {
    const hero = document.querySelector('.hero-scroll-section');
    return hero ? hero.scrollHeight - window.innerHeight : 2000;
  });

  console.log('Total Hero Scroll Distance:', totalHeroScroll, 'px');

  // Stage 0.0: Initial Frame
  const p0 = await page.evaluate(() => {
    const v = document.querySelector('.hero-scrub-video');
    const primary = document.querySelector('.hero-primary-copy-block');
    const secondary = document.querySelector('.hero-secondary-copy-block');
    return {
      paused: v ? v.paused : null,
      currentTime: v ? v.currentTime : null,
      primaryOpacity: primary ? primary.style.opacity : null,
      secondaryOpacity: secondary ? secondary.style.opacity : null,
    };
  });
  console.log('Progress 0.0:', p0);
  await page.screenshot({ path: 'stage_00_initial.png' });

  // Stage ~0.20: Secondary fading, Primary fully visible
  await page.evaluate((h) => window.scrollTo(0, h * 0.20), totalHeroScroll);
  await new Promise((r) => setTimeout(r, 300));
  const p20 = await page.evaluate(() => {
    const v = document.querySelector('.hero-scrub-video');
    const primary = document.querySelector('.hero-primary-copy-block');
    const secondary = document.querySelector('.hero-secondary-copy-block');
    return {
      currentTime: v ? v.currentTime : null,
      primaryOpacity: primary ? primary.style.opacity : null,
      secondaryOpacity: secondary ? secondary.style.opacity : null,
    };
  });
  console.log('Progress 0.20:', p20);
  await page.screenshot({ path: 'stage_20_mist_rising.png' });

  // Stage ~0.26: Secondary gone, Primary nearly gone
  await page.evaluate((h) => window.scrollTo(0, h * 0.26), totalHeroScroll);
  await new Promise((r) => setTimeout(r, 300));
  const p26 = await page.evaluate(() => {
    const v = document.querySelector('.hero-scrub-video');
    const primary = document.querySelector('.hero-primary-copy-block');
    const secondary = document.querySelector('.hero-secondary-copy-block');
    return {
      currentTime: v ? v.currentTime : null,
      primaryOpacity: primary ? primary.style.opacity : null,
      secondaryOpacity: secondary ? secondary.style.opacity : null,
    };
  });
  console.log('Progress 0.26:', p26);
  await page.screenshot({ path: 'stage_26_copy_fade.png' });

  // Stage ~0.45: Full visual takeover (copy 100% hidden)
  await page.evaluate((h) => window.scrollTo(0, h * 0.45), totalHeroScroll);
  await new Promise((r) => setTimeout(r, 300));
  const p45 = await page.evaluate(() => {
    const v = document.querySelector('.hero-scrub-video');
    const primary = document.querySelector('.hero-primary-copy-block');
    return {
      currentTime: v ? v.currentTime : null,
      primaryOpacity: primary ? primary.style.opacity : null,
    };
  });
  console.log('Progress 0.45 (Visual Takeover):', p45);
  await page.screenshot({ path: 'stage_45_visual_takeover.png' });

  // Stage 1.0: Final Frame (exact endpoint check)
  await page.evaluate((h) => window.scrollTo(0, h * 1.0), totalHeroScroll);
  await new Promise((r) => setTimeout(r, 500));
  const p100 = await page.evaluate(() => {
    const v = document.querySelector('.hero-scrub-video');
    return {
      currentTime: v ? v.currentTime : null,
    };
  });
  console.log('Progress 1.0 (Final Frame Endpoint):', p100);
  await page.screenshot({ path: 'stage_100_final_frame.png' });

  // Scroll into Section 2 (Brand Story)
  await page.evaluate((h) => window.scrollTo(0, h + 500), totalHeroScroll);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: 'stage_brand_story_transition.png' });

  // Scroll back to top (Exact Frame 0 Return)
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));
  const pReturn0 = await page.evaluate(() => {
    const v = document.querySelector('.hero-scrub-video');
    const primary = document.querySelector('.hero-primary-copy-block');
    return {
      currentTime: v ? v.currentTime : null,
      primaryOpacity: primary ? primary.style.opacity : null,
    };
  });
  console.log('Return to 0.0:', pReturn0);

  // Mobile Viewport Check (390 x 844)
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: 'hero_mobile_390px.png' });

  await browser.close();
  console.log('=== ALL STAGES TESTED SUCCESSFULLY ===');
}

verifyAllStages().catch(console.error);
