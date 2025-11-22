import asyncio
import subprocess
import time
from playwright.async_api import async_playwright, expect

# Define the Jekyll server command
JEKYLL_CMD = ["bundle", "exec", "jekyll", "serve"]
BASE_URL = "http://127.0.0.1:4000/engine/"
SCREENSHOT_PATH = "hero_overlay_verification.png"

class JekyllServer:
    """Context manager for the Jekyll server."""
    def __init__(self):
        self.process = None

    async def __aenter__(self):
        print("Starting Jekyll server...")
        self.process = await asyncio.create_subprocess_exec(
            *JEKYLL_CMD,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        # Wait for the server to be ready
        # A more robust solution would be to check for a specific output line
        await asyncio.sleep(5)
        print("Jekyll server started.")
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.process:
            print("Stopping Jekyll server...")
            self.process.terminate()
            await self.process.wait()
            print("Jekyll server stopped.")

async def run_verification():
    """Runs the Playwright verification script."""
    async with JekyllServer():
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            try:
                print(f"Navigating to {BASE_URL}...")
                await page.goto(BASE_URL, wait_until="networkidle")

                # 1. Verify the hero overlay is visible initially
                hero_overlay = page.locator("#hero-overlay")
                await expect(hero_overlay).to_be_visible()
                print("Hero overlay is visible.")

                # 2. Take a screenshot of the initial state
                await page.screenshot(path=SCREENSHOT_PATH)
                print(f"Screenshot saved to {SCREENSHOT_PATH}")

                # 3. Find and click the "Start Coding" button
                start_button = page.locator("#start-button")
                await expect(start_button).to_be_visible()
                await start_button.click()
                print("Clicked the 'Start Coding' button.")

                # 4. Verify the hero overlay is now hidden
                await expect(hero_overlay).to_be_hidden()
                print("Hero overlay is hidden after click.")

                print("\n✅ Verification successful!")

            except Exception as e:
                print(f"\n❌ Verification failed: {e}")

            finally:
                await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())
