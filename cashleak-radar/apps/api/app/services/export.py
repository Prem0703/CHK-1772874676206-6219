import csv
import io


def anomalies_csv(rows: list[dict]) -> str:
    fields = ['id', 'type', 'severity', 'amount_at_risk', 'confidence', 'reason']
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fields)
    writer.writeheader()
    writer.writerows({key: row.get(key) for key in fields} for row in rows)
    return output.getvalue()
