from app.services.duplicate_detection import duplicate_risks


def test_duplicate_invoice_risk():
    risks = duplicate_risks([
        {'id': 'i1', 'customer': 'ABC Traders', 'amount': '1000'},
        {'id': 'i2', 'customer': ' abc traders ', 'amount': '1000'},
    ])
    assert len(risks) == 1
    assert risks[0]['invoice_ids'] == ['i1', 'i2']
