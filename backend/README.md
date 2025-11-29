# GiziSync Backend

The REST API server for GiziSync, built with Node.js, Express, and MongoDB.

## Features
- **Authentication**: JWT-based auth for Admins and Kitchen Operators.
- **Kitchen Management**: CRUD operations for kitchen profiles.
- **Reporting**: Handle daily procurement reports and receipt uploads.
- **Commodities**: Manage market prices for anomaly detection.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: Helmet, CORS, BCrypt

## Setup & Run

1. **Install Dependencies**
   ```bash
   bun install
   ```

2. **Environment Variables**
   Create a `.env` file in this directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/gizisync
   JWT_SECRET=your_secret_key
   ```

3. **Run Server**
   ```bash
   bun run dev
   ```

## API Endpoints
- `POST /api/auth/register`: Register new user.
- `POST /api/auth/login`: Login user.
- `GET /api/kitchens`: Get all kitchens.
- `POST /api/reports`: Submit daily report.
- `GET /api/commodities`: Get commodity prices.
