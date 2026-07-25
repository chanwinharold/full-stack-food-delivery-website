import os, dotenv

dotenv.load_dotenv(dotenv_path=dotenv.find_dotenv())

DATABASE_URL = os.getenv("DATABASE_URL")
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_NAME = os.getenv("DB_NAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")

JWT_EXPIRES_IN = float(os.getenv("JWT_EXPIRES_IN") or 60)
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:5174").split(",")

COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"
