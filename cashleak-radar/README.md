# CashLeak Radar

> **Find the money your business forgot to collect.**

CashLeak Radar is an AI-powered cash-recovery intelligence layer for small businesses. It connects orders, invoices, payment records and unstructured evidence to identify unresolved money and recommend human-approved recovery actions.

## Current MVP

### Product
- Cash-risk dashboard
- Cash-leak explorer
- Customer risk view
- Evidence timeline
- Recovery center
- Import workflow UX
- Live demo analysis

### Backend
- FastAPI service
- PostgreSQL schema
- Deterministic invoice/payment reconciliation
- Partial-payment detection
- Unmatched-payment detection
- Outstanding invoice detection
- Duplicate invoice risk detection
- Explainable recovery scoring
- Customer entity resolution baseline
- CSV extraction utilities
- OCR and LLM provider boundaries
- Audit event model
- Demo API
- Automated tests + CI

## Repository structure

```text
cashleak-radar/
├── apps/
│   ├── web/                 # Next.js frontend
│   └── api/                 # FastAPI backend
├── packages/
│   └── database/            # PostgreSQL schema
├── sample-data/              # Safe synthetic demo data
├── docs/                     # Product + architecture docs
├── .github/workflows/        # CI
├── docker-compose.yml
└── Makefile
```

## Local development

### 1. Start infrastructure

```bash
cd cashleak-radar
make dev
```

### 2. Run API

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn main:app --reload
```

### 3. Run tests

```bash
cd apps/api
pytest -q
```

### 4. Run web

```bash
cd apps/web
npm install
npm run dev
```

## Demo endpoints

- `GET /health`
- `GET /api/status`
- `GET /api/dashboard/summary`
- `GET /api/demo/analyze`
- `POST /api/reconciliation/analyze`

## AI architecture

AI is intentionally separated from financial source-of-truth logic:

```text
Unstructured evidence
        ↓
OCR / extraction
        ↓
Entity resolution
        ↓
Deterministic reconciliation
        ↓
Anomaly detection
        ↓
LLM interpretation / explanation
        ↓
Human approval
        ↓
Recovery action
```

An LLM must not silently mutate financial records.

## Security

Never commit production credentials or real customer data. See `SECURITY.md` for production requirements.
