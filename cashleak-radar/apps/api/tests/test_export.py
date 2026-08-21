from app.services.export import anomalies_csv


def test_anomaly_export():
    output = anomalies_csv([{'id':'a1','type':'unmatched_payment','severity':'high','amount_at_risk':'100','confidence':'0.9','reason':'No match'}])
    assert 'unmatched_payment' in output
    assert 'amount_at_risk' in output
