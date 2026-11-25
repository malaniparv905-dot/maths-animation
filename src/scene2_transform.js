/**
 * scene2_transform.js - Why We Need a Method (00:40 - 01:20)
 * 
 * Expanded Widescreen Layout (1620px width, generous padding, large bold typography).
 * Directly answers: "Can't we just use ordinary elimination?"
 * Core Reason: Manual elimination is impossible to manage when there are many unknowns!
 * Establishes the intellectual turning point of the film:
 * "We need a systematic way to simplify these equations without changing the answers they share."
 */

if (typeof globalThis.Math3D === 'undefined' && typeof require !== 'undefined') {
  globalThis.Math3D = require('./math3d');
}

class Scene2Transform {
  constructor(config = {}) {
    this.config = config;
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 40.0 (Global 40.0 to 80.0)
    const t = Math.max(0, Math.min(40.0, time));

    // 1. Deep Blue Blueprint Canvas Background
    this.drawBackground(ctx, t, width, height);

    // 2. Phase 1: The Guessing Trap (0.0 to 18.0s)
    if (t < 18.0) {
      this.drawGuessingTrap(ctx, t, width, height);
    }
    // 3. Phase 2: Why Ordinary Elimination Breaks Down with Many Unknowns (18.0 to 30.0s)
    else if (t < 30.0) {
      this.drawOrdinaryEliminationFails(ctx, t, width, height);
    }
    // 4. Phase 3: The Intellectual Turning Point (30.0 to 40.0s)
    else {
      this.drawTurningPoint(ctx, t, width, height);
    }

    // 5. Header Title Track
    this.drawHeader(ctx, t, width, height);

    // 6. Transition to Scene 3 (38.5 to 40.0s)
    if (t >= 38.5) {
      const dissolve = (t - 38.5) / 1.5;
      ctx.fillStyle = `rgba(4, 7, 20, ${dissolve * 0.85})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawBackground(ctx, t, w, h) {
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#0c1736');
    bgGrad.addColorStop(0.55, '#070e24');
    bgGrad.addColorStop(1, '#030510');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle technical grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  drawHeader(ctx, t, w, h) {
    ctx.save();
    ctx.textAlign = 'center';

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('WHY DO WE NEED A SYSTEMATIC METHOD?', w / 2, 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.letterSpacing = '0px';

    if (t < 18.0) {
      ctx.fillText('Attempting Solution by Guessing & Trial-and-Error', w / 2, 92);
    } else if (t < 30.0) {
      ctx.fillText('Why Manual Elimination Fails with Many Unknowns', w / 2, 92);
    } else {
      ctx.fillText('The Intellectual Turning Point', w / 2, 92);
    }

    ctx.restore();
  }

  drawGuessingTrap(ctx, t, w, h) {
    const ease = Math.min(1.0, t / 1.5);
    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Container: 1500px x 680px
    const boxW = 1500;
    const boxH = 680;
    const bx = (w - boxW) / 2;
    const by = 150;

    ctx.fillStyle = 'rgba(8, 14, 32, 0.96)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 20);
    ctx.fill();
    ctx.stroke();

    // Step 1: Hypothesis
    ctx.textAlign = 'left';
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('TRIAL 1 — INTUITIVE GUESS:', bx + 60, by + 65);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Inter", sans-serif';
    ctx.fillText('Suppose Coffee (x) = ₹4', bx + 60, by + 120);

    // Deduction 1
    if (t >= 2.5) {
      const p1 = Math.min(1.0, (t - 2.5) / 1.0);
      ctx.globalAlpha = p1;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px "Inter", sans-serif';
      ctx.fillText('1. From Order 1 (x + y = 5):', bx + 60, by + 195);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillText('4 + Tea = 5   ⟹   Tea (y) = ₹1', bx + 95, by + 245);
    }

    // Deduction 2
    if (t >= 6.0) {
      const p2 = Math.min(1.0, (t - 6.0) / 1.0);
      ctx.globalAlpha = p2;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px "Inter", sans-serif';
      ctx.fillText('2. From Order 2 (x + z = 8):', bx + 60, by + 320);
      ctx.fillStyle = '#9d4edd';
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillText('4 + Sandwich = 8   ⟹   Sandwich (z) = ₹4', bx + 95, by + 370);
    }

    // The Conflict / Test on Order 3
    if (t >= 9.5) {
      const p3 = Math.min(1.0, (t - 9.5) / 1.0);
      ctx.globalAlpha = p3;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px "Inter", sans-serif';
      ctx.fillText('3. Test against Order 3 (y + z must equal ₹7):', bx + 60, by + 445);

      ctx.fillStyle = '#ff3b5c';
      ctx.font = 'bold 36px "JetBrains Mono", monospace';
      ctx.fillText('y + z  =  1 + 4  =  ₹5   ≠   ₹7 !', bx + 95, by + 505);

      // Conflict Alert Badge (Large & Prominent)
      ctx.fillStyle = 'rgba(255, 59, 92, 0.2)';
      ctx.strokeStyle = '#ff3b5c';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(bx + 60, by + 560, boxW - 120, 75, 12);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ff3b5c';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText('❌ GUESS FAILED: Satisfying two conditions broke the third! Variables are interdependent.', bx + boxW / 2, by + 606);
    }

    ctx.restore();
  }

  drawOrdinaryEliminationFails(ctx, t, w, h) {
    const ease = Math.min(1.0, (t - 18.0) / 1.2);
    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Container: 1620px x 720px
    const boxW = 1620;
    const boxH = 720;
    const bx = (w - boxW) / 2;
    const by = 135;

    // Outer Container
    ctx.fillStyle = 'rgba(8, 14, 32, 0.96)';
    ctx.strokeStyle = '#9d4edd';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(157, 78, 221, 0.35)';
    ctx.shadowBlur = 24 * ease;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 20);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Header: The Crucial Question
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.letterSpacing = '1px';
    ctx.fillText('“CAN’T WE JUST USE ORDINARY HIGH-SCHOOL ELIMINATION?”', w / 2, by + 50);

    // Two Columns: Small Systems vs. Many Unknowns
    const colW = (boxW - 70) / 2;
    const col1X = bx + 25;
    const col2X = bx + 45 + colW;
    const cardsY = by + 80;
    const cardH = 440;

    // Col 1 Card: Small Systems (Works by Hand)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(col1X, cardsY, colW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('SMALL SYSTEMS (2 TO 3 UNKNOWNS)', col1X + 32, cardsY + 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.fillText('Elimination by Hand Works', col1X + 32, cardsY + 84);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '17px "Inter", sans-serif';
    ctx.fillText('• You can inspect 2 or 3 equations on paper and spot cancellations.', col1X + 32, cardsY + 130);
    ctx.fillText('• Subtracting Eq 1 from Eq 2 easily eliminates the x variable.', col1X + 32, cardsY + 168);
    ctx.fillText('• Feasible on scratch paper for small cafeteria combos.', col1X + 32, cardsY + 206);

    // Small equations pill (Large & Spacious)
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(col1X + 32, cardsY + 245, colW - 64, 150, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText('1) x + y     = 5', col1X + 55, cardsY + 295);
    ctx.fillText('2) x     + z = 8', col1X + 55, cardsY + 335);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('(1) − (2) ⟹ y − z = −3  (eliminates x!)', col1X + 55, cardsY + 372);

    // Col 2 Card: Many Unknowns (Completely Unmanageable)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = '#ff3b5c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(col2X, cardsY, colW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ff7b90';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('THE REALITY: MANY UNKNOWNS', col2X + 32, cardsY + 42);

    ctx.fillStyle = '#ff3b5c';
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.fillText('Manual Elimination is Unmanageable!', col2X + 32, cardsY + 84);

    const failPoints = [
      { t: '1. Combinatorial Explosion:', d: 'With 4, 10, or 50 unknowns, tracking combinations by hand becomes a tangled, confusing maze.' },
      { t: '2. High Risk of Circular Loops:', d: 'Haphazard combination easily re-introduces variables already eliminated or collapses into 0 = 0.' },
      { t: '3. Real Systems Have Thousands:', d: 'Robotics, GPS, circuits, and AI have 10 to 10,000+ unknowns — completely impossible by hand!' }
    ];

    let fy = cardsY + 130;
    failPoints.forEach(f => {
      ctx.fillStyle = '#ffd166';
      ctx.font = 'bold 17px "Inter", sans-serif';
      ctx.fillText(f.t, col2X + 32, fy);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px "Inter", sans-serif';
      this.drawWrappedText(ctx, f.d, col2X + 32, fy + 26, colW - 64, 24);
      fy += 85;
    });

    // Bottom Summary Banner (Large & Prominent)
    const bannerY = by + cardH + 115;
    ctx.fillStyle = 'rgba(12, 22, 48, 0.96)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(bx + 25, bannerY, boxW - 50, 95, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('CORE REASON: Manual elimination breaks down when unknowns multiply.', w / 2, bannerY + 40);

    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText('We need Gaussian Elimination — a standardized, non-circular algorithm that scales reliably to any size.', w / 2, bannerY + 74);

    ctx.restore();
  }

  drawTurningPoint(ctx, t, w, h) {
    const ease = Math.min(1.0, (t - 30.0) / 1.2);
    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Container: 1540px x 660px
    const boxW = 1540;
    const boxH = 660;
    const bx = (w - boxW) / 2;
    const by = 160;

    ctx.fillStyle = 'rgba(8, 14, 34, 0.96)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f59b';
    ctx.shadowBlur = 26 * ease;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 22);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = 'center';

    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('THE INTELLECTUAL TURNING POINT', w / 2, by + 75);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Inter", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('The Need for an Algorithmic Method', w / 2, by + 160);

    // Core Turning Point Sentences
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.fillText('“We need a systematic way to simplify these equations...”', w / 2, by + 280);

    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 42px "Inter", sans-serif';
    ctx.fillText('“...without changing the answers they share.”', w / 2, by + 370);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px "Inter", sans-serif';
    ctx.fillText('Before introducing the algorithm, what do these equations actually look like in 3D geometry?', w / 2, by + 490);

    ctx.restore();
  }

  drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
    return curY + lineHeight;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Scene2Transform;
}
