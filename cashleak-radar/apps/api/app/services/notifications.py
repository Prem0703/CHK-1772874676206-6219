from dataclasses import dataclass

@dataclass(frozen=True)
class Notification:
    channel: str
    subject: str
    body: str


def build_review_notification(customer: str, invoice_number: str, amount: str) -> Notification:
    return Notification(
        channel='in_app',
        subject=f'Recovery review: {invoice_number}',
        body=f'{customer} has an outstanding amount of {amount}. Review the recommended recovery action before sending.',
    )
