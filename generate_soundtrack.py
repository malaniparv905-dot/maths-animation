#!/usr/bin/env python3
"""
generate_soundtrack.py - Neoclassical Melodic Educational Soundtrack (300.0s / 5:00)
Features an original lyrical piano & strings theme: "The Geometry of Elimination"
Mild tone, low volume (-22 dB), warm felt-piano timbre with cello pad accompaniment.
"""

import math
import struct
import wave
import array

SAMPLE_RATE = 48000
DURATION = 300.0
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)
OUTPUT_FILE = 'assets/cinematic_ambient_score.wav'

# Precompute 8192-point high-resolution sine lookup table for speed
LUT_SIZE = 8192
SINE_LUT = [math.sin(2.0 * math.pi * i / LUT_SIZE) for i in range(LUT_SIZE)]

def fast_sin(phase):
    return SINE_LUT[int((phase % 1.0) * LUT_SIZE)]

# Note frequency parser (supports sharps & flats: C4, Bb3, F#4, etc.)
NOTE_MAP = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
    'A#': 10, 'Bb': 10, 'B': 11
}

def N(name):
    pitch = name[:-1]
    octave = int(name[-1])
    midi = 12 + octave * 12 + NOTE_MAP[pitch]
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))

# Audio buffers (Left and Right stereo)
left_buf = array.array('f', [0.0] * TOTAL_SAMPLES)
right_buf = array.array('f', [0.0] * TOTAL_SAMPLES)

def add_piano_note(start_time, freq, dur=2.4, vel=0.6, pan=0.0):
    start_sample = int(start_time * SAMPLE_RATE)
    if start_sample >= TOTAL_SAMPLES:
        return
    
    note_samples = min(int(dur * SAMPLE_RATE), TOTAL_SAMPLES - start_sample)
    
    # Left / right gains based on pan (-1.0 to +1.0)
    pan_norm = max(-1.0, min(1.0, pan))
    gain_l = (1.0 - pan_norm) * 0.5 * vel
    gain_r = (1.0 + pan_norm) * 0.5 * vel
    
    # Precompute harmonics with physically realistic piano string decay
    harmonics = []
    for k in range(1, 7):
        f_k = freq * k * (1.0 + 0.00035 * k * k)
        decay = 1.0 + (k - 1) * 1.6 + (freq / 450.0) * 0.35
        amp = 1.0 / (k ** 1.3)
        phase_inc = f_k / SAMPLE_RATE
        harmonics.append((phase_inc, decay, amp))
    
    hammer_freq_inc = 260.0 / SAMPLE_RATE
    
    for i in range(note_samples):
        t = i / SAMPLE_RATE
        hammer = math.exp(-t * 90.0) * 0.08 * fast_sin(t * 260.0) if t < 0.08 else 0.0
        
        sig = 0.0
        for phase_inc, decay, amp in harmonics:
            sig += amp * math.exp(-t * decay) * fast_sin(i * phase_inc)
        
        val = sig * 0.22 + hammer
        idx = start_sample + i
        left_buf[idx] += val * gain_l
        right_buf[idx] += val * gain_r

def add_string_chord(start_time, end_time, freqs, vel=0.18):
    start_sample = int(start_time * SAMPLE_RATE)
    end_sample = min(int(end_time * SAMPLE_RATE), TOTAL_SAMPLES)
    length = end_sample - start_sample
    if length <= 0:
        return
    
    dur = length / SAMPLE_RATE
    phase_incs = [f / SAMPLE_RATE for f in freqs]
    
    for i in range(length):
        rel_t = i / SAMPLE_RATE
        att = min(1.0, rel_t / 1.5)
        rel = min(1.0, (dur - rel_t) / 1.8) if dur - rel_t < 1.8 else 1.0
        env = (att * rel) ** 1.3
        
        # Subtle 4.5Hz string vibrato
        vib = 1.0 + 0.004 * fast_sin(rel_t * 4.5)
        
        sig = 0.0
        for p_inc in phase_incs:
            h1 = fast_sin(i * p_inc * vib) * 0.65
            h2 = fast_sin(i * p_inc * 2.0 * vib) * 0.25
            h3 = fast_sin(i * p_inc * 3.0 * vib) * 0.10
            sig += (h1 + h2 + h3)
            
        val = sig * (0.8 / len(freqs)) * env * vel
        idx = start_sample + i
        left_buf[idx] += val * 0.6
        right_buf[idx] += val * 0.6

def add_crystal_chime(trigger_time, freq, vel=0.35):
    start_sample = int(trigger_time * SAMPLE_RATE)
    chime_samples = min(int(3.2 * SAMPLE_RATE), TOTAL_SAMPLES - start_sample)
    f_inc1 = freq / SAMPLE_RATE
    f_inc2 = (freq * 2.76) / SAMPLE_RATE
    
    for i in range(chime_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 2.2)
        bell = fast_sin(i * f_inc1) * 0.75 + fast_sin(i * f_inc2) * 0.25
        val = bell * env * vel * 0.22
        idx = start_sample + i
        left_buf[idx] += val * 0.45
        right_buf[idx] += val * 0.55

def compose_score():
    print("🎼 Composing lyrical piano & strings score across 300 seconds...")
    
    # Bar duration = 3.2s (75 BPM, 4/4 time)
    
    # =========================================================================
    # SCENE 1: THE CAFETERIA MYSTERY (0.0s to 40.0s, Bars 0 to 12)
    # Lyrical felt piano arpeggios introducing the core theme
    # =========================================================================
    for bar in range(0, 13):
        bt = bar * 3.2
        prog_idx = bar % 4
        if prog_idx == 0:
            bass = N('C2'); chord = [N('C3'), N('G3'), N['E4'] if 'E4' in NOTE_MAP else N('E4')]; string_c = [N('C2'), N('G2'), N('E3'), N('C4')]
            melody = [N('C4'), N('E4'), N('G4'), N('C5')]
        elif prog_idx == 1:
            bass = N('B1'); chord = [N('G3'), N('D4'), N('B4')]; string_c = [N('G2'), N('D3'), N('B3'), N('D4')]
            melody = [N('B4'), N('G4'), N('E4'), N('D4')]
        elif prog_idx == 2:
            bass = N('A1'); chord = [N('A3'), N('E4'), N('C5')]; string_c = [N('A2'), N('E3'), N('C4'), N('E4')]
            melody = [N('A4'), N('C5'), N('E5'), N('D5')]
        else:
            bass = N('F1'); chord = [N('F3'), N('C4'), N('A4')]; string_c = [N('F2'), N('C3'), N('A3'), N('C4')]
            melody = [N('G4'), N('A4'), N('C5'), N('D5')]
            
        add_piano_note(bt + 0.0, bass, dur=3.0, vel=0.7, pan=-0.4)
        add_piano_note(bt + 0.8, chord[0], dur=2.0, vel=0.45, pan=-0.2)
        add_piano_note(bt + 1.6, chord[1], dur=2.0, vel=0.5, pan=0.0)
        add_piano_note(bt + 2.4, chord[2], dur=1.8, vel=0.5, pan=0.2)
        
        add_piano_note(bt + 0.0, melody[0], dur=1.6, vel=0.65, pan=0.3)
        add_piano_note(bt + 0.8, melody[1], dur=1.2, vel=0.6, pan=0.4)
        add_piano_note(bt + 1.6, melody[2], dur=1.4, vel=0.68, pan=0.5)
        add_piano_note(bt + 2.4, melody[3], dur=1.5, vel=0.62, pan=0.35)
        
        add_string_chord(bt, bt + 3.4, string_c, vel=0.15)
        
    add_crystal_chime(36.0, N('G5'), vel=0.4)
    add_crystal_chime(37.0, N('C6'), vel=0.45)

    # =========================================================================
    # SCENE 2: WHY WE NEED A METHOD & THE TURNING POINT (40.0s to 80.0s, Bars 13 to 25)
    # D minor contemplation -> Intellectual turning point at bar 22 (70.4s)
    # =========================================================================
    for bar in range(13, 26):
        bt = bar * 3.2
        prog_idx = (bar - 13) % 4
        
        if bar < 22:
            if prog_idx == 0:
                bass = N('D2'); chord = [N('D3'), N('A3'), N('F4')]; string_c = [N('D2'), N('A2'), N('F3')]
                melody = [N('F4'), N('A4'), N('D5'), N('C5')]
            elif prog_idx == 1:
                bass = N('A1'); chord = [N('C4'), N('E4'), N('A4')]; string_c = [N('A2'), N('E3'), N('C4')]
                melody = [N('C5'), N('B4'), N('A4'), N('G4')]
            elif prog_idx == 2:
                bass = N('Bb1'); chord = [N('D4'), N('F4'), N('Bb4')]; string_c = [N('Bb2'), N('D3'), N('F3')]
                melody = [N('Bb4'), N('A4'), N('F4'), N('G4')]
            else:
                bass = N('C2'); chord = [N('C4'), N('F4'), N('G4')]; string_c = [N('C2'), N('G2'), N('C3')]
                melody = [N('E4'), N('G4'), N('C5'), N('E5')]
        else:
            bass = N('C2') if bar % 2 == 0 else N('G1')
            chord = [N('G3'), N('C4'), N('E4')] if bar % 2 == 0 else [N('D4'), N('G4'), N('B4')]
            string_c = [N('C2'), N('G2'), N('E3'), N('C4')]
            melody = [N('G4'), N('C5'), N('D5'), N('E5')] if bar == 22 else [N('G5'), N('E5'), N('D5'), N('C5')]

        add_piano_note(bt + 0.0, bass, dur=3.2, vel=0.72, pan=-0.4)
        add_piano_note(bt + 0.8, chord[0], dur=2.0, vel=0.48, pan=-0.2)
        add_piano_note(bt + 1.6, chord[1], dur=2.0, vel=0.52, pan=0.0)
        add_piano_note(bt + 2.4, chord[2], dur=1.8, vel=0.5, pan=0.2)

        add_piano_note(bt + 0.0, melody[0], dur=1.5, vel=0.66, pan=0.3)
        add_piano_note(bt + 0.8, melody[1], dur=1.3, vel=0.62, pan=0.4)
        add_piano_note(bt + 1.6, melody[2], dur=1.6, vel=0.7, pan=0.5)
        add_piano_note(bt + 2.4, melody[3], dur=1.4, vel=0.64, pan=0.35)

        add_string_chord(bt, bt + 3.4, string_c, vel=0.16)

    add_crystal_chime(71.0, N('E5'), vel=0.42)
    add_crystal_chime(72.5, N('B5'), vel=0.46)

    # =========================================================================
    # SCENE 3: UNDERSTANDING THE GEOMETRY (80.0s to 120.0s, Bars 26 to 37)
    # Expansive, soaring 3D spatial field
    # =========================================================================
    for bar in range(26, 38):
        bt = bar * 3.2
        prog_idx = (bar - 26) % 4
        if prog_idx == 0:
            bass = N('G1'); chord = [N('D3'), N('B3'), N('G4')]; string_c = [N('G2'), N('D3'), N('B3')]
            melody = [N('D5'), N('B4'), N('G4'), N('A4')]
        elif prog_idx == 1:
            bass = N('E2'); chord = [N('B3'), N('G4'), N('E5')]; string_c = [N('E2'), N('B2'), N('G3')]
            melody = [N('B4'), N('G4'), N('E4'), N('F#4')]
        elif prog_idx == 2:
            bass = N('C2'); chord = [N('G3'), N('E4'), N('C5')]; string_c = [N('C2'), N('G2'), N('E3')]
            melody = [N('G4'), N('C5'), N('E5'), N('G5')]
        else:
            bass = N('D2'); chord = [N('A3'), N('F#4'), N('D5')]; string_c = [N('D2'), N('A2'), N('F#3')]
            melody = [N('F#5'), N('E5'), N('D5'), N('C5')]

        add_piano_note(bt + 0.0, bass, dur=3.2, vel=0.7, pan=-0.4)
        add_piano_note(bt + 0.8, chord[0], dur=2.0, vel=0.45, pan=-0.2)
        add_piano_note(bt + 1.6, chord[1], dur=2.0, vel=0.5, pan=0.0)
        add_piano_note(bt + 2.4, chord[2], dur=1.8, vel=0.5, pan=0.2)

        add_piano_note(bt + 0.0, melody[0], dur=1.6, vel=0.68, pan=0.35)
        add_piano_note(bt + 0.8, melody[1], dur=1.2, vel=0.6, pan=0.45)
        add_piano_note(bt + 1.6, melody[2], dur=1.5, vel=0.72, pan=0.55)
        add_piano_note(bt + 2.4, melody[3], dur=1.3, vel=0.64, pan=0.4)

        add_string_chord(bt, bt + 3.4, string_c, vel=0.17)

    add_crystal_chime(108.5, N('G5'), vel=0.45)
    add_crystal_chime(109.5, N('D6'), vel=0.5)

    # =========================================================================
    # SCENE 4: INTRODUCE GAUSSIAN ELIMINATION & MATRIX (120.0s to 150.0s, Bars 38 to 46)
    # Clockwork minimal pattern
    # =========================================================================
    for bar in range(38, 47):
        bt = bar * 3.2
        prog_idx = (bar - 38) % 3
        bass = N('F1') if prog_idx == 0 else N('G1') if prog_idx == 1 else N('C2')
        string_c = [bass, N('C3'), N('G3')]
        
        add_piano_note(bt + 0.0, bass, dur=3.0, vel=0.68, pan=-0.35)
        add_piano_note(bt + 0.4, N('C4'), dur=0.9, vel=0.55, pan=-0.1)
        add_piano_note(bt + 0.8, N('E4'), dur=0.9, vel=0.58, pan=0.1)
        add_piano_note(bt + 1.2, N('G4'), dur=0.9, vel=0.62, pan=0.2)
        add_piano_note(bt + 1.6, N('C5'), dur=1.4, vel=0.65, pan=0.35)
        add_piano_note(bt + 2.0, N('G4'), dur=0.9, vel=0.55, pan=0.2)
        add_piano_note(bt + 2.4, N('E4'), dur=0.9, vel=0.58, pan=0.1)
        add_piano_note(bt + 2.8, N('D4'), dur=0.9, vel=0.52, pan=0.0)
        
        add_string_chord(bt, bt + 3.4, string_c, vel=0.14)

    # =========================================================================
    # SCENE 5: TEACHING THE METHOD & ROW OPERATIONS (150.0s to 270.0s, Bars 47 to 84)
    # Engaging melodic progression reflecting step-by-step progress
    # =========================================================================
    for bar in range(47, 85):
        bt = bar * 3.2
        prog_idx = (bar - 47) % 4
        
        if bar < 53: # 150-170s: The 3 Row Operations
            bass = [N('C2'), N('F1'), N('G1'), N('C2')][prog_idx]
            melody = [N('E4'), N('G4'), N('C5'), N('B4')]
        elif bar < 61: # 170-194s: Step 1 (Pivot 1 & Eliminate R2)
            bass = [N('D2'), N('G1'), N('C2'), N('A1')][prog_idx]
            melody = [N('F4'), N('A4'), N('D5'), N('C5')]
        elif bar < 67: # 194-214s: Step 2 (Normalize Pivot 2)
            bass = [N('F1'), N('G1'), N('E2'), N('A1')][prog_idx]
            melody = [N('A4'), N('C5'), N('E5'), N('D5')]
        elif bar < 75: # 214-238s: Step 3 (Eliminate Below Pivot 2)
            bass = [N('D2'), N('E2'), N('F1'), N('G1')][prog_idx]
            melody = [N('F4'), N('G4'), N('A4'), N('B4')]
        elif bar < 80: # 238-254s: Step 4 (REF Staircase achieved)
            bass = [N('C2'), N('E2'), N('G1'), N('C2')][prog_idx]
            melody = [N('C5'), N('E5'), N('G5'), N('C6')]
        else: # 254-270s: Step 5 & Receipt verification
            bass = [N('F1'), N('G1'), N('A1'), N('C2')][prog_idx]
            melody = [N('E5'), N('D5'), N('C5'), N('G4')]

        add_piano_note(bt + 0.0, bass, dur=3.2, vel=0.72, pan=-0.4)
        add_piano_note(bt + 0.8, bass * 2.0, dur=1.8, vel=0.48, pan=-0.2)
        add_piano_note(bt + 1.6, bass * 3.0, dur=1.8, vel=0.52, pan=0.0)
        add_piano_note(bt + 2.4, bass * 2.0, dur=1.6, vel=0.46, pan=-0.1)

        add_piano_note(bt + 0.0, melody[0], dur=1.5, vel=0.65, pan=0.3)
        add_piano_note(bt + 0.8, melody[1], dur=1.3, vel=0.6, pan=0.4)
        add_piano_note(bt + 1.6, melody[2], dur=1.6, vel=0.7, pan=0.5)
        add_piano_note(bt + 2.4, melody[3], dur=1.4, vel=0.62, pan=0.35)

        add_string_chord(bt, bt + 3.4, [bass, bass * 2.0, bass * 3.0], vel=0.15)

    add_crystal_chime(186.0, N('G5'), vel=0.42)
    add_crystal_chime(206.0, N('A5'), vel=0.42)
    add_crystal_chime(228.0, N('C6'), vel=0.46)
    add_crystal_chime(242.0, N('E6'), vel=0.5)
    add_crystal_chime(256.0, N('G6'), vel=0.52)
    add_crystal_chime(264.0, N('C6'), vel=0.4)
    add_crystal_chime(266.0, N('E6'), vel=0.42)
    add_crystal_chime(268.0, N('G6'), vel=0.45)

    # =========================================================================
    # SCENE 6: RETURN TO GEOMETRY (270.0s to 285.0s, Bars 85 to 89)
    # Geometric invariance
    # =========================================================================
    for bar in range(85, 90):
        bt = bar * 3.2
        prog_idx = (bar - 85) % 4
        bass = [N('D2'), N('G1'), N('A1'), N('D2')][prog_idx]
        string_c = [bass, bass * 2.0, bass * 3.0]
        melody = [N('F#5'), N('E5'), N('D5'), N('A4')]

        add_piano_note(bt + 0.0, bass, dur=3.2, vel=0.75, pan=-0.4)
        add_piano_note(bt + 0.8, bass * 2.0, dur=2.0, vel=0.5, pan=-0.2)
        add_piano_note(bt + 1.6, bass * 3.0, dur=2.0, vel=0.55, pan=0.0)
        add_piano_note(bt + 2.4, melody[0], dur=1.8, vel=0.68, pan=0.35)

        add_piano_note(bt + 0.0, melody[1], dur=1.5, vel=0.64, pan=0.3)
        add_piano_note(bt + 1.2, melody[2], dur=1.4, vel=0.66, pan=0.4)
        add_piano_note(bt + 2.0, melody[3], dur=1.6, vel=0.7, pan=0.5)

        add_string_chord(bt, bt + 3.4, string_c, vel=0.18)

    add_crystal_chime(276.0, N('A5'), vel=0.45)

    # =========================================================================
    # SCENE 7: ECHELON STAIRCASE FINALE (285.0s to 300.0s, Bars 90 to 94)
    # Luminous ascending arpeggio fading into peace
    # =========================================================================
    for bar in range(90, 94):
        bt = bar * 3.2
        bass = N('C2')
        add_piano_note(bt + 0.0, bass, dur=3.5, vel=0.75, pan=-0.4)
        
        steps = [N('C3'), N('G3'), N('C4'), N('E4'), N('G4'), N('C5'), N('E5'), N('G5')]
        for s_idx, note_f in enumerate(steps):
            add_piano_note(bt + s_idx * 0.4, note_f, dur=1.8, vel=0.55 + s_idx * 0.02, pan=-0.3 + s_idx * 0.08)

        add_string_chord(bt, bt + 3.4, [N('C2'), N('G2'), N('E3'), N('C4')], vel=0.18)

    # Final luminous chord at 295.0s
    final_t = 295.0
    add_piano_note(final_t + 0.0, N('C2'), dur=5.0, vel=0.8, pan=-0.4)
    add_piano_note(final_t + 0.1, N['G2'] if 'G2' in NOTE_MAP else N('G2'), dur=4.9, vel=0.7, pan=-0.2)
    add_piano_note(final_t + 0.2, N('C3'), dur=4.8, vel=0.65, pan=0.0)
    add_piano_note(final_t + 0.3, N('E3'), dur=4.7, vel=0.6, pan=0.2)
    add_piano_note(final_t + 0.4, N('G3'), dur=4.6, vel=0.58, pan=0.3)
    add_piano_note(final_t + 0.5, N('C4'), dur=4.5, vel=0.62, pan=0.4)
    add_piano_note(final_t + 0.6, N('E4'), dur=4.4, vel=0.65, pan=0.5)
    add_crystal_chime(final_t + 0.6, N('C6'), vel=0.45)
    
    print("✔ Musical arrangement complete. Normalizing and writing WAV file...")

def export_wav():
    compose_score()
    
    # Target peak amplitude for mild, low-volume background listening
    # Peak ~ 0.14 (-22 dB)
    MAX_AMP = 0.14
    
    cur_peak = 0.0
    for i in range(0, TOTAL_SAMPLES, 480):
        m = max(abs(left_buf[i]), abs(right_buf[i]))
        if m > cur_peak:
            cur_peak = m
            
    scale_factor = (MAX_AMP / cur_peak) if cur_peak > 0 else 1.0
    print(f"Normalizing audio: detected peak={cur_peak:.3f}, applying gain factor={scale_factor:.3f} (-22 dB target)")

    with wave.open(OUTPUT_FILE, 'w') as wav_out:
        wav_out.setnchannels(2)
        wav_out.setsampwidth(2)
        wav_out.setframerate(SAMPLE_RATE)
        
        BLOCK_SIZE = 48000
        sample_idx = 0
        
        while sample_idx < TOTAL_SAMPLES:
            cur_len = min(BLOCK_SIZE, TOTAL_SAMPLES - sample_idx)
            block = bytearray(cur_len * 4)
            
            for b in range(cur_len):
                idx = sample_idx + b
                t = idx / SAMPLE_RATE
                
                # Master fade in (0 - 1.5s) & fade out (296.5 - 300.0s)
                if t < 1.5:
                    master_fade = (t / 1.5) ** 1.2
                elif t > 296.5:
                    master_fade = max(0.0, (300.0 - t) / 3.5) ** 1.5
                else:
                    master_fade = 1.0
                
                l_val = left_buf[idx] * scale_factor * master_fade
                r_val = right_buf[idx] * scale_factor * master_fade
                
                l_int = max(-32767, min(32767, int(l_val * 32767)))
                r_int = max(-32767, min(32767, int(r_val * 32767)))
                
                struct.pack_into('<hh', block, b * 4, l_int, r_int)
                
            wav_out.writeframes(block)
            sample_idx += cur_len

    print(f"✔ Successfully saved {OUTPUT_FILE} (48kHz, 16-bit stereo, exactly 300.00s)!")

if __name__ == '__main__':
    export_wav()
