import pytest
from playwright.sync_api import sync_playwright, expect
import subprocess
import time
import os

@pytest.fixture(scope="session")
def server():
    # Command to start the Jekyll server
    command = ["bundle", "exec", "jekyll", "serve"]

    # Start the server as a background process
    server_process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # Wait for a few seconds to ensure the server has started
    time.sleep(10)

    # Yield the process object to the test
    yield server_process

    # Teardown: Stop the server after the test session is complete
    server_process.terminate()
    server_process.wait()

def test_add_on_start_block(server):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        try:
            # Navigate to the local Jekyll server
            page.goto("http://127.0.0.1:4000/engine/")

            # 1. Dismiss the welcome overlay
            start_button = page.locator("#start-button")
            expect(start_button).to_be_visible()
            start_button.click()

            # 2. Open the 'More actions' menu
            menu_button = page.get_by_title("More actions")
            expect(menu_button).to_be_visible()
            menu_button.click()

            # 3. Toggle the toolbox to make it visible
            toggle_button = page.get_by_title("Toggle Toolbox")
            expect(toggle_button).to_be_visible()
            toggle_button.click()

            # 4. Locate the "Scripting" category and hover to open flyout
            # Use a more robust text-based selector
            scripting_category = page.get_by_text("Scripting", exact=True)
            expect(scripting_category).to_be_visible()
            scripting_category.hover()

            # 5. Drag the "when game starts" block to the workspace
            # We target the block in the flyout menu
            start_block = page.locator(".blocklyFlyout g[data-id='event_on_start']")
            expect(start_block).to_be_visible()

            workspace_canvas = page.locator(".blocklyMainBackground")

            # Perform the drag-and-drop
            start_block.drag_to(workspace_canvas, target_position={"x": 300, "y": 200})

            # 6. Switch to the Preview tab
            preview_tab = page.locator("#preview-tab")
            preview_tab.click()

            # 7. Run the code and verify the scene loads
            with page.expect_console_message(predicate=lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text, timeout=10000) as console_message_info:
                run_button = page.locator("#runButton")
                run_button.click()

            # 8. Take a screenshot for final visual confirmation
            screenshot_dir = "/home/jules/verification"
            os.makedirs(screenshot_dir, exist_ok=True)
            page.screenshot(path=f"{screenshot_dir}/verification.png")

        finally:
            browser.close()
