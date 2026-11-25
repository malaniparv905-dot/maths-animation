/**
 * scene3_geometry3d.js - Understanding the Geometry (01:20 - 02:00)
 * Visualizing why solving linear equations is identical to finding 3D plane intersections.
 * Intersects mathematically at (x, y, z) = (3, 2, 5).
 */

if (typeof globalThis.Math3D === 'undefined' && typeof require !== 'undefined') {
  globalThis.Math3D = require('./math3d');
}

class Scene3Geometry3D {
  constructor(config = {}) {
    this.config = config;
    this.solutionPoint = { x: 3, y: 2, z: 5 };

    this.planes = [
      {
        id: 'p1',
        eq: 'x + y = 5',
        normal: [1, 1, 0],
        d: 5,
        color: 'rgba(0, 240, 255, 0.42)',
        border: '#00f0ff',
        entryTime: 4.0,
        label: 'Plane 1: x + y = 5 (Coffee + Tea)'
      },
      {
        id: 'p2',
        eq: 'x + z = 8',
        normal: [1, 0, 1],
        d: 8,
        color: 'rgba(157, 78, 221, 0.42)',
        border: '#9d4edd',
        entryTime: 14.0,
        label: 'Plane 2: x + z = 8 (Coffee + Sandwich)'
      },
      {
        id: 'p3',
        eq: 'y + z = 7',
        normal: [0, 1, 1],
        d: 7,
        color: 'rgba(255, 158, 0, 0.42)',
        border: '#ff9e00',
        entryTime: 23.0,
        label: 'Plane 3: y + z = 7 (Tea + Sandwich)'
      }
    ];
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 40.0 (Global 80.0 to 120.0)
    const t = Math.max(0, Math.min(40.0, time));

    // Smooth Orbiting Camera around (3, 2, 5) with depth and perspective
    const orbitAngle = 0.8 + t * 0.045;
    const orbitDist = 18.5 - Math.sin(t * 0.05) * 1.5;
    const camHeight = 10.5 + Math.cos(t * 0.05) * 2.0;

    const camera = {
      pos: {
        x: this.solutionPoint.x + Math.sin(orbitAngle) * orbitDist,
        y: camHeight,
        z: this.solutionPoint.z + Math.cos(orbitAngle) * orbitDist
      },
      target: { x: 3, y: 2.2, z: 5 },
      fov: 46
    };

    // 1. Deep Space Euclidean Background
    this.drawBackground(ctx, width, height);

    // 2. 3D Coordinate Grid & Calibrated XYZ Axes
    Math3D.drawCoordinateFrame(ctx, camera, width, height, 1.0);

    // 3. Render 3D Planes
    this.planes.forEach(plane => {
      if (t >= plane.entryTime) {
        const pProg = Math.min(1.0, (t - plane.entryTime) / 2.0);
        Math3D.drawPlane(ctx, camera, plane, width, height, pProg);
      }
    });

    // 4. Highlight Line of Intersection between Plane 1 & 2 (t >= 16.0s)
    if (t >= 16.0) {
      this.drawLineOfIntersection(ctx, camera, t, width, height);
    }

    // 5. Highlight Unique Triple Intersection Point (3, 2, 5) (t >= 26.0s)
    if (t >= 26.0) {
      const ptProgress = Math.min(1.0, (t - 26.0) / 2.0);
      Math3D.drawIntersectionPoint(ctx, camera, this.solutionPoint, width, height, ptProgress);
    }

    // 6. Educational HUD
    this.drawHUD(ctx, t, width, height);

    // 7. Transition to Scene 4 (38.5 to 40.0s)
    if (t >= 38.5) {
      const dissolve = (t - 38.5) / 1.5;
      ctx.fillStyle = `rgba(4, 7, 20, ${dissolve * 0.85})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawBackground(ctx, w, h) {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 120, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#0c1630');
    bgGrad.addColorStop(0.55, '#050a18');
    bgGrad.addColorStop(1, '#02040a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
  }

  drawLineOfIntersection(ctx, camera, t, w, h) {
    // Direction vector of Plane 1 (1,1,0) x Plane 2 (1,0,1) is (1, -1, -1)
    const pA = Math3D.project({ x: 3 - 3.5, y: 2 + 3.5, z: 5 + 3.5 }, camera, w, h);
    const pB = Math3D.project({ x: 3 + 3.5, y: 2 - 3.5, z: 5 - 3.5 }, camera, w, h);

    if (pA.visible && pB.visible) {
      ctx.save();
      const lineAlpha = Math.min(1.0, (t - 16.0) / 1.5);
      ctx.globalAlpha = lineAlpha * (t > 28.0 ? 0.35 : 0.85);

      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(pA.sx, pA.sy);
      ctx.lineTo(pB.sx, pB.sy);
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (t < 26.0) {
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Line of Shared Solutions (Plane 1 ∩ Plane 2)', (pA.sx + pB.sx) / 2, (pA.sy + pB.sy) / 2 - 12);
      }
      ctx.restore();
    }
  }

  drawHUD(ctx, t, w, h) {
    ctx.save();
    ctx.textAlign = 'center';

    // Header
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('UNDERSTANDING THE 3D GEOMETRY', w / 2, 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "Inter", sans-serif';
    ctx.letterSpacing = '0px';

    if (t < 15.0) {
      ctx.fillText('Every Linear Equation Defines a Flat 2D Plane in 3D Space', w / 2, 85);
    } else if (t < 25.0) {
      ctx.fillText('Two Conditions Intersect Along a Continuous 1D Line', w / 2, 85);
    } else {
      ctx.fillText('Three Conditions Intersect at Exactly ONE Unique Common Point!', w / 2, 85);
    }

    // Bottom Educational Banner (Spacious Widescreen)
    const bannerW = 1440;
    const bannerH = 115;
    const bx = (w - bannerW) / 2;
    const by = h * 0.81;

    ctx.fillStyle = 'rgba(7, 14, 32, 0.95)';
    ctx.strokeStyle = t >= 26.0 ? '#00f59b' : '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = t >= 26.0 ? '#00f59b' : '#00f0ff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.roundRect(bx, by, bannerW, bannerH, 16);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = 'center';
    if (t < 26.0) {
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText('Geometric Meaning: Each equation restricts where our solution can live.', w / 2, by + 44);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px "Inter", sans-serif';
      ctx.fillText('Solving equations simultaneously means finding the spatial intersection shared by all three planes.', w / 2, by + 80);
    } else {
      ctx.fillStyle = '#00f59b';
      ctx.font = 'bold 24px "Inter", sans-serif';
      ctx.fillText('Point (3, 2, 5) lies on all three planes at the same time!', w / 2, by + 44);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "JetBrains Mono", monospace';
      ctx.fillText('Coffee = ₹3  |  Tea = ₹2  |  Sandwich = ₹5   ⟹   Solving IS Intersecting!', w / 2, by + 82);
    }

    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = Scene3Geometry3D;
}
