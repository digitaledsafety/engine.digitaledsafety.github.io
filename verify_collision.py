
import asyncio
import pytest
from playwright.async_api import async_playwright, expect
import subprocess
import time
import os
import signal

Jekyll_PROCESS = None

@pytest.fixture(scope="session")
async def jekyll_server():
    # Kill any process on port 4000
    try:
        subprocess.run("fuser -k 4000/tcp", shell=True, check=True)
    except subprocess.CalledProcessError:
        pass

    # Start Jekyll server
    process = await asyncio.create_subprocess_shell("bundle exec jekyll serve",
                                                    stdout=asyncio.subprocess.PIPE,
                                                    stderr=asyncio.subprocess.PIPE)

    # Wait for Jekyll to be ready
    await asyncio.sleep(10)

    yield

    process.terminate()
    await process.wait()


@pytest.mark.asyncio
async def test_vrm_collision(jekyll_server):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Workspace JSON for testing VRM physics and collision
        workspace_json = {
            "blocks": {
                "languageVersion": 0,
                "blocks": [
                    {
                        "type": "variables_set",
                        "id": "player_set",
                        "x": 10,
                        "y": 10,
                        "fields": {"VAR": {"id": "player_var"}},
                        "inputs": {
                            "VALUE": {
                                "block": {
                                    "type": "create_box",
                                    "id": "create_player_box",
                                    "inputs": {
                                        "NAME": {"block": {"type": "text", "fields": {"TEXT": "player"}}},
                                        "X": {"block": {"type": "math_number", "fields": {"NUM": 0}}},
                                        "Y": {"block": {"type": "math_number", "fields": {"NUM": 5}}},
                                        "Z": {"block": {"type": "math_number", "fields": {"NUM": 0}}}
                                    }
                                }
                            }
                        },
                        "next": {
                            "block": {
                                "type": "variables_set",
                                "id": "player_physics_set",
                                "fields": {"VAR": {"id": "player_var"}},
                                "inputs": {
                                    "VALUE": {
                                        "block": {
                                            "type": "enable_physics",
                                            "id": "enable_player_physics",
                                            "inputs": {
                                                "NAME": {"block": {"type": "variables_get", "fields": {"VAR": {"id": "player_var"}}}},
                                                "MASS": {"block": {"type": "math_number", "fields": {"NUM": 1}}}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "type": "variables_set",
                        "id": "vrm_set",
                        "x": 10,
                        "y": 150,
                        "fields": {"VAR": {"id": "vrm_var"}},
                        "inputs": {
                            "VALUE": {
                                "block": {
                                    "type": "import_3d_file_url",
                                    "id": "import_vrm",
                                    "fields": {
                                        "MODEL_URL": "https://raw.githubusercontent.com/digital-go-jp/VRMAvatarSample/main/VRM1.0/VRoid/AvatarSample_A.vrm"
                                    },
                                    "inputs": {
                                       "POS_X": {"block": {"type": "math_number", "fields": {"NUM": 0}}},
                                       "POS_Y": {"block": {"type": "math_number", "fields": {"NUM": 0}}},
                                       "POS_Z": {"block": {"type": "math_number", "fields": {"NUM": 0}}}
                                    }
                                }
                            }
                        },
                         "next": {
                            "block": {
                                "type": "variables_set",
                                "id": "vrm_physics_set",
                                "fields": {"VAR": {"id": "vrm_var"}},
                                "inputs": {
                                    "VALUE": {
                                        "block": {
                                            "type": "enable_physics",
                                            "id": "enable_vrm_physics",
                                            "inputs": {
                                                "NAME": {"block": {"type": "variables_get", "fields": {"VAR": {"id": "vrm_var"}}}},
                                                "MASS": {"block": {"type": "math_number", "fields": {"NUM": 0}}}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "type": "on_collision",
                        "id": "collision_handler",
                        "x": 10,
                        "y": 350,
                        "inputs": {
                            "OBJECT1": {"block": {"type": "variables_get", "fields": {"VAR": {"id": "player_var"}}}},
                            "OBJECT2": {"block": {"type": "variables_get", "fields": {"VAR": {"id": "vrm_var"}}}},
                            "DO": {
                                "block": {
                                    "type": "console_log",
                                    "id": "log_collision",
                                    "inputs": {
                                        "VALUE": {
                                            "block": {
                                                "type": "text",
                                                "id": "collision_text",
                                                "fields": {"TEXT": "COLLISION_DETECTED"}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ],
                "variables": [
                    {"name": "player", "id": "player_var"},
                    {"name": "vrm_model", "id": "vrm_var"}
                ]
            }
        }


        # Go to the page
        await page.goto("http://127.0.0.1:4000/engine/")

        # Click the start button
        await page.click("#start-button")

        # Click the preview tab
        await page.click("#preview-tab")

        # Load the workspace
        await page.evaluate(f'Blockly.serialization.workspaces.load({workspace_json}, workspace);')

        # Run the code and wait for collision message
        async with page.expect_console_message(predicate=lambda msg: "COLLISION_DETECTED" in msg.text) as console_message_info:
            await page.click("#runButton")

        message = await console_message_info.value
        assert "COLLISION_DETECTED" in message.text

        await browser.close()
