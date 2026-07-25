from fastapi import HTTPException, status
from repositories.orders import create_full_order, get_orders_by_user
from schemas.orders import CreateOrderRequest


def create_order_service(ref_client_: int, order_: CreateOrderRequest):
    try:
        items_data = [
            {
                "ref_dish": item.ref_dish,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
            }
            for item in order_.items
        ]
        delivery_data = {
            "firstname": order_.delivery.firstname,
            "lastname": order_.delivery.lastname,
            "email": order_.delivery.email,
            "phone": order_.delivery.phone,
            "street": order_.delivery.street,
            "city": order_.delivery.city,
            "state": order_.delivery.state,
            "postal_code": order_.delivery.postal_code,
            "country": order_.delivery.country,
        }
        result = create_full_order(ref_client_, items_data, delivery_data)
        return result
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to create order. Please try again."
        )


def get_orders_service(ref_client_: int):
    return get_orders_by_user(ref_client_)
