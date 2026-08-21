from app.services.sanitization import redact_reference, normalize_free_text


def test_redact_reference():
    assert redact_reference('UPI123456') == '****3456'


def test_normalize_free_text():
    assert normalize_free_text(' hello   world ') == 'hello world'
