from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to DASHBOARD
        url = "http://localhost:3000/dashboard"
        print(f"Navigating to {url}")
        page.goto(url)

        # Check for specific dashboard text
        page.wait_for_selector("text=CONNECTOR BRAIN")
        print("✅ SUCCESS: Dashboard loaded at /dashboard.")

        browser.close()

if __name__ == "__main__":
    verify_dashboard()
