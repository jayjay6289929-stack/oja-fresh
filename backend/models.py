import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, Text, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
from database import Base


def generate_uuid() -> str:
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id         = Column(String, primary_key=True, default=generate_uuid)
    email      = Column(String, nullable=False, unique=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    orders = relationship("Order", back_populates="user")


class Product(Base):
    __tablename__ = "products"

    id          = Column(String, primary_key=True, default=generate_uuid)
    name        = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    price       = Column(Float, nullable=False)
    category    = Column(String, nullable=False)
    image       = Column(String, nullable=True)
    rating      = Column(Float, default=0.0)
    reviews     = Column(Integer, default=0)
    tags        = Column(JSON, default=list)


class Order(Base):
    __tablename__ = "orders"

    id            = Column(String, primary_key=True, default=generate_uuid)
    customer_name = Column(String, nullable=False)
    phone         = Column(String, nullable=True)
    address       = Column(Text, nullable=True)
    city          = Column(String, nullable=True)
    total_price   = Column(Float, nullable=False)
    status        = Column(String, default="pending")
    created_at    = Column(DateTime, default=datetime.utcnow)

    # Nullable so existing guest orders are not broken
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    user    = relationship("User", back_populates="orders")

    items = relationship("OrderItem", back_populates="order", lazy="joined")


class OrderItem(Base):
    __tablename__ = "order_items"

    id         = Column(Integer, primary_key=True, autoincrement=True)
    order_id   = Column(String, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    quantity   = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")