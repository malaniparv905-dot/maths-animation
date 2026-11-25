/**
 * math3d.js - Precision 3D Euclidean Mathematics & Projection Engine
 * Built for Cinematic Mathematics Visualization
 */

class Math3D {
  static vec3(x = 0, y = 0, z = 0) {
    return { x, y, z };
  }

  static add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
  }

  static sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
  }

  static scale(v, s) {
    return { x: v.x * s, y: v.y * s, z: v.z * s };
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static cross(a, b) {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    };
  }

  static length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  static normalize(v) {
    const len = Math3D.length(v);
    if (len === 0) return { x: 0, y: 0, z: 0 };
    return { x: v.x / len, y: v.y / len, z: v.z / len };
  }

  static lerp(a, b, t) {
    return a + (b - a) * t;
  }

  static lerpVec3(a, b, t) {
    return {
      x: Math3D.lerp(a.x, b.x, t),
      y: Math3D.lerp(a.y, b.y, t),
      z: Math3D.lerp(a.z, b.z, t)
    };
  }

  static smoothstep(t) {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped * clamped * (3 - 2 * clamped);
  }

  static easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Perspective Camera Projection
   * Transforms world (x,y,z) to screen (sx, sy, depth)
   */
  static project(point, camera, width = 1920, height = 1080) {
    // Camera basis vectors
    const forward = Math3D.normalize(Math3D.sub(camera.target, camera.pos));
    const worldUp = { x: 0, y: 1, z: 0 };
    let right = Math3D.cross(forward, worldUp);
    if (Math3D.length(right) < 0.001) {
      right = { x: 1, y: 0, z: 0 };
    } else {
      right = Math3D.normalize(right);
    }
    const up = Math3D.cross(right, forward);

    // Vector from camera to point
    const pRel = Math3D.sub(point, camera.pos);

    // Camera space coordinates
    const cz = Math3D.dot(pRel, forward);
    if (cz <= 0.1) {
      return { sx: -9999, sy: -9999, depth: -1, visible: false };
    }

    const cx = Math3D.dot(pRel, right);
    const cy = Math3D.dot(pRel, up);

    // Perspective projection
    const fovRad = (camera.fov * Math.PI) / 180;
    const f = 1 / Math.tan(fovRad / 2);
    const aspect = width / height;

    const ndcX = (cx / cz) * (f / aspect);
    const ndcY = (cy / cz) * f;

    const sx = (ndcX * 0.5 + 0.5) * width;
    const sy = (-ndcY * 0.5 + 0.5) * height; // Invert Y for screen coordinates

    return { sx, sy, depth: cz, visible: true };
  }

  /**
   * Generate 3D Plane Mesh Vertices
   * Solves ax + by + cz = d within bounds [min, max]
   */
  static generatePlaneVertices(normal, d, xRange = [-2, 8], yRange = [-2, 8], zRange = [-2, 10]) {
    // Normal: [a, b, c], d: scalar
    const { x: a, y: b, z: c } = normal;
    const vertices = [];

    // Case 1: c == 0 (e.g. x + y = 5) -> Plane is parallel to Z axis!
    if (Math.abs(c) < 1e-4) {
      // Line in XY: a*x + b*y = d
      // Find two endpoints within XY bounds
      let ptsXY = [];
      if (Math.abs(b) > 1e-4) {
        // y = (d - a*x)/b
        const y1 = (d - a * xRange[0]) / b;
        const y2 = (d - a * xRange[1]) / b;
        ptsXY = [
          { x: xRange[0], y: y1 },
          { x: xRange[1], y: y2 }
        ];
      } else {
        // x = d/a
        const x = d / a;
        ptsXY = [
          { x: x, y: yRange[0] },
          { x: x, y: yRange[1] }
        ];
      }

      // Extrude along Z
      return [
        { x: ptsXY[0].x, y: ptsXY[0].y, z: zRange[0] },
        { x: ptsXY[1].x, y: ptsXY[1].y, z: zRange[0] },
        { x: ptsXY[1].x, y: ptsXY[1].y, z: zRange[1] },
        { x: ptsXY[0].x, y: ptsXY[0].y, z: zRange[1] }
      ];
    }

    // Case 2: b == 0 (e.g. x + z = 8) -> Plane is parallel to Y axis!
    if (Math.abs(b) < 1e-4) {
      // Line in XZ: a*x + c*z = d => z = (d - a*x)/c
      const z1 = (d - a * xRange[0]) / c;
      const z2 = (d - a * xRange[1]) / c;
      return [
        { x: xRange[0], y: yRange[0], z: z1 },
        { x: xRange[1], y: yRange[0], z: z2 },
        { x: xRange[1], y: yRange[1], z: z2 },
        { x: xRange[0], y: yRange[1], z: z1 }
      ];
    }

    // Case 3: a == 0 (e.g. y + z = 7) -> Plane is parallel to X axis!
    if (Math.abs(a) < 1e-4) {
      // Line in YZ: b*y + c*z = d => z = (d - b*y)/c
      const z1 = (d - b * yRange[0]) / c;
      const z2 = (d - b * yRange[1]) / c;
      return [
        { x: xRange[0], y: yRange[0], z: z1 },
        { x: xRange[1], y: yRange[0], z: z1 },
        { x: xRange[1], y: yRange[1], z: z2 },
        { x: xRange[0], y: yRange[1], z: z2 }
      ];
    }

    // General case: z = (d - a*x - b*y)/c
    return [
      { x: xRange[0], y: yRange[0], z: (d - a * xRange[0] - b * yRange[0]) / c },
      { x: xRange[1], y: yRange[0], z: (d - a * xRange[1] - b * yRange[0]) / c },
      { x: xRange[1], y: yRange[1], z: (d - a * xRange[1] - b * yRange[1]) / c },
      { x: xRange[0], y: yRange[1], z: (d - a * xRange[0] - b * yRange[1]) / c }
    ];
  }

  /**
   * Draw 3D Coordinate Grid & Axes
   */
  static drawCoordinateFrame(ctx, camera, width, height, alpha = 1.0) {
    if (alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = alpha;

    // Origin
    const origin = { x: 0, y: 0, z: 0 };
    const pOrigin = Math3D.project(origin, camera, width, height);

    // Floor Grid (XZ plane at y=0)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = -2; x <= 8; x += 2) {
      const p1 = Math3D.project({ x, y: 0, z: -2 }, camera, width, height);
      const p2 = Math3D.project({ x, y: 0, z: 10 }, camera, width, height);
      if (p1.visible && p2.visible) {
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
    }
    for (let z = -2; z <= 10; z += 2) {
      const p1 = Math3D.project({ x: -2, y: 0, z }, camera, width, height);
      const p2 = Math3D.project({ x: 8, y: 0, z }, camera, width, height);
      if (p1.visible && p2.visible) {
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
    }

    // Axes
    const axes = [
      { name: 'X', end: { x: 8, y: 0, z: 0 }, color: '#00f0ff', label: 'X (Coffee)' },
      { name: 'Y', end: { x: 0, y: 8, z: 0 }, color: '#9d4edd', label: 'Y (Tea)' },
      { name: 'Z', end: { x: 0, y: 0, z: 10 }, color: '#ff9e00', label: 'Z (Sandwich)' }
    ];

    axes.forEach(axis => {
      const pEnd = Math3D.project(axis.end, camera, width, height);
      if (pOrigin.visible && pEnd.visible) {
        // Glow
        ctx.shadowColor = axis.color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = axis.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(pOrigin.sx, pOrigin.sy);
        ctx.lineTo(pEnd.sx, pEnd.sy);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = axis.color;
        ctx.font = 'bold 18px "Inter", sans-serif';
        ctx.fillText(axis.label, pEnd.sx + 8, pEnd.sy - 8);

        // Arrow head
        const dir = Math3D.normalize(Math3D.sub(axis.end, origin));
        const pArrow1 = Math3D.project(Math3D.add(axis.end, Math3D.scale(dir, -0.5)), camera, width, height);
        if (pArrow1.visible) {
          ctx.beginPath();
          ctx.arc(pEnd.sx, pEnd.sy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    ctx.restore();
  }

  /**
   * Draw Translucent 3D Plane with Glowing Borders
   */
  static drawPlane(ctx, camera, plane, width, height, progress = 1.0) {
    if (progress <= 0) return;
    const normal = Math3D.vec3(plane.normal[0], plane.normal[1], plane.normal[2]);
    const verts = Math3D.generatePlaneVertices(normal, plane.d);

    // Animate scale/appearance
    const center = verts.reduce((acc, v) => ({ x: acc.x + v.x / 4, y: acc.y + v.y / 4, z: acc.z + v.z / 4 }), { x: 0, y: 0, z: 0 });
    const animVerts = verts.map(v => Math3D.lerpVec3(center, v, Math3D.smoothstep(progress)));

    const proj = animVerts.map(v => Math3D.project(v, camera, width, height));
    if (!proj.every(p => p.visible)) return;

    ctx.save();
    // Fill translucent polygon
    ctx.beginPath();
    ctx.moveTo(proj[0].sx, proj[0].sy);
    for (let i = 1; i < proj.length; i++) {
      ctx.lineTo(proj[i].sx, proj[i].sy);
    }
    ctx.closePath();

    ctx.fillStyle = plane.color;
    ctx.fill();

    // Glowing border
    ctx.shadowColor = plane.border;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = plane.border;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Plane Equation Tag in 3D
    const tagPos = Math3D.project(center, camera, width, height);
    if (tagPos.visible && progress > 0.6) {
      const tagAlpha = Math3D.smoothstep((progress - 0.6) / 0.4);
      ctx.globalAlpha = tagAlpha;
      ctx.fillStyle = 'rgba(5, 10, 25, 0.85)';
      ctx.strokeStyle = plane.border;
      ctx.lineWidth = 1.5;
      const text = plane.eq;
      ctx.font = 'bold 16px "JetBrains Mono", monospace';
      const tw = ctx.measureText(text).width + 24;
      ctx.beginPath();
      ctx.roundRect(tagPos.sx - tw / 2, tagPos.sy - 16, tw, 32, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, tagPos.sx, tagPos.sy);
    }

    ctx.restore();
  }

  /**
   * Draw Intersection Point (3, 2, 5) with Drop-Lines
   */
  static drawIntersectionPoint(ctx, camera, pt, width, height, progress = 1.0) {
    if (progress <= 0) return;
    const p3D = Math3D.vec3(pt.x, pt.y, pt.z);
    const proj = Math3D.project(p3D, camera, width, height);
    if (!proj.visible) return;

    ctx.save();
    const anim = Math3D.smoothstep(progress);

    // Drop lines to axes
    const pFloor = Math3D.project({ x: pt.x, y: 0, z: pt.z }, camera, width, height);
    const pX = Math3D.project({ x: pt.x, y: 0, z: 0 }, camera, width, height);
    const pY = Math3D.project({ x: 0, y: pt.y, z: 0 }, camera, width, height);
    const pZ = Math3D.project({ x: 0, y: 0, z: pt.z }, camera, width, height);

    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.8;

    // Line to floor (Y drop)
    ctx.strokeStyle = 'rgba(157, 78, 221, 0.8)';
    ctx.beginPath();
    ctx.moveTo(proj.sx, proj.sy);
    ctx.lineTo(pFloor.sx, pFloor.sy);
    ctx.stroke();

    // Line from floor to X axis
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.beginPath();
    ctx.moveTo(pFloor.sx, pFloor.sy);
    ctx.lineTo(pX.sx, pX.sy);
    ctx.stroke();

    // Line from floor to Z axis
    ctx.strokeStyle = 'rgba(255, 158, 0, 0.8)';
    ctx.beginPath();
    ctx.moveTo(pFloor.sx, pFloor.sy);
    ctx.lineTo(pZ.sx, pZ.sy);
    ctx.stroke();

    ctx.setLineDash([]);

    // Glowing point indicator
    const pulse = 1 + 0.15 * Math.sin(Date.now() / 200);
    const radius = 9 * anim * pulse;

    // Multi-layer bloom
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(proj.sx, proj.sy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(proj.sx, proj.sy, radius + 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Coordinate Callout Badge
    if (anim > 0.5) {
      const badgeAlpha = (anim - 0.5) / 0.5;
      ctx.globalAlpha = badgeAlpha;
      const badgeX = proj.sx + 24;
      const badgeY = proj.sy - 30;

      ctx.fillStyle = 'rgba(4, 9, 22, 0.92)';
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, 190, 72, 8);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.fillText('COMMON SOLUTION', badgeX + 14, badgeY + 24);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillText(`(x:3, y:2, z:5)`, badgeX + 14, badgeY + 52);
    }

    ctx.restore();
  }

  /**
   * Render Rounded 3D Math Operator Block (Reference Image 2 Style)
   */
  static drawOperatorBlock(ctx, x, y, size, symbol, colorHex, glowColor, progress = 1.0) {
    ctx.save();
    ctx.translate(x, y);
    const s = size * progress;

    // Outer glow
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 24 * progress;

    // Block body (Rounded bevel rectangle)
    const rad = s * 0.22;
    ctx.beginPath();
    ctx.roundRect(-s / 2, -s / 2, s, s, rad);

    // Gradient fill for 3D depth
    const grad = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.18, colorHex);
    grad.addColorStop(1, '#080d1a');
    ctx.fillStyle = grad;
    ctx.fill();

    // Top highlight rim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner bevel
    ctx.beginPath();
    ctx.roundRect(-s / 2 + 3, -s / 2 + 3, s - 6, s - 6, rad - 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Symbol (+, -, ×, ÷, =)
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(s * 0.55)}px "Inter", sans-serif`;
    ctx.fillText(symbol, 0, 0);

    ctx.restore();
  }
}

globalThis.Math3D = Math3D;
if (typeof module !== 'undefined') {
  module.exports = Math3D;
}
