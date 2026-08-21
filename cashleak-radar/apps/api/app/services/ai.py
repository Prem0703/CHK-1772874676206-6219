from dataclasses import dataclass

@dataclass(frozen=True)
class EvidenceInterpretation:
    intent: str
    confidence: float
    extracted_date: str | None = None
    extracted_amount: float | None = None


def interpret_payment_commitment(text: str) -> EvidenceInterpretation:
    """Deterministic baseline used until an LLM provider is configured.

    Production should call a structured-output LLM here and validate its output.
    """
    normalized = text.lower()
    commitment_words = ("pay", "payment", "transfer", "send", "paid")
    if any(word in normalized for word in commitment_words):
        return EvidenceInterpretation(intent="payment_commitment", confidence=0.62)
    return EvidenceInterpretation(intent="unknown", confidence=0.35)
