from dataclasses import dataclass

@dataclass(frozen=True)
class Alert:
    severity: str
    title: str
    message: str


def anomaly_alert(anomaly_type: str, amount: str, severity: str) -> Alert:
    return Alert(severity, f'{anomaly_type.replace("_", " ").title()} detected', f'{amount} is associated with this cash-risk event.')
