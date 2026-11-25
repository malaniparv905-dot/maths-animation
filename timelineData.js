const _CONFIG = {
  "project": {
    "title": "Cinematic 3D Mathematics Explainer — Gaussian Elimination",
    "version": "2.0.0",
    "resolution": {
      "width": 1920,
      "height": 1080
    },
    "fps": 24,
    "totalDuration": 300.0,
    "audioTrack": {
      "type": "ambient_cinematic_score",
      "source": "assets/cinematic_ambient_score.wav",
      "volume": "-22dB (mild, low volume)",
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
      "endTime": 40.0,
      "duration": 40.0,
      "objective": "Introduce a real-world puzzle with multiple unknown prices and bundle receipts.",
      "tracks": {
        "backgroundTrack": { "type": "realistic_cafeteria", "lighting": "Warm ambient cafe glow" },
        "mathVisualizationTrack": {
          "type": "bundle_purchases",
          "bundles": [
            { "time": 8.0, "items": ["Coffee", "Tea"], "total": 5, "currency": "₹" },
            { "time": 18.0, "items": ["Coffee", "Sandwich"], "total": 8, "currency": "₹" },
            { "time": 28.0, "items": ["Tea", "Sandwich"], "total": 7, "currency": "₹" }
          ]
        },
        "textTrack": [
          { "time": 2.0, "duration": 6.0, "title": "A REAL-WORLD PUZZLE", "subtitle": "Campus Cafeteria Pricing" },
          { "time": 9.0, "duration": 8.0, "title": "Order 1", "subtitle": "Coffee + Tea = ₹5" },
          { "time": 19.0, "duration": 8.0, "title": "Order 2", "subtitle": "Coffee + Sandwich = ₹8" },
          { "time": 29.0, "duration": 8.0, "title": "Order 3", "subtitle": "Tea + Sandwich = ₹7" },
          { "time": 34.0, "duration": 6.0, "title": "THE MYSTERY", "subtitle": "We know bundle totals... but what is the individual price of each item?" }
        ],
        "cameraAnimationTrack": [
          { "time": 0.0, "pos": [0, 18, 48], "target": [0, 8, 0], "fov": 52 },
          { "time": 40.0, "pos": [8, 12, 38], "target": [0, 8, 0], "fov": 48 }
        ],
        "transitionTrack": { "type": "dissolve_to_math_logic", "duration": 2.0 }
      }
    },
    {
      "id": "scene2",
      "name": "Why We Need a Method",
      "startTime": 40.0,
      "endTime": 80.0,
      "duration": 40.0,
      "objective": "Demonstrate that trial-and-error fails because equations are entangled. Establish the need for a systematic method.",
      "tracks": {
        "backgroundTrack": { "type": "entangled_math_space", "lighting": "Dark navy with red conflict alerts" },
        "mathVisualizationTrack": {
          "type": "guessing_vs_systematic",
          "trial": { "coffee": 4, "tea": 1, "sandwich": 4, "testOrder3": 5, "expected": 7, "failed": true },
          "equations": ["x + y = 5", "x + z = 8", "y + z = 7"]
        },
        "textTrack": [
          { "time": 41.0, "duration": 6.0, "title": "CAN WE JUST GUESS?", "subtitle": "Testing trial-and-error on entangled unknowns" },
          { "time": 48.0, "duration": 12.0, "title": "GUESS FAILS: 1 + 4 = ₹5 ≠ ₹7", "subtitle": "Satisfying two conditions breaks the third! Variables are interdependent." },
          { "time": 62.0, "duration": 8.0, "title": "THE REAL PROBLEM", "subtitle": "In larger systems with 4, 10, or 100 unknowns, informal algebra becomes impossible." },
          { "time": 71.0, "duration": 9.0, "title": "THE CENTRAL NEED", "subtitle": "We need a systematic method to simplify equations without changing their solution." }
        ],
        "cameraAnimationTrack": [
          { "time": 40.0, "pos": [0, 0, 42], "target": [0, 0, 0], "fov": 48 },
          { "time": 80.0, "pos": [0, 0, 36], "target": [0, 0, 0], "fov": 44 }
        ],
        "transitionTrack": { "type": "spatial_grid_expand", "duration": 2.0 }
      }
    },
    {
      "id": "scene3",
      "name": "Understanding the Geometry",
      "startTime": 80.0,
      "endTime": 120.0,
      "duration": 40.0,
      "objective": "Show that each equation is a flat 3D plane and the common solution is their single unique point of intersection.",
      "tracks": {
        "backgroundTrack": { "type": "euclidean_3d_space", "lighting": "Cyan and purple directional rims" },
        "mathVisualizationTrack": {
          "type": "plane_intersections",
          "planes": [
            { "id": "p1", "eq": "x + y = 5", "normal": [1, 1, 0], "d": 5, "color": "rgba(0, 240, 255, 0.4)", "border": "#00f0ff" },
            { "id": "p2", "eq": "x + z = 8", "normal": [1, 0, 1], "d": 8, "color": "rgba(157, 78, 221, 0.4)", "border": "#9d4edd" },
            { "id": "p3", "eq": "y + z = 7", "normal": [0, 1, 1], "d": 7, "color": "rgba(255, 158, 0, 0.4)", "border": "#ff9e00" }
          ],
          "intersectionPoint": [3, 2, 5]
        },
        "textTrack": [
          { "time": 81.0, "duration": 7.0, "title": "THE GEOMETRIC MEANING", "subtitle": "Every linear equation in 3 variables defines a flat plane in 3D space" },
          { "time": 89.0, "duration": 9.0, "title": "TWO PLANES = A LINE", "subtitle": "Plane 1 (x+y=5) and Plane 2 (x+z=8) intersect along a continuous 1D line" },
          { "time": 99.0, "duration": 9.0, "title": "THREE PLANES = A SINGLE POINT", "subtitle": "Plane 3 (y+z=7) cuts through the line at exactly ONE location" },
          { "time": 109.0, "duration": 11.0, "title": "SOLVING IS FINDING THE INTERSECTION", "subtitle": "Point (3, 2, 5) satisfies all three planes simultaneously: Coffee=₹3, Tea=₹2, Sand=₹5" }
        ],
        "cameraAnimationTrack": [
          { "time": 80.0, "pos": [16, 12, 22], "target": [3, 2, 5], "fov": 46 },
          { "time": 120.0, "pos": [22, 14, 16], "target": [3, 2, 5], "fov": 42 }
        ],
        "transitionTrack": { "type": "flatten_to_matrix_canvas", "duration": 2.0 }
      }
    },
    {
      "id": "scene4",
      "name": "Introduce Gaussian Elimination",
      "startTime": 120.0,
      "endTime": 150.0,
      "duration": 30.0,
      "objective": "Formally introduce Gaussian Elimination and explain why equations are converted into an augmented matrix.",
      "tracks": {
        "backgroundTrack": { "type": "matrix_blueprint", "lighting": "Volumetric cyan brackets glow" },
        "mathVisualizationTrack": {
          "type": "matrix_encoding",
          "matrix": [[1, 1, 0, 5], [1, 0, 1, 8], [0, 1, 1, 7]]
        },
        "textTrack": [
          { "time": 121.0, "duration": 9.0, "title": "INTRODUCING GAUSSIAN ELIMINATION", "subtitle": "A systematic algorithm using Elementary Row Operations to simplify systems" },
          { "time": 131.0, "duration": 9.0, "title": "WHY CONVERT TO A MATRIX?", "subtitle": "Stripping away variables isolates the numbers, making manipulation systematic and clean" },
          { "time": 141.0, "duration": 9.0, "title": "THE GOAL: ROW ECHELON FORM", "subtitle": "Creating zeros below leading entries to untangle the system step by step" }
        ],
        "cameraAnimationTrack": [
          { "time": 120.0, "pos": [0, 0, 34], "target": [0, 0, 0], "fov": 44 },
          { "time": 150.0, "pos": [0, 0, 26], "target": [0, 0, 0], "fov": 38 }
        ],
        "transitionTrack": { "type": "focus_matrix_hud", "duration": 1.5 }
      }
    },
    {
      "id": "scene5",
      "name": "Teaching the Method (Row Operations & Elimination)",
      "startTime": 150.0,
      "endTime": 270.0,
      "duration": 120.0,
      "objective": "Deep step-by-step teaching of the 3 elementary row operations, pivot selection, targeted zeroing, row scaling, REF staircase, and back-substitution to RREF.",
      "tracks": {
        "backgroundTrack": { "type": "interactive_chalkboard_matrix", "lighting": "Dynamic focus lights on active rows & pivots" },
        "mathVisualizationTrack": {
          "type": "detailed_teaching_steps",
          "phases": [
            { "time": 150.0, "name": "The Three Sacred Row Operations (Why are they valid?)" },
            { "time": 170.0, "name": "Step 1: Pivot 1 at (1,1) & Eliminate R2 below: R2 ← R2 - R1" },
            { "time": 194.0, "name": "Step 2: Scale Row 2 to Normalize Pivot: R2 ← (-1)·R2" },
            { "time": 214.0, "name": "Step 3: Pivot 2 at (2,2) & Eliminate R3 below: R3 ← R3 - R2" },
            { "time": 238.0, "name": "Step 4: Scale Row 3: R3 ← (1/2)·R3  ⟹  ROW ECHELON FORM (REF)" },
            { "time": 254.0, "name": "Step 5: Back-Substitution / Jordan Elimination  ⟹  RREF (3, 2, 5)" },
            { "time": 262.0, "name": "Validation: Returning to Cafeteria Receipts & Solution Verification" }
          ]
        },
        "textTrack": [
          { "time": 151.0, "duration": 8.0, "title": "RULE 1: ROW SWAP (Ri ⟷ Rj)", "subtitle": "Reordering equations changes nothing about what makes them true" },
          { "time": 159.0, "duration": 8.0, "title": "RULE 2: ROW SCALING (Ri ← k·Ri)", "subtitle": "Multiplying both sides by a non-zero number maintains perfect balance" },
          { "time": 167.0, "duration": 8.0, "title": "RULE 3: ROW COMBINATION (Rj ← Rj + c·Ri)", "subtitle": "Adding multiples of equations eliminates variables while preserving truth" },
          { "time": 175.0, "duration": 10.0, "title": "STEP 1: PIVOT 1 (COL 1)  ⟹  R2 ← R2 - R1", "subtitle": "Subtracting Row 1 from Row 2 forces a ZERO below Pivot 1: [1-1, 0-1, 1-0 | 8-5]" },
          { "time": 195.0, "duration": 9.0, "title": "STEP 2: NORMALIZE PIVOT 2  ⟹  R2 ← (-1)·R2", "subtitle": "Multiply by -1 to create a positive leading 1 in Row 2: [0, 1, -1 | -3]" },
          { "time": 215.0, "duration": 10.0, "title": "STEP 3: PIVOT 2 (COL 2)  ⟹  R3 ← R3 - R2", "subtitle": "Subtract Row 2 from Row 3 to force ZERO in Column 2: [0-0, 1-1, 1-(-1) | 7-(-3)]" },
          { "time": 239.0, "duration": 10.0, "title": "STEP 4: ROW ECHELON FORM  ⟹  R3 ← (1/2)·R3", "subtitle": "Leading 1 in Row 3 reveals: 1z = 5! Sandwich is ₹5!" },
          { "time": 254.0, "duration": 8.0, "title": "STEP 5: BACK-SUBSTITUTION (RREF)", "subtitle": "Substitute upwards: y = ₹2 (Tea), x = ₹3 (Coffee)  ⟹  All unknowns solved!" },
          { "time": 262.0, "duration": 8.0, "title": "VALIDATION: REAL-WORLD PROBLEM", "subtitle": "Checking receipts: 3+2=₹5, 3+5=₹8, 2+5=₹7  ✔ All orders verified!" }
        ],
        "cameraAnimationTrack": [
          { "time": 150.0, "pos": [0, 0, 28], "target": [0, 0, 0], "fov": 42 },
          { "time": 210.0, "pos": [0, -1, 24], "target": [0, -0.5, 0], "fov": 38 },
          { "time": 270.0, "pos": [0, 0, 22], "target": [0, 0, 0], "fov": 35 }
        ],
        "transitionTrack": { "type": "matrix_to_3d_morph", "duration": 2.0 }
      }
    },
    {
      "id": "scene6",
      "name": "Return to the Geometry",
      "startTime": 270.0,
      "endTime": 285.0,
      "duration": 15.0,
      "objective": "Visually show that simplified equations x=3, y=2, z=5 are orthogonal planes that share the exact same intersection point.",
      "tracks": {
        "backgroundTrack": { "type": "geometric_overlay_space", "lighting": "Dual spotlight on intersection point (3,2,5)" },
        "mathVisualizationTrack": {
          "type": "invariance_verification",
          "point": [3, 2, 5],
          "originalPlanes": ["x + y = 5", "x + z = 8", "y + z = 7"],
          "canonicalPlanes": ["x = 3", "y = 2", "z = 5"]
        },
        "textTrack": [
          { "time": 271.0, "duration": 7.0, "title": "THE GOLDEN PRINCIPLE", "subtitle": "Original tilted planes rotate into simple axis-aligned planes" },
          { "time": 278.0, "duration": 7.0, "title": "THE SOLUTION NEVER MOVED", "subtitle": "Both systems intersect at the EXACT SAME POINT: (3, 2, 5)" }
        ],
        "cameraAnimationTrack": [
          { "time": 270.0, "pos": [15, 11, 18], "target": [3, 2, 5], "fov": 42 },
          { "time": 285.0, "pos": [9, 7, 11], "target": [3, 2, 5], "fov": 34 }
        ],
        "transitionTrack": { "type": "portal_tunnel_zoom", "duration": 1.5 }
      }
    },
    {
      "id": "scene7",
      "name": "Conclusion (The Echelon Staircase)",
      "startTime": 285.0,
      "endTime": 300.0,
      "duration": 15.0,
      "objective": "Conclude with the glowing echelon staircase and the core conceptual takeaway.",
      "tracks": {
        "backgroundTrack": { "type": "radiant_staircase_portal", "lighting": "Cyan step edges with radiant white core" },
        "mathVisualizationTrack": { "type": "ascending_steps" },
        "textTrack": [
          { "time": 286.0, "duration": 6.0, "title": "GAUSSIAN ELIMINATION", "subtitle": "Complex systems.  Simplified step by step.  One solution preserved." },
          { "time": 293.0, "duration": 7.0, "title": "THE POWER OF LINEAR ALGEBRA", "subtitle": "From everyday questions to multidimensional clarity." }
        ],
        "cameraAnimationTrack": [
          { "time": 285.0, "pos": [0, 4, 12], "target": [0, 8, -25], "fov": 58 },
          { "time": 300.0, "pos": [0, 24, -30], "target": [0, 30, -65], "fov": 50 }
        ],
        "transitionTrack": { "type": "fade_to_black", "duration": 2.0 }
      }
    }
  ]
}
;
if (typeof window !== "undefined") window.TIMELINE_CONFIG = _CONFIG;
if (typeof module !== "undefined") module.exports = _CONFIG;
