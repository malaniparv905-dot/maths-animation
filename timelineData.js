const _CONFIG = {
  "project": {
    "title": "Cinematic 3D Mathematics Explainer — Gaussian Elimination",
    "version": "3.0.0",
    "resolution": {
      "width": 1920,
      "height": 1080
    },
    "fps": 24,
    "totalDuration": 300.0,
    "audioTrack": {
      "type": "mastered_voice_and_ambient_score",
      "source": "final_audio_mix.wav",
      "voiceEnhanced": "voice_enhanced.wav",
      "music": "assets/cinematic_ambient_score.wav",
      "volume": "-18.1 LUFS integrated",
      "sampleRate": 48000,
      "format": "Stereo PCM / AAC"
    },
    "theme": {
      "backgroundDark": "#040714",
      "backgroundNavy": "#0a132c",
      "cyanGlow": "#00f0ff",
      "blueAccent": "#0077ff",
      "purpleGlow": "#9d4edd",
      "orangeGlow": "#ff9e00",
      "greenGlow": "#00f59b",
      "redAlert": "#ff3b5c",
      "textLight": "#f8fafc",
      "textMuted": "#94a3b8"
    }
  },
  "scenes": [
    {
      "id": "scene1",
      "name": "The Cafeteria Mystery",
      "startTime": 0.0,
      "endTime": 35.0,
      "duration": 35.0,
      "objective": "Introduce a real-world puzzle with multiple unknown prices and bundle receipts.",
      "tracks": {
        "backgroundTrack": { "type": "realistic_cafeteria", "lighting": "Warm ambient cafe glow" },
        "mathVisualizationTrack": {
          "type": "bundle_purchases",
          "bundles": [
            { "time": 6.0, "items": ["Coffee", "Tea"], "total": 5, "currency": "₹" },
            { "time": 15.0, "items": ["Coffee", "Sandwich"], "total": 8, "currency": "₹" },
            { "time": 24.0, "items": ["Tea", "Sandwich"], "total": 7, "currency": "₹" }
          ]
        },
        "textTrack": [
          { "time": 1.5, "duration": 6.0, "title": "A REAL-WORLD PUZZLE", "subtitle": "Campus Cafeteria Pricing" },
          { "time": 7.0, "duration": 7.0, "title": "Order 1", "subtitle": "Coffee + Tea = ₹5" },
          { "time": 16.0, "duration": 7.0, "title": "Order 2", "subtitle": "Coffee + Sandwich = ₹8" },
          { "time": 25.0, "duration": 7.0, "title": "Order 3", "subtitle": "Tea + Sandwich = ₹7" },
          { "time": 30.0, "duration": 5.0, "title": "THE MYSTERY", "subtitle": "Can we use these totals to find the individual price of each item?" }
        ],
        "transitionTrack": { "type": "dissolve_to_math_logic", "duration": 2.0 }
      }
    },
    {
      "id": "scene2",
      "name": "Why We Need a Method",
      "startTime": 35.0,
      "endTime": 68.0,
      "duration": 33.0,
      "objective": "Establish variables x, y, z and explain why trial-and-error fails with multiple unknowns.",
      "tracks": {
        "backgroundTrack": { "type": "entangled_math_space", "lighting": "Dark navy with cyan highlights" },
        "mathVisualizationTrack": {
          "type": "guessing_vs_systematic",
          "equations": ["x + y = 5", "x + z = 8", "y + z = 7"]
        },
        "textTrack": [
          { "time": 36.0, "duration": 6.0, "title": "DEFINING THE UNKNOWNS", "subtitle": "x = Coffee, y = Tea, z = Sandwich" },
          { "time": 42.0, "duration": 14.0, "title": "THE LINEAR SYSTEM", "subtitle": "1) x + y = 5   2) x + z = 8   3) y + z = 7" },
          { "time": 57.0, "duration": 6.0, "title": "THE SIMULTANEOUS GOAL", "subtitle": "Values of x, y, and z that satisfy all three equations simultaneously" },
          { "time": 63.0, "duration": 5.0, "title": "WHY MANUAL ELIMINATION FAILS", "subtitle": "In larger systems, manual guesswork leads to circular traps. We need an algorithm." }
        ],
        "transitionTrack": { "type": "spatial_grid_expand", "duration": 1.5 }
      }
    },
    {
      "id": "scene3",
      "name": "Understanding the Geometry",
      "startTime": 68.0,
      "endTime": 82.0,
      "duration": 14.0,
      "objective": "Show that each equation is a flat 3D plane and their common solution is the unique intersection point (3, 2, 5).",
      "tracks": {
        "backgroundTrack": { "type": "euclidean_3d_space", "lighting": "Cyan and purple directional rims" },
        "mathVisualizationTrack": {
          "type": "plane_intersections",
          "intersectionPoint": [3, 2, 5]
        },
        "textTrack": [
          { "time": 69.0, "duration": 6.0, "title": "3D GEOMETRIC INTERSECTION", "subtitle": "Each equation defines a flat 2D plane in 3D Euclidean space" },
          { "time": 75.0, "duration": 7.0, "title": "ONE UNIQUE SOLUTION POINT", "subtitle": "All 3 planes intersect at exactly one coordinate: (3, 2, 5)" }
        ],
        "transitionTrack": { "type": "flatten_to_matrix_canvas", "duration": 1.5 }
      }
    },
    {
      "id": "scene4",
      "name": "Introduce Gaussian Elimination",
      "startTime": 82.0,
      "endTime": 97.0,
      "duration": 15.0,
      "objective": "Introduce the Augmented Matrix and the 2-Stage Assembly Line model.",
      "tracks": {
        "backgroundTrack": { "type": "matrix_blueprint", "lighting": "Volumetric cyan brackets glow" },
        "mathVisualizationTrack": {
          "type": "matrix_encoding",
          "matrix": [[1, 1, 0, 5], [1, 0, 1, 8], [0, 1, 1, 7]]
        },
        "textTrack": [
          { "time": 83.0, "duration": 7.0, "title": "THE AUGMENTED MATRIX", "subtitle": "Stripping away variable symbols isolates the numbers into structured arrays" },
          { "time": 90.0, "duration": 7.0, "title": "THE 2-STAGE ASSEMBLY LINE", "subtitle": "Stage 1: Forward Elimination to Staircase  ⟶  Stage 2: Sequential Back-Substitution" }
        ],
        "transitionTrack": { "type": "focus_matrix_hud", "duration": 1.5 }
      }
    },
    {
      "id": "scene5",
      "name": "Teaching the Method (Row Operations & Elimination)",
      "startTime": 97.0,
      "endTime": 244.0,
      "duration": 147.0,
      "objective": "Comprehensive teaching: 3 legal operations, 3 Think Moments, step-by-step arithmetic, and sequential back-substitution.",
      "tracks": {
        "backgroundTrack": { "type": "interactive_chalkboard_matrix", "lighting": "Dynamic focus lights on active rows & pivots" },
        "mathVisualizationTrack": {
          "type": "detailed_teaching_steps",
          "phases": [
            { "time": 97.0,  "name": "The Three Legal Row Operations & Invariance" },
            { "time": 125.0, "name": "Objective: Create Zeros Below Pivots into Upper Triangular Form" },
            { "time": 138.0, "name": "Step 1: Pivot 1 (Col 1) & Think Moment 1 & R2 ← R2 - R1" },
            { "time": 160.0, "name": "Step 2: Pivot 2 & Think Moment 2 & R2 ← (-1)·R2" },
            { "time": 176.0, "name": "Step 3: Pivot 2 (Col 2) & Think Moment 3 & R3 ← R3 - R2" },
            { "time": 191.0, "name": "Step 4: Scale Row 3: R3 ← (1/2)·R3  ⟹  REF Staircase" },
            { "time": 200.0, "name": "Progress Milestone: Reduced Number of Unknowns" },
            { "time": 213.0, "name": "Step 5: Sequential Bottom-Up Back-Substitution (z=5, y=2, x=3)" }
          ]
        },
        "transitionTrack": { "type": "matrix_to_3d_morph", "duration": 1.5 }
      }
    },
    {
      "id": "scene6",
      "name": "Return to the Geometry",
      "startTime": 244.0,
      "endTime": 261.0,
      "duration": 17.0,
      "objective": "Verify the solution against original cafeteria equations and confirm geometric invariance at (3, 2, 5).",
      "tracks": {
        "backgroundTrack": { "type": "geometric_overlay_space", "lighting": "Dual spotlight on intersection point (3,2,5)" },
        "mathVisualizationTrack": {
          "type": "invariance_verification",
          "point": [3, 2, 5]
        },
        "textTrack": [
          { "time": 245.0, "duration": 8.0, "title": "VERIFICATION: RECEIPTS SATISFIED", "subtitle": "3+2=₹5, 3+5=₹8, 2+5=₹7  ✔ All three equations verified!" },
          { "time": 253.0, "duration": 8.0, "title": "GEOMETRIC INVARIANCE", "subtitle": "Row operations transformed tilted planes into orthogonal planes. The point (3,2,5) never moved." }
        ],
        "transitionTrack": { "type": "portal_tunnel_zoom", "duration": 1.5 }
      }
    },
    {
      "id": "scene7",
      "name": "Conclusion (The Echelon Staircase)",
      "startTime": 261.0,
      "endTime": 300.0,
      "duration": 39.0,
      "objective": "Conclude with The 4 Steps Memory Recap and the golden conceptual takeaway.",
      "tracks": {
        "backgroundTrack": { "type": "radiant_staircase_portal", "lighting": "Cyan step edges with radiant white core" },
        "mathVisualizationTrack": { "type": "memory_recap_cards" },
        "textTrack": [
          { "time": 262.0, "duration": 15.0, "title": "THE 4 STEPS TO GAUSSIAN ELIMINATION", "subtitle": "1. Find Pivot  2. Eliminate Below  3. Upper Triangular Form  4. Back-Substitute" },
          { "time": 278.0, "duration": 10.0, "title": "THE GOLDEN PRINCIPLE", "subtitle": "“Gaussian Elimination doesn’t change the solution. It changes the equations into a form where the solution becomes impossible to miss.”" },
          { "time": 288.0, "duration": 12.0, "title": "SYSTEM SIMPLIFIED", "subtitle": "From a complicated system of equations to a simple step-by-step process." }
        ],
        "transitionTrack": { "type": "fade_to_black", "duration": 3.5 }
      }
    }
  ]
};

if (typeof window !== "undefined") window.TIMELINE_CONFIG = _CONFIG;
if (typeof module !== "undefined") module.exports = _CONFIG;
