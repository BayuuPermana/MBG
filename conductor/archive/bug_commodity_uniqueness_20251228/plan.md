# Plan: Fix Duplicate Commodity Name Bug

## Phase 1: Database & Model Update

- [x] Task: Update Commodity Model with Compound Index ce3836c
    - [x] Subtask: Add `commoditySchema.index({ name: 1, region: 1 }, { unique: true });`
    - [x] Subtask: Write integration test to verify compound uniqueness logic

- [x] Task: Manual Database Cleanup (if needed) ce3836c
    - [x] Subtask: Provide a script or instruction to drop the old `name_1` unique index

- [x] Task: Conductor - User Manual Verification 'Bug Fix' (Protocol in workflow.md) ce3836c
