from schemas import users as schema
from datetime import datetime, UTC, timedelta
from pwdlib import PasswordHash
import os, dotenv, jwt


dotenv.load_dotenv(dotenv_path=dotenv.find_dotenv())

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")

JWT_EXPIRES_IN=float(os.getenv("JWT_EXPIRES_IN") or 60)
JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM=os.getenv("JWT_ALGORITHM")

pwd = PasswordHash.recommended()
def hash_password(password_: str) -> str:
    return pwd.hash(password_)

def verify_password(input_password_: str, true_password_: str) -> bool:
    return pwd.verify(input_password_, true_password_)

def generate_token(token_: schema.Token):
    timestamp = (datetime.now(UTC) + timedelta(minutes=JWT_EXPIRES_IN)).timestamp()
    token_.exp = int(timestamp)
    payload_ = token_.model_dump()
    return jwt.encode(payload=payload_, key=JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def verify_token(token_: str):
    return jwt.decode(token_, key=JWT_SECRET_KEY, algorithms=JWT_ALGORITHM)
