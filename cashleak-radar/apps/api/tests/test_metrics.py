from app.services.metrics import cash_risk_summary


def test_cash_risk_summary():
    result = cash_risk_summary([{'amount': '1000', 'status': 'open'}], [{'amount_at_risk': '400'}])
    assert result['outstanding'] == '1000'
    assert result['amount_at_risk'] == '400'
    assert result['anomaly_count'] == 1
