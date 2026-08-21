from decimal import Decimal

from app.services.extraction import normalize_customer_name, parse_payment_csv


def test_parse_payment_csv():
    rows = parse_payment_csv('id,customer,amount,payment_date,reference\np1, ABC Traders ,1000,2026-08-20,UTR1\n')
    assert rows[0]['id'] == 'p1'
    assert rows[0]['amount'] == Decimal('1000')
    assert rows[0]['customer'] == 'ABC Traders'


def test_normalize_customer_name():
    assert normalize_customer_name('  ABC   TRADERS ') == 'abc traders'
