from database.connection import get_connection
from models import menus as model


def get_all_menus():
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT *
        FROM menus
        """)
    rows = curs.fetchall()
    conn.close()

    if rows:
        return [model.Menu(*row) for row in rows]
    return None

def get_menu_by_id(id_: int):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        SELECT * FROM menus
            WHERE id = %s
        """,
        (id_, ))
    row = curs.fetchone()
    conn.close()

    if row:
        return model.Menu(*row)
    return None
