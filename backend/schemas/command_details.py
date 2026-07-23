from datetime import datetime
from pydantic import BaseModel


class CommandDetailsRequest(BaseModel):
    ref_command: int
    ref_dish: int
    quantity: int
    unit_price: float

class CommandDetail(BaseModel):
    id: int
    ref_command: int
    ref_dish: int
    quantity: int
    unit_price: float
    created_at: datetime

class CommandDetailResponse(BaseModel):
    data: CommandDetail | None
    detail: str
