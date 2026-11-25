#!/usr/bin/env python3
"""
sync_audio.py - Professional Voice Enhancement, Time-Alignment, and Mastering Pipeline
for Gaussian Elimination Educational Film.

Outputs:
  - voice_enhanced.wav (Denoised, EQ'd, compressed, normalized voice)
  - voice_synced.wav   (Time-aligned voice on 300.0s master timeline)
  - final_audio_mix.wav (Voice + sidechain ducked background score, master limited)
"""

import os
import sys
import math
import struct
import wave
import subprocess

SAMPLE_RATE = 48000
TOTAL_DURATION = 300.00  # Exact 5:00.00
TOTAL_SAMPLES = int(TOTAL_DURATION * SAMPLE_RATE)

# 21 Speech Chunks from gaussian_voice.m4a (Total voice: 251.39s)
# [id, voice_start_sec, voice_end_sec, target_video_start_sec]
CHUNKS = [
    # Scene 1: Cafeteria Mystery (0.0s - 35.0s)
    ("c01_cafe_intro",        1.43,  16.71,   2.00),
    ("c02_system_intro",     17.55,  30.21,  19.28),

    # Scene 2: Equations & Variables (35.0s - 68.0s)
    ("c03_equations_xyz",    31.20,  50.62,  36.00),
    ("c04_simultaneous",     51.45,  57.06,  57.50),

    # Scene 3: 3D Geometry (68.0s - 80.0s) - Visual orbital feature with musical focus

    # Scene 4: Augmented Matrix Introduction (80.0s - 95.0s)
    ("c05_aug_matrix",       58.02,  69.01,  81.50),

    # Scene 5: Row Operations & Elimination Masterclass (95.0s - 244.0s)
    # Phase 1: The 3 Elementary Row Operations (95.0s - 124.0s)
    ("c06_three_ops",        70.01,  96.72,  96.00),
    # Phase 2: Upper Triangular Objective (124.0s - 137.0s)
    ("c07_objective_ref",    97.23, 108.43, 125.00),
    # Phase 3: Step 1 (137.0s - 158.0s)
    ("c08_step1_setup",     110.62, 123.44, 138.50), # Setup & Think Moment 1 pause (151.3s - 153.8s)
    ("c09_step1_reveal",    126.25, 129.67, 154.00), # R2 <- R2 - R1 & Arithmetic
    # Phase 4: Step 2 (158.0s - 175.0s)
    ("c10_step2_scale",     130.77, 145.24, 160.00), # R2 <- -R2 & explanation
    # Phase 5: Step 3 (175.0s - 190.0s)
    ("c11_step3_elim",      145.98, 158.10, 176.50), # R3 <- R3 - R2 & Arithmetic
    # Phase 6: Step 4 Scale to REF (190.0s - 212.0s)
    ("c12_step4_div2",      158.86, 166.57, 191.50), # R3 <- 1/2 R3 to REF
    ("c13_progress",        166.96, 178.11, 200.50), # Reduced unknowns milestone
    # Phase 7: Step 5 Sequential Back-Substitution (212.0s - 244.0s)
    ("c14_backsub_z",       178.71, 188.84, 213.50), # z = 5
    ("c15_backsub_y",       189.66, 195.68, 225.00), # y = 2
    ("c16_backsub_x",       196.29, 201.59, 232.50), # x = 3
    ("c17_solution_sum",    202.21, 206.53, 239.00), # Solution summary

    # Scene 6: Verification & Geometric Invariance (244.0s - 261.0s)
    ("c18_verification",    207.07, 220.40, 245.50),

    # Scene 7: 4 Steps Memory Recap & Conclusion (261.0s - 300.0s)
    ("c19_memory_recap",    221.96, 236.51, 262.50), # 4 steps sequential reveal
    ("c20_golden_quote",    237.43, 244.34, 278.50), # Golden takeaway banner
    ("c21_outro",           244.96, 251.39, 287.00)  # Final thank you & outro
]

def step1_enhance_voice(input_m4a="gaussian_voice.m4a", output_wav="voice_enhanced.wav"):
    """
    Apply professional broadcast voice enhancement chain via FFmpeg:
    - Highpass 85Hz (low-end rumble / handling noise removal)
    - Adaptive FFT Denoising (afftdn)
    - 3-band vocal parametric EQ (cut boxiness at 280Hz, boost intelligibility at 2.8kHz, add air at 5.5kHz)
    - De-esser to control harsh sibilance
    - Gentle downward expander / gate for noise suppression during pauses
    - Smooth transparent compressor
    - EBU R128 loudness normalization (-17 LUFS, True Peak -1.5 dB)
    """
    print("[1/3] Enhancing voice recording with high-fidelity DSP filter chain...")
    af_chain = (
        "highpass=f=85,"
        "afftdn=nr=15:nf=-40:tn=1,"
        "equalizer=f=280:width_type=o:w=1.2:g=-3.5,"
        "equalizer=f=2800:width_type=o:w=1.0:g=+3.5,"
        "equalizer=f=5500:width_type=o:w=1.0:g=+2.0,"
        "deesser=i=0.4:m=0.5:f=0.5,"
        "agate=threshold=-38dB:ratio=2.5:attack=15:release=200:range=-24dB,"
        "acompressor=threshold=-21dB:ratio=2.5:attack=15:release=120:makeup=2dB,"
        "loudnorm=I=-17:TP=-1.5:LRA=7"
    )
    cmd = [
        "ffmpeg", "-y", "-i", input_m4a,
        "-af", af_chain,
        "-ar", str(SAMPLE_RATE),
        "-ac", "1",
        output_wav
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    print(f"  ✔ Created {output_wav}")

def step2_create_synced_voice(enhanced_wav="voice_enhanced.wav", synced_wav="voice_synced.wav"):
    """
    Slices each clean voice chunk and places it at the exact target video timestamp
    on a 300.0s stereo buffer.
    """
    print("[2/3] Time-aligning narration chunks along 300.0s master timeline...")
    
    with wave.open(enhanced_wav, "rb") as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        src_rate = wf.getframerate()
        n_frames = wf.getnframes()
        raw_bytes = wf.readframes(n_frames)
        
    # Unpack 16-bit mono samples
    src_samples = struct.unpack(f"<{n_frames * n_channels}h", raw_bytes)
    if n_channels == 2:
        # Downmix to mono for slicing
        src_samples = [src_samples[i*2] for i in range(n_frames)]

    # Prepare 300.0s stereo buffer initialized with 0
    stereo_buffer = [0] * (TOTAL_SAMPLES * 2)

    fade_samples = int(SAMPLE_RATE * 0.015)  # 15ms micro-fade to eliminate clicks

    for cid, v_start, v_end, t_start in CHUNKS:
        start_src_idx = int(v_start * SAMPLE_RATE)
        end_src_idx = min(len(src_samples), int(v_end * SAMPLE_RATE))
        chunk_len = end_src_idx - start_src_idx

        target_start_idx = int(t_start * SAMPLE_RATE)

        for i in range(chunk_len):
            tgt_idx = target_start_idx + i
            if tgt_idx >= TOTAL_SAMPLES:
                break
            
            sample_val = src_samples[start_src_idx + i]

            # Apply smooth 15ms fade-in and fade-out
            if i < fade_samples:
                sample_val = int(sample_val * (i / fade_samples))
            elif chunk_len - i < fade_samples:
                sample_val = int(sample_val * ((chunk_len - i) / fade_samples))

            # Write to Left and Right channels
            stereo_buffer[tgt_idx * 2] = sample_val
            stereo_buffer[tgt_idx * 2 + 1] = sample_val

    # Write out voice_synced.wav
    with wave.open(synced_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        packed_data = struct.pack(f"<{len(stereo_buffer)}h", *stereo_buffer)
        wf.writeframes(packed_data)
        
    print(f"  ✔ Created {synced_wav} (Exact duration: {TOTAL_DURATION}s / {TOTAL_SAMPLES} frames)")

def step3_mix_and_master(synced_wav="voice_synced.wav", music_wav="assets/cinematic_ambient_score.wav", final_mix="final_audio_mix.wav"):
    """
    Mix voice with background score using subtle dynamic sidechain ducking:
    - Normal voice level: -17 LUFS
    - Background music level: -23 dB (very gentle, unobtrusive)
    - During speech: sidechain ducks music by -3 dB so speech is crystal clear
    - During visual holds (3D scene, pauses): music gently expands
    - Smooth 3.5s musical fade-out at end
    """
    print("[3/3] Mixing and mastering narration with ambient score...")
    
    # FFmpeg filtergraph with sidechain ducking and peak limiting
    # Music is ducked when voice is present:
    filtergraph = (
        "[1:a]volume=0.09,afade=t=in:ss=0:d=1.5,afade=t=out:st=296.5:d=3.5[bg];"
        "[0:a]volume=1.0[vox];"
        "[bg][vox]sidechaincompress=threshold=0.03:ratio=3:attack=100:release=400[ducked_bg];"
        "[vox][ducked_bg]amix=inputs=2:duration=first:dropout_transition=0:weights=1.0 0.8[mix];"
        "[mix]alimiter=limit=-1.0dB:attack=5:release=50[out]"
    )
    
    cmd = [
        "ffmpeg", "-y",
        "-i", synced_wav,
        "-i", music_wav,
        "-filter_complex", filtergraph,
        "-map", "[out]",
        "-ar", str(SAMPLE_RATE),
        "-ac", "2",
        final_mix
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    print(f"  ✔ Created {final_mix}")

if __name__ == "__main__":
    step1_enhance_voice()
    step2_create_synced_voice()
    step3_mix_and_master()
    print("\n Audio Mastering & Synchronization Pipeline Complete!")
