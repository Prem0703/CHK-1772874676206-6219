from dataclasses import dataclass
from datetime import date
from decimal import Decimal
from typing import Optional

@dataclass
class Invoice:
    id: str
    customer: str
    invoice_number: str
    amount: Decimal
    issue_date: date
    due_date: Optional[date] = None
    status: str = "open"

@dataclass
class Payment:
    id: str
    customer: str
    amount: Decimal
    payment_date: date
    reference: Optional[str] = None
    matched_invoice_id: Optional[str] = None

@dataclass
class Anomaly:
    id: str
    type: str
    severity: str
    amount_at_risk: Decimal
    confidence: float
    reason: str
