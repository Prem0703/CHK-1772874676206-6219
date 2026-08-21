from app.services.payment_prediction import payment_probability


def test_payment_probability_is_bounded():
    probability = payment_probability(10, 8, 1)
    assert 0.01 <= probability <= 0.99
