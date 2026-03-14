from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, orders

app = FastAPI(
    title="Ọjà Fresh API",
    version="1.0.0",
    swagger_ui_parameters={"syntaxHighlight": False},
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(orders.router,   prefix="/api/orders",   tags=["orders"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Ọjà Fresh API is running"}