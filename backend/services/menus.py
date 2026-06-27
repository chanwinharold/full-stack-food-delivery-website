from repositories.menus import get_all_menus, get_menu_by_id
from fastapi import HTTPException, status


def get_all_menus_service():
    menus_ = get_all_menus()
    if not menus_:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menus not found"
        )
    return menus_

def get_one_menu_service(id_: int):
    menu_ = get_menu_by_id(id_)
    if not menu_:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Menu with id: {id_} not found"
        )
    return menu_