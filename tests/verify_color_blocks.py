
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            await page.goto("http://127.0.0.1:4000/engine/")

            # Click the "Start Coding" button
            await page.click("text=Start Coding")

            # Click the dropdown menu to reveal the "Toggle Toolbox" button
            await page.click("text=⋮")

            # Click the "Toggle Toolbox" button to make sure the toolbox is visible
            await page.click("text=☰ Hide Toolbox")

            # Click the "Colour" category in the toolbox
            await page.hover("div.blocklyTreeRow:has(span.blocklyTreeLabel:text-is('Colour'))")
            await page.click("div.blocklyTreeRow:has(span.blocklyTreeLabel:text-is('Colour'))")

            # Add a small delay to ensure the flyout is visible
            await page.wait_for_timeout(500)

            # Verify that the color blocks are present
            await expect(page.locator('div.blocklyFlyout g[data-id="colour_picker"]')).to_be_visible()
            await expect(page.locator('div.blocklyFlyout g[data-id="colour_random"]')).to_be_visible()
            await expect(page.locator('div.blocklyFlyout g[data-id="colour_rgb"]')).to_be_visible()
            await expect(page.locator('div.blocklyFlyout g[data-id="colour_blend"]')).to_be_visible()

            # Click the color picker to open the palette
            await page.click('div.blocklyFlyout g[data-id="colour_picker"] .blocklyEditableText')

            # Wait for the color picker widget to be visible
            await expect(page.locator('.blocklyColourTable')).to_be_visible()

            # Take a screenshot to verify
            await page.screenshot(path="tests/verification_screenshots/color_blocks.png")

            print("Test passed: Color blocks are present and the color picker is working.")

        except Exception as e:
            print(f"Test failed: {e}")
            await page.screenshot(path="tests/verification_screenshots/color_blocks_failure.png")

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
