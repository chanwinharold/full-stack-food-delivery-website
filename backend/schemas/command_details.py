from datetime import datetime
from pydantic import BaseModel, field_validator


class CommandDetailsRequest(BaseModel):
    ref_command: int
    ref_dish: int
    quantity: int
    unit_price: float

    @field_validator("quantity")
    @classmethod
    def quantity_must_be_positive(cls, v):
        if v < 1:
            raise ValueError("Quantity must be at least 1")
        return v

    @field_validator("unit_price")
    @classmethod
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("Unit price must be positive")
        return v

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
