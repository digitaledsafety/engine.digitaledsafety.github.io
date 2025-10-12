from playwright.async_api import async_playwright, expect
import asyncio

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            console_message_future = asyncio.Future()
            def handle_console(msg):
                print(f"CONSOLE: {msg.text}")
                if "My peer ID is:" in msg.text:
                    if not console_message_future.done():
                        console_message_future.set_result(True)

            page.on("console", handle_console)

            await page.goto("file:///app/index.html", timeout=90000)

            # Wait for the peer ID to be logged
            await asyncio.wait_for(console_message_future, timeout=60)

            # Take a screenshot after the peer ID is available
            await page.screenshot(path="jules-scratch/verification/multiplayer_verification.png")

            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())