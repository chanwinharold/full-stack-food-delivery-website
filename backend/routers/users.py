from fastapi import APIRouter, status
from ..schemas import users as schema
from ..services.users import signup_service


router = APIRouter(prefix="/auth", tags=["Authentification"])


@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=schema.UserResponse)
def signup(user_: schema.UserCreateRequest):
    new_user_ = signup_service(user_)
    return {"data": new_user_, "detail": "User created successfully"}
