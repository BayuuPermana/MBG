# Plan: Commodity Pricing Dashboard

## Phase 1: Backend Implementation [checkpoint: 6e33454]

- [x] Task: Create Mongoose model for Commodity 23ef55c
    - [ ] Subtask: Write tests for Commodity schema validation (required fields, types)
    - [ ] Subtask: Implement Commodity schema in `backend/models/Commodity.js`

- [x] Task: Implement `POST /api/commodities` endpoint 3dab91b
    - [ ] Subtask: Write integration test for creating a new commodity (success and validation error cases)
    - [ ] Subtask: Implement controller and route for commodity creation

- [x] Task: Implement `GET /api/commodities` endpoint with filtering f7e2592
    - [ ] Subtask: Write integration test for fetching commodities (all and filtered by region/category)
    - [ ] Subtask: Implement controller and route for fetching commodities

- [x] Task: Implement `PUT /api/commodities/:id` endpoint eb5a69c
    - [ ] Subtask: Write integration test for updating commodity price and tracking history
    - [ ] Subtask: Implement controller and route for updating commodity

- [ ] Task: Conductor - User Manual Verification 'Backend Implementation' (Protocol in workflow.md)

## Phase 2: Frontend Integration

- [x] Task: Setup Commodity API client 5e493ff
    - [ ] Subtask: Write unit tests for axios wrapper functions (`fetchCommodities`, `createCommodity`, `updateCommodity`)
    - [ ] Subtask: Implement API service functions in `frontend/src/lib/api/commodities.js`

- [x] Task: Build Commodity Table Component 948bb19
    - [ ] Subtask: Write component test for rendering table with mock data
    - [ ] Subtask: Implement `CommodityTable.jsx` using Shadcn UI Table

- [x] Task: Build Add/Edit Commodity Modal af6c0ff
    - [ ] Subtask: Write component test for form validation and submission
    - [ ] Subtask: Implement `CommodityForm.jsx` using Shadcn UI Dialog and Form

- [ ] Task: Integrate components into Dashboard Page
    - [ ] Subtask: Implement `CommoditiesPage.jsx` and wire up state/data fetching
    - [ ] Subtask: Add navigation link to Sidebar

- [ ] Task: Conductor - User Manual Verification 'Frontend Integration' (Protocol in workflow.md)
