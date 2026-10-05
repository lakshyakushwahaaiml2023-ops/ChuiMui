import fs from 'fs';

const traceData = JSON.parse(fs.readFileSync('trace.json', 'utf8'));
const events = traceData.traceEvents || traceData;

const functionCalls = [];
const layoutTriggers = [];
const paintRecords = [];

for (const ev of events) {
  const dur = (ev.dur || 0) / 1000;
  if (ev.name === 'FunctionCall' && dur > 2) {
    functionCalls.push({
      dur,
      scriptName: ev.args?.data?.scriptName,
      functionName: ev.args?.data?.functionName,
      scriptLine: ev.args?.data?.scriptLine,
      url: ev.args?.data?.url
    });
  }
  if ((ev.name === 'UpdateLayoutTree' || ev.name === 'Layout') && dur > 2) {
    layoutTriggers.push({
      name: ev.name,
      dur,
      args: ev.args
    });
  }
  if (ev.name === 'Paint' && dur > 1) {
    paintRecords.push({
      dur,
      clip: ev.args?.data?.clip,
      layerId: ev.args?.data?.layerId
    });
  }
}

console.log('--- Top Function Calls ---');
console.log(JSON.stringify(functionCalls.sort((a, b) => b.dur - a.dur).slice(0, 15), null, 2));

console.log('\n--- Top Layout Triggers ---');
console.log(JSON.stringify(layoutTriggers.sort((a, b) => b.dur - a.dur).slice(0, 10), null, 2));

console.log('\n--- Top Paint Records ---');
console.log(JSON.stringify(paintRecords.sort((a, b) => b.dur - a.dur).slice(0, 10), null, 2));
