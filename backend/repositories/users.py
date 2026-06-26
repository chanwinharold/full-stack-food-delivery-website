from typing import Optional
from pydantic import EmailStr
from models import users as model
from database.connection import get_connection


def get_user_by_name_or_email(username_: str, email_: EmailStr):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM USERS u
            WHERE u.username = %s OR u.email = %s
        """,
        (username_, email_))
    row = curs.fetchone()
    conn.close()

    if row:
        return model.User(*row)
    return None

def get_user_by_email(email_: EmailStr):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM users
            WHERE email = %s
        """,
        (email_, ))
    row = curs.fetchone()
    conn.close()

    if row:
        return model.User(*row)
    return None

def get_user_by_id(user_id_: int):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM users
            WHERE id = %s
        """,
        (user_id_, ))
    row = curs.fetchone()
    conn.close()

    if row:
        return model.User(*row)
    return None


def create_user(username_: str, password_: str, email_: EmailStr, image_: Optional[str]):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        INSERT INTO USERS (username, email, password, image) VALUES 
            (%s, %s, %s, %s)
        RETURNING *
        """,
        (username_, email_, password_, image_))
    row = curs.fetchone()
    conn.commit()
    conn.close()

    return model.User(*row)


