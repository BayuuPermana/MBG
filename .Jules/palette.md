## 2024-05-23 - Micro-interactions for Row Actions
**Learning:** Using `group-focus-within:opacity-100` on hidden row actions (like delete buttons) is a powerful pattern to make "hover-only" UI accessible to keyboard users without changing the visual design for mouse users.
**Action:** Apply `group-focus-within` alongside `group-hover` for any action buttons that are conditionally revealed in a list or table row. Ensure the container has `group`.
