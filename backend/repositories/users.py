from typing import Optional

from ..models import users as model
from ..database.connection import get_connection


def get_user_by_name(username_: str):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM USERS u
            WHERE u.username = %s
        """,
        (username_, ))
    row = curs.fetchone()
    conn.close()

    if row:
        return model.User(*row)
    return None

def create_user(username_: str, password_: str, email_: Optional[str], image_: Optional[str]):
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


