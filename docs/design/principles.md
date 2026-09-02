# Design Principles

DevTools is a developer workbench.

Optimize for:

1. Speed
2. Clarity
3. Low visual noise
4. Keyboard-first interaction
5. Developer familiarity
6. Local-first trust

## Prefer

- Floating Card UI (elevated surfaces)
- Compact, clean layout
- Neutral colors with vibrant accents for status/interactions
- Very subtle borders (`border-border/40`) and soft shadows (`shadow-sm`)
- Clear hierarchy
- Functional interfaces with terminal/macOS window aesthetics
- Subtle background patterns (e.g., global dot grid) to provide depth

## Avoid

- Heavy Glassmorphism (subtle `backdrop-blur` is fine, but don't overdo it)
- Neon or Cyberpunk styles
- Large gradients
- Giant, blocky cards (keep them floating and light)
- Excessive, deep shadows
- Distracting decorative animations (micro-interactions on hover/click are encouraged)

## Direction

Raycast speed

- Linear clarity
- VS Code familiarity
