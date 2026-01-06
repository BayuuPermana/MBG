## 2024-05-23 - Dynamic Form Accessibility
**Learning:** In dynamic lists (like `.map()`), explicit `htmlFor` and `id` pairing is crucial for accessibility. Without it, screen readers can't associate labels with inputs, making the form unusable.
**Action:** Always generate unique IDs (e.g., `id="field-${index}"`) for inputs inside loops and match them in `htmlFor` on the label.

## 2024-05-23 - Keyboard Access for Hidden Actions
**Learning:** Elements hidden with `opacity-0` inside a `group-hover` container are inaccessible to keyboard users unless they become visible on focus.
**Action:** Use `focus-within:opacity-100` (on container) or `focus:opacity-100` (on element) alongside `group-hover:opacity-100` to ensure keyboard users can perceive and interact with the action.

## 2024-05-23 - Accessible Hidden Inputs
**Learning:** `display: none` (`hidden` class) removes elements from the accessibility tree. For file inputs that need custom styling, use `sr-only` instead.
**Action:** Use `sr-only` for the input and `peer` class + `peer-focus-visible` styles on the custom label/trigger to show focus state.
