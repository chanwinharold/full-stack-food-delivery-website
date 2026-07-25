import psycopg as pg
from core.config import DB_NAME, DB_USER, DB_PORT, DB_HOST, DB_PASSWORD


_pool = None


def get_pool():
    global _pool
    if _pool is None:
        _pool = pg.ConnectionPool(
            conninfo=f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}",
            min_size=2,
            max_size=10,
            open=True,
        )
    return _pool


def get_connection():
    try:
        pool = get_pool()
        return pool.getconn()
    except Exception as err:
        raise Exception(f"Connection to database failed: {err}")


def release_connection(conn):
    try:
        pool = get_pool()
        pool.putconn(conn)
    except Exception:
        pass
