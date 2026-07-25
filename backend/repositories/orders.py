from database.connection import get_connection, release_connection
from models import orders as model


def create_full_order(ref_client_: int, items_: list[dict], delivery_: dict):
    conn = get_connection()
    curs = conn.cursor()

    try:
        curs.execute("""
            INSERT INTO commands (ref_client) VALUES (%s)
            RETURNING id, created_at
        """, (ref_client_,))
        command_row = curs.fetchone()
        command_id = command_row[0]
        command_created_at = command_row[1]

        for item in items_:
            curs.execute("""
                INSERT INTO command_details (ref_command, ref_dish, quantity, unit_price)
                VALUES (%s, %s, %s, %s)
            """, (command_id, item["ref_dish"], item["quantity"], item["unit_price"]))

        curs.execute("""
            INSERT INTO delivery_infos (firstname, lastname, email, phone, street, city, state, postal_code, country, ref_command)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (
            delivery_["firstname"], delivery_["lastname"], delivery_["email"],
            delivery_["phone"], delivery_["street"], delivery_["city"],
            delivery_["state"], delivery_["postal_code"], delivery_["country"],
            command_id
        ))
        delivery_id = curs.fetchone()[0]

        conn.commit()

        total = sum(item["quantity"] * item["unit_price"] for item in items_)
        item_count = sum(item["quantity"] for item in items_)

        return {
            "id": command_id,
            "created_at": command_created_at,
            "items": items_,
            "delivery": {**delivery_, "id": delivery_id},
            "total": total,
            "item_count": item_count,
        }
    except Exception:
        conn.rollback()
        raise
    finally:
        release_connection(conn)


def get_orders_by_user(ref_client_: int):
    conn = get_connection()
    curs = conn.cursor()

    try:
        curs.execute("""
            SELECT c.id, c.created_at
            FROM commands c
            WHERE c.ref_client = %s
            ORDER BY c.created_at DESC
        """, (ref_client_,))
        commands = curs.fetchall()

        orders = []
        for cmd in commands:
            cmd_id = cmd[0]
            cmd_created = cmd[1]

            curs.execute("""
                SELECT cd.id, cd.ref_dish, d.name, cd.quantity, cd.unit_price
                FROM command_details cd
                INNER JOIN dishes d ON cd.ref_dish = d.id
                WHERE cd.ref_command = %s
            """, (cmd_id,))
            detail_rows = curs.fetchall()

            items = []
            total = 0
            item_count = 0
            for dr in detail_rows:
                items.append({
                    "id": dr[0],
                    "ref_dish": dr[1],
                    "dish_name": dr[2],
                    "quantity": dr[3],
                    "unit_price": dr[4],
                })
                total += dr[3] * dr[4]
                item_count += dr[3]

            curs.execute("""
                SELECT id, firstname, lastname, email, phone, street, city, state, postal_code, country
                FROM delivery_infos
                WHERE ref_command = %s
            """, (cmd_id,))
            del_row = curs.fetchone()

            delivery = None
            if del_row:
                delivery = {
                    "id": del_row[0],
                    "firstname": del_row[1],
                    "lastname": del_row[2],
                    "email": del_row[3],
                    "phone": del_row[4],
                    "street": del_row[5],
                    "city": del_row[6],
                    "state": del_row[7],
                    "postal_code": del_row[8],
                    "country": del_row[9],
                }

            orders.append({
                "id": cmd_id,
                "created_at": cmd_created,
                "items": items,
                "delivery": delivery,
                "total": total,
                "item_count": item_count,
            })

        return orders
    finally:
        release_connection(conn)
