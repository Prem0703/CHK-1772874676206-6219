# Quality gate

Before merging production-facing changes:

- Unit tests pass
- No secrets in diff
- Financial logic has deterministic tests
- AI output has schema validation
- Tenant boundary is tested
- Audit event exists for state-changing actions
- Uploads are validated and scanned
- Customer-facing recovery requires approval
