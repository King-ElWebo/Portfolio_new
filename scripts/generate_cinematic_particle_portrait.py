import cv2
import numpy as np
import json
import math
import os

def generate_cinematic_particle_portrait(
    target_count=36000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json',
    preview_img='scripts/preview_sculpture.png'
):
    print("Generating cinematic particle portrait from front.jpg...")
    img = cv2.imread('assets/portraits/private/front.jpg')
    h, w, c = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 1. Clean Subject Mask (No wall, no ceiling, no arm sticking out)
    # Background detection
    is_wall_top = (gray > 150) & (hsv[:, :, 1] < 40) & (np.arange(h)[:, None] < 410)
    is_wall_left = (gray > 135) & (hsv[:, :, 1] < 38) & (np.arange(w) < 220) & (np.arange(h)[:, None] < 680)
    is_wall_right = (gray > 135) & (hsv[:, :, 1] < 38) & (np.arange(w) > 450) & (np.arange(h)[:, None] < 680)
    is_far_left = (np.arange(w) < 185) & (np.arange(h)[:, None] < 650)
    is_far_right = (np.arange(w) > 470) & (np.arange(h)[:, None] < 640)

    # Exclude arm holding phone at bottom left (x < 175)
    is_arm_left = (np.arange(w) < 175) & (np.arange(h)[:, None] >= 650)

    is_bg = is_wall_top | is_wall_left | is_wall_right | is_far_left | is_far_right | is_arm_left
    subject = (~is_bg).astype(np.uint8)

    # Morphology to smooth and connect
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    subject = cv2.morphologyEx(subject, cv2.MORPH_CLOSE, kernel)

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(subject)
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    subject = (labels == largest_label).astype(np.uint8)

    contours, _ = cv2.findContours(subject, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(subject)
    cv2.drawContours(mask, contours, -1, 1, thickness=-1)

    # Graceful classical bust curve for shoulders
    y_grid, x_grid = np.ogrid[:h, :w]
    bust_curve = ((x_grid - 340.0) / 215.0)**2 + np.maximum(0.0, (y_grid - 680.0) / 140.0)**2
    mask = np.where(bust_curve > 1.25, 0, mask).astype(np.uint8)

    # 2. Enhanced Feature Extraction
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced_gray = clahe.apply(gray)

    # Canny on subject
    gray_masked = cv2.bitwise_and(enhanced_gray, enhanced_gray, mask=mask)
    canny_fine = cv2.Canny(gray_masked, 30, 85)
    canny_strong = cv2.Canny(gray_masked, 55, 130)

    # Laplacian for hair curls texture
    laplace = np.abs(cv2.Laplacian(gray_masked, cv2.CV_32F, ksize=3))
    laplace_norm = laplace / (np.max(laplace) + 1e-6)
    hair_zone = ((y_grid >= 260) & (y_grid <= 440) & (mask > 0)).astype(np.float32)

    # Anatomical landmark anchors
    face_cx, face_cy = 340.0, 560.0
    head_rx, head_ry = 125.0, 195.0

    left_eye_pos = (295.0, 495.0)
    right_eye_pos = (390.0, 525.0)
    nose_bridge_top = (342.0, 485.0)
    nose_tip_pos = (345.0, 565.0)
    mouth_center_pos = (345.0, 630.0)
    chin_pos = (340.0, 730.0)

    # Feature weight map
    d_le = np.sqrt((x_grid - left_eye_pos[0])**2 + (y_grid - left_eye_pos[1])**2)
    mask_le = np.exp(- (d_le**2) / (2.0 * (24.0**2)))

    d_re = np.sqrt((x_grid - right_eye_pos[0])**2 + (y_grid - right_eye_pos[1])**2)
    mask_re = np.exp(- (d_re**2) / (2.0 * (24.0**2)))

    d_nose = np.sqrt((x_grid - nose_tip_pos[0])**2 + (y_grid - nose_tip_pos[1])**2)
    mask_nose = np.exp(- (d_nose**2) / (2.0 * (26.0**2)))

    d_mouth = np.sqrt((x_grid - mouth_center_pos[0])**2 + (y_grid - mouth_center_pos[1])**2)
    mask_mouth = np.exp(- (d_mouth**2) / (2.0 * (26.0**2)))

    d_leb = np.sqrt((x_grid - 295.0)**2 + (y_grid - 465.0)**2)
    mask_leb = np.exp(- (d_leb**2) / (2.0 * (24.0**2)))

    d_reb = np.sqrt((x_grid - 395.0)**2 + (y_grid - 490.0)**2)
    mask_reb = np.exp(- (d_reb**2) / (2.0 * (24.0**2)))

    d_chin = np.sqrt((x_grid - chin_pos[0])**2 + (y_grid - chin_pos[1])**2)
    mask_chin = np.exp(- (d_chin**2) / (2.0 * (30.0**2)))

    # Combined feature salience
    salience = (
        mask_le * 1.5 + mask_re * 1.5 +
        mask_nose * 1.3 + mask_mouth * 1.4 +
        mask_leb * 1.0 + mask_reb * 1.0 + mask_chin * 1.0 +
        (canny_strong > 0) * 1.2 + (canny_fine > 0) * 0.8 +
        hair_zone * laplace_norm * 1.2
    )

    # 3. Particle Distribution Strategy:
    # A. Contour Particles (High-density exact anatomical lines) ~10,000 points
    # B. Surface Particles (Even, airy stratified grid with negative space) ~18,000 points
    # C. Volumetric Hair Strands ~6,000 points
    # D. Dissolving Perimeter Stardust ~4,000 points
    print("Sampling multi-tier sculptural particle points...")
    pts_x = []
    pts_y = []
    pts_feat = []
    pts_hair = []
    pts_edge = []

    np.random.seed(42)

    # A. Feature contour points
    edge_y_all, edge_x_all = np.where((canny_fine > 0) & (mask > 0))
    # Filter edge points so they concentrate on face and hair
    edge_salience = salience[edge_y_all, edge_x_all]
    edge_prob = edge_salience / (np.sum(edge_salience) + 1e-6)
    num_contour_pts = min(11000, len(edge_x_all))
    chosen_edges = np.random.choice(len(edge_x_all), size=num_contour_pts, replace=False, p=edge_prob)

    ex = edge_x_all[chosen_edges].astype(np.float32) + np.random.uniform(-0.35, 0.35, size=num_contour_pts)
    ey = edge_y_all[chosen_edges].astype(np.float32) + np.random.uniform(-0.35, 0.35, size=num_contour_pts)
    for px, py in zip(ex, ey):
        pts_x.append(px)
        pts_y.append(py)
        pts_feat.append(1.0)
        pts_hair.append(1 if (py <= 440) else 0)
        pts_edge.append(0)

    # B. Surface points (Stratified grid with step ~3.6px for negative space)
    step = 3.4
    ys = np.arange(260, 812, step)
    xs = np.arange(0, 486, step)
    gy, gx = np.meshgrid(ys, xs, indexing='ij')
    jx = gx + np.random.uniform(-0.45 * step, 0.45 * step, size=gx.shape)
    jy = gy + np.random.uniform(-0.45 * step, 0.45 * step, size=gy.shape)

    iy = np.clip(np.round(jy).astype(int), 0, h - 1)
    ix = np.clip(np.round(jx).astype(int), 0, w - 1)
    in_mask = mask[iy, ix] > 0

    surf_x = jx[in_mask]
    surf_y = jy[in_mask]

    for px, py in zip(surf_x, surf_y):
        pts_x.append(px)
        pts_y.append(py)
        pts_feat.append(0.35)
        pts_hair.append(1 if (py <= 440) else 0)
        pts_edge.append(0)

    # C. Hair curls extra density
    hair_y, hair_x = np.where((hair_zone > 0) & (laplace_norm > 0.15))
    if len(hair_x) > 5500:
        sel_hair = np.random.choice(len(hair_x), size=5500, replace=False)
        hx = hair_x[sel_hair].astype(np.float32) + np.random.uniform(-0.4, 0.4, size=5500)
        hy = hair_y[sel_hair].astype(np.float32) + np.random.uniform(-0.4, 0.4, size=5500)
        for px, py in zip(hx, hy):
            pts_x.append(px)
            pts_y.append(py)
            pts_feat.append(0.7)
            pts_hair.append(1)
            pts_edge.append(0)

    # D. Perimeter dissolving stardust particles
    # Disperse outside the mask boundary
    kernel_dil = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    mask_dil = cv2.dilate(mask, kernel_dil)
    edge_zone = (mask_dil > 0) & (mask == 0)
    ez_y, ez_x = np.where(edge_zone)
    if len(ez_x) > 3500:
        sel_ez = np.random.choice(len(ez_x), size=3500, replace=False)
        sx = ez_x[sel_ez].astype(np.float32) + np.random.uniform(-1.0, 1.0, size=3500)
        sy = ez_y[sel_ez].astype(np.float32) + np.random.uniform(-1.0, 1.0, size=3500)
        for px, py in zip(sx, sy):
            pts_x.append(px)
            pts_y.append(py)
            pts_feat.append(0.1)
            pts_hair.append(1 if (py <= 440) else 0)
            pts_edge.append(1)

    pts_x = np.array(pts_x, dtype=np.float32)
    pts_y = np.array(pts_y, dtype=np.float32)
    pts_feat = np.array(pts_feat, dtype=np.float32)
    pts_hair = np.array(pts_hair, dtype=bool)
    pts_edge = np.array(pts_edge, dtype=bool)

    total_pts = len(pts_x)
    print(f"Total points generated: {total_pts}")

    # Subsample or pad to exact target_count
    if total_pts > target_count:
        sel = np.random.choice(total_pts, size=target_count, replace=False)
        pts_x = pts_x[sel]
        pts_y = pts_y[sel]
        pts_feat = pts_feat[sel]
        pts_hair = pts_hair[sel]
        pts_edge = pts_edge[sel]
        total_pts = target_count

    # 4. Normalized World Coordinates
    # Center face at (0, 0), normalize to world units
    norm_x = (pts_x - face_cx) / (head_rx * 1.55)
    norm_y = -(pts_y - face_cy) / (head_ry * 1.35)

    # 5. True 2.5D Anatomical Depth Model (Z)
    dx_head = (pts_x - face_cx) / head_rx
    dy_head = (pts_y - face_cy) / head_ry
    head_rad_sq = dx_head**2 + dy_head**2

    # Cranium dome: ellipsoid
    z_head = np.sqrt(np.maximum(0.0, 1.0 - np.clip(head_rad_sq, 0.0, 1.0))) * 0.36

    # Subtle natural 3/4 tilt (about 10 degrees)
    angle_rad = math.radians(10.0)
    z_turn = -dx_head * math.sin(angle_rad) * 0.16

    # Nose structure: bridge + pronasale tip
    d_nose_tip = np.sqrt((pts_x - nose_tip_pos[0])**2 + (pts_y - nose_tip_pos[1])**2)
    z_nose_tip = np.exp(- (d_nose_tip**2) / (2.0 * (24.0**2))) * 0.28

    t_bridge = np.clip((pts_y - nose_bridge_top[1]) / (nose_tip_pos[1] - nose_bridge_top[1] + 1e-5), 0.0, 1.0)
    bridge_x = nose_bridge_top[0] + t_bridge * (nose_tip_pos[0] - nose_bridge_top[0])
    d_bridge = np.abs(pts_x - bridge_x)
    z_bridge = np.exp(- (d_bridge**2) / (2.0 * (15.0**2))) * (pts_y >= nose_bridge_top[1]) * (pts_y <= nose_tip_pos[1]) * 0.20

    # Eye orbits: depression + eyeball
    d_le_dist = np.sqrt((pts_x - left_eye_pos[0])**2 + (pts_y - left_eye_pos[1])**2)
    z_socket_l = -np.exp(- (d_le_dist**2) / (2.0 * (24.0**2))) * 0.09 + np.exp(- (d_le_dist**2) / (2.0 * (9.0**2))) * 0.06

    d_re_dist = np.sqrt((pts_x - right_eye_pos[0])**2 + (pts_y - right_eye_pos[1])**2)
    z_socket_r = -np.exp(- (d_re_dist**2) / (2.0 * (24.0**2))) * 0.09 + np.exp(- (d_re_dist**2) / (2.0 * (9.0**2))) * 0.06

    # Cheekbones (zygoma)
    d_l_cheek = np.sqrt((pts_x - 265.0)**2 + (pts_y - 565.0)**2)
    z_l_cheek = np.exp(- (d_l_cheek**2) / (2.0 * (32.0**2))) * 0.12
    d_r_cheek = np.sqrt((pts_x - 415.0)**2 + (pts_y - 585.0)**2)
    z_r_cheek = np.exp(- (d_r_cheek**2) / (2.0 * (32.0**2))) * 0.12

    # Lips
    d_mouth_dist = np.sqrt((pts_x - mouth_center_pos[0])**2 + (pts_y - mouth_center_pos[1])**2)
    z_lips = np.exp(- (d_mouth_dist**2) / (2.0 * (28.0**2))) * 0.14

    # Chin
    d_chin_dist = np.sqrt((pts_x - chin_pos[0])**2 + (pts_y - chin_pos[1])**2)
    z_chin = np.exp(- (d_chin_dist**2) / (2.0 * (32.0**2))) * 0.17

    # Neck
    is_neck = (pts_y > 675) & (pts_y < 812) & (pts_x > 230) & (pts_x < 430)
    z_neck = np.where(is_neck, -0.16 - 0.12 * ((pts_y - 675) / 137.0), 0.0)

    # Shoulders
    is_shoulders = (pts_y >= 675) & ((pts_x <= 230) | (pts_x >= 430))
    z_shoulders = np.where(is_shoulders, -0.22 - 0.18 * ((pts_y - 675) / 137.0), 0.0)

    # Hair curls relief (+0.03 to +0.08)
    hair_relief = np.where(pts_hair, np.random.uniform(0.02, 0.07, size=total_pts), 0.0)

    norm_z = (z_head + z_turn + z_nose_tip + z_bridge + z_socket_l + z_socket_r
              + z_l_cheek + z_r_cheek + z_lips + z_chin + z_neck + z_shoulders + hair_relief)

    # Stardust dispersion at edges
    scatter_z = np.random.uniform(-0.25, 0.25, size=total_pts)
    norm_z = np.where(pts_edge, norm_z + scatter_z * 0.5, norm_z)

    # 6. Directional Studio Key Lighting
    nx = -dx_head * 0.4 + np.where(pts_x < nose_tip_pos[0], -z_nose_tip * 2.0, z_nose_tip * 2.0)
    ny = -dy_head * 0.4 + 0.15
    nz = np.maximum(0.3, norm_z + 0.5)
    n_len = np.sqrt(nx**2 + ny**2 + nz**2) + 1e-6
    nx, ny, nz = nx / n_len, ny / n_len, nz / n_len

    light_dir = np.array([0.35, 0.60, 0.70])
    light_dir /= np.linalg.norm(light_dir)
    dot_light = np.clip(nx * light_dir[0] + ny * light_dir[1] + nz * light_dir[2], 0.0, 1.0)
    illumination = 0.45 + 0.55 * dot_light

    # 7. Architectural Sculpture Palette (NO PHOTOGRAPHIC SKIN COLORS)
    # 88% warm-white / off-white, 12% champagne/gold accents
    col_roll = np.random.uniform(0.0, 1.0, size=total_pts)
    accent_prob = np.where(pts_hair | pts_edge, 0.28, 0.06)
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

    # 10. Write Binary Dataset (13 floats = 52 bytes per particle)
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
        "version": "5.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Generated {total_pts} particles! File: {output_bin} ({os.path.getsize(output_bin)/(1024*1024):.2f} MB)")

    # 11. High-Res 2D Verification Render
    cw, ch = 900, 1100
    canvas = np.zeros((ch, cw, 3), dtype=np.float32)
    canvas[:, :] = [0.035, 0.040, 0.045] # obsidian background

    scale = 390.0
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
    generate_cinematic_particle_portrait()
