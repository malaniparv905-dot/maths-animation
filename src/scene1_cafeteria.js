/**
 * scene1_cafeteria.js - Real-Life Cafeteria Mystery (00:00 - 00:40)
 * Visual Inspiration: Reference Image 1 (University Mess / Cafe)
 * Pedagogical Objective:
 *   1. Real items & bundle prices first without rushing.
 *   2. Build curiosity: "We know the total cost of different combinations. But what if we want to know the individual price of every item?"
 *   3. Make unknowns (x, y, z) emerge naturally from the food items.
 */

class Scene1Cafeteria {
  constructor(config = {}) {
    this.config = config;
    // Particle steam from coffee & tea counter
    this.steamParticles = Array.from({ length: 45 }, () => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.8 - Math.random() * 0.8,
      size: 3 + Math.random() * 6,
      alpha: Math.random() * 0.6,
      life: Math.random()
    }));

    // Students silhouettes / ambient cafe movement
    this.students = [
      { x: 380, y: 720, speed: 0.35, dir: 1, scale: 0.95 },
      { x: 820, y: 690, speed: -0.28, dir: -1, scale: 0.88 },
      { x: 1450, y: 740, speed: 0.42, dir: 1, scale: 1.05 },
      { x: 1100, y: 820, speed: -0.15, dir: -1, scale: 1.15 }
    ];
  }

  render(ctx, time, width = 1920, height = 1080) {
    // Local time in scene: 0.0 to 40.0
    const t = Math.max(0, Math.min(40.0, time));

    // Cinematic camera motion: dolly in and gentle pan
    const panX = Math.sin(t * 0.08) * 35;
    const zoom = 1.0 + (t / 40.0) * 0.07;

    ctx.save();
    // Camera transform
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-width / 2 + panX, -height / 2);

    // 1. Realistic Modern University Cafeteria Interior
    this.drawCafeteriaInterior(ctx, t, width, height);

    // 2. Animated Steam from Hot Beverages
    this.drawSteam(ctx, t);

    // 3. Transactions & Food Bundle Cards
    this.drawTransactions(ctx, t, width, height);

    // 4. Cinematic Vignette & Atmospheric Lighting
    this.drawAtmosphere(ctx, t, width, height);

    ctx.restore();

    // 5. Title & Narrative Subtitles Track
    this.drawNarrativeTitles(ctx, t, width, height);

    // 6. Natural Emergence of Unknowns x, y, z from Items (36.0 to 40.0s)
    if (t >= 36.0) {
      this.drawEmergenceOverlay(ctx, t, width, height);
    }

    // 7. Transition Out to Scene 2 (38.5 to 40.0s)
    if (t >= 38.5) {
      const dissolve = (t - 38.5) / 1.5;
      ctx.fillStyle = `rgba(5, 8, 20, ${dissolve * 0.9})`;
      ctx.fillRect(0, 0, width, height);
    }
  }

  drawCafeteriaInterior(ctx, t, w, h) {
    // Base interior gradient (Warm wood paneling & modern architectural lighting)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#1c1714'); // High ceiling & warm soffits
    bgGrad.addColorStop(0.35, '#2e221b'); // Vertical slatted wood texture zone
    bgGrad.addColorStop(0.65, '#3b2f27'); // Service counters
    bgGrad.addColorStop(1, '#1a1614'); // Polished terrazzo floor
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Overhead Skylight & Architectural Beams (Ref 1 Mess 2 Cafe architecture)
    ctx.fillStyle = 'rgba(255, 245, 230, 0.06)';
    ctx.beginPath();
    ctx.moveTo(w * 0.2, 0);
    ctx.lineTo(w * 0.8, 0);
    ctx.lineTo(w * 0.9, h * 0.35);
    ctx.lineTo(w * 0.1, h * 0.35);
    ctx.fill();

    // Warm Wooden Wall Slat Texture
    ctx.strokeStyle = 'rgba(190, 140, 100, 0.12)';
    ctx.lineWidth = 3;
    for (let x = 60; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h * 0.52);
      ctx.stroke();
    }

    // Modern Digital Menu Screen ("MESS 2 - CAFÉ")
    const signX = w * 0.32;
    const signY = 60;
    const signW = w * 0.36;
    const signH = 110;

    // Glowing Sign Board
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(signX, signY, signW, signH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 32px "Inter", sans-serif';
    ctx.fillText('CAMPUS CAFÉ & MESS', signX + signW / 2, signY + 45);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText('CAMPUS ORDERING TERMINAL • LIVE TRANSACTIONS', signX + signW / 2, signY + 80);

    // Cafeteria Service Counter (Polished marble counter with wood fascia)
    const counterY = h * 0.58;
    ctx.fillStyle = '#dcd6cd';
    ctx.fillRect(0, counterY, w, 28); // Counter top

    ctx.fillStyle = '#4a3b32'; // Front fascia
    ctx.fillRect(0, counterY + 28, w, h - counterY - 28);

    // Warm counter front LED strip
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(0, counterY + 26, w, 4);
    ctx.shadowBlur = 0;

    // Background Dining Tables & Seated Students (Perspective depth)
    ctx.fillStyle = 'rgba(20, 16, 14, 0.7)';
    for (let i = 0; i < 5; i++) {
      const tx = 200 + i * 360;
      const ty = h * 0.44;
      ctx.fillRect(tx, ty, 180, 50); // Tables
      // Seated student silhouettes
      ctx.beginPath();
      ctx.arc(tx + 45, ty - 22, 14, 0, Math.PI * 2);
      ctx.arc(tx + 135, ty - 22, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawSteam(ctx, t) {
    // Steam rising from beverage stations
    const stations = [
      { x: 380, y: 620 },
      { x: 740, y: 620 }
    ];

    ctx.save();
    stations.forEach(st => {
      this.steamParticles.forEach(p => {
        const px = st.x + Math.sin(t * 2 + p.life * 10) * 16 + p.vx * 30;
        const py = st.y - (t * 25 + p.life * 90) % 90;
        const alpha = Math.max(0, 0.45 * (1 - (st.y - py) / 90));

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    ctx.restore();
  }

  drawTransactions(ctx, t, w, h) {
    // 3 Food Bundles with clear, unhurried progression:
    // Order 1: Coffee + Tea = ₹5 (Revealed at t >= 6s)
    // Order 2: Coffee + Sandwich = ₹8 (Revealed at t >= 15s)
    // Order 3: Tea + Sandwich = ₹7 (Revealed at t >= 24s)

    const orders = [
      {
        id: 1,
        startTime: 6.0,
        x: w * 0.18,
        y: h * 0.62,
        title: 'ORDER #101',
        itemA: 'Coffee',
        itemB: 'Tea',
        price: '₹5',
        iconA: '☕',
        iconB: '🍵',
        accent: '#00f0ff'
      },
      {
        id: 2,
        startTime: 15.0,
        x: w * 0.50,
        y: h * 0.62,
        title: 'ORDER #102',
        itemA: 'Coffee',
        itemB: 'Sandwich',
        price: '₹8',
        iconA: '☕',
        iconB: '🥪',
        accent: '#9d4edd'
      },
      {
        id: 3,
        startTime: 24.0,
        x: w * 0.82,
        y: h * 0.62,
        title: 'ORDER #103',
        itemA: 'Tea',
        itemB: 'Sandwich',
        price: '₹7',
        iconA: '🍵',
        iconB: '🥪',
        accent: '#ff9e00'
      }
    ];

    orders.forEach(order => {
      if (t < order.startTime) return;
      const progress = Math.min(1.0, (t - order.startTime) / 1.2);
      const ease = Math.sin((progress * Math.PI) / 2);

      const cardW = 440;
      const cardH = 250;
      const cardX = order.x - cardW / 2;
      const cardY = order.y - (1 - ease) * 40;

      ctx.save();
      ctx.globalAlpha = ease;

      // Card Backing (Glassmorphism Dark Blue)
      ctx.shadowColor = order.accent;
      ctx.shadowBlur = 18 * ease;
      ctx.fillStyle = 'rgba(9, 16, 36, 0.94)';
      ctx.strokeStyle = order.accent;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Header
      ctx.fillStyle = order.accent;
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(order.title, cardX + 24, cardY + 36);

      // Status Badge
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(cardX + cardW - 105, cardY + 18, 85, 24, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('BILLED', cardX + cardW - 62, cardY + 34);

      // Food Icons & Combination
      ctx.textAlign = 'center';
      ctx.font = '40px "Apple Color Emoji", sans-serif';
      ctx.fillText(order.iconA, cardX + 85, cardY + 105);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 26px "Inter", sans-serif';
      ctx.fillText('+', cardX + 160, cardY + 102);

      ctx.fillText(order.iconB, cardX + 235, cardY + 105);

      // Item Names Below Icons
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '13px "Inter", sans-serif';
      ctx.fillText(order.itemA, cardX + 85, cardY + 135);
      ctx.fillText(order.itemB, cardX + 235, cardY + 135);

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cardX + 24, cardY + 155);
      ctx.lineTo(cardX + cardW - 24, cardY + 155);
      ctx.stroke();

      // Bundle Total vs Unknown Individual
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px "Inter", sans-serif';
      ctx.fillText('Bundle Total:', cardX + 24, cardY + 188);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillText(order.price, cardX + cardW - 24, cardY + 192);

      ctx.restore();
    });
  }

  drawAtmosphere(ctx, t, w, h) {
    // Cinematic Vignette
    const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, w * 0.7);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  drawNarrativeTitles(ctx, t, w, h) {
    ctx.save();

    // Act 1 Title Intro (0 to 6.5s)
    if (t >= 0.8 && t <= 6.5) {
      const alpha = Math.sin((Math.min(1, (t - 0.8) / 1.2) * Math.PI) / 2) * (t > 5.2 ? (6.5 - t) / 1.3 : 1);
      ctx.globalAlpha = Math.max(0, alpha);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.letterSpacing = '4px';
      ctx.fillText('ACT I: THE REAL-WORLD PUZZLE', w / 2, h * 0.18);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Inter", sans-serif';
      ctx.letterSpacing = '0px';
      ctx.fillText('Campus Cafeteria Pricing Mystery', w / 2, h * 0.23);
    }

    // Build Curiosity (31.0s to 36.5s)
    // The exact prompt requirement:
    // "We know the total cost of different combinations. But what if we want to know the individual price of every item?"
    if (t >= 31.0 && t <= 36.5) {
      const alpha = Math.min(1.0, (t - 31.0) / 1.0) * (t > 35.5 ? (36.5 - t) / 1.0 : 1);
      ctx.globalAlpha = Math.max(0, alpha);

      const qW = 980;
      const qH = 110;
      const qX = (w - qW) / 2;
      const qY = h * 0.16;

      ctx.fillStyle = 'rgba(6, 11, 26, 0.96)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(qX, qY, qW, qH, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.textAlign = 'center';
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.fillText('BUILDING CURIOSITY', w / 2, qY + 34);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText('“We know the total cost of different combinations.”', w / 2, qY + 68);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px "Inter", sans-serif';
      ctx.fillText('“But what if we want to know the individual price of every item?”', w / 2, qY + 96);
    }

    ctx.restore();
  }

  drawEmergenceOverlay(ctx, t, w, h) {
    // 36.0 to 40.0s: Make unknowns emerge naturally from the objects
    const p = Math.min(1.0, (t - 36.0) / 1.2);
    const ease = Math.sin((p * Math.PI) / 2);

    ctx.save();
    ctx.globalAlpha = ease;

    // Dim background slightly to focus attention on emerging algebra
    ctx.fillStyle = 'rgba(3, 6, 18, 0.82)';
    ctx.fillRect(0, 0, w, h);

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('TRANSLATING OBJECTS TO UNKNOWNS', w / 2, h * 0.20);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 34px "Inter", sans-serif';
    ctx.fillText('Assigning Mathematical Variables to Unknown Prices', w / 2, h * 0.26);

    // 3 Floating Variable Cards corresponding to Coffee, Tea, Sandwich
    const items = [
      {
        icon: '☕',
        name: 'Coffee',
        varName: 'x',
        desc: 'Coffee Price',
        color: '#00f0ff',
        x: w * 0.22,
        y: h * 0.50
      },
      {
        icon: '🍵',
        name: 'Tea',
        varName: 'y',
        desc: 'Tea Price',
        color: '#9d4edd',
        x: w * 0.50,
        y: h * 0.50
      },
      {
        icon: '🥪',
        name: 'Sandwich',
        varName: 'z',
        desc: 'Sandwich Price',
        color: '#ff9e00',
        x: w * 0.78,
        y: h * 0.50
      }
    ];

    items.forEach(it => {
      const cardW = 340;
      const cardH = 220;
      const cx = it.x - cardW / 2;
      const cy = it.y - cardH / 2;

      ctx.fillStyle = 'rgba(8, 14, 34, 0.95)';
      ctx.strokeStyle = it.color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = it.color;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Icon
      ctx.font = '50px "Apple Color Emoji", sans-serif';
      ctx.fillText(it.icon, it.x, cy + 68);

      // Variable Name in JetBrains Mono
      ctx.fillStyle = it.color;
      ctx.font = 'bold 46px "JetBrains Mono", monospace';
      ctx.fillText(`${it.varName}`, it.x, cy + 130);

      // Description
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 18px "Inter", sans-serif';
      ctx.fillText(`= ${it.desc}`, it.x, cy + 175);
    });

    // Bottom Resulting Equations preview
    const eqY = h * 0.76;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect((w - 1280) / 2, eqY, 1280, 85, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText('Order 1: x + y = 5    |    Order 2: x + z = 8    |    Order 3: y + z = 7', w / 2, eqY + 52);

    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = Scene1Cafeteria;
}
