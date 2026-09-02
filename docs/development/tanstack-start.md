# TanStack Start

The application uses TanStack Start.

Do not treat the application as a client-only SPA.

SSR remains part of the architecture.

## Default Strategy

Render pages with TanStack Start.

Execute browser-capable tool logic on the client.

Call Server Functions only when server capabilities are required.

## Prefer

SSR
→ page shell and static content

Client
→ tool interaction and local processing

Server Function
→ database, secrets, private services, privileged operations

## Rule

Do not move an operation to the server without a clear reason.

Do not disable SSR globally to simplify client-side tools.
