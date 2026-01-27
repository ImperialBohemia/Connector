from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_clusters(page: Page):
    base_url = "http://localhost:3000"

    # 1. Commercial (The "Money" Page)
    print("Navigating to Commercial Page...")
    page.goto(f"{base_url}/best-wireless-headphones-2026")
    expect(page.get_by_role("heading", name="Best Wireless Headphones 2026")).to_be_visible()
    expect(page.get_by_text("Finding the perfect pair of wireless headphones").first).to_be_visible()

    # 2. Transactional (The "Deal" Page)
    print("Navigating to Transactional Page...")
    page.goto(f"{base_url}/sony-wh-1000xm5-discount-code")
    expect(page.get_by_role("heading", name="Sony WH-1000XM5 Discount Code")).to_be_visible()
    expect(page.get_by_text("Don't pay full price").first).to_be_visible()

    # 3. Comparative (The "Versus" Page)
    print("Navigating to Comparative Page...")
    page.goto(f"{base_url}/sony-wh-1000xm5-vs-bose-quietcomfort-45")
    expect(page.get_by_role("heading", name="Sony WH-1000XM5 vs Bose QuietComfort 45")).to_be_visible()
    # Take screenshot of comparative page
    print("Taking screenshot of Comparative Page...")
    page.screenshot(path="verification/comparative_page.png", full_page=True)

    # 4. Informational (The "Guide" Page)
    print("Navigating to Informational Page...")
    page.goto(f"{base_url}/wireless-headphones-buying-guide-beginners")
    expect(page.get_by_role("heading", name="How to Choose Wireless Headphones")).to_be_visible()
    # Updated to match actual content in lib/sheets.ts
    expect(page.get_by_text("Active Noise Cancellation. LDAC.").first).to_be_visible()

    # 5. Alternative (The "Competitor" Page)
    print("Navigating to Alternative Page...")
    page.goto(f"{base_url}/top-alternatives-to-sony-wh-1000xm5")
    expect(page.get_by_role("heading", name="Top 5 Alternatives to Sony WH-1000XM5")).to_be_visible()
    expect(page.get_by_text("The Sony WH-1000XM5 is great, but").first).to_be_visible()

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_clusters(page)
            print("Verification successful! All 5 clusters verified.")
        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
            exit(1) # Ensure non-zero exit code on failure
        finally:
            browser.close()
