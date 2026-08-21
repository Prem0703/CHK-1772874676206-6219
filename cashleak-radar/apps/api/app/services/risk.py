from decimal import Decimal


def customer_risk_score(outstanding: Decimal, days_overdue: int, commitment_misses: int = 0) -> float:
    amount = min(float(outstanding) / 10000.0, 5.0) * 12
    overdue = min(max(days_overdue, 0), 60) / 60 * 55
    misses = min(max(commitment_misses, 0), 5) / 5 * 33
    return round(min(amount + overdue + misses, 100), 2)
