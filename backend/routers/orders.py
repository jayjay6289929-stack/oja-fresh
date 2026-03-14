from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.order import OrderIn, OrderOut
from services import order_service

router = APIRouter()


@router.post("/", response_model=OrderOut, status_code=201)
def create_order(order_in: OrderIn, db: Session = Depends(get_db)):
    return order_service.create_order(db, order_in)


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    return order_service.get_order_by_id(db, order_id)