import { execSync } from 'child_process';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import fs from 'fs';

const ffmpeg = ffmpegInstaller.path;
const ffprobe = ffprobeInstaller.path;

const inputVideo = 'public/hero.mp4';
const outputVideo = 'public/hero-scrub.mp4';
const posterWebp = 'public/hero-poster.webp';
const posterJpg = 'public/hero-poster.jpg';

console.log('=== STARTING ALL-INTRA VIDEO ENCODING ===');
console.log('FFmpeg binary:', ffmpeg);
console.log('FFprobe binary:', ffprobe);

// 1. Run FFmpeg command exactly as specified in PDF
function encodeVideo(crf = 23) {
  console.log(`\nEncoding with CRF = ${crf}...`);
  const ffmpegCmd = `"${ffmpeg}" -y -i "${inputVideo}" -map 0:v:0 -vf "scale='min(1920,iw)':-2" -c:v libx264 -preset medium -crf ${crf} -pix_fmt yuv420p -profile:v high -level 4.2 -g 1 -keyint_min 1 -sc_threshold 0 -bf 0 -movflags +faststart -an "${outputVideo}"`;
  execSync(ffmpegCmd, { stdio: 'inherit' });

  const stats = fs.statSync(outputVideo);
  const sizeMB = stats.size / (1024 * 1024);
  console.log(`Generated ${outputVideo}: ${sizeMB.toFixed(2)} MB (${stats.size} bytes)`);
  return sizeMB;
}

let sizeMB = encodeVideo(23);

// If over 25 MB, tune CRF higher
if (sizeMB > 25) {
  console.log('File size exceeds 25 MB. Re-encoding with higher CRF...');
  let crf = 26;
  while (sizeMB > 25 && crf <= 32) {
    sizeMB = encodeVideo(crf);
    crf += 2;
  }
}

// 2. Extract Poster from Frame 0
console.log('\n=== EXTRACTING POSTER FROM FRAME 0 ===');
const posterWebpCmd = `"${ffmpeg}" -y -ss 0 -i "${outputVideo}" -vframes 1 -q:v 2 "${posterWebp}"`;
execSync(posterWebpCmd, { stdio: 'inherit' });
console.log(`Generated poster: ${posterWebp} (${(fs.statSync(posterWebp).size / 1024).toFixed(1)} KB)`);

const posterJpgCmd = `"${ffmpeg}" -y -ss 0 -i "${outputVideo}" -vframes 1 -q:v 2 "${posterJpg}"`;
execSync(posterJpgCmd, { stdio: 'inherit' });
console.log(`Generated poster: ${posterJpg} (${(fs.statSync(posterJpg).size / 1024).toFixed(1)} KB)`);

// Also provide hero-scroll-scrub.mp4 as an alias
fs.copyFileSync(outputVideo, 'public/hero-scroll-scrub.mp4');

// 3. Verify output with FFprobe
console.log('\n=== VERIFYING OUTPUT WITH FFPROBE ===');

const streamJson = execSync(
  `"${ffprobe}" -v error -select_streams v:0 -show_entries stream=codec_name,profile,width,height,pix_fmt,r_frame_rate,duration,has_b_frames -of json "${outputVideo}"`
).toString();
console.log('Stream Details:\n', streamJson);

const audioStreams = execSync(
  `"${ffprobe}" -v error -select_streams a -show_entries stream=index -of json "${outputVideo}"`
).toString();
console.log('Audio Streams (should be empty array):\n', audioStreams);

const totalFrames = parseInt(
  execSync(
    `"${ffprobe}" -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 "${outputVideo}"`
  ).toString().trim(),
  10
);

const keyframeLines = execSync(
  `"${ffprobe}" -v error -select_streams v:0 -skip_frame nokey -show_entries frame=pict_type -of csv "${outputVideo}"`
).toString().trim().split('\n').filter(Boolean);

const totalKeyframes = keyframeLines.length;

console.log('----------------------------------------------------');
console.log(`Total Frame Count:     ${totalFrames}`);
console.log(`Total Keyframe Count:  ${totalKeyframes}`);
console.log(`Non-Keyframe Count:    ${totalFrames - totalKeyframes}`);
console.log(`Frame Count == Keyframe Count? ${totalFrames === totalKeyframes ? 'YES (ALL-INTRA VERIFIED)' : 'NO'}`);
console.log(`Final File Size:       ${sizeMB.toFixed(2)} MB (< 25 MB: ${sizeMB < 25 ? 'PASS' : 'FAIL'})`);
console.log('----------------------------------------------------');
