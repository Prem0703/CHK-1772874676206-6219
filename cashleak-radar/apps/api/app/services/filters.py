def filter_anomalies(rows: list[dict], severity: str | None = None, min_amount: float | None = None) -> list[dict]:
    result = rows
    if severity:
        result = [row for row in result if row.get('severity') == severity]
    if min_amount is not None:
        result = [row for row in result if float(row.get('amount_at_risk', 0)) >= min_amount]
    return result
