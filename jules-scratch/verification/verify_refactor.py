import asyncio
from playwright.async_api import async_playwright, expect
from pathlib import Path

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Get the absolute path to the index.html file
        file_path = Path.cwd() / "index.html"
        file_url = file_path.as_uri()

        # Set up a listener for the console message BEFORE navigating
        async with page.expect_console_message(predicate=lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text) as console_message_info:
            await page.goto(file_url)

        # Wait for the message to be received
        await console_message_info.value
        print("SCENE_READY message received.")

        # Give the scene a moment to fully render after the signal
        await page.wait_for_timeout(1000)

        # Verify the canvas is present
        canvas_locator = page.locator("#gameCanvas")
        await expect(canvas_locator).to_be_visible()
        print("Canvas is visible.")

        await page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())