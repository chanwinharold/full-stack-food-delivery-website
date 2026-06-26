from datetime import datetime

class User:
    def __init__(self, id_: int, username_: str, email_: str, password_: str, image_: str, created_at_: datetime):
        self.id: int = id_
        self.username: str = username_
        self.email: str = email_
        self.password: str = password_
        self.image: str = image_
        self.created_at: datetime = created_at_
