from decimal import Decimal

SUPPORTED_CURRENCIES = {'INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'}


def format_money(amount: Decimal, currency: str = 'INR') -> str:
    code = currency.upper()
    if code not in SUPPORTED_CURRENCIES:
        raise ValueError(f'Unsupported currency: {currency}')
    return f'{code} {amount:,.2f}'
