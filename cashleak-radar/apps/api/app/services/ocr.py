from dataclasses import dataclass

@dataclass(frozen=True)
class ExtractedDocument:
    document_type: str
    text: str
    confidence: float


def extract_document_text(raw_text: str) -> ExtractedDocument:
    """MVP adapter: accepts OCR output; provider integration is intentionally isolated."""
    return ExtractedDocument(document_type='unknown', text=raw_text.strip(), confidence=0.5 if raw_text else 0.0)
