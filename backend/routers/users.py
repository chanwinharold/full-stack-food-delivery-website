from fastapi import APIRouter, status, Response, Depends
from core.config import JWT_EXPIRES_IN, COOKIE_SECURE
from schemas import users as schema
from services.users import signup_service, login_service, get_current_user


router = APIRouter(prefix="/auth", tags=["Authentification"])


@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=schema.UserResponse)
def signup(user_: schema.UserSignupRequest):
    new_user_ = signup_service(user_)
    return {"data": new_user_, "detail": "User created successfully"}

@router.post("/login", response_model=schema.UserResponse)
def login(user_: schema.UserLoginRequest, response: Response):
    token_ = login_service(user_)

    response.set_cookie(
        key="access_token",
        value=token_,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=int(JWT_EXPIRES_IN * 60)
    )

    return {"data": None, "detail" : "User logged in successfully"}

@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
    )
    return {"data": None, "detail": "User logged out successfully"}

@router.get("/me", response_model=schema.UserResponse)
def get_me(current_user=Depends(get_current_user)):
    return {"data": current_user, "detail": "User authenticated"}
