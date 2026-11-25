/**
 * scene6_graph_bridge.js - Return to the Geometry (04:30 - 04:45 = 15s)
 * Shows that while equations were simplified, the 3D intersection point never moved.
 */

if (typeof globalThis.Math3D === 'undefined' && typeof require !== 'undefined') {
  globalThis.Math3D = require('./math3d');
}

class Scene6GraphBridge {
  constructor(config = {}) {
    this.config = config;
    this.solutionPoint = { x: 3, y: 2, z: 5 };

    this.orthogonalPlanes = [
      { id: 'ox', eq: 'x = 3', normal: [1, 0, 0], d: 3, color: 'rgba(0, 240, 255, 0.44)', border: '#00f0ff' },
      { id: 'oy', eq: 'y = 2', normal: [0, 1, 0], d: 2, color: 'rgba(157, 78, 221, 0.44)', border: '#9d4edd' },
      { id: 'oz', eq: 'z = 5', normal: [0, 0, 1], d: 5, color: 'rgba(0, 245, 155, 0.44)', border: '#00f59b' }
    ];

    this.originalPlanes = [
      { id: 'p1', eq: 'x + y = 5', normal: [1, 1, 0], d: 5, color: 'rgba(0, 240, 255, 0.14)', border: 'rgba(0, 240, 255, 0.4)' },
      { id: 'p2', eq: 'x + z = 8', normal: [1, 0, 1], d: 8, color: 'rgba(157, 78, 221, 0.14)', border: 'rgba(157, 78, 221, 0.4)' },
      { id: 'p3', eq: 'y + z = 7', normal: [0, 1, 1], d: 7, color: 'rgba(255, 158, 0, 0.14)', border: 'rgba(255, 158, 0, 0.4)' }
    ];
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 15.0 (Global 270.0 to 285.0)
    const t = Math.max(0, Math.min(15.0, time));

    // Smooth Orbiting Camera around (3, 2, 5)
    const orbitAngle = 1.3 + t * 0.06;
    const orbitDist = 17.5;
    const camHeight = 9.5 + Math.sin(t * 0.08) * 1.5;

    const camera = {
      pos: {
        x: this.solutionPoint.x + Math.sin(orbitAngle) * orbitDist,
        y: camHeight,
        z: this.solutionPoint.z + Math.cos(orbitAngle) * orbitDist
      },
      target: { x: 3, y: 2, z: 5 },
      fov: 42
    };

    // 1. Deep Space Background
    this.drawBackground(ctx, width, height);

    // 2. 3D Coordinate Grid
    Math3D.drawCoordinateFrame(ctx, camera, width, height, 1.0);

    // 3. Render Original Ghost Planes
    ctx.save();
    ctx.globalAlpha = 0.55;
    this.originalPlanes.forEach(plane => {
      Math3D.drawPlane(ctx, camera, plane, width, height, 1.0);
    });
    ctx.restore();

    // 4. Render Simplified Orthogonal Planes
    this.orthogonalPlanes.forEach(plane => {
      Math3D.drawPlane(ctx, camera, plane, width, height, 1.0);
    });

    // 5. Highlight Intersection Point (3, 2, 5)
    Math3D.drawIntersectionPoint(ctx, camera, this.solutionPoint, width, height, 1.0);

    // 6. Educational Invariance HUD
    this.drawHUD(ctx, t, width, height);

    // 7. Transition to Scene 7 (13.5 to 15.0s)
    if (t >= 13.5) {
      const dissolve = (t - 13.5) / 1.5;
      ctx.fillStyle = `rgba(4, 7, 20, ${dissolve * 0.85})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawBackground(ctx, w, h) {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#0c1630');
    bgGrad.addColorStop(0.55, '#050a18');
    bgGrad.addColorStop(1, '#02040a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
  }

  drawHUD(ctx, t, w, h) {
    ctx.save();
    ctx.textAlign = 'center';

    // Header
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('RETURN TO THE GEOMETRY', w / 2, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Inter", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('The Equations Changed. The Solution Did Not.', w / 2, 85);

    // Bottom Banner (Spacious Widescreen)
    const bannerW = 1480;
    const bannerH = 130;
    const bx = (w - bannerW) / 2;
    const by = h * 0.77;

    ctx.fillStyle = 'rgba(7, 13, 30, 0.95)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f59b';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.roundRect(bx, by, bannerW, bannerH, 16);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('GEOMETRIC INVARIANCE OF GAUSSIAN ELIMINATION', w / 2, by + 36);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('Original tilted planes decoupled into simple perpendicular planes: x = 3,  y = 2,  z = 5', w / 2, by + 74);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('Their common intersection point remains strictly unchanged at (3, 2, 5)!', w / 2, by + 106);

    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = Scene6GraphBridge;
}
