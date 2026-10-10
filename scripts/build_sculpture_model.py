import numpy as np
import cv2
import json
import math
import os

def build_computational_sculpture(
    target_count=38000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json',
    preview_img='scripts/preview_sculpture.png'
):
    print("Generating high-end 3D computational point-cloud portrait...")
    np.random.seed(1337)

    points = [] # list of dicts: {x, y, z, nx, ny, nz, feat, hair, edge, col_type}

    # =========================================================================
    # 1. FACIAL FEATURES CONTOURS (High-density anatomical definition)
    # The practitioner's face: masculine jaw, slight head tilt (~10 deg),
    # defined chin, full lips with cupid's bow, straight nose, almond eyes.
    # =========================================================================
    tilt_rad = math.radians(6.0)
    cos_t, sin_t = math.cos(tilt_rad), math.sin(tilt_rad)

    def rot2d(x, y):
        # Subtle natural tilt
        return cos_t * x - sin_t * y, sin_t * x + cos_t * y

    # A. EYES & BROWS
    # Left Eye (viewer's left: x ~ -0.24, y ~ 0.12)
    le_cx, le_cy, le_cz = -0.24, 0.13, 0.02
    for t in np.linspace(0, 2 * math.pi, 240):
        # Almond eye outline
        rx = 0.085 * math.cos(t)
        ry = 0.038 * math.sin(t) * (1.0 + 0.3 * math.cos(t))
        px, py = rot2d(le_cx + rx, le_cy + ry)
        pz = le_cz + 0.01 * math.cos(t)
        # Normal pointing forward
        points.append({'x': px, 'y': py, 'z': pz, 'nx': 0.0, 'ny': 0.1, 'nz': 0.99, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Left Pupil & Iris ring
    for t in np.linspace(0, 2 * math.pi, 120):
        for r_scale in [0.015, 0.028]:
            rx = r_scale * math.cos(t)
            ry = r_scale * math.sin(t)
            px, py = rot2d(le_cx + rx, le_cy + ry)
            points.append({'x': px, 'y': py, 'z': le_cz + 0.015, 'nx': 0.0, 'ny': 0.0, 'nz': 1.0, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Left Eyebrow (curved masculine arch)
    for s in np.linspace(0, 1, 180):
        bx = -0.36 + s * 0.22
        by = 0.20 + 0.04 * math.sin(s * math.pi)
        bz = 0.06 + 0.02 * math.sin(s * math.pi)
        for jitter in range(2):
            jx = bx + np.random.uniform(-0.012, 0.012)
            jy = by + np.random.uniform(-0.012, 0.012)
            px, py = rot2d(jx, jy)
            points.append({'x': px, 'y': py, 'z': bz, 'nx': -0.1, 'ny': 0.3, 'nz': 0.95, 'feat': 0.9, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Right Eye (viewer's right: x ~ +0.24, y ~ 0.09)
    re_cx, re_cy, re_cz = 0.24, 0.09, 0.04
    for t in np.linspace(0, 2 * math.pi, 240):
        rx = 0.085 * math.cos(t)
        ry = 0.038 * math.sin(t) * (1.0 - 0.3 * math.cos(t))
        px, py = rot2d(re_cx + rx, re_cy + ry)
        pz = re_cz + 0.01 * math.cos(t)
        points.append({'x': px, 'y': py, 'z': pz, 'nx': 0.1, 'ny': 0.1, 'nz': 0.99, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Right Pupil & Iris
    for t in np.linspace(0, 2 * math.pi, 120):
        for r_scale in [0.015, 0.028]:
            rx = r_scale * math.cos(t)
            ry = r_scale * math.sin(t)
            px, py = rot2d(re_cx + rx, re_cy + ry)
            points.append({'x': px, 'y': py, 'z': re_cz + 0.015, 'nx': 0.0, 'ny': 0.0, 'nz': 1.0, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Right Eyebrow
    for s in np.linspace(0, 1, 180):
        bx = 0.14 + s * 0.22
        by = 0.17 + 0.04 * math.sin(s * math.pi)
        bz = 0.08 + 0.02 * math.sin(s * math.pi)
        for jitter in range(2):
            jx = bx + np.random.uniform(-0.012, 0.012)
            jy = by + np.random.uniform(-0.012, 0.012)
            px, py = rot2d(jx, jy)
            points.append({'x': px, 'y': py, 'z': bz, 'nx': 0.1, 'ny': 0.3, 'nz': 0.95, 'feat': 0.9, 'hair': 0, 'edge': 0, 'type': 'white'})

    # B. NOSE (Bridge ridge, tip bulb, alar wings, nostrils)
    # Nose ridge line (nasion to pronasale)
    for s in np.linspace(0, 1, 260):
        ny = 0.15 - s * 0.27 # y: 0.15 down to -0.12
        nx = 0.01 * (1.0 - s)
        # Depth slopes out to tip
        nz = 0.10 + s * 0.22 # reaches +0.32 at tip!
        for w in [-0.018, 0.0, 0.018]:
            px, py = rot2d(nx + w, ny)
            points.append({'x': px, 'y': py, 'z': nz - abs(w)*0.5, 'nx': 0.0, 'ny': 0.1, 'nz': 0.99, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Nose tip sphere
    for t in np.linspace(0, 2 * math.pi, 160):
        for phi in np.linspace(0, math.pi * 0.45, 8):
            nx = 0.05 * math.sin(phi) * math.cos(t)
            ny = -0.12 + 0.04 * math.sin(phi) * math.sin(t)
            nz = 0.32 + 0.04 * math.cos(phi)
            px, py = rot2d(nx, ny)
            points.append({'x': px, 'y': py, 'z': nz, 'nx': nx*10, 'ny': (ny+0.12)*10, 'nz': 0.8, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Nostrils / Alar wings
    for t in np.linspace(-math.pi*0.5, math.pi*0.5, 120):
        # Left wing
        lx = -0.06 - 0.045 * math.cos(t)
        ly = -0.13 + 0.03 * math.sin(t)
        lz = 0.22 + 0.05 * math.cos(t)
        px, py = rot2d(lx, ly)
        points.append({'x': px, 'y': py, 'z': lz, 'nx': -0.7, 'ny': 0.1, 'nz': 0.7, 'feat': 0.9, 'hair': 0, 'edge': 0, 'type': 'white'})

        # Right wing
        rx = 0.06 + 0.045 * math.cos(t)
        ry = -0.13 + 0.03 * math.sin(t)
        rz = 0.24 + 0.05 * math.cos(t)
        px, py = rot2d(rx, ry)
        points.append({'x': px, 'y': py, 'z': rz, 'nx': 0.7, 'ny': 0.1, 'nz': 0.7, 'feat': 0.9, 'hair': 0, 'edge': 0, 'type': 'white'})

    # C. LIPS & MOUTH
    # Upper lip vermilion with cupid's bow
    for s in np.linspace(-1, 1, 260):
        lx = s * 0.18
        # Cupid's bow dip at s=0, peaks at s=+-0.25
        bow = 0.015 * math.cos(s * math.pi * 2.0)
        ly = -0.25 + bow * (1.0 - abs(s)) - abs(s) * 0.03
        lz = 0.18 * (1.0 - abs(s) * 0.6)
        px, py = rot2d(lx, ly)
        points.append({'x': px, 'y': py, 'z': lz, 'nx': 0.0, 'ny': 0.5, 'nz': 0.86, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Lip closure seam
    for s in np.linspace(-1, 1, 220):
        lx = s * 0.17
        ly = -0.28 - abs(s) * 0.02
        lz = 0.14 * (1.0 - abs(s) * 0.7)
        px, py = rot2d(lx, ly)
        points.append({'x': px, 'y': py, 'z': lz, 'nx': 0.0, 'ny': 0.0, 'nz': 1.0, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Lower lip fullness
    for s in np.linspace(-1, 1, 280):
        lx = s * 0.17
        ly = -0.32 - 0.02 * (1.0 - s**2)
        lz = 0.17 * (1.0 - abs(s) * 0.6)
        px, py = rot2d(lx, ly)
        points.append({'x': px, 'y': py, 'z': lz, 'nx': 0.0, 'ny': -0.4, 'nz': 0.9, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # D. JAWLINE & CHIN
    # Mental protuberance (Chin)
    for t in np.linspace(-math.pi*0.6, math.pi*0.6, 260):
        cx = 0.08 * math.sin(t)
        cy = -0.48 - 0.04 * math.cos(t)
        cz = 0.18 + 0.04 * math.cos(t)
        px, py = rot2d(cx, cy)
        points.append({'x': px, 'y': py, 'z': cz, 'nx': 0.0, 'ny': -0.6, 'nz': 0.8, 'feat': 1.0, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Left Mandible Jawline (from chin to left ear angle)
    for s in np.linspace(0, 1, 320):
        jx = -0.08 - s * 0.40
        jy = -0.48 + s * 0.28 - 0.04 * math.sin(s * math.pi)
        jz = 0.18 - s * 0.32
        px, py = rot2d(jx, jy)
        points.append({'x': px, 'y': py, 'z': jz, 'nx': -0.8, 'ny': -0.3, 'nz': 0.5, 'feat': 0.9, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Right Mandible Jawline (from chin to right ear angle)
    for s in np.linspace(0, 1, 320):
        jx = 0.08 + s * 0.40
        jy = -0.48 + s * 0.28 - 0.04 * math.sin(s * math.pi)
        jz = 0.18 - s * 0.28
        px, py = rot2d(jx, jy)
        points.append({'x': px, 'y': py, 'z': jz, 'nx': 0.8, 'ny': -0.3, 'nz': 0.5, 'feat': 0.9, 'hair': 0, 'edge': 0, 'type': 'white'})

    # E. EARS
    # Left Ear helix curve
    for t in np.linspace(0, math.pi, 200):
        ex = -0.52 - 0.06 * math.sin(t)
        ey = -0.05 + 0.18 * math.cos(t)
        ez = -0.16 + 0.04 * math.sin(t)
        px, py = rot2d(ex, ey)
        points.append({'x': px, 'y': py, 'z': ez, 'nx': -0.9, 'ny': 0.0, 'nz': 0.4, 'feat': 0.8, 'hair': 0, 'edge': 0, 'type': 'white'})

    # Right Ear helix curve
    for t in np.linspace(0, math.pi, 200):
        ex = 0.52 + 0.06 * math.sin(t)
        ey = -0.02 + 0.18 * math.cos(t)
        ez = -0.14 + 0.04 * math.sin(t)
        px, py = rot2d(ex, ey)
        points.append({'x': px, 'y': py, 'z': ez, 'nx': 0.9, 'ny': 0.0, 'nz': 0.4, 'feat': 0.8, 'hair': 0, 'edge': 0, 'type': 'white'})

    print(f"Generated {len(points)} landmark contour points.")

    # =========================================================================
    # 2. 3D SURFACE SAMPLING (Evenly spaced face & head mesh points)
    # Poisson-disk / stratified UV sampling across anatomical depth model.
    # NO clumping, NO noise speckles!
    # =========================================================================
    print("Sampling volumetric facial surface...")
    face_surface_target = 13500
    u_steps = 140
    v_steps = 100

    for u_idx in range(u_steps):
        # theta around head (-pi*0.55 to +pi*0.55 covers front half of head)
        u_frac = u_idx / (u_steps - 1)
        theta = (u_frac - 0.5) * math.pi * 1.15

        for v_idx in range(v_steps):
            v_frac = v_idx / (v_steps - 1)
            # y ranges from neck (-0.52) to forehead (0.42)
            y_base = -0.52 + v_frac * 0.94

            # Sub-pixel stratified jitter for organic softness
            th = theta + np.random.uniform(-0.015, 0.015)
            y_pos = y_base + np.random.uniform(-0.006, 0.006)

            # Head radius at this height:
            # Narrower at chin, widest at temples/zygoma (y ~ 0.0), rounded at forehead
            rad_scale = 1.0
            if y_pos < -0.2:
                # Tapers towards chin
                t_chin = (y_pos + 0.2) / -0.32
                rad_scale = 1.0 - t_chin * 0.55
            elif y_pos > 0.25:
                # Forehead curve
                t_fore = (y_pos - 0.25) / 0.17
                rad_scale = 1.0 - t_fore * 0.15

            rx = 0.50 * rad_scale
            rz = 0.42 * rad_scale

            # Base ellipsoid coords
            raw_x = rx * math.sin(th)
            raw_z = rz * math.cos(th) - 0.15

            # Anatomical relief offsets on the surface:
            # Nose pyramid protrusion around x in [-0.15, 0.15], y in [-0.18, 0.18]
            d_nose_x = abs(raw_x) / 0.14
            d_nose_y = abs(y_pos - (-0.02)) / 0.14
            if d_nose_x < 1.0 and d_nose_y < 1.0 and math.cos(th) > 0.6:
                nose_ridge = (1.0 - d_nose_x) * (1.0 - d_nose_y) * 0.22
                raw_z += nose_ridge

            # Eye orbital depressions
            d_le = math.sqrt((raw_x - (-0.24))**2 + (y_pos - 0.12)**2)
            if d_le < 0.11:
                raw_z -= (1.0 - d_le / 0.11) * 0.07

            d_re = math.sqrt((raw_x - 0.24)**2 + (y_pos - 0.08)**2)
            if d_re < 0.11:
                raw_z -= (1.0 - d_re / 0.11) * 0.07

            # Zygomatic cheekbone highlights
            d_l_cheek = math.sqrt((raw_x - (-0.32))**2 + (y_pos - (-0.05))**2)
            if d_l_cheek < 0.14:
                raw_z += (1.0 - d_l_cheek / 0.14) * 0.06

            d_r_cheek = math.sqrt((raw_x - 0.32)**2 + (y_pos - (-0.05))**2)
            if d_r_cheek < 0.14:
                raw_z += (1.0 - d_r_cheek / 0.14) * 0.06

            # Chin boss prominence
            d_chin = math.sqrt((raw_x)**2 + (y_pos - (-0.48))**2)
            if d_chin < 0.14:
                raw_z += (1.0 - d_chin / 0.14) * 0.08

            px, py = rot2d(raw_x, y_pos)

            # Surface normal approximation from ellipsoid + nose
            nx = math.sin(th)
            ny = (y_pos - 0.1) * 0.5
            nz = math.cos(th)
            norm_len = math.sqrt(nx*nx + ny*ny + nz*nz) + 1e-6
            nx, ny, nz = nx/norm_len, ny/norm_len, nz/norm_len

            points.append({
                'x': px, 'y': py, 'z': raw_z,
                'nx': nx, 'ny': ny, 'nz': nz,
                'feat': 0.4, 'hair': 0, 'edge': 0, 'type': 'white'
            })

    print(f"Surface + contours point count: {len(points)}")

    # =========================================================================
    # 3. HAIR VOLUME & CURLS (Distinctive curly crown from reference photos)
    # The practitioner has voluminous curly hair on top with textured fringe.
    # =========================================================================
    print("Generating volumetric hair curls...")
    hair_target = 11000

    # We generate curly ribbon trajectories:
    # Multiple spiral curls curving over the cranium dome
    num_curls = 140
    points_per_curl = 75

    for c_idx in range(num_curls):
        # Root of curl on skull dome
        # Dome angle phi (elevation from equator to crown), theta (around head)
        u_th = np.random.uniform(-math.pi * 0.65, math.pi * 0.65)
        v_phi = np.random.uniform(0.18, math.pi * 0.5) # above eye level up to crown

        root_r = 0.54 + np.random.uniform(-0.02, 0.04)
        root_x = root_r * math.cos(v_phi) * math.sin(u_th)
        root_y = 0.22 + root_r * math.sin(v_phi) * 0.95
        root_z = root_r * math.cos(v_phi) * math.cos(u_th) - 0.14

        # Curl parameters
        curl_len = np.random.uniform(0.12, 0.26)
        curl_radius = np.random.uniform(0.025, 0.055)
        curl_turns = np.random.uniform(1.2, 2.8)
        flow_dir_y = -np.random.uniform(0.4, 0.9) # flows down
        flow_dir_x = np.random.uniform(-0.5, 0.5)
        flow_dir_z = np.random.uniform(0.2, 0.8) # reaches outward in Z

        # Accent chance for hair: ~25% champagne or gold highlights!
        is_highlight = np.random.uniform(0, 1) < 0.26
        h_type = 'gold' if (is_highlight and np.random.uniform(0, 1) < 0.4) else ('champagne' if is_highlight else 'white')

        for p_idx in range(points_per_curl):
            t = p_idx / (points_per_curl - 1)
            # Helical spiral
            helix_angle = t * curl_turns * 2.0 * math.pi
            hx = curl_radius * math.cos(helix_angle)
            hz = curl_radius * math.sin(helix_angle)

            curr_x = root_x + t * curl_len * flow_dir_x + hx
            curr_y = root_y + t * curl_len * flow_dir_y
            curr_z = root_z + t * curl_len * flow_dir_z + hz

            px, py = rot2d(curr_x, curr_y)

            # Normal pointing outward from head center
            nx = curr_x / 0.55
            ny = (curr_y - 0.3) / 0.6
            nz = (curr_z + 0.1) / 0.5
            nlen = math.sqrt(nx*nx + ny*ny + nz*nz) + 1e-6

            points.append({
                'x': px, 'y': py, 'z': curr_z,
                'nx': nx/nlen, 'ny': ny/nlen, 'nz': nz/nlen,
                'feat': 0.6, 'hair': 1, 'edge': 0, 'type': h_type
            })

    print(f"Total with hair: {len(points)}")

    # =========================================================================
    # 4. NECK, BUST & SHOULDERS (Graceful classical sculpture bust)
    # Sternocleidomastoid bands, clavicles, rounded shoulder silhouette.
    # Dissolving stardust particles at the outer edge!
    # =========================================================================
    print("Generating neck, collarbone and bust silhouette...")

    # A. Neck cylinder
    for v in np.linspace(0, 1, 45):
        y_n = -0.52 - v * 0.24 # -0.52 down to -0.76
        # Radius expands slightly towards base
        rn = 0.26 + v * 0.08
        for u in np.linspace(-math.pi * 0.52, math.pi * 0.52, 60):
            th = u + np.random.uniform(-0.02, 0.02)
            nx_pos = rn * math.sin(th)
            nz_pos = rn * math.cos(th) - 0.24

            # Sternocleidomastoid tendon ridge
            scm_l = abs(nx_pos - (-0.12 * (1.0 - v)))
            if scm_l < 0.06:
                nz_pos += (1.0 - scm_l / 0.06) * 0.04

            scm_r = abs(nx_pos - (0.12 * (1.0 - v)))
            if scm_r < 0.06:
                nz_pos += (1.0 - scm_r / 0.06) * 0.04

            px, py = rot2d(nx_pos, y_n)
            points.append({
                'x': px, 'y': py, 'z': nz_pos,
                'nx': math.sin(th), 'ny': -0.2, 'nz': math.cos(th),
                'feat': 0.3, 'hair': 0, 'edge': 0, 'type': 'white'
            })

    # B. Clavicle / Collarbone & Upper Chest / Shoulders
    # Elegant bust: tapers smoothly outwards and downwards
    for row in range(50):
        y_sh = -0.76 - (row / 49.0) * 0.38 # -0.76 down to -1.14
        # Width of bust at this y
        v_prog = row / 49.0
        max_w = 0.38 + math.sqrt(v_prog) * 0.65 # widens to ~1.03

        # Points across shoulder arch
        num_sh = int(60 + v_prog * 80)
        for s_idx in range(num_sh):
            s_frac = (s_idx / (num_sh - 1) - 0.5) * 2.0 # -1.0 to +1.0
            sh_x = s_frac * max_w
            # Shoulder depth curves back
            sh_z = -0.22 - abs(s_frac) * 0.35 - v_prog * 0.15

            # Collarbone ridge near top of chest
            if row < 12 and abs(sh_x) < 0.45:
                sh_z += (1.0 - abs(sh_x) / 0.45) * 0.05

            # Dissolution towards bottom and edges:
            edge_dist = math.sqrt((sh_x / 1.05)**2 + ((y_sh + 0.7) / 0.5)**2)
            is_dissolve_zone = edge_dist > 0.85

            if is_dissolve_zone:
                # Dispersal stardust jitter
                jitter_amp = (edge_dist - 0.85) * 0.45
                sh_x += np.random.uniform(-jitter_amp, jitter_amp)
                y_sh_j = y_sh + np.random.uniform(-jitter_amp, jitter_amp)
                sh_z += np.random.uniform(-jitter_amp, jitter_amp)
                p_type = 'champagne' if np.random.uniform(0, 1) < 0.35 else 'white'
                px, py = rot2d(sh_x, y_sh_j)
                points.append({
                    'x': px, 'y': py, 'z': sh_z,
                    'nx': 0.0, 'ny': -0.5, 'nz': 0.86,
                    'feat': 0.1, 'hair': 0, 'edge': 1, 'type': p_type
                })
            else:
                px, py = rot2d(sh_x, y_sh)
                points.append({
                    'x': px, 'y': py, 'z': sh_z,
                    'nx': s_frac * 0.5, 'ny': -0.4, 'nz': 0.8,
                    'feat': 0.2, 'hair': 0, 'edge': 0, 'type': 'white'
                })

    # C. Outer Dissolving Stardust Halos (Organic dissolving edges)
    print("Generating organic dissolving perimeter sparks...")
    for _ in range(2500):
        # Around silhouette perimeter:
        angle = np.random.uniform(0, 2 * math.pi)
        # Scaled radius around bust
        rad_x = 0.65 + np.random.uniform(0.0, 0.45)
        rad_y = 0.80 + np.random.uniform(0.0, 0.45)
        sx = rad_x * math.cos(angle)
        sy = 0.05 + rad_y * math.sin(angle)
        sz = np.random.uniform(-0.45, 0.25)
        p_type = 'gold' if np.random.uniform(0, 1) < 0.25 else ('champagne' if np.random.uniform(0, 1) < 0.5 else 'white')
        px, py = rot2d(sx, sy)
        points.append({
            'x': px, 'y': py, 'z': sz,
            'nx': math.cos(angle), 'ny': math.sin(angle), 'nz': 0.5,
            'feat': 0.05, 'hair': 0, 'edge': 1, 'type': p_type
        })

    print(f"Total raw particles assembled: {len(points)}")

    # Adjust to target count if necessary
    if len(points) > target_count:
        # Subsample while keeping all high-feature points
        feat_points = [p for p in points if p['feat'] >= 0.8]
        other_points = [p for p in points if p['feat'] < 0.8]
        needed_others = target_count - len(feat_points)
        sub_indices = np.random.choice(len(other_points), size=needed_others, replace=False)
        selected_others = [other_points[i] for i in sub_indices]
        points = feat_points + selected_others
    elif len(points) < target_count:
        # Replicate with tiny micro-jitter
        shortage = target_count - len(points)
        dup_indices = np.random.choice(len(points), size=shortage, replace=True)
        for idx in dup_indices:
            p_dup = dict(points[idx])
            p_dup['x'] += np.random.uniform(-0.008, 0.008)
            p_dup['y'] += np.random.uniform(-0.008, 0.008)
            p_dup['z'] += np.random.uniform(-0.008, 0.008)
            points.append(p_dup)

    total_particles = len(points)
    print(f"Final particle sculpture count: {total_particles}")

    # =========================================================================
    # 5. PACKING & SHADING
    # Compute studio key-lighting and editorial palette:
    # 88% warm-white / off-white, 12% champagne/gold
    # =========================================================================
    # Key studio light vector from upper left front:
    light_dir = np.array([0.35, 0.60, 0.72], dtype=np.float32)
    light_dir /= np.linalg.norm(light_dir)

    # Output arrays
    pos_x = np.array([p['x'] for p in points], dtype=np.float32)
    pos_y = np.array([p['y'] for p in points], dtype=np.float32)
    pos_z = np.array([p['z'] for p in points], dtype=np.float32)

    norm_x = np.array([p['nx'] for p in points], dtype=np.float32)
    norm_y = np.array([p['ny'] for p in points], dtype=np.float32)
    norm_z = np.array([p['nz'] for p in points], dtype=np.float32)

    feat_w = np.array([p['feat'] for p in points], dtype=np.float32)
    is_edge = np.array([p['edge'] for p in points], dtype=bool)

    # Normal dot light
    dot_l = norm_x * light_dir[0] + norm_y * light_dir[1] + norm_z * light_dir[2]
    # Subtle chiaroscuro illumination: ambient (0.42) + diffuse (0.58)
    diffuse = np.clip(dot_l, 0.0, 1.0)
    illumination = 0.42 + 0.58 * diffuse

    # Color mapping:
    col_r = np.zeros(total_particles, dtype=np.float32)
    col_g = np.zeros(total_particles, dtype=np.float32)
    col_b = np.zeros(total_particles, dtype=np.float32)

    # Base palette colors:
    # Warm White: #f8f6f0 -> (0.97, 0.96, 0.94)
    # Off-White: #eae5da -> (0.91, 0.89, 0.85)
    # Champagne: #ebd6b7 -> (0.92, 0.84, 0.72)
    # Restrained Gold: #d8b27d -> (0.85, 0.70, 0.48)

    for i, p in enumerate(points):
        ill = illumination[i]
        ptype = p['type']
        if ptype == 'gold':
            base_rgb = np.array([0.86, 0.70, 0.48])
        elif ptype == 'champagne':
            base_rgb = np.array([0.93, 0.85, 0.73])
        else:
            # Alternate warm-white and off-white
            if i % 3 == 0:
                base_rgb = np.array([0.92, 0.90, 0.86]) # editorial off-white
            else:
                base_rgb = np.array([0.98, 0.97, 0.94]) # pure warm white

        shaded = base_rgb * ill
        col_r[i] = shaded[0]
        col_g[i] = shaded[1]
        col_b[i] = shaded[2]

    # Sizes: fine points (1.8 to 2.8), feature points slightly denser and crisper
    sizes = 1.8 + feat_w * 0.8
    sizes = np.where(is_edge, 1.6 + np.random.uniform(0.0, 1.0, size=total_particles), sizes)

    # Alpha: 0.65 on diffuse surface, up to 0.95 on crisp features
    alphas = 0.65 + feat_w * 0.30
    alphas = np.where(is_edge, 0.45 + np.random.uniform(0.0, 0.35, size=total_particles), alphas)

    # Assembly dispersal coordinates (staggered 3D cloud)
    disp_r = np.random.uniform(1.8, 3.8, size=total_particles)
    disp_th = np.random.uniform(0, 2 * math.pi, size=total_particles)
    disp_phi = np.random.uniform(-math.pi * 0.4, math.pi * 0.4, size=total_particles)

    disp_x = disp_r * np.cos(disp_phi) * np.cos(disp_th)
    disp_y = disp_r * np.sin(disp_phi)
    disp_z = disp_r * np.cos(disp_phi) * np.sin(disp_th)

    phase = np.random.uniform(0.0, 1.0, size=total_particles).astype(np.float32)

    # Pack into binary buffer (13 floats = 52 bytes per particle)
    particles_arr = np.zeros((total_particles, 13), dtype=np.float32)
    particles_arr[:, 0] = pos_x
    particles_arr[:, 1] = pos_y
    particles_arr[:, 2] = pos_z
    particles_arr[:, 3] = col_r
    particles_arr[:, 4] = col_g
    particles_arr[:, 5] = col_b
    particles_arr[:, 6] = sizes
    particles_arr[:, 7] = alphas
    particles_arr[:, 8] = feat_w
    particles_arr[:, 9] = phase
    particles_arr[:, 10] = disp_x
    particles_arr[:, 11] = disp_y
    particles_arr[:, 12] = disp_z

    os.makedirs(os.path.dirname(output_bin), exist_ok=True)
    with open(output_bin, 'wb') as f:
        f.write(particles_arr.tobytes())

    meta = {
        "particleCount": int(total_particles),
        "strideFloats": 13,
        "strideBytes": 52,
        "bounds": {
            "minX": float(np.min(pos_x)), "maxX": float(np.max(pos_x)),
            "minY": float(np.min(pos_y)), "maxY": float(np.max(pos_y)),
            "minZ": float(np.min(pos_z)), "maxZ": float(np.max(pos_z))
        },
        "version": "3.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Written {output_bin} ({os.path.getsize(output_bin)/(1024*1024):.2f} MB).")

    # =========================================================================
    # 6. HIGH-RES VERIFICATION RENDER (scripts/preview_sculpture.png)
    # Orthographic & perspective simulated render
    # =========================================================================
    cw, ch = 900, 1100
    canvas = np.zeros((ch, cw, 3), dtype=np.float32)
    canvas[:, :] = [0.035, 0.040, 0.045] # obsidian background BGR

    # Map world coordinates (x in [-1.2, 1.2], y in [-1.2, 1.1]) to pixel canvas
    scale = 420.0
    px = (pos_x * scale + cw * 0.50).astype(int)
    py = (-pos_y * scale + ch * 0.46).astype(int)

    # Sort back-to-front by Z
    sort_idx = np.argsort(pos_z)
    for idx in sort_idx:
        x, y = px[idx], py[idx]
        if 2 <= x < cw - 2 and 2 <= y < ch - 2:
            bgr = np.array([col_b[idx], col_g[idx], col_r[idx]], dtype=np.float32)
            sz = int(round(sizes[idx] * 0.9))
            sz = max(1, min(sz, 3))
            a = alphas[idx] * 0.90
            cv2.circle(canvas, (x, y), sz, (bgr * a).tolist(), -1)
            # Center bright core
            cv2.circle(canvas, (x, y), max(1, sz // 2), (bgr * 1.15).tolist(), -1)

    canvas = np.clip(canvas * 255.0, 0, 255).astype(np.uint8)
    cv2.imwrite(preview_img, canvas)
    print(f"Saved verification preview to {preview_img}")

if __name__ == '__main__':
    build_computational_sculpture()
