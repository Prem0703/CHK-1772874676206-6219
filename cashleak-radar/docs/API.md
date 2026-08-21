# API contract

## Health

`GET /health`

## Status

`GET /api/status`

## Dashboard

`GET /api/dashboard/summary`

## Demo

`GET /api/demo/analyze`

## Reconciliation

`POST /api/reconciliation/analyze`

Request contains invoice and payment arrays. Response contains explainable anomalies and a count.
