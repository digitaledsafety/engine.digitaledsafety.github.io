import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Set up a listener for all console messages
        # Corrected: msg.type and msg.text are properties, not methods
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.type}: {msg.text}"))

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('index.html')

        # Navigate to the local file
        await page.goto(f'file://{file_path}')

        # Wait for a bit to ensure all scripts have loaded and executed
        await page.wait_for_timeout(2000)

        # Take a screenshot of the entire page to get full context
        await page.screenshot(path='jules-scratch/verification/verification.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())