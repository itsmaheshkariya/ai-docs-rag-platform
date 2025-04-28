from app.core.constants import MAX_FILE_SIZE_MB

def is_file_too_large(file_size_bytes: int) -> bool:
    """
    Checks if uploaded file size exceeds the maximum allowed limit.

    Args:
        file_size_bytes (int): Size of file in bytes.

    Returns:
        bool: True if file is too large, False otherwise.
    """
    return (file_size_bytes / (1024 * 1024)) > MAX_FILE_SIZE_MB
