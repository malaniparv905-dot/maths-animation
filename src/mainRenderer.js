/**
 * mainRenderer.js - Master Timeline Video Orchestrator
 * Integrates timeline.json and all 7 scene renderers
 */

const _S1 = typeof Scene1Cafeteria !== 'undefined' ? Scene1Cafeteria : require('./scene1_cafeteria');
const _S2 = typeof Scene2Transform !== 'undefined' ? Scene2Transform : require('./scene2_transform');
const _S3 = typeof Scene3Geometry3D !== 'undefined' ? Scene3Geometry3D : require('./scene3_geometry3d');
const _S4 = typeof Scene4MatrixIntro !== 'undefined' ? Scene4MatrixIntro : require('./scene4_matrix_intro');
const _S5 = typeof Scene5Elimination !== 'undefined' ? Scene5Elimination : require('./scene5_elimination');
const _S6 = typeof Scene6GraphBridge !== 'undefined' ? Scene6GraphBridge : require('./scene6_graph_bridge');
const _S7 = typeof Scene7Staircase !== 'undefined' ? Scene7Staircase : require('./scene7_staircase');

class MainRenderer {
  constructor(timelineConfig) {
    this.timeline = timelineConfig;
    this.width = timelineConfig.project.resolution.width || 1920;
    this.height = timelineConfig.project.resolution.height || 1080;
    this.totalDuration = timelineConfig.project.totalDuration || 300.0;

    // Instantiate scene handlers
    this.scenes = {
      scene1: new _S1(timelineConfig.scenes[0]),
      scene2: new _S2(timelineConfig.scenes[1]),
      scene3: new _S3(timelineConfig.scenes[2]),
      scene4: new _S4(timelineConfig.scenes[3]),
      scene5: new _S5(timelineConfig.scenes[4]),
      scene6: new _S6(timelineConfig.scenes[5]),
      scene7: new _S7(timelineConfig.scenes[6])
    };
  }

  /**
   * Render frame at exact global timestamp t in [0.0, 300.0]
   */
  renderAtTime(ctx, globalTime, width = this.width, height = this.height, options = {}) {
    const t = Math.max(0, Math.min(this.totalDuration, globalTime));

    // Clear canvas
    ctx.fillStyle = '#050814';
    ctx.fillRect(0, 0, width, height);

    // Find current active scene
    let currentSceneDef = this.timeline.scenes.find(s => t >= s.startTime && t < s.endTime);
    if (!currentSceneDef) {
      currentSceneDef = this.timeline.scenes[this.timeline.scenes.length - 1];
    }

    const localTime = t - currentSceneDef.startTime;
    const sceneInstance = this.scenes[currentSceneDef.id];

    if (sceneInstance && typeof sceneInstance.render === 'function') {
      sceneInstance.render(ctx, localTime, width, height);
    }

    // Optional Timecode HUD (for editor scrubbing)
    if (options.showHUD) {
      this.drawHUD(ctx, t, currentSceneDef, width, height);
    }
  }

  drawHUD(ctx, globalTime, sceneDef, w, h) {
    ctx.save();
    const minutes = Math.floor(globalTime / 60);
    const seconds = Math.floor(globalTime % 60);
    const millis = Math.floor((globalTime % 1) * 100);
    const tc = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(2, '0')} / 05:00.00`;

    // Timecode box top right
    ctx.fillStyle = 'rgba(5, 10, 24, 0.85)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(w - 380, 20, 350, 50, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(tc, w - 205, 52);

    // Scene name tag bottom left
    ctx.fillStyle = 'rgba(5, 10, 24, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.roundRect(30, h - 65, 420, 40, 8);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText(`${sceneDef.name} (${sceneDef.id.toUpperCase()})`, 48, h - 40);

    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = MainRenderer;
}
