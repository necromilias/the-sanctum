# the-sanctum

My personal homelab hub — built with love, Tailwind, and self-hosting spirit.

A static React site (Vite) with a terminal-inspired dark theme for showcasing self-hosted services, projects/portfolio, and about info.

## Tech

- Vite + React 18 + TypeScript + React Router
- Tailwind CSS (custom KDE Andromeda-inspired palette + glassmorphism)
- TinaCMS (local mode, file-based JSON content in `content/`)
- Lucide icons

Optional/Prepared: Supabase (schema in `supabase/`, client dep present but not wired).

## Getting up and running

```bash
cd ~/Projects/the-sanctum/project

# Install deps (if needed)
npm install

# Run the site (standard dev server)
npm run dev
# → http://localhost:5173

# Run with TinaCMS visual editor (recommended for content)
npm run admin:dev
# → Site still at http://localhost:5173
# → Admin UI at http://localhost:4001/admin
```

In the Tina admin you can create/edit:

- Services (`content/services/*.json`)
- Projects (`content/projects/*.json`)
- About sections (`content/about/*.json`)

Content is plain JSON files committed to git. Edit locally, commit, deploy.

## Building for production / deploy

```bash
# (Re)build the Tina admin static assets for /admin (local mode)
npx tinacms build --local --skip-cloud-checks

# Build the site
npm run build
# Output: ./dist/

# Preview the production build
npm run preview
```

### Deploying to your domain

The site is a pure static SPA. Copy or upload the contents of `dist/` to your web root.

**Examples:**

- **Cloudflare Pages / Netlify**: Connect the repo (or drag dist/). The `public/_headers` (with CSP) gets copied to dist/.
- **Self-hosted (Caddy / nginx / Apache)**: Point your server at the `dist/` folder.
  - Caddy example:
    ```
    the-sanctum.example.com {
      root * /path/to/the-sanctum/dist
      file_server
    }
    ```
- **Homelab + tunnel**: Serve locally and expose via Cloudflare Tunnel / Tailscale Funnel / ngrok.

Update `index.html` for your real title, OG image, etc. Remove the bolt.new meta tags.

After content changes via Tina admin, rebuild and redeploy (or use a simple CI that runs the build steps).

#### Cloudflare Pages specific notes

- **Build command**: `npx tinacms build --local --skip-cloud-checks && npm run build`
  - This ensures the Tina admin UI is up-to-date with your latest schema before the Vite build.
- **Publish directory**: `dist`
- The `dist/_headers` file (from `public/_headers`) will automatically apply security headers and CSP.
- **Size note**: The Tina admin (`dist/admin/`) is ~11 MB. It is included by default for convenience (you get `/admin` in production too). If you want a smaller deploy you can add `&& rm -rf dist/admin` to the build command (the editor shell won't be functional in prod without the Tina dev server anyway).
- Custom domain: Add it in the Cloudflare Pages dashboard after the first deploy. The site works great behind Cloudflare (including with your existing tunnels if you proxy the Pages domain).

Once pushed, connect the repo in Cloudflare Pages → it will auto-deploy on push to main.

## Content editing workflow (local-first)

1. `npm run admin:dev`
2. Open admin, add/edit entries (they save as JSON under `content/`)
3. See changes reflected live in the Vite site (HMR)
4. `git add content/ && git commit && git push`
5. Rebuild + deploy

## Notes

- No live Tina editing on the static production deploy (the `/admin` UI is mainly for local/dev use; the GraphQL backend runs only during `admin:dev` / `tinacms build`).
- If you want fully dynamic data, wire the Supabase client + the provided migration.
- There is also an unused `content/posts/` (hello-world.md) — extend the router + pages if you want a blog/notes section later.
- Icon names in services come from lucide-react (e.g. "Server", "Film", "Shield", "KeyRound").

## License

Personal project.
