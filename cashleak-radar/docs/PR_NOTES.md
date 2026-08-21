# Pull request notes

This branch adds CashLeak Radar without modifying the existing repository application. All new work is isolated under `cashleak-radar/`.

The MVP deliberately uses deterministic financial reconciliation as its source of truth. AI/OCR integrations are isolated behind provider boundaries so production credentials and vendor coupling are not introduced prematurely.
