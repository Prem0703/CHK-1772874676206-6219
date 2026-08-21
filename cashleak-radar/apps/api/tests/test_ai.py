from app.services.ai import interpret_payment_commitment


def test_payment_commitment_baseline():
    result = interpret_payment_commitment('I will send the payment Friday')
    assert result.intent == 'payment_commitment'
    assert result.confidence > 0.5
