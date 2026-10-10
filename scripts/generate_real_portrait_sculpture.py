import cv2
import numpy as np
import json
import math
import os

def generate_real_portrait_sculpture(
    target_count=38000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json',
    preview_img='scripts/preview_sculpture.png'
):
    print("Loading front.jpg and creating anatomical mask...")
    img = cv2.imread('assets/portraits/private/front.jpg')
    h, w, c = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 1. Clean Segmentation of Subject
    is_wall_top = (gray > 150) & (hsv[:, :, 1] < 40) & (np.arange(h)[:, None] < 410)
    is_wall_left = (gray > 135) & (hsv[:, :, 1] < 38) & (np.arange(w) < 220) & (np.arange(h)[:, None] < 680)
    is_wall_right = (gray > 135) & (hsv[:, :, 1] < 38) & (np.arange(w) > 450) & (np.arange(h)[:, None] < 680)
    is_far_left = (np.arange(w) < 185) & (np.arange(h)[:, None] < 680)
    is_far_right = (np.arange(w) > 470) & (np.arange(h)[:, None] < 640)

    is_bg = is_wall_top | is_wall_left | is_wall_right | is_far_left | is_far_right
    subject = (~is_bg).astype(np.uint8)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    subject = cv2.morphologyEx(subject, cv2.MORPH_CLOSE, kernel)

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(subject)
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    subject = (labels == largest_label).astype(np.uint8)

    contours, _ = cv2.findContours(subject, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(subject)
    cv2.drawContours(mask, contours, -1, 1, thickness=-1)

    # Classical rounded bust taper for shoulders
    y_grid, x_grid = np.ogrid[:h, :w]
    bust_taper = ((x_grid - 340.0) / 235.0)**2 + np.maximum(0.0, (y_grid - 690.0) / 140.0)**2
    mask = np.where(bust_taper > 1.35, 0, mask).astype(np.uint8)

    # 2. Extract Feature Landmarks and Contours from front.jpg
    # Landmark coordinates in front.jpg:
    face_cx, face_cy = 340.0, 560.0
    head_rx, head_ry = 125.0, 195.0

    left_eye_pos = (295.0, 495.0)
    right_eye_pos = (390.0, 525.0)
    nose_bridge_top = (342.0, 485.0)
    nose_tip_pos = (345.0, 565.0)
    mouth_center_pos = (345.0, 630.0)
    chin_pos = (340.0, 730.0)

    # Edges inside subject
    gray_masked = cv2.bitwise_and(gray, gray, mask=mask)
    canny_fine = cv2.Canny(gray_masked, 25, 70)
    canny_strong = cv2.Canny(gray_masked, 60, 140)

    # Feature maps
    d_le = np.sqrt((x_grid - left_eye_pos[0])**2 + (y_grid - left_eye_pos[1])**2)
    mask_le = np.exp(- (d_le**2) / (2.0 * (24.0**2)))

    d_re = np.sqrt((x_grid - right_eye_pos[0])**2 + (y_grid - right_eye_pos[1])**2)
    mask_re = np.exp(- (d_re**2) / (2.0 * (24.0**2)))

    d_nose = np.sqrt((x_grid - nose_tip_pos[0])**2 + (y_grid - nose_tip_pos[1])**2)
    mask_nose = np.exp(- (d_nose**2) / (2.0 * (28.0**2)))

    d_mouth = np.sqrt((x_grid - mouth_center_pos[0])**2 + (y_grid - mouth_center_pos[1])**2)
    mask_mouth = np.exp(- (d_mouth**2) / (2.0 * (28.0**2)))

    d_leb = np.sqrt((x_grid - 295.0)**2 + (y_grid - 465.0)**2)
    mask_leb = np.exp(- (d_leb**2) / (2.0 * (26.0**2)))

    d_reb = np.sqrt((x_grid - 395.0)**2 + (y_grid - 490.0)**2)
    mask_reb = np.exp(- (d_reb**2) / (2.0 * (26.0**2)))

    hair_zone = ((y_grid >= 260) & (y_grid <= 450) & (mask > 0)).astype(np.float32)

    # 3. UNIFORM STRATIFIED GRID SAMPLING (No clumping, no random gaps!)
    # Step size across 486 x 812 image: step ~ 2.6 px gives ~40k points
    print("Generating stratified blue-noise surface points...")
    step_y = 2.8
    step_x = 2.8

    ys = np.arange(260, 812, step_y)
    xs = np.arange(0, 486, step_x)
    grid_y, grid_x = np.meshgrid(ys, xs, indexing='ij')

    # Sub-pixel stratified jitter (+/- 0.45 of step)
    np.random.seed(42)
    jitter_x = np.random.uniform(-0.42 * step_x, 0.42 * step_x, size=grid_x.shape)
    jitter_y = np.random.uniform(-0.42 * step_y, 0.42 * step_y, size=grid_y.shape)
    sampled_x_raw = grid_x + jitter_x
    sampled_y_raw = grid_y + jitter_y

    # Filter to mask
    idx_y = np.clip(np.round(sampled_y_raw).astype(int), 0, h - 1)
    idx_x = np.clip(np.round(sampled_x_raw).astype(int), 0, w - 1)
    inside_mask = mask[idx_y, idx_x] > 0

    base_pts_x = sampled_x_raw[inside_mask]
    base_pts_y = sampled_y_raw[inside_mask]

    # Add high-density contour points for eyes, nose, lips
    edge_y, edge_x = np.where((canny_strong > 0) & (mask > 0))
    # Subsample edges to ~6000 points
    if len(edge_x) > 6500:
        edge_sub = np.random.choice(len(edge_x), size=6500, replace=False)
        edge_x = edge_x[edge_sub].astype(np.float32) + np.random.uniform(-0.3, 0.3, size=6500)
        edge_y = edge_y[edge_sub].astype(np.float32) + np.random.uniform(-0.3, 0.3, size=6500)

    all_x = np.concatenate([base_pts_x, edge_x])
    all_y = np.concatenate([base_pts_y, edge_y])

    # Subsample or trim to exact target_count
    if len(all_x) > target_count:
        sel = np.random.choice(len(all_x), size=target_count, replace=False)
        sampled_x = all_x[sel]
        sampled_y = all_y[sel]
    else:
        sampled_x = all_x
        sampled_y = all_y

    num_pts = len(sampled_x)
    print(f"Total sampled points: {num_pts}")

    # 4. Coordinate Normalization
    # Center face at (0, 0), normalize to world units (~ [-1.0, 1.0])
    norm_x = (sampled_x - face_cx) / (head_rx * 1.55)
    norm_y = -(sampled_y - face_cy) / (head_ry * 1.35)

    # 5. True 2.5D Anatomical Depth Model (Z)
    print("Computing authentic 2.5D sculptural depth model...")
    dx_head = (sampled_x - face_cx) / head_rx
    dy_head = (sampled_y - face_cy) / head_ry
    head_rad_sq = dx_head**2 + dy_head**2

    # Cranium dome: rounded ellipsoid
    z_head = np.sqrt(np.maximum(0.0, 1.0 - np.clip(head_rad_sq, 0.0, 1.0))) * 0.36

    # Subtle natural 3/4 tilt (about 10 degrees in front.jpg)
    angle_rad = math.radians(10.0)
    z_turn = -dx_head * math.sin(angle_rad) * 0.16

    # Nose structure: prominent tip + dorsal bridge ridge
    d_nose_tip = np.sqrt((sampled_x - nose_tip_pos[0])**2 + (sampled_y - nose_tip_pos[1])**2)
    z_nose_tip = np.exp(- (d_nose_tip**2) / (2.0 * (24.0**2))) * 0.28

    t_bridge = np.clip((sampled_y - nose_bridge_top[1]) / (nose_tip_pos[1] - nose_bridge_top[1] + 1e-5), 0.0, 1.0)
    bridge_x = nose_bridge_top[0] + t_bridge * (nose_tip_pos[0] - nose_bridge_top[0])
    d_bridge = np.abs(sampled_x - bridge_x)
    z_bridge = np.exp(- (d_bridge**2) / (2.0 * (15.0**2))) * (sampled_y >= nose_bridge_top[1]) * (sampled_y <= nose_tip_pos[1]) * 0.20

    # Eye orbits: depression (-0.09) + eyeball (+0.06)
    d_le_dist = np.sqrt((sampled_x - left_eye_pos[0])**2 + (sampled_y - left_eye_pos[1])**2)
    z_socket_l = -np.exp(- (d_le_dist**2) / (2.0 * (24.0**2))) * 0.09 + np.exp(- (d_le_dist**2) / (2.0 * (9.0**2))) * 0.06

    d_re_dist = np.sqrt((sampled_x - right_eye_pos[0])**2 + (sampled_y - right_eye_pos[1])**2)
    z_socket_r = -np.exp(- (d_re_dist**2) / (2.0 * (24.0**2))) * 0.09 + np.exp(- (d_re_dist**2) / (2.0 * (9.0**2))) * 0.06

    # Cheekbones (zygoma)
    d_l_cheek = np.sqrt((sampled_x - 265.0)**2 + (sampled_y - 565.0)**2)
    z_l_cheek = np.exp(- (d_l_cheek**2) / (2.0 * (32.0**2))) * 0.12
    d_r_cheek = np.sqrt((sampled_x - 415.0)**2 + (sampled_y - 585.0)**2)
    z_r_cheek = np.exp(- (d_r_cheek**2) / (2.0 * (32.0**2))) * 0.12

    # Lips projection
    d_mouth_dist = np.sqrt((sampled_x - mouth_center_pos[0])**2 + (sampled_y - mouth_center_pos[1])**2)
    z_lips = np.exp(- (d_mouth_dist**2) / (2.0 * (28.0**2))) * 0.14

    # Chin projection
    d_chin_dist = np.sqrt((sampled_x - chin_pos[0])**2 + (sampled_y - chin_pos[1])**2)
    z_chin = np.exp(- (d_chin_dist**2) / (2.0 * (32.0**2))) * 0.17

    # Neck: recessed cylinder
    is_neck = (sampled_y > 675) & (sampled_y < 812) & (sampled_x > 230) & (sampled_x < 430)
    z_neck = np.where(is_neck, -0.16 - 0.12 * ((sampled_y - 675) / 137.0), 0.0)

    # Shoulders: slope down and back
    is_shoulders = (sampled_y >= 675) & ((sampled_x <= 230) | (sampled_x >= 430))
    z_shoulders = np.where(is_shoulders, -0.22 - 0.18 * ((sampled_y - 675) / 137.0), 0.0)

    # Hair curls relief (+0.03 to +0.08)
    is_hair = (sampled_y >= 260) & (sampled_y <= 440)
    hair_relief = np.where(is_hair, np.random.uniform(0.02, 0.07, size=num_pts), 0.0)

    norm_z = (z_head + z_turn + z_nose_tip + z_bridge + z_socket_l + z_socket_r
              + z_l_cheek + z_r_cheek + z_lips + z_chin + z_neck + z_shoulders + hair_relief)

    # Organic silhouette edge dissolving particles
    dist_from_center = np.sqrt(dx_head**2 + dy_head**2)
    is_edge = dist_from_center > 1.05
    scatter_z = np.random.uniform(-0.20, 0.20, size=num_pts)
    norm_z = np.where(is_edge, norm_z + scatter_z * 0.4, norm_z)

    # 6. Feature Weight & Shading
    samp_idx_y = np.clip(sampled_y.astype(int), 0, h - 1)
    samp_idx_x = np.clip(sampled_x.astype(int), 0, w - 1)

    f_weight = np.clip(
        mask_le[samp_idx_y, samp_idx_x] * 1.0 +
        mask_re[samp_idx_y, samp_idx_x] * 1.0 +
        mask_nose[samp_idx_y, samp_idx_x] * 1.0 +
        mask_mouth[samp_idx_y, samp_idx_x] * 1.0 +
        (canny_strong[samp_idx_y, samp_idx_x] > 0) * 0.8,
        0.0, 1.0
    )

    # Studio key lighting from upper left
    # Approximate normal:
    # dZ/dx ~ -dx_head * 0.35, dZ/dy ~ -dy_head * 0.35
    nx = -dx_head * 0.4 + np.where(sampled_x < nose_tip_pos[0], -z_nose_tip*2.0, z_nose_tip*2.0)
    ny = -dy_head * 0.4 + 0.15
    nz = np.maximum(0.3, norm_z + 0.5)
    n_len = np.sqrt(nx**2 + ny**2 + nz**2) + 1e-6
    nx, ny, nz = nx / n_len, ny / n_len, nz / n_len

    light_dir = np.array([0.35, 0.60, 0.70])
    light_dir /= np.linalg.norm(light_dir)
    dot_light = np.clip(nx * light_dir[0] + ny * light_dir[1] + nz * light_dir[2], 0.0, 1.0)
    illumination = 0.45 + 0.55 * dot_light

    # 7. Editorial Architectural Palette (NO PHOTOGRAPHIC SKIN COLORS)
    # 88% warm-white / off-white, 12% champagne/gold accents
    print("Assigning architectural warm-white and champagne palette...")
    col_roll = np.random.uniform(0.0, 1.0, size=num_pts)
    accent_prob = np.where(is_hair | is_edge, 0.28, 0.06)
    is_accent = col_roll < accent_prob

    # Base warm-white / off-white:
    # 65% warm-white (0.97, 0.96, 0.94), 35% neutral off-white (0.91, 0.89, 0.85)
    is_pure_white = col_roll > (accent_prob + 0.35)

    base_r = np.where(is_pure_white, 0.97, 0.91)
    base_g = np.where(is_pure_white, 0.96, 0.89)
    base_b = np.where(is_pure_white, 0.94, 0.85)

    # Champagne & Gold accents
    is_gold = is_accent & (col_roll < (accent_prob * 0.40))
    is_champagne = is_accent & ~is_gold

    base_r = np.where(is_champagne, 0.93, base_r)
    base_g = np.where(is_champagne, 0.85, base_g)
    base_b = np.where(is_champagne, 0.73, base_b)

    base_r = np.where(is_gold, 0.86, base_r)
    base_g = np.where(is_gold, 0.70, base_g)
    base_b = np.where(is_gold, 0.48, base_b)

    # Apply lighting
    col_r = base_r * illumination
    col_g = base_g * illumination
    col_b = base_b * illumination

    # 8. Sizes and Alphas
    # Discrete, crisp stippled points (1.8 to 2.8px)
    sizes = 1.8 + f_weight * 0.9
    sizes = np.where(is_edge, 1.6 + np.random.uniform(0.0, 0.8, size=num_pts), sizes)

    # Alpha: 0.65 to 0.95
    alphas = 0.65 + f_weight * 0.30
    alphas = np.where(is_edge, 0.40 + np.random.uniform(0.0, 0.35, size=num_pts), alphas)

    phase = np.random.uniform(0.0, 1.0, size=num_pts).astype(np.float32)

    # 9. Assembly Dispersal Cloud
    disp_r = np.random.uniform(1.8, 3.8, size=num_pts)
    disp_th = np.random.uniform(0, 2 * math.pi, size=num_pts)
    disp_phi = np.random.uniform(-math.pi * 0.4, math.pi * 0.4, size=num_pts)

    disp_x = disp_r * np.cos(disp_phi) * np.cos(disp_th)
    disp_y = disp_r * np.sin(disp_phi)
    disp_z = disp_r * np.cos(disp_phi) * np.sin(disp_th)

    # 10. Write Binary Dataset (13 floats = 52 bytes)
    particles_arr = np.zeros((num_pts, 13), dtype=np.float32)
    particles_arr[:, 0] = norm_x
    particles_arr[:, 1] = norm_y
    particles_arr[:, 2] = norm_z
    particles_arr[:, 3] = col_r
    particles_arr[:, 4] = col_g
    particles_arr[:, 5] = col_b
    particles_arr[:, 6] = sizes
    particles_arr[:, 7] = alphas
    particles_arr[:, 8] = f_weight
    particles_arr[:, 9] = phase
    particles_arr[:, 10] = disp_x
    particles_arr[:, 11] = disp_y
    particles_arr[:, 12] = disp_z

    os.makedirs(os.path.dirname(output_bin), exist_ok=True)
    with open(output_bin, 'wb') as f:
        f.write(particles_arr.tobytes())

    meta = {
        "particleCount": int(num_pts),
        "strideFloats": 13,
        "strideBytes": 52,
        "bounds": {
            "minX": float(np.min(norm_x)), "maxX": float(np.max(norm_x)),
            "minY": float(np.min(norm_y)), "maxY": float(np.max(norm_y)),
            "minZ": float(np.min(norm_z)), "maxZ": float(np.max(norm_z))
        },
        "version": "4.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)

    print(f"Dataset generated! Count: {num_pts}, Size: {os.path.getsize(output_bin)/(1024*1024):.2f} MB")

    # 11. 2D Verification Render
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
    print(f"Saved verification preview to {preview_img}")

if __name__ == '__main__':
    generate_real_portrait_sculpture()
