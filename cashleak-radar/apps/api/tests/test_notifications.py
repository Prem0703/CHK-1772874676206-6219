from app.services.notifications import build_review_notification


def test_review_notification():
    note = build_review_notification('ABC Traders', 'INV-1', '₹1000')
    assert note.channel == 'in_app'
    assert 'INV-1' in note.subject
