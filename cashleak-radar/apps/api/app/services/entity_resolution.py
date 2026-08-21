from difflib import SequenceMatcher


def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.strip().lower(), b.strip().lower()).ratio()


def best_customer_match(candidate: str, known_customers: list[str]) -> tuple[str | None, float]:
    if not known_customers:
        return None, 0.0
    best = max(known_customers, key=lambda name: similarity(candidate, name))
    score = similarity(candidate, best)
    return (best, score) if score >= 0.75 else (None, score)
