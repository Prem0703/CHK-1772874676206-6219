def search_anomalies(rows: list[dict], query: str) -> list[dict]:
    needle = query.strip().lower()
    if not needle:
        return rows
    return [
        row for row in rows
        if needle in str(row.get('type', '')).lower()
        or needle in str(row.get('reason', '')).lower()
    ]
