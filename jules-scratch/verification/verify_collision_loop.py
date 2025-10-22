from playwright.sync_api import sync_playwright

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for all console messages
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

        # Start waiting for the specific console message
        try:
            with page.expect_console_message(
                predicate=lambda msg: "JULES_VERIFICATION: SCENE_READY" in msg.text,
                timeout=10000  # Reduced timeout as it should be quick
            ) as console_message_info:
                # Navigate to the page. This will trigger the message.
                page.goto("file:///app/index.html")

            console_message = console_message_info.value
            print(f"Success message received: {console_message.text}")

        except Exception as e:
            print(f"An error occurred: {e}")
            print("The 'SCENE_READY' message was not received. Check the browser console output above for errors.")

        # Take screenshot regardless of success to aid debugging
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
