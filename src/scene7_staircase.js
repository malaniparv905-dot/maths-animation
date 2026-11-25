/**
 * scene7_staircase.js - Conclusion & Memory Recap (04:45 - 05:00 = 15s)
 * 
 * Major Pedagogical Upgrade:
 * Memory Recap: "THE 4 STEPS TO GAUSSIAN ELIMINATION"
 * Sequentially reveals:
 * 1. FIND THE PIVOT
 * 2. ELIMINATE BELOW
 * 3. BUILD UPPER TRIANGULAR FORM
 * 4. BACK-SUBSTITUTE
 * Concludes with the exact memorable statement:
 * "Gaussian Elimination doesn't change the solution. It changes the equations into a form where the solution becomes impossible to miss."
 */

class Scene7Staircase {
  constructor(config = {}) {
    this.config = config;
    this.particles = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 900,
      size: 1.5 + Math.random() * 3.0,
      speed: 0.5 + Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.6
    }));
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 15.0 (Global 285.0 to 300.0)
    const t = Math.max(0, Math.min(15.0, time));

    // 1. Digital Perspective Tunnel Background
    this.drawDigitalTunnel(ctx, t, width, height);

    // 2. Floating Radiant Ambient Particles
    this.drawParticles(ctx, t, width, height);

    // 3. The 4 Steps Memory Recap Card
    this.drawMemoryRecap(ctx, t, width, height);

    // 4. Smooth Cinematic Fade to Black (13.5 to 15.0s)
    if (t >= 13.5) {
      const fadeProgress = (t - 13.5) / 1.5;
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1.0, fadeProgress)})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawDigitalTunnel(ctx, t, w, h) {
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.44, 20, w / 2, h * 0.44, w * 0.75);
    bgGrad.addColorStop(0, '#0c1b40');
    bgGrad.addColorStop(0.35, '#071026');
    bgGrad.addColorStop(0.75, '#040715');
    bgGrad.addColorStop(1, '#02030a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle perspective gridlines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  }

  drawParticles(ctx, t, w, h) {
    ctx.save();
    this.particles.forEach(p => {
      const py = ((p.y + t * 30 * p.speed) % h + h) % h;
      const px = w / 2 + p.x;
      ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha})`;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  drawMemoryRecap(ctx, t, w, h) {
    const progress = Math.min(1.0, t / 1.2);
    const ease = Math.sin((progress * Math.PI) / 2);

    ctx.save();
    ctx.globalAlpha = ease;

    // Spacious Container: 1620px x 730px
    const boxW = 1620;
    const boxH = 730;
    const bx = (w - boxW) / 2;
    const by = 135;

    ctx.fillStyle = 'rgba(6, 12, 28, 0.96)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 24 * ease;
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 20);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Header Tag & Main Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('MEMORY RECAP • THE CORE ALGORITHM', w / 2, by + 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('THE 4 STEPS TO GAUSSIAN ELIMINATION', w / 2, by + 88);

    // 4 Sequential Step Cards (Revealed across t = 0.5s to 9.5s)
    const stepsData = [
      {
        num: '1',
        title: 'FIND THE PIVOT',
        desc: 'Identify the leading nonzero entry in the active column to serve as the fixed anchor.',
        time: 0.4,
        accent: '#ffd166'
      },
      {
        num: '2',
        title: 'ELIMINATE BELOW',
        desc: 'Use row operations (Rj ← Rj − c·Ri) to force zeros directly beneath the active pivot.',
        time: 2.8,
        accent: '#ff3b5c'
      },
      {
        num: '3',
        title: 'BUILD UPPER TRIANGULAR FORM',
        desc: 'Repeat column-by-column until a staircase of zeros isolates the bottom variable.',
        time: 5.2,
        accent: '#00f0ff'
      },
      {
        num: '4',
        title: 'BACK-SUBSTITUTE',
        desc: 'Solve the isolated bottom unknown and substitute upward like dominoes to solve all variables.',
        time: 7.6,
        accent: '#00f59b'
      }
    ];

    const cardsY = by + 125;
    const cardH = 390;
    const colW = (boxW - 100) / 4;

    stepsData.forEach((st, idx) => {
      if (t < st.time) return;
      const stepProg = Math.min(1.0, (t - st.time) / 1.0);
      const sEase = Math.sin((stepProg * Math.PI) / 2);
      const cardX = bx + 20 + idx * (colW + 20);

      ctx.save();
      ctx.globalAlpha = sEase;

      // Card Container
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = st.accent;
      ctx.lineWidth = 2;
      ctx.shadowColor = st.accent;
      ctx.shadowBlur = 16 * sEase;
      ctx.beginPath();
      ctx.roundRect(cardX, cardsY, colW, cardH, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Number Badge
      ctx.fillStyle = st.accent;
      ctx.beginPath();
      ctx.roundRect(cardX + 24, cardsY + 24, 46, 36, 8);
      ctx.fill();

      ctx.fillStyle = '#040714';
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(st.num, cardX + 47, cardsY + 50);

      // Step Title
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "Inter", sans-serif';
      ctx.fillText(st.title, cardX + 24, cardsY + 98);

      // Accent Line
      ctx.strokeStyle = st.accent;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cardX + 24, cardsY + 116);
      ctx.lineTo(cardX + colW - 24, cardsY + 116);
      ctx.stroke();

      // Explanation
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px "Inter", sans-serif';
      this.drawWrappedText(ctx, st.desc, cardX + 24, cardsY + 155, colW - 48, 25);

      ctx.restore();
    });

    // Final Memorable Statement Banner (Reveals at t >= 10.0s)
    if (t >= 10.0) {
      const bannerProg = Math.min(1.0, (t - 10.0) / 1.2);
      const bEase = Math.sin((bannerProg * Math.PI) / 2);

      ctx.save();
      ctx.globalAlpha = bEase;

      const bannerY = by + cardH + 150;
      const bannerH = 110;
      ctx.fillStyle = 'rgba(12, 22, 48, 0.98)';
      ctx.strokeStyle = '#00f59b';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00f59b';
      ctx.shadowBlur = 24 * bEase;
      ctx.beginPath();
      ctx.roundRect(bx + 20, bannerY, boxW - 40, bannerH, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.textAlign = 'center';

      // Exact prompt memorable statement:
      // "Gaussian Elimination doesn't change the solution. It changes the equations into a form where the solution becomes impossible to miss."
      ctx.fillStyle = '#ffd166';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText('“Gaussian Elimination doesn’t change the solution.”', w / 2, bannerY + 42);

      ctx.fillStyle = '#00f59b';
      ctx.font = 'bold 24px "Inter", sans-serif';
      ctx.fillText('“It changes the equations into a form where the solution becomes impossible to miss.”', w / 2, bannerY + 76);

      ctx.restore();
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
  module.exports = Scene7Staircase;
}
