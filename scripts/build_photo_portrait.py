"""Build the personal 2D particle artwork locally from the private front photo.

Requires the existing Python + NumPy + Pillow tooling. No uploads, AI model,
facial reconstruction or anatomical warping. The source photo is never copied
to public/. Only sampled points and a rendering of those points are exported.
"""
from collections import deque
from pathlib import Path
import json

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/portraits/private/front.jpg"
OUTPUT = ROOT / "public/assets/portrait-photo.bin"
PREVIEW = ROOT / "qa-results/portrait-photo"
SEED = 20261021
STRIDE = 12  # position.xyz, color.rgb, size/alpha/anchor/phase, dispersal.xy


def largest_component(mask):
    """Keep the connected photographic subject; discard isolated wall noise."""
    height, width = mask.shape
    remaining = mask.copy()
    largest = []
    for y, x in zip(*np.where(mask)):
        if not remaining[y, x]:
            continue
        queue = deque([(y, x)])
        remaining[y, x] = False
        component = []
        while queue:
            row, column = queue.popleft()
            component.append((row, column))
            for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                ny, nx = row + dy, column + dx
                if 0 <= ny < height and 0 <= nx < width and remaining[ny, nx]:
                    remaining[ny, nx] = False
                    queue.append((ny, nx))
        if len(component) > len(largest):
            largest = component
    result = np.zeros_like(mask)
    if not largest:
        raise ValueError("No photographic subject found")
    rows, columns = np.array(largest).T
    result[rows, columns] = True
    return result


def fill_interior(mask):
    """Retain eyes/highlights inside the silhouette without inventing contours."""
    outside = ~mask.copy()
    height, width = mask.shape
    queue = deque()
    for y in range(height):
        for x in (0, width - 1):
            if outside[y, x]:
                queue.append((y, x))
                outside[y, x] = False
    for x in range(width):
        for y in (0, height - 1):
            if outside[y, x]:
                queue.append((y, x))
                outside[y, x] = False
    reachable = np.zeros_like(mask)
    while queue:
        y, x = queue.popleft()
        reachable[y, x] = True
        for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < height and 0 <= nx < width and outside[ny, nx]:
                outside[ny, nx] = False
                queue.append((ny, nx))
    return ~reachable


def smoothstep(start, end, values):
    value = np.clip((values - start) / (end - start), 0, 1)
    return value * value * (3 - 2 * value)


def main():
    photo = ImageOps.exif_transpose(Image.open(SOURCE)).convert("RGB")
    if photo.size != (486, 812):
        raise ValueError("The matte is specific to the current front photo; review a replacement locally")
    # Crop only the photograph's unused wall/border. No facial coordinates move.
    crop = (145, 246, 471, 806)
    image = photo.crop(crop)
    rgb = np.asarray(image, dtype=np.float32)
    luminance = np.asarray(image.convert("L"), dtype=np.float32) / 255
    # This photograph has a cool, neutral wall and a warm subject/dark shirt.
    # Segmentation follows actual pixel colors rather than a head-shaped mask.
    warm = (rgb[:, :, 0] - rgb[:, :, 2] > 3) & (rgb[:, :, 0] - rgb[:, :, 1] > -3)
    candidate = Image.fromarray(((warm | (luminance < 0.32)) * 255).astype(np.uint8))
    candidate = candidate.filter(ImageFilter.MedianFilter(3))
    matte = fill_interior(largest_component(np.asarray(candidate) > 127))
    matte = np.asarray(Image.fromarray((matte * 255).astype(np.uint8))
                       .filter(ImageFilter.GaussianBlur(0.65)), dtype=np.float32) / 255
    height, width = luminance.shape
    rows, columns = np.mgrid[:height, :width]
    # Let the cropped shoulders recede into black; don't reshape the head.
    matte *= 1 - smoothstep(height - 100, height - 4, rows)
    shoulder_feather = smoothstep(0, 34, columns) * (1 - smoothstep(width - 25, width, columns))
    matte *= 1 - smoothstep(390, 470, rows) * (1 - shoulder_feather)

    low, high = np.percentile(luminance[matte > 0.9], [2, 98])
    blurred = np.asarray(image.convert("L").filter(ImageFilter.GaussianBlur(5)), dtype=np.float32) / 255
    tone = np.clip((luminance - low) / (high - low) + (luminance - blurred) * 0.65, 0, 1)
    rng = np.random.default_rng(SEED)
    step = 2.55
    grid_y, grid_x = np.meshgrid(np.arange(0, height, step), np.arange(0, width, step), indexing="ij")
    x = grid_x.ravel() + rng.uniform(-0.38, 0.38, grid_x.size) * step
    y = grid_y.ravel() + rng.uniform(-0.38, 0.38, grid_y.size) * step
    ix = np.clip(np.round(x).astype(int), 0, width - 1)
    iy = np.clip(np.round(y).astype(int), 0, height - 1)
    sampled_tone = tone[iy, ix]
    keep = (matte[iy, ix] > 0.08) & (rng.random(len(x)) < 0.32 + sampled_tone * 0.65)
    x, y, ix, iy, sampled_tone = (value[keep] for value in (x, y, ix, iy, sampled_tone))
    # A deterministic mixed ordering keeps every device's prefix coherent.
    order = rng.permutation(len(x))[:11000]
    x, y, ix, iy, sampled_tone = (value[order] for value in (x, y, ix, iy, sampled_tone))
    count = len(x)
    points = np.zeros((count, STRIDE), dtype="<f4")
    points[:, 0] = (x + crop[0] - 333) / 235
    points[:, 1] = -(y + crop[1] - 520) / 235
    # Z stays exactly zero. Brightness is photographic tone, never fake depth.
    variation = rng.uniform(0.96, 1.025, count)
    points[:, 3:6] = np.array([0.99, 0.94, 0.84]) * variation[:, None]
    points[:, 6] = 1.55 + np.sqrt(sampled_tone) * 0.65 + rng.uniform(-0.08, 0.08, count)
    points[:, 7] = matte[iy, ix] * (0.035 + sampled_tone ** 0.82 * 0.94)
    # Anchors preserve the photograph's face during assembly and interaction.
    face = (y + crop[1] > 365) & (y + crop[1] < 645)
    points[:, 8] = np.where(face, 0.85, 0.3)
    points[:, 9] = rng.random(count)
    points[:, 10:12] = rng.uniform(-1, 1, (count, 2))
    assert np.isfinite(points).all() and np.all(points[:, 2] == 0)
    OUTPUT.write_bytes(points.tobytes())

    # Render the same dots for SSR/no-WebGL, at the runtime's 4:5 framing.
    resolution = 3
    preview = Image.new("RGBA", (480 * resolution, 600 * resolution))
    draw = ImageDraw.Draw(preview)
    for point in points:
        px = (240 + point[0] * 600 / 2.6) * resolution
        py = (300 - point[1] * 600 / 2.6) * resolution
        radius = float(point[6]) * resolution / 2
        color = tuple((np.clip(point[3:6], 0, 1) * 255).astype(int)) + (int(point[7] * 255),)
        draw.ellipse((px - radius, py - radius, px + radius, py + radius), fill=color)
    preview = preview.resize((480, 600), Image.Resampling.LANCZOS)
    preview.save(OUTPUT.with_name("portrait-photo-static.png"))
    metadata = {
        "version": "personal-photo-2d-1", "particleCount": count,
        "strideFloats": STRIDE, "strideBytes": STRIDE * 4,
        "geometry": "2D samples of a locally supplied personal photograph. Base Z is zero. No scan or reconstructed anatomy.",
        "seed": SEED, "sourcePhotoDistributed": False,
        "bounds": {axis: [float(points[:, i].min()), float(points[:, i].max())]
                   for i, axis in enumerate(("x", "y", "z"))},
    }
    OUTPUT.with_name("portrait-photo-meta.json").write_text(json.dumps(metadata, indent=2) + "\n")
    PREVIEW.mkdir(parents=True, exist_ok=True)
    # Private matte diagnostic stays ignored and out of public/.
    diagnostic = image.convert("RGBA")
    diagnostic.putalpha(Image.fromarray((matte * 255).astype(np.uint8)))
    diagnostic.save(PREVIEW / "private-matte.png")
    print(json.dumps({"points": count, "bytes": OUTPUT.stat().st_size, "baseZ": 0}))


if __name__ == "__main__":
    main()
