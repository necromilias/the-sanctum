# Local Astro rebuild implementation report

Date: 2026-09-09

Disposition owner: Mick

Campaign boundary: local candidate only

## 1. Starting repository identity and state

- Repository: `necromilias/the-sanctum`
- Checkout: `/home/mick/Documents/Codex/2026-09-09/hey/work/the-sanctum`
- Remote: `https://github.com/necromilias/the-sanctum.git`
- Branch: `main`, tracking `origin/main`
- Starting HEAD: `ca98330d8be03e6c09769d14143c5a7efafd2614`
- Starting worktree: clean
- Public domain retained: `micksfoundry.org`
- Last known successful deployment at inventory time: 2026-07-14

No pre-existing local changes had to be preserved or worked around.

## 2. Exact files added, changed and deleted

### Added

```text
.github/workflows/deploy.yml
astro.config.mjs
docs/LOCAL_ASTRO_REBUILD_REPORT.md
public/CNAME
public/favicon.svg
public/robots.txt
scripts/validate-site.mjs
src/components/Footer.astro
src/components/Header.astro
src/components/ProjectCard.astro
src/content.config.ts
src/content/work/bots-5.md
src/content/work/homelab.md
src/content/work/organisational-memory.md
src/content/work/road-trip.md
src/content/work/story-audio.md
src/layouts/BaseLayout.astro
src/pages/404.astro
src/pages/about/index.astro
src/pages/index.astro
src/pages/lab/index.astro
src/pages/sitemap.xml.ts
src/pages/work/[slug].astro
src/pages/work/index.astro
src/styles/global.css
```

### Changed

```text
.gitignore
README.md
package-lock.json
package.json
tsconfig.json
```

### Deleted

```text
.bolt/config.json
.bolt/prompt
.claude/skills/verify/SKILL.md
.github/workflows/static.yml
CNAME
content/about/bio.json
content/about/skills.json
content/posts/hello-world.md
content/projects/The-Forge.json
content/projects/homelab-iac.json
content/projects/the-sanctum.json
content/services/FoundryVTT.json
content/services/The-Trove/.gitkeep.json
content/services/pihole.json
content/services/plex.json
content/services/sillytavern.json
content/services/vaultwarden.json
eslint.config.js
index.html
postcss.config.js
public/admin/.gitignore
src/App.tsx
src/components/Console.tsx
src/components/Sidebar.tsx
src/hooks/useStatus.tsx
src/index.css
src/main.tsx
src/pages/About.tsx
src/pages/Dashboard.tsx
src/pages/Portfolio.tsx
src/pages/Services.tsx
src/pages/Systems.tsx
src/vite-env.d.ts
supabase/migrations/20260605015132_create_portfolio_schema.sql
tailwind.config.js
tina/.gitignore
tina/config.ts
tina/tina-lock.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
```

## 3. Resulting site structure

```text
/
├── work/
│   ├── bots-5/
│   ├── organisational-memory/
│   ├── story-audio/
│   ├── road-trip/
│   └── homelab/
├── lab/
├── about/
└── 404.html
```

The site is an Astro static build. Shared layout, header, footer and project-card components render at build time. Project records are Markdown entries loaded through a schema-validated Astro content collection. There are no React islands.

## 4. Migration and removal summary

- Replaced the React 18/Vite 5/React Router SPA with Astro static prerendering so every intended route has its own directly served HTML file.
- Replaced unvalidated Tina JSON globs with a typed Markdown content collection.
- Removed TinaCMS and its generated/admin surface because this slice has no production or local CMS requirement.
- Removed the unused Supabase client dependency and orphaned migration because no live application path consumed them.
- Removed React, React Router, Lucide, Tailwind, PostCSS, old ESLint scaffolding and Vite-specific configuration because the new candidate has no React island and no need for those toolchains.
- Removed browser-side service probes, the AI Horde worker lookup, service-product JSON and the fixed terminal console. They produced stale or misleading operations theatre and were incompatible with the stated public boundary.
- Removed the unused note and did not create a Notes route.
- Reclassified The Forge and The Trove as high-level supporting infrastructure on Lab rather than portfolio projects.
- Moved `CNAME` to `public/CNAME`, where Astro copies it into the generated artifact.
- Replaced the SPA fallback workflow with one Astro Pages workflow; `404.html` is now a real not-found page rather than a copied SPA shell.
- Removed the Bolt template metadata and obsolete Claude verification skill because both specified the retired React/Vite/Tina/live-probe implementation.

All removed files remain recoverable from Git history; no history was rewritten.

## 5. Case studies created

1. **B.O.T.S. 5** — flagship AI harness and Linux desktop case study; public claim stops at Phase 5 commit `c9efdb374e37be94bb9ab68abd45e8ed718c3437`.
2. **Organisational Memory + OMC** — flagship repository-authority, provenance, governance and deterministic retrieval case study.
3. **Story Audio** — major active local-AI production case study, explicitly marked active and incomplete.
4. **The Great Australian Road Trip** — 30-part personal-edition prose work marked closed; audio adaptation remains separate and active.
5. **Homelab Operations** — supporting Linux, containers, network, storage, recovery and automation capability without a service catalogue.

Each substantial page covers origin problem, Mick’s role, constraints, difficult or failed areas, response to failure, implemented state, validation, current boundary, public evidence where available and a last-verified date.

## 6. Public-evidence boundaries used

- B.O.T.S. links only to the public `necromilias/bots-5` repository, exact Phase 5 commit and the Phase 5 implementation report. All three links were checked from the public web and returned HTTP 200. Unreleased Phase 6 work is absent.
- Organisational Memory links only to the public governance reference at `439753a94d976ee277a9fafaf5a0c52d90a61ca6`. Private Organisational Memory and OMC repositories are not linked or copied.
- Story Audio describes the A1–A5 production shape without private source, voice assets, paths, run records or unpublished audio.
- Road Trip exposes process and status, not manuscript material, spoilers or unreleased audio.
- Homelab and Lab omit credentials, addresses, topology, hardware inventory, exposed-service detail and drift-prone current-state values.
- Blood Oath, GitOps-chan, Notes and unverified legacy projects are absent.

## 7. Validation commands and exact results

Environment: Node.js `v26.7.0`; npm `12.0.2`.

| Command | Exit | Exact result |
| --- | ---: | --- |
| `npm ci` | 0 | Added 299 packages, audited 300 packages, found 0 vulnerabilities. npm reported its local install-script policy blocked the optional `esbuild@0.28.2` postinstall; the installed platform binary subsequently completed check and build successfully. |
| `npm audit fix` | 0 | Updated one transitive package and reduced the initial Picomatch advisory count to 0 vulnerabilities. |
| `npm run check` (via final `npm run validate`) | 0 | 15 files; 0 errors, 0 warnings, 0 hints. Content sync and schema validation passed. |
| `npm run build` (via final `npm run validate`) | 0 | Astro static output; 10 pages built; all named routes generated; build complete. |
| `npm run validate:site` (via final `npm run validate`) | 0 | 14 required outputs, 9 metadata-bearing pages, and all internal references resolved. |
| `npm audit --json` after repair | 0 | 0 known vulnerabilities. |
| `git diff --check` | 0 | No whitespace errors. |
| `! rg -n '[ \t]+$' ...` across all added source/report files | 0 | No added-file trailing whitespace. |
| `python3 -c "import yaml; ..."` against `.github/workflows/deploy.yml` | 0 | Workflow YAML parsed successfully. |

The static validator also checks required files, route output, canonical and social metadata, sitemap coverage, internal `href`/`src` targets, exact CNAME content and banned legacy integration strings in publishable source/output.

## 8. Generated route list

```text
/
/work/
/work/bots-5/
/work/organisational-memory/
/work/story-audio/
/work/road-trip/
/work/homelab/
/lab/
/about/
/404.html
/sitemap.xml
```

Direct localhost access to the nine intended content routes returned HTTP 200. `robots.txt`, `sitemap.xml` and `favicon.svg` also returned HTTP 200. A missing route returned HTTP 404 with the custom not-found page.

The exact final direct-route probe was:

```sh
for path in / /work/ /work/bots-5/ /work/organisational-memory/ /work/story-audio/ /work/road-trip/ /work/homelab/ /lab/ /about/ /robots.txt /sitemap.xml /favicon.svg /does-not-exist; do
  curl -sS -o /dev/null -w "$path %{http_code}\n" "http://127.0.0.1:4323$path"
done
```

It returned 200 for every intended page/static asset and 404 for `/does-not-exist`. Separate probes returned 404 for `/notes/`, `/services`, `/systems` and `/portfolio`, confirming that excluded and retired route surfaces were not reintroduced.

## 9. Metadata and static-file validation

- Every primary page has a meaningful title, description, canonical URL, Open Graph title/description/URL/type and Twitter summary-card fields.
- Case studies emit JSON-LD `CreativeWork` metadata; the homepage emits `WebSite` metadata.
- `public/favicon.svg` is valid SVG and resolves from generated output.
- `robots.txt` allows crawling and points to `https://micksfoundry.org/sitemap.xml`.
- The sitemap contains the home, Work, five case-study, Lab and About canonical URLs.
- `dist/CNAME` contains exactly `micksfoundry.org`.
- Static deep links are generated as route-specific HTML rather than relying on browser recovery.

No social raster image was fabricated. The candidate configures accurate text-based Open Graph/Twitter previews without claiming a generated illustration is project evidence.

## 10. Responsive and manual inspection findings

Rendered inspection was performed in the in-app browser against both the development render and final built preview.

- Desktop viewport: 1440 × 1000.
- Representative mobile viewport: 390 × 844 (375 px document client width after browser chrome/scrollbar).
- All ten HTML routes exposed the expected page title and `h1`.
- All inspected pages had `scrollWidth === clientWidth`; no horizontal overflow was observed.
- Mobile navigation retained the unambiguous labels Home, Work, Lab, About and GitHub.
- Homepage renders three selected flagship cards; Work renders all five cards without breakage.
- Text size, contrast, spacing and line length remained readable at both widths.
- No content was covered by a fixed terminal or console. The only fixed page element is the normally hidden skip link, which appears on keyboard focus.
- Browser logs contained development-server connection debug messages only; no page errors or warnings were observed.
- The final built preview independently showed the expected canonical metadata and no overflow at desktop or mobile width.

## 11. Caveats and intentionally omitted content

- Detailed current homelab hardware, service and topology facts were omitted because they are drift-prone and public-risky.
- Private evidence for Story Audio, Road Trip, Organisational Memory and OMC was not copied into the public repository.
- The B.O.T.S. README contains wording that trails the landed public Phase 5 evidence; this portfolio follows the named commit and report instead.
- Story Audio is intentionally described as active/incomplete, not as a finished production system.
- No project status was inferred from repository registry membership alone.
- GitHub currently reports the remote Pages source as legacy `main:/` even though the repository now contains one Astro Pages workflow. The remote setting was not changed because this campaign forbids remote mutation. Before any later publication, an authorised operator must deliberately select GitHub Actions as the Pages source; that publication step is outside this candidate.

## 12. Final Git state and diff statistics

The final worktree is intentionally dirty with the uncommitted rebuild candidate. It contains 25 added files, 5 changed files and 41 deleted files. Tracked diff statistics report 46 tracked paths changed, 4,232 insertions and 17,741 deletions; the 25 untracked additions are listed above and are not included in Git’s ordinary unstaged diffstat until staged.

No unexpected publishable paths were created. Generated `.astro/`, `dist/` and `node_modules/` state is ignored.

## 13. Authority and side-effect confirmation

- No commit was created.
- No push occurred.
- No deployment or publication occurred.
- No remote state was modified.
- Organisational Memory was not mutated.
- No private operational material was published or copied into this repository.

This is a local implementation candidate only. Mick retains final acceptance and every commit, push, Pages-configuration and deployment decision.
