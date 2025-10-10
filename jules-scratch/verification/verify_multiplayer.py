from playwright.sync_api import sync_playwright, expect
import re
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    import os
    file_path = "file://" + os.path.abspath("index.html")

    # Go to the page and wait for it to be ready
    page.goto(file_path, timeout=60000)
    # Wait for the scene to be ready by looking for a known element
    expect(page.locator("#runButton")).to_be_visible(timeout=30000)


    # Click the "Start Multiplayer" button
    page.click("#startMultiplayerButton")

    # Give the UI a moment to update
    time.sleep(1)

    # Take a screenshot of the top-right corner where the UI should be
    page.screenshot(
        path="jules-scratch/verification/multiplayer_verification.png",
        clip={"x": page.viewport_size["width"] - 250, "y": 0, "width": 250, "height": 100}
    )

    print("Successfully captured screenshot of the multiplayer UI area.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)