from playwright.sync_api import sync_playwright

def verify(page):
    # Check Root (First Web)
    page.goto("http://localhost:3001/")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="verification/root.png", full_page=True)
    print("Root screenshot taken")

    # Check Dashboard (Brain)
    page.goto("http://localhost:3001/dashboard")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="verification/dashboard.png", full_page=True)
    print("Dashboard screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        finally:
            browser.close()
