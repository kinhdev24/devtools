# Server Functions

Use TanStack Start Server Functions only when server access is required.

## Good Use Cases

- Database access
- Secrets
- Private API credentials
- Authentication
- Presigned upload URLs
- Server-only integrations
- Heavy processing unsuitable for browsers

## Avoid

Do NOT use Server Functions for:

- JSON formatting
- JSON conversion
- JWT decoding
- UUID generation
- Base64
- Basic image conversion
- Basic audio conversion

when these can run safely in the browser.

## Rule

Client first.

Server only when necessary.
