
import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Listen for uncaught exceptions in the page
        page.on("pageerror", lambda exc: print(f"Page error: {exc}"))

        # Use a file path to open the local HTML file
        await page.goto(f'file://{os.getcwd()}/index.html')

        # Wait for a bit to ensure the page has loaded
        await page.wait_for_timeout(2000)

        # Click the canvas to focus it, then click the box in the center
        # The box is at position (0, 1, 0) in the scene
        await page.locator('#gameCanvas').click(position={'x': 400, 'y': 300})

        # Wait for the "Color Changed" console message
        async with page.expect_console_message() as console_message_info:
            pass

        console_message = await console_message_info.value
        if "Color Changed" not in console_message.text:
             raise Exception("Color change was not logged to the console.")

        # Take a screenshot
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
