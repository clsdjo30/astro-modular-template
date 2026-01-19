# Operational Requirements
- Logging: API logs for auth, checkout, and order creation with request IDs.
- Monitoring: basic health checks and error log review workflow documented.
- Deployment: static UI and API deployed independently; rollback via previous build artifacts.
- Backups: database backup procedure documented (daily recommended).
- Capacity/Availability: Self-hosted target assumes low-to-moderate traffic; API should handle small-business peak loads with graceful degradation rather than strict SLA guarantees.
