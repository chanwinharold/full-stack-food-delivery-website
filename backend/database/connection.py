import psycopg as pg
from ..core.security import DB_NAME, DB_USER, DB_PORT, DB_HOST, DB_PASSWORD


def get_connection():
    try:
        conn_ = pg.connect(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
        if not conn_:
            raise Exception("❌ Connection to database failed")

        print("✅ Connection to database succeeded")
        return conn_
    except Exception as err:
        raise Exception(f"❌ Connection to database failed: {err}")