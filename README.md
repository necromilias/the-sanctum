# the-sanctum

The Sanctum is Mick's public ops dashboard and technical portfolio. It presents a deliberately selected, public-safe view of current systems, self-hosted services, workloads, and projects; it is not the operational source of truth for the homelab.

## Current architecture

- React 18, TypeScript, Vite, and React Router
- Tailwind CSS with a terminal-inspired interface
- File-based JSON content under `content/`
- TinaCMS for local content editing
- Browser-side public endpoint reachability checks
- Public AI Horde worker status from the AI Horde API
- GitHub Pages deployment at `micksfoundry.org`

The major routes are the dashboard, featured services, systems, portfolio, and about pages. A floating read-only console provides navigation and the same limited public status information.

Public endpoint checks report only whether a route responds from the visitor's browser. They do not establish application or host health. Services without a suitable public check are labelled as not publicly probed.

## Local development

```bash
cd ~/Projects/the-sanctum/project
npm ci
npm run dev
```

The Vite development server is available at `http://localhost:5173` by default.

For the local Tina editor:

```bash
npm run admin:dev
```

The editor manages:

- Services in `content/services/*.json`
- Projects in `content/projects/*.json`
- About sections in `content/about/*.json`

Content is stored as ordinary JSON and committed with the source. Tina is a local editing workflow; there is no production content-editing backend.

## Checks and builds

```bash
# TypeScript project check
npx tsc -b --pretty false

# Lint maintained source and configuration
npx eslint src tina/config.ts vite.config.ts

# Production build used by GitHub Pages
npm run build:pages

# Preview an existing build
npm run preview
```

`build:pages` builds Tina's local assets, builds the Vite application, and removes `dist/admin` from the published output.

## Deployment

Pushes to `main` trigger `.github/workflows/static.yml`. The workflow:

1. Installs the locked dependencies with Node.js 20.
2. Runs `npm run build:pages`.
3. Copies `CNAME` and the SPA fallback into `dist/`.
4. Publishes `dist/` through GitHub Pages.

The custom domain is `micksfoundry.org`. Production does not publish the Tina admin.

GitHub Pages serves the copied `404.html` for direct requests to client-side routes. This lets React Router load the requested page in a browser, although the initial HTTP response remains a 404.

## Public information boundary

This repository and its deployed site are public. Content should remain useful as a technical portfolio without becoming a copy of the private operations wiki.

Do not add:

- credentials, tokens, keys, passwords, or environment values;
- private network or Tailscale addresses;
- internal secret, backup, recovery, or data paths;
- firewall weaknesses, recovery gaps, or detailed exposure topology;
- private logs, shell history, or credential-handling details;
- a complete inventory of private services merely because they exist.

High-level hardware, operating systems, selected technologies, public routes, and intentionally public workload statistics are appropriate when current and useful.

## License

Personal project.
