from repositories.dishes import get_all_dishes
from fastapi import HTTPException, status


def get_all_dishes_service():
    dishes_ = get_all_dishes()

    if not dishes_:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dishes not found"
        )
    return dishes_