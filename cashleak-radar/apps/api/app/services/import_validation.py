from pathlib import Path

ALLOWED_EXTENSIONS = {'.csv', '.pdf', '.png', '.jpg', '.jpeg', '.txt'}
MAX_FILE_SIZE = 10 * 1024 * 1024


def validate_upload(filename: str, size_bytes: int) -> tuple[bool, str]:
    suffix = Path(filename).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        return False, 'Unsupported file type'
    if size_bytes <= 0 or size_bytes > MAX_FILE_SIZE:
        return False, 'File size must be between 1 byte and 10 MB'
    return True, 'ok'
