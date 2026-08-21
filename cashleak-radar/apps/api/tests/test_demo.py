from app.services.demo import demo_analysis


def test_demo_has_anomalies():
    result = demo_analysis()
    assert result['invoices'] == 2
    assert result['payments'] == 3
    assert len(result['anomalies']) >= 2
