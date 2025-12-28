# Plan: Global Search and Sorting

## Phase 1: Backend API Implementation [checkpoint: 3e19a4b]

- [x] Task: Update `GET /api/users` for search and sort 690e039
    - [x] Subtask: Write integration test for searching users by username and sorting
    - [x] Subtask: Implement search (regex) and sort logic in `backend/routes/auth.js` (or users.js)

- [x] Task: Update `GET /api/commodities` for search and sort 6cb5a94
    - [x] Subtask: Write integration test for searching commodities by name and sorting by price
    - [x] Subtask: Implement search and sort logic in `backend/routes/commodities.js`

- [x] Task: Update `GET /api/kitchens` for search and sort a6c5aab
    - [x] Subtask: Write integration test for searching kitchens
    - [x] Subtask: Implement search and sort logic in `backend/routes/kitchens.js`

- [x] Task: Update `GET /api/reports` for search and sort 10dc373
    - [x] Subtask: Write integration test for searching/sorting reports
    - [x] Subtask: Implement logic in `backend/routes/reports.js`

- [x] Task: Conductor - User Manual Verification 'Backend API Implementation' (Protocol in workflow.md) 3e19a4b

## Phase 2: Frontend Components & Integration [checkpoint: ac8a22b]

- [x] Task: Create Reusable SearchBar Component 887d622
    - [x] Subtask: Implement `SearchBar.jsx` with debounce
    - [x] Subtask: Write component test

- [x] Task: Update CommodityTable to support Sorting 5365ed1
    - [x] Subtask: Add `onSort` props and visual indicators to headers
    - [x] Subtask: Refactor `CommodityTable.jsx`

- [x] Task: Integrate Search/Sort into CommoditiesPage c316937
    - [x] Subtask: Update API calls to include `q`, `sortBy`, `order`
    - [x] Subtask: Manage state in `CommoditiesPage.jsx`

- [x] Task: Implement Search/Sort for UsersPage ac8a22b
    - [x] Subtask: Integrate SearchBar and Sort logic into UsersPage

- [x] Task: Implement Search/Sort for KitchensPage ac8a22b
    - [x] Subtask: Integrate SearchBar and Sort logic into KitchensPage

- [x] Task: Implement Search/Sort for ReportsPage ac8a22b
    - [x] Subtask: Integrate SearchBar and Sort logic into ReportsPage

- [x] Task: Conductor - User Manual Verification 'Frontend Components & Integration' (Protocol in workflow.md) ac8a22b
