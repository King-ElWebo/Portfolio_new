import os
import shutil
import time
from playwright.sync_api import sync_playwright

os.makedirs("qa-results", exist_ok=True)

variants = [
    ("A", "public/assets/portrait-particles-a.bin", "qa-results/variant_a_fine.png"),
    ("B", "public/assets/portrait-particles-b.bin", "qa-results/variant_b_atmospheric.png")
]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    for label, src_bin, out_png in variants:
        print(f"Preparing Variant {label} from {src_bin}...")
        shutil.copyfile(src_bin, "public/assets/portrait-particles.bin")
        time.sleep(1.0)
        
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        t_stamp = int(time.time() * 1000)
        page.goto(f"http://localhost:5173/?variant={label}&t={t_stamp}", wait_until="networkidle")
        
        # Wait 4.0 seconds for assembly animation to complete fully
        page.wait_for_timeout(4000)
        
        # Take full hero screenshot
        page.screenshot(path=out_png)
        print(f"Captured {out_png}")
        
        # Also capture close-up crop of canvas
        canvas = page.locator("canvas.hero-portrait-canvas")
        if canvas.count() > 0:
            crop_path = f"qa-results/variant_{label.lower()}_closeup.png"
            canvas.screenshot(path=crop_path)
            print(f"Captured {crop_path}")
            
        page.close()

    browser.close()
print("All variant comparisons captured.")
