# Audio Mastering, Voice Enhancement & Synchronization Report

### Project: Gaussian Elimination — Cinematic 3D Mathematics Explainer
* **Final Master Video**: [`FINAL_GAUSSIAN_ELIMINATION.mp4`](file:///Users/parvmalani/Downloads/maths/FINAL_GAUSSIAN_ELIMINATION.mp4)
* **Cloned Git Repository**: [`/Users/parvmalani/Downloads/maths-animation`](file:///Users/parvmalani/Downloads/maths-animation)
* **Active Workspace**: [`/Users/parvmalani/Downloads/maths`](file:///Users/parvmalani/Downloads/maths)
* **Desktop Mirror**: [`/Users/parvmalani/Desktop/animated video_maths`](file:///Users/parvmalani/Desktop/animated%20video_maths)
* **Public GitHub URL**: [https://github.com/malaniparv905-dot/maths-animation](https://github.com/malaniparv905-dot/maths-animation)

---

## 1. Input Audio Analysis & Voice Enhancement

### Input File
* **Source Voice**: `gaussian_voice.m4a` (Apple Voice Memos, 16,000 Hz mono AAC, raw duration: `04:11.39` / 251.39s)
* **Original Acoustic Properties**:
  * Integrated Loudness: **-27.1 LUFS** (quiet recording)
  * Peak Level: -7.7 dBFS
  * Ambient Profile: Room air, slight microphone chassis rumble, chest resonance muddiness around 250–320 Hz, slight sibilance on fricatives.

### High-Fidelity DSP Enhancement Chain Applied
The voice was processed through a non-destructive 8-stage DSP mastering chain to preserve natural vocal timbre and human identity while elevating clarity to broadcast standards:

1. **Subsonic High-Pass Filter (`highpass=f=85`)**: Eliminates room rumble, AC hum, and table handling vibrations below 85 Hz.
2. **Adaptive FFT Denoising (`afftdn=nr=15:nf=-40:tn=1`)**: Eliminates background hiss and floor noise transparently without creating watery, metallic, or robotic phase artifacts.
3. **Parametric De-Mudding EQ (`equalizer=f=280:width_type=o:w=1.2:g=-3.5`)**: Cuts the boomy, boxed-in chest resonance typical of iPad/phone microphones around 280 Hz.
4. **Vocal Presence Boost (`equalizer=f=2800:width_type=o:w=1.0:g=+3.5`)**: Elevates articulation, speech intelligibility, and mathematical clarity in the 2.8 kHz consonant register.
5. **High-End Air & Sheen (`equalizer=f=5500:width_type=o:w=1.0:g=+2.0`)**: Restores high-frequency openness and brilliance.
6. **Dynamic De-Esser (`deesser=i=0.4:m=0.5:f=0.5`)**: Tames sharp sibilant "s", "z", and "sh" sounds.
7. **Downlink Noise Expander / Gate (`agate=threshold=-38dB:ratio=2.5:attack=15:release=200:range=-24dB`)**: Creates silence during pauses without clipping word onsets or endings.
8. **Transparent Dynamic Compression (`acompressor=threshold=-21dB:ratio=2.5:attack=15:release=120:makeup=2dB`)**: Tightens dynamic range so quiet words remain clear while loud syllables never distort.
9. **EBU R128 Loudness Normalization (`loudnorm=I=-17:TP=-1.5:LRA=7`)**: Standardizes voice loudness to **-17.0 LUFS** with True Peak at **-1.5 dBFS**.

* **Enhanced Voice Master Output**: [`voice_enhanced.wav`](file:///Users/parvmalani/Downloads/maths/voice_enhanced.wav) (48,000 Hz, 16-bit PCM).

---

## 2. Time-Alignment & Visual Synchronization

The original recording duration is 4:11 (251.4s), while the video is 5:00 (300.0s). The 48.6-second difference was distributed across natural educational pauses rather than unnaturally stretching or altering the human speaking tempo.

### Synchronized Segment Map (21 Chunks on 300.0s Master Timeline)

| ID | Spoken Content | Voice Range | Video Target | Corresponding Visual On Screen |
| :--- | :--- | :---: | :---: | :--- |
| `c01` | *"Imagine you are at a cafe... price of each item?"* | 1.4s – 16.7s | `00:02.0 – 00:17.3` | Cafeteria title card & Order 1 ($x+y=₹5$) |
| `c02` | *"This is exactly the kind of problem mathematics can solve..."* | 17.5s – 30.2s | `00:19.3 – 00:31.9` | Order 2 ($x+z=₹8$), Order 3 ($y+z=₹7$), Mystery banner |
| `c03` | *"Let's assume the prices of three items are x, y, z... 3 equations..."* | 31.2s – 50.6s | `00:36.0 – 00:55.4` | System equations and variable declarations card |
| `c04` | *"Our goal is to find values that satisfy all 3 simultaneously."* | 51.4s – 57.1s | `00:57.5 – 00:63.1` | Simultaneous highlight & manual elimination breakdown |
| `c05` | *(3D Geometry orbital showcase with musical focus)* | — | `01:08.0 – 01:21.5` | 3 Planes intersecting at unique point $(3, 2, 5)$ |
| `c06` | *"Instead of solving each separately... organize into augmented matrix."* | 58.0s – 69.0s | `01:21.5 – 01:32.5` | Augmented Matrix brackets and column numbers form |
| `c07` | *"Gaussian elimination works by transforming... 3 row operations..."* | 70.0s – 96.7s | `01:36.0 – 02:02.7` | 3 Row Operations Cards + Invariance Principle banner |
| `c08` | *"Our main objective is to create zeros below pivots into upper triangular..."* | 97.2s – 108.4s | `02:05.0 – 02:16.2` | Upper triangular staircase roadmap and pivot 1 anchor |
| `c09` | *"Let's begin with first pivot... eliminate x in second row..."* | 110.6s – 123.4s | `02:18.5 – 02:31.3` | Step 1 Pivot 1 highlight & Think Moment 1 question |
| `c10` | *(Think Moment 1 Viewer Prediction Pause)* | — | `02:31.3 – 02:33.8` | 2.5-second visual thinking countdown bar |
| `c11` | *"This gives us a zero in the first column of the second row."* | 126.2s – 129.7s | `02:34.0 – 02:37.4` | $R_2 \leftarrow R_2 - R_1$, arithmetic `[1-1, 0-1, 1-0 | 8-5] = [0, -1, 1 | 3]` |
| `c12` | *"Now the second row becomes simpler... multiply by -1 to make pivot 1..."* | 130.8s – 145.2s | `02:40.0 – 02:54.5` | Think Moment 2 & Row 2 scaling: $R_2 \leftarrow (-1) \cdot R_2$ |
| `c13` | *"Next we use second pivot to eliminate y in third row... subtract R2..."* | 146.0s – 158.1s | `02:56.5 – 03:08.6` | Think Moment 3 & $R_3 \leftarrow R_3 - R_2$ (`[0, 0, 2 | 10]`) |
| `c14` | *"Finally we divide the last row by 2. Now matrix is in upper triangular form."* | 158.9s – 166.6s | `03:11.5 – 03:19.2` | $R_3 \leftarrow \frac{1}{2} R_3$, REF staircase of 1s and 0s |
| `c15` | *"Notice what we have achieved... reduced number of unknowns..."* | 167.0s – 178.1s | `03:20.5 – 03:31.7` | Milestone banner: Reduced unknowns column by column |
| `c16` | *"Now comes the easy part: back-substitution... z = 5."* | 178.7s – 188.8s | `03:33.5 – 03:43.6` | Row 3 solves $z = 5$ (Sandwich = ₹5), badge illuminates |
| `c17` | *"Now we move one row upward... y = 2."* | 189.7s – 195.7s | `03:45.0 – 03:51.0` | Row 2 solves $y = 2$ (Tea = ₹2), badge illuminates |
| `c18` | *"And finally substituting y = 2... x = 3."* | 196.3s – 201.6s | `03:52.5 – 03:57.8` | Row 1 solves $x = 3$ (Coffee = ₹3), badge illuminates |
| `c19` | *"So our solution is x = 3, y = 2, and z = 5."* | 202.2s – 206.5s | `03:59.0 – 04:03.3` | Final solution badge $(3, 2, 5)$ summary card |
| `c20` | *"But let's not just trust the answer... 5, 8, and 7 confirmed."* | 207.1s – 220.4s | `04:05.5 – 04:18.8` | Receipts checkmarks: $3+2=5, 3+5=8, 2+5=7$ verified |
| `c21` | *"So what should you remember... 4 steps to Gaussian elimination..."* | 222.0s – 236.5s | `04:22.5 – 04:37.1` | Sequential illumination of Card 1, Card 2, Card 3, Card 4 |
| `c22` | *"Gaussian elimination doesn't change solution, changes equations..."* | 237.4s – 244.3s | `04:38.5 – 04:45.4` | Golden Takeaway quote banner illuminates in glowing green |
| `c23` | *"And that's how complicated system becomes simple... Thank you."* | 245.0s – 251.4s | `04:47.0 – 04:53.4` | Outro banner & conclusion |
| `End` | *(Neoclassical chamber score gently swells and fades)* | — | `04:53.4 – 05:00.0` | Cinematic fade to black at exact `05:00.00` |

* **Synchronized Voice Track**: [`voice_synced.wav`](file:///Users/parvmalani/Downloads/maths/voice_synced.wav) (Exact 300.0s / 14,400,000 frames).

---

## 3. Background Music Integration & Dynamic Ducking

* **Score**: Original neoclassical felt-piano and cello chamber score (`assets/cinematic_ambient_score.wav`).
* **Base Setting**: Normalized to **-23 dB** (approx 9% relative volume).
* **Sidechain Compressor / Dynamic Ducking**:
  * Voice presence dynamically ducks the background music by **-3.5 dB** to ensure complete speech clarity.
  * During Think Moments and visual holds (e.g. 3D geometry showcase), the music gently returns to normal ambient presence.
  * Smooth 1.5s fade-in at the beginning and 3.5s fade-out at the end.
* **Final Master Audio Mix**: [`final_audio_mix.wav`](file:///Users/parvmalani/Downloads/maths/final_audio_mix.wav)
  * Integrated Loudness: **-18.1 LUFS**
  * True Peak: **-5.6 dBFS** (zero distortion, 5.6 dB clean headroom)
  * Loudness Range (LRA): **5.2 LU**

---

## 4. Final Video Export Verification

* **Output File**: [`FINAL_GAUSSIAN_ELIMINATION.mp4`](file:///Users/parvmalani/Downloads/maths/FINAL_GAUSSIAN_ELIMINATION.mp4)
* **Duration**: **`05:00.00` (Exact 300.000s / 7,200 frames @ 24 fps)**
* **Resolution**: 1920 × 1080 (1080p Full HD, 16:9 widescreen)
* **Codecs**: Video: H.264 (High Profile, CRF 18) | Audio: AAC Stereo 192 kbps, 48 kHz
* **File Size**: ~35.7 MB
* **Local Player**: Ready to view at [http://localhost:3000/watch.html](http://localhost:3000/watch.html)

---

## 5. Artifacts and Generated Files Summary

1. [`FINAL_GAUSSIAN_ELIMINATION.mp4`](file:///Users/parvmalani/Downloads/maths/FINAL_GAUSSIAN_ELIMINATION.mp4) — Complete master film with synchronized enhanced voice and ducked score.
2. [`voice_enhanced.wav`](file:///Users/parvmalani/Downloads/maths/voice_enhanced.wav) — Cleaned, EQ'd, de-noised, and normalized voice recording.
3. [`voice_synced.wav`](file:///Users/parvmalani/Downloads/maths/voice_synced.wav) — Sample-accurate time-aligned voice track on 300.0s timeline.
4. [`final_audio_mix.wav`](file:///Users/parvmalani/Downloads/maths/final_audio_mix.wav) — Master stereo audio mix with dynamic sidechain ducking.
5. [`sync_audio.py`](file:///Users/parvmalani/Downloads/maths/sync_audio.py) — Complete automated mastering and synchronization script.
6. Cloned IDE Folder: [`/Users/parvmalani/Downloads/maths-animation`](file:///Users/parvmalani/Downloads/maths-animation).
7. Desktop Mirror: [`/Users/parvmalani/Desktop/animated video_maths`](file:///Users/parvmalani/Desktop/animated%20video_maths).
