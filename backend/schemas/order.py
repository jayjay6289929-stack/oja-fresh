from typing import List
from pydantic import BaseModel, ConfigDict


class CartItemIn(BaseModel):
    product_id: str
    quantity:   int


class OrderIn(BaseModel):
    customer_name: str
    phone:         str
    address:       str
    city:          str
    items:         List[CartItemIn]


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    product_id: str
    quantity:   int
    unit_price: float


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:          str
    status:      str
    total_price: float
    items:       List[OrderItemOut] = []