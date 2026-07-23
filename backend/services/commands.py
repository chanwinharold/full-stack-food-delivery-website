from fastapi import HTTPException, status

from repositories.commands import create_command


def create_command_service(ref_client_: int):
    new_command = create_command(ref_client_)

    if not new_command:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An error occurred! Please try again."
        )

    return new_command