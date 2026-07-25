from models import delivery_infos as model
from database.connection import get_connection, release_connection


def create_delivery(firstname_, lastname_, email_, phone_, street_, city_, state_, postal_code_, country_, ref_command_):
    conn = get_connection()
    curs = conn.cursor()

    try:
        curs.execute("""
            INSERT INTO delivery_infos (firstname, lastname, email, phone, street, city, state, postal_code, country, ref_command) VALUES
                (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
        """, (firstname_, lastname_, email_, phone_, street_, city_, state_, postal_code_, country_, ref_command_))
        row = curs.fetchone()
        conn.commit()

        return model.DeliveryInfos(*row)
    except Exception:
        conn.rollback()
        raise
    finally:
        release_connection(conn)
