from database.connection import get_connection
from models import commands as model


def create_command(ref_client_: int):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        INSERT INTO commands (ref_client) VALUES (%s)
            RETURNING *
    """, (ref_client_, ))
    row = curs.fetchone()

    conn.commit()
    conn.close()

    return model.Command(*row)
