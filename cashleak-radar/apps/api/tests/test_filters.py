from app.services.filters import filter_anomalies


def test_filter_anomalies():
    rows = [{'severity':'high','amount_at_risk':'100'}, {'severity':'low','amount_at_risk':'20'}]
    assert len(filter_anomalies(rows, severity='high')) == 1
    assert len(filter_anomalies(rows, min_amount=50)) == 1
