import csv
import io
from decimal import Decimal
from typing import Any


def parse_payment_csv(content: str) -> list[dict[str, Any]]:
    reader = csv.DictReader(io.StringIO(content))
    rows: list[dict[str, Any]] = []
    for row in reader:
        rows.append({
            "id": row.get("id", ""),
            "customer": row.get("customer", "").strip(),
            "amount": Decimal(row.get("amount", "0")),
            "payment_date": row.get("payment_date"),
            "reference": row.get("reference"),
        })
    return rows


def normalize_customer_name(value: str) -> str:
    return " ".join(value.lower().strip().split())
