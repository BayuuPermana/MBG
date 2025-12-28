# Specification: Global Search and Sorting

## 1. Overview
Users need to efficiently find specific data in large datasets. This track implements a standardized search and sorting mechanism across the four core modules: Kitchens, Commodities, Users, and Reports.

## 2. User Stories
- **As a User**, I want to search for items by name or key identifiers (e.g., username, kitchen name) so that I can quickly locate specific records.
- **As a User**, I want to sort tables by different columns (e.g., price, date, name) in ascending or descending order to analyze data trends.

## 3. Functional Requirements
### 3.1 Backend API Enhancements
- **Common Query Parameters:**
  - `q` or `search`: String for fuzzy search (case-insensitive regex on primary fields).
  - `sortBy`: Field name to sort by.
  - `order`: `asc` or `desc` (or `1`/`-1`).
- **Endpoints to Update:**
  - `GET /api/kitchens`: Search by name, location. Sort by name, createdAt.
  - `GET /api/commodities`: Search by name. Sort by price, name, category.
  - `GET /api/users`: Search by username, role. Sort by username, role.
  - `GET /api/reports`: Search by kitchen name (if populated) or date. Sort by date, status.

### 3.2 Frontend UI Enhancements
- **Search Bar Component:** A reusable input field that updates the list results (debounced).
- **Sortable Table Headers:** Clickable table headers that toggle sort order (Asc -> Desc -> Default).
- **Integration:** Apply these components to:
  - `KitchensPage`
  - `CommoditiesPage`
  - `UsersPage`
  - `ReportsPage`

## 4. Non-Functional Requirements
- **Performance:** Search should be efficient (indexed fields in MongoDB where possible).
- **UX:** Loading state should be visible while searching/sorting.

## 5. Tech Stack Alignment
- **Backend:** Mongoose (regex queries, `.sort()`).
- **Frontend:** React state for `searchQuery` and `sortConfig`.
