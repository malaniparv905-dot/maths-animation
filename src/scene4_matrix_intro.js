/**
 * scene4_matrix_intro.js - Introduce Gaussian Elimination (02:00 - 02:30)
 * 
 * Expanded Widescreen Layout (1600px width, generous padding, large bold typography).
 * Directly answers: "What is Gaussian Elimination actually?"
 * 1. The definition: transforming linear systems into an upper triangular staircase (Row Echelon Form).
 * 2. The 2 fundamental stages: Forward Elimination (creating zeros) and Back-Substitution (solving upwards).
 * 3. The machinery: The Augmented Matrix and Pivots.
 */

class Scene4MatrixIntro {
  constructor(config = {}) {
    this.config = config;
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 30.0 (Global 120.0 to 150.0)
    const t = Math.max(0, Math.min(30.0, time));

    // 1. Cyber Grid Background
    this.drawBackground(ctx, t, width, height);

    // 2. Phase 1: What is Gaussian Elimination Actually? (0.0 to 15.0s)
    if (t < 15.0) {
      this.drawWhatIsGaussianElimination(ctx, t, width, height);
    }
    // 3. Phase 2: How It Works: The Augmented Matrix & Pivots (15.0 to 30.0s)
    else {
      this.drawHowItWorksMachinery(ctx, t, width, height);
    }

    // 4. Header Track
    this.drawHeader(ctx, t, width, height);

    // 5. Transition to Scene 5 (28.5 to 30.0s)
    if (t >= 28.5) {
      const dissolve = (t - 28.5) / 1.5;
      ctx.fillStyle = `rgba(4, 7, 20, ${dissolve * 0.85})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawBackground(ctx, t, w, h) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#05091a');
    bgGrad.addColorStop(0.5, '#0a1434');
    bgGrad.addColorStop(1, '#030612');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Corner dot matrix grids
    ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
    for (let x = 60; x < 260; x += 22) {
      for (let y = 140; y < 360; y += 22) {
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    for (let x = w - 260; x < w - 60; x += 22) {
      for (let y = 140; y < 360; y += 22) {
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawHeader(ctx, t, w, h) {
    ctx.save();
    ctx.textAlign = 'center';

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('INTRODUCING GAUSSIAN ELIMINATION', w / 2, 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.letterSpacing = '0px';

    if (t < 15.0) {
      ctx.fillText('What Is Gaussian Elimination Actually?', w / 2, 92);
    } else {
      ctx.fillText('The Machinery: The Augmented Matrix & Pivots', w / 2, 92);
    }

    ctx.restore();
  }

  drawWhatIsGaussianElimination(ctx, t, w, h) {
    const ease = Math.min(1.0, t / 1.2);
    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Widescreen Container: 1620px width, 720px height
    const boxW = 1620;
    const boxH = 720;
    const bx = (w - boxW) / 2;
    const by = 135;

    // Outer Container
    ctx.fillStyle = 'rgba(8, 14, 32, 0.96)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.35)';
    ctx.shadowBlur = 24 * ease;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 20);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Top Section: The Direct Definition
    const defH = 125;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(bx + 25, by + 22, boxW - 50, defH, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('THE CORE DEFINITION', w / 2, by + 52);

    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText('Gaussian Elimination is a systematic algorithm that converts a system of linear equations', w / 2, by + 86);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('into an Upper Triangular “Staircase” (Row Echelon Form) so it can be easily solved from the bottom up.', w / 2, by + 118);

    // Middle Section: The Two Stages of the Algorithm
    const stageY = by + 165;
    const stageH = 405;
    const colW = (boxW - 70) / 2;
    const col1X = bx + 25;
    const col2X = bx + 45 + colW;

    // Stage 1: Forward Elimination
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(col1X, stageY, colW, stageH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('STAGE 1: FORWARD ELIMINATION', col1X + 28, stageY + 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText('Create the Triangular Staircase of Zeros', col1X + 28, stageY + 74);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '17px "Inter", sans-serif';
    this.drawWrappedText(ctx, 'Using valid row operations, we systematically eliminate variables below the diagonal until the bottom equation has only ONE unknown left.', col1X + 28, stageY + 112, colW - 56, 26);

    // Mini Staircase Schematic Box (Large & Spacious)
    ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(col1X + 28, stageY + 185, colW - 56, 190, 12);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Row 1:  [  1   1   0  |  5  ]   ⟶   3 unknowns (x, y, z)', col1X + 50, stageY + 235);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Row 2:  [  0   1  -1  | -3  ]   ⟶   2 unknowns (y, z)', col1X + 50, stageY + 285);
    ctx.fillStyle = '#00f59b';
    ctx.fillText('Row 3:  [  0   0   1  |  5  ]   ⟶   1 unknown (z = 5!)', col1X + 50, stageY + 335);

    // Stage 2: Back-Substitution
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(col2X, stageY, colW, stageH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('STAGE 2: BACK-SUBSTITUTION', col2X + 28, stageY + 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText('Solve Upwards from the Bottom', col2X + 28, stageY + 74);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '17px "Inter", sans-serif';
    this.drawWrappedText(ctx, 'Once the staircase is built, solving the system is effortless: read the bottom answer and substitute upward like a chain of falling dominoes!', col2X + 28, stageY + 112, colW - 56, 26);

    // Back-sub schematic Box (Large & Spacious)
    ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
    ctx.strokeStyle = 'rgba(0, 245, 155, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(col2X + 28, stageY + 185, colW - 56, 190, 12);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00f59b';
    ctx.fillText('1. Bottom row reveals:  z = ₹5  (Sandwich price)', col2X + 50, stageY + 235);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('2. Plug z into Row 2:   y - 5 = -3   ⟹   y = ₹2 (Tea)', col2X + 50, stageY + 285);
    ctx.fillStyle = '#ffd166';
    ctx.fillText('3. Plug y into Row 1:   x + 2 = 5    ⟹   x = ₹3 (Coffee)', col2X + 50, stageY + 335);

    // Bottom Summary Banner
    const bannerY = by + stageH + 185;
    ctx.fillStyle = 'rgba(12, 22, 48, 0.95)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(bx + 25, bannerY, boxW - 50, 85, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText('“Gaussian Elimination replaces human guessing with a 2-stage assembly line:”', w / 2, bannerY + 34);
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('1. Forward Elimination to build the staircase   ⟶   2. Back-Substitution to read the answers.', w / 2, bannerY + 65);

    ctx.restore();
  }

  drawHowItWorksMachinery(ctx, t, w, h) {
    const ease = Math.min(1.0, (t - 15.0) / 1.2);
    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Widescreen Layout
    const eqX = w * 0.27;
    const matX = w * 0.73;
    const cy = h * 0.42;

    const boxW = 580;
    const boxH = 360;

    // Equations Container (Large & Comfortable)
    ctx.fillStyle = 'rgba(8, 14, 32, 0.95)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(eqX - boxW / 2, cy - boxH / 2, boxW, boxH, 18);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillText('EQUATIONS (CLUTTERED NOTATION)', eqX - boxW / 2 + 35, cy - boxH / 2 + 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "JetBrains Mono", monospace';
    ctx.fillText('1x  +  1y  +  0z  =  5', eqX - boxW / 2 + 50, cy - 35);
    ctx.fillText('1x  +  0y  +  1z  =  8', eqX - boxW / 2 + 50, cy + 30);
    ctx.fillText('0x  +  1y  +  1z  =  7', eqX - boxW / 2 + 50, cy + 95);

    // Center Transform Arrow (Bold & Glowing)
    const midX = w / 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(midX - 50, cy);
    ctx.lineTo(midX + 50, cy);
    ctx.lineTo(midX + 30, cy - 18);
    ctx.moveTo(midX + 50, cy);
    ctx.lineTo(midX + 30, cy + 18);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('STRIP VARIABLES', midX, cy - 30);
    ctx.fillStyle = '#ffd166';
    ctx.fillText('ISOLATE COEFFICIENTS', midX, cy + 42);

    // Right: Clean Augmented Matrix (Large & Prominent)
    this.drawMatrix(ctx, matX, cy, [
      [1, 1, 0, 5],
      [1, 0, 1, 8],
      [0, 1, 1, 7]
    ]);

    // Bottom explanation (Full 1620px Width)
    const bannerY = h * 0.70;
    const bannerW = 1620;
    ctx.fillStyle = 'rgba(8, 14, 32, 0.96)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.25)';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.roundRect((w - bannerW) / 2, bannerY, bannerW, 160, 18);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('THE TWO ESSENTIAL BUILDING BLOCKS OF GAUSSIAN ELIMINATION:', (w - bannerW) / 2 + 40, bannerY + 38);

    // Concept 1: Augmented Matrix
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText('1. The Augmented Matrix:', (w - bannerW) / 2 + 40, bannerY + 78);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText('Strips away redundant letters (x, y, z) and signs, organizing values into rows (equations) and columns (variables).', (w - bannerW) / 2 + 270, bannerY + 78);

    // Concept 2: The Pivot
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText('2. The Pivot (Leading Entry):', (w - bannerW) / 2 + 40, bannerY + 120);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText('The active nonzero anchor in each row used to eliminate all numbers directly below it, building the staircase.', (w - bannerW) / 2 + 305, bannerY + 120);

    ctx.restore();
  }

  drawMatrix(ctx, cx, cy, matrix) {
    const mW = 540;
    const mH = 360;
    const mx = cx - mW / 2;
    const my = cy - mH / 2;

    ctx.save();
    ctx.fillStyle = 'rgba(8, 14, 32, 0.95)';
    ctx.beginPath();
    ctx.roundRect(mx, my, mW, mH, 16);
    ctx.fill();

    // Cyan brackets (Thick & Glowing)
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 18;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 5;

    const bW = 32;
    ctx.beginPath();
    ctx.moveTo(mx + bW, my); ctx.lineTo(mx, my); ctx.lineTo(mx, my + mH); ctx.lineTo(mx + bW, my + mH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mx + mW - bW, my); ctx.lineTo(mx + mW, my); ctx.lineTo(mx + mW, my + mH); ctx.lineTo(mx + mW - bW, my + mH);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Divider
    const sepX = mx + mW * 0.73;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sepX, my + 20);
    ctx.lineTo(sepX, my + mH - 20);
    ctx.stroke();

    // Headers
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('x  (Col 1)', mx + mW * 0.16, my - 14);
    ctx.fillText('y  (Col 2)', mx + mW * 0.35, my - 14);
    ctx.fillText('z  (Col 3)', mx + mW * 0.54, my - 14);
    ctx.fillText('Totals', mx + mW * 0.86, my - 14);

    // Matrix numbers (Large & Bold)
    const colXs = [mx + mW * 0.16, mx + mW * 0.35, mx + mW * 0.54, mx + mW * 0.86];
    const rowYs = [my + mH * 0.28, my + mH * 0.55, my + mH * 0.82];

    // Highlight Pivot 1 at [0, 0]
    ctx.fillStyle = 'rgba(255, 209, 102, 0.25)';
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(colXs[0] - 32, rowYs[0] - 40, 64, 55, 8);
    ctx.fill();
    ctx.stroke();

    // Pivot 1 label
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText('PIVOT 1', colXs[0], rowYs[0] + 28);

    ctx.font = 'bold 42px "JetBrains Mono", monospace';
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const val = matrix[r][c];
        ctx.fillStyle = (r === 0 && c === 0) ? '#ffd166' : c === 3 ? '#38bdf8' : val === 0 ? '#64748b' : '#ffffff';
        ctx.fillText(String(val), colXs[c], rowYs[r]);
      }
    }
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
  module.exports = Scene4MatrixIntro;
}
