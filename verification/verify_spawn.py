from playwright.sync_api import sync_playwright

def verify_site_spawn():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to localhost:3000...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Waiting for Header...")
            page.wait_for_selector("text=Connector Reviews")

            print("Waiting for Cookie Consent...")
            page.wait_for_selector("text=Accept")

            print("Taking screenshot...")
            page.screenshot(path="verification_spawn.png", full_page=True)
            print("Screenshot saved to verification_spawn.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_site_spawn()
