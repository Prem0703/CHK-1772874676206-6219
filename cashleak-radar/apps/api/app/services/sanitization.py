def redact_reference(value: str | None) -> str | None:
    if not value:
        return value
    value = value.strip()
    if len(value) <= 4:
        return '***'
    return '*' * (len(value) - 4) + value[-4:]


def normalize_free_text(value: str) -> str:
    return ' '.join(value.split())
