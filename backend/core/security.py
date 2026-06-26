from pwdlib import PasswordHash
import os, dotenv


dotenv.load_dotenv(dotenv_path=dotenv.find_dotenv())

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")

hasher = PasswordHash.recommended()
def hash_password(password_: str) -> str:
    return hasher.hash(password_)

def verify_password(password_: str, hash_: str) -> bool:
    return hasher.verify(password_, hash_)