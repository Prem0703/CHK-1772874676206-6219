# Product blueprint

## MVP outcome

Given invoices and payment exports, CashLeak Radar should identify:

1. Exact matches
2. Partial payments
3. Unmatched payments
4. Outstanding invoices
5. Recovery priority

## AI boundary

AI is used for ambiguous, unstructured evidence: OCR, conversation understanding, entity resolution and explanations. Deterministic financial reconciliation rules remain the source of truth for mutations.

## Trust model

- Every anomaly has evidence and confidence.
- Financial records are never silently changed by an LLM.
- Recovery messages require human approval in the MVP.
- Audit logs are mandatory for production actions.
