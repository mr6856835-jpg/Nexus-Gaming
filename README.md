# Nexus Gaming

A gaming community website — discover games, compete in tournaments, and climb the global
leaderboards. Built as a fast, single-page React app with a dark neon esports aesthetic.

> **Demo project.** Every game, player, tournament, and stat on the site is fictional sample data.

## Features

| Page | Route | What it does |
| --- | --- | --- |
| **Home** | `/` | Hero spotlight, trending games, live tournaments, top-5 leaderboard, clips, news, Discord CTA |
| **Games** | `/games` | Full catalog with live search, genre + platform filters, and 4 sort modes |
| **Game detail** | `/games/:slug` | Cover art hero, tabs for overview/modes/tournaments, related games, rating stats |
| **Tournaments** | `/tournaments` | Status-filtered event cards with prize pools, slot progress, and a 4-step "how it works" guide |
| **Leaderboard** | `/leaderboard` | Podium, season/region/game filters, and a sortable stats table |
| **Community** | `/community` | Join form with confirmation state, community stats, featured clips, trending threads, news |

Extras: client-side routing with a 404 page, responsive layout with a mobile nav, skip-to-content
link, reduced-motion support, and a `smoke` script that server-renders every route to catch runtime
errors.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite 8** dev server and build
- **Tailwind CSS 4** via `@tailwindcss/vite` — design tokens declared in `src/index.css` with `@theme`
  and custom utilities (`glass`, `btn-primary`, `chip`, `text-gradient`) with `@utility`
- **React Router 7** for routing
- **lucide-react** for icons
- Cover art and hero imagery generated for this project, stored in `public/art/`

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
npm run typecheck  # TypeScript only, no emit
npm run smoke      # server-render every route and report errors
```

The dev server binds to `0.0.0.0` and allows all hosts, so it also works when proxied through a
sandbox preview URL.

## Project structure

```
src/
├── components/     Layout (header/footer/nav), GameCard, TournamentCard
├── data/           Typed sample content: games, tournaments, players, community
├── pages/          One component per route + NotFound
├── App.tsx         Route table
├── main.tsx        Entry point (BrowserRouter)
└── index.css       Tailwind import, theme tokens, custom utilities, keyframes
public/
├── art/            Generated cover art and hero background
└── favicon.svg     Nexus hexagon mark
scripts/
└── ssr-smoke.tsx   Route render smoke test
```

## Content model

All content is typed and lives in `src/data/`, so swapping in a real API later means replacing those
modules rather than touching the UI:

- **`games.ts`** — 6 games with genres, platforms, modes, ratings, player counts, pricing
- **`tournaments.ts`** — events with status, format, prize pool, slot progress, organizer
- **`players.ts`** — ranked players with points, records, regions, streaks
- **`community.ts`** — site stats, news posts, featured clips, Discord perks

## Design system

| Token group | Values |
| --- | --- |
| Surfaces | `void-950` → `void-700` (near-black blues) |
| Accents | `neon` (violet), `aqua` (cyan), `lime`, `ember` |
| Fonts | Space Grotesk (display), Inter (body) |
| Signature styles | Glassmorphic cards, gradient text, neon glows, hover lift |

## Ideas for next steps

- Wire the catalog and leaderboard to a real backend or public games API
- Add accounts with a persisted library, follows, and tournament registration
- Real bracket pages with live match scores
- Stream/embed integration for the clips feed
- Light theme toggle and i18n

## License

MIT — see [LICENSE](LICENSE).
