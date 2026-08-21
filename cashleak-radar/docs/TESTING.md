# Testing strategy

## Unit tests

- Reconciliation
- Entity resolution
- Duplicate detection
- Risk scoring
- Payment probability
- Commitment detection
- Upload validation
- Tenant isolation
- Evidence and export helpers

## Integration tests to add next

- PostgreSQL persistence
- File import pipeline
- OCR provider
- Structured LLM provider
- Recovery approval API

## Financial safety

Any automatic financial mutation must have deterministic validation, idempotency and an audit event. LLM output alone is never sufficient authority to change financial state.
