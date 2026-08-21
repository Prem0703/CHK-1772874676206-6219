from app.services.commitments import detect_commitment


def test_detect_commitment():
    result = detect_commitment('I will transfer the payment Friday')
    assert result.intent == 'payment_commitment'
    assert result.confidence > 0.8
