# Development Guide — Ọjà Fresh

## Initial Setup

### 1. Clone and navigate to the project

```bash
git clone <your-repo-url>
cd oja-fresh
```

### 2. Set up the backend

```bash
cd backend

# Create the virtual environment and install all dependencies
uv sync

# Create your environment file
cp .env.example .env
# Or create it manually with:
echo "DATABASE_URL=sqlite:///./oja_fresh.db" > .env

# Run all database migrations
uv run alembic upgrade head

# Populate the database with product data
uv run python seed.py
```

### 3. Set up the frontend

```bash
cd frontend

# Install dependencies
npm install

# Create the environment file
echo "VITE_API_URL=http://localhost:8000" > .env.local
```

---

## Running the Application

Both servers must run simultaneously. Open two terminal windows.

**Terminal 1 — Backend**
```bash
cd backend
uv run uvicorn main:app --reload
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend app | http://localhost:5173 |
| API server | http://localhost:8000 |
| API docs (ReDoc) | http://localhost:8000/redoc |
| API docs (Swagger) | http://localhost:8000/docs |

---

## Project Conventions

### Backend

**Adding a new endpoint**

1. Add the route handler to the appropriate file in `routers/`
2. Write the business logic in the corresponding `services/` file
3. Add input/output Pydantic models to `schemas/`
4. The router calls the service — never the other way around

**Adding a new database column**

1. Add the column to the relevant class in `models.py`
2. Generate a migration: `uv run alembic revision --autogenerate -m "description of change"`
3. Review the generated file in `migrations/versions/` — always read it before applying
4. Apply: `uv run alembic upgrade head`
5. Never modify an already-applied migration file

**Running the seed script**

The seed script is idempotent — safe to run multiple times. It checks whether each product already exists before inserting.

```bash
uv run python seed.py
```

### Frontend

**Adding a new API call**

1. Add the function to the appropriate file in `src/app/api/`
2. Use `apiFetch<ReturnType>()` from `client.ts` — never call `fetch()` directly from a component
3. Match the TypeScript return type to what the backend schema returns

**Adding a new page**

1. Create the component in `src/app/pages/`
2. Add the route to `src/app/routes.ts`
3. The file extension must be `.tsx` if the file contains JSX, `.ts` if it is pure TypeScript

**Cart state**

Always read from and write to `CartContext` via the `useCart()` hook. Never manage cart state locally in a component. `grandTotal`, `vat`, and `totalPrice` are computed values exported from context — use them directly rather than recalculating.

---

## Database Management

### Check current migration state

```bash
uv run alembic current
```

### View migration history

```bash
uv run alembic history
```

### Rollback one migration

```bash
uv run alembic downgrade -1
```

### Reset the database entirely

```bash
# Delete the database file
rm oja_fresh.db

# Recreate tables from migrations
uv run alembic upgrade head

# Reseed
uv run python seed.py
```

### Inspect the database directly

If you have a SQLite viewer (DB Browser for SQLite, TablePlus, or the VS Code SQLite extension), open `backend/oja_fresh.db` directly to browse tables and rows.

From the command line:

```bash
uv run python -c "
from database import SessionLocal
from models import Product, Order
db = SessionLocal()
print('Products:', db.query(Product).count())
print('Orders:', db.query(Order).count())
db.close()
"
```

---

## Common Tasks

### Add a new product category

1. Add the category string to the `CATEGORIES` constant in `frontend/src/app/pages/Products.tsx`
2. The backend supports any category string — no backend changes needed

### Change the VAT rate or delivery fee

Both values are defined as named constants in `frontend/src/app/store/CartContext.tsx`:

```ts
const DELIVERY_FEE = 1500;
const VAT_RATE = 0.075;
```

Change them here and they propagate to Cart, Checkout, and any other consumer automatically.

### Add a new sort option

**Frontend** — add the display label to the sort dropdown in `Products.tsx` and add a mapping entry to `SORT_MAP`:

```ts
const SORT_MAP: Record<string, string> = {
  "Popularity":          "popularity",
  "Rating":              "rating",
  "Price: Low to High":  "price_asc",
  "Price: High to Low":  "price_desc",
  "New Arrivals":        "newest",     // add this
};
```

**Backend** — add the corresponding `elif` branch in `services/product_service.py`:

```python
elif params.sort == "newest":
    query = query.order_by(Product.id.desc())
```

---

## Debugging

### Blank white screen in the browser

1. Open DevTools → Console tab — look for red errors
2. Check the terminal running `npm run dev` for build errors
3. Common cause: a `.ts` file contains JSX — rename it to `.tsx`
4. Common cause: a named export doesn't exist in the imported module — check the export statement

### API returns 422 Unprocessable Entity

The request body doesn't match the Pydantic schema. The response body will tell you exactly which field failed and why. Check the Network tab in DevTools, click the failing request, and read the Response tab.

### API returns 404 for a product

The product ID in the request doesn't exist in the database. Check that `seed.py` ran successfully and that you're using the correct ID format (string, not integer).

### CORS error in the browser console

The frontend URL doesn't match the `allow_origins` list in `backend/main.py`. The default is `http://localhost:5173`. If your frontend is running on a different port, update `allow_origins` accordingly.

### `uv run` fails with "no virtual environment found"

Run `uv sync` from inside the `backend/` folder to recreate the virtual environment.

### Swagger UI at `/docs` loads forever

Swagger UI fetches its JavaScript from a CDN. If the CDN is blocked on your network, use ReDoc instead at `http://localhost:8000/redoc` — it uses a different CDN and is more reliable on restricted networks.

---

## Git Workflow

### What to commit

```
✓ All source files (*.py, *.tsx, *.ts, *.css)
✓ migrations/versions/*.py  (migration history)
✓ pyproject.toml and uv.lock
✓ package.json and package-lock.json
✓ .env.example (with placeholder values, not real values)
```

### What not to commit

```
✗ .env and .env.local  (contain secrets/local config)
✗ oja_fresh.db         (generated file)
✗ __pycache__/         (generated)
✗ .venv/               (generated)
✗ node_modules/        (generated)
✗ dist/                (generated)
```

---

## Demo Day Checklist

Run through this sequence from a clean state before presenting.

```bash
# Reset the database
cd backend
rm -f oja_fresh.db
uv run alembic upgrade head
uv run python seed.py

# Start backend
uv run uvicorn main:app --reload

# In a second terminal, start frontend
cd frontend
npm run dev
```

Then verify each step works end to end:

- [ ] Homepage loads with 4 featured products
- [ ] Products page shows all 16 products
- [ ] Category filter returns correct subset
- [ ] Search for "yam" returns matching products
- [ ] Product detail page loads with related products
- [ ] Add a product to cart — badge updates
- [ ] Cart page shows correct subtotal, VAT, and total
- [ ] Checkout form submits successfully
- [ ] Confirmation screen shows a real order ID
- [ ] Verify order in API: `GET /api/orders/{id}` at `localhost:8000/redoc`