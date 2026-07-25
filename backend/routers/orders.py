from fastapi import APIRouter, status, Depends
from services.users import get_current_user
from schemas.orders import CreateOrderRequest, CreateOrderResponse, OrdersListResponse
from services.orders import create_order_service, get_orders_service


router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=CreateOrderResponse)
def create_order(order_: CreateOrderRequest, current_user=Depends(get_current_user)):
    result = create_order_service(current_user.id, order_)
    return {"data": result, "detail": "Order placed successfully"}


@router.get("/", response_model=OrdersListResponse)
def get_orders(current_user=Depends(get_current_user)):
    orders = get_orders_service(current_user.id)
    return {"data": orders, "detail": "Orders retrieved successfully"}
