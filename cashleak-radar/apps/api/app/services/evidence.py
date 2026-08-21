from dataclasses import dataclass

@dataclass(frozen=True)
class EvidenceLink:
    source_type: str
    source_id: str
    relation: str
    confidence: float


def link_evidence(source_type: str, source_id: str, relation: str, confidence: float) -> EvidenceLink:
    return EvidenceLink(source_type, source_id, relation, max(0.0, min(confidence, 1.0)))
