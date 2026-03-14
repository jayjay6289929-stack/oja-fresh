from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:          str
    name:        str
    description: Optional[str] = None
    price:       float
    category:    str
    image:       Optional[str] = None
    rating:      float
    reviews:     int
    tags:        List[str] = []


class ProductListParams(BaseModel):
    category: Optional[str] = None
    search:   Optional[str] = None
    sort:     Optional[str] = "popularity"