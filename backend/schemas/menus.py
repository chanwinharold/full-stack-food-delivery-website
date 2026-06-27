from typing import List
from pydantic import BaseModel


class MenuGetResponse(BaseModel):
    id: int
    name: str
    image: str

class MenuResponse(BaseModel):
    data: MenuGetResponse | List[MenuGetResponse]
    detail: str