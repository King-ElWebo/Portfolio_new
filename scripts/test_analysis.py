import cv2
import numpy as np

img = cv2.imread('assets/project-images/portrait-reference.png')
h, w, c = img.shape
print(f"Loaded image: {w}x{h}, channels: {c}")

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Calculate luminance
lum = gray.astype(np.float32)

# Find subject bounding box (lum > 15)
mask = lum > 15
y_indices, x_indices = np.where(mask)
ymin, ymax = y_indices.min(), y_indices.max()
xmin, xmax = x_indices.min(), x_indices.max()
print(f"Subject bounding box: x=[{xmin}, {xmax}], y=[{ymin}, {ymax}]")

# Let's check brightness centroid
cy = int(np.sum(y_indices * lum[mask]) / np.sum(lum[mask]))
cx = int(np.sum(x_indices * lum[mask]) / np.sum(lum[mask]))
print(f"Luminance centroid: ({cx}, {cy})")

# Check color channels
b, g, r = cv2.split(img)
# Skin has r > g > b
skin_mask = (r > 60) & (g > 35) & (b > 25) & (r > g) & (g > b)
print(f"Skin pixels count: {np.count_nonzero(skin_mask)}")

# Eyes / pupils within face region
# Around y: 400-600, x: 400-800
face_roi = gray[400:600, 400:800]
print(f"Face ROI min lum: {face_roi.min()}, max: {face_roi.max()}")
