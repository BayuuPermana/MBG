## 2025-12-14 - Login Loading & Accessibility
**Learning:** shadcn/ui Button component doesn't have a built-in `loading` prop.
**Action:** Must manually implement loading state using `disabled={loading}` and conditionally rendering a spinner (e.g., `Loader2` from `lucide-react`) inside the button children.
**Learning:** Browser autofill is inconsistent without explicit attributes.
**Action:** Always add `autoComplete="username"` and `autoComplete="current-password"` to login forms to support password managers and accessibility tools.

## 2025-12-14 - File Input Accessibility
**Learning:** `display: none` or `hidden` on file inputs removes them from the accessibility tree, making them inaccessible to keyboard users.
**Action:** Use `sr-only` (screen reader only) to visually hide the input while keeping it focusable. Use the `peer` class on the input and `peer-focus-visible` utility classes on the associated label to show visual focus rings when the hidden input is focused.
