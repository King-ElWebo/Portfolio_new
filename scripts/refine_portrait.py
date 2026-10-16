"""Refine the EXISTING Variant A points; no photos, mesh morphs or reconstruction.

Run with Python + NumPy + Pillow. Normals are local PCA estimates of the point
surface, not recovered scan normals. The original dataset remains untouched.
"""
from pathlib import Path
import hashlib
import json
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/portrait-particles.bin"
OUTPUT = ROOT / "public/assets/portrait-sculpture.bin"
source = np.frombuffer(SOURCE.read_bytes(), dtype="<f4").reshape(-1, 13).copy()
assert np.isfinite(source).all()
positions = source[:, :3]

# Local surface orientation from nearby existing points. No point is moved.
cell_size = 0.045
cells = np.floor(positions / cell_size).astype(int)
buckets = {}
for index, cell in enumerate(cells):
    buckets.setdefault(tuple(cell), []).append(index)
covariances = np.zeros((len(source), 3, 3))
valid = np.zeros(len(source), dtype=bool)
for index, cell in enumerate(cells):
    neighbours = []
    for x in range(-1, 2):
        for y in range(-1, 2):
            for z in range(-1, 2):
                neighbours.extend(buckets.get(tuple(cell + (x, y, z)), []))
    local = positions[neighbours] - positions[index]
    distance = np.sum(local * local, axis=1)
    local = local[np.argsort(distance)[:24]]
    if len(local) >= 8:
        local -= local.mean(axis=0)
        covariances[index] = local.T @ local / len(local)
        valid[index] = True
values, vectors = np.linalg.eigh(covariances)
normals = vectors[:, :, 0]
normals[normals[:, 2] < 0] *= -1
normals[~valid] = (0, 0, 1)
curvature = values[:, 0] / np.maximum(values.sum(axis=1), 1e-9)

# Deterministic spatial thinning: keep one well-supported point per small cell.
# Feature/curvature priority protects folds without adding fictitious detail.
rng = np.random.default_rng(20261011)
priority = source[:, 8] + np.clip(curvature * 3, 0, 0.35) + rng.random(len(source)) * 0.12
spacing = np.where(source[:, 8] > 0.72, 0.0065, 0.009)
fine_cells = np.floor(positions / spacing[:, None]).astype(int)
occupied = set()
selected = []
for index in np.argsort(-priority, kind="stable"):
    key = (bool(source[index, 8] > 0.72), *fine_cells[index])
    if key not in occupied:
        occupied.add(key)
        selected.append(index)
selected = np.array(selected)

# Shuffle spatial strata, rather than truncating the original surface-then-hair
# ordering. Every draw-range prefix contains face, hair, neck and silhouette.
order = rng.permutation(len(selected))
selected = selected[order]
refined = np.zeros((len(selected), 16), dtype="<f4")
refined[:, :13] = source[selected]
refined[:, 13:16] = normals[selected]
feature = refined[:, 8]
phase = refined[:, 9]
accent = phase < np.where(feature < 0.2, 0.12, 0.07)
refined[:, 3:6] = np.where(accent[:, None], [0.92, 0.77, 0.55], [0.91, 0.88, 0.81])
refined[:, 6] = 0.91 + feature * 0.20 + (phase - 0.5) * 0.12
refined[:, 7] = np.clip(refined[:, 7] * 0.94, 0, 1)
# Smaller, quieter perimeter dust; it no longer competes with facial contours.
refined[feature < 0.2, 6] *= 0.80
refined[feature < 0.2, 7] *= 0.48
OUTPUT.write_bytes(refined.tobytes())
meta = {
    "version": "variant-a-surface-refinement-1",
    "particleCount": len(refined), "strideFloats": 16, "strideBytes": 64,
    "source": SOURCE.name,
    "sourceSha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    "geometry": "Existing generic Variant A positions, unchanged; no personal reconstruction",
    "normals": "Approximate local PCA surface normals, oriented towards the hero camera",
    "bounds": {axis: [float(refined[:, i].min()), float(refined[:, i].max())]
               for i, axis in enumerate(["x", "y", "z"])},
}
(OUTPUT.parent / "portrait-sculpture-meta.json").write_text(json.dumps(meta, indent=2) + "\n")

# SSR/no-WebGL fallback from the same public point geometry, not a private photo.
# Perspective projection matches the runtime camera (40 degrees, z=3.5).
width, height, scale = 480, 600, 3
image = Image.new("RGBA", (width * scale, height * scale))
draw = ImageDraw.Draw(image)
focal = height / (2 * np.tan(np.radians(40) / 2))
depth = 3.5 - refined[:, 2]
px = width / 2 + refined[:, 0] * focal / depth
py = height / 2 - refined[:, 1] * focal / depth
key = np.array([-0.55, 0.65, 0.75]); key /= np.linalg.norm(key)
fill = np.array([0.65, 0.15, 0.70]); fill /= np.linalg.norm(fill)
light = 0.18 + 0.70 * np.maximum(0, refined[:, 13:16] @ key) + 0.13 * np.maximum(0, refined[:, 13:16] @ fill)
for index in np.argsort(refined[:, 2]):
    radius = min(2.2, max(1.25, refined[index, 6] * 1.5 * (3.5 / depth[index]))) * 0.5 * scale
    color = tuple((np.clip(refined[index, 3:6] * light[index], 0, 1) * 255).astype(int))
    alpha = int(refined[index, 7] * 255)
    x, y = px[index] * scale, py[index] * scale
    draw.ellipse((x-radius, y-radius, x+radius, y+radius), fill=(*color, alpha))
image.resize((width, height), Image.Resampling.LANCZOS).save(OUTPUT.parent / "portrait-sculpture-static.png", optimize=True)
print(json.dumps({"original": len(source), "refined": len(refined), "bytes": OUTPUT.stat().st_size}))
