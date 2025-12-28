# Plan: Global Search and Sorting

## Phase 1: Backend API Implementation

- [x] Task: Update `GET /api/users` for search and sort 690e039
    - [ ] Subtask: Write integration test for searching users by username and sorting
    - [ ] Subtask: Implement search (regex) and sort logic in `backend/routes/auth.js` (or users.js)

- [x] Task: Update `GET /api/commodities` for search and sort 6cb5a94
    - [ ] Subtask: Write integration test for searching commodities by name and sorting by price
    - [ ] Subtask: Implement search and sort logic in `backend/routes/commodities.js`

- [x] Task: Update `GET /api/kitchens` for search and sort a6c5aab
    - [ ] Subtask: Write integration test for searching kitchens
    - [ ] Subtask: Implement search and sort logic in `backend/routes/kitchens.js`

- [ ] Task: Update `GET /api/reports` for search and sort
    - [ ] Subtask: Write integration test for searching/sorting reports
    - [ ] Subtask: Implement logic in `backend/routes/reports.js`

- [ ] Task: Conductor - User Manual Verification 'Backend API Implementation' (Protocol in workflow.md)

## Phase 2: Frontend Components & Integration

- [ ] Task: Create Reusable SearchBar Component
    - [ ] Subtask: Implement `SearchBar.jsx` with debounce
    - [ ] Subtask: Write component test

- [ ] Task: Update CommodityTable to support Sorting
    - [ ] Subtask: Add `onSort` props and visual indicators to headers
    - [ ] Subtask: Refactor `CommodityTable.jsx`

- [ ] Task: Integrate Search/Sort into CommoditiesPage
    - [ ] Subtask: Update API calls to include `q`, `sortBy`, `order`
    - [ ] Subtask: Manage state in `CommoditiesPage.jsx`

- [ ] Task: Implement Search/Sort for UsersPage
    - [ ] Subtask: Integrate SearchBar and Sort logic into UsersPage

- [ ] Task: Implement Search/Sort for KitchensPage
    - [ ] Subtask: Integrate SearchBar and Sort logic into KitchensPage

- [ ] Task: Implement Search/Sort for ReportsPage
    - [ ] Subtask: Integrate SearchBar and Sort logic into ReportsPage

- [ ] Task: Conductor - User Manual Verification 'Frontend Components & Integration' (Protocol in workflow.md)
