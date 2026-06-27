from fastapi import APIRouter
from schemas import dishes as schema
from services.dishes import get_all_dishes_service


router = APIRouter(prefix="/dishes", tags=["Dishes"])

@router.get("/", response_model=schema.DishResponse)
def get_all_dishes():
    dishes_ = get_all_dishes_service()
    return {"data": dishes_, "detail": "All dishes retrieved successfully"}