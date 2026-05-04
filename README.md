# Nabil Ahmed — Portfolio

Personal portfolio and CMS for [Nabil Ahmed](https://github.com/Nabil-Ahmed-Sheikh), Full-Stack & Cloud Engineer.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **CSS Modules** with CSS custom properties for theming (light / dark)
- **GSAP** for scroll and entrance animations
- **Jest** + **React Testing Library**

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in required vars (see below)
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of the admin password |
| `JWT_SECRET` | Secret used to sign session tokens |
| `RESEND_API_KEY` | Resend API key for the contact form |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://nabilahmed.dev`) |

## Commands

```bash
npm run dev           # dev server
npm run build         # production build
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier write
npm run format:check  # Prettier check
npm run test          # Jest (all tests)
npm run test:watch    # Jest watch mode
npm run test:coverage # Jest with coverage
```

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout (fonts, theme, cursor)
│   ├── admin/                # Admin CMS (auth-gated)
│   └── api/                  # Route handlers (contact, admin CRUD)
├── components/               # UI components (co-located CSS + tests)
├── contexts/                 # ThemeContext
├── data/                     # Portfolio content (projects, experience, stack…)
├── lib/                      # Auth helpers, data fetching
└── types/                    # Shared TypeScript types
```

## Content

All portfolio content lives in `src/data/`. Edit the files there — no component changes needed:

| File | What it controls |
|---|---|
| `personal.ts` | Name, bio, tagline, social links |
| `projects.ts` | Project cards and detail pages |
| `experience.ts` | Work history |
| `stack.ts` | Tech stack items |
| `stats.ts` | Hero stats bar |

## Admin portal

A password-protected CMS is available at `/admin/login`. It lets you manage projects, experience, and tech stack entries without touching the codebase. Auth is handled via JWT cookies; the middleware at `src/middleware.ts` guards all `/admin/*` routes.

## Theming

Colors are CSS custom properties (`--bg`, `--ink`, `--accent`, etc.) defined in `src/app/globals.css`. `ThemeContext` persists the chosen theme to `localStorage` and sets `data-theme` on `<html>`. To add a theme, add an entry in `src/styles/themes.ts` and a matching `[data-theme='name']` block in `globals.css`.
