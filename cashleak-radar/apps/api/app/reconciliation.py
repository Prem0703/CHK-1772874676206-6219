from dataclasses import asdict
from decimal import Decimal
from typing import Iterable

from .models import Invoice, Payment, Anomaly


def reconcile(invoices: Iterable[Invoice], payments: Iterable[Payment]) -> list[Anomaly]:
    """Deterministic first-pass reconciliation; AI can enrich ambiguous cases later."""
    invoices = list(invoices)
    payments = list(payments)
    anomalies: list[Anomaly] = []
    matched_payment_ids: set[str] = set()

    for payment in payments:
        candidates = [
            inv for inv in invoices
            if inv.customer.strip().lower() == payment.customer.strip().lower()
            and inv.status in {"open", "partial"}
            and inv.id not in {p.matched_invoice_id for p in payments if p.matched_invoice_id}
        ]
        exact = next((inv for inv in candidates if inv.amount == payment.amount), None)
        if exact:
            payment.matched_invoice_id = exact.id
            matched_payment_ids.add(payment.id)
            continue

        if candidates:
            closest = min(candidates, key=lambda inv: abs(inv.amount - payment.amount))
            if abs(closest.amount - payment.amount) > Decimal("0"):
                anomalies.append(Anomaly(
                    id=f"partial-{payment.id}",
                    type="partial_payment",
                    severity="medium",
                    amount_at_risk=max(closest.amount - payment.amount, Decimal("0")),
                    confidence=0.92,
                    reason=f"Payment {payment.id} is below invoice {closest.invoice_number} amount.",
                ))
            payment.matched_invoice_id = closest.id
            matched_payment_ids.add(payment.id)
        else:
            anomalies.append(Anomaly(
                id=f"unmatched-{payment.id}",
                type="unmatched_payment",
                severity="high",
                amount_at_risk=payment.amount,
                confidence=0.88,
                reason="No open invoice confidently matches this payment.",
            ))

    for invoice in invoices:
        if invoice.status == "open" and invoice.id not in {p.matched_invoice_id for p in payments}:
            anomalies.append(Anomaly(
                id=f"overdue-{invoice.id}",
                type="outstanding_invoice",
                severity="high" if invoice.due_date else "medium",
                amount_at_risk=invoice.amount,
                confidence=0.95,
                reason=f"Invoice {invoice.invoice_number} has no matched payment.",
            ))

    return anomalies


def anomaly_dicts(anomalies: Iterable[Anomaly]) -> list[dict]:
    return [asdict(a) for a in anomalies]
