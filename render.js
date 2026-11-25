/**
 * render.js - High-Performance Parallel Batch Video Exporter
 * 
 * Exports the complete 5-minute (300.0s) 1080p cinematic explainer video
 * using Puppeteer Chrome frame streaming and FFmpeg H.264 encoding.
 * 
 * Usage:
 *   node render.js
 *   node render.js --fps 24
 *   node render.js --scene scene3
 */

const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const puppeteer = require('puppeteer-core');

const timeline = require('./timelineData');

// CLI Arguments
const args = process.argv.slice(2);
const fpsArg = args.indexOf('--fps') !== -1 ? parseInt(args[args.indexOf('--fps') + 1], 10) : 24;
const targetSceneArg = args.indexOf('--scene') !== -1 ? args[args.indexOf('--scene') + 1] : null;
const concurrencyArg = args.indexOf('--concurrency') !== -1 ? parseInt(args[args.indexOf('--concurrency') + 1], 10) : 3;
const CONCURRENCY = concurrencyArg || 3;

const FPS = fpsArg || 24;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const FINAL_MP4 = path.resolve(__dirname, 'gaussian_elimination_cinematic_explainer.mp4');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// In-memory script pack for worker pages
const SCRIPTS_SOURCE = [
  'timelineData.js',
  'src/math3d.js',
  'src/scene1_cafeteria.js',
  'src/scene2_transform.js',
  'src/scene3_geometry3d.js',
  'src/scene4_matrix_intro.js',
  'src/scene5_elimination.js',
  'src/scene6_graph_bridge.js',
  'src/scene7_staircase.js',
  'src/mainRenderer.js'
].map(f => fs.readFileSync(path.resolve(__dirname, f), 'utf8')).join('\n;\n');

const WORKER_HTML = `<!DOCTYPE html>
<html>
<head><style>body{margin:0;overflow:hidden;background:#050814;}</style></head>
<body>
  <canvas id="c" width="${WIDTH}" height="${HEIGHT}"></canvas>
  <script>
    ${SCRIPTS_SOURCE}
    const canvas = document.getElementById("c");
    window.ctx = canvas.getContext("2d");
    window.renderer = new MainRenderer(window.TIMELINE_CONFIG);
  </script>
</body>
</html>`;

async function renderScene(browser, sceneDef, sceneIndex, totalScenes) {
  const sceneOutPath = path.join(OUTPUT_DIR, `${sceneDef.id}.mp4`);
  const totalFrames = Math.round(sceneDef.duration * FPS);
  const startTime = sceneDef.startTime;

  console.log(`\n[${sceneIndex + 1}/${totalScenes}] 🎬 Rendering ${sceneDef.name} (${sceneDef.id})`);
  console.log(`    Timecode: ${sceneDef.startTime.toFixed(1)}s - ${sceneDef.endTime.toFixed(1)}s (${sceneDef.duration.toFixed(1)}s | ${totalFrames} frames @ ${FPS}fps)`);

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });
  await page.setContent(WORKER_HTML);

  // Spawn FFmpeg worker process with pipe input
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-framerate', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'veryfast',
    '-crf', '18',
    sceneOutPath
  ]);

  let ffmpegError = '';
  ffmpeg.stderr.on('data', data => {
    ffmpegError += data.toString();
  });

  const t0 = Date.now();
  let lastLog = 0;

  for (let frame = 0; frame < totalFrames; frame++) {
    const globalTime = startTime + (frame / FPS);

    await page.evaluate((time) => {
      window.renderer.renderAtTime(window.ctx, time, 1920, 1080, { showHUD: false });
    }, globalTime);

    const frameBuf = await page.screenshot({ type: 'jpeg', quality: 90 });
    ffmpeg.stdin.write(frameBuf);

    const now = Date.now();
    if (now - lastLog > 2000 || frame === totalFrames - 1) {
      lastLog = now;
      const pct = ((frame + 1) / totalFrames * 100).toFixed(1);
      const fpsReal = ((frame + 1) / ((now - t0) / 1000)).toFixed(1);
      process.stdout.write(`    ↳ Progress: ${pct}% (${frame + 1}/${totalFrames}) - ${fpsReal} fps\r`);
    }
  }

  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}: ${ffmpegError}`));
    });
  });

  await page.close();
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  const sizeMb = (fs.statSync(sceneOutPath).size / (1024 * 1024)).toFixed(2);
  console.log(`\n    ✔ Finished ${sceneDef.id}.mp4 in ${dt}s (${sizeMb} MB)`);

  return sceneOutPath;
}

async function main() {
  console.log('========================================================================');
  console.log('  CINEMATIC 3D MATHEMATICS EXPLAINER — GAUSSIAN ELIMINATION');
  console.log('  Full 5-Minute (300.0s) Timeline Exporter');
  console.log('========================================================================');
  console.log(`Resolution: ${WIDTH}x${HEIGHT} (1080p, 16:9)`);
  console.log(`Framerate:  ${FPS} fps (Cinematic film standard)`);
  console.log(`Total Dur:  ${timeline.project.totalDuration.toFixed(1)}s (Exact 5:00 minutes)`);
  console.log(`Output:     ${FINAL_MP4}\n`);

  const tStart = Date.now();

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    pipe: true,
    args: ['--headless=new', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const scenesToRender = targetSceneArg
    ? timeline.scenes.filter(s => s.id === targetSceneArg)
    : timeline.scenes;

  if (scenesToRender.length === 0) {
    console.error(`Error: Scene "${targetSceneArg}" not found in timeline.json`);
    await browser.close();
    process.exit(1);
  }

  // Parallel batch rendering using pool
  console.log(`Starting render with concurrency: ${CONCURRENCY} worker(s)...`);
  const queue = scenesToRender.map((scene, idx) => ({ scene, idx }));
  const workers = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      await renderScene(browser, item.scene, item.idx, scenesToRender.length);
    }
  });

  await Promise.all(workers);

  await browser.close();

  // If rendering all scenes, concatenate them into the master 5-minute video!
  if (!targetSceneArg) {
    console.log('\n========================================================================');
    console.log('  CONCATENATING SCENES INTO FINAL 5-MINUTE MP4');
    console.log('========================================================================');

    const concatTxtPath = path.join(OUTPUT_DIR, 'concat.txt');
    const concatContent = timeline.scenes
      .map(s => `file '${path.join(OUTPUT_DIR, s.id + '.mp4')}'`)
      .join('\n');

    fs.writeFileSync(concatTxtPath, concatContent);

    // Concat with FFmpeg
    execSync(`ffmpeg -y -f concat -safe 0 -i "${concatTxtPath}" -c copy "${FINAL_MP4}"`);

    // Probe duration and specs
    const probe = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${FINAL_MP4}"`).toString().trim();
    const finalSizeMb = (fs.statSync(FINAL_MP4).size / (1024 * 1024)).toFixed(2);
    const totalTime = ((Date.now() - tStart) / 1000).toFixed(1);

    console.log(`✔ Final MP4 Created: ${FINAL_MP4}`);
    console.log(`✔ Exact Video Duration: ${parseFloat(probe).toFixed(2)}s / 300.00s (Exact 5 minutes)`);
    console.log(`✔ File Size: ${finalSizeMb} MB`);
    console.log(`✔ Total Export Time: ${totalTime}s`);
    console.log('========================================================================\n');
  }
}

main().catch(err => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
