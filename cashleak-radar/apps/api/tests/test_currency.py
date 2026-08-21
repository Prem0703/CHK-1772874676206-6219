from decimal import Decimal

from app.services.currency import format_money


def test_currency_format():
    assert format_money(Decimal('1234.5'), 'INR') == 'INR 1,234.50'
