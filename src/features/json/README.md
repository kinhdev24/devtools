# JSON Studio

Local-first JSON formatter, validator, and inspector. All processing runs in the browser — no server calls.

**Route:** `/json` → `src/routes/json.tsx` → `src/features/json/page.tsx`

## Structure

```
src/features/json/
├── page.tsx                 — state, layout
├── types.ts                 — JsonStatus, JsonMode, JsonParseResult
├── utils/json.ts            — parseJson, formatJson, minifyJson
└── components/
    ├── json-toolbar.tsx     — Format · Minify · Copy · Clear · StatusBadge
    ├── json-input.tsx       — textarea input
    └── json-output.tsx      — output + syntax highlighter
```

## State model

All state lives in `page.tsx`. Everything else is derived via `useMemo`.

```
[input, mode]
  → parseResult   parseJson(input)
  → status        "idle" | "valid" | "invalid"
  → errorMessage  localized error with line/col
  → output        formatJson | minifyJson
```

No `useEffect`. No server calls.

## Syntax highlighting

`json-output.tsx` → `SyntaxHighlight` runs a single regex pass over the formatted string.

Token colors use CSS custom properties defined in `src/styles.css`:

```
--json-key      blue   (string before ":")
--json-string   green  (string value)
--json-number   amber
--json-keyword  violet (true / false / null)
```

Both light and dark values are defined. Tokens use `style={{ color: "var(--json-*)" }}`.

## Error extraction

`utils/json.ts` → `extractPosition()` parses browser-specific `SyntaxError` messages:

| Browser   | Format                                  |
| --------- | --------------------------------------- |
| Chrome/V8 | `at position N` → converted to line/col |
| Firefox   | `at line N column N`                    |
| Safari    | `at line N`                             |

## Localization

All UI text uses Paraglide. Key prefix: `json_`.

Source files: `messages/en.json`, `messages/vi.json`.

Key keys: `json_format`, `json_minify`, `json_copy`, `json_copy_done`, `json_clear`, `json_status_valid`, `json_status_invalid`, `json_status_idle`, `json_error_line`, `json_empty_output`.

## Roadmap

| Feature            | Notes                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Tree view          | Collapse/expand nodes. Lazy-load any lib.                                                      |
| JSON diff          | New route `/json/diff`, 3-panel layout.                                                        |
| Path copy          | Click a key → copy its JSONPath. Requires refactoring `SyntaxHighlight` into a tree structure. |
| Schema validation  | Use `ajv` via dynamic import.                                                                  |
| Large file support | Move `parseJson`/`formatJson` to a Web Worker for inputs > 1 MB.                               |
| Format options     | Configurable indent: 2 / 4 spaces / tab.                                                       |

## Rules

- **Local-first.** Never send JSON to the server.
- **Lazy-load** any heavy library (ajv, diff engine, tree renderer).
- **Prefer `useMemo`** for derived values. Avoid `useEffect` for data transforms.
- **Localize** all user-facing text in both `en.json` and `vi.json`.
- **Route slugs** must be English (`/json/diff`, not `/json/so-sanh`).
