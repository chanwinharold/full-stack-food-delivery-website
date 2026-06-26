from ..repositories.users import create_user, get_user_by_name_or_email, get_user_by_email
from ..core.security import hash_password, verify_password, generate_token
from ..schemas import users as schema
from fastapi import HTTPException, status


def signup_service(user_: schema.UserSignupRequest):
    exists_ = get_user_by_name_or_email(user_.username, user_.email)
    if exists_:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    hash_ = hash_password(user_.password)
    new_user_ = create_user(user_.username, hash_, user_.email, user_.image)
    return new_user_

def login_service(user_: schema.UserLoginRequest):
    exists_ = get_user_by_email(user_.email)
    if not exists_:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials")

    valid_ = verify_password(input_password_=user_.password, true_password_=exists_.password)
    if not valid_:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials")

    token_ = schema.Token(user_id=exists_.id)
    new_token_ = generate_token(token_)
    return new_token_
