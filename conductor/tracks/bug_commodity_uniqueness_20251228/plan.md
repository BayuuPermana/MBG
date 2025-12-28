# Plan: Fix Duplicate Commodity Name Bug

## Phase 1: Database & Model Update

- [ ] Task: Update Commodity Model with Compound Index
    - [ ] Subtask: Add `commoditySchema.index({ name: 1, region: 1 }, { unique: true });`
    - [ ] Subtask: Write integration test to verify compound uniqueness logic

- [ ] Task: Manual Database Cleanup (if needed)
    - [ ] Subtask: Provide a script or instruction to drop the old `name_1` unique index

- [ ] Task: Conductor - User Manual Verification 'Bug Fix' (Protocol in workflow.md)
