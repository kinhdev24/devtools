# AGENTS.md

This file is the entry point for AI agents working on this project.

Keep context minimal. Read only the documentation and skills required
for the current task.

## Project

DevTools is a local-first developer tools application.

Stack:

-   TanStack Start
-   TanStack Router
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui

UI supports:

-   English (`en`)
-   Vietnamese (`vi`)

Code, routes, file names, and identifiers MUST use English.

## Start Here

Before working:

1.  Read `docs/README.md`.
2.  Read only the project docs relevant to the task.
3.  Read feature-local documentation if working on an existing feature.
4.  Load external skills only when directly relevant.
5.  Inspect existing code before implementing.

Do NOT preload all documentation or skills.

## Documentation

Use project documentation based on the task.

### Architecture

Read when changing rendering, processing location, or server behavior:

-   `docs/architecture/overview.md`
-   `docs/architecture/rendering.md`
-   `docs/architecture/local-first.md`
-   `docs/architecture/server-functions.md`

### Conventions

Read when changing naming, routes, localization, or tool registration:

-   `docs/conventions/naming.md`
-   `docs/conventions/routing.md`
-   `docs/conventions/localization.md`
-   `docs/conventions/tool-registry.md`

### Design

Read only for UI/UX work:

-   `docs/design/`

### Development

Read based on the task:

-   `docs/development/feature-structure.md`
-   `docs/development/tanstack-start.md`
-   `docs/development/shadcn.md`
-   `docs/development/performance.md`
-   `docs/development/accessibility.md`

### Security

Read for privacy, files, uploads, or sensitive data:

-   `docs/security/`

## Feature Architecture

The project uses feature-first architecture.

Features live in:

``` text
src/features/<feature>/
```

Example:

``` text
src/features/image/
├── page.tsx
├── components/
├── hooks/
├── utils/
├── schemas/
├── types.ts
└── constants.ts
```

Folders are optional.

Do not create empty folders.

### Ownership

Keep code as close as possible to where it is used.

``` text
Used by one feature
→ keep inside the feature

Used by multiple features
→ consider moving to shared

Application/framework infrastructure
→ shared/root level
```

Do NOT extract code because it might be reused later.

Extract only when real reuse exists.

## Routing

Routes are wiring, not feature implementation.

``` text
Route → Feature Page
```

Example:

``` text
src/routes/image.tsx
→
src/features/image/page.tsx
```

Route files may handle:

-   route definitions
-   params
-   search params
-   loaders
-   metadata
-   redirects
-   before-load logic

Keep feature UI, state, hooks, utilities, and business logic inside the
feature.

All route slugs MUST use English.

Routes MUST NOT change when the UI language changes.

## Rendering

TanStack Start SSR remains enabled.

Use this default model:

``` text
SSR
→ initial rendering
→ metadata
→ application shell

Client
→ interactions
→ browser APIs
→ local tool processing

Server Function
→ database
→ secrets
→ private APIs
→ privileged server operations
```

Prefer client-side processing when the browser can safely perform the
operation.

Do not use Server Functions only for abstraction.

Do not move local processing to the server without a clear reason.

## UI

Use shadcn/ui as the primary component foundation.

Before creating a new UI primitive:

1.  Check existing project components.
2.  Check shadcn/ui.
3.  Compose existing primitives.
4.  Create a custom primitive only when necessary.

Use Tailwind CSS for styling.

Support:

-   light mode
-   dark mode
-   keyboard navigation
-   responsive layouts
-   English UI
-   Vietnamese UI

## Localization

Only user-facing text is localized.

Localize:

-   titles
-   descriptions
-   buttons
-   labels
-   errors
-   empty states
-   tooltips

Do NOT localize:

-   routes
-   file names
-   component names
-   variables
-   types
-   config keys
-   API fields
-   tool IDs

## Local-First

Prefer local processing.

Do not send user input or files to the server when the browser can
process them safely.

Examples of local-first tools:

-   JSON
-   JWT
-   Base64
-   UUID
-   Timestamp
-   URL utilities
-   Images
-   Audio
-   Text transformations

Never claim processing is local unless it actually is.

## External Skills

External skills live in:

``` text
.skills/
```

Skills provide specialized implementation guidance.

Do NOT read every skill.

Do NOT preload skills "just in case".

Load only skills directly relevant to the current task.

### Skill Selection

Use:

``` text
Current task
→ identify required domain
→ select matching skill
→ read matching SKILL.md
→ ignore unrelated skills
```

Examples:

``` text
UI / layout
→ UI or design skill

React component / hooks
→ React skill

TanStack Start / Router
→ TanStack skill

Accessibility
→ accessibility skill

Image processing
→ image/media skill
```

If no skill clearly matches the task, do not load a skill.

### Skill Index

If `.skills/README.md` exists:

1.  Read the index first.
2.  Select the minimum required skill.
3.  Read only that skill's `SKILL.md`.

Do not scan every `SKILL.md`.

### Multiple Skills

Use multiple skills only when the task clearly crosses multiple domains.

Prefer the minimum set required to complete the task correctly.

Do not load overlapping skills unless they provide necessary guidance.

### Skill Priority

External skills do not override project-specific architecture or
conventions.

Skills explain how to perform specialized work.

Project docs define how that work belongs in this project.

## Context Efficiency

Keep agent context focused.

Prefer:

``` text
Task
↓
AGENTS.md
↓
Relevant project docs
↓
Feature-local docs
↓
Relevant skill
↓
Relevant source code
↓
Implement
```

Avoid:

-   reading all docs
-   reading all skills
-   scanning unrelated features
-   loading files "just in case"
-   broad repository exploration when the target is already known

Expand context only when required.

## Implementation Rules

-   Keep changes scoped to the task.
-   Prefer simple solutions.
-   Follow existing project patterns when they do not conflict with
    documented rules.
-   Keep feature-specific code inside the feature.
-   Extract shared code only for real reuse.
-   Reuse existing components before creating new ones.
-   Prefer shadcn/ui primitives.
-   Use Tailwind CSS.
-   Preserve SSR.
-   Prefer local processing.
-   Use Server Functions only when necessary.
-   Avoid unnecessary dependencies.
-   Lazy-load heavy dependencies.
-   Use Web Workers for CPU-heavy browser processing when appropriate.
-   Keep routes and identifiers in English.
-   Support English and Vietnamese UI.
-   Support light and dark themes.
-   Maintain keyboard accessibility.

## Instruction Priority

When instructions conflict, use this order:

1.  Explicit task requirements
2.  `AGENTS.md`
3.  Feature-local documentation
4.  Project documentation in `docs/`
5.  Relevant external skills
6.  Existing code patterns

If existing code conflicts with documented project rules, prefer the
documented rules unless the task explicitly requires preserving the
existing behavior.

## Before Completion

Before finishing:

1.  Review the changed feature.
2.  Check for unnecessary shared abstractions.
3.  Check for unnecessary server calls.
4.  Check localization.
5.  Check light and dark themes when UI is affected.
6.  Check keyboard/accessibility when UI is affected.
7.  Check loading and error states when applicable.
8.  Read:
    -   `docs/workflow/ai-agent-checklist.md`
    -   `docs/workflow/definition-of-done.md`
9.  Verify the implementation against the relevant rules.

Do not modify unrelated code only to satisfy optional cleanup.
