from decimal import Decimal


def cash_risk_summary(invoices: list[dict], anomalies: list[dict]) -> dict:
    outstanding = sum((Decimal(str(i.get('amount', 0))) for i in invoices if i.get('status', 'open') == 'open'), Decimal('0'))
    at_risk = sum((Decimal(str(a.get('amount_at_risk', 0))) for a in anomalies), Decimal('0'))
    return {
        'outstanding': str(outstanding),
        'amount_at_risk': str(at_risk),
        'anomaly_count': len(anomalies),
    }
