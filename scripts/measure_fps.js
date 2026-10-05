import puppeteer from 'puppeteer-core';

async function measureFPS() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  // Measure FPS during smooth scroll
  const fpsMetrics = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const frameTimes = [];
      let lastTime = performance.now();
      let isScrolling = true;

      function onFrame(currentTime) {
        const delta = currentTime - lastTime;
        lastTime = currentTime;
        frameTimes.push(delta);

        if (isScrolling) {
          requestAnimationFrame(onFrame);
        }
      }
      requestAnimationFrame(onFrame);

      // Perform smooth scroll across all 6 heights over 5 seconds
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const startTime = performance.now();
      const scrollDuration = 5000;

      const scrollInterval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / scrollDuration);
        window.scrollTo(0, totalHeight * progress);

        if (progress >= 1) {
          clearInterval(scrollInterval);
          setTimeout(() => {
            isScrolling = false;
            // Calculate metrics
            // Drop first 5 warmup frames
            const validDeltas = frameTimes.slice(5);
            const totalDuration = validDeltas.reduce((a, b) => a + b, 0);
            const avgDelta = totalDuration / validDeltas.length;
            const avgFPS = 1000 / avgDelta;
            
            // Dropped frames (> 16.7ms for 60Hz)
            const droppedFrames = validDeltas.filter(d => d > 19.0).length;
            
            // 1% low FPS
            const sortedDeltas = [...validDeltas].sort((a, b) => b - a);
            const worst1PercentCount = Math.max(1, Math.floor(sortedDeltas.length * 0.01));
            const worst1PercentAvgDelta = sortedDeltas.slice(0, worst1PercentCount).reduce((a, b) => a + b, 0) / worst1PercentCount;
            const onePercentLowFPS = 1000 / worst1PercentAvgDelta;

            resolve({
              frameCount: validDeltas.length,
              avgFPS: parseFloat(avgFPS.toFixed(1)),
              onePercentLowFPS: parseFloat(onePercentLowFPS.toFixed(1)),
              droppedFrames,
              droppedPercentage: parseFloat(((droppedFrames / validDeltas.length) * 100).toFixed(1)),
              maxFrameTimeMs: parseFloat(Math.max(...validDeltas).toFixed(1))
            });
          }, 300);
        }
      }, 16);
    });
  });

  console.log('FPS Benchmark Results:', JSON.stringify(fpsMetrics, null, 2));
  await browser.close();
  return fpsMetrics;
}

measureFPS().catch(console.error);
