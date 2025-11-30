
import pytest
from playwright.sync_api import sync_playwright, expect
import subprocess
import time
import os

@pytest.fixture(scope="module", autouse=True)
def run_jekyll():
    # Start Jekyll server
    command = ["bundle", "exec", "jekyll", "serve"]
    # Use a file to log stdout and stderr
    log_file_path = "jekyll.log"
    if os.path.exists(log_file_path):
        os.remove(log_file_path)

    with open(log_file_path, "w") as log_file:
        server = subprocess.Popen(command, stdout=log_file, stderr=subprocess.STDOUT, text=True)

    # Wait for the server to be ready
    time.sleep(10) # Give it ample time to start

    # Check if the server started successfully by reading the log file
    with open(log_file_path, "r") as log_file:
        logs = log_file.read()
        if "Server address:" not in logs:
            pytest.fail(f"Jekyll server failed to start. Logs:\n{logs}", pytrace=False)

    yield

    # Teardown: stop the server
    server.terminate()
    server.wait()

def test_undo_redo_functionality(page):
    """
    Tests the full Undo/Redo functionality:
    1. Navigates to the app.
    2. Clears the workspace and undo stack to ensure a clean state.
    3. Checks initial disabled state of Undo/Redo buttons.
    4. Programmatically adds a block to the workspace.
    5. Verifies the Undo button becomes enabled.
    6. Clicks Undo and verifies the block is removed.
    7. Verifies the Redo button becomes enabled.
    8. Clicks Redo and verifies the block is restored.
    """
    try:
        page.goto("http://127.0.0.1:4000/engine/")

        # 1. Dismiss the Welcome Overlay
        start_button = page.locator("#start-button")
        expect(start_button).to_be_visible()
        start_button.click()
        expect(page.locator("#hero-overlay")).to_be_hidden()

        # Ensure we are on the Workspace tab
        workspace_tab = page.locator("#workspace-tab")
        expect(workspace_tab).to_be_visible()
        workspace_tab.click()

        # 2. Clear the workspace and undo stack for a clean test
        page.evaluate("() => { window.workspace.clear(); window.workspace.clearUndo(); }")
        time.sleep(0.5)

        # 3. Open the 'More' menu and check initial button states
        menu_button = page.locator("#menuButton")
        expect(menu_button).to_be_visible()
        menu_button.click()

        undo_button = page.locator("#undoButton")
        redo_button = page.locator("#redoButton")

        expect(undo_button).to_be_disabled()
        expect(redo_button).to_be_disabled()

        # 4. Add a block to the workspace using page.evaluate
        page.evaluate("""
            () => {
                const workspace = window.workspace;
                const block = workspace.newBlock('text');
                block.initSvg();
                block.render();
                return block.id;
            }
        """)

        time.sleep(0.5)

        # 5. Verify Undo button is now enabled
        expect(undo_button).to_be_enabled()
        expect(redo_button).to_be_disabled()

        # 6. Click Undo and verify block is removed
        undo_button.click()
        time.sleep(0.5)

        block_count_after_undo = page.evaluate("() => window.workspace.getAllBlocks(false).length")
        assert block_count_after_undo == 0, f"Block should have been removed after undo, but count is {block_count_after_undo}"

        # Re-open the menu to check the next state
        menu_button.click()
        time.sleep(0.5)

        # 7. Verify Redo button is now enabled
        expect(redo_button).to_be_enabled()
        expect(undo_button).to_be_disabled()

        # 8. Click Redo and verify block is restored
        redo_button.click()
        time.sleep(0.5)

        block_count_after_redo = page.evaluate("() => window.workspace.getAllBlocks(false).length")
        assert block_count_after_redo == 1, "Block should have been restored after redo"

        # Re-open the menu to check the final state
        menu_button.click()
        time.sleep(0.5)

        # Final check: Undo should be enabled again
        expect(undo_button).to_be_enabled()
        expect(redo_button).to_be_disabled()

        print("Test passed: Undo/Redo functionality works as expected.")

    except Exception as e:
        pytest.fail(f"An error occurred during the test: {e}", pytrace=False)
