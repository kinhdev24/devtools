# 🛠 DevTools

> A premium, local-first developer tools application built with modern web technologies.

DevTools provides a suite of essential utilities for developers, with a strong focus on privacy, speed, and aesthetics. Everything runs locally in your browser whenever possible—meaning your sensitive data (like JWTs or JSON payloads) never leaves your machine unless explicitly required.

## ✨ Features

- **🔒 Local-First Architecture**: Most tools process data entirely within the browser using Web Workers and native APIs.
- **🎨 Premium UI/UX**: Designed with a "floating card" aesthetic, glassmorphism (`backdrop-blur`), and responsive layouts.
- **🌗 Dark Mode Ready**: Seamless light/dark theme switching with system preference detection.
- **🌐 Internationalization (i18n)**: Full support for English (`en`) and Vietnamese (`vi`).
- **⌨️ Keyboard Centric**: Powerful Command Palette (`⌘K`) for quick navigation and tool execution.

## 🧰 Available Tools

### Developer
- **JSON Studio**: Advanced JSON formatter, validator, and viewer with syntax highlighting.
- **JWT Decoder**: Decode, inspect, and verify JSON Web Tokens (supports HMAC signature verification).
- **Timestamp**: UNIX timestamp converter *(Coming Soon)*.
- **Regex Tester**: Regular expression tester and visualizer *(Coming Soon)*.

### Media
- **Image Studio**: Local image compression, format conversion, and EXIF viewer *(Coming Soon)*.
- **Audio Studio**: Audio metadata inspector and converter *(Coming Soon)*.

### Vietnam Specific
- **Vietnamese Text**: Utility for handling Vietnamese character conversions and formatting *(Coming Soon)*.
- **Money Reader**: Convert numbers to Vietnamese currency text *(Coming Soon)*.

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) + [React 19](https://react.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **i18n**: [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)

## 📦 Getting Started

### Prerequisites
- Node.js (v20+)
- `yarn` or `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kinhdev24/devtools.git
   cd devtools
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```
   The application will be available at `http://localhost:3000`.

### Production Build

To build the application for production:
```bash
yarn build
```

## 🏗 Architecture & Guidelines

This project strictly follows a **Feature-First Architecture**.
Code is grouped by feature rather than by type (e.g., `src/features/jwt/` instead of globally scattering components, hooks, and utilities).

For detailed documentation, please refer to the following:
- 📖 [AGENTS.md](./AGENTS.md): The core rulebook and entry point for AI/Developer context.
- 🏗 [Architecture Overview](./docs/architecture/overview.md)
- 💅 [Design Principles](./docs/design/principles.md)

### Key Rules
- **English First**: Code, routes, file names, and identifiers MUST use English. Only user-facing text is localized.
- **Local-First**: Never send user input to the server if the browser can process it safely.
- **Server Functions**: Used strictly for database access, secrets, private APIs, or privileged operations.

## 🤝 Contributing

1. Review `AGENTS.md` before writing code to understand the architectural boundaries and style guidelines.
2. Ensure you run `yarn check` (Biome) to validate formatting and linting.
3. Keep feature UI, state, hooks, and business logic tightly cohesive inside `src/features/<feature-name>/`.

---
*Built with ❤️ for developers.*
