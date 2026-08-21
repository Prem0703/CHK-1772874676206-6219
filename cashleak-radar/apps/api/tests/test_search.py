from app.services.search import search_anomalies


def test_search_anomalies():
    rows = [{'type':'unmatched_payment','reason':'No invoice match'}]
    assert len(search_anomalies(rows, 'invoice')) == 1
