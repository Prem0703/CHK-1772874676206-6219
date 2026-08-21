from datetime import date
from decimal import Decimal

from fastapi import FastAPI
from pydantic import BaseModel, Field

from app.models import Invoice, Payment
from app.reconciliation import anomaly_dicts, reconcile

app = FastAPI(title="CashLeak Radar API", version="0.1.0")

class Health(BaseModel):
    status: str
    service: str

class InvoiceIn(BaseModel):
    id: str
    customer: str
    invoice_number: str
    amount: Decimal = Field(gt=0)
    issue_date: date
    due_date: date | None = None
    status: str = "open"

class PaymentIn(BaseModel):
    id: str
    customer: str
    amount: Decimal = Field(gt=0)
    payment_date: date
    reference: str | None = None

class ReconcileRequest(BaseModel):
    invoices: list[InvoiceIn]
    payments: list[PaymentIn]

@app.get("/health", response_model=Health)
def health():
    return {"status": "ok", "service": "cashleak-radar-api"}

@app.get("/api/dashboard/summary")
def dashboard_summary():
    return {
        "potentially_recoverable": 131900,
        "high_risk": 72500,
        "unmatched_payments": 31200,
        "delivered_not_invoiced": 18400,
        "duplicate_risk": 9800,
    }

@app.post("/api/reconciliation/analyze")
def analyze(payload: ReconcileRequest):
    invoices = [Invoice(**item.model_dump()) for item in payload.invoices]
    payments = [Payment(**item.model_dump()) for item in payload.payments]
    anomalies = reconcile(invoices, payments)
    return {"anomalies": anomaly_dicts(anomalies), "count": len(anomalies)}
