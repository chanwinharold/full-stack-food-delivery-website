from database.connection import get_connection, release_connection
from models import menus as model
from models.dishes import Dish


def get_all_menus():
    conn = get_connection()
    curs = conn.cursor()

    try:
        curs.execute("""
            SELECT *
            FROM menus
            """)
        rows = curs.fetchall()

        if rows:
            return [model.Menu(*row) for row in rows]
        return None
    finally:
        release_connection(conn)

def get_menu_by_id(id_: int):
    conn = get_connection()
    curs = conn.cursor()

    try:
        curs.execute("""
            SELECT d.* FROM menus m
                INNER JOIN dishes d ON m.id = d.menu_id
                WHERE m.id = %s
            """,
            (id_, ))
        rows = curs.fetchall()

        if rows:
            return [Dish(*row) for row in rows]
        return None
    finally:
        release_connection(conn)
