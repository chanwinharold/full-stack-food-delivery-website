from typing import List
from pydantic import BaseModel


class DishGetResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stars: float
    image: str
    menu_id: int

class DishResponse(BaseModel):
    data: DishGetResponse | List[DishGetResponse]
    detail: str