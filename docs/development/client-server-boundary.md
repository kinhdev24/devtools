# Client / Server Boundary

Choose execution location based on capability.

## Client

Prefer client execution when the operation:

- Uses user-provided local data
- Requires browser APIs
- Does not require secrets
- Does not require database access
- Can run efficiently in the browser

Examples:

JSON
JWT
Image conversion
Audio conversion
UUID
Base64

## Server

Use server execution when the operation requires:

- Secrets
- Database access
- Authentication authority
- Private APIs
- Server filesystem
- Privileged processing

## Rule

Do not call the server only for abstraction.

Network boundaries must provide real value.
