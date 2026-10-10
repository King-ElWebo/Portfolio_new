import os
import time
from playwright.sync_api import sync_playwright

os.makedirs("qa-results", exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # 1. Desktop 1440x900
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:5174/", wait_until="networkidle")
    
    # Wait 2.5 seconds for assembly animation to finish
    time.sleep(3.0)
    
    # Capture Desktop Assembled Hero
    page.screenshot(path="qa-results/01_desktop_1440x900_assembled.png")
    print("Saved qa-results/01_desktop_1440x900_assembled.png")

    # 2. Test Mouse Interaction
    # Find portrait canvas
    canvas = page.locator("canvas.hero-portrait-canvas")
    box = canvas.bounding_box()
    if box:
        # Move mouse to canvas center
        cx = box["x"] + box["width"] * 0.5
        cy = box["y"] + box["height"] * 0.5
        page.mouse.move(cx, cy)
        time.sleep(0.5)
        # Move mouse towards upper right cheek
        page.mouse.move(cx + 80, cy - 60)
        time.sleep(0.8)
        page.screenshot(path="qa-results/02_desktop_mouse_interaction.png")
        print("Saved qa-results/02_desktop_mouse_interaction.png")

    # 3. Test Scroll Dissolve
    # Scroll down 450px
    page.evaluate("window.scrollTo(0, 450)")
    time.sleep(1.0)
    page.screenshot(path="qa-results/03_desktop_scroll_dissolve.png")
    print("Saved qa-results/03_desktop_scroll_dissolve.png")

    # Scroll back up to 0 (Reassembly)
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(1.5)
    page.screenshot(path="qa-results/04_desktop_scroll_reassembled.png")
    print("Saved qa-results/04_desktop_scroll_reassembled.png")

    # 4. Large Desktop 1920x1080
    page_wide = browser.new_page(viewport={"width": 1920, "height": 1080})
    page_wide.goto("http://localhost:5174/", wait_until="networkidle")
    time.sleep(2.5)
    page_wide.screenshot(path="qa-results/05_desktop_1920x1080.png")
    print("Saved qa-results/05_desktop_1920x1080.png")

    # 5. Mobile 390x844
    page_mobile = browser.new_page(viewport={"width": 390, "height": 844})
    page_mobile.goto("http://localhost:5174/", wait_until="networkidle")
    time.sleep(2.5)
    page_mobile.screenshot(path="qa-results/06_mobile_390x844.png")
    print("Saved qa-results/06_mobile_390x844.png")

    browser.close()
    print("Visual QA complete!")
