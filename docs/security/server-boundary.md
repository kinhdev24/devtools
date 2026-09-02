# Server Boundary

Every server call must have a reason.

Valid reasons include:

- Database
- Secrets
- Authentication
- Private API
- Presigned upload
- Server-only processing

## Rule

Never move sensitive local data to the server simply because TanStack Start supports Server Functions.

Server Functions are a capability, not the default execution location.
