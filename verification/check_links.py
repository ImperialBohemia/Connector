from playwright.sync_api import sync_playwright
import sys

def verify_safe_links():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000", timeout=60000)

            # Check "Claim Deal" link in Verdict
            # The text might be "Claim Deal for Sony WH-1000XM5" so strict name matching might fail if dynamic.
            # I will use partial text or the class.

            print("Checking links...")

            # Find the Verdict Section link
            # It usually contains "Claim Deal"
            links = page.get_by_role("link").all()
            found_safe = False

            for link in links:
                href = link.get_attribute("href")
                if href and "http" in href and "localhost" not in href:
                    rel = link.get_attribute("rel")
                    print(f"External Link: {href} | Rel: {rel}")
                    if rel and "nofollow" in rel and "sponsored" in rel:
                        found_safe = True
                    else:
                        print(f"❌ UNSAFE LINK FOUND: {href}")
                        sys.exit(1)

            if found_safe:
                print("✅ Found safe external links.")
            else:
                 print("⚠️ No external links found to check?")

            page.screenshot(path="verification/safe_links.png", full_page=True)
            print("Screenshot saved.")

        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_safe_links()
