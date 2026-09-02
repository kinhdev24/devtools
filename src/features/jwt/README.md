# JWT Decoder

Local-first JWT decoder, inspector, and HMAC verifier. No network calls. No token ever leaves the browser.

**Route:** `/jwt` → `src/routes/jwt.tsx` → `src/features/jwt/page.tsx`

## Structure

```
src/features/jwt/
├── page.tsx                    — state, layout, live clock
├── types.ts                    — JwtStatus, JwtParts, JwtDecodeResult, VerifyStatus
├── utils/jwt.ts                — decode, status check, HMAC verify, time helpers
└── components/
    ├── jwt-input.tsx            — textarea + color-coded part preview
    ├── jwt-decoded.tsx          — header + payload claim tables
    ├── jwt-timeline.tsx         — validity window bar (iat → nbf → now → exp)
    └── jwt-signature.tsx        — HMAC verify panel (SubtleCrypto)
```

## State model

```
[token]  ←  initialised from ?token= search param, then URL cleaned
  → decodeResult    decodeJwt(token)           (useMemo)
  → status          getTokenStatus(payload, now) (useMemo)
  → errorMessage    localised error string       (useMemo)

[now]  ←  updates every second via setInterval (only when token has exp/nbf)
```

No `useEffect` for data transforms. Only two effects:
1. Clean `?token=` from URL on mount.
2. `setInterval` for the live clock (cleans up on unmount).

## Utilities (utils/jwt.ts)

| Function | Description |
|----------|-------------|
| `decodeJwt(token)` | Split `.`, base64url-decode, parse JSON → `JwtDecodeResult` |
| `getTokenStatus(payload, now)` | Check `nbf` / `exp` → `valid \| expired \| not_yet_valid` |
| `verifyHmac(token, secret, alg)` | Browser `crypto.subtle` HMAC verify → `valid \| invalid \| unsupported` |
| `formatTimestamp(unix)` | `Intl.DateTimeFormat` → human-readable date string |
| `formatRelative(unix, now)` | `Intl.RelativeTimeFormat` → "in 2 hours", "3 days ago" |

## Signature verification

Uses **Web Crypto API** (`SubtleCrypto`) — no library, no server.

Supported: `HS256`, `HS384`, `HS512` (HMAC).

For RSA/ECDSA (`RS256`, `ES256`, etc.): shows an explanatory note — not implemented.

Signing input: `base64url(header) + "." + base64url(payload)`.
Signature bytes: decoded from the third JWT segment via base64url.

## Timeline

Rendered when payload has at least one of `iat` or `exp`.

Bar fills left-to-right based on `(now - iat) / (exp - iat)`.
Color: green = valid, red = expired, amber = not yet valid (nbf in future).

## Home page integration

Detected tool `jwt` → `Link to="/jwt" search={{ token: value }}`.
JWT is pre-filled in the input when navigating from home.

## Localization

Key prefix: `jwt_`.
Source: `messages/en.json`, `messages/vi.json`.

Key groups: `jwt_status_*`, `jwt_error_*`, `jwt_section_*`, `jwt_claim_*`, `jwt_timeline_*`, `jwt_verify_*`.

## Roadmap

| Feature | Notes |
|---------|-------|
| RS256/ES256 verification | Requires PEM public key input. Use `crypto.subtle.importKey` with SPKI format. |
| Token generator | Build a token from header + payload + secret. |
| Token comparison | Paste two tokens, diff their payloads. |
| Share via URL | Encode token in URL hash (not query param) to avoid server logs. |

## Rules

- **Never send the token or secret to the server.**
- Verify uses `crypto.subtle` only — no library.
- Live clock runs only when there are time-based claims (`exp`/`nbf`).
- Localize all user-facing text in both `en.json` and `vi.json`.
- Route slug must remain `/jwt` regardless of UI language.
