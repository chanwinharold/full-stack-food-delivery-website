from repositories.dishes import get_all_dishes, get_top_dishes
from fastapi import HTTPException, status


def get_all_dishes_service():
    dishes_ = get_all_dishes()

    if not dishes_:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dishes not found"
        )
    return dishes_

def get_top_dishes_service():
    top_dishes_ = get_top_dishes()

    if not top_dishes_:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dishes not found"
        )
    return top_dishes_