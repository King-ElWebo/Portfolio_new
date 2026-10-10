import cv2
import numpy as np

img = cv2.imread('assets/portraits/private/front.jpg')
h, w, c = img.shape
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

bg = np.zeros((h, w), dtype=bool)

# 1. Ceiling above hair (y < 252)
bg[:252, :] = True

# 2. Left of head (x < 205, above shoulder y < 680)
bg[:680, :205] = True

# 3. Right of head (x > 470, above shoulder y < 680)
bg[:680, 470:] = True

# 4. White wall/cupboard areas outside person
# Left background zone between ear and shoulder:
bg[550:690, :215] |= (gray[550:690, :215] > 130)
# Right background zone between ear and shoulder:
bg[580:710, 445:] |= (gray[580:710, 445:] > 130)

# Any other very bright low-saturation wall pixels outside the core face region
# Core face is x in [220, 450], y in [270, 750]
is_not_core = (np.arange(w) < 215) | (np.arange(w) > 455) | (np.arange(h)[:, None] < 260)
bg |= (gray > 175) & (hsv[:, :, 1] < 35) & is_not_core

person_mask = (~bg).astype(np.uint8)

# Morphology to smooth boundaries
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
person_mask = cv2.morphologyEx(person_mask, cv2.MORPH_CLOSE, kernel)
person_mask = cv2.morphologyEx(person_mask, cv2.MORPH_OPEN, kernel)

# Keep largest component
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(person_mask)
if num_labels > 1:
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    person_mask = (labels == largest_label).astype(np.uint8)

# Fill interior holes
contours, _ = cv2.findContours(person_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
filled_mask = np.zeros_like(person_mask)
cv2.drawContours(filled_mask, contours, -1, 1, thickness=-1)

segmented = img * filled_mask[:, :, np.newaxis]
cv2.imwrite('scripts/segmented_front.png', segmented)
cv2.imwrite('scripts/mask_front.png', filled_mask * 255)
print(f"Clean subject mask pixels: {np.count_nonzero(filled_mask)}")
