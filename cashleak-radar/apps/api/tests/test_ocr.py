from app.services.ocr import extract_document_text


def test_ocr_adapter_normalizes_text():
    result = extract_document_text('  Invoice #123  ')
    assert result.text == 'Invoice #123'
    assert result.confidence > 0
