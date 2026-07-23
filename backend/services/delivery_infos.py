from fastapi import HTTPException, status
from schemas.delivery_infos import DeliveryInfosRequest
from repositories.delivery_infos import create_delivery


def create_delivery_service(dv: DeliveryInfosRequest):
    new_delivery = create_delivery(
        dv.firstname,
        dv.lastname,
        dv.email,
        dv.phone,
        dv.street,
        dv.city,
        dv.state,
        dv.postal_code,
        dv.country,
        dv.ref_command
    )

    if not new_delivery:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Delivery not added"
        )

    return new_delivery