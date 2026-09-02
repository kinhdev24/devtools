# Routing Conventions

The project uses TanStack Router with TanStack Start.

## Core Rules

-   Use TanStack Router file-based routing.
-   All route slugs MUST be English.
-   Routes MUST NOT be localized.
-   Keep route files thin.
-   Route files handle routing only.
-   Feature implementation belongs in `src/features`.

## Structure

``` text
src/
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── image.tsx
│   ├── audio.tsx
│   └── json.tsx
│
└── features/
    ├── image/
    │   └── page.tsx
    ├── audio/
    │   └── page.tsx
    └── json/
        └── page.tsx
```

## Route Responsibility

Routes connect URLs to feature pages.

Example:

``` tsx
import { createFileRoute } from "@tanstack/react-router"
import { ImagePage } from "@/features/image/page"

export const Route = createFileRoute("/image")({
  component: ImagePage,
})
```

Keep feature UI, state, hooks, and business logic out of route files.

Use route-level APIs only for routing concerns such as:

-   params
-   search params
-   loaders
-   metadata
-   redirects
-   before-load logic

## Feature Ownership

A feature owns everything specific to itself.

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

Keep code inside the feature when it is only used by that feature.

Move code to shared folders only when it is actually reused.

## Localization

Routes always use English.

Good:

``` text
/image
/audio
/json
/json/diff
/jwt
/timestamp
/vietnamese/slug
```

Bad:

``` text
/hinh-anh
/am-thanh
/dinh-dang-json
```

Changing the UI language MUST NOT change the URL.

Only user-facing text supports:

-   English (`en`)
-   Vietnamese (`vi`)

## Rendering

TanStack Start SSR remains enabled.

Use:

-   SSR for initial page rendering and metadata.
-   Client-side code for browser-capable tool processing.
-   Server Functions only when server capabilities are required.

Do not use loaders or Server Functions for local tool processing.

## Mental Model

``` text
Route   = routing
Feature = implementation
Shared  = reusable code
Server  = only when required
```
