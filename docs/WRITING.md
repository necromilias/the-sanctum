# Writing maintenance

Writing uses Astro's `writing` collection, Markdown in `src/content/writing/`,
and `src/layouts/WritingLayout.astro`. `/writing/` lists pieces newest first.
There is no CMS or new dependency.

## Add a piece

Copy `src/content/writing/layout-sample.md` to a new Markdown file. Replace
the placeholder title, description, tags and body with the supplied wording.
Keep `draft: true` until Mick approves the exact text and publication.

```yaml
---
title: The supplied title
description: A short description approved with the piece.
slug: a-stable-address
publishedDate: 2026-10-05
# updatedDate: 2026-10-06
tags: []
draft: true
---
```

`slug` is required, unique, lowercase and hyphen-separated. It determines the
stable address `/writing/a-stable-address/`, independently of the filename or
title. Do not change a published slug without an agreed redirect plan.
Dates use `YYYY-MM-DD` and are displayed in UTC. While drafting, the
publication date is provisional; set it to the actual approved publication
date before release. Keep that date thereafter. Add or change `updatedDate`
for an approved substantive revision; it cannot precede `publishedDate`.
Tags and `updatedDate` are optional. An omitted draft flag defaults to true.

## Preserve the author’s wording

Transcribe supplied prose faithfully. Do not rewrite, polish, expand or invent
personal views unless Mick specifically requests that editing. Ask for missing
text rather than filling it from private records, memory or chats. Show any
requested editorial changes for review before publication.

Automatic factual case-study maintenance does **not** authorize changes to or
publication of personal writing. This procedure does not change automation.

## Preview and validate

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4322
```

Development shows drafts, labelled and marked `noindex`. Open
`http://127.0.0.1:4322/writing/` on the Forge. For a static draft review:

```sh
WRITING_PREVIEW=1 npm run validate
npm run preview -- --host 127.0.0.1 --port 4322
```

The opt-in build includes drafts; **never deploy this output**. The sample is
only a layout demonstration, not an actual essay written or approved by Mick.
It stays a draft and is omitted from ordinary builds. Drafts never enter the
sitemap or receive published-article structured metadata.

Before any release, run the normal `npm run validate` with
`WRITING_PREVIEW` unset. It checks Astro types, the build, routes, metadata,
links and sitemap coverage. Inspect desktop and mobile renders, dates and
the exact wording. Normal builds omit draft routes and list only published
pieces; an empty index has a brief holding message.

## Publication is a separate decision

Obtain explicit approval for the final text and publication. Only then set
`draft: false`, confirm dates, perform a fresh normal validation, and follow
the separately authorized release process. Template review alone grants no
authority to commit, push or deploy. A push to `main` triggers the existing
GitHub Pages workflow, so keep review changes local until authorized.
