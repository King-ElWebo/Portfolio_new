import os
import time
from playwright.sync_api import sync_playwright

os.makedirs("qa-results/work-archive", exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # 1. Desktop 1440px
    page_1440 = browser.new_page(viewport={"width": 1440, "height": 1000})
    page_1440.goto("http://localhost:5173/en/work", wait_until="networkidle")
    time.sleep(1.5)
    page_1440.screenshot(path="qa-results/work-archive/01_desktop_1440px_hero_grid.png")
    page_1440.screenshot(path="qa-results/work-archive/01_desktop_1440px_fullpage.png", full_page=True)
    print("Captured 1440px desktop screenshots")

    # Test Card Hover on first project
    card_01 = page_1440.locator(".work-card").first
    card_01.hover()
    time.sleep(0.5)
    page_1440.screenshot(path="qa-results/work-archive/02_desktop_1440px_card_hover.png")
    print("Captured card hover state")

    # Test Filter Click: Client Projects
    client_filter = page_1440.locator("button.work-archive-filter-btn", has_text="Client Projects")
    if client_filter.count() > 0:
        client_filter.click()
        time.sleep(0.5)
        page_1440.screenshot(path="qa-results/work-archive/03_desktop_filtered_client.png")
        print("Captured Client Projects filter")

    # Test Filter Click: The Lab
    lab_filter = page_1440.locator("button.work-archive-filter-btn", has_text="The Lab")
    if lab_filter.count() > 0:
        lab_filter.click()
        time.sleep(0.5)
        page_1440.screenshot(path="qa-results/work-archive/04_desktop_filtered_lab.png")
        print("Captured The Lab filter")

    # Test Empty Production State (click toggle)
    toggle_btn = page_1440.locator("button.work-archive-preview-toggle")
    if toggle_btn.count() > 0:
        toggle_btn.click()
        time.sleep(0.5)
        page_1440.screenshot(path="qa-results/work-archive/05_desktop_empty_production_state.png")
        print("Captured Empty Production state")
        # Click back
        toggle_btn.click()
        time.sleep(0.5)

    # 2. Wide Desktop 1920px
    page_1920 = browser.new_page(viewport={"width": 1920, "height": 1080})
    page_1920.goto("http://localhost:5173/en/work", wait_until="networkidle")
    time.sleep(1.5)
    page_1920.screenshot(path="qa-results/work-archive/06_desktop_1920px.png")
    page_1920.screenshot(path="qa-results/work-archive/06_desktop_1920px_fullpage.png", full_page=True)
    print("Captured 1920px wide desktop screenshots")

    # 3. Tablet 768px (2-column layout)
    page_768 = browser.new_page(viewport={"width": 768, "height": 1024})
    page_768.goto("http://localhost:5173/en/work", wait_until="networkidle")
    time.sleep(1.5)
    page_768.screenshot(path="qa-results/work-archive/07_tablet_768px.png")
    page_768.screenshot(path="qa-results/work-archive/07_tablet_768px_fullpage.png", full_page=True)
    print("Captured 768px tablet screenshots")

    # 4. Mobile 390px (1-column layout)
    page_390 = browser.new_page(viewport={"width": 390, "height": 844})
    page_390.goto("http://localhost:5173/en/work", wait_until="networkidle")
    time.sleep(1.5)
    page_390.screenshot(path="qa-results/work-archive/08_mobile_390px.png")
    page_390.screenshot(path="qa-results/work-archive/08_mobile_390px_fullpage.png", full_page=True)
    print("Captured 390px mobile screenshots")

    # 5. German Locale /de/work
    page_de = browser.new_page(viewport={"width": 1440, "height": 1000})
    page_de.goto("http://localhost:5173/de/work", wait_until="networkidle")
    time.sleep(1.5)
    page_de.screenshot(path="qa-results/work-archive/09_german_locale_1440px.png")
    print("Captured German locale /de/work screenshot")

    browser.close()
    print("All QA screenshots successfully generated!")
