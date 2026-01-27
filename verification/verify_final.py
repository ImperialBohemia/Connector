from playwright.sync_api import sync_playwright

def verify(page):
    BASE_URL = "http://localhost:3000"

    print(f"🚀 Starting Visual Audit on {BASE_URL}")

    # 1. Desktop View (1280x800)
    print("🖥️  Auditing Desktop View...")
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")

    # Verify Critical Elements
    if page.locator("footer a[href='/privacy']").count() > 0:
        print("✅ Legal: Privacy Policy Link Found")
    else:
        print("❌ Legal: Privacy Policy Link MISSING")

    page.screenshot(path="verification/desktop_root.png", full_page=True)
    print("📸 Desktop Screenshot Saved")

    # 2. Mobile View (iPhone 13 Pro - 390x844)
    print("📱 Auditing Mobile View...")
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(f"{BASE_URL}/best-wireless-headphones-2026") # Check a Review Page
    page.wait_for_load_state("networkidle")

    # Verify Verdict Box & Sticky Elements
    if page.get_by_text("The Verdict").count() > 0:
         print("✅ UX: Verdict Box Verified")
    else:
         print("❌ UX: Verdict Box MISSING")

    page.screenshot(path="verification/mobile_review.png", full_page=True)
    print("📸 Mobile Screenshot Saved")

    print("✨ Audit Complete. Please review screenshots in verification/ folder.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Create a new context with user agent to simulate real browser
        context = browser.new_context(user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        page = context.new_page()
        try:
            verify(page)
        finally:
            browser.close()
