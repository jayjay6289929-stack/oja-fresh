from fastapi import HTTPException
from sqlalchemy.orm import Session
from models import Product
from schemas.product import ProductListParams


def get_all_products(db: Session, params: ProductListParams) -> list[Product]:
    query = db.query(Product)

    if params.category:
        query = query.filter(Product.category == params.category)

    if params.search:
        query = query.filter(Product.name.ilike(f"%{params.search}%"))

    if params.sort == "rating":
        query = query.order_by(Product.rating.desc())
    elif params.sort == "price_asc":
        query = query.order_by(Product.price.asc())
    elif params.sort == "price_desc":
        query = query.order_by(Product.price.desc())
    else:
        # default: popularity — highest reviews first
        query = query.order_by(Product.reviews.desc())

    return query.all()


def get_product_by_id(db: Session, product_id: str) -> Product:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product