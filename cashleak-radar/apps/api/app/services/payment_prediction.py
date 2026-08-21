from decimal import Decimal


def payment_probability(days_overdue: int, historical_delay_days: float = 0.0, missed_commitments: int = 0) -> float:
    """Transparent MVP heuristic. Replace with trained model after collecting consented data."""
    score = 0.75
    score -= min(max(days_overdue, 0), 60) / 60 * 0.35
    score -= min(max(historical_delay_days, 0.0), 60.0) / 60 * 0.25
    score -= min(max(missed_commitments, 0), 5) / 5 * 0.25
    return round(max(min(score, 0.99), 0.01), 3)
