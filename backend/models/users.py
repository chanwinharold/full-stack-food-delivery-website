from datetime import datetime
from pydantic import EmailStr

class User:
    def __init__(self, id_: int, username_: str, email_: EmailStr, password_: str, image_: str, created_at_: datetime):
        self.id: int = id_
        self.username: str = username_
        self.email: EmailStr = email_
        self.password: str = password_
        self.image: str = image_
        self.created_at: datetime = created_at_
