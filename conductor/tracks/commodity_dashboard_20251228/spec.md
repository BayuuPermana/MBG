# Specification: Commodity Pricing Dashboard

## 1. Overview
The Commodity Pricing Dashboard is a centralized interface for National Nutrition Agency (BGN) Administrators. It allows them to view, create, update, and track the prices of essential food commodities across different regions. This ensures that procurement costs are standardized and transparent, preventing price gouging and ensuring fair compensation for suppliers.

## 2. User Stories
- **As a BGN Admin**, I want to view a list of all commodities and their current reference prices so that I can monitor market trends.
- **As a BGN Admin**, I want to add new commodities to the system (e.g., "Beras Premium", "Telur Ayam") so that they can be tracked.
- **As a BGN Admin**, I want to update the price of a specific commodity for a specific region so that the system reflects current market rates.
- **As a BGN Admin**, I want to filter the commodity list by region or category so that I can focus on specific data.
- **As a BGN Admin**, I want to see a history of price changes for a commodity so that I can audit adjustments.

## 3. Functional Requirements
### 3.1 Backend API
- **Commodity Model:**
  - `name` (String, required)
  - `category` (String, required, e.g., "Karbohidrat", "Protein")
  - `unit` (String, required, e.g., "kg", "liter")
  - `price` (Number, required)
  - `region` (String, required, e.g., "Nasional", "Jawa Barat")
  - `history` (Array of objects: `{ price, date, updatedBy }`)
- **API Endpoints:**
  - `GET /api/commodities`: Retrieve all commodities (with query params for filtering).
  - `POST /api/commodities`: Create a new commodity.
  - `PUT /api/commodities/:id`: Update a commodity's price or details.
  - `GET /api/commodities/:id/history`: Retrieve price history.

### 3.2 Frontend UI
- **Dashboard Layout:** Integrate into the existing BGN Admin layout.
- **Commodity Table:**
  - Columns: Name, Category, Region, Current Price, Last Updated.
  - Actions: Edit, View History.
- **Add/Edit Modal:**
  - Form fields for name, category, region, price, and unit.
  - Validation: Price must be positive, name required.
- **Price History View:**
  - A simple list or chart showing price changes over time.

## 4. Non-Functional Requirements
- **Performance:** The dashboard should load within 2 seconds.
- **Security:** Only authenticated users with the 'BGN Admin' role can create or update prices. Read-only access for Kitchen Operators (future scope, but API should support role checks).
- **Usability:** Prices should be formatted in IDR (e.g., "Rp 12.000").

## 5. Tech Stack Alignment
- **Frontend:** React, Tailwind CSS, Shadcn UI (Table, Dialog, Form).
- **Backend:** Node.js, Express, MongoDB.
- **State:** React Query (or Axios with useEffect).
