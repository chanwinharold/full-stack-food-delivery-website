from datetime import datetime


class Order:
    def __init__(self, id_: int, ref_client_: int, created_at_: datetime):
        self.id: int = id_
        self.ref_client: int = ref_client_
        self.created_at: datetime = created_at_


class OrderWithDetails:
    def __init__(self, id_: int, created_at_: datetime, items_: list, delivery_: dict | None, total_: float, item_count_: int):
        self.id: int = id_
        self.created_at: datetime = created_at_
        self.items: list = items_
        self.delivery: dict | None = delivery_
        self.total: float = total_
        self.item_count: int = item_count_
