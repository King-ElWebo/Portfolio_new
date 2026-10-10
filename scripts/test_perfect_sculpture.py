import struct
import json
import numpy as np
import math
import cv2

# 1. Load raw 3D head scan
with open('scripts/head_scan.glb', 'rb') as f:
    data = f.read()

json_len = struct.unpack('<I', data[12:16])[0]
gltf = json.loads(data[20:20+json_len].decode('utf-8'))
bin_data = data[20+json_len+8:]

prim = gltf['meshes'][0]['primitives'][0]
pos_acc = gltf['accessors'][prim['attributes']['POSITION']]
pos_bv = gltf['bufferViews'][pos_acc['bufferView']]
pos_offset = pos_bv.get('byteOffset', 0) + pos_acc.get('byteOffset', 0)
positions = np.frombuffer(bin_data[pos_offset : pos_offset + pos_acc['count'] * 12], dtype=np.float32).reshape(-1, 3).copy()

norm_acc = gltf['accessors'][prim['attributes']['NORMAL']]
norm_bv = gltf['bufferViews'][norm_acc['bufferView']]
norm_offset = norm_bv.get('byteOffset', 0) + norm_acc.get('byteOffset', 0)
normals = np.frombuffer(bin_data[norm_offset : norm_offset + norm_acc['count'] * 12], dtype=np.float32).reshape(-1, 3).copy()

idx_acc = gltf['accessors'][prim['indices']]
idx_bv = gltf['bufferViews'][idx_acc['bufferView']]
idx_offset = idx_bv.get('byteOffset', 0) + idx_acc.get('byteOffset', 0)
comp_type = idx_acc['componentType']
dtype = np.uint16 if comp_type == 5123 else np.uint32
indices = np.frombuffer(bin_data[idx_offset : idx_offset + idx_acc['count'] * np.dtype(dtype).itemsize], dtype=dtype).reshape(-1, 3)

# 2. Morph proportions towards Practitioner's youthful, athletic features:
# A. Face compacting: Lee Perry-Smith head is very oblong; practitioner has a more balanced head ratio
# Scale head height slightly for y > 0.0
is_upper_head = positions[:, 1] > 0.2
positions[is_upper_head, 1] = 0.2 + (positions[is_upper_head, 1] - 0.2) * 0.94

# B. Athletic, squared masculine jawline
d_jaw_l = np.sqrt(((positions[:, 0] - 1.35) / 0.65)**2 + ((positions[:, 1] - (-0.20)) / 0.55)**2 + ((positions[:, 2] - 0.8) / 0.8)**2)
d_jaw_r = np.sqrt(((positions[:, 0] - (-1.35)) / 0.65)**2 + ((positions[:, 1] - (-0.20)) / 0.55)**2 + ((positions[:, 2] - 0.8) / 0.8)**2)
jaw_widening = 0.20 * (np.exp(-d_jaw_l**2) + np.exp(-d_jaw_r**2))
positions[:, 0] += np.sign(positions[:, 0]) * jaw_widening

# C. Defined cheekbones (practitioner has strong cheekbones in front.jpg)
d_cheek_l = np.sqrt(((positions[:, 0] - 1.25) / 0.50)**2 + ((positions[:, 1] - 1.05) / 0.45)**2 + ((positions[:, 2] - 1.4) / 0.6)**2)
d_cheek_r = np.sqrt(((positions[:, 0] - (-1.25)) / 0.50)**2 + ((positions[:, 1] - 1.05) / 0.45)**2 + ((positions[:, 2] - 1.4) / 0.6)**2)
positions[:, 0] += np.sign(positions[:, 0]) * 0.10 * (np.exp(-d_cheek_l**2) + np.exp(-d_cheek_r**2))

# D. Open, youthful eyes: lift upper eyelid crease
# Eyes are around y in [1.55, 1.75], |x| in [0.65, 1.15], z > 1.55
d_eye_l = np.sqrt(((positions[:, 0] - 0.82) / 0.35)**2 + ((positions[:, 1] - 1.66) / 0.18)**2 + ((positions[:, 2] - 1.65) / 0.30)**2)
d_eye_r = np.sqrt(((positions[:, 0] - (-0.85)) / 0.35)**2 + ((positions[:, 1] - 1.66) / 0.18)**2 + ((positions[:, 2] - 1.65) / 0.30)**2)
eye_open = 0.09 * (np.exp(-d_eye_l**2) + np.exp(-d_eye_r**2))
positions[:, 1] += eye_open * 0.6
positions[:, 2] -= eye_open * 0.4  # creates open eyelid recess

# E. Youthful lips & smooth nasolabial transition
d_crease_l = np.sqrt(((positions[:, 0] - 0.55) / 0.22)**2 + ((positions[:, 1] - 0.55) / 0.35)**2)
d_crease_r = np.sqrt(((positions[:, 0] - (-0.55)) / 0.22)**2 + ((positions[:, 1] - 0.55) / 0.35)**2)
positions[:, 2] += 0.14 * (np.exp(-d_crease_l**2) + np.exp(-d_crease_r**2)) * (positions[:, 2] > 1.5)

d_mouth_center = np.sqrt((positions[:, 0] / 0.60)**2 + ((positions[:, 1] - 0.36) / 0.25)**2 + ((positions[:, 2] - 2.05) / 0.35)**2)
positions[:, 2] += 0.07 * np.exp(-d_mouth_center**2)

# F. Recompute smooth normals
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

# G. Natural 6.0 degree head tilt
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

# 3. Surface Sampling
v0 = positions[indices[:, 0]]
v1 = positions[indices[:, 1]]
v2 = positions[indices[:, 2]]
raw_areas = 0.5 * np.linalg.norm(np.cross(v1 - v0, v2 - v0), axis=1)

tri_cx = (v0[:, 0] + v1[:, 0] + v2[:, 0]) / 3.0
tri_cy = (v0[:, 1] + v1[:, 1] + v2[:, 1]) / 3.0
tri_cz = (v0[:, 2] + v1[:, 2] + v2[:, 2]) / 3.0

weight = np.ones(len(raw_areas), dtype=np.float32)

# Face boost
d_t_face = np.sqrt(tri_cx**2 + (tri_cy - 0.75)**2 + (tri_cz - 1.8)**2)
weight += 2.4 * np.exp(-d_t_face**2 / (2.0 * (1.3**2)))

# Eye orbital boost
d_t_eye_l = np.sqrt((tri_cx - 0.80)**2 + (tri_cy - 1.55)**2 + (tri_cz - 1.63)**2)
d_t_eye_r = np.sqrt((tri_cx - (-0.88))**2 + (tri_cy - 1.55)**2 + (tri_cz - 1.63)**2)
weight += 2.2 * (np.exp(-d_t_eye_l**2 / (2.0 * (0.45**2))) + np.exp(-d_t_eye_r**2 / (2.0 * (0.45**2))))

# Reduce surface points on scalp that is covered by hair (prevents bald skin showing under hair)
is_scalp_tri = ((tri_cy > 2.0) & (tri_cz < 1.1)) | (tri_cy > 2.8)
weight = np.where(is_scalp_tri, weight * 0.25, weight)

# Shoulders & Chest gradual decay
is_lower = tri_cy < -0.8
decay = np.exp((tri_cy + 0.8) * 0.95) * np.exp(-np.abs(tri_cx) * 0.25)
weight = np.where(is_lower, weight * np.clip(decay * 0.50, 0.04, 0.90), weight)

weighted_areas = raw_areas * weight
probs = weighted_areas / np.sum(weighted_areas)

N_surf = 23000
np.random.seed(42)
choices = np.random.choice(len(raw_areas), size=N_surf, p=probs)

r1 = np.random.uniform(0, 1, N_surf)
r2 = np.random.uniform(0, 1, N_surf)
sr1 = np.sqrt(r1)
u = 1.0 - sr1
v = r2 * sr1
w = 1.0 - u - v

surf_pts = u[:, None] * v0[choices] + v[:, None] * v1[choices] + w[:, None] * v2[choices]
surf_n = u[:, None] * normals[indices[choices, 0]] + v[:, None] * normals[indices[choices, 1]] + w[:, None] * normals[indices[choices, 2]]
surf_n /= (np.linalg.norm(surf_n, axis=1, keepdims=True) + 1e-6)

# 4. Volumetric Curly Hair & Cascading Forward Fringe (Matching front.jpg & detail.jpg)
# In photos: textured dirty-blonde wavy curls on crown, cascading fringe falling onto forehead
print("Synthesizing authentic textured hair crown and fringe...")
is_scalp_source = ((tri_cy > 1.6) & (tri_cz < 1.35)) | (tri_cy > 2.1)
scalp_indices = np.where(is_scalp_source)[0]
scalp_probs = raw_areas[scalp_indices] / np.sum(raw_areas[scalp_indices])

num_hair_pts = 12500
hair_choices = np.random.choice(scalp_indices, size=num_hair_pts, p=scalp_probs)

hr1 = np.random.uniform(0, 1, num_hair_pts)
hr2 = np.random.uniform(0, 1, num_hair_pts)
hsr1 = np.sqrt(hr1)
hu = 1.0 - hsr1
hv = hr2 * hsr1
hw = 1.0 - hu - hv

root_pts = hu[:, None] * v0[hair_choices] + hv[:, None] * v1[hair_choices] + hw[:, None] * v2[hair_choices]
root_n = hu[:, None] * normals[indices[hair_choices, 0]] + hv[:, None] * normals[indices[hair_choices, 1]] + hw[:, None] * normals[indices[hair_choices, 2]]
root_n /= (np.linalg.norm(root_n, axis=1, keepdims=True) + 1e-6)

hair_pts = []
hair_norms = []

for i in range(num_hair_pts):
    rx, ry, rz = root_pts[i]
    rnx, rny, rnz = root_n[i]

    # Hairline fringe: upper forehead (y in [1.9, 2.9], z > 0.4, abs(x) < 1.3)
    is_fringe = (abs(rx) < 1.3) & (ry > 1.9) & (rz > 0.4)
    is_crown = ry > 2.8

    if is_fringe:
        # Sweeps forward (+Z) and down (-Y) across forehead (practitioner's fringe)
        layer = np.random.uniform(0.12, 0.48)
        wave_x = math.sin(rx * 7.0 + ry * 9.0) * 0.06
        wave_y = -layer * 0.75 + math.cos(rx * 6.0) * 0.04
        wave_z = layer * 0.70 + math.sin(ry * 6.0) * 0.05
    elif is_crown:
        # Volumetric wavy crown on top
        layer = np.random.uniform(0.08, 0.38)
        wave_x = rnx * layer + math.sin(ry * 6.0 + rz * 5.0) * 0.06
        wave_y = rny * layer + math.cos(rx * 5.5) * 0.06
        wave_z = rnz * layer + math.sin(rx * 5.0 + ry * 5.0) * 0.05
    else:
        # Shorter sides/temples
        layer = np.random.uniform(0.04, 0.16)
        wave_x = rnx * layer + math.sin(ry * 7.0) * 0.03
        wave_y = rny * layer
        wave_z = rnz * layer

    px = rx + wave_x
    py = ry + wave_y
    pz = rz + wave_z

    hair_pts.append([px, py, pz])
    hair_norms.append([rnx, rny, rnz])

hair_pts = np.array(hair_pts, dtype=np.float32)
hair_norms = np.array(hair_norms, dtype=np.float32)

# 5. Physically Anchored Dissolution Sparks
num_sparks = 2400
spark_hair_idx = np.random.choice(len(hair_pts), size=700)
spark_body_mask = surf_pts[:, 1] < -0.8
spark_body_indices = np.where(spark_body_mask)[0]
spark_body_idx = np.random.choice(spark_body_indices, size=1700)

sparks_hair = hair_pts[spark_hair_idx] + hair_norms[spark_hair_idx] * np.random.uniform(0.08, 0.55, size=(700, 1)) + np.random.normal(0, 0.05, size=(700, 3))
sparks_body = surf_pts[spark_body_idx] + surf_n[spark_body_idx] * np.random.uniform(0.08, 0.65, size=(1700, 1)) + np.random.normal(0, 0.06, size=(1700, 3))

all_sparks = np.vstack([sparks_hair, sparks_body])
all_spark_norms = np.vstack([hair_norms[spark_hair_idx], surf_n[spark_body_idx]])

# Combine all
all_pts = np.vstack([surf_pts, hair_pts, all_sparks])
all_norms = np.vstack([surf_n, hair_norms, all_spark_norms])

# Render test image
canvas = np.zeros((1000, 800, 3), dtype=np.uint8)
canvas[:, :] = [13, 14, 18]

px = ((all_pts[:, 0] + 4.5) / 9.0 * 700 + 50).astype(int)
py = ((-all_pts[:, 1] + 4.5) / 9.0 * 900 + 50).astype(int)

l = np.array([0.35, 0.60, 0.70])
l /= np.linalg.norm(l)
dots = np.clip(np.sum(all_norms * l, axis=1), 0.25, 1.0)

sort_idx = np.argsort(all_pts[:, 2])

for i in sort_idx:
    x, y = px[i], py[i]
    if 0 <= x < 800 and 0 <= y < 1000:
        c = int(dots[i] * 240)
        cv2.circle(canvas, (x, y), 2, (c, c, c), -1)

cv2.imwrite('scripts/test_sculpture_render.png', canvas)
print("Saved scripts/test_sculpture_render.png! Total points:", len(all_pts))
