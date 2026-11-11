# Mini Datadog

Log monitoring platform: ingest logs via API, store in SQLite,
view on a live dashboard, get alerts on error spikes.

## Run
docker compose up --build
Open http://localhost:2000

## Features
- POST /logs ingestion API
- SQLite persistence (Docker volume)
- Dashboard with level filter and search
- Alert: 5+ ERRORs in 1 minute
- Load test: 544 logs/sec (baseline)

## Tech
Node.js, Express, SQLite, Docker Compose