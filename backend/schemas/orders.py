from datetime import datetime
from pydantic import BaseModel, EmailStr, field_validator


class OrderItemRequest(BaseModel):
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


class DeliveryInfoRequest(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    phone: str
    street: str
    city: str
    state: str
    postal_code: int
    country: str

    @field_validator("firstname", "lastname", "street", "city", "state", "country")
    @classmethod
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This field cannot be empty")
        return v.strip()

    @field_validator("phone")
    @classmethod
    def valid_phone(cls, v):
        if not v or len(v.strip()) < 6:
            raise ValueError("Please enter a valid phone number")
        return v.strip()


class CreateOrderRequest(BaseModel):
    items: list[OrderItemRequest]
    delivery: DeliveryInfoRequest

    @field_validator("items")
    @classmethod
    def must_have_items(cls, v):
        if not v:
            raise ValueError("Order must contain at least one item")
        return v


class OrderItemResponse(BaseModel):
    id: int
    ref_dish: int
    dish_name: str
    quantity: int
    unit_price: float


class DeliveryInfoResponse(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: str
    phone: str
    street: str
    city: str
    state: str
    postal_code: int
    country: str


class OrderResponse(BaseModel):
    id: int
    created_at: datetime
    items: list[OrderItemResponse]
    delivery: DeliveryInfoResponse | None
    total: float
    item_count: int


class CreateOrderResponse(BaseModel):
    data: OrderResponse | None
    detail: str


class OrdersListResponse(BaseModel):
    data: list[OrderResponse] | None
    detail: str
