# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check only
npm run test         # Jest (all tests)
npm run test:watch   # Jest in watch mode
npm run test:coverage # Jest with coverage report
```

Run a single test file:
```bash
npx jest src/components/Nav/Nav.test.tsx
```

Run tests matching a name pattern:
```bash
npx jest --testNamePattern="renders the logo"
```

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · CSS Modules · Jest + React Testing Library

### Theming

The theme system is the most non-obvious part of this codebase. All colors are CSS custom properties (`--bg`, `--ink`, `--accent`, etc.) defined in `src/app/globals.css` under `:root` (light) and `[data-theme='dark']` selectors.

`src/contexts/ThemeContext.tsx` is a `'use client'` provider that:
- Reads/writes `localStorage` to persist the chosen theme
- Sets `document.documentElement.setAttribute('data-theme', theme)` on change
- Exposes `{ theme, setTheme, toggleTheme }` via `useTheme()`

To add a new theme, add an entry to `src/styles/themes.ts` (`ThemeDefinition` with `cssVars`) and add the corresponding `[data-theme='new-theme']` block in `globals.css`.

### Data layer

All portfolio content lives in `src/data/`. Each file exports a typed array or object:

| File | Exports | Used by |
|------|---------|---------|
| `personal.ts` | `personal`, `socialLinks` | Hero, Footer, Nav, Contact, SocialLinks |
| `projects.ts` | `projects` | Projects, ProjectCard |
| `experience.ts` | `experience` | Experience, ExperienceItem |
| `stack.ts` | `stack` | TechStack, StackItem |
| `stats.ts` | `stats` | StatsBar |

Changing portfolio content means editing data files only — no component changes needed.

### Component conventions

- Every component lives in `src/components/<Name>/` with four co-located files: `Name.tsx`, `Name.module.css`, `Name.test.tsx`, `index.ts`.
- CSS Modules reference CSS variables (`var(--ink)`, `var(--accent)`) — never hard-coded colors. This is what makes theming work.
- Components that use browser APIs or React hooks (`useState`, `useEffect`, `useContext`) must start with `'use client'`. Currently client components: `FadeIn`, `ThemeToggle`, `ContactForm`, `ThemeContext`.
- All other components are Server Components by default.

### FadeIn

`src/components/FadeIn/FadeIn.tsx` is a client wrapper that uses `IntersectionObserver` to animate children into view. Wrap any section or element with `<FadeIn delay={ms}>` for the staggered entrance effect. The observer is mocked in `jest.setup.ts` so tests don't break in jsdom.

### Fonts

Fonts are loaded via `next/font/google` in `src/app/layout.tsx` (DM Sans → `--font-sans`, DM Serif Display → `--font-serif`). Components reference them as `font-family: var(--font-serif, Georgia, serif)` in CSS Modules — the fallback ensures readable text if the font hasn't loaded.

### Contact form

`ContactForm.tsx` currently simulates a 600 ms delay and shows a success state. The `handleSubmit` function has a `TODO` comment marking where to wire in a real email provider (Resend, EmailJS, Formspree, etc.).

### Testing notes

- `jest.setup.ts` mocks `IntersectionObserver`, `ResizeObserver`, `matchMedia`, and `localStorage`.
- Components that consume `ThemeContext` need a `<ThemeProvider>` wrapper in tests — pass it as the `wrapper` option: `render(<Component />, { wrapper: ThemeProvider })`.
- `next/link` must be mocked in component tests: `jest.mock('next/link', ...)`.

## Commit standard

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

**Types:**

| Type | When to use |
|------|-------------|
| `feat` | New feature or visible behaviour change |
| `fix` | Bug fix |
| `docs` | Documentation only (CLAUDE.md, README, comments) |
| `style` | Formatting, CSS, no logic change |
| `refactor` | Code restructure with no behaviour change |
| `test` | Adding or updating tests |
| `chore` | Build config, tooling, deps, CI |

**Rules:**
- Subject is lowercase, imperative mood, no trailing period: `feat(nav): add mobile hamburger menu`
- Scope is optional but recommended; use the component or area name: `fix(contact-form): handle empty email`
- Keep the subject under 72 characters; add a body (blank line after subject) for non-obvious context
- Breaking changes: append `!` after the type/scope and explain in the body: `feat(theme)!: remove light-sepia variant`
