# Paraglide

Use Paraglide for application localization.

Supported locales:

-   `en` --- English
-   `vi` --- Vietnamese

Default locale:

-   `en`

## Setup

Use Paraglide with TanStack Start.

Keep localization configuration in:

``` text
project.inlang/
├── settings.json
└── messages/
    ├── en.json
    └── vi.json
```

Generated Paraglide code should remain outside feature code.

Do not manually modify generated files.

## Routing

Locale MUST NOT be part of the URL.

Good:

``` text
/image
/json
/audio
```

Do not use:

``` text
/en/image
/vi/image
```

Changing language changes UI text only.

## Locale Detection

Use this priority:

``` text
locale cookie
→ Accept-Language
→ en
```

The initial server and client locale MUST match.

Do not use `localStorage` as the source of truth for the initial locale.

## Language Switch

When the user changes language:

1.  Set the Paraglide locale.
2.  Persist the locale in a cookie.
3.  Update the UI.
4.  Keep the current URL unchanged.

## Messages

Use message keys for all user-facing text.

Example:

``` json
{
  "image_title": "Image Studio",
  "image_description": "Convert images locally"
}
```

Vietnamese:

``` json
{
  "image_title": "Xử lý hình ảnh",
  "image_description": "Chuyển đổi hình ảnh ngay trên thiết bị"
}
```

Do not hardcode translated UI text inside components.

## Usage

Use generated Paraglide messages.

Prefer:

``` tsx
import * as m from "@/paraglide/messages"

<h1>{m.image_title()}</h1>
```

Avoid:

``` tsx
<h1>Image Studio</h1>
```

## Feature Messages

Prefix feature-specific message keys with the feature name.

``` text
image_title
image_description
image_convert

json_title
json_format
json_minify
```

Use generic keys only for truly shared UI.

``` text
common_copy
common_download
common_cancel
```

## What to Translate

Translate:

-   titles
-   descriptions
-   buttons
-   labels
-   errors
-   empty states
-   tooltips

Do not translate:

-   routes
-   tool IDs
-   file names
-   component names
-   variables
-   types
-   API fields
-   config keys

## Rules

-   Use Paraglide for all user-facing text.
-   Keep routes language-independent.
-   Preserve SSR.
-   Server and client MUST start with the same locale.
-   Persist locale using cookies.
-   Do not manually edit generated Paraglide files.
-   Do not create a second translation system.
