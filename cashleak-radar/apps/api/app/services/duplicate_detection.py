from collections import defaultdict
from decimal import Decimal


def duplicate_risks(invoices: list[dict]) -> list[dict]:
    groups: dict[tuple[str, Decimal], list[dict]] = defaultdict(list)
    for invoice in invoices:
        key = (invoice.get('customer', '').strip().lower(), Decimal(str(invoice.get('amount', 0))))
        groups[key].append(invoice)

    risks = []
    for (customer, amount), rows in groups.items():
        if len(rows) > 1:
            risks.append({
                'customer': customer,
                'amount': str(amount),
                'invoice_ids': [row.get('id') for row in rows],
                'confidence': 0.78,
                'reason': 'Multiple invoices share the same normalized customer and amount.',
            })
    return risks
