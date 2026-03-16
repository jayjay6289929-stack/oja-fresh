from fastapi import HTTPException
from sqlalchemy.orm import Session
from models import Order, OrderItem
from schemas.order import OrderIn
from services.product_service import get_product_by_id


def create_order(db: Session, order_in: OrderIn, user_id: str | None = None) -> Order:
    line_items = []
    total = 0.0

    for item in order_in.items:
        product = get_product_by_id(db, item.product_id)
        subtotal = product.price * item.quantity
        total += subtotal
        line_items.append({
            "product_id": item.product_id,
            "quantity":   item.quantity,
            "unit_price": product.price,
        })

    order = Order(
        customer_name=order_in.customer_name,
        phone=order_in.phone,
        address=order_in.address,
        city=order_in.city,
        total_price=round(total, 2),
        user_id=user_id,
    )
    db.add(order)
    db.flush()

    for line in line_items:
        db.add(OrderItem(order_id=order.id, **line))

    db.commit()
    db.refresh(order)
    return order


def get_order_by_id(db: Session, order_id: str) -> Order:
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


def get_orders_by_user(db: Session, user_id: str) -> list[Order]:
    return (
        db.query(Order)
        .filter(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
        .all()
    )