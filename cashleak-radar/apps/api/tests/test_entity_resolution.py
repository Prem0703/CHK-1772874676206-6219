from app.services.entity_resolution import best_customer_match, similarity


def test_similarity():
    assert similarity('ABC Traders', 'abc traders') == 1.0


def test_best_customer_match():
    match, score = best_customer_match('ABC Traders', ['ABC Traders', 'Metro Supplies'])
    assert match == 'ABC Traders'
    assert score == 1.0
