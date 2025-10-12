import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Start listening for the console message BEFORE navigating
        async with page.expect_console_message(predicate=lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text) as console_info:
            await page.goto(f"file://{os.getcwd()}/index.html")

        await console_info.value
        print("Initial scene loaded.")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="jules-scratch/verification/level1.png")
        print("Level 1 screenshot taken.")

        # Directly trigger level change for verification
        await page.evaluate("sceneManager.loadLevel('level2')")
        print("loadLevel('level2') called.")

        # Give the scene time to render the new level's objects
        await page.wait_for_timeout(2000)

        await page.screenshot(path="jules-scratch/verification/level2.png")
        print("Level 2 screenshot taken.")

        await browser.close()

if __name__ == "__main__":
    import os
    asyncio.run(main())