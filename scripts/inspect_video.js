import { execSync } from 'child_process';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import fs from 'fs';

const ffprobe = ffprobeInstaller.path;
const videoPath = 'public/hero.mp4';

console.log('=== INSPECTING HERO.MP4 WITH FFPROBE ===');

const streamJson = execSync(
  `"${ffprobe}" -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,pix_fmt,r_frame_rate,avg_frame_rate,duration,nb_frames,has_b_frames -of json "${videoPath}"`
).toString();
console.log('Stream Details:\n', streamJson);

const audioJson = execSync(
  `"${ffprobe}" -v error -select_streams a -show_entries stream=index,codec_name -of json "${videoPath}"`
).toString();
console.log('Audio Streams:\n', audioJson);

console.log('Counting exact frames and keyframes (this may take a couple seconds)...');
const frameCount = execSync(
  `"${ffprobe}" -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${videoPath}"`
).toString().trim();
console.log('Total Frame Count (nb_read_frames):', frameCount);

const keyframesRaw = execSync(
  `"${ffprobe}" -v error -select_streams v:0 -skip_frame nokey -show_entries frame=pkt_pts_time,pict_type -of csv "${videoPath}"`
).toString().trim();

const keyframeLines = keyframesRaw ? keyframesRaw.split('\n').filter(Boolean) : [];
console.log('Total Keyframe Count:', keyframeLines.length);

const stats = fs.statSync(videoPath);
console.log('Input File Size:', (stats.size / (1024 * 1024)).toFixed(2), 'MB');
