import struct
import json
import numpy as np
import math
import os
import cv2

def generate_variant(variant_type='A'):
    print(f"\n==========================================")
    print(f"Generating Refined Sculpture Variant {variant_type}...")
    print(f"==========================================")
    
    # 1. Load canonical 3D head scan geometry (Lee Perry-Smith scan)
    with open('scripts/head_scan.glb', 'rb') as f:
        data = f.read()

    json_len = struct.unpack('<I', data[12:16])[0]
    gltf = json.loads(data[20:20+json_len].decode('utf-8'))
    bin_data = data[20+json_len+8:]

    prim = gltf['meshes'][0]['primitives'][0]
    pos_acc = gltf['accessors'][prim['attributes']['POSITION']]
    pos_bv = gltf['bufferViews'][pos_acc['bufferView']]
    pos_offset = pos_bv.get('byteOffset', 0) + pos_acc.get('byteOffset', 0)
    raw_positions = np.frombuffer(bin_data[pos_offset : pos_offset + pos_acc['count'] * 12], dtype=np.float32).reshape(-1, 3).copy()

    norm_acc = gltf['accessors'][prim['attributes']['NORMAL']]
    norm_bv = gltf['bufferViews'][norm_acc['bufferView']]
    norm_offset = norm_bv.get('byteOffset', 0) + norm_acc.get('byteOffset', 0)
    raw_normals = np.frombuffer(bin_data[norm_offset : norm_offset + norm_acc['count'] * 12], dtype=np.float32).reshape(-1, 3).copy()

    idx_acc = gltf['accessors'][prim['indices']]
    idx_bv = gltf['bufferViews'][idx_acc['bufferView']]
    idx_offset = idx_bv.get('byteOffset', 0) + idx_acc.get('byteOffset', 0)
    comp_type = idx_acc['componentType']
    dtype = np.uint16 if comp_type == 5123 else np.uint32
    indices = np.frombuffer(bin_data[idx_offset : idx_offset + idx_acc['count'] * np.dtype(dtype).itemsize], dtype=dtype).reshape(-1, 3)

    positions = raw_positions.copy()
    normals = raw_normals.copy()

    # 2. Continuous 3D Morphing to Practitioner's Proportions (front.jpg & detail.jpg)
    # A. Face compacting: adjust oblong skull height
    head_height_scale = 1.0 - 0.06 * np.clip((positions[:, 1] - 0.2) / 3.0, 0.0, 1.0)
    positions[:, 1] = positions[:, 1] * head_height_scale

    # B. Athletic squared masculine jawline (derived from photos)
    d_jaw_l = np.sqrt(((positions[:, 0] - 1.35) / 0.65)**2 + ((positions[:, 1] - (-0.20)) / 0.55)**2 + ((positions[:, 2] - 0.8) / 0.8)**2)
    d_jaw_r = np.sqrt(((positions[:, 0] - (-1.35)) / 0.65)**2 + ((positions[:, 1] - (-0.20)) / 0.55)**2 + ((positions[:, 2] - 0.8) / 0.8)**2)
    jaw_widening = 0.20 * (np.exp(-d_jaw_l**2) + np.exp(-d_jaw_r**2))
    positions[:, 0] += np.sign(positions[:, 0]) * jaw_widening

    # C. Strong athletic neck
    d_neck = np.sqrt(((positions[:, 1] - (-0.45)) / 0.45)**2 + ((positions[:, 2] - 0.4) / 0.8)**2)
    positions[:, 0] += np.sign(positions[:, 0]) * 0.12 * np.exp(-d_neck**2)

    # D. Defined cheekbones
    d_cheek_l = np.sqrt(((positions[:, 0] - 1.25) / 0.50)**2 + ((positions[:, 1] - 1.05) / 0.45)**2 + ((positions[:, 2] - 1.4) / 0.6)**2)
    d_cheek_r = np.sqrt(((positions[:, 0] - (-1.25)) / 0.50)**2 + ((positions[:, 1] - 1.05) / 0.45)**2 + ((positions[:, 2] - 1.4) / 0.6)**2)
    positions[:, 0] += np.sign(positions[:, 0]) * 0.10 * (np.exp(-d_cheek_l**2) + np.exp(-d_cheek_r**2))

    # E. Youthful open almond eyes (gentle lift of upper eyelid fold)
    d_eye_l = np.sqrt(((positions[:, 0] - 0.82) / 0.35)**2 + ((positions[:, 1] - 1.66) / 0.18)**2 + ((positions[:, 2] - 1.65) / 0.30)**2)
    d_eye_r = np.sqrt(((positions[:, 0] - (-0.85)) / 0.35)**2 + ((positions[:, 1] - 1.66) / 0.18)**2 + ((positions[:, 2] - 1.65) / 0.30)**2)
    eye_open = 0.08 * (np.exp(-d_eye_l**2) + np.exp(-d_eye_r**2))
    positions[:, 1] += eye_open * 0.5
    positions[:, 2] -= eye_open * 0.35

    # F. Youthful lips fullness & subtle smile lift
    d_mouth_center = np.sqrt((positions[:, 0] / 0.60)**2 + ((positions[:, 1] - 0.36) / 0.25)**2 + ((positions[:, 2] - 2.05) / 0.35)**2)
    positions[:, 2] += 0.07 * np.exp(-d_mouth_center**2)

    # G. Recompute smooth normals
    v0 = positions[indices[:, 0]]
    v1 = positions[indices[:, 1]]
    v2 = positions[indices[:, 2]]
    face_normals = np.cross(v1 - v0, v2 - v0)
    face_normals /= (np.linalg.norm(face_normals, axis=1, keepdims=True) + 1e-6)

    new_normals = np.zeros_like(positions)
    for i in range(3):
        np.add.at(new_normals, indices[:, i], face_normals)
    new_normals /= (np.linalg.norm(new_normals, axis=1, keepdims=True) + 1e-6)
    normals = new_normals

    # H. Subtle natural 6.0 degree head tilt (matching front.jpg)
    tilt = math.radians(-6.0)
    ct, st = math.cos(tilt), math.sin(tilt)
    x_r = positions[:, 0] * ct - positions[:, 1] * st
    y_r = positions[:, 0] * st + positions[:, 1] * ct
    positions[:, 0] = x_r
    positions[:, 1] = y_r
    nx_r = normals[:, 0] * ct - normals[:, 1] * st
    ny_r = normals[:, 0] * st + normals[:, 1] * ct
    normals[:, 0] = nx_r
    normals[:, 1] = ny_r

    # 3. Surface Triangles & Clean Manifold Filtering
    v0 = positions[indices[:, 0]]
    v1 = positions[indices[:, 1]]
    v2 = positions[indices[:, 2]]
    fn = np.cross(v1 - v0, v2 - v0)
    fn /= (np.linalg.norm(fn, axis=1, keepdims=True) + 1e-6)
    raw_areas = 0.5 * np.linalg.norm(np.cross(v1 - v0, v2 - v0), axis=1)

    tri_cx = (v0[:, 0] + v1[:, 0] + v2[:, 0]) / 3.0
    tri_cy = (v0[:, 1] + v1[:, 1] + v2[:, 1]) / 3.0
    tri_cz = (v0[:, 2] + v1[:, 2] + v2[:, 2]) / 3.0

    weight = np.ones(len(raw_areas), dtype=np.float32)

    # Filter out internal mouth cavity & throat
    is_internal_mouth = (tri_cy > -0.1) & (tri_cy < 0.7) & (np.abs(tri_cx) < 0.8) & (tri_cz < 1.5)
    weight = np.where(is_internal_mouth, 0.0, weight)

    # Dampen back-facing triangles
    is_back = fn[:, 2] < -0.10
    weight = np.where(is_back, weight * 0.05, weight)

    # Smooth facial presence boost
    d_t_face = np.sqrt(tri_cx**2 + (tri_cy - 0.75)**2 + (tri_cz - 1.8)**2)
    weight += 2.6 * np.exp(-d_t_face**2 / (2.0 * (1.3**2)))

    # Smooth eye orbital boost
    d_t_eye_l = np.sqrt((tri_cx - 0.80)**2 + (tri_cy - 1.55)**2 + (tri_cz - 1.63)**2)
    d_t_eye_r = np.sqrt((tri_cx - (-0.88))**2 + (tri_cy - 1.55)**2 + (tri_cz - 1.63)**2)
    weight += 2.4 * (np.exp(-d_t_eye_l**2 / (2.0 * (0.45**2))) + np.exp(-d_t_eye_r**2 / (2.0 * (0.45**2))))

    # Scalp under hair: reduce bare skin
    is_scalp_tri = ((tri_cy > 2.0) & (tri_cz < 1.1)) | (tri_cy > 2.8)
    weight = np.where(is_scalp_tri, weight * 0.20, weight)

    # Shoulders & Chest gradual decay
    is_lower = tri_cy < -0.8
    decay = np.exp((tri_cy + 0.8) * 0.95) * np.exp(-np.abs(tri_cx) * 0.25)
    weight = np.where(is_lower, weight * np.clip(decay * 0.50, 0.04, 0.90), weight)

    weighted_areas = raw_areas * weight
    probs = weighted_areas / np.sum(weighted_areas)

    N_surf_sample = 36000
    np.random.seed(42 if variant_type == 'A' else 99)
    choices = np.random.choice(len(raw_areas), size=N_surf_sample, p=probs)

    r1 = np.random.uniform(0, 1, N_surf_sample)
    r2 = np.random.uniform(0, 1, N_surf_sample)
    sr1 = np.sqrt(r1)
    u = 1.0 - sr1
    v = r2 * sr1
    w = 1.0 - u - v

    raw_surf_pts = u[:, None] * v0[choices] + v[:, None] * v1[choices] + w[:, None] * v2[choices]
    raw_surf_n = u[:, None] * normals[indices[choices, 0]] + v[:, None] * normals[indices[choices, 1]] + w[:, None] * normals[indices[choices, 2]]
    raw_surf_n /= (np.linalg.norm(raw_surf_n, axis=1, keepdims=True) + 1e-6)

    # 4. Volumetric Textured Curly Hair Crown & Cascading Fringe
    print("Synthesizing authentic textured hair crown and fringe...")
    is_scalp_source = ((tri_cy > 1.6) & (tri_cz < 1.35)) | (tri_cy > 2.1)
    scalp_indices = np.where(is_scalp_source)[0]
    scalp_probs = raw_areas[scalp_indices] / np.sum(raw_areas[scalp_indices])

    num_hair_sample = 13500
    hair_choices = np.random.choice(scalp_indices, size=num_hair_sample, p=scalp_probs)

    hr1 = np.random.uniform(0, 1, num_hair_sample)
    hr2 = np.random.uniform(0, 1, num_hair_sample)
    hsr1 = np.sqrt(hr1)
    hu = 1.0 - hsr1
    hv = hr2 * hsr1
    hw = 1.0 - hu - hv

    root_pts = hu[:, None] * v0[hair_choices] + hv[:, None] * v1[hair_choices] + hw[:, None] * v2[hair_choices]
    root_n = hu[:, None] * normals[indices[hair_choices, 0]] + hv[:, None] * normals[indices[hair_choices, 1]] + hw[:, None] * normals[indices[hair_choices, 2]]
    root_n /= (np.linalg.norm(root_n, axis=1, keepdims=True) + 1e-6)

    raw_hair_pts = []
    raw_hair_n = []

    for i in range(num_hair_sample):
        rx, ry, rz = root_pts[i]
        rnx, rny, rnz = root_n[i]

        is_fringe = (abs(rx) < 1.3) & (ry > 1.9) & (rz > 0.4)
        is_crown = ry > 2.8

        if is_fringe:
            layer = np.random.uniform(0.10, 0.45)
            wave_x = math.sin(rx * 7.0 + ry * 9.0) * 0.05
            wave_y = -layer * 0.75 + math.cos(rx * 6.0) * 0.04
            wave_z = layer * 0.70 + math.sin(ry * 6.0) * 0.05
        elif is_crown:
            layer = np.random.uniform(0.08, 0.35)
            wave_x = rnx * layer + math.sin(ry * 6.0 + rz * 5.0) * 0.05
            wave_y = rny * layer + math.cos(rx * 5.5) * 0.05
            wave_z = rnz * layer + math.sin(rx * 5.0 + ry * 5.0) * 0.05
        else:
            layer = np.random.uniform(0.04, 0.15)
            wave_x = rnx * layer + math.sin(ry * 7.0) * 0.03
            wave_y = rny * layer
            wave_z = rnz * layer

        px = rx + wave_x
        py = ry + wave_y
        pz = rz + wave_z

        raw_hair_pts.append([px, py, pz])
        raw_hair_n.append([rnx, rny, rnz])

    raw_hair_pts = np.array(raw_hair_pts, dtype=np.float32)
    raw_hair_n = np.array(raw_hair_n, dtype=np.float32)

    # Combine surface and hair candidates
    combined_pts = np.vstack([raw_surf_pts, raw_hair_pts])
    combined_n = np.vstack([raw_surf_n, raw_hair_n])
    is_hair_flag = np.zeros(len(combined_pts), dtype=bool)
    is_hair_flag[len(raw_surf_pts):] = True

    # 5. Screen-Space Depth Shell Filter: Eliminate occluded back-of-neck & spine points!
    print("Applying front-surface depth shell occlusion filter...")
    grid_w, grid_h = 240, 300
    gx = np.clip(((combined_pts[:, 0] + 4.5) / 9.0 * (grid_w - 1)).astype(int), 0, grid_w - 1)
    gy = np.clip(((-combined_pts[:, 1] + 4.5) / 9.0 * (grid_h - 1)).astype(int), 0, grid_h - 1)

    z_front = np.full((grid_h, grid_w), -999.0, dtype=np.float32)
    for i in range(len(combined_pts)):
        if combined_pts[i, 2] > z_front[gy[i], gx[i]]:
            z_front[gy[i], gx[i]] = combined_pts[i, 2]

    # Dilate 3x3
    z_front_smooth = cv2.dilate(z_front, np.ones((3, 3), np.uint8))

    # Keep points within 0.70 units of front-most depth (scaled: ~0.20 world units)
    is_front_shell = np.zeros(len(combined_pts), dtype=bool)
    for i in range(len(combined_pts)):
        if combined_pts[i, 2] >= (z_front_smooth[gy[i], gx[i]] - 0.70):
            is_front_shell[i] = True

    front_pts = combined_pts[is_front_shell]
    front_n = combined_n[is_front_shell]
    is_hair = is_hair_flag[is_front_shell]
    print(f"Front surface points after depth filter: {len(front_pts)}")

    # 6. Physically Anchored Dissolution Sparks
    print("Generating physically anchored dissolution sparks...")
    num_sparks = 2400 if variant_type == 'A' else 4800
    n_sparks_hair = int(num_sparks * 0.32)
    n_sparks_body = num_sparks - n_sparks_hair

    hair_indices = np.where(is_hair)[0]
    body_indices = np.where(~is_hair & (front_pts[:, 1] < -0.8))[0]

    spark_h_idx = np.random.choice(hair_indices, size=n_sparks_hair)
    spark_b_idx = np.random.choice(body_indices, size=n_sparks_body)

    sparks_hair = front_pts[spark_h_idx] + front_n[spark_h_idx] * np.random.uniform(0.08, 0.45 if variant_type == 'A' else 0.70, size=(n_sparks_hair, 1)) + np.random.normal(0, 0.05, size=(n_sparks_hair, 3))
    sparks_body = front_pts[spark_b_idx] + front_n[spark_b_idx] * np.random.uniform(0.08, 0.55 if variant_type == 'A' else 0.80, size=(n_sparks_body, 1)) + np.random.normal(0, 0.06, size=(n_sparks_body, 3))

    all_sparks = np.vstack([sparks_hair, sparks_body])
    all_spark_norms = np.vstack([front_n[spark_h_idx], front_n[spark_b_idx]])

    # Combine All Components
    all_pts = np.vstack([front_pts, all_sparks])
    all_norms = np.vstack([front_n, all_spark_norms])

    n_f = len(front_pts)
    is_hair_all = np.zeros(len(all_pts), dtype=bool)
    is_hair_all[:n_f] = is_hair

    is_dust = np.zeros(len(all_pts), dtype=bool)
    is_dust[n_f:] = True

    # 7. Smooth 3D Continuous Feature Weights Field
    d_face_3d = np.sqrt(all_pts[:, 0]**2 + (all_pts[:, 1] - 0.75)**2 + (all_pts[:, 2] - 1.8)**2)
    face_weight = np.exp(-d_face_3d**2 / (2.0 * (1.4**2)))

    d_eye_l_3d = np.sqrt((all_pts[:, 0] - 0.80)**2 + (all_pts[:, 1] - 1.55)**2 + (all_pts[:, 2] - 1.63)**2)
    d_eye_r_3d = np.sqrt((all_pts[:, 0] - (-0.88))**2 + (all_pts[:, 1] - 1.55)**2 + (all_pts[:, 2] - 1.63)**2)
    eye_weight = np.exp(-d_eye_l_3d**2 / (2.0 * (0.45**2))) + np.exp(-d_eye_r_3d**2 / (2.0 * (0.45**2)))

    feat_w = np.clip(0.35 + 0.45 * face_weight + 0.20 * eye_weight, 0.0, 1.0)
    feat_w = np.where(is_hair_all, 0.65, np.where(is_dust, 0.05, feat_w)).astype(np.float32)

    # 8. World Space Normalization (Height ~ 2.2 Three.js units)
    scale_factor = 0.28
    norm_x = all_pts[:, 0] * scale_factor
    norm_y = (all_pts[:, 1] - 0.15) * scale_factor
    norm_z = (all_pts[:, 2] - 0.2) * scale_factor
    total_pts = len(norm_x)
    print(f"Total particles generated: {total_pts}")

    # 9. Studio Lighting with Smooth Ambient Lift
    key_light = np.array([0.35, 0.60, 0.70])
    key_light /= np.linalg.norm(key_light)
    rim_light = np.array([-0.50, 0.30, 0.60])
    rim_light /= np.linalg.norm(rim_light)

    dot_key = np.clip(np.sum(all_norms * key_light, axis=1), 0.0, 1.0)
    dot_rim = np.clip(np.sum(all_norms * rim_light, axis=1), 0.0, 1.0)

    # Ambient lift smooth in 3D
    ambient_base = 0.44 + 0.18 * eye_weight + 0.10 * face_weight
    illumination = ambient_base + (1.0 - ambient_base) * (dot_key * 0.80 + dot_rim * 0.25)
    illumination = np.clip(illumination, 0.45, 1.0)

    # 10. Harmonious Editorial Palette (88-92% Warm White, 8-12% Champagne/Gold)
    col_roll = np.random.uniform(0.0, 1.0, size=total_pts)
    accent_prob = np.where(is_hair_all, 0.14, np.where(is_dust, 0.22, 0.08))
    is_accent = col_roll < accent_prob

    # Base warm-white / off-white
    is_pure_white = col_roll > (accent_prob + 0.30)
    base_r = np.where(is_pure_white, 0.98, 0.93)
    base_g = np.where(is_pure_white, 0.97, 0.91)
    base_b = np.where(is_pure_white, 0.95, 0.87)

    # Champagne accent
    is_gold = is_accent & (col_roll < (accent_prob * 0.35))
    is_champagne = is_accent & ~is_gold

    base_r = np.where(is_champagne, 0.94, base_r)
    base_g = np.where(is_champagne, 0.87, base_g)
    base_b = np.where(is_champagne, 0.74, base_b)

    base_r = np.where(is_gold, 0.88, base_r)
    base_g = np.where(is_gold, 0.72, base_g)
    base_b = np.where(is_gold, 0.48, base_b)

    col_r = base_r * illumination
    col_g = base_g * illumination
    col_b = base_b * illumination

    # 11. Smooth Shoulder Dissolution Taper
    t_body = np.clip((-norm_y - 0.20) / 0.85, 0.0, 1.0)
    body_fade = np.exp(-t_body * (1.8 if variant_type == 'A' else 2.3))

    # 12. Point Sizes: Delicately Scaled Digital Fiber-Optic Nodes
    if variant_type == 'A':
        # Variant A: Fine, crisp, high structural focus
        base_size = 1.25 + feat_w * 0.55
        sizes = np.where(is_dust, 1.1 + np.random.uniform(0.0, 0.4, size=total_pts), base_size)
        alphas = (0.75 + feat_w * 0.22) * body_fade
        alphas = np.where(is_dust, np.random.uniform(0.20, 0.50, size=total_pts), alphas)
    else:
        # Variant B: Softer, airy, atmospheric dissolution
        base_size = 1.35 + feat_w * 0.60
        sizes = np.where(is_dust, 1.15 + np.random.uniform(0.0, 0.7, size=total_pts), base_size)
        alphas = (0.68 + feat_w * 0.22) * body_fade
        alphas = np.where(is_dust, np.random.uniform(0.18, 0.60, size=total_pts), alphas)

    phase = np.random.uniform(0.0, 1.0, size=total_pts).astype(np.float32)

    # Dispersal 3D Cloud for Assembly
    disp_r = np.random.uniform(1.8, 3.8, size=total_pts)
    disp_th = np.random.uniform(0, 2 * math.pi, size=total_pts)
    disp_phi = np.random.uniform(-math.pi * 0.4, math.pi * 0.4, size=total_pts)
    disp_x = disp_r * np.cos(disp_phi) * np.cos(disp_th)
    disp_y = disp_r * np.sin(disp_phi)
    disp_z = disp_r * np.cos(disp_phi) * np.sin(disp_th)

    # Binary Buffer Pack (13 floats = 52 bytes per particle)
    particles_arr = np.zeros((total_pts, 13), dtype=np.float32)
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

    out_bin = f'public/assets/portrait-particles-{variant_type.lower()}.bin'
    os.makedirs(os.path.dirname(out_bin), exist_ok=True)
    with open(out_bin, 'wb') as f:
        f.write(particles_arr.tobytes())

    meta = {
        "variant": variant_type,
        "particleCount": int(total_pts),
        "strideFloats": 13,
        "strideBytes": 52,
        "bounds": {
            "minX": float(np.min(norm_x)), "maxX": float(np.max(norm_x)),
            "minY": float(np.min(norm_y)), "maxY": float(np.max(norm_y)),
            "minZ": float(np.min(norm_z)), "maxZ": float(np.max(norm_z))
        },
        "version": f"refined-shell-{variant_type}"
    }
    with open(f'public/assets/portrait-meta-{variant_type.lower()}.json', 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Variant {variant_type} saved to {out_bin} ({len(particles_arr)} particles).")
    return out_bin

if __name__ == '__main__':
    generate_variant('A')
    generate_variant('B')
