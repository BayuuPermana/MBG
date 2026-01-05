# Bolt's Journal

This journal tracks critical performance learnings for the GiziSync project.

## Format
`## YYYY-MM-DD - [Title]`
`**Learning:** [Insight]`
`**Action:** [How to apply next time]`

## 2024-02-14 - Compound Index for Filter+Sort
**Learning:** Queries that filter by one field (equality) and sort by another need a compound index in that exact order `{ equalityField: 1, sortField: -1 }` to be efficient. Using two separate indexes often forces MongoDB to choose one and scan/sort in memory.
**Action:** When seeing `find({ status: '...' }).sort({ date: -1 })`, immediately check for `{ status: 1, date: -1 }` index.
