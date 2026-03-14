# Ọjà Fresh — Nigerian Raw Food Store

A full-stack e-commerce application for purchasing raw Nigerian food ingredients online. Built as a final year project demonstrating a complete client-server architecture with a React frontend and a FastAPI backend.

---

## Project Structure

```
oja-fresh/
├── frontend/       React + TypeScript + Vite
└── backend/        FastAPI + SQLAlchemy + SQLite
```

---

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Frontend runtime |
| Python | 3.12+ | Backend runtime |
| uv | 0.10+ | Python package manager |

---

## Quick Start

You need two terminals running simultaneously — one for the backend, one for the frontend.

### Terminal 1 — Backend

```bash
cd backend

# Install dependencies
uv sync

# Create the database tables
uv run alembic upgrade head

# Seed the database with 16 products
uv run python seed.py

# Start the API server
uv run uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.
Interactive API documentation is at `http://localhost:8000/redoc`.

### Terminal 2 — Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create the environment file
echo "VITE_API_URL=http://localhost:8000" > .env.local

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend — `backend/.env`

```
DATABASE_URL=sqlite:///./oja_fresh.db
```

### Frontend — `frontend/.env.local`

```
VITE_API_URL=http://localhost:8000
```

Neither file should be committed to version control.

---

## Key Features

- Browse 16 raw Nigerian food products across 4 categories
- Filter by category and search by name
- Sort by popularity, rating, or price
- Add items to cart with persistent localStorage state
- Complete checkout with delivery details
- Orders saved to SQLite database with a unique order ID
- Real-time loading states and error handling

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products with optional filters |
| GET | `/api/products/{id}` | Get a single product |
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders/{id}` | Get an order by ID |

---

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Motion, Sonner

**Backend:** FastAPI, SQLAlchemy 2, Alembic, Pydantic v2, Uvicorn

**Database:** SQLite

**Package Managers:** npm (frontend), uv (backend)