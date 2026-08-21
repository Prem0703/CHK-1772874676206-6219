from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="CashLeak Radar API", version="0.1.0")

class Health(BaseModel):
    status: str
    service: str

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
