from dataclasses import dataclass
from decimal import Decimal

@dataclass(frozen=True)
class RecoveryRecommendation:
    action: str
    reason: str
    draft: str


def recommend_payment_followup(customer: str, invoice_number: str, amount: Decimal, days_overdue: int) -> RecoveryRecommendation:
    tone = "firm" if days_overdue >= 15 else "polite"
    draft = (
        f"Hi {customer}, just a {tone} follow-up regarding invoice {invoice_number}. "
        f"An amount of ₹{amount:,.2f} is currently outstanding. "
        "Could you please confirm the expected payment date?"
    )
    return RecoveryRecommendation(
        action="payment_followup",
        reason=f"Invoice is {days_overdue} days overdue with ₹{amount:,.2f} outstanding.",
        draft=draft,
    )
