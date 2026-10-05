import puppeteer from 'puppeteer-core';

async function stressTest() {
  console.log('=== STRESS TESTING HERO BI-DIRECTIONAL SCRUBBING ===');
  
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const results = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const hero = document.querySelector('.hero-scroll-section');
      const heroHeight = hero ? hero.offsetHeight - window.innerHeight : 1980;
      const frameDeltas = [];
      let lastTime = performance.now();
      let tracking = true;

      function onFrame(now) {
        const delta = now - lastTime;
        lastTime = now;
        frameDeltas.push(delta);
        if (tracking) requestAnimationFrame(onFrame);
      }
      requestAnimationFrame(onFrame);

      // Perform 3 rapid bi-directional sweeps across the hero stage
      const cycles = [
        { from: 0, to: 1, duration: 1800 },
        { from: 1, to: 0.2, duration: 1400 },
        { from: 0.2, to: 0.8, duration: 1200 },
        { from: 0.8, to: 0, duration: 1400 },
      ];

      let cycleIndex = 0;
      function runCycle() {
        if (cycleIndex >= cycles.length) {
          setTimeout(() => {
            tracking = false;
            const valid = frameDeltas.slice(5);
            const totalDuration = valid.reduce((a, b) => a + b, 0);
            const avgFPS = 1000 / (totalDuration / valid.length);
            const dropped = valid.filter((d) => d > 20.0);

            resolve({
              totalFramesSampled: valid.length,
              avgFPS: Number(avgFPS.toFixed(1)),
              droppedFramesCount: dropped.length,
              droppedPercentage: Number(((dropped.length / valid.length) * 100).toFixed(2)) + '%',
              maxFrameTimeMs: Number(Math.max(...valid).toFixed(2)),
            });
          }, 200);
          return;
        }

        const cycle = cycles[cycleIndex++];
        const start = performance.now();
        const interval = setInterval(() => {
          const now = performance.now();
          const p = Math.min(1, (now - start) / cycle.duration);
          const currentProgress = cycle.from + (cycle.to - cycle.from) * p;
          window.scrollTo(0, heroHeight * currentProgress);

          if (p >= 1) {
            clearInterval(interval);
            runCycle();
          }
        }, 16);
      }

      runCycle();
    });
  });

  console.log('Stress Test Results:', JSON.stringify(results, null, 2));
  await browser.close();
}

stressTest().catch(console.error);
