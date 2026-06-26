from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

#################################################
################### REQUESTS ###################
################################################

class UserSignupRequest(BaseModel):
    username: str
    password: str
    email: EmailStr
    image: Optional[str] = None


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


#################################################
################### RESPONSES ###################
#################################################

class UserSignupResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    image: Optional[str] = None


class UserResponse(BaseModel):
    data: UserSignupResponse | None
    detail: str


#################################################
##################### OTHERS ####################
#################################################

class Token(BaseModel):
    user_id: int
    exp: Optional[int] = None
