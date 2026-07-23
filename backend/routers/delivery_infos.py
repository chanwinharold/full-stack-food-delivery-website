from fastapi import APIRouter, status
import schemas.delivery_infos as schema
from services.delivery_infos import create_delivery_service


router = APIRouter(prefix="/delivery", tags=["Delivery"])

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schema.DeliveryInfosResponse)
def create_delivery(delivery_: schema.DeliveryInfosRequest):
    new_delivery = create_delivery_service(delivery_)
    return {"data": new_delivery, "detail": "Delivery informations saved successfully"}