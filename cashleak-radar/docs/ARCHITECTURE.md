# Architecture

```text
Next.js Web
    |
    v
FastAPI API ---- PostgreSQL / pgvector
    |
    +---- Redis ---- Celery workers
    |                  |
    |                  +-- OCR
    |                  +-- document extraction
    |                  +-- reconciliation
    |                  +-- AI interpretation
    |
    +---- S3-compatible object storage
```

## Design rules

- PostgreSQL is the financial source of truth.
- Deterministic reconciliation happens before LLM enrichment.
- AI outputs are structured and confidence-scored.
- Background jobs handle expensive document/AI processing.
- Tenant IDs are mandatory on business data.
- Customer-facing actions require explicit approval in MVP.
