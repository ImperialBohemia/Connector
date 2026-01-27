from playwright.sync_api import sync_playwright

def verify_root_content():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to ROOT (should now be the content page)
        url = "http://localhost:3000/"
        print(f"Navigating to {url}")
        page.goto(url)

        # Check for specific content text
        page.wait_for_selector("h1")
        title = page.locator("h1").inner_text()
        print(f"Root Page Title: {title}")

        if "Best Wireless Headphones" in title:
            print("✅ SUCCESS: Root page displays content.")
        else:
            print("❌ FAILURE: Root page does not match expected content.")

        browser.close()

if __name__ == "__main__":
    verify_root_content()
