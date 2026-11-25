/**
 * scene5_elimination.js - The Teaching Masterclass (02:30 - 04:30)
 * 
 * Major Pedagogical Upgrade:
 * 1. Introduces 3 Elementary Row Operations with the core principle:
 *    "We are not changing the answer to the system. We are changing the way the system is written so it becomes easier to solve."
 * 2. Active Learning Moments (3 Think Moments with 2.5s thinking countdown):
 *    - Think Moment 1: Choosing the row operation below Pivot 1 (R2 - R1)
 *    - Think Moment 2: Understanding why we normalize a negative pivot (R2 ← -R2)
 *    - Think Moment 3: Eliminating the final variable below Pivot 2 (R3 - R2)
 * 3. 8-step sequence for every transformation: Pivot, Target, Objective, Operation, Animation, Arithmetic, Matrix, Progress achieved.
 * 4. Sequential Back-Substitution:
 *    - Solves z from Row 3 first, explaining why the bottom row is easiest.
 *    - Substitutes z into Row 2 to solve y.
 *    - Substitutes y into Row 1 to solve x.
 *    - Persistent visual badges for known values with distinct color coding.
 * 5. Final real-world validation against cafeteria receipts.
 */

class Scene5Elimination {
  constructor(config = {}) {
    this.config = config;
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 147.0 (Global 97.0 to 244.0)
    const t = Math.max(0, Math.min(147.0, time));

    // 1. Deep Blueprint Cyber Background
    this.drawBackground(ctx, t, width, height);

    // 2. Header Track & 5-Step Algorithmic Roadmap Tracker Bar
    this.drawHeader(ctx, t, width, height);

    // 3. Phase 1: The Three Legal Row Operations (0.0 to 28.0s)
    if (t < 28.0) {
      this.drawLegalOperations(ctx, t, width, height);
    }
    // 4. Phase 2: Systematic Elimination Sequence with Think Moments (28.0 to 116.5s)
    else if (t < 116.5) {
      this.drawEliminationSteps(ctx, t, width, height);
    }
    // 5. Phase 3: Sequential Back-Substitution (116.5 to 147.0s)
    else {
      this.drawSequentialBackSub(ctx, t, width, height);
    }

    // 6. Crossfade transition to Scene 6 (145.5 to 147.0s)
    if (t >= 145.5) {
      const dissolve = (t - 145.5) / 1.5;
      ctx.fillStyle = `rgba(4, 7, 20, ${dissolve * 0.85})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawBackground(ctx, t, w, h) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#060a1c');
    bgGrad.addColorStop(0.5, '#0a1434');
    bgGrad.addColorStop(1, '#040713');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle technical grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
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
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('GAUSSIAN ELIMINATION IN ACTION', w / 2, 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Inter", sans-serif';
    ctx.letterSpacing = '0px';

    if (t < 18.0) {
      ctx.fillText('The Three Elementary Row Operations', w / 2, 82);
    } else if (t < 98.0) {
      ctx.fillText('Transforming the Matrix Step by Step', w / 2, 82);

      // Algorithmic Roadmap Tracker Bar (Active during 18.0s to 114.0s)
      const steps = [
        { label: '1. Pivot 1 & R₂', active: t >= 18.0 && t < 42.0, done: t >= 42.0 },
        { label: '2. Normalize P₂', active: t >= 42.0 && t < 62.0, done: t >= 62.0 },
        { label: '3. Eliminate R₃', active: t >= 62.0 && t < 86.0, done: t >= 86.0 },
        { label: '4. REF Staircase', active: t >= 86.0 && t < 98.0, done: t >= 98.0 },
        { label: '5. Back-Sub (RREF)', active: t >= 98.0 && t < 114.0, done: t >= 114.0 }
      ];

      const barW = 1000;
      const barX = (w - barW) / 2;
      const barY = 114;
      const stepSpacing = barW / (steps.length - 1);

      // Connecting guideline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(barX, barY);
      ctx.lineTo(barX + barW, barY);
      ctx.stroke();

      steps.forEach((st, idx) => {
        const sx = barX + idx * stepSpacing;
        const color = st.active ? '#00f0ff' : st.done ? '#00f59b' : '#64748b';

        // Glowing Step Node
        ctx.fillStyle = st.active ? '#00f0ff' : st.done ? '#00f59b' : '#1e293b';
        ctx.strokeStyle = color;
        ctx.lineWidth = st.active ? 3.5 : 2;
        if (st.active) {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 14;
        }
        ctx.beginPath();
        ctx.arc(sx, barY, st.active ? 8 : 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Step Label
        ctx.font = (st.active ? 'bold 13px' : '12px') + ' "JetBrains Mono", monospace';
        ctx.fillStyle = color;
        ctx.fillText(st.label, sx, barY + 24);
      });
    } else if (t < 114.0) {
      ctx.fillText('Sequential Back-Substitution: Solving Upwards', w / 2, 82);
    } else {
      ctx.fillText('Verification: Solution Matches All Orders', w / 2, 82);
    }

    ctx.restore();
  }

  drawLegalOperations(ctx, t, w, h) {
    const ease = Math.min(1.0, t / 1.2);
    ctx.save();
    ctx.globalAlpha = ease;

    const cards = [
      {
        id: '1',
        title: 'ROW SWAPPING',
        notation: 'Ri ⟷ Rj',
        desc: 'Swap any two rows in the matrix.',
        whyValid: 'Listing equations in a different order changes nothing about what makes them simultaneously true.',
        accent: '#00f0ff',
        time: 0.5,
        x: w * 0.19
      },
      {
        id: '2',
        title: 'ROW SCALING',
        notation: 'Ri ← k · Ri  (k ≠ 0)',
        desc: 'Multiply a row by a nonzero constant.',
        whyValid: 'Multiplying both sides of a scale by the same nonzero number preserves exact mathematical balance.',
        accent: '#9d4edd',
        time: 5.5,
        x: w * 0.50
      },
      {
        id: '3',
        title: 'ROW COMBINATION',
        notation: 'Rj ← Rj + c · Ri',
        desc: 'Add a multiple of one row to another.',
        whyValid: 'Adding equal equations together produces another valid equation, allowing us to cancel variables.',
        accent: '#ff9e00',
        time: 10.5,
        x: w * 0.81
      }
    ];

    cards.forEach(card => {
      if (t < card.time) return;
      const p = Math.min(1.0, (t - card.time) / 1.0);
      const cEase = Math.sin((p * Math.PI) / 2);

      // Spacious Card: 490px wide x 490px high
      const cw = 490;
      const ch = 490;
      const cx = card.x - cw / 2;
      const cy = 160;

      ctx.save();
      ctx.globalAlpha = cEase;

      // Card Body
      ctx.fillStyle = 'rgba(8, 14, 32, 0.95)';
      ctx.strokeStyle = card.accent;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = card.accent;
      ctx.shadowBlur = 20 * cEase;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cw, ch, 18);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Badge
      ctx.fillStyle = card.accent;
      ctx.beginPath();
      ctx.roundRect(cx + 30, cy + 30, 42, 34, 8);
      ctx.fill();

      ctx.fillStyle = '#040714';
      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(card.id, cx + 51, cy + 54);

      // Title
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText(card.title, cx + 88, cy + 54);

      // Notation
      ctx.fillStyle = card.accent;
      ctx.font = 'bold 24px "JetBrains Mono", monospace';
      ctx.fillText(card.notation, cx + 30, cy + 125);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '17px "Inter", sans-serif';
      ctx.fillText(card.desc, cx + 30, cy + 170);

      // Why valid explanation box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cx + 25, cy + 215, cw - 50, 245, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 16px "Inter", sans-serif';
      ctx.fillText('WHY IS THIS ALLOWED?', cx + 45, cy + 255);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px "Inter", sans-serif';
      this.drawWrappedText(ctx, card.whyValid, cx + 45, cy + 295, cw - 90, 26);

      ctx.restore();
    });

    // Bottom Fundamental Principle Banner (Exact Prompt Quote)
    const bannerY = 675;
    const bannerW = 1600;
    ctx.fillStyle = 'rgba(8, 14, 32, 0.96)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect((w - bannerW) / 2, bannerY, bannerW, 95, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('THE FUNDAMENTAL PRINCIPLE OF GAUSSIAN ELIMINATION', w / 2, bannerY + 36);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText('“We are not changing the answer to the system. We are changing the way the system is written so it becomes easier to solve.”', w / 2, bannerY + 70);

    ctx.restore();
  }

  getStepState(t) {
    // Objective Phase before Step 1 (28.0 to 41.5s)
    if (t < 41.5) {
      return {
        stepNum: 0,
        stepName: 'THE MAIN OBJECTIVE: CREATE AN UPPER TRIANGULAR MATRIX',
        isThinking: false,
        thinkProgress: 1.0,
        isRevealed: true,
        op: 'AIM: BUILD A STAIRCASE OF ZEROS BENEATH PIVOTS',
        whyText: 'Our main objective is to create zeros below the pivots, gradually transforming the matrix into upper triangular form.',
        arithmetic: 'Row Echelon Form: all entries below the main diagonal become 0.',
        progressNote: 'Once we reach this triangular form, solving the system becomes effortless!',
        matrix: [
          [1, 1, 0, 5],
          [1, 0, 1, 8],
          [0, 1, 1, 7]
        ],
        pivot: [0, 0],
        target: [1, 0],
        zeroCreated: null,
        echelon: false
      };
    }
    // Step 1: Pivot 1 & Eliminate R2 (41.5 to 62.5s)
    if (t < 62.5) {
      const stepT = t - 41.5;
      const isThinking = stepT < 15.0; // Think Moment 1 (pause 51.5s to 54.0s = stepT 10.0 to 12.5s)
      const thinkProgress = Math.min(1.0, Math.max(0, (stepT - 10.0) / 2.5));
      const isRevealed = stepT >= 12.5;
      const pAnim = Math.min(1.0, Math.max(0, (stepT - 12.5) / 2.5));

      return {
        stepNum: 1,
        stepName: 'STEP 1: ELIMINATE BELOW PIVOT 1 (COLUMN 1)',
        isThinking,
        thinkProgress,
        isRevealed,
        question: 'Pause. How can we eliminate the 1 below the pivot?',
        revealOp: 'R₂  ⟵  R₂ − R₁',
        revealWhy: 'We subtract Row 1 from Row 2 because their first coefficients are equal (1 − 1 = 0). This creates zero in the first column without changing the solution set.',
        op: 'R₂  ⟵  R₂ − R₁',
        whyText: 'Goal: Force a ZERO in Column 1 below Pivot 1 by subtracting Row 1 from Row 2.',
        arithmetic: '[1 − 1,   0 − 1,   1 − 0   |   8 − 5]   =   [0,   −1,   1   |   3]',
        progressNote: 'Progress: x is eliminated from Row 2! Column 1 is locked.',
        matrix: [
          [1, 1, 0, 5],
          [pAnim >= 0.7 ? 0 : 1, pAnim >= 0.7 ? -1 : 0, 1, pAnim >= 0.7 ? 3 : 8],
          [0, 1, 1, 7]
        ],
        pivot: [0, 0],
        target: [1, 0],
        zeroCreated: pAnim >= 0.7 ? [1, 0] : null,
        echelon: false
      };
    }
    // Step 2: Normalize Pivot 2 (62.5 to 79.0s)
    if (t < 79.0) {
      const stepT = t - 62.5;
      const isThinking = stepT < 6.5; // Think Moment 2
      const thinkProgress = Math.min(1.0, Math.max(0, (stepT - 3.5) / 2.5));
      const isRevealed = stepT >= 6.0;
      const pAnim = Math.min(1.0, Math.max(0, (stepT - 6.5) / 2.5));

      return {
        stepNum: 2,
        stepName: 'STEP 2: NORMALIZE PIVOT 2 (COLUMN 2)',
        isThinking,
        thinkProgress,
        isRevealed,
        question: 'Pause. Why might we change this pivot from −1 to 1?',
        revealOp: 'R₂  ⟵  (−1) · R₂',
        revealWhy: 'Multiplying an entire equation by −1 preserves exact balance and does not change its solutions. It makes the pivot +1, simplifying future calculations. (Note: Making pivots 1 is not mandatory, but a convenient standard choice.)',
        op: 'R₂  ⟵  (−1) · R₂',
        whyText: 'Goal: Scale Row 2 by −1 so the leading pivot becomes +1.',
        arithmetic: '[0 · (−1),   −1 · (−1),   1 · (−1)   |   3 · (−1)]   =   [0,   1,   −1   |   −3]',
        progressNote: 'Progress: Pivot 2 is now +1! Row 2 is primed for elimination.',
        matrix: [
          [1, 1, 0, 5],
          [0, pAnim >= 0.7 ? 1 : -1, pAnim >= 0.7 ? -1 : 1, pAnim >= 0.7 ? -3 : 3],
          [0, 1, 1, 7]
        ],
        pivot: [1, 1],
        target: null,
        zeroCreated: null,
        echelon: false
      };
    }
    // Step 3: Eliminate Below Pivot 2 (79.0 to 94.0s)
    if (t < 94.0) {
      const stepT = t - 79.0;
      const isThinking = stepT < 6.5; // Think Moment 3
      const thinkProgress = Math.min(1.0, Math.max(0, (stepT - 3.5) / 2.5));
      const isRevealed = stepT >= 6.0;
      const pAnim = Math.min(1.0, Math.max(0, (stepT - 6.5) / 2.5));

      return {
        stepNum: 3,
        stepName: 'STEP 3: ELIMINATE BELOW PIVOT 2 (COLUMN 2)',
        isThinking,
        thinkProgress,
        isRevealed,
        question: 'Pause. Which operation will turn the coefficient below the second pivot into zero?',
        revealOp: 'R₃  ⟵  R₃ − R₂',
        revealWhy: 'We subtract Row 2 from Row 3 (1 − 1 = 0) to eliminate y from the third equation. This creates the final zero below the diagonal without reintroducing x!',
        op: 'R₃  ⟵  R₃ − R₂',
        whyText: 'Goal: Force a ZERO in Column 2 below Pivot 2 by subtracting Row 2 from Row 3.',
        arithmetic: '[0 − 0,   1 − 1,   1 − (−1)   |   7 − (−3)]   =   [0,   0,   2   |   10]',
        progressNote: 'Progress: y is eliminated from Row 3! Both x and y are now gone from the bottom row.',
        matrix: [
          [1, 1, 0, 5],
          [0, 1, -1, -3],
          [0, pAnim >= 0.7 ? 0 : 1, pAnim >= 0.7 ? 2 : 1, pAnim >= 0.7 ? 10 : 7]
        ],
        pivot: [1, 1],
        target: [2, 1],
        zeroCreated: pAnim >= 0.7 ? [2, 1] : null,
        echelon: false
      };
    }
    // Step 4: Scale Row 3 to Achieve REF (94.0 to 116.5s)
    const stepT = t - 94.0;
    const pAnim = Math.min(1.0, stepT / 2.5);

    return {
      stepNum: 4,
      stepName: 'STEP 4: SCALE ROW 3  ⟹  ROW ECHELON FORM (REF)',
      isThinking: false,
      thinkProgress: 1.0,
      isRevealed: true,
      op: 'R₃  ⟵  (1/2) · R₃',
      whyText: 'Row Echelon Form achieved! Notice what we have achieved: instead of dealing with all 3 unknowns, we reduced them step by step.',
      arithmetic: '[0,   0,   2/2   |   10/2]   =   [0,   0,   1   |   5]   ⟹   z = 5',
      progressNote: 'Triangular Staircase Formed! The system is now untangled and ready for Back-Substitution.',
      matrix: [
        [1, 1, 0, 5],
        [0, 1, -1, -3],
        [0, 0, pAnim >= 0.7 ? 1 : 2, pAnim >= 0.7 ? 5 : 10]
      ],
      pivot: [2, 2],
      target: null,
      zeroCreated: null,
      echelon: true
    };
  }

  drawEliminationSteps(ctx, t, w, h) {
    const state = this.getStepState(t);
    const cx = w / 2;
    const cy = h * 0.43;

    // Spacious Matrix: 860px wide x 360px high
    const mW = 860;
    const mH = 360;
    const mx = cx - mW / 2;
    const my = cy - mH / 2;

    ctx.save();

    // Matrix Container Background
    ctx.fillStyle = 'rgba(7, 13, 30, 0.96)';
    ctx.beginPath();
    ctx.roundRect(mx, my, mW, mH, 18);
    ctx.fill();

    // Cyan Neon Glowing Brackets
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 24;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 5;

    const bW = 44;
    ctx.beginPath();
    ctx.moveTo(mx + bW, my); ctx.lineTo(mx, my); ctx.lineTo(mx, my + mH); ctx.lineTo(mx + bW, my + mH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mx + mW - bW, my); ctx.lineTo(mx + mW, my); ctx.lineTo(mx + mW, my + mH); ctx.lineTo(mx + mW - bW, my + mH);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Augmented Divider Line
    const sepX = mx + mW * 0.73;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(sepX, my + 20);
    ctx.lineTo(sepX, my + mH - 20);
    ctx.stroke();

    // Column Headers
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('x  (Col 1)', mx + mW * 0.16, my - 16);
    ctx.fillText('y  (Col 2)', mx + mW * 0.35, my - 16);
    ctx.fillText('z  (Col 3)', mx + mW * 0.54, my - 16);
    ctx.fillText('Totals', mx + mW * 0.86, my - 16);

    const colXs = [mx + mW * 0.16, mx + mW * 0.35, mx + mW * 0.54, mx + mW * 0.86];
    const rowYs = [my + mH * 0.26, my + mH * 0.54, my + mH * 0.82];

    // Highlight Pivot (Golden Amber)
    if (state.pivot) {
      const [pr, pc] = state.pivot;
      const px = colXs[pc];
      const py = rowYs[pr];

      ctx.fillStyle = 'rgba(255, 209, 102, 0.25)';
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(px - 34, py - 40, 68, 55, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffd166';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('ACTIVE PIVOT', px, py - 46);
    }

    // Highlight Target Element (Glowing Crimson)
    if (state.target) {
      const [tr, tc] = state.target;
      const tx = colXs[tc];
      const ty = rowYs[tr];

      ctx.fillStyle = 'rgba(255, 59, 92, 0.25)';
      ctx.strokeStyle = '#ff3b5c';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ff3b5c';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(tx - 34, ty - 40, 68, 55, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ff3b5c';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.fillText('TARGET TO ZERO', tx, ty - 46);
    }

    // Matrix Numbers
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const val = state.matrix[r][c];
        const vx = colXs[c];
        const vy = rowYs[r];

        ctx.font = 'bold 44px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (c === 3) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(String(val), vx, vy);
        } else if (val === 0) {
          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 16;
          ctx.fillText('0', vx, vy);
          ctx.shadowBlur = 0;
        } else if (r === c && val === 1) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.fillText('1', vx, vy);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(String(val), vx, vy);
        }
      }
    }

    // Echelon Staircase Line
    if (state.echelon) {
      ctx.strokeStyle = '#00f59b';
      ctx.shadowColor = '#00f59b';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 4.5;

      ctx.beginPath();
      ctx.moveTo(colXs[0] - 55, rowYs[0] + 36);
      ctx.lineTo(colXs[0] + 55, rowYs[0] + 36);
      ctx.lineTo(colXs[0] + 55, rowYs[1] + 36);
      ctx.lineTo(colXs[1] + 55, rowYs[1] + 36);
      ctx.lineTo(colXs[1] + 55, rowYs[2] + 36);
      ctx.lineTo(colXs[2] + 55, rowYs[2] + 36);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.restore();

    // Bottom Detailed Pedagogical Teaching Banner with Think Moment
    this.drawPedagogicalBanner(ctx, state, w, h);
  }

  drawPedagogicalBanner(ctx, state, w, h) {
    const bannerW = 1580;
    const bannerH = 205;
    const bx = (w - bannerW) / 2;
    const by = h * 0.71;

    ctx.save();
    ctx.fillStyle = 'rgba(7, 13, 30, 0.96)';
    ctx.strokeStyle = state.isThinking ? '#ffd166' : state.echelon ? '#00f59b' : '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = state.isThinking ? '#ffd166' : state.echelon ? '#00f59b' : '#00f0ff';
    ctx.shadowBlur = 22;

    ctx.beginPath();
    ctx.roundRect(bx, by, bannerW, bannerH, 18);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ACTIVE LEARNING THINK MOMENT PANEL
    if (state.isThinking) {
      ctx.textAlign = 'center';

      // Think Tag
      ctx.fillStyle = '#ffd166';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.letterSpacing = '2px';
      ctx.fillText(`THINK MOMENT ${state.stepNum} • PREDICT THE NEXT STEP`, w / 2, by + 34);

      // The Question
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px "Inter", sans-serif';
      ctx.fillText(state.question, w / 2, by + 76);

      // Sleek Thinking Countdown Indicator (2.5 seconds pulse)
      const timerW = 700;
      const timerX = (w - timerW) / 2;
      const timerY = by + 106;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(timerX, timerY, timerW, 8, 4);
      ctx.fill();

      // Animated progress fill
      const currentFill = timerW * (1.0 - state.thinkProgress);
      ctx.fillStyle = '#ffd166';
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(timerX, timerY, currentFill, 8, 4);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Status message
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px "Inter", sans-serif';
      const secLeft = Math.max(0, (2.5 * (1.0 - state.thinkProgress)).toFixed(1));
      ctx.fillText(state.isRevealed ? 'Revealing correct operation...' : `Thinking time... (${secLeft}s) What row operation creates zero here?`, w / 2, by + 140);

      // Preview reveal badge once revealed
      if (state.isRevealed) {
        ctx.fillStyle = '#00f59b';
        ctx.font = 'bold 20px "JetBrains Mono", monospace';
        ctx.fillText(`ANSWER: ${state.revealOp}`, w / 2, by + 175);
      }

      ctx.restore();
      return;
    }

    // EXPLANATION & ARITHMETIC PANEL (After Think Moment completes)
    ctx.textAlign = 'center';

    // Step Title
    ctx.fillStyle = state.echelon ? '#00f59b' : '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(state.stepName, w / 2, by + 32);

    // Operation Formula
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "JetBrains Mono", monospace';
    ctx.fillText(state.op, w / 2, by + 72);

    // Why & Arithmetic
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText(state.whyText, w / 2, by + 108);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText(state.arithmetic, w / 2, by + 144);

    // Progress achieved note
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 15px "Inter", sans-serif';
    ctx.fillText(state.progressNote, w / 2, by + 180);

    ctx.restore();
  }

  drawSequentialBackSub(ctx, t, w, h) {
    // 116.5 to 147.0s (30.5s): Sequential Back-Substitution
    const subT = t - 116.5;

    // Sub-stage breakdown:
    // 0.0 to 9.5s:   Solve z from Row 3 (Bottom row is easiest!)
    // 9.5 to 17.0s:  Substitute z into Row 2 to solve y
    // 17.0 to 24.0s: Substitute y into Row 1 to solve x
    // 24.0 to 30.5s: Solution summary (3, 2, 5)
    const isSolvingZ = subT < 9.5;
    const isSolvingY = subT >= 9.5 && subT < 17.0;
    const isSolvingX = subT >= 17.0;

    const zSolved = true;
    const ySolved = subT >= 9.5;
    const xSolved = subT >= 17.0;

    // Spacious Container: 1580px x 680px
    const cardW = 1580;
    const cardH = 680;
    const cx = (w - cardW) / 2;
    const cy = 150;

    ctx.save();
    ctx.fillStyle = 'rgba(7, 13, 30, 0.96)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f59b';
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cardW, cardH, 20);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('SEQUENTIAL BACK-SUBSTITUTION (SOLVING FROM BOTTOM UP)', w / 2, cy + 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('Why the Bottom Row First? It isolates ONE unknown directly!', w / 2, cy + 82);

    // Left Column: The 3 Equations being processed sequentially
    const leftW = 960;
    const leftX = cx + 50;

    // Step 5A: Row 3 Card (Solve z)
    const card3Y = cy + 120;
    ctx.fillStyle = isSolvingZ ? 'rgba(0, 245, 155, 0.15)' : 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = isSolvingZ ? '#00f59b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = isSolvingZ ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.roundRect(leftX, card3Y, leftW, 135, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('1. BOTTOM EQUATION (ROW 3) ⟶ SOLVE FOR z', leftX + 24, card3Y + 34);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('0x  +  0y  +  1z  =  5   ⟹   z = 5  (Sandwich = ₹5)', leftX + 24, card3Y + 75);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px "Inter", sans-serif';
    ctx.fillText('All other variables were eliminated! The last row directly gives the solution for z.', leftX + 24, card3Y + 110);

    // Step 5B: Row 2 Card (Substitute z to solve y)
    const card2Y = cy + 275;
    ctx.fillStyle = isSolvingY ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = isSolvingY ? '#38bdf8' : ySolved ? '#00f59b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = isSolvingY ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.roundRect(leftX, card2Y, leftW, 135, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('2. MIDDLE EQUATION (ROW 2) ⟶ SUBSTITUTE KNOWN z = 5', leftX + 24, card2Y + 34);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText(ySolved ? '1y − (5) = −3   ⟹   y = −3 + 5   ⟹   y = 2  (Tea = ₹2)' : '1y  −  1z  =  −3   [Waiting for substitution...]', leftX + 24, card2Y + 75);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px "Inter", sans-serif';
    ctx.fillText('Plug the known value of z upward like falling dominoes to solve for y.', leftX + 24, card2Y + 110);

    // Step 5C: Row 1 Card (Substitute y to solve x)
    const card1Y = cy + 430;
    ctx.fillStyle = isSolvingX ? 'rgba(255, 209, 102, 0.15)' : 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = isSolvingX ? '#ffd166' : xSolved ? '#00f59b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = isSolvingX ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.roundRect(leftX, card1Y, leftW, 135, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('3. TOP EQUATION (ROW 1) ⟶ SUBSTITUTE KNOWN y = 2', leftX + 24, card1Y + 34);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText(xSolved ? '1x + (2) = 5   ⟹   x = 5 − 2   ⟹   x = 3  (Coffee = ₹3)' : '1x  +  1y  =  5   [Waiting for substitution...]', leftX + 24, card1Y + 75);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px "Inter", sans-serif';
    ctx.fillText('Finally, substitute y upward into the first equation to reveal the price of coffee.', leftX + 24, card1Y + 110);

    // Right Column: Persistent Known Values Board
    const rightX = cx + 1050;
    const rightW = 480;
    const rightH = 445;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rightX, card3Y, rightW, rightH, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillText('PERSISTENT KNOWN VALUES', rightX + rightW / 2, card3Y + 38);

    // Badge 1: z
    const bzY = card3Y + 70;
    ctx.fillStyle = 'rgba(0, 245, 155, 0.2)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rightX + 30, bzY, rightW - 60, 75, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText('✔ z = ₹5', rightX + 50, bzY + 44);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText('Sandwich Price (Solved 1st)', rightX + 175, bzY + 44);

    // Badge 2: y
    const byY = card3Y + 165;
    ctx.fillStyle = ySolved ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = ySolved ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = ySolved ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(rightX + 30, byY, rightW - 60, 75, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = ySolved ? '#38bdf8' : '#64748b';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(ySolved ? '✔ y = ₹2' : '⏳ y = ...', rightX + 50, byY + 44);
    ctx.fillStyle = ySolved ? '#ffffff' : '#64748b';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText('Tea Price (Solved 2nd)', rightX + 175, byY + 44);

    // Badge 3: x
    const bxY = card3Y + 260;
    ctx.fillStyle = xSolved ? 'rgba(255, 209, 102, 0.2)' : 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = xSolved ? '#ffd166' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = xSolved ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(rightX + 30, bxY, rightW - 60, 75, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = xSolved ? '#ffd166' : '#64748b';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(xSolved ? '✔ x = ₹3' : '⏳ x = ...', rightX + 50, bxY + 44);
    ctx.fillStyle = xSolved ? '#ffffff' : '#64748b';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText('Coffee Price (Solved 3rd)', rightX + 175, bxY + 44);

    // Final Solved Triplet Box
    const resY = card3Y + 355;
    ctx.fillStyle = xSolved ? 'rgba(0, 245, 155, 0.25)' : 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = xSolved ? '#00f59b' : '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rightX + 30, resY, rightW - 60, 65, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = xSolved ? '#00f59b' : '#64748b';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText(xSolved ? 'SOLUTION: (x, y, z) = (3, 2, 5)' : 'SOLVING IN PROGRESS...', rightX + rightW / 2, resY + 40);

    // Bottom Takeaway Banner
    const bannerY = cy + 585;
    ctx.fillStyle = 'rgba(12, 22, 48, 0.96)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(leftX, bannerY, cardW - 100, 68, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 17px "Inter", sans-serif';
    ctx.fillText('Back-Substitution is effortless because each equation upward only adds ONE new unknown.', w / 2, bannerY + 40);

    ctx.restore();
  }

  drawReceiptVerification(ctx, t, w, h) {
    const p = Math.min(1.0, (t - 114.0) / 1.0);
    const ease = Math.sin((p * Math.PI) / 2);

    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Container: 1540px x 660px
    const cardW = 1540;
    const cardH = 660;
    const cx = (w - cardW) / 2;
    const cy = 160;

    ctx.fillStyle = 'rgba(7, 13, 30, 0.96)';
    ctx.strokeStyle = '#00f59b';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f59b';
    ctx.shadowBlur = 24 * ease;
    ctx.beginPath();
    ctx.roundRect(cx, cy, cardW, cardH, 20);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f59b';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('SOLUTION VERIFIED AGAINST REAL-WORLD PROBLEM', w / 2, cy + 46);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Inter", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('Validated Prices: Coffee = ₹3   •   Tea = ₹2   •   Sandwich = ₹5', w / 2, cy + 96);

    // 3 Verification Cards
    const receipts = [
      { order: 'Order 1 (Coffee + Tea)', math: '3 + 2 = ₹5', target: '₹5', status: '✔ VERIFIED', color: '#00f0ff', y: cy + 155 },
      { order: 'Order 2 (Coffee + Sandwich)', math: '3 + 5 = ₹8', target: '₹8', status: '✔ VERIFIED', color: '#9d4edd', y: cy + 265 },
      { order: 'Order 3 (Tea + Sandwich)', math: '2 + 5 = ₹7', target: '₹7', status: '✔ VERIFIED', color: '#ff9e00', y: cy + 375 }
    ];

    receipts.forEach(rc => {
      const rx = cx + 60;
      const rw = cardW - 120;
      const rh = 80;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.strokeStyle = rc.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(rx, rc.y, rw, rh, 12);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText(rc.order, rx + 30, rc.y + 48);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillText(rc.math, rx + rw * 0.58, rc.y + 48);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#00f59b';
      ctx.font = 'bold 22px "JetBrains Mono", monospace';
      ctx.fillText(rc.status, rx + rw - 30, rc.y + 48);
    });

    // Bottom Conclusion Takeaway
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('Gaussian Elimination found the exact unique prices that satisfy every single transaction simultaneously.', w / 2, cy + 535);

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
  module.exports = Scene5Elimination;
}
