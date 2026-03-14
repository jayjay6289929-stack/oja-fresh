from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database import get_db
from schemas.product import ProductOut, ProductListParams
from services import product_service

router = APIRouter()


@router.get("/", response_model=List[ProductOut])
def list_products(
    category: Optional[str] = Query(None),
    search:   Optional[str] = Query(None),
    sort:     Optional[str] = Query("popularity"),
    db: Session = Depends(get_db),
):
    params = ProductListParams(category=category, search=search, sort=sort)
    return product_service.get_all_products(db, params)


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    return product_service.get_product_by_id(db, product_id)