# Security notes

CashLeak Radar is designed to handle financial and business evidence.

Production requirements:

- Never commit API keys or customer data.
- Encrypt stored documents and database connections.
- Enforce organization-level tenant isolation.
- Add RBAC and MFA before production use.
- Malware-scan uploaded files.
- Apply upload size/rate limits.
- Keep immutable audit logs for financial actions.
- Require human approval before customer-facing recovery messages.
- Do not let an LLM directly mutate financial records.
