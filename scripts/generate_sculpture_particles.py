import cv2
import numpy as np
import json
import math
import os

def generate_sculpture_dataset(
    target_count=36000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json'
):
    print("Loading front.jpg and mask...")
    img = cv2.imread('assets/portraits/private/front.jpg')
    mask = cv2.imread('scripts/mask_front.png', cv2.IMREAD_GRAYSCALE)
    h, w, _ = img.shape
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 1. Exact Facial Anatomical Landmark Coordinates in front.jpg
    # Derived from measurements:
    face_cx, face_cy = 338.0, 560.0
    head_rx, head_ry = 120.0, 180.0
    
    # Eye centers
    left_eye_pos = (292.0, 508.0)
    right_eye_pos = (382.0, 528.0)
    
    # Nose
    nose_bridge_top = (335.0, 485.0)
    nose_tip_pos = (345.0, 575.0)
    left_nostril = (316.0, 580.0)
    right_nostril = (368.0, 584.0)
    
    # Lips
    mouth_center_pos = (342.0, 642.0)
    cupid_bow = (342.0, 628.0)
    lower_lip = (342.0, 660.0)
    
    # Chin
    chin_pos = (340.0, 725.0)
    
    # Ears
    left_ear_pos = (222.0, 545.0)
    right_ear_pos = (448.0, 595.0)
    
    # 2. Extract Structural Contour Curves
    # Multi-threshold Canny on person only
    gray_person = (gray * (mask > 128)).astype(np.uint8)
    canny_fine = cv2.Canny(gray_person, 20, 60)
    canny_strong = cv2.Canny(gray_person, 50, 120)
    
    # Laplacian for hair strand curl textures
    laplace = np.abs(cv2.Laplacian(gray_person, cv2.CV_32F, ksize=3))
    laplace_norm = laplace / (np.max(laplace) + 1e-6)
    
    # Feature zone masks (Gaussian weightings for high-density anatomical definition)
    y_grid, x_grid = np.ogrid[:h, :w]
    
    # Eyes
    d_le = np.sqrt((x_grid - left_eye_pos[0])**2 + (y_grid - left_eye_pos[1])**2)
    mask_le = np.exp(- (d_le**2) / (2.0 * (28.0**2)))
    
    d_re = np.sqrt((x_grid - right_eye_pos[0])**2 + (y_grid - right_eye_pos[1])**2)
    mask_re = np.exp(- (d_re**2) / (2.0 * (28.0**2)))
    
    # Nose
    d_nose = np.sqrt((x_grid - nose_tip_pos[0])**2 + (y_grid - nose_tip_pos[1])**2)
    mask_nose = np.exp(- (d_nose**2) / (2.0 * (32.0**2)))
    
    # Mouth
    d_mouth = np.sqrt((x_grid - mouth_center_pos[0])**2 + (y_grid - mouth_center_pos[1])**2)
    mask_mouth = np.exp(- (d_mouth**2) / (2.0 * (32.0**2)))
    
    # Eyebrows (arching above eyes)
    d_leb = np.sqrt((x_grid - 290.0)**2 + (y_grid - 480.0)**2)
    mask_leb = np.exp(- (d_leb**2) / (2.0 * (30.0**2)))
    d_reb = np.sqrt((x_grid - 385.0)**2 + (y_grid - 500.0)**2)
    mask_reb = np.exp(- (d_reb**2) / (2.0 * (30.0**2)))
    
    # Hair volume (top of skull down to fringe)
    hair_zone = ((y_grid >= 250) & (y_grid <= 430) & (x_grid >= 220) & (x_grid <= 460) & (mask > 128)).astype(np.float32)
    
    # 3. Surface-Based Density Map (Zero Photo Skin Clumping)
    # The surface density is UNIFORM across the subject body, with added definition on contours
    base_surface = (mask > 128).astype(np.float32)
    
    # Erode boundary slightly for clean inner volume
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    inner_surface = cv2.erode(base_surface, kernel)
    
    # Density map:
    # 1.0 base everywhere on body (guarantees even distribution, no patchy holes!)
    # + 1.2 on feature contours (eyes, nose, mouth, jawline)
    # + 0.8 on hair curl strands
    density = (
        inner_surface * 0.9 +
        (mask_le + mask_re) * 1.5 +
        mask_nose * 1.2 +
        mask_mouth * 1.3 +
        (mask_leb + mask_reb) * 0.8 +
        (canny_fine > 0) * 1.0 +
        (canny_strong > 0) * 1.5 +
        hair_zone * laplace_norm * 1.2
    ) * base_surface
    
    # Normalize density into probability
    prob = density.ravel()
    prob_sum = np.sum(prob)
    prob /= prob_sum
    
    # Deterministic sampling
    np.random.seed(42)
    chosen_indices = np.random.choice(h * w, size=target_count, replace=False, p=prob)
    
    sampled_y = (chosen_indices // w).astype(np.float32)
    sampled_x = (chosen_indices % w).astype(np.float32)
    
    # Sub-pixel anti-aliasing jitter (+/- 0.45 px)
    sampled_x += np.random.uniform(-0.45, 0.45, size=target_count)
    sampled_y += np.random.uniform(-0.45, 0.45, size=target_count)
    
    # 4. Coordinate Normalization into 3D Space
    # Center face at (0, 0)
    norm_x = (sampled_x - face_cx) / (head_rx * 1.5)
    norm_y = -(sampled_y - face_cy) / (head_ry * 1.4)
    
    # 5. True 2.5D Anatomical Depth Model (Z)
    print("Computing 3D sculptural anatomical depth model...")
    dx_head = (sampled_x - face_cx) / head_rx
    dy_head = (sampled_y - face_cy) / head_ry
    head_rad_sq = dx_head**2 + dy_head**2
    
    # Cranium ellipsoid dome
    z_head = np.sqrt(np.maximum(0.0, 1.0 - np.clip(head_rad_sq, 0.0, 1.0))) * 0.38
    
    # Authentic subtle head tilt (about 12 degrees 3/4 turn in front.jpg)
    angle_rad = math.radians(12.0)
    z_turn = -dx_head * math.sin(angle_rad) * 0.18
    
    # Nose: sharp forward ridge + rounded tip
    d_nose_tip = np.sqrt((sampled_x - nose_tip_pos[0])**2 + (sampled_y - nose_tip_pos[1])**2)
    z_nose = np.exp(- (d_nose_tip**2) / (2.0 * (26.0**2))) * 0.30
    
    # Nose bridge ridge (running from nasion to tip)
    t_bridge = np.clip((sampled_y - nose_bridge_top[1]) / (nose_tip_pos[1] - nose_bridge_top[1] + 1e-5), 0.0, 1.0)
    bridge_x = nose_bridge_top[0] + t_bridge * (nose_tip_pos[0] - nose_bridge_top[0])
    d_bridge = np.abs(sampled_x - bridge_x)
    z_bridge = np.exp(- (d_bridge**2) / (2.0 * (16.0**2))) * (sampled_y >= nose_bridge_top[1]) * (sampled_y <= nose_tip_pos[1]) * 0.22
    
    # Eye sockets: orbital depression (-0.11), eyeball bulge (+0.07 inside orbit)
    d_le_dist = np.sqrt((sampled_x - left_eye_pos[0])**2 + (sampled_y - left_eye_pos[1])**2)
    z_socket_l = -np.exp(- (d_le_dist**2) / (2.0 * (26.0**2))) * 0.11
    z_eyeball_l = np.exp(- (d_le_dist**2) / (2.0 * (10.0**2))) * 0.07
    
    d_re_dist = np.sqrt((sampled_x - right_eye_pos[0])**2 + (sampled_y - right_eye_pos[1])**2)
    z_socket_r = -np.exp(- (d_re_dist**2) / (2.0 * (26.0**2))) * 0.11
    z_eyeball_r = np.exp(- (d_re_dist**2) / (2.0 * (10.0**2))) * 0.07
    
    # Cheeks: zygomatic arch prominence
    d_l_cheek = np.sqrt((sampled_x - 265.0)**2 + (sampled_y - 565.0)**2)
    z_l_cheek = np.exp(- (d_l_cheek**2) / (2.0 * (35.0**2))) * 0.14
    d_r_cheek = np.sqrt((sampled_x - 410.0)**2 + (sampled_y - 585.0)**2)
    z_r_cheek = np.exp(- (d_r_cheek**2) / (2.0 * (35.0**2))) * 0.14
    
    # Lips: elevated projection
    d_mouth_dist = np.sqrt((sampled_x - mouth_center_pos[0])**2 + (sampled_y - mouth_center_pos[1])**2)
    z_lips = np.exp(- (d_mouth_dist**2) / (2.0 * (30.0**2))) * 0.14
    
    # Chin: prominent forward curve
    d_chin_dist = np.sqrt((sampled_x - chin_pos[0])**2 + (sampled_y - chin_pos[1])**2)
    z_chin = np.exp(- (d_chin_dist**2) / (2.0 * (34.0**2))) * 0.17
    
    # Mandibular jawline: curves back towards ears (-0.12)
    # Neck: recessed cylinder
    is_neck = (sampled_y > 680) & (sampled_y < 812) & (sampled_x > 220) & (sampled_x < 420)
    z_neck = np.where(is_neck, -0.16 - 0.12 * ((sampled_y - 680) / 132.0), 0.0)
    
    # Shoulders: slope forward and outward
    is_shoulders = (sampled_y >= 680) & ((sampled_x <= 220) | (sampled_x >= 420))
    z_shoulders = np.where(is_shoulders, -0.20 - 0.18 * ((sampled_y - 680) / 132.0), 0.0)
    
    # Hair curls layering (+0.04 to +0.08 over forehead)
    is_hair = (sampled_y >= 250) & (sampled_y <= 450)
    hair_relief = np.where(is_hair, np.random.uniform(0.02, 0.06, size=target_count), 0.0)
    
    norm_z = (z_head + z_turn + z_nose + z_bridge + z_socket_l + z_socket_r 
              + z_eyeball_l + z_eyeball_r + z_l_cheek + z_r_cheek + z_lips + z_chin 
              + z_neck + z_shoulders + hair_relief)
    
    # Outer silhouette edge dissolving particles
    # Add subtle dispersion particles at the boundary (10% of total)
    dist_from_center = np.sqrt(dx_head**2 + dy_head**2)
    is_edge = dist_from_center > 1.05
    scatter_z = np.random.uniform(-0.25, 0.25, size=target_count)
    norm_z = np.where(is_edge, norm_z + scatter_z * 0.5, norm_z)
    
    # 6. Sculptural Color Palette (NO PHOTO SKIN COLORS)
    # Requirements:
    # 85-95% warm-white / neutral off-white
    # 5-15% restrained champagne / gold accents
    print("Assigning architectural sculpture color palette...")
    
    idx_y = np.clip(sampled_y.astype(int), 0, h - 1)
    idx_x = np.clip(sampled_x.astype(int), 0, w - 1)
    
    # Feature importance weight
    feat_val = (
        mask_le[idx_y, idx_x] * 1.0 +
        mask_re[idx_y, idx_x] * 1.0 +
        mask_nose[idx_y, idx_x] * 0.9 +
        mask_mouth[idx_y, idx_x] * 1.0 +
        canny_strong[idx_y, idx_x] * 0.7
    )
    f_weight = np.clip(feat_val, 0.0, 1.0)
    
    # Palette definitions:
    # Color 1: Warm White #f8f6f0 (0.97, 0.96, 0.94)
    # Color 2: Neutral Off-White #eae6dc (0.92, 0.90, 0.86)
    # Color 3: Champagne Highlight #ebd6b7 (0.92, 0.84, 0.72)
    # Color 4: Restrained Gold Accent #d4a86a (0.83, 0.66, 0.42)
    
    # Random selection based on location:
    # ~88% warm white / off-white across face and shoulders
    # ~12% champagne/gold on hair curls and edge sparks
    col_r = np.zeros(target_count, dtype=np.float32)
    col_g = np.zeros(target_count, dtype=np.float32)
    col_b = np.zeros(target_count, dtype=np.float32)
    
    # Random roll per particle
    col_roll = np.random.uniform(0.0, 1.0, size=target_count)
    
    # In hair or edges: higher chance of champagne / gold accents
    accent_prob = np.where(is_hair | is_edge, 0.28, 0.06)
    is_accent = col_roll < accent_prob
    
    # Base warm-white / off-white:
    # Interleave warm white (60%) and soft off-white (40%)
    is_pure_warm = col_roll > (accent_prob + 0.35)
    
    # Warm white:
    col_r = np.where(is_pure_warm, 0.97, 0.92)
    col_g = np.where(is_pure_warm, 0.96, 0.90)
    col_b = np.where(is_pure_warm, 0.94, 0.86)
    
    # Champagne / Gold accents:
    # Half champagne, half restrained gold
    is_gold = is_accent & (col_roll < (accent_prob * 0.45))
    is_champagne = is_accent & ~is_gold
    
    col_r = np.where(is_champagne, 0.92, col_r)
    col_g = np.where(is_champagne, 0.84, col_g)
    col_b = np.where(is_champagne, 0.72, col_b)
    
    col_r = np.where(is_gold, 0.84, col_r)
    col_g = np.where(is_gold, 0.68, col_g)
    col_b = np.where(is_gold, 0.44, col_b)
    
    # 7. Particle Size & Opacity (Controlled, Distinct Luminous Points)
    # Fine points: base size 1.6 to 3.2 (crisp stippled nodes, NO glitter blobs!)
    base_size = 1.8 + f_weight * 1.4
    
    # Base Alpha: 0.55 to 0.95
    base_alpha = 0.60 + f_weight * 0.30
    
    # Phase seed for subtle shimmer and staggered arrival
    phase = np.random.uniform(0.0, 1.0, size=target_count).astype(np.float32)
    
    # 8. Dispersal 3D Cloud for Assembly
    disp_radius = np.random.uniform(1.8, 3.6, size=target_count)
    disp_angle = np.random.uniform(0.0, 2.0 * math.pi, size=target_count)
    disp_phi = np.random.uniform(-math.pi * 0.45, math.pi * 0.45, size=target_count)
    
    disp_x = disp_radius * np.cos(disp_phi) * np.cos(disp_angle)
    disp_y = disp_radius * np.sin(disp_phi)
    disp_z = disp_radius * np.cos(disp_phi) * np.sin(disp_angle)
    
    # 9. Pack into binary buffer (13 floats = 52 bytes per particle)
    particles = np.zeros((target_count, 13), dtype=np.float32)
    particles[:, 0] = norm_x
    particles[:, 1] = norm_y
    particles[:, 2] = norm_z
    particles[:, 3] = col_r
    particles[:, 4] = col_g
    particles[:, 5] = col_b
    particles[:, 6] = base_size
    particles[:, 7] = base_alpha
    particles[:, 8] = f_weight
    particles[:, 9] = phase
    particles[:, 10] = disp_x
    particles[:, 11] = disp_y
    particles[:, 12] = disp_z
    
    os.makedirs(os.path.dirname(output_bin), exist_ok=True)
    with open(output_bin, 'wb') as f:
        f.write(particles.tobytes())
        
    meta = {
        "particleCount": int(target_count),
        "strideFloats": 13,
        "strideBytes": 52,
        "bounds": {
            "minX": float(np.min(norm_x)), "maxX": float(np.max(norm_x)),
            "minY": float(np.min(norm_y)), "maxY": float(np.max(norm_y)),
            "minZ": float(np.min(norm_z)), "maxZ": float(np.max(norm_z))
        },
        "version": "2.0.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)
        
    print(f"Generated {target_count} true sculpture particles. File size: {os.path.getsize(output_bin) / (1024*1024):.2f} MB")
    
    # 10. Generate 2D preview verification image
    canvas_w, canvas_h = 800, 1000
    canvas = np.zeros((canvas_h, canvas_w, 3), dtype=np.float32)
    canvas[:, :] = [0.05, 0.055, 0.07]  # Obsidian BGR
    
    px = ((norm_x + 1.1) / 2.2 * (canvas_w - 100) + 50).astype(int)
    py = ((-norm_y + 1.4) / 2.8 * (canvas_h - 100) + 50).astype(int)
    
    sort_idx = np.argsort(norm_z)
    for i in sort_idx:
        x, y = px[i], py[i]
        if 0 <= x < canvas_w and 0 <= y < canvas_h:
            bgr = np.array([col_b[i], col_g[i], col_r[i]], dtype=np.float32)
            r_px = max(1, int(round(base_size[i] * 0.65)))
            a = base_alpha[i] * 0.85
            cv2.circle(canvas, (x, y), r_px, (bgr * a).tolist(), -1)
            cv2.circle(canvas, (x, y), max(1, r_px // 2), (bgr * 1.1).tolist(), -1)
            
    canvas = np.clip(canvas * 255.0, 0, 255).astype(np.uint8)
    cv2.imwrite('scripts/preview_sculpture.png', canvas)
    print("Saved verification render to scripts/preview_sculpture.png")
    return particles, meta

if __name__ == '__main__':
    generate_sculpture_dataset()
