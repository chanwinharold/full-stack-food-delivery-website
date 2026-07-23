from database.connection import get_connection
from models import command_details as model


def add_command_details(ref_command_: int, ref_dish_: int, quantity_: int, unit_price_: float):
    conn = get_connection()
    curs = conn.cursor()

    curs.execute("""
        INSERT INTO command_details (ref_command, ref_dish, quantity, unit_price) VALUES 
            (%s, %s, %s, %s)
        RETURNING *
    """, (ref_command_, ref_dish_, quantity_, unit_price_))
    row = curs.fetchone()

    conn.commit()
    conn.close()

    return model.CommandDetails(*row)
