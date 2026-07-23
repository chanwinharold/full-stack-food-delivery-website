from repositories.command_details import add_command_details
from schemas import command_details as schema
from fastapi import HTTPException, status


def add_command_details_service(cmd_: schema.CommandDetailsRequest):
    new_details = add_command_details(
        cmd_.ref_command,
        cmd_.ref_dish,
        cmd_.quantity,
        cmd_.unit_price
    )

    if not new_details:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Command details not added")

    return new_details