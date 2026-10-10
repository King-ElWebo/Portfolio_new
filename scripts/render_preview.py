import numpy as np
import cv2

with open('public/assets/portrait-particles.bin', 'rb') as f:
    data = np.frombuffer(f.read(), dtype=np.float32).reshape(-1, 13)

print("Loaded particles:", data.shape)

norm_x = data[:, 0]
norm_y = data[:, 1]
norm_z = data[:, 2]
col_r = data[:, 3]
col_g = data[:, 4]
col_b = data[:, 5]
size = data[:, 6]
alpha = data[:, 7]

# Render canvas
canvas_w, canvas_h = 800, 1000
canvas = np.zeros((canvas_h, canvas_w, 3), dtype=np.float32)

# Background deep obsidian
canvas[:, :] = [0.05, 0.055, 0.07]  # BGR

# Map norm_x [-1, 1] and norm_y [-1.2, 1.2] to canvas pixels
px = ((norm_x + 1.1) / 2.2 * (canvas_w - 100) + 50).astype(int)
py = ((-norm_y + 1.4) / 2.8 * (canvas_h - 100) + 50).astype(int)

# Sort by Z so closer points draw on top
sort_idx = np.argsort(norm_z)

for i in sort_idx:
    x = px[i]
    y = py[i]
    if 0 <= x < canvas_w and 0 <= y < canvas_h:
        bgr = np.array([col_b[i], col_g[i], col_r[i]], dtype=np.float32)
        r_px = max(1, int(round(size[i] * 0.7)))
        a = alpha[i] * 0.85
        
        # Draw soft circle
        cv2.circle(canvas, (x, y), r_px, (bgr * a).tolist(), -1)
        # Inner hotspot
        cv2.circle(canvas, (x, y), max(1, r_px // 2), (bgr * 1.2).tolist(), -1)

canvas = np.clip(canvas * 255.0, 0, 255).astype(np.uint8)
cv2.imwrite('scripts/preview_particles.png', canvas)
print("Saved preview to scripts/preview_particles.png")
