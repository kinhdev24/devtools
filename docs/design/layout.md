# Application Layout

This file defines the canonical application shell.

For related rules, read:

-   `docs/conventions/routing.md`
-   `docs/conventions/localization.md`
-   `docs/development/paraglide.md`
-   `docs/development/shadcn.md`
-   `docs/development/accessibility.md`
-   `docs/design/theming.md`
-   `docs/design/components.md`

## Canonical Desktop Layout

``` text
┌──────────────────────────────────────────────────────────────┐
│  </> devtools.vn                 ⌘ K Search       GitHub ★   │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│  ◉ Home       │             What are you working with?       │
│               │                                              │
│  DEVELOPER    │     ┌──────────────────────────────────┐     │
│  {} JSON      │     │ Paste JSON, JWT, URL, text...    │     │
│  🔐 JWT       │     │                                  │     │
│  ⏱ Timestamp  │     └──────────────────────────────────┘     │
│  .* Regex     │                                              │
│               │        Drop a file here                      │
│  MEDIA        │                                              │
│  ▧ Image      │                                              │
│  ♫ Audio      │                                              │
│               │                                              │
│  VIETNAM      │     Recently used                            │
│  Aa Text      │     JSON Studio     Image Studio     JWT     │
│  ₫ Money      │                                              │
│               │                                              │
│  ─────────    │                                              │
│  ⚙ Settings   │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

This structure is canonical.

Do not replace it with:

-   dashboard card grids
-   marketing landing pages
-   centered hero layouts
-   large decorative sections

## Structure

``` text
AppShell
├── TopNav
├── Sidebar
└── Workspace
```

Recommended shared components:

``` text
src/components/layout/
├── app-shell.tsx
├── top-nav.tsx
├── sidebar.tsx
├── mobile-nav.tsx
├── language-switcher.tsx
└── theme-toggle.tsx
```

## TopNav

Contains global actions only:

-   product logo/name
-   command palette
-   language switcher
-   theme switcher
-   GitHub link

Keep it compact.

## Sidebar

Persistent on desktop.

Order:

``` text
Home

DEVELOPER
JSON
JWT
Timestamp
Regex

MEDIA
Image
Audio

VIETNAM
Text
Money

Settings
```

Use the tool registry as the source of truth.

Use Lucide icons, not emoji.

## Workspace

Home shows:

``` text
Universal Input
↓
File Drop
↓
Recently Used
```

Feature routes replace Home content inside the same workspace.

Do not recreate the AppShell per feature.

## Home

Home is a workbench, not a marketing page.

Primary interaction:

``` text
What are you working with?

[ Paste JSON, JWT, URL, text... ]

Drop a file here
```

Universal Input should detect supported content and route to the
relevant tool when possible.

Recently Used stays compact.

Avoid large cards.

## Feature Pages

Feature pages render inside the workspace.

``` text
Route
→ Feature Page
→ Workspace
```

Feature implementation stays in:

``` text
src/features/<feature>/
```

See:

-   `docs/development/feature-structure.md`
-   `docs/conventions/routing.md`

## Mobile

Hide the persistent sidebar.

Use:

``` text
TopNav
↓
Workspace
```

Open navigation with a mobile menu or shadcn Sheet.

Use the same feature implementation responsively.

## Localization

All visible layout text uses Paraglide.

Routes remain unchanged between `en` and `vi`.

See:

-   `docs/conventions/localization.md`
-   `docs/development/paraglide.md`

## Design

Prefer:

-   floating card layouts with subtle depth (`shadow-sm`)
-   very subtle borders (`border-border/40`)
-   neutral surfaces with a global dot-grid background for depth
-   clear hierarchy with pill-shaped or floating components (e.g., toolbars)
-   editor-like UI with modern terminal/macOS window controls
-   high information density but with comfortable padding

Avoid:

-   heavy glassmorphism
-   neon or large gradients
-   giant blocky cards
-   excessive shadows
-   distracting animation (micro-animations on hover/click are encouraged)

Direction:

``` text
Raycast speed
+ Linear clarity
+ VS Code familiarity
+ Vercel restraint
```

See:

-   `docs/design/principles.md`
-   `docs/design/theming.md`

## Rules

-   Follow the canonical layout above.
-   Keep TopNav and Sidebar persistent on desktop.
-   Keep Home action-first.
-   Use the tool registry for global navigation.
-   Keep routes thin.
-   Keep feature logic inside features.
-   Use Paraglide for visible text.
-   Keep AppShell lightweight.
