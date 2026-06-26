from datetime import datetime
from typing import Optional, Any
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

class UserAuthMeResponse(BaseModel):
    id: int
    username: str
    created_at: datetime

class UserResponse(BaseModel):
    data: UserSignupResponse | UserAuthMeResponse | None
    detail: str


#################################################
##################### OTHERS ####################
#################################################

class Token(BaseModel):
    user_id: int
    exp: int = 0
