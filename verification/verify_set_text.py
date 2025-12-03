
import subprocess
import time
import os
import signal
import pytest
from playwright.sync_api import sync_playwright, expect

def kill_jekyll_process(proc):
    """Kills a process and its children."""
    os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
    proc.wait()

@pytest.fixture(scope="module")
def jekyll_server():
    """Starts the Jekyll server as a fixture."""
    # Ensure any lingering processes are killed
    try:
        subprocess.run("pkill -f 'jekyll serve'", shell=True, check=True)
        time.sleep(2)
    except subprocess.CalledProcessError:
        pass # No process to kill

    proc = subprocess.Popen(
        "bundle exec jekyll serve",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        preexec_fn=os.setsid
    )

    # Wait for the server to be ready
    for line in iter(proc.stdout.readline, b''):
        if b"Server address:" in line:
            break
        print(line.decode(), end="")

    yield
    kill_jekyll_process(proc)


def test_update_gui_text(jekyll_server):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            page.goto("http://127.0.0.1:4000/engine/")

            # Dismiss welcome overlay
            start_button = page.locator("#start-button")
            expect(start_button).to_be_visible(timeout=10000)
            start_button.click()
            expect(start_button).to_be_hidden()

            # Define the workspace to test the gui_set_text block
            workspace_data = {
                "blocks": {
                    "languageVersion": 0,
                    "blocks": [
                        {
                            "type": "gui_create_text_block",
                            "id": "text_creator",
                            "x": 10,
                            "y": 10,
                            "fields": {"NAME": "my_text"},
                            "inputs": {
                                "TEXT": {"block": {"type": "text", "fields": {"TEXT": "Initial Text"}}}
                            },
                            "next": {
                                "block": {
                                    "type": "gui_create_button",
                                    "id": "button_creator",
                                    "fields": {"NAME": "my_button"},
                                    "inputs": {
                                        "TEXT": {"block": {"type": "text", "fields": {"TEXT": "Initial Button"}}}
                                    },
                                    "next": {
                                        "block": {
                                            "type": "gui_set_text",
                                            "id": "text_updater",
                                            "fields": {"NAME": "my_text"},
                                            "inputs": {
                                                "TEXT": {"block": {"type": "text", "fields": {"TEXT": "Updated Text"}}}
                                            },
                                            "next": {
                                                "block": {
                                                    "type": "gui_set_text",
                                                    "id": "button_updater",
                                                    "fields": {"NAME": "my_button"},
                                                    "inputs": {
                                                        "TEXT": {"block": {"type": "text", "fields": {"TEXT": "Updated Button"}}}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            }

            # Load the workspace, but don't run it yet
            page.evaluate(f"""
                const workspace = window.Blockly.getMainWorkspace();
                workspace.clear();
                window.Blockly.serialization.workspaces.load({workspace_data}, workspace);
            """)

            # Switch to preview to make the canvas visible *before* running the code
            preview_tab = page.locator("#preview-tab")
            preview_tab.click()

            # Now run the code and wait for the scene to be ready
            with page.expect_console_message(predicate=lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text, timeout=15000):
                page.evaluate("window.doRun()")

            time.sleep(1) # Give a moment for UI to render

            # Verify the text was updated
            text_content = page.evaluate("window.bjs.uiManager.getControlByName('my_text').text")
            assert text_content == "Updated Text", f"Expected 'Updated Text', but got '{text_content}'"

            # Verify the button text was updated
            button_text_content = page.evaluate("window.bjs.uiManager.getControlByName('my_button').textBlock.text")
            assert button_text_content == "Updated Button", f"Expected 'Updated Button', but got '{button_text_content}'"

            print("Verification successful: Text and Button text updated correctly.")
            page.screenshot(path="/home/jules/verification/verification.png")

        except Exception as e:
            page.screenshot(path="/home/jules/verification/verification_error.png")
            pytest.fail(f"An error occurred during verification: {e}")

        finally:
            browser.close()
