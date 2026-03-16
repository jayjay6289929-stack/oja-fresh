from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, orders, auth, admin

app = FastAPI(
    title="Ọjà Fresh API",
    version="1.1.0",
    swagger_ui_parameters={"syntaxHighlight": False},
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(orders.router,   prefix="/api/orders",   tags=["orders"])
app.include_router(auth.router,     prefix="/auth",         tags=["auth"])
app.include_router(admin.router,    prefix="/api/admin",    tags=["admin"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Ọjà Fresh API is running"}