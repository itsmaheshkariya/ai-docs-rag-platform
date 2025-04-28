from app.core.constants import MAX_FILE_SIZE_MB

def is_file_too_large(file_size: int) -> bool:
    return (file_size / (1024 * 1024)) > MAX_FILE_SIZE_MB
