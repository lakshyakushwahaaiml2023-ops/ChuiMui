import { execSync } from 'child_process';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';

const ffprobe = ffprobeInstaller.path;
const video = 'public/hero-scrub.mp4';

// Use show_frames to get pict_type and key_frame for every single frame
const frameData = execSync(
  `"${ffprobe}" -v error -select_streams v:0 -show_frames -show_entries frame=key_frame,pict_type -of json "${video}"`
).toString();

const json = JSON.parse(frameData);
const frames = json.frames;

console.log('Total frames returned:', frames.length);

let keyframeCount = 0;
let nonKeyframeCount = 0;
let bFrameCount = 0;
const pictTypes = {};

frames.forEach((f) => {
  if (f.key_frame === 1) {
    keyframeCount++;
  } else {
    nonKeyframeCount++;
  }
  if (f.pict_type === 'B') {
    bFrameCount++;
  }
  pictTypes[f.pict_type] = (pictTypes[f.pict_type] || 0) + 1;
});

console.log('Keyframe count (key_frame === 1):', keyframeCount);
console.log('Non-keyframe count (key_frame === 0):', nonKeyframeCount);
console.log('B-frame count:', bFrameCount);
console.log('Picture type distribution:', pictTypes);
console.log('Frame count equals keyframe count:', frames.length === keyframeCount);
