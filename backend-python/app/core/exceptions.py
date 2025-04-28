from fastapi import HTTPException, status

class FileTooLargeException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Uploaded file is too large. Please upload a file smaller than 2MB."
        )
