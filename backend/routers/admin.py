from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import Order, OrderItem, Product
from dependencies.auth import get_current_user

router = APIRouter()


@router.get("/summary")
def admin_summary(db: Session = Depends(get_db), _user=Depends(get_current_user)):
    total_orders  = db.query(func.count(Order.id)).scalar() or 0
    total_revenue = db.query(func.sum(Order.total_price)).scalar() or 0.0
    status_rows = db.query(Order.status, func.count(Order.id)).group_by(Order.status).all()
    orders_by_status = {s: c for s, c in status_rows}
    top_rows = (
        db.query(Product.name, func.sum(OrderItem.quantity).label("total"))
        .join(OrderItem, OrderItem.product_id == Product.id)
        .group_by(Product.name)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(5)
        .all()
    )
    top_products = [{"name": n, "total_ordered": int(t)} for n, t in top_rows]
    return {
        "total_orders": total_orders,
        "total_revenue": round(float(total_revenue), 2),
        "orders_by_status": orders_by_status,
        "top_products": top_products,
    }
