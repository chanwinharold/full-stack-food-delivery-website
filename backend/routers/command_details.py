from fastapi import APIRouter, status
from schemas import command_details as schema
from services.command_details import add_command_details_service


router = APIRouter(prefix="/details", tags=["Command Details"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schema.CommandDetailResponse)
def add_command_details(command_details_: schema.CommandDetailsRequest):
    new_details = add_command_details_service(command_details_)
    return {"data": new_details, "detail": "Command details added successfully"}
