import puppeteer from 'puppeteer-core';

async function measureHeroScrollPerf() {
  console.log('=== MEASURING HERO SCROLL PERFORMANCE ON PRODUCTION PREVIEW ===');
  
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('[Browser Console Error]:', msg.text());
    }
  });

  console.log('Navigating to preview server at http://localhost:4173/...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  // Measure scroll through the hero stage
  const results = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const hero = document.querySelector('.hero-scroll-section');
      if (!hero) {
        resolve({ error: 'Hero element not found' });
        return;
      }

      const heroScrollDistance = hero.offsetHeight - window.innerHeight;
      const frameDeltas = [];
      let lastTime = performance.now();
      let tracking = true;

      function onFrame(now) {
        const delta = now - lastTime;
        lastTime = now;
        frameDeltas.push(delta);

        if (tracking) {
          requestAnimationFrame(onFrame);
        }
      }
      requestAnimationFrame(onFrame);

      // Scroll smoothly through hero height over 4.5 seconds
      const duration = 4500;
      const startTime = performance.now();

      const timer = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        
        // Window scroll to current hero position
        window.scrollTo(0, heroScrollDistance * progress);

        if (progress >= 1) {
          clearInterval(timer);
          setTimeout(() => {
            tracking = false;

            // Discard the initial 4 warmup frames
            const valid = frameDeltas.slice(4);
            const totalDuration = valid.reduce((a, b) => a + b, 0);
            const avgDelta = totalDuration / valid.length;
            const avgFPS = 1000 / avgDelta;

            // Dropped frame threshold: > 20ms (for 60Hz, target is 16.6ms)
            const droppedThresholdMs = 20.0;
            const droppedFrames = valid.filter((d) => d > droppedThresholdMs);
            const droppedPercentage = (droppedFrames.length / valid.length) * 100;

            // 1% low calculations
            const sorted = [...valid].sort((a, b) => b - a);
            const worst1PctCount = Math.max(1, Math.floor(sorted.length * 0.01));
            const worst1PctAvg = sorted.slice(0, worst1PctCount).reduce((a, b) => a + b, 0) / worst1PctCount;
            const onePercentLowFPS = 1000 / worst1PctAvg;

            resolve({
              heroScrollDistance,
              totalFramesSampled: valid.length,
              avgFPS: Number(avgFPS.toFixed(1)),
              onePercentLowFPS: Number(onePercentLowFPS.toFixed(1)),
              droppedFramesCount: droppedFrames.length,
              droppedPercentage: Number(droppedPercentage.toFixed(2)) + '%',
              maxFrameTimeMs: Number(Math.max(...valid).toFixed(2)),
              minFrameTimeMs: Number(Math.min(...valid).toFixed(2)),
              droppedFrameDeltas: droppedFrames.map((d) => Number(d.toFixed(1))),
            });
          }, 300);
        }
      }, 16);
    });
  });

  console.log('\n--- PERFORMANCE RESULTS ---');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

measureHeroScrollPerf().catch(console.error);
