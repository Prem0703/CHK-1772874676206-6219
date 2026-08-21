from app.services.evidence import link_evidence


def test_evidence_confidence_is_bounded():
    result = link_evidence('invoice', 'inv-1', 'supports', 2.0)
    assert result.confidence == 1.0
