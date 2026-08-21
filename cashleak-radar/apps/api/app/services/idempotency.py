import hashlib


def evidence_hash(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()


def is_duplicate_hash(existing_hashes: set[str], content: bytes) -> bool:
    return evidence_hash(content) in existing_hashes
