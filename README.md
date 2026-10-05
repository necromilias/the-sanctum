# Mick’s Foundry

The Sanctum is the repository codename for [micksfoundry.org](https://micksfoundry.org), Mick’s statically generated public portfolio.

The site presents systems, automation, local-AI, governance, creative-production and infrastructure work with explicit status and public-evidence boundaries. It is built with Astro and targets GitHub Pages.

## Local development

Requirements: Node.js 22.12 or later and npm 9.6.5 or later.

```sh
npm ci
npm run dev
```

The complete local acceptance sequence is:

```sh
npm run check
npm run build
npm run validate:site
```

`npm run validate` runs those three gates in order. The static-output validator checks route generation, primary metadata, internal links, required public files, sitemap coverage, the custom domain and removal of obsolete live-status integrations.

## Content

Case studies live in `src/content/work/`. Frontmatter is validated by `src/content.config.ts`, including status, type, verification date, public-safe areas, evidence links and the public boundary.

`lastVerified` records when the public case study was checked against its applicable source record. It is not, by itself, a claim that the underlying system was operationally tested on that date.

Writing lives in `src/content/writing/` with a reusable post layout and stable
slug metadata. See [Writing maintenance](docs/WRITING.md) for faithful text
handling, draft previews, dates and explicit publication approval. Drafts,
including the layout sample, are excluded from ordinary builds.

The public routes are:

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
└── writing/ (approved pieces only in ordinary builds)
```

## Public-safety boundary

Public pages may explain engineering problems, architecture, constraints, process, evidence and public-safe outcomes. Do not add credentials, secrets, private Organisational Memory, unpublished production material, sensitive network topology or operational details that increase attack surface.

## Deployment

`.github/workflows/deploy.yml` is the repository’s single GitHub Pages workflow. It validates and builds the Astro site before deploying the generated static artifact. Publication and GitHub Pages configuration remain separate operator decisions; local validation does not publish anything.
