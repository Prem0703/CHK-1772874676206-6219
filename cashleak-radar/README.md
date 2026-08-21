# CashLeak Radar

AI-powered cash-recovery intelligence for small businesses.

CashLeak Radar connects messy business evidence—orders, invoices, payment records and customer conversations—to detect unresolved money, missing invoices, unmatched payments and overdue commitments.

## MVP

- Upload invoices and payment CSVs
- Extract structured transaction data
- Match payments to invoices
- Detect cash-leak anomalies
- Explain why an item was flagged
- Recommend a recovery action
- Dashboard for money at risk

## Planned stack

- Frontend: Next.js + TypeScript
- Backend: FastAPI + Python
- Database: PostgreSQL + pgvector
- Jobs: Celery + Redis
- Storage: S3-compatible object storage
- AI: OCR + LLM + deterministic reconciliation + ML anomaly scoring

## Product principle

This is not another accounting app. It is an intelligence layer that sits above existing business systems and turns unstructured evidence into actionable cash-recovery decisions.

## Development

The initial implementation is being developed under `cashleak-radar/` so the existing repository content remains untouched.
