from playwright.sync_api import sync_playwright
import time

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # 1. Verify Homepage
        print("Navigating to Homepage...")
        page.goto("http://localhost:3000")

        # Scroll to bottom to trigger animations
        print("Scrolling to trigger animations...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2) # Wait for animations
        page.evaluate("window.scrollTo(0, 0)") # Scroll back up? No, full page screenshot handles it.

        # Actually, let's just scroll down in steps
        page.evaluate("window.scrollTo(0, 500)")
        time.sleep(0.5)
        page.evaluate("window.scrollTo(0, 1000)")
        time.sleep(0.5)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)

        page.screenshot(path="verification/homepage_scrolled.png", full_page=True)
        print("Homepage screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_site()
