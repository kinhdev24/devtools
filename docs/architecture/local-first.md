# Local-First

Prefer local processing.

User data should stay on the device whenever possible.

## Local Candidates

- JSON
- JWT
- Base64
- UUID
- Timestamp
- URL utilities
- Images
- Audio
- Text transformations

## Rule

Do not send tool input to the server if the browser can process it.

Do not create Server Functions only to wrap local utilities.

## UI

When processing is local, show:

Processed locally

Tooltip:

Your data never leaves this device.
