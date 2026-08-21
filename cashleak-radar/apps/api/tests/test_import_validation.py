from app.services.import_validation import validate_upload


def test_valid_csv():
    assert validate_upload('payments.csv', 1024)[0] is True


def test_invalid_extension():
    assert validate_upload('script.exe', 1024)[0] is False


def test_file_too_large():
    assert validate_upload('payments.csv', 11 * 1024 * 1024)[0] is False
