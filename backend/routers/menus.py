from fastapi import APIRouter, Depends
from schemas import menus as schema
from schemas.dishes import DishResponse
from services.menus import get_all_menus_service, get_one_menu_service
from services.users import get_current_user


router = APIRouter(prefix="/menus", tags=["Menus"])

@router.get("/", response_model=schema.MenuResponse)
def get_all_menus(current_user=Depends(get_current_user)):
    menus_ = get_all_menus_service()
    return {"data": menus_, "detail": "All menus retrieved successfully"}

@router.get("/{id_}", response_model=DishResponse)
def get_one_menu(id_: int, current_user=Depends(get_current_user)):
    menu_ = get_one_menu_service(id_)
    return {"data": menu_, "detail": "Menu retrieved successfully"}