from decimal import Decimal

from app.services.scoring import recovery_priority, severity_for


def test_recovery_priority_is_bounded():
    score = recovery_priority(Decimal("50000"), 30, 1.0)
    assert 0 <= score <= 100
    assert severity_for(score) == "critical"


def test_low_risk_score():
    score = recovery_priority(Decimal("100"), 0, 0.1)
    assert severity_for(score) == "low"
