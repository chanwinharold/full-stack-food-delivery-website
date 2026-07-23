from fastapi import APIRouter, status, Depends
from services.users import get_current_user
from services.commands import create_command_service


router = APIRouter(prefix="/commands", tags=["Command"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_command(current_user = Depends(get_current_user)):
    current_id = current_user.id
    new_command = create_command_service(current_id)

    return {"data": new_command, "detail": "Command added successfully"}