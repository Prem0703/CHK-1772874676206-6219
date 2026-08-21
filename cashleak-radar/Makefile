.PHONY: dev test

dev:
	docker compose up -d

api:
	cd apps/api && uvicorn main:app --reload

web:
	cd apps/web && npm install && npm run dev

test:
	cd apps/api && pytest -q
