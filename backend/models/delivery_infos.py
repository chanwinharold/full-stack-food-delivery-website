from pydantic import EmailStr


class DeliveryInfos:
    def __init__(
            self, id_: int, firstname_: str, lastname_: str,
            email_: EmailStr, phone_: str, street_: str,
            city_: str, state_: str, postal_code_: int,
            country_: str, ref_command_: int
    ):
        self.id: int = id_
        self.firstname: str = firstname_
        self.lastname: str = lastname_
        self.email: EmailStr = email_
        self.phone: str = phone_
        self.street: str = street_
        self.city: str = city_
        self.state: str = state_
        self.postal_code: int = postal_code_
        self.country: str = country_
        self.ref_command: int = ref_command_

