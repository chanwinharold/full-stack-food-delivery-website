from database.connection import get_connection
from models import dishes as model


def get_all_dishes():
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM DISHES
        """)
    rows = curs.fetchall()
    conn.close()

    if rows:
        return [model.Dish(*row) for row in rows]
    return None

def get_top_dishes():
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM dishes d
            ORDER BY d.stars DESC 
            LIMIT 10
        """)
    rows = curs.fetchall()
    conn.close()

    if rows:
        return [model.Dish(*row) for row in rows]
    return None