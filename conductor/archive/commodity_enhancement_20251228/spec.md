# Specification: Commodities UI Enhancement & Standardized Categories

## 1. Overview
The current Commodities page works but needs a more polished and professional look to align with the "Clean & Authoritative" guidelines. Additionally, the `category` field is currently a free-text input, leading to inconsistent data. This track standardizes the input and improves the layout.

## 2. User Stories
- **As a BGN Admin**, I want to see a summary of commodities (total count, categories) at a glance.
- **As a BGN Admin**, I want to select from a predefined list of categories when adding/editing commodities to ensure data consistency.
- **As a BGN Admin**, I want a more visually appealing dashboard layout for price management.

## 3. Functional Requirements
### 3.1 Standardized Categories
- Replace text input with a `select` dropdown in `CommodityForm`.
- **Defined Categories:**
  - Karbohidrat (Beras, Jagung, dll)
  - Protein Hewani (Daging, Telur, dll)
  - Protein Nabati (Tahu, Tempe, dll)
  - Sayuran
  - Buah-buahan
  - Bumbu & Lainnya

### 3.2 UI Enhancements
- **Summary Stats:** Add cards at the top of `CommoditiesPage` showing:
  - Total Komoditas Terdaftar.
  - Jumlah Kategori Terpantau.
  - Tanggal Pembaruan Terakhir.
- **Table Polish:** Improve row hover states and spacing in `CommodityTable`.
- **Search & Sort Sync:** Ensure the search/sort functionality integrated previously remains visually consistent.

## 4. Non-Functional Requirements
- **Consistency:** Use Shadcn UI `Select` or standard browser `select` styled with Tailwind.
- **Accessibility:** Labels must be properly linked to the new dropdown.

## 5. Tech Stack Alignment
- **Frontend:** React, Tailwind CSS, Shadcn UI.
