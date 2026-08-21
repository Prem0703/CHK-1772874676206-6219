from decimal import Decimal

from app.services.risk import customer_risk_score


def test_customer_risk_score_bounded():
    score = customer_risk_score(Decimal('50000'), 60, 5)
    assert score == 100
