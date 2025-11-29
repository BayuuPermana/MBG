# GiziSync Frontend

The frontend application for GiziSync, built with React, Vite, Tailwind CSS, and Shadcn UI.

## Features
- **Login Page**: Role-based access (Admin/Kitchen).
- **Dashboard (Admin)**: Real-time monitoring of inflation and kitchen stats.
- **Input Form (Kitchen)**: Daily procurement reporting with receipt upload.
- **Reports**: View generated SPJ and transaction history.

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI, Radix UI
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Setup & Run

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Run Development Server**
   ```bash
   bun run dev
   ```

3. **Build for Production**
   ```bash
   bun run build
   ```

## Folder Structure
- `/src/components/ui`: Shadcn UI components.
- `/src/pages`: Main application pages.
- `/src/context`: React Context (e.g., Auth).
- `/src/lib`: Utilities (Tailwind merge, etc.).
