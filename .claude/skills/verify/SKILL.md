---
name: verify
description: Build, serve, and drive the-sanctum SPA in a headless browser to verify changes at the rendered surface.
---

# Verifying the-sanctum

Vite + React 18 SPA (client-rendered), TinaCMS content in `content/**/*.json` loaded via `import.meta.glob`.

## Build & serve

```bash
npm run build                 # tinacms build --local + vite build → dist/
npx vite preview --port 4173  # serve dist/ (run in background)
```

Typecheck separately with `npx tsc -b` (the build script does NOT run tsc). Delete the `*.tsbuildinfo` files it leaves behind.

## Drive

Curl only returns the SPA shell — use Playwright headless Chromium (install into the scratchpad, not the repo: `npm i playwright && npx playwright install chromium`).

Flows worth driving:
- Sidebar nav to each page: `/`, `/services`, `/systems`, `/portfolio`, `/about`; screenshot each.
- Dashboard/Services status dots: probes are real `no-cors` fetches to live services + the AI Horde API — give the page ~2.5s after load for them to resolve. Statuses reflect the real homelab, so "down" may be true, not a bug.
- Floating console (`input[aria-label="terminal input"]`): `help`, `status`, `horde`, `cd <page>` (navigates), `clear`, `sudo` → "nice try.", unknown command.
- Check no service URLs leak into rendered pages (owner requirement): grep page text for `micksfoundry|plex\.tv`.
- Watch `pageerror`/console errors — should be zero.

## Gotchas

- `content/services/The-Trove/.gitkeep.json` is an empty (invalid JSON) file — service globs must stay non-recursive (`content/services/*.json`) or Vite crashes importing it.
- The Plex service entry lives in `content/services/jellyfin.json` (its `name` field is "Plex").
