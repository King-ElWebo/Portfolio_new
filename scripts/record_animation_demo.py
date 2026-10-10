import os
import time
from PIL import Image
from playwright.sync_api import sync_playwright

os.makedirs("qa-results/frames", exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5174/", wait_until="networkidle")

    frames = []
    
    # Locate canvas
    canvas = page.locator("canvas.hero-portrait-canvas")
    canvas.wait_for()
    box = canvas.bounding_box()
    cx = box["x"] + box["width"] * 0.5
    cy = box["y"] + box["height"] * 0.5

    print("1. Recording Assembly Animation...")
    for i in range(12):
        path = f"qa-results/frames/frame_assembly_{i:02d}.png"
        # Crop to portrait + headline area for crisp demonstration
        page.screenshot(path=path, clip={"x": 50, "y": 80, "width": 1340, "height": 760})
        frames.append(Image.open(path))
        time.sleep(0.18)

    print("2. Recording Idle Living Motion...")
    for i in range(8):
        path = f"qa-results/frames/frame_idle_{i:02d}.png"
        page.screenshot(path=path, clip={"x": 50, "y": 80, "width": 1340, "height": 760})
        frames.append(Image.open(path))
        time.sleep(0.18)

    print("3. Recording Pointer Interaction...")
    # Move pointer near right cheek and jawline
    for step in range(10):
        t = step / 9.0
        # Interpolate mouse path across face
        mx = cx + (t - 0.5) * 160
        my = cy + (t - 0.5) * 120
        page.mouse.move(mx, my)
        time.sleep(0.1)
        path = f"qa-results/frames/frame_pointer_{step:02d}.png"
        page.screenshot(path=path, clip={"x": 50, "y": 80, "width": 1340, "height": 760})
        frames.append(Image.open(path))

    # Move mouse away and record smooth spring return
    page.mouse.move(50, 50)
    for step in range(6):
        time.sleep(0.15)
        path = f"qa-results/frames/frame_return_{step:02d}.png"
        page.screenshot(path=path, clip={"x": 50, "y": 80, "width": 1340, "height": 760})
        frames.append(Image.open(path))

    print("4. Recording Scroll Dissolve and Reassembly...")
    # Scroll down
    for s in [150, 300, 480]:
        page.evaluate(f"window.scrollTo(0, {s})")
        time.sleep(0.2)
        path = f"qa-results/frames/frame_scroll_down_{s}.png"
        page.screenshot(path=path, clip={"x": 50, "y": 80, "width": 1340, "height": 760})
        frames.append(Image.open(path))

    # Scroll back up
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(0.4)
    path = "qa-results/frames/frame_reassembled.png"
    page.screenshot(path=path, clip={"x": 50, "y": 80, "width": 1340, "height": 760})
    frames.append(Image.open(path))

    # Save animated GIF
    if frames:
        gif_path = "qa-results/particle_portrait_demo.gif"
        print(f"Compiling {len(frames)} frames into {gif_path}...")
        # Resize slightly to keep GIF size light and fast to view
        scaled_frames = [f.resize((960, 544), Image.Resampling.LANCZOS) for f in frames]
        scaled_frames[0].save(
            gif_path,
            save_all=True,
            append_images=scaled_frames[1:],
            duration=140,
            loop=0
        )
        print("Successfully generated animated demo GIF!")

    # 5. Test prefers-reduced-motion
    print("5. Testing prefers-reduced-motion...")
    page_reduced = browser.new_page(
        viewport={"width": 1440, "height": 900},
        forced_colors="none"
    )
    page_reduced.emulate_media(reduced_motion="reduce")
    page_reduced.goto("http://localhost:5174/", wait_until="networkidle")
    time.sleep(0.5) # Immediate static appearance without 2.2s wait
    page_reduced.screenshot(path="qa-results/07_reduced_motion_static.png")
    print("Saved qa-results/07_reduced_motion_static.png")

    browser.close()
    print("All recording and QA complete!")
