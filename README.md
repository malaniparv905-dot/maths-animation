# Gaussian Elimination — Cinematic 3D Mathematics Explainer

[![Public Repository](https://img.shields.io/badge/GitHub-Public%20Repository-blue?logo=github)](https://github.com/malaniparv905-dot/maths-animation)
[![Video Duration](https://img.shields.io/badge/Duration-05%3A00.00-brightgreen)](gaussian_elimination_cinematic_explainer.mp4)
[![Resolution](https://img.shields.io/badge/Resolution-1080p%20Full%20HD-cyan)](gaussian_elimination_cinematic_explainer.mp4)
[![Framerate](https://img.shields.io/badge/Framerate-24%20fps-purple)](gaussian_elimination_cinematic_explainer.mp4)

A complete, timeline-based mathematical animation and educational master film explaining **Gaussian Elimination**, linear systems, 3D Euclidean geometry, elementary row operations, and echelon staircase simplification.

---

## 📽️ Submission Deliverables

1. **Final Rendered Master MP4 Video (Enhanced Voice & Synced Audio)**:
   * Master Video File: [`FINAL_GAUSSIAN_ELIMINATION.mp4`](FINAL_GAUSSIAN_ELIMINATION.mp4)
   * Original Ambient-Only Video: [`gaussian_elimination_cinematic_explainer.mp4`](gaussian_elimination_cinematic_explainer.mp4)
   * Duration: **`05:00.00` (Exactly 300.00 seconds / 7,200 frames @ 24 fps)** (strictly $\le 5\text{m } 15\text{s}$)
   * Resolution: **1920 × 1080 (1080p Full HD, 16:9 widescreen)**
   * Audio Track: Studio-enhanced natural voice narration paired with subtle sidechain-ducked ambient neoclassical score (-18.1 LUFS integrated, -5.6 dBFS true peak headroom).
2. **Audio Mastering & Voice Synchronization Pipeline**:
   * Processing Script: [`sync_audio.py`](sync_audio.py)
   * Enhanced Clean Voice Track: [`voice_enhanced.wav`](voice_enhanced.wav) (FFT de-noising, 3-band parametric EQ, gentle compression, de-essing, loudnorm)
   * Master Stereo Audio Mix: [`final_audio_mix.wav`](final_audio_mix.wav)
   * Comprehensive Audio Engineering Report: [`audio_sync_report.md`](audio_sync_report.md)
3. **Complete Animation Source Code & Editable Project Files**:
   * Animation Engine: [`src/`](src/)
     * `scene1_mystery.js`: Cafeteria Mystery & Real-World Pricing
     * `scene2_why_elimination_fails.js`: Why High-School Elimination Breaks Down ($n \ge 3$)
     * `scene3_planes3d.js`: 3D Euclidean Geometry of Intersecting Planes
     * `scene4_matrix_intro.js`: Augmented Matrix & The 2-Stage Assembly Line Model
     * `scene5_elimination.js`: 3 Think Moments, 8-Step Physical Transformations, and Sequential Back-Substitution
     * `scene6_invariance.js`: Geometric Invariance Bridge (Preserving Solution $(3, 2, 5)$)
     * `scene7_staircase.js`: The 4 Steps to Gaussian Elimination Memory Recap
   * Render Pipeline: [`render.js`](render.js) (Multi-threaded Puppeteer + Canvas 2D / Three.js + FFmpeg exporter)
   * Local Video Streaming Server: [`server.js`](server.js)
   * Cinema Player UI: [`watch.html`](watch.html) (HTML5 player with chapter markers & timeline scrubber)
   * Interactive Studio Inspector: [`index.html`](index.html)
   * Soundtrack Generator: [`generate_soundtrack.py`](generate_soundtrack.py)
   * Production Timeline Data: [`timeline.json`](timeline.json) and [`timelineData.js`](timelineData.js)

---

## 🧠 Personal-Teacher Pedagogical Design

### 1. "Why Gaussian Elimination over Ordinary Elimination?" (Scene 2)
* Explains that for 2 equations, high-school manual elimination works well on paper.
* Demonstrates why manual elimination breaks down as unknowns grow: without a standardized sequence, eliminating one variable randomly reintroduces previously eliminated variables, creating circular algebra.
* Highlights real-world computational necessity: 3D graphics, GPS, engineering, and AI require a deterministic, non-guessing algorithm.

### 2. "What Is Gaussian Elimination Actually?" (Scene 4)
* Demystifies the algorithm as a **two-stage assembly line**:
  1. **Stage 1 (Forward Elimination)**: Systematically creates a staircase of zeros beneath active pivots to convert the system into Upper Triangular Form.
  2. **Stage 2 (Back-Substitution)**: Solves the isolated bottom unknown and feeds values upward like falling dominoes.

### 3. Three Active Learning "Think Moments" (Scene 5)
Interactive pauses give the viewer 2.5 seconds with a visual progress bar to predict the next mathematical step:
* **Think Moment 1 (`02:50`)**: *"Pause. How can we eliminate the 1 below the pivot?"*  
  $\to$ Reveals $R_2 \leftarrow R_2 - R_1$, explaining that subtraction eliminates the leading coefficient because both match, creating zero without changing the solution set.
* **Think Moment 2 (`03:14`)**: *"Pause. Why might we change this pivot from -1 to 1?"*  
  $\to$ Reveals $R_2 \leftarrow (-1) \cdot R_2$, explaining that scaling preserves exact balance while standardizing the pivot to $+1$ for easier arithmetic (clarified as a convenience, not a mandatory rule).
* **Think Moment 3 (`03:34`)**: *"Pause. Which operation will turn the coefficient below the second pivot into zero?"*  
  $\to$ Reveals $R_3 \leftarrow R_3 - R_2$, showing why subtracting Row 2 eliminates $y$ to isolate $z$ without disturbing the zero in Column 1.

### 4. Physical 8-Step Elementary Row Operations
Every transformation follows an 8-step teaching sequence:
1. Highlight Active Pivot (Golden yellow indicator)
2. Highlight Target Coefficient (Red indicator)
3. State Pedagogical Objective (*"Force a ZERO in Column 1 below Pivot 1"*)
4. Display Row Operation Formula ($R_j \leftarrow R_j - c \cdot R_i$)
5. Animate Affected Row (Gentle pulse)
6. Element-by-Element Arithmetic Breakdown (e.g., `[0 - 0, 1 - 1, 1 - (-1) | 7 - (-3)] = [0, 0, 2 | 10]`)
7. Display Resulting Matrix with Cyan Zero Highlight
8. Progress Achieved Report (*"x is eliminated from Row 2! Column 1 is locked."*)

### 5. Sequential Bottom-Up Back-Substitution
* Explains **why the bottom row is solved first**: all other unknowns were eliminated, directly yielding $1z = 5 \implies z = 5$.
* Solves upward sequentially:
  * $z = 5 \implies 1y - 5 = -3 \implies y = 2$
  * $y = 2 \implies 1x + 2 = 5 \implies x = 3$
* Color-coded **Persistent Known Badges** remain visible on the right sidebar so viewers never lose track of solved variables.

### 6. "The 4 Steps to Gaussian Elimination" Memory Recap (Scene 7)
Sequential 4-card algorithm takeaway:
1. **FIND THE PIVOT**
2. **ELIMINATE BELOW**
3. **BUILD UPPER TRIANGULAR FORM**
4. **BACK-SUBSTITUTE**

> *“Gaussian Elimination doesn’t change the solution. It changes the equations into a form where the solution becomes impossible to miss.”*

---

## 📐 Mathematical Derivation & Accuracy

### 1. The Cafeteria Mystery
* **Order 1**: Coffee ($x$) $+$ Tea ($y$) $= ₹5$
* **Order 2**: Coffee ($x$) $+$ Sandwich ($z$) $= ₹8$
* **Order 3**: Tea ($y$) $+$ Sandwich ($z$) $= ₹7$

$$\begin{cases}
1x + 1y + 0z = 5 \\
1x + 0y + 1z = 8 \\
0x + 1y + 1z = 7
\end{cases}$$

### 2. 3D Geometric Plane Intersection
* **Plane 1 ($x + y = 5$)**: Normal vector $\mathbf{n}_1 = (1, 1, 0)$ (Electric Cyan)
* **Plane 2 ($x + z = 8$)**: Normal vector $\mathbf{n}_2 = (1, 0, 1)$ (Purple)
* **Plane 3 ($y + z = 7$)**: Normal vector $\mathbf{n}_3 = (0, 1, 1)$ (Warm Amber)

Unique Intersection Point:
$$\mathbf{P} = (x, y, z) = (3, 2, 5)$$

### 3. Matrix Transformation Sequence
$$\left[\begin{array}{ccc|c} 1 & 1 & 0 & 5 \\ 1 & 0 & 1 & 8 \\ 0 & 1 & 1 & 7 \end{array}\right]
\xrightarrow{R_2 \leftarrow R_2 - R_1}
\left[\begin{array}{ccc|c} 1 & 1 & 0 & 5 \\ 0 & -1 & 1 & 3 \\ 0 & 1 & 1 & 7 \end{array}\right]
\xrightarrow{R_2 \leftarrow -R_2}
\left[\begin{array}{ccc|c} 1 & 1 & 0 & 5 \\ 0 & 1 & -1 & -3 \\ 0 & 1 & 1 & 7 \end{array}\right]$$

$$\xrightarrow{R_3 \leftarrow R_3 - R_2}
\left[\begin{array}{ccc|c} 1 & 1 & 0 & 5 \\ 0 & 1 & -1 & -3 \\ 0 & 0 & 2 & 10 \end{array}\right]
\xrightarrow{R_3 \leftarrow \frac{1}{2} R_3}
\left[\begin{array}{ccc|c} \mathbf{1} & 1 & 0 & 5 \\ 0 & \mathbf{1} & -1 & -3 \\ 0 & 0 & \mathbf{1} & 5 \end{array}\right]$$

---

## 🚀 Running Locally

### Prerequisites
* Node.js (v18+)
* Python 3 (v3.8+)
* FFmpeg (with libx264 and AAC support)

### Installation
```bash
git clone https://github.com/malaniparv905-dot/maths-animation.git
cd maths-animation
npm install
```

### Launch Interactive Player
```bash
npm start
```
Open [http://localhost:3000/watch.html](http://localhost:3000/watch.html) in your browser.

### Re-render Video from Source
```bash
npm run render
```
The renderer will generate all 7 scenes in parallel and mux the final 5-minute 1080p MP4.

---

## 📄 License
ISC License — Free for academic, educational, and instructional use.
