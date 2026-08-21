from datetime import date
from decimal import Decimal

from app.models import Invoice, Payment
from app.reconciliation import reconcile


def demo_analysis() -> dict:
    invoices = [
        Invoice('inv-001', 'ABC Traders', 'INV-001', Decimal('18400'), date(2026, 8, 1), date(2026, 8, 15)),
        Invoice('inv-002', 'Sunrise Studio', 'INV-002', Decimal('8500'), date(2026, 8, 10), date(2026, 8, 20)),
    ]
    payments = [
        Payment('pay-001', 'ABC Traders', Decimal('10000'), date(2026, 8, 12), 'UPI12345'),
        Payment('pay-002', 'Sunrise Studio', Decimal('8500'), date(2026, 8, 21), 'UPI67890'),
        Payment('pay-003', 'Unknown Customer', Decimal('3200'), date(2026, 8, 20), 'UPI99999'),
    ]
    anomalies = reconcile(invoices, payments)
    return {
        'invoices': len(invoices),
        'payments': len(payments),
        'anomalies': [a.__dict__ for a in anomalies],
    }
