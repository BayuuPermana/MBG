# Plan: Commodity Pricing Dashboard

## Phase 1: Backend Implementation

- [x] Task: Create Mongoose model for Commodity 23ef55c
    - [ ] Subtask: Write tests for Commodity schema validation (required fields, types)
    - [ ] Subtask: Implement Commodity schema in `backend/models/Commodity.js`

- [x] Task: Implement `POST /api/commodities` endpoint 3dab91b
    - [ ] Subtask: Write integration test for creating a new commodity (success and validation error cases)
    - [ ] Subtask: Implement controller and route for commodity creation

- [ ] Task: Implement `GET /api/commodities` endpoint with filtering
    - [ ] Subtask: Write integration test for fetching commodities (all and filtered by region/category)
    - [ ] Subtask: Implement controller and route for fetching commodities

- [ ] Task: Implement `PUT /api/commodities/:id` endpoint
    - [ ] Subtask: Write integration test for updating commodity price and tracking history
    - [ ] Subtask: Implement controller and route for updating commodity

- [ ] Task: Conductor - User Manual Verification 'Backend Implementation' (Protocol in workflow.md)

## Phase 2: Frontend Integration

- [ ] Task: Setup Commodity API client
    - [ ] Subtask: Write unit tests for axios wrapper functions (`fetchCommodities`, `createCommodity`, `updateCommodity`)
    - [ ] Subtask: Implement API service functions in `frontend/src/lib/api/commodities.js`

- [ ] Task: Build Commodity Table Component
    - [ ] Subtask: Write component test for rendering table with mock data
    - [ ] Subtask: Implement `CommodityTable.jsx` using Shadcn UI Table

- [ ] Task: Build Add/Edit Commodity Modal
    - [ ] Subtask: Write component test for form validation and submission
    - [ ] Subtask: Implement `CommodityForm.jsx` using Shadcn UI Dialog and Form

- [ ] Task: Integrate components into Dashboard Page
    - [ ] Subtask: Implement `CommoditiesPage.jsx` and wire up state/data fetching
    - [ ] Subtask: Add navigation link to Sidebar

- [ ] Task: Conductor - User Manual Verification 'Frontend Integration' (Protocol in workflow.md)
