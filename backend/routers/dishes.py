from fastapi import APIRouter
from schemas import dishes as schema
from services.dishes import get_all_dishes_service, get_top_dishes_service

router = APIRouter(prefix="/dishes", tags=["Dishes"])

@router.get("/", response_model=schema.DishResponse)
def get_all_dishes():
    dishes_ = get_all_dishes_service()
    return {"data": dishes_, "detail": "All dishes retrieved successfully"}

@router.get("/top", response_model=schema.DishResponse)
def get_top_dishes():
    top_dishes_ = get_top_dishes_service()
    return {"data": top_dishes_, "detail": "Top dishes retrieved successfully"}
