# Architecture

DevTools uses TanStack Start as a full-stack framework.

## Model

Browser
├── UI
├── Local processing
├── Tool state
└── Local preferences

TanStack Start Server
├── SSR
├── Server Functions
└── Server-only integrations

## Rule

Prefer:

Client processing
→ when the browser can safely perform the operation.

Use server processing
→ only when server capabilities are required.

Do not introduce server dependencies unnecessarily.
