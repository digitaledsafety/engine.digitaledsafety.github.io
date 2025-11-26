
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Listen for all console events and print them
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

        try:
            # Wait for the server to start
            await asyncio.sleep(10)

            # Navigate to the local Jekyll server
            await page.goto("http://127.0.0.1:4000/engine/")

            # Start waiting for the console message BEFORE clicking the button
            async with page.expect_console_message(
                predicate=lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text,
                timeout=30000
            ):
                print("Waiting for scene to load...")
                # Click the "Start Coding" button on the hero overlay, which triggers the scene load
                await page.locator("#start-button").click()

            # After the scene is ready, check the loading screen visibility
            loading_screen = await page.query_selector("#customLoadingScreen")
            if loading_screen:
                is_visible = await loading_screen.is_visible()
                if is_visible:
                    print("Verification failed: Loading screen is still visible after scene load.")
                else:
                    print("Verification successful: Loading screen is hidden after scene load.")
            else:
                print("Verification successful: Loading screen element was removed after scene load.")

        except Exception as e:
            print(f"An error occurred during verification: {e}")

        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
