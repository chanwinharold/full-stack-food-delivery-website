from datetime import datetime


class CommandDetails:
    def __init__(self, id_: int, ref_command_: int, ref_dish_: int, quantity_: int, unit_price_: float, created_at_: datetime):
        self.id = id_
        self.ref_command: int = ref_command_
        self.ref_dish : int = ref_dish_
        self.quantity : int = quantity_
        self.unit_price : float = unit_price_
        self.created_at : datetime = created_at_