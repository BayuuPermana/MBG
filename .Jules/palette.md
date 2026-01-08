## 2025-12-14 - Login Loading & Accessibility
**Learning:** shadcn/ui Button component doesn't have a built-in `loading` prop.
**Action:** Must manually implement loading state using `disabled={loading}` and conditionally rendering a spinner (e.g., `Loader2` from `lucide-react`) inside the button children.
**Learning:** Browser autofill is inconsistent without explicit attributes.
**Action:** Always add `autoComplete="username"` and `autoComplete="current-password"` to login forms to support password managers and accessibility tools.

## 2025-12-14 - File Input Accessibility
**Learning:** `className="hidden"` removes elements from the accessibility tree, making them inaccessible to keyboard and screen reader users.
**Action:** Use `sr-only` to visually hide the input but keep it in the DOM. Use the `peer` class on the input and `peer-focus-visible` on the associated label to show a visual focus indicator when the hidden input receives focus.
