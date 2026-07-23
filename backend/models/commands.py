from datetime import datetime


class Command:
    def __init__(self, id_: int, ref_client_: int, created_at_: datetime):
        self.id : int = id_
        self.ref_client : int = ref_client_
        self.created_at : datetime = created_at_