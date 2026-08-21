from app.services.alerts import anomaly_alert


def test_anomaly_alert():
    alert = anomaly_alert('unmatched_payment', '₹3200', 'high')
    assert alert.severity == 'high'
    assert 'Unmatched Payment' in alert.title
