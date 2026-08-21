# Service boundaries

- `reconciliation.py`: financial matching source of truth
- `extraction.py`: import parsing
- `ocr.py`: OCR provider adapter boundary
- `ai.py`: structured AI interpretation boundary
- `entity_resolution.py`: customer identity matching
- `duplicate_detection.py`: duplicate invoice risks
- `scoring.py`: transparent priority scoring
- `recovery.py`: human-approved recovery drafts
- `audit.py`: audit event construction
- `import_validation.py`: upload safety checks
