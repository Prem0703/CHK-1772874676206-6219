from decimal import Decimal


def recovery_priority(amount: Decimal, days_overdue: int, confidence: float) -> int:
    """Transparent priority score for the MVP; replace/enrich with trained model later."""
    amount_factor = min(float(amount) / 10000.0, 5.0) * 10
    overdue_factor = min(max(days_overdue, 0), 30) / 30 * 35
    confidence_factor = confidence * 55
    return round(min(amount_factor + overdue_factor + confidence_factor, 100))


def severity_for(score: int) -> str:
    if score >= 75:
        return "critical"
    if score >= 50:
        return "high"
    if score >= 25:
        return "medium"
    return "low"
