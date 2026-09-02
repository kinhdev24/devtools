# Performance

Developer tools should feel instant.

## Rules

Lazy-load heavy dependencies.

Examples:

- Image codecs
- Audio codecs
- Code editors
- WASM libraries

Do not include heavy tool libraries in the main bundle.

Use Web Workers when CPU-heavy processing can block the UI.

Avoid unnecessary network requests.

Avoid unnecessary React renders.

Show progress for long-running operations.
