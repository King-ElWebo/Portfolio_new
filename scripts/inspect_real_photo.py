import cv2
import numpy as np

img = cv2.imread('assets/portraits/private/front.jpg')
h, w, _ = img.shape

# Convert to RGB, HSV, and Grayscale
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 1. Background Segmentation
# Background is the bright ceiling/wall: high value, low saturation, high red+green+blue
# Person is either skin, hair, or dark shirt
is_bg = (gray > 160) & (hsv[:,:,1] < 50)
# Refine background with morphological cleanup
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
is_bg = cv2.morphologyEx(is_bg.astype(np.uint8), cv2.MORPH_CLOSE, kernel)
is_bg = cv2.GaussianBlur(is_bg.astype(np.float32), (5, 5), 0) > 0.5
subject_mask = (~is_bg).astype(np.uint8)

# Remove any small disconnected components in background
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(subject_mask)
# Keep only the largest component (the person)
largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
person_mask = (labels == largest_label).astype(np.uint8)

# Fill holes inside the person
contours, _ = cv2.findContours(person_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
filled_mask = np.zeros_like(person_mask)
cv2.drawContours(filled_mask, contours, -1, 1, thickness=-1)

# Check person bounding box
y_idx, x_idx = np.where(filled_mask > 0)
print(f"Person bbox: x=[{x_idx.min()}, {x_idx.max()}], y=[{y_idx.min()}, {y_idx.max()}]")
print(f"Total person pixels: {np.count_nonzero(filled_mask)}")

# 2. Canny edges on person only
gray_person = gray * filled_mask
canny = cv2.Canny(gray_person, 30, 80)
# Also Sobel gradients
sobelx = cv2.Sobel(gray_person, cv2.CV_32F, 1, 0, ksize=3)
sobely = cv2.Sobel(gray_person, cv2.CV_32F, 0, 1, ksize=3)
grad = np.sqrt(sobelx**2 + sobely**2)
grad_norm = grad / (np.max(grad) + 1e-6)

print(f"Canny edge pixels: {np.count_nonzero(canny)}")

# Save verification mask image
cv2.imwrite('scripts/mask_verification.png', (filled_mask * 255).astype(np.uint8))
cv2.imwrite('scripts/edges_verification.png', canny)
print("Saved mask and edge verification images.")
