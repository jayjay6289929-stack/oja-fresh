from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.order import OrderIn, OrderOut
from services import order_service
from dependencies.auth import get_current_user, get_optional_user
from models import User

router = APIRouter()


@router.post("/", response_model=OrderOut, status_code=201)
def create_order(
    order_in: OrderIn,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    user_id = current_user.id if current_user else None
    return order_service.create_order(db, order_in, user_id=user_id)


@router.get("/mine", response_model=list[OrderOut])
def my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return order_service.get_orders_by_user(db, current_user.id)


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    return order_service.get_order_by_id(db, order_id)