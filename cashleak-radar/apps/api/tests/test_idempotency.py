from app.services.idempotency import evidence_hash, is_duplicate_hash


def test_evidence_deduplication():
    content = b'hello invoice'
    digest = evidence_hash(content)
    assert is_duplicate_hash({digest}, content) is True
