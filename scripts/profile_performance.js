import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function profile() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-vsync'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));

  const tracePath = path.resolve('trace.json');
  console.log('Starting trace recording...');
  await page.tracing.start({
    path: tracePath,
    screenshots: false,
    categories: [
      '-*',
      'devtools.timeline',
      'disabled-by-default-devtools.timeline',
      'disabled-by-default-devtools.timeline.frame',
      'disabled-by-default-devtools.timeline.stack',
      'v8.execute',
      'blink.user_timing'
    ]
  });

  // Smooth scroll through all stages over ~6 seconds
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const target = (totalHeight * i) / steps;
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, target);
    await new Promise((r) => setTimeout(r, 45)); // ~45ms per step = ~5.4s total scroll
  }

  // Scroll back up a bit to capture bi-directional scrub costs
  for (let i = steps; i >= steps - 30; i--) {
    const target = (totalHeight * i) / steps;
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, target);
    await new Promise((r) => setTimeout(r, 45));
  }

  await page.tracing.stop();
  console.log(`Trace saved to ${tracePath}`);

  await browser.close();

  // Analyze trace
  analyzeTrace(tracePath);
}

function analyzeTrace(traceFile) {
  const traceData = JSON.parse(fs.readFileSync(traceFile, 'utf8'));
  const events = traceData.traceEvents || traceData;

  const durationByCategory = {};
  const longTasks = [];
  const eventCounts = {};

  for (const ev of events) {
    if (ev.dur && ev.dur > 0) {
      const name = ev.name;
      const durMs = ev.dur / 1000;
      durationByCategory[name] = (durationByCategory[name] || 0) + durMs;
      eventCounts[name] = (eventCounts[name] || 0) + 1;

      if (durMs > 16.6) {
        longTasks.push({
          name: ev.name,
          cat: ev.cat,
          durMs: parseFloat(durMs.toFixed(2)),
          args: ev.args
        });
      }
    }
  }

  console.log('\n--- PERFORMANCE SUMMARY (Total Time by Event Type) ---');
  const sorted = Object.entries(durationByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25);
  for (const [name, totalDur] of sorted) {
    console.log(`${name.padEnd(30)} : ${totalDur.toFixed(2)} ms (${eventCounts[name]} calls, avg ${(totalDur / eventCounts[name]).toFixed(2)} ms)`);
  }

  console.log(`\nTotal long frames/tasks (>16.6ms): ${longTasks.length}`);
  const topLong = longTasks.sort((a, b) => b.durMs - a.durMs).slice(0, 15);
  console.log('\nTop 15 longest tasks:');
  for (const t of topLong) {
    console.log(`- ${t.name}: ${t.durMs} ms (cat: ${t.cat})`);
  }
}

profile().catch(console.error);
