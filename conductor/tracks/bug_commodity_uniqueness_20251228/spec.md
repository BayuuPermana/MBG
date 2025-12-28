# Specification: Allow Duplicate Commodity Names Across Regions

## 1. Overview
Users cannot add commodities with the same name (e.g., "Beras SPHP") if they belong to different regions. This is likely caused by a stale or incorrect unique index on the `name` field in MongoDB.

## 2. Problem Statement
- Validation error or database error when attempting to save a commodity with a name that already exists in another region.
- Requirement: "Beras SPHP" in "Jawa Barat" and "Beras SPHP" in "Jawa Tengah" should both be allowed.

## 3. Proposed Fix
- **Database Index:** Drop the existing unique index on `name`.
- **Compound Index:** Add a compound unique index on `{ name: 1, region: 1 }`. This ensures that a specific commodity name is unique *within a region*, but can be duplicated across different regions.
- **Mongoose Schema:** Explicitly define the compound index in the schema.

## 4. Verification
- Attempt to create two commodities with the same name but different regions.
- Attempt to create two commodities with the same name AND same region (should fail).
