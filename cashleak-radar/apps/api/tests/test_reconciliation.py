from datetime import date
from decimal import Decimal

from app.models import Invoice, Payment
from app.reconciliation import reconcile


def test_exact_payment_matches_invoice():
    invoice = Invoice("i1", "ABC Traders", "INV-1", Decimal("1000"), date(2026, 8, 1))
    payment = Payment("p1", "ABC Traders", Decimal("1000"), date(2026, 8, 2))
    anomalies = reconcile([invoice], [payment])
    assert payment.matched_invoice_id == "i1"
    assert anomalies == []


def test_partial_payment_creates_anomaly():
    invoice = Invoice("i1", "ABC Traders", "INV-1", Decimal("1000"), date(2026, 8, 1))
    payment = Payment("p1", "ABC Traders", Decimal("600"), date(2026, 8, 2))
    anomalies = reconcile([invoice], [payment])
    assert payment.matched_invoice_id == "i1"
    assert anomalies[0].type == "partial_payment"
    assert anomalies[0].amount_at_risk == Decimal("400")


def test_unmatched_payment_is_flagged():
    payment = Payment("p1", "Unknown", Decimal("600"), date(2026, 8, 2))
    anomalies = reconcile([], [payment])
    assert anomalies[0].type == "unmatched_payment"
    assert anomalies[0].amount_at_risk == Decimal("600")
