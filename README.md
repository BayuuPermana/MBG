# GiziSync (MBG Management Platform)

GiziSync is a fullstack web application designed to manage the "Makan Bergizi Gratis" (MBG) program. It connects Kitchen Operators (Cabang) with the National Nutrition Agency (Badan Gizi Nasional) to streamline procurement, reporting, and auditing.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, MongoDB
- **Language**: Indonesian (Bahasa Indonesia)

## Project Structure
- `/frontend`: The React client application.
- `/backend`: The Node.js/Express API server.

## Quick Start

### Prerequisites
- Node.js installed
- MongoDB installed and running

### 1. Setup Backend
```bash
cd backend
bun install
# Create a .env file with MONGO_URI
bun run dev
```

### 2. Setup Frontend
```bash
cd frontend
bun install
bun run dev
```

The application will be available at `http://localhost:5173` (Frontend) and `http://localhost:5000` (Backend).
