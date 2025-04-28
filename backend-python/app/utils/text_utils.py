def clean_text(text: str) -> str:
    """
    Cleans the input text by removing extra spaces, newlines, and making it a single line.

    Args:
        text (str): The input text to clean.

    Returns:
        str: The cleaned text.
    """
    return ' '.join(text.split())
