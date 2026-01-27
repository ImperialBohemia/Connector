from playwright.sync_api import sync_playwright

def verify_amazon_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the generated mock page
        url = "http://localhost:3000/best-wireless-headphones-2026"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for key elements to load
        page.wait_for_selector("h1") # Title
        page.wait_for_selector("text=Sony WH-1000XM5") # Best Value Product

        # Take a full page screenshot
        screenshot_path = "verification/headphones_page.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify_amazon_page()
