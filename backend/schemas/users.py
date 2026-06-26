from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class UserCreateRequest(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    image: Optional[str] = None

class UserGot(BaseModel):
    id: int
    username: str
    created_at: datetime
    email: Optional[str] = None
    image: Optional[str] = None

class UserResponse(BaseModel):
    data: UserGot
    detail: str
