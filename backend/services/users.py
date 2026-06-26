from ..repositories.users import create_user, get_user_by_name
from ..core.security import hash_password
from ..schemas import users as schema
from fastapi import HTTPException, status


def signup_service(user_: schema.UserCreateRequest):
    exists_ = get_user_by_name(user_.username)
    if exists_:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    hash_ = hash_password(user_.password)
    new_user_ = create_user(user_.username, hash_, user_.email, user_.image)
    return new_user_