# Client Handoff (Setup + Maintenance)

## Setup Checklist
- Confirm domains and DNS (UI: `client.tld`, API: `api.client.tld`).
- Provision SSL/TLS certificates for UI and API.
- Obtain o2switch panel access for the API service.
- Prepare database credentials (DB_*).
- Set required environment variables (see below).
- Confirm deploy method (Git deploy or upload + restart).
- Verify backup location and schedule.

## Environment Variables
Frontend (static UI):
- `PUBLIC_API_BASE_URL` (points to the API origin)

Backend (API service):
- `DB_*` (database connection settings)
- `SESSION_SECRET`
- `API_ALLOWED_ORIGIN`
- `NODE_ENV`

## Maintenance Checklist (Minimal)
- Backups: verify daily DB backups and restore process quarterly.
- Log rotation: ensure API logs are rotated and retained.
- Updates: apply security updates and Node.js LTS updates on a regular cadence.
- Monitoring: review error logs after deploys and confirm health checks.
