# Feature Structure

The project uses a feature-first architecture.

Each feature owns its:

- page
- components
- hooks
- utils
- types
- schemas
- constants
- tests

Keep code inside the feature unless it is reused by multiple features.

## Structure

Example:

src/features/image-tools/
├── page.tsx
├── components/
├── hooks/
├── utils/
├── schemas/
├── types.ts
├── constants.ts
└── README.md

## Ownership Rule

Default:

Keep code inside the feature.

Move code to shared only when it is used by multiple features.

Good:

src/features/image-tools/components/image-preview.tsx

Bad:

src/components/image-preview.tsx

when ImagePreview is only used by image-tools.

## Shared Code

Only shared code belongs in:

src/components/
src/hooks/
src/utils/
src/lib/

Examples:

Button used by many features
→ src/components/

formatFileSize used by image and audio
→ src/utils/

useClipboard used everywhere
→ src/hooks/

## Feature Page

Each feature exposes its main page through:

page.tsx

Example:

src/features/image-tools/page.tsx

The route imports this page.

## Route

Routes should stay thin.

Example:

src/routes/image.tsx

import { ImageToolsPage } from "@/features/image-tools/page"

export const Route = createFileRoute("/image")({
component: ImageToolsPage,
})

Do not put feature logic inside route files.

## Rule

Route = wiring.

Feature = implementation.
