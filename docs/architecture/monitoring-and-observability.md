# Monitoring and Observability

Monitoring Stack
- Frontend Monitoring: Basic console/error logging (no SaaS in v1).
- Backend Monitoring: `GET /healthz` (process up), `GET /readyz` (DB + session store OK).
- Error Tracking: Log-based review (no external trackers).
- Performance Monitoring: Request timing logs via Pino.

Logging
- Pino structured JSON logs with `requestId` middleware.
- Per request: method, path, status, duration_ms, requestId.
- Log levels: info/warn/error.

Log Retention
- Daily rotation, retain 7-14 days (shared hosting friendly).

Session Housekeeping
- Scheduled purge of expired sessions (cron or periodic job) using `expires_at` index.
