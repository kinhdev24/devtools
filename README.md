# DevTools Project Overview

This is a local-first developer tools application built with TanStack Start, React, and Tailwind CSS. All tools are designed to process data locally in the browser for maximum privacy and performance.

## Application Architecture

- **Structure**: Feature-first architecture (`src/features/`). All logic, components, and hooks specific to a tool must live in its respective feature directory.
- **Routing**: TanStack Router (`src/routes/`). Route files should only handle wiring, not business logic.
- **UI Framework**: React with shadcn/ui primitives.
- **Styling**: Tailwind CSS (v4).
- **Internationalization (i18n)**: Paraglide. Support for English (`en`) and Vietnamese (`vi`).
- **Core Design System**: Every tool must be wrapped inside the `ToolWindow` component (`src/components/layout/tool-window.tsx`).

## Current Implemented Features

### 1. JSON Studio (`/json`)
- Format and minify JSON data.
- Validate JSON structure and pinpoint syntax errors (line/column).
- Includes one-click copy and clear functionality.

### 2. JWT Decoder (`/jwt`)
- Decode JSON Web Tokens locally.
- Inspect decoded Header and Payload details.
- Verify HMAC signatures using a secret key.
- Visualize token expiration timelines (Issued, Not Before, Expires, Now).

### 3. Timestamp Inspector (`/timestamp`)
- Convert between Unix epochs (seconds, milliseconds, microseconds, nanoseconds) and ISO 8601/RFC 2822 dates.
- Timezone inspector to view the same instant in different regions.
- Time arithmetic tool to add or subtract days, hours, minutes, etc.
- Code snippets generator for common runtime environments.

### 4. Regex Tester (`/regex`)
- UI scaffolded for testing and visualizing regular expressions.
- Features: pattern editor, flag toggle group (g, i, m, s, u, y), test case manager, and match group inspector.
- Status: UI implemented, core logic pending.

## Planned Features (Not Yet Implemented)

- **Image Studio**: Convert and optimize images locally.
- **Audio Studio**: Inspect and convert audio files.
- **Vietnamese Text**: Normalize and transform Vietnamese strings/slugs.
- **Money Reader**: Read numbers as Vietnamese currency strings.

## Development Setup

1. Install dependencies: `yarn install`
2. Run development server: `yarn dev`
3. The app is available at `http://localhost:3000` (or `3001` if port is taken).

## Rules for AI Agents

When working on this codebase:
1. Always adhere strictly to the rules defined in `AGENTS.md`.
2. Do not introduce server dependencies (Server Functions) for local-first tools.
3. Only use English for route slugs and file names.
4. Keep the UI unified by utilizing existing layout wrappers and shadcn/ui components.
