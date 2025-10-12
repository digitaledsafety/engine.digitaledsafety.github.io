from playwright.async_api import async_playwright, expect
import asyncio

async def run_verification():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        try:
            first_peer_id_future = asyncio.Future()
            second_peer_id_future = asyncio.Future()

            def handle_console(msg):
                if "My peer ID is:" in msg.text:
                    peer_id = msg.text.split(": ")[1]
                    if not first_peer_id_future.done():
                        first_peer_id_future.set_result(peer_id)
                    elif not second_peer_id_future.done():
                        second_peer_id_future.set_result(peer_id)

            page.on("console", handle_console)

            # Go to the page, which will trigger the first run automatically
            await page.goto("file:///app/index.html", timeout=90000)

            # 1. Wait for the first Peer ID from the automatic run
            print("--- Waiting for first Peer ID (on load) ---")
            first_peer_id = await asyncio.wait_for(first_peer_id_future, timeout=60)
            print(f"Got first Peer ID: {first_peer_id}")

            # 2. Trigger the second run manually
            print("--- Triggering second run ---")
            await page.evaluate("window.doRun()")

            # 3. Wait for the second Peer ID
            print("--- Waiting for second Peer ID ---")
            second_peer_id = await asyncio.wait_for(second_peer_id_future, timeout=60)
            print(f"Got second Peer ID: {second_peer_id}")

            # 4. Verify that the IDs are different
            if first_peer_id == second_peer_id:
                raise Exception(f"Peer ID did not change on second run. Got '{first_peer_id}' both times.")
            else:
                print("Verification successful: Peer ID changed on second run.")

            # Take a screenshot
            await page.screenshot(path="jules-scratch/verification/multiplayer_restart_verification.png")
            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_verification())