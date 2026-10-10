import struct
import json
import cv2
import numpy as np
import math
import os

def export_final_sculpture(
    target_count=36000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json',
    preview_img='scripts/preview_sculpture.png'
):
    print("Building high-end 3D computational point-cloud sculpture...")
    with open('scripts/head_scan.glb', 'rb') as f:
        data = f.read()

    json_len = struct.unpack('<I', data[12:16])[0]
    gltf = json.loads(data[20:20+json_len].decode('utf-8'))
    bin_data = data[20+json_len+8:]

    prim = gltf['meshes'][0]['primitives'][0]
    pos_acc = gltf['accessors'][prim['attributes']['POSITION']]
    pos_bv = gltf['bufferViews'][pos_acc['bufferView']]
    pos_offset = pos_bv.get('byteOffset', 0) + pos_acc.get('byteOffset', 0)
    raw_positions = np.frombuffer(bin_data[pos_offset : pos_offset + pos_acc['count'] * 12], dtype=np.float32).reshape(-1, 3)

    norm_acc = gltf['accessors'][prim['attributes']['NORMAL']]
    norm_bv = gltf['bufferViews'][norm_acc['bufferView']]
    norm_offset = norm_bv.get('byteOffset', 0) + norm_acc.get('byteOffset', 0)
    raw_normals = np.frombuffer(bin_data[norm_offset : norm_offset + norm_acc['count'] * 12], dtype=np.float32).reshape(-1, 3)

    idx_acc = gltf['accessors'][prim['indices']]
    idx_bv = gltf['bufferViews'][idx_acc['bufferView']]
    idx_offset = idx_bv.get('byteOffset', 0) + idx_acc.get('byteOffset', 0)
    comp_type = idx_acc['componentType']
    dtype = np.uint16 if comp_type == 5123 else np.uint32
    indices = np.frombuffer(bin_data[idx_offset : idx_offset + idx_acc['count'] * np.dtype(dtype).itemsize], dtype=dtype).reshape(-1, 3)

    positions = raw_positions.copy()
    normals = raw_normals.copy()

    # Youthful proportion morphing:
    # Lift mouth furrow
    mouth_furrow = (positions[:, 1] >= 0.2) & (positions[:, 1] <= 0.7) & (positions[:, 2] > 1.8) & (np.abs(positions[:, 0]) < 1.0)
    positions[mouth_furrow, 2] += 0.15

    # Masculine jaw angle definition
    jaw = (positions[:, 1] >= -0.8) & (positions[:, 1] <= 0.0) & (positions[:, 2] < 1.8)
    positions[jaw, 0] *= 1.08

    # Subtle natural 6-degree head tilt (matching front.jpg)
    tilt = math.radians(-6.5)
    ct, st = math.cos(tilt), math.sin(tilt)
    x_r = positions[:, 0] * ct - positions[:, 1] * st
    y_r = positions[:, 0] * st + positions[:, 1] * ct
    positions[:, 0] = x_r
    positions[:, 1] = y_r
    nx_r = normals[:, 0] * ct - normals[:, 1] * st
    ny_r = normals[:, 0] * st + normals[:, 1] * ct
    normals[:, 0] = nx_r
    normals[:, 1] = ny_r

    # Sample 26,000 base surface points via barycentric triangle interpolation
    v0 = positions[indices[:, 0]]
    v1 = positions[indices[:, 1]]
    v2 = positions[indices[:, 2]]
    areas = 0.5 * np.linalg.norm(np.cross(v1 - v0, v2 - v0), axis=1)
    probs = areas / np.sum(areas)

    N_surf = 25000
    np.random.seed(42)
    choices = np.random.choice(len(areas), size=N_surf, p=probs)
    r1 = np.random.uniform(0, 1, N_surf)
    r2 = np.random.uniform(0, 1, N_surf)
    sr1 = np.sqrt(r1)
    u = 1.0 - sr1
    v = r2 * sr1
    w = 1.0 - u - v
    surf_pts = u[:, None] * v0[choices] + v[:, None] * v1[choices] + w[:, None] * v2[choices]
    surf_n = u[:, None] * normals[indices[choices, 0]] + v[:, None] * normals[indices[choices, 1]] + w[:, None] * normals[indices[choices, 2]]
    surf_n /= (np.linalg.norm(surf_n, axis=1, keepdims=True) + 1e-6)

    # Volumetric textured curly hair (crowned on top of cranium, flowing forward as fringe)
    hair_pts = []
    hair_norms = []
    num_curls = 260
    pts_per = 32

    for _ in range(num_curls):
        th = np.random.uniform(-math.pi * 0.55, math.pi * 0.55)
        phi = np.random.uniform(math.pi * 0.30, math.pi * 0.5)
        r = np.random.uniform(2.5, 2.9)

        rx = r * math.cos(phi) * math.sin(th)
        ry = 1.2 + r * math.sin(phi) * 1.05
        rz = r * math.cos(phi) * math.cos(th) - 0.15

        rx, ry = rx * ct - ry * st, rx * st + ry * ct

        curl_len = np.random.uniform(0.28, 0.60)
        c_rad = np.random.uniform(0.06, 0.16)
        turns = np.random.uniform(1.2, 2.4)

        for p in range(pts_per):
            t = p / (pts_per - 1)
            ang = t * turns * 2.0 * math.pi
            hx = c_rad * math.cos(ang)
            hz = c_rad * math.sin(ang)

            px = rx + t * curl_len * np.random.uniform(-0.25, 0.25) + hx
            py = ry - t * curl_len * 0.65
            pz = rz + t * curl_len * 0.45 + hz

            nx = px / 3.0
            ny = (py - 1.5) / 3.0
            nz = pz / 2.5
            nl = math.sqrt(nx*nx + ny*ny + nz*nz) + 1e-6
            hair_pts.append([px, py, pz])
            hair_norms.append([nx/nl, ny/nl, nz/nl])

    hair_pts = np.array(hair_pts, dtype=np.float32)
    hair_norms = np.array(hair_norms, dtype=np.float32)

    # Perimeter dissolving stardust particles
    num_stardust = target_count - len(surf_pts) - len(hair_pts)
    stardust_pts = []
    stardust_norms = []

    for _ in range(num_stardust):
        angle = np.random.uniform(0, 2 * math.pi)
        r_dist = np.random.uniform(3.2, 5.0)
        sx = r_dist * math.cos(angle)
        sy = -0.5 + r_dist * math.sin(angle) * 0.8
        sz = np.random.uniform(-2.0, 1.8)
        stardust_pts.append([sx, sy, sz])
        stardust_norms.append([math.cos(angle), math.sin(angle), 0.5])

    stardust_pts = np.array(stardust_pts, dtype=np.float32)
    stardust_norms = np.array(stardust_norms, dtype=np.float32)

    all_pts = np.vstack([surf_pts, hair_pts, stardust_pts])
    all_norms = np.vstack([surf_n, hair_norms, stardust_norms])

    is_hair = np.zeros(len(all_pts), dtype=bool)
    is_hair[len(surf_pts) : len(surf_pts) + len(hair_pts)] = True

    is_edge = np.zeros(len(all_pts), dtype=bool)
    is_edge[len(surf_pts) + len(hair_pts) :] = True

    # Feature weight: face front features (eyes, nose, mouth) have high anchor weight (1.0)
    is_face = (all_pts[:, 1] >= -0.2) & (all_pts[:, 1] <= 1.8) & (all_pts[:, 2] > 1.2) & (np.abs(all_pts[:, 0]) < 1.6)
    feat_w = np.where(is_face, 1.0, np.where(is_hair, 0.7, np.where(is_edge, 0.1, 0.4))).astype(np.float32)

    # World space normalization (height ~ 2.2 units, centered at 0, 0, 0)
    scale_factor = 0.28
    norm_x = all_pts[:, 0] * scale_factor
    norm_y = (all_pts[:, 1] - 0.2) * scale_factor
    norm_z = (all_pts[:, 2] - 0.2) * scale_factor

    total_particles = len(norm_x)
    print(f"Total particles assembled: {total_particles}")

    # Studio key lighting from upper-left
    light_dir = np.array([0.35, 0.65, 0.70])
    light_dir /= np.linalg.norm(light_dir)
    dot_light = np.clip(np.sum(all_norms * light_dir, axis=1), 0.0, 1.0)
    illumination = 0.42 + 0.58 * dot_light

    # Editorial Palette:
    # 88% warm-white / off-white, 12% champagne/gold accents
    col_roll = np.random.uniform(0.0, 1.0, size=total_particles)
    accent_prob = np.where(is_hair | is_edge, 0.28, 0.05)
    is_accent = col_roll < accent_prob

    is_pure_white = col_roll > (accent_prob + 0.35)
    base_r = np.where(is_pure_white, 0.97, 0.91)
    base_g = np.where(is_pure_white, 0.96, 0.89)
    base_b = np.where(is_pure_white, 0.94, 0.85)

    is_gold = is_accent & (col_roll < (accent_prob * 0.40))
    is_champagne = is_accent & ~is_gold

    base_r = np.where(is_champagne, 0.93, base_r)
    base_g = np.where(is_champagne, 0.85, base_g)
    base_b = np.where(is_champagne, 0.73, base_b)

    base_r = np.where(is_gold, 0.86, base_r)
    base_g = np.where(is_gold, 0.70, base_g)
    base_b = np.where(is_gold, 0.48, base_b)

    col_r = base_r * illumination
    col_g = base_g * illumination
    col_b = base_b * illumination

    # Sizes: fine, crisp point sprites (1.8 to 2.8px)
    sizes = 1.8 + feat_w * 0.8
    sizes = np.where(is_edge, 1.5 + np.random.uniform(0.0, 0.8, size=total_particles), sizes)

    alphas = 0.65 + feat_w * 0.30
    alphas = np.where(is_edge, 0.35 + np.random.uniform(0.0, 0.35, size=total_particles), alphas)

    phase = np.random.uniform(0.0, 1.0, size=total_particles).astype(np.float32)

    # Dispersal 3D Cloud for Assembly
    disp_r = np.random.uniform(1.8, 3.8, size=total_particles)
    disp_th = np.random.uniform(0, 2 * math.pi, size=total_particles)
    disp_phi = np.random.uniform(-math.pi * 0.4, math.pi * 0.4, size=total_particles)

    disp_x = disp_r * np.cos(disp_phi) * np.cos(disp_th)
    disp_y = disp_r * np.sin(disp_phi)
    disp_z = disp_r * np.cos(disp_phi) * np.sin(disp_th)

    # Pack into binary buffer (13 floats = 52 bytes)
    particles_arr = np.zeros((total_particles, 13), dtype=np.float32)
    particles_arr[:, 0] = norm_x
    particles_arr[:, 1] = norm_y
    particles_arr[:, 2] = norm_z
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
            "minX": float(np.min(norm_x)), "maxX": float(np.max(norm_x)),
            "minY": float(np.min(norm_y)), "maxY": float(np.max(norm_y)),
            "minZ": float(np.min(norm_z)), "maxZ": float(np.max(norm_z))
        },
        "version": "8.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Generated {total_particles} particles! File: {output_bin} ({os.path.getsize(output_bin)/(1024*1024):.2f} MB)")

    # High-Res 2D Verification Render
    cw, ch = 900, 1100
    canvas = np.zeros((ch, cw, 3), dtype=np.float32)
    canvas[:, :] = [0.035, 0.040, 0.045] # obsidian background

    scale = 360.0
    px = (norm_x * scale + cw * 0.50).astype(int)
    py = (-norm_y * scale + ch * 0.48).astype(int)

    sort_idx = np.argsort(norm_z)
    for idx in sort_idx:
        x, y = px[idx], py[idx]
        if 2 <= x < cw - 2 and 2 <= y < ch - 2:
            bgr = np.array([col_b[idx], col_g[idx], col_r[idx]], dtype=np.float32)
            sz = int(round(sizes[idx] * 0.85))
            sz = max(1, min(sz, 3))
            a = alphas[idx] * 0.90
            cv2.circle(canvas, (x, y), sz, (bgr * a).tolist(), -1)
            cv2.circle(canvas, (x, y), max(1, sz // 2), (bgr * 1.15).tolist(), -1)

    canvas = np.clip(canvas * 255.0, 0, 255).astype(np.uint8)
    cv2.imwrite(preview_img, canvas)
    print(f"Saved preview render to {preview_img}")

if __name__ == '__main__':
    export_final_sculpture()
