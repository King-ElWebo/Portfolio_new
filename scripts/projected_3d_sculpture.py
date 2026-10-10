import struct
import json
import cv2
import numpy as np
import math
import os

def build_projected_sculpture(
    target_count=36000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json',
    preview_img='scripts/preview_sculpture.png'
):
    print("1. Extracting 3D head scan depth and normal field...")
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

    # Triangle vertices
    v0 = raw_positions[indices[:, 0]]
    v1 = raw_positions[indices[:, 1]]
    v2 = raw_positions[indices[:, 2]]
    n0 = raw_normals[indices[:, 0]]
    n1 = raw_normals[indices[:, 1]]
    n2 = raw_normals[indices[:, 2]]

    cross = np.cross(v1 - v0, v2 - v0)
    areas = 0.5 * np.linalg.norm(cross, axis=1)
    probs = areas / np.sum(areas)

    # Sample a dense 3D cloud (120k points) to create a continuous depth field
    N_field = 120000
    np.random.seed(42)
    choices = np.random.choice(len(areas), size=N_field, p=probs)
    r1 = np.random.uniform(0, 1, N_field)
    r2 = np.random.uniform(0, 1, N_field)
    sqrt_r1 = np.sqrt(r1)
    u_b = 1.0 - sqrt_r1
    v_b = r2 * sqrt_r1
    w_b = 1.0 - u_b - v_b

    field_pts = (u_b[:, None] * v0[choices] + v_b[:, None] * v1[choices] + w_b[:, None] * v2[choices])
    field_norms = (u_b[:, None] * n0[choices] + v_b[:, None] * n1[choices] + w_b[:, None] * n2[choices])
    field_norms /= (np.linalg.norm(field_norms, axis=1, keepdims=True) + 1e-6)

    # 2. Align 3D Field to Practitioner's front.jpg Coordinate System (486 x 812)
    print("2. Mapping 3D anatomical depth to practitioner portrait...")
    img = cv2.imread('assets/portraits/private/front.jpg')
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Create the clean silhouette mask
    is_wall_top = (gray > 150) & (hsv[:, :, 1] < 40) & (np.arange(h)[:, None] < 410)
    is_wall_left = (gray > 135) & (hsv[:, :, 1] < 38) & (np.arange(w) < 220) & (np.arange(h)[:, None] < 680)
    is_wall_right = (gray > 135) & (hsv[:, :, 1] < 38) & (np.arange(w) > 450) & (np.arange(h)[:, None] < 680)
    is_far_left = (np.arange(w) < 185) & (np.arange(h)[:, None] < 650)
    is_far_right = (np.arange(w) > 470) & (np.arange(h)[:, None] < 640)
    is_arm_left = (np.arange(w) < 175) & (np.arange(h)[:, None] >= 650)

    is_bg = is_wall_top | is_wall_left | is_wall_right | is_far_left | is_far_right | is_arm_left
    subject = (~is_bg).astype(np.uint8)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    subject = cv2.morphologyEx(subject, cv2.MORPH_CLOSE, kernel)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(subject)
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    subject = (labels == largest_label).astype(np.uint8)
    contours, _ = cv2.findContours(subject, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(subject)
    cv2.drawContours(mask, contours, -1, 1, thickness=-1)

    # Classical bust taper
    y_grid, x_grid = np.ogrid[:h, :w]
    bust_curve = ((x_grid - 340.0) / 215.0)**2 + np.maximum(0.0, (y_grid - 680.0) / 140.0)**2
    mask = np.where(bust_curve > 1.25, 0, mask).astype(np.uint8)

    # In front.jpg:
    # Chin at y=730, nose tip at y=565, eyes at y=510, crown at y=310
    # In 3D scan:
    # Chin at Y=-0.6, nose tip at Y=1.1, eyes at Y=1.65, crown at Y=3.9
    # Compute scale and translation to match 3D scan into front.jpg
    # 3D Y: from -0.6 (chin) to 1.65 (eyes) is delta_Y = 2.25
    # 2D Y: from 730 (chin) to 510 (eyes) is delta_y = -220 px
    # scale = 220.0 / 2.25 = 97.8 px per 3D unit
    scan_scale = 92.0
    scan_ox = 340.0 # center X
    scan_oy = 665.0 # chin alignment in 2D

    # Map 3D points to 2D image coordinates:
    # 2D x = scan_ox + field_pts[:, 0] * scan_scale
    # 2D y = scan_oy - field_pts[:, 1] * scan_scale
    # Rasterize into 2D depth buffer Z_buffer and normal buffers
    depth_map = np.full((h, w), -2.0, dtype=np.float32)
    norm_x_map = np.zeros((h, w), dtype=np.float32)
    norm_y_map = np.zeros((h, w), dtype=np.float32)
    norm_z_map = np.ones((h, w), dtype=np.float32)

    proj_x = np.clip(np.round(scan_ox + field_pts[:, 0] * scan_scale).astype(int), 0, w - 1)
    proj_y = np.clip(np.round(scan_oy - field_pts[:, 1] * scan_scale).astype(int), 0, h - 1)

    # Sort front-to-back (highest Z first) so front surface wins
    front_sort = np.argsort(-field_pts[:, 2])
    for i in front_sort:
        px, py = proj_x[i], proj_y[i]
        # Only overwrite if higher Z
        if field_pts[i, 2] > depth_map[py, px]:
            depth_map[py, px] = field_pts[i, 2]
            norm_x_map[py, px] = field_norms[i, 0]
            norm_y_map[py, px] = field_norms[i, 1]
            norm_z_map[py, px] = field_norms[i, 2]

    # Infill any empty pixels in depth buffer using inpainting / Gaussian blur
    depth_mask = (depth_map > -1.9).astype(np.uint8)
    depth_infilled = cv2.inpaint(depth_map, (1 - depth_mask), 5, cv2.INPAINT_TELEA)
    norm_x_infilled = cv2.inpaint(norm_x_map, (1 - depth_mask), 5, cv2.INPAINT_TELEA)
    norm_y_infilled = cv2.inpaint(norm_y_map, (1 - depth_mask), 5, cv2.INPAINT_TELEA)
    norm_z_infilled = cv2.inpaint(norm_z_map, (1 - depth_mask), 5, cv2.INPAINT_TELEA)

    # 3. Extract Practitioner's Exact Facial Contours from front.jpg
    print("3. Extracting practitioner's anatomical feature contours...")
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    gray_masked = cv2.bitwise_and(enhanced, enhanced, mask=mask)

    canny_fine = cv2.Canny(gray_masked, 32, 90)
    canny_strong = cv2.Canny(gray_masked, 60, 140)

    # Hair curl texture
    laplace = np.abs(cv2.Laplacian(gray_masked, cv2.CV_32F, ksize=3))
    laplace_norm = laplace / (np.max(laplace) + 1e-6)
    hair_zone = ((y_grid >= 260) & (y_grid <= 440) & (mask > 0)).astype(np.float32)

    # Exact landmarks
    face_cx, face_cy = 340.0, 560.0
    head_rx, head_ry = 125.0, 195.0

    left_eye_pos = (295.0, 495.0)
    right_eye_pos = (390.0, 525.0)
    nose_tip_pos = (345.0, 565.0)
    mouth_center_pos = (345.0, 630.0)
    chin_pos = (340.0, 730.0)

    # Salience maps
    d_le = np.sqrt((x_grid - left_eye_pos[0])**2 + (y_grid - left_eye_pos[1])**2)
    mask_le = np.exp(- (d_le**2) / (2.0 * (24.0**2)))
    d_re = np.sqrt((x_grid - right_eye_pos[0])**2 + (y_grid - right_eye_pos[1])**2)
    mask_re = np.exp(- (d_re**2) / (2.0 * (24.0**2)))
    d_nose = np.sqrt((x_grid - nose_tip_pos[0])**2 + (y_grid - nose_tip_pos[1])**2)
    mask_nose = np.exp(- (d_nose**2) / (2.0 * (26.0**2)))
    d_mouth = np.sqrt((x_grid - mouth_center_pos[0])**2 + (y_grid - mouth_center_pos[1])**2)
    mask_mouth = np.exp(- (d_mouth**2) / (2.0 * (26.0**2)))
    d_chin = np.sqrt((x_grid - chin_pos[0])**2 + (y_grid - chin_pos[1])**2)
    mask_chin = np.exp(- (d_chin**2) / (2.0 * (30.0**2)))

    salience = (
        mask_le * 1.5 + mask_re * 1.5 +
        mask_nose * 1.3 + mask_mouth * 1.4 + mask_chin * 1.0 +
        (canny_strong > 0) * 1.2 + (canny_fine > 0) * 0.8 +
        hair_zone * laplace_norm * 1.2
    )

    # 4. Multi-tier Point Sampling (Crisp Contours + Breathable Surface)
    print("4. Sampling sculptural point clouds with airy negative space...")
    pts_x = []
    pts_y = []
    pts_feat = []
    pts_hair = []
    pts_edge = []

    # A. Crisp Anatomical Contours (~12,000 points)
    edge_y_all, edge_x_all = np.where((canny_fine > 0) & (mask > 0))
    edge_salience = salience[edge_y_all, edge_x_all]
    edge_prob = edge_salience / (np.sum(edge_salience) + 1e-6)
    num_contour = min(12000, len(edge_x_all))
    chosen_c = np.random.choice(len(edge_x_all), size=num_contour, replace=False, p=edge_prob)

    ex = edge_x_all[chosen_c].astype(np.float32) + np.random.uniform(-0.35, 0.35, size=num_contour)
    ey = edge_y_all[chosen_c].astype(np.float32) + np.random.uniform(-0.35, 0.35, size=num_contour)
    for px, py in zip(ex, ey):
        pts_x.append(px)
        pts_y.append(py)
        pts_feat.append(1.0)
        pts_hair.append(1 if (py <= 440) else 0)
        pts_edge.append(0)

    # B. Breathable Surface Mesh (Stratified grid step ~3.5px for negative space) (~16,000 points)
    step = 3.5
    ys = np.arange(260, 812, step)
    xs = np.arange(0, 486, step)
    gy, gx = np.meshgrid(ys, xs, indexing='ij')
    jx = gx + np.random.uniform(-0.45 * step, 0.45 * step, size=gx.shape)
    jy = gy + np.random.uniform(-0.45 * step, 0.45 * step, size=gy.shape)
    iy = np.clip(np.round(jy).astype(int), 0, h - 1)
    ix = np.clip(np.round(jx).astype(int), 0, w - 1)
    in_m = mask[iy, ix] > 0
    for px, py in zip(jx[in_m], jy[in_m]):
        pts_x.append(px)
        pts_y.append(py)
        pts_feat.append(0.35)
        pts_hair.append(1 if (py <= 440) else 0)
        pts_edge.append(0)

    # C. Hair curls extra curls (~5,000 points)
    hair_y, hair_x = np.where((hair_zone > 0) & (laplace_norm > 0.14))
    if len(hair_x) > 5000:
        sel_h = np.random.choice(len(hair_x), size=5000, replace=False)
        for px, py in zip(hair_x[sel_h].astype(np.float32), hair_y[sel_h].astype(np.float32)):
            pts_x.append(px + np.random.uniform(-0.4, 0.4))
            pts_y.append(py + np.random.uniform(-0.4, 0.4))
            pts_feat.append(0.7)
            pts_hair.append(1)
            pts_edge.append(0)

    # D. Dissolving stardust perimeter (~3,000 points)
    kernel_dil = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (16, 16))
    mask_dil = cv2.dilate(mask, kernel_dil)
    ez_y, ez_x = np.where((mask_dil > 0) & (mask == 0))
    if len(ez_x) > 3000:
        sel_ez = np.random.choice(len(ez_x), size=3000, replace=False)
        for px, py in zip(ez_x[sel_ez].astype(np.float32), ez_y[sel_ez].astype(np.float32)):
            pts_x.append(px + np.random.uniform(-1.0, 1.0))
            pts_y.append(py + np.random.uniform(-1.0, 1.0))
            pts_feat.append(0.1)
            pts_hair.append(1 if (py <= 440) else 0)
            pts_edge.append(1)

    pts_x = np.array(pts_x, dtype=np.float32)
    pts_y = np.array(pts_y, dtype=np.float32)
    pts_feat = np.array(pts_feat, dtype=np.float32)
    pts_hair = np.array(pts_hair, dtype=bool)
    pts_edge = np.array(pts_edge, dtype=bool)

    if len(pts_x) > target_count:
        sel = np.random.choice(len(pts_x), size=target_count, replace=False)
        pts_x = pts_x[sel]
        pts_y = pts_y[sel]
        pts_feat = pts_feat[sel]
        pts_hair = pts_hair[sel]
        pts_edge = pts_edge[sel]

    total_pts = len(pts_x)
    print(f"Total points assembled: {total_pts}")

    # 5. Assign Exact 3D Depth Z and True Surface Normals
    print("5. Assigning true 3D surface depth and normals...")
    iy_pts = np.clip(np.round(pts_y).astype(int), 0, h - 1)
    ix_pts = np.clip(np.round(pts_x).astype(int), 0, w - 1)

    # Query 3D depth from scanned field
    # Scanned Z is in range [-2.5, 2.5], scale down to [-0.35, 0.35]
    z_scanned = depth_infilled[iy_pts, ix_pts] * 0.14
    # Hair relief: curls project outward (+0.04 to +0.09)
    hair_relief = np.where(pts_hair, np.random.uniform(0.04, 0.09, size=total_pts), 0.0)
    norm_z = z_scanned + hair_relief

    # Stardust dispersion at edges
    scatter_z = np.random.uniform(-0.25, 0.25, size=total_pts)
    norm_z = np.where(pts_edge, norm_z + scatter_z * 0.5, norm_z)

    # Query 3D normals from scanned field
    nx = norm_x_infilled[iy_pts, ix_pts]
    ny = norm_y_infilled[iy_pts, ix_pts]
    nz = norm_z_infilled[iy_pts, ix_pts]
    nlen = np.sqrt(nx**2 + ny**2 + nz**2) + 1e-6
    nx, ny, nz = nx / nlen, ny / nlen, nz / nlen

    # Normalized World Coordinates (Center at 0, 0)
    norm_x = (pts_x - face_cx) / (head_rx * 1.55)
    norm_y = -(pts_y - face_cy) / (head_ry * 1.35)

    # 6. Directional Studio Key Lighting
    light_dir = np.array([0.35, 0.65, 0.70])
    light_dir /= np.linalg.norm(light_dir)
    dot_light = np.clip(nx * light_dir[0] + ny * light_dir[1] + nz * light_dir[2], 0.0, 1.0)
    illumination = 0.42 + 0.58 * dot_light

    # 7. Editorial Palette (NO PHOTOGRAPHIC SKIN COLORS)
    # 88% warm-white / soft off-white, 12% champagne/gold accents
    col_roll = np.random.uniform(0.0, 1.0, size=total_pts)
    accent_prob = np.where(pts_hair | pts_edge, 0.30, 0.06)
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
    sizes = 1.8 + pts_feat * 0.9
    sizes = np.where(pts_edge, 1.5 + np.random.uniform(0.0, 0.8, size=total_pts), sizes)

    alphas = 0.65 + pts_feat * 0.30
    alphas = np.where(pts_edge, 0.35 + np.random.uniform(0.0, 0.35, size=total_pts), alphas)

    phase = np.random.uniform(0.0, 1.0, size=total_pts).astype(np.float32)

    # 9. Assembly Dispersal Cloud
    disp_r = np.random.uniform(1.8, 3.8, size=total_pts)
    disp_th = np.random.uniform(0, 2 * math.pi, size=total_pts)
    disp_phi = np.random.uniform(-math.pi * 0.4, math.pi * 0.4, size=total_pts)

    disp_x = disp_r * np.cos(disp_phi) * np.cos(disp_th)
    disp_y = disp_r * np.sin(disp_phi)
    disp_z = disp_r * np.cos(disp_phi) * np.sin(disp_th)

    # 10. Write Binary Dataset (13 floats = 52 bytes)
    particles_arr = np.zeros((total_pts, 13), dtype=np.float32)
    particles_arr[:, 0] = norm_x
    particles_arr[:, 1] = norm_y
    particles_arr[:, 2] = norm_z
    particles_arr[:, 3] = col_r
    particles_arr[:, 4] = col_g
    particles_arr[:, 5] = col_b
    particles_arr[:, 6] = sizes
    particles_arr[:, 7] = alphas
    particles_arr[:, 8] = pts_feat
    particles_arr[:, 9] = phase
    particles_arr[:, 10] = disp_x
    particles_arr[:, 11] = disp_y
    particles_arr[:, 12] = disp_z

    os.makedirs(os.path.dirname(output_bin), exist_ok=True)
    with open(output_bin, 'wb') as f:
        f.write(particles_arr.tobytes())

    meta = {
        "particleCount": int(total_pts),
        "strideFloats": 13,
        "strideBytes": 52,
        "bounds": {
            "minX": float(np.min(norm_x)), "maxX": float(np.max(norm_x)),
            "minY": float(np.min(norm_y)), "maxY": float(np.max(norm_y)),
            "minZ": float(np.min(norm_z)), "maxZ": float(np.max(norm_z))
        },
        "version": "7.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Generated {total_pts} particles! File: {output_bin} ({os.path.getsize(output_bin)/(1024*1024):.2f} MB)")

    # 11. High-Res 2D Verification Render
    cw, ch = 900, 1100
    canvas = np.zeros((ch, cw, 3), dtype=np.float32)
    canvas[:, :] = [0.035, 0.040, 0.045] # obsidian background

    scale = 380.0
    px = (norm_x * scale + cw * 0.50).astype(int)
    py = (-norm_y * scale + ch * 0.46).astype(int)

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
    build_projected_sculpture()
