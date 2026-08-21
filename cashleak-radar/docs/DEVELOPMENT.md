# Development workflow

1. Start Postgres and Redis with `make dev`.
2. Run API from `apps/api`.
3. Run web from `apps/web`.
4. Run `pytest -q` before committing backend changes.
5. Keep all new product work under `cashleak-radar/` until reviewed.
