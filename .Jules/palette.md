## 2024-05-24 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** The application makes heavy use of `size="icon"` buttons (Edit, Delete, History) in tables and cards but consistently lacks `aria-label` attributes. While `title` attributes are sometimes present, they don't guarantee accessibility for screen reader users or mobile users.
**Action:** When using icon-only buttons, always include `aria-label` describing the action (e.g., `aria-label="Edit User"`). Ensure this is part of the standard pattern for any new list/card views.
