
import json
from playwright.sync_api import sync_playwright

def verify_input_page_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Bypassing auth by injecting user into localStorage
        user_data = {
            "username": "operator",
            "role": "operator",
            "kitchenId": {"name": "Test Kitchen", "_id": "6568a7b0c4b5c6d7e8f9a0b1"}
        }

        context = browser.new_context()

        # Init script to inject localStorage before page loads
        init_script = f"""
        localStorage.setItem('user', '{json.dumps(user_data)}');
        """
        context.add_init_script(init_script)

        page = context.new_page()

        # Mock API calls
        page.route("**/api/commodities", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body=json.dumps([
                {"_id": "1", "name": "Beras", "unit": "kg"},
                {"_id": "2", "name": "Telur", "unit": "kg"},
                {"_id": "3", "name": "Minyak Goreng", "unit": "liter"}
            ])
        ))

        try:
            # Navigate to Input Page
            # Assuming dev server is running on 5173
            page.goto("http://localhost:5173/input")

            # Wait for page content
            page.wait_for_selector("text=Form Belanja Harian")

            # 1. Verify File Input is visually hidden but present in DOM
            # The file input should have class 'sr-only' now (or equivalent utility)
            # We check if it is attached and has the class
            file_input = page.locator("input[type='file']")
            class_attr = file_input.get_attribute("class")
            print(f"File input classes: {class_attr}")

            if "sr-only" in class_attr:
                print("SUCCESS: File input has 'sr-only' class.")
            else:
                print("FAILURE: File input missing 'sr-only' class.")

            # 2. Verify Dynamic Inputs and Labels
            # Check if label has htmlFor matching input id
            # We expect 'commodity-0'
            label_commodity = page.locator("label[for='commodity-0']")
            input_commodity = page.locator("#commodity-0")

            if label_commodity.count() > 0 and input_commodity.count() > 0:
                print("SUCCESS: Label for commodity-0 found and Input with id commodity-0 found.")
            else:
                print("FAILURE: Label or Input for commodity-0 not found.")

            # 3. Verify Delete Button Accessibility
            # It should have aria-label="Hapus item"
            delete_btn = page.locator("button[aria-label='Hapus item']")
            if delete_btn.count() > 0:
                 print("SUCCESS: Delete button with aria-label='Hapus item' found.")
            else:
                 print("FAILURE: Delete button with aria-label not found.")

            # 4. Take Screenshot
            # We will focus on the delete button to see if it shows up (group-focus-within check is hard to screenshot statically, but we can try hovering or focusing)

            # Focus on the commodity select to trigger focus-within on the container
            input_commodity.focus()
            page.screenshot(path="verification/input_page_focus.png")
            print("Screenshot saved to verification/input_page_focus.png")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_input_page_accessibility()
