## 2024-05-23 - Input Page Accessibility Improvements
**Learning:** Hidden inputs (e.g., `type="file"`) often use `display: none` (`hidden` in Tailwind) which removes them from the accessibility tree, blocking keyboard users. The `sr-only` class is the correct accessible alternative.
**Action:** When hiding inputs that need to remain functional (like file uploads triggered by labels), always use `sr-only` instead of `hidden` to ensure keyboard accessibility. Also, ensure dynamic list items have unique IDs for proper `label-for` association.
