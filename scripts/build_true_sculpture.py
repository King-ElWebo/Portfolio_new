import struct
import json
import cv2
import numpy as np
import math
import os

def build_true_sculpture(
    target_count=36000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json',
    preview_img='scripts/preview_sculpture.png'
):
    print("Loading 3D head scan geometry...")
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

    # 1. Calibrate & Morph Proportions to Practitioner's Features (from front.jpg and detail.jpg)
    positions = raw_positions.copy()
    normals = raw_normals.copy()

    # Practitioner characteristics:
    # A. Defined, strong masculine jawline: slightly widen jaw angles
    is_jaw = (positions[:, 1] >= -1.0) & (positions[:, 1] <= 0.2) & (positions[:, 2] < 1.8)
    jaw_factor = 1.0 + 0.12 * np.exp(-((positions[:, 1] - (-0.4))**2) / (2.0 * (0.5**2)))
    positions[:, 0] = np.where(is_jaw, positions[:, 0] * jaw_factor, positions[:, 0])

    # B. Slightly fuller lips (Y in [0.25, 0.65], Z > 1.8)
    is_mouth = (positions[:, 1] >= 0.25) & (positions[:, 1] <= 0.65) & (positions[:, 2] > 1.8) & (np.abs(positions[:, 0]) < 1.0)
    mouth_relief = 0.12 * np.exp(-((positions[:, 1] - 0.45)**2) / (2.0 * (0.18**2))) * np.exp(-(positions[:, 0]**2) / (2.0 * (0.6**2)))
    positions[:, 2] = np.where(is_mouth, positions[:, 2] + mouth_relief, positions[:, 2])

    # C. Natural subtle head tilt (8.5 degrees around Z axis, matching front.jpg)
    tilt_rad = math.radians(-7.5) # slight head angle
    cos_t, sin_t = math.cos(tilt_rad), math.sin(tilt_rad)
    x_rot = positions[:, 0] * cos_t - positions[:, 1] * sin_t
    y_rot = positions[:, 0] * sin_t + positions[:, 1] * cos_t
    positions[:, 0] = x_rot
    positions[:, 1] = y_rot

    # Also rotate normals
    nx_rot = normals[:, 0] * cos_t - normals[:, 1] * sin_t
    ny_rot = normals[:, 0] * sin_t + normals[:, 1] * cos_t
    normals[:, 0] = nx_rot
    normals[:, 1] = ny_rot

    # 2. Surface Sampling via Barycentric Interpolation
    print("Sampling base surface from 3D triangles...")
    v0 = positions[indices[:, 0]]
    v1 = positions[indices[:, 1]]
    v2 = positions[indices[:, 2]]

    cross = np.cross(v1 - v0, v2 - v0)
    areas = 0.5 * np.linalg.norm(cross, axis=1)
    total_area = np.sum(areas)
    probs = areas / total_area

    # We sample ~23,000 points on the head & bust surface
    num_surface = 23000
    np.random.seed(42)
    tri_choices = np.random.choice(len(areas), size=num_surface, p=probs)

    r1 = np.random.uniform(0, 1, num_surface)
    r2 = np.random.uniform(0, 1, num_surface)
    sqrt_r1 = np.sqrt(r1)
    u = 1.0 - sqrt_r1
    v = r2 * sqrt_r1
    w = 1.0 - u - v

    pts = (u[:, None] * v0[tri_choices] + 
           v[:, None] * v1[tri_choices] + 
           w[:, None] * v2[tri_choices])

    n0 = normals[indices[tri_choices, 0]]
    n1 = normals[indices[tri_choices, 1]]
    n2 = normals[indices[tri_choices, 2]]
    norms = u[:, None] * n0 + v[:, None] * n1 + w[:, None] * n2
    norms /= (np.linalg.norm(norms, axis=1, keepdims=True) + 1e-6)

    # 3. Add Signature Volumetric Curly Hair (from front.jpg and detail.jpg)
    # The practitioner has a thick curly crown and wavy fringe
    print("Generating volumetric curly hair strands...")
    num_hair_curls = 160
    pts_per_curl = 55
    hair_pts = []
    hair_norms = []

    # Skull crown is roughly Y in [1.8, 3.8], Z in [-1.5, 2.0]
    for _ in range(num_hair_curls):
        # Root on upper cranium
        phi = np.random.uniform(0.15, math.pi * 0.5) # elevation
        th = np.random.uniform(-math.pi * 0.7, math.pi * 0.7) # azimuth
        root_r = np.random.uniform(2.4, 2.9)

        root_x = root_r * math.cos(phi) * math.sin(th)
        root_y = 1.2 + root_r * math.sin(phi) * 1.05
        root_z = root_r * math.cos(phi) * math.cos(th) - 0.2

        # Rotate root with head tilt
        rx_rot = root_x * cos_t - root_y * sin_t
        ry_rot = root_x * sin_t + root_y * cos_t
        root_x, root_y = rx_rot, ry_rot

        # Curl flow
        curl_len = np.random.uniform(0.35, 0.75)
        curl_rad = np.random.uniform(0.08, 0.22)
        curl_turns = np.random.uniform(1.2, 2.6)
        flow_dx = np.random.uniform(-0.4, 0.4)
        flow_dy = -np.random.uniform(0.3, 0.8) # cascades down
        flow_dz = np.random.uniform(0.2, 0.7) # reaches outward in Z

        for p_idx in range(pts_per_curl):
            t = p_idx / (pts_per_curl - 1)
            helix_ang = t * curl_turns * 2.0 * math.pi
            hx = curl_rad * math.cos(helix_ang)
            hz = curl_rad * math.sin(helix_ang)

            px = root_x + t * curl_len * flow_dx + hx
            py = root_y + t * curl_len * flow_dy
            pz = root_z + t * curl_len * flow_dz + hz

            # Normal pointing outward
            nx = px / 3.0
            ny = (py - 1.5) / 3.0
            nz = pz / 2.5
            nlen = math.sqrt(nx*nx + ny*ny + nz*nz) + 1e-6
            hair_pts.append([px, py, pz])
            hair_norms.append([nx/nlen, ny/nlen, nz/nlen])

    hair_pts = np.array(hair_pts, dtype=np.float32)
    hair_norms = np.array(hair_norms, dtype=np.float32)
    print(f"Generated {len(hair_pts)} volumetric hair curl particles.")

    # 4. Add Dissolving Stardust Particles at Perimeter & Bust Edge
    print("Generating dissolving stardust particles...")
    num_stardust = 4200
    stardust_pts = []
    stardust_norms = []

    for _ in range(num_stardust):
        # Disperse around bust and skull
        angle = np.random.uniform(0, 2 * math.pi)
        r_dist = np.random.uniform(2.8, 5.2)
        sx = r_dist * math.cos(angle)
        sy = -0.6 + r_dist * math.sin(angle) * 0.85
        sz = np.random.uniform(-2.2, 1.8)
        stardust_pts.append([sx, sy, sz])
        stardust_norms.append([math.cos(angle), math.sin(angle), 0.5])

    stardust_pts = np.array(stardust_pts, dtype=np.float32)
    stardust_norms = np.array(stardust_norms, dtype=np.float32)

    # 5. Combine and Classify All Particles
    all_pts = np.vstack([pts, hair_pts, stardust_pts])
    all_norms = np.vstack([norms, hair_norms, stardust_norms])

    is_hair = np.zeros(len(all_pts), dtype=bool)
    is_hair[len(pts) : len(pts) + len(hair_pts)] = True

    is_edge = np.zeros(len(all_pts), dtype=bool)
    is_edge[len(pts) + len(hair_pts) :] = True

    # High feature weight on face front (eyes, nose, mouth)
    is_face_front = (all_pts[:, 1] >= -0.2) & (all_pts[:, 1] <= 1.8) & (all_pts[:, 2] > 1.2) & (np.abs(all_pts[:, 0]) < 1.8)
    feat_w = np.where(is_face_front, 1.0, np.where(is_hair, 0.7, np.where(is_edge, 0.1, 0.4))).astype(np.float32)

    # Normalize to World Scale for Three.js
    # Head center around (0, 0, 0), height ~ 2.2 units
    scale_factor = 0.28
    y_center = 0.0 # already roughly centered
    norm_x = all_pts[:, 0] * scale_factor
    norm_y = (all_pts[:, 1] - 0.2) * scale_factor
    norm_z = (all_pts[:, 2] - 0.2) * scale_factor

    total_particles = len(norm_x)
    print(f"Total particles: {total_particles}")

    # Subsample to exact target_count if needed
    if total_particles > target_count:
        sel = np.random.choice(total_particles, size=target_count, replace=False)
        norm_x = norm_x[sel]
        norm_y = norm_y[sel]
        norm_z = norm_z[sel]
        all_norms = all_norms[sel]
        is_hair = is_hair[sel]
        is_edge = is_edge[sel]
        feat_w = feat_w[sel]
        total_particles = target_count

    # 6. Directional Studio Key Lighting
    light_dir = np.array([0.35, 0.65, 0.70])
    light_dir /= np.linalg.norm(light_dir)
    dot_light = np.clip(np.sum(all_norms * light_dir, axis=1), 0.0, 1.0)
    illumination = 0.40 + 0.60 * dot_light

    # 7. Editorial Palette (NO PHOTOGRAPHIC SKIN COLORS)
    # 88% warm-white / soft off-white, 12% champagne/gold accents
    col_roll = np.random.uniform(0.0, 1.0, size=total_particles)
    accent_prob = np.where(is_hair | is_edge, 0.30, 0.05)
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

    # 8. Sizes and Alphas
    sizes = 1.8 + feat_w * 0.8
    sizes = np.where(is_edge, 1.5 + np.random.uniform(0.0, 0.8, size=total_particles), sizes)

    alphas = 0.65 + feat_w * 0.30
    alphas = np.where(is_edge, 0.35 + np.random.uniform(0.0, 0.35, size=total_particles), alphas)

    phase = np.random.uniform(0.0, 1.0, size=total_particles).astype(np.float32)

    # 9. Assembly Dispersal Cloud
    disp_r = np.random.uniform(1.8, 3.8, size=total_particles)
    disp_th = np.random.uniform(0, 2 * math.pi, size=total_particles)
    disp_phi = np.random.uniform(-math.pi * 0.4, math.pi * 0.4, size=total_particles)

    disp_x = disp_r * np.cos(disp_phi) * np.cos(disp_th)
    disp_y = disp_r * np.sin(disp_phi)
    disp_z = disp_r * np.cos(disp_phi) * np.sin(disp_th)

    # 10. Write Binary Dataset (13 floats = 52 bytes)
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
        "version": "6.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Dataset generated! Count: {total_particles}, Size: {os.path.getsize(output_bin)/(1024*1024):.2f} MB")

    # 11. High-Res 2D Verification Render
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
    print(f"Saved verification preview to {preview_img}")

if __name__ == '__main__':
    build_true_sculpture()
