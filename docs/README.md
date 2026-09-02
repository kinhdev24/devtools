# Project Documentation

This directory contains the rules for building DevTools.

## Stack

- TanStack Start
- React
- TypeScript
- shadcn/ui
- Tailwind CSS

## Core Principles

- Local-first when possible.
- SSR remains enabled.
- Run browser-capable tools on the client.
- Use Server Functions only when server access is required.
- Keep routes and code identifiers in English.
- UI supports English and Vietnamese.

## Agent Reading Order

Before starting any task:

1. Read this file.
2. Check `.skills/` for relevant installed skills.
3. Read only the skills related to the current task.
4. Read the relevant project documentation below.

Project rules take priority over generic skill recommendations.

## Installed Skills

Skills are located in:

- `.skills/`

When a skill is relevant:

- Read its `SKILL.md` first.
- Follow references from `SKILL.md` only when needed.
- Do not load unrelated skills.
- Use skills as implementation guidance.
- Project-specific rules override skill defaults when they conflict.

Examples:

- UI task → check UI/design/shadcn skills.
- TanStack task → check TanStack/React skills.
- Testing task → check testing skills.
- Accessibility task → check accessibility skills.

## Agent Reading Guide

For UI work:

- design/principles.md
- design/components.md
- development/shadcn.md

For a tool:

- features/<tool>.md
- architecture/local-first.md
- development/client-server-boundary.md

Before completing work:

- workflow/ai-agent-checklist.md
- workflow/definition-of-done.md
