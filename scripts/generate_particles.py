import cv2
import numpy as np
import json
import math
import os

def create_particle_dataset(
    image_path='assets/project-images/portrait-reference.png',
    target_count=42000,
    output_bin='public/assets/portrait-particles.bin',
    output_meta='public/assets/portrait-meta.json'
):
    print(f"Reading {image_path}...")
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Cannot load image {image_path}")
    
    h, w, c = img.shape
    print(f"Image dimensions: {w}x{h}")
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    
    # 1. Exact Anatomical Landmark Coordinates
    face_cx, face_cy = 580.0, 610.0
    head_rx, head_ry = 330.0, 460.0
    
    left_eye_pos = (568.0, 490.0)
    right_eye_pos = (748.0, 556.0)
    nose_tip_pos = (590.0, 605.0)
    nose_bridge_top = (610.0, 485.0)
    mouth_center_pos = (603.0, 725.0)
    chin_pos = (590.0, 845.0)
    left_ear_pos = (300.0, 520.0)
    
    # 2. Multi-Scale Gradients & Feature Extractions
    # Sobel gradients
    sobelx = cv2.Sobel(gray, cv2.CV_32F, 1, 0, ksize=3)
    sobely = cv2.Sobel(gray, cv2.CV_32F, 0, 1, ksize=3)
    grad_mag = np.sqrt(sobelx**2 + sobely**2)
    grad_norm = grad_mag / (np.max(grad_mag) + 1e-6)
    
    # Laplacian for fine micro-details (eyelashes, pores, hair strands)
    laplace = np.abs(cv2.Laplacian(gray, cv2.CV_32F, ksize=3))
    laplace_norm = laplace / (np.max(laplace) + 1e-6)
    
    # Canny edge detector for structural contours
    gray_u8 = (gray * 255).astype(np.uint8)
    canny_fine = cv2.Canny(gray_u8, 25, 75).astype(np.float32) / 255.0
    canny_strong = cv2.Canny(gray_u8, 60, 150).astype(np.float32) / 255.0
    
    # 3. Dedicated Feature Importance Weighting
    y_grid, x_grid = np.ogrid[:h, :w]
    
    # Left eye zone
    d_le = np.sqrt((x_grid - left_eye_pos[0])**2 + (y_grid - left_eye_pos[1])**2)
    mask_le = np.exp(- (d_le**2) / (2.0 * (48.0**2)))
    
    # Right eye zone
    d_re = np.sqrt((x_grid - right_eye_pos[0])**2 + (y_grid - right_eye_pos[1])**2)
    mask_re = np.exp(- (d_re**2) / (2.0 * (48.0**2)))
    
    # Nose zone
    d_nose = np.sqrt((x_grid - nose_tip_pos[0])**2 + (y_grid - nose_tip_pos[1])**2)
    mask_nose = np.exp(- (d_nose**2) / (2.0 * (50.0**2)))
    
    # Mouth zone
    d_mouth = np.sqrt((x_grid - mouth_center_pos[0])**2 + (y_grid - mouth_center_pos[1])**2)
    mask_mouth = np.exp(- (d_mouth**2) / (2.0 * (55.0**2)))
    
    # Eyebrows
    d_leb = np.sqrt((x_grid - 550.0)**2 + (y_grid - 450.0)**2)
    mask_leb = np.exp(- (d_leb**2) / (2.0 * (50.0**2)))
    d_reb = np.sqrt((x_grid - 720.0)**2 + (y_grid - 500.0)**2)
    mask_reb = np.exp(- (d_reb**2) / (2.0 * (50.0**2)))
    
    # Hair volume mask
    hair_mask = ((y_grid < 450) & (y_grid > 50) & (x_grid > 250) & (x_grid < 850)).astype(np.float32)
    
    # Skin area
    r_chan = img_rgb[:, :, 0]
    g_chan = img_rgb[:, :, 1]
    b_chan = img_rgb[:, :, 2]
    skin_mask = np.clip((r_chan - g_chan) * 3.0 + (g_chan - b_chan) * 2.0, 0.0, 1.0) * (gray > 0.05).astype(np.float32)
    
    # Combine importance
    importance = (
        gray * 0.35 +
        grad_norm * 0.45 +
        canny_fine * 0.55 +
        canny_strong * 0.45 +
        laplace_norm * 0.30 +
        skin_mask * 0.40 +
        (mask_le + mask_re) * 1.2 +
        mask_nose * 0.85 +
        mask_mouth * 0.95 +
        (mask_leb + mask_reb) * 0.6 +
        hair_mask * grad_norm * 0.5
    )
    
    # Suppress deep empty background
    bg_mask = (gray < 0.025) & (canny_fine < 0.1)
    importance[bg_mask] *= 0.005
    
    # Preserve outer constellation sparks
    is_outer_sparkle = (gray > 0.15) & (d_le > 240) & (d_re > 240) & (d_nose > 240) & (d_mouth > 240)
    importance[is_outer_sparkle] += gray[is_outer_sparkle] * 0.8
    
    # 4. Sampling
    prob = importance.ravel()
    prob_sum = np.sum(prob)
    prob /= prob_sum
    
    np.random.seed(42)  # Deterministic seed for repeatable likeness
    chosen_indices = np.random.choice(h * w, size=target_count, replace=False, p=prob)
    
    sampled_y = (chosen_indices // w).astype(np.float32)
    sampled_x = (chosen_indices % w).astype(np.float32)
    
    # Subpixel anti-aliasing jitter
    sampled_x += np.random.uniform(-0.45, 0.45, size=target_count)
    sampled_y += np.random.uniform(-0.45, 0.45, size=target_count)
    
    # 5. Normalization
    norm_x = (sampled_x - face_cx) / (head_rx * 1.55)
    norm_y = -(sampled_y - face_cy) / (head_ry * 1.45)
    
    # 6. Anatomical 2.5D Depth Model Z
    dx_head = (sampled_x - face_cx) / head_rx
    dy_head = (sampled_y - face_cy) / head_ry
    head_rad_sq = dx_head**2 + dy_head**2
    
    # Ellipsoid cranium dome
    z_head = np.sqrt(np.maximum(0.0, 1.0 - np.clip(head_rad_sq, 0.0, 1.0))) * 0.40
    
    # Head turn angle (16 degrees 3/4 pose)
    angle_rad = math.radians(16.0)
    z_turn = -dx_head * math.sin(angle_rad) * 0.24
    
    # Nose elevation
    d_nose_tip = np.sqrt((sampled_x - nose_tip_pos[0])**2 + (sampled_y - nose_tip_pos[1])**2)
    z_nose = np.exp(- (d_nose_tip**2) / (2.0 * (38.0**2))) * 0.28
    
    # Nose bridge
    t_bridge = np.clip((sampled_y - nose_bridge_top[1]) / (nose_tip_pos[1] - nose_bridge_top[1]), 0.0, 1.0)
    bridge_x = nose_bridge_top[0] + t_bridge * (nose_tip_pos[0] - nose_bridge_top[0])
    d_bridge = np.abs(sampled_x - bridge_x)
    z_bridge = np.exp(- (d_bridge**2) / (2.0 * (24.0**2))) * (sampled_y >= nose_bridge_top[1]) * (sampled_y <= nose_tip_pos[1]) * 0.20
    
    # Eye sockets (orbit depression)
    d_le_dist = np.sqrt((sampled_x - left_eye_pos[0])**2 + (sampled_y - left_eye_pos[1])**2)
    z_socket_l = -np.exp(- (d_le_dist**2) / (2.0 * (40.0**2))) * 0.10
    z_eyeball_l = np.exp(- (d_le_dist**2) / (2.0 * (16.0**2))) * 0.06
    
    d_re_dist = np.sqrt((sampled_x - right_eye_pos[0])**2 + (sampled_y - right_eye_pos[1])**2)
    z_socket_r = -np.exp(- (d_re_dist**2) / (2.0 * (40.0**2))) * 0.10
    z_eyeball_r = np.exp(- (d_re_dist**2) / (2.0 * (16.0**2))) * 0.06
    
    # Lips prominence
    d_mouth_dist = np.sqrt((sampled_x - mouth_center_pos[0])**2 + (sampled_y - mouth_center_pos[1])**2)
    z_lips = np.exp(- (d_mouth_dist**2) / (2.0 * (45.0**2))) * 0.13
    
    # Chin prominence
    d_chin_dist = np.sqrt((sampled_x - chin_pos[0])**2 + (sampled_y - chin_pos[1])**2)
    z_chin = np.exp(- (d_chin_dist**2) / (2.0 * (48.0**2))) * 0.15
    
    # Neck recession
    is_neck = (sampled_y > 850) & (sampled_y < 1200) & (sampled_x > 350) & (sampled_x < 750)
    z_neck = np.where(is_neck, -0.15 - 0.12 * ((sampled_y - 850) / 350.0), 0.0)
    
    # Shoulders
    is_shoulders = sampled_y >= 1150
    z_shoulders = np.where(is_shoulders, -0.24 - 0.18 * ((sampled_y - 1150) / 300.0), 0.0)
    
    # Luminance surface relief
    idx_y = np.clip(sampled_y.astype(int), 0, h - 1)
    idx_x = np.clip(sampled_x.astype(int), 0, w - 1)
    sampled_lum = gray[idx_y, idx_x]
    z_relief = (sampled_lum - 0.45) * 0.05
    
    norm_z = (z_head + z_turn + z_nose + z_bridge + z_socket_l + z_socket_r 
              + z_eyeball_l + z_eyeball_r + z_lips + z_chin + z_neck + z_shoulders + z_relief)
    
    # Scatter background sparkles in depth
    is_sparkle = head_rad_sq > 1.25
    sparkle_z = np.random.uniform(-0.35, 0.35, size=target_count)
    norm_z = np.where(is_sparkle, sparkle_z, norm_z)
    
    # 7. Colors: Warm White / Champagne / Restrained Gold
    sampled_r = img_rgb[idx_y, idx_x, 0]
    sampled_g = img_rgb[idx_y, idx_x, 1]
    sampled_b = img_rgb[idx_y, idx_x, 2]
    
    # Balanced tone mapping for cinematic elegance
    col_lum = 0.299 * sampled_r + 0.587 * sampled_g + 0.114 * sampled_b
    gold_tint = np.array([1.03, 0.94, 0.76], dtype=np.float32)
    
    col_r = np.clip(sampled_r * gold_tint[0] + 0.02 * col_lum, 0.0, 1.0)
    col_g = np.clip(sampled_g * gold_tint[1] + 0.015 * col_lum, 0.0, 1.0)
    col_b = np.clip(sampled_b * gold_tint[2], 0.0, 1.0)
    
    # 8. Feature Weight & Particle Attributes
    feat_val = (
        mask_le[idx_y, idx_x] * 1.0 +
        mask_re[idx_y, idx_x] * 1.0 +
        mask_nose[idx_y, idx_x] * 0.8 +
        mask_mouth[idx_y, idx_x] * 0.9 +
        canny_strong[idx_y, idx_x] * 0.6
    )
    f_weight = np.clip(feat_val, 0.0, 1.0)
    
    # Size: 2.2 to 5.8
    base_size = 2.2 + col_lum * 2.6 + f_weight * 1.4
    
    # Alpha: 0.38 to 0.95
    base_alpha = 0.38 + col_lum * 0.52 + f_weight * 0.1
    
    # Phase seed
    phase = np.random.uniform(0.0, 1.0, size=target_count).astype(np.float32)
    
    # 9. Dispersal 3D Cloud for Assembly
    disp_radius = np.random.uniform(1.8, 3.6, size=target_count)
    disp_angle = np.random.uniform(0.0, 2.0 * math.pi, size=target_count)
    disp_phi = np.random.uniform(-math.pi * 0.45, math.pi * 0.45, size=target_count)
    
    disp_x = disp_radius * np.cos(disp_phi) * np.cos(disp_angle)
    disp_y = disp_radius * np.sin(disp_phi)
    disp_z = disp_radius * np.cos(disp_phi) * np.sin(disp_angle)
    
    # 10. Write binary buffer
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
        "version": "1.1.0"
    }
    with open(output_meta, 'w') as f:
        json.dump(meta, f, indent=2)
        
    print(f"Generated {target_count} particles. File size: {os.path.getsize(output_bin) / (1024*1024):.2f} MB")
    return particles, meta

if __name__ == '__main__':
    create_particle_dataset()
