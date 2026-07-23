from pydantic import BaseModel, EmailStr


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

class DeliveryInfos(DeliveryInfosRequest):
    id: int

class DeliveryInfosResponse(BaseModel):
    data: DeliveryInfos | None
    detail: str