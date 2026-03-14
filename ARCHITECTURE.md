# Architecture — Ọjà Fresh

## Overview

Ọjà Fresh is a full-stack web application built on a strict client-server separation. The frontend and backend are two completely independent applications that communicate exclusively through HTTP. They share no code, no imports, and no file system access to each other.

```
Browser
  │
  ├── React App (localhost:5173)
  │     Fetches data from API
  │
  └── FastAPI (localhost:8000)
        Reads/writes SQLite database
```

---

## Frontend Architecture

```
src/app/
├── api/                    API client layer
│   ├── client.ts           Base fetch utility — single source of API URL
│   ├── products.ts         fetchProducts(), fetchProductById()
│   └── orders.ts           createOrder(), buildOrderPayload()
│
├── components/             Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
│
├── pages/                  Route-level page components
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── NotFound.tsx
│
├── store/
│   └── CartContext.tsx      Global cart state via React Context
│
├── types/
│   └── index.ts            Shared TypeScript interfaces
│
├── layouts/
│   └── MainLayout.tsx      Shared Navbar + Footer wrapper
│
└── routes.ts               React Router route definitions
```

### Layer Responsibilities

**`api/`** — The only place that knows the backend URL exists. All network calls go through `client.ts`. Page components never call `fetch()` directly. This means changing the API URL, adding auth headers, or switching to a different HTTP library requires changes in one place only.

**`pages/`** — Each page component owns its own loading state, error state, and data fetching. Pages import from `api/` to get data and from `store/` to access cart state. Pages never talk to each other directly.

**`store/CartContext.tsx`** — Cart state is the only global state in the application. It uses React Context with `localStorage` persistence. It exports computed values (`vat`, `grandTotal`) so no page recalculates totals independently, avoiding the inconsistency bug where Cart and Checkout showed different totals.

**`types/index.ts`** — `Product` and `CartItem` interfaces are defined once and imported everywhere. The backend's Pydantic schema shapes must match these interfaces.

---

## Backend Architecture

```
backend/
├── main.py                 App entry point — CORS, router registration only
│
├── database.py             Engine, SessionLocal, Base, get_db dependency
│
├── models.py               SQLAlchemy ORM table definitions — zero logic
│
├── schemas/
│   ├── product.py          ProductOut, ProductListParams
│   └── order.py            OrderIn, OrderOut, CartItemIn, OrderItemOut
│
├── services/
│   ├── product_service.py  All product query and filter logic
│   └── order_service.py    All order creation and retrieval logic
│
├── routers/
│   ├── products.py         HTTP route declarations — calls product_service
│   └── orders.py           HTTP route declarations — calls order_service
│
├── migrations/             Alembic migration history
│
└── seed.py                 One-time data population script
```

### Layer Responsibilities

**`routers/`** — Thin HTTP layer only. Each route handler should be approximately 3 lines: extract parameters, call a service function, return the result. No business logic, no ORM queries, no direct database access.

**`services/`** — All business logic lives here. `product_service.py` owns all query building, filtering, and sorting. `order_service.py` owns product validation, total calculation, and the full order creation transaction. Services are importable and testable without an HTTP context.

**`schemas/`** — Input validation and output serialisation. Pydantic models define the contract between the API and its callers. `from_attributes=True` enables automatic conversion from SQLAlchemy ORM objects to JSON-serialisable responses.

**`models.py`** — Pure table definitions. No methods, no properties, no imports from services or routers. The only place that defines what the database tables look like.

**`database.py`** — The `get_db` dependency yields a database session for each request and closes it after the request completes, regardless of whether it succeeded or raised an exception.

---

## Database Schema

```
products
├── id           TEXT  PRIMARY KEY  (UUID string)
├── name         TEXT  NOT NULL
├── description  TEXT
├── price        REAL  NOT NULL
├── category     TEXT  NOT NULL
├── image        TEXT
├── rating       REAL
├── reviews      INTEGER
└── tags         JSON              (stored as a JSON array)

orders
├── id            TEXT  PRIMARY KEY  (UUID string)
├── customer_name TEXT  NOT NULL
├── phone         TEXT
├── address       TEXT
├── city          TEXT
├── total_price   REAL  NOT NULL
├── status        TEXT  DEFAULT 'pending'
└── created_at    DATETIME

order_items
├── id          INTEGER  PRIMARY KEY  AUTOINCREMENT
├── order_id    TEXT     FOREIGN KEY → orders.id
├── product_id  TEXT     FOREIGN KEY → products.id
├── quantity    INTEGER  NOT NULL
└── unit_price  REAL     NOT NULL
```

`unit_price` is stored on `order_items` deliberately — it captures the price at the time of purchase. If a product's price changes later, historical orders remain accurate.

---

## Request Flow — Browsing Products

```
User visits /products
      │
      ▼
Products.tsx mounts
      │
      ▼
useEffect calls fetchProducts({ category, search, sort })
      │
      ▼
api/products.ts builds query string, calls apiFetch()
      │
      ▼
GET http://localhost:8000/api/products?category=Proteins
      │
      ▼
routers/products.py receives request
      │
      ▼
calls product_service.get_all_products(db, params)
      │
      ▼
SQLAlchemy query runs against SQLite
      │
      ▼
List[Product] ORM objects returned to service
      │
      ▼
FastAPI serialises via ProductOut schema → JSON
      │
      ▼
Response arrives in browser
      │
      ▼
setProducts(data) → React re-renders grid
```

---

## Request Flow — Placing an Order

```
User submits checkout form
      │
      ▼
Checkout.tsx handleOrder() fires
      │
      ▼
buildOrderPayload() constructs { customer_name, phone, address, city, items[] }
      │
      ▼
api/orders.ts POSTs payload to /api/orders
      │
      ▼
routers/orders.py receives OrderIn body
      │
      ▼
calls order_service.create_order(db, order_in)
      │
      ├── validates each product_id exists
      ├── calculates total from live prices
      ├── creates Order record
      ├── flushes to get order.id
      ├── creates OrderItem records
      └── commits transaction
      │
      ▼
OrderOut schema serialised → { id, status, total_price, items }
      │
      ▼
Frontend receives order.id
      │
      ▼
setOrderId(order.id) → confirmation screen shows real order ID
```

---

## Key Design Decisions

**SQLite over PostgreSQL** — For a final year project with a single developer and no concurrent write load, SQLite eliminates infrastructure dependencies. The application runs from a single `.db` file with zero configuration.

**Alembic for migrations** — Rather than calling `Base.metadata.create_all()` at startup, Alembic owns schema creation. This means schema changes are tracked, versioned, and reversible — a more realistic representation of how production databases are managed.

**Cart in localStorage, not the server** — The cart is ephemeral by nature and tied to a single browser session. Storing it server-side would require user authentication, which is out of scope. localStorage provides adequate persistence for the use case.

**Prices stored on OrderItem** — `unit_price` is copied from the product at order creation time. This protects historical order data from future price changes on the product record.

**Service layer separation** — Routers contain no business logic. Services contain no HTTP concerns. This means service functions can be called from tests, scripts, or future background jobs without needing an HTTP request context.