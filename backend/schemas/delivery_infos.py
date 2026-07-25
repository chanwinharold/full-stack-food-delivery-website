from pydantic import BaseModel, EmailStr, field_validator


class DeliveryInfosRequest(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    phone: str
    street: str
    city: str
    state: str
    postal_code: int
    country: str
    ref_command: int

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

class DeliveryInfos(DeliveryInfosRequest):
    id: int

class DeliveryInfosResponse(BaseModel):
    data: DeliveryInfos | None
    detail: str
