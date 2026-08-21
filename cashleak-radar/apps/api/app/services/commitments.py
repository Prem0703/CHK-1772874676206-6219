import re
from dataclasses import dataclass

@dataclass(frozen=True)
class PaymentCommitment:
    text: str
    intent: str
    confidence: float


COMMITMENT_PATTERNS = [
    r'\bwill\s+(?:send|pay|transfer)\b',
    r'\bpay(?:ment)?\s+(?:by|on)\b',
    r'\btransfer\s+(?:by|on)\b',
]


def detect_commitment(text: str) -> PaymentCommitment:
    confidence = 0.0
    for pattern in COMMITMENT_PATTERNS:
        if re.search(pattern, text.lower()):
            confidence = 0.82
            break
    return PaymentCommitment(text=text, intent='payment_commitment' if confidence else 'unknown', confidence=confidence)
