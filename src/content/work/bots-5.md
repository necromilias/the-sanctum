---
title: B.O.T.S. 5
summary: A local-first AI campaign harness and native Linux desktop built around bounded execution, explicit authority, durable evidence and human acceptance.
status: implemented
statusNote: Public Linux v0.1 implementation is landed through Phase 10. Phase 11 product finishing and standalone packaging remains outside this public snapshot.
type: AI systems and desktop tooling
lastVerified: 2026-10-01
areas:
  - Python
  - Linux
  - AI orchestration
  - SQLite
  - deterministic validation
featured: true
order: 1
repository: https://github.com/necromilias/bots-5
evidence:
  - label: Phase 10 product commit
    url: https://github.com/necromilias/bots-5/commit/9762170099889ecd87d451341a15a29ce7aceae8
  - label: Phase 10 closure report
    url: https://github.com/necromilias/bots-5/blob/088bdaf7c614e450ae85d784493766677e4787e0/docs/LINUX_V0_1_PHASE10_CLOSURE_REPORT.md
  - label: Phase 10 final outcome and limitations
    url: https://github.com/necromilias/bots-5/blob/088bdaf7c614e450ae85d784493766677e4787e0/work/campaign-evidence/phase10/campaign-desktop-integration/bots5-linux-v0.1-phase10-campaign-desktop-integration-20260929-01/outcome/FINAL_OUTCOME.json
  - label: CI v1 evidence record
    url: https://github.com/necromilias/bots-5/blob/088bdaf7c614e450ae85d784493766677e4787e0/docs/CI_V1.md
publicBoundary: This page follows the public implementation through Phase 10 and the later compatibility and CI work on main. Provider credentials, private operational context and unpublished material remain excluded.
role: Mick identified the operating problems, set the constraints and acceptance boundaries, directed the implementation campaigns, and required independent evidence. AI tools performed substantial implementation and review work within those boundaries.
---

## The problem

Ordinary model conversations are poor foundations for consequential project work. Context drifts, a confident answer can masquerade as proof, and the record of what actually ran is easy to lose. B.O.T.S. exists to turn AI-assisted work into bounded campaigns with inspectable inputs, outputs and acceptance decisions.

## The system Mick directed

B.O.T.S. began as a custom harness for coordinating bounded AI workers and grew into a native Linux desktop built around the same operating principles. Campaign workers receive explicit contracts, operate inside defined authority boundaries and leave durable artifacts that can be checked after the conversation is over. The desktop adds persistent application state and native workflows without promoting model output into authority.

Campaign workers are text-only: they have no shell, filesystem, Git, plugin or tool access, and cannot recursively delegate. The harness owns execution and persistence.

Mick framed the problems, designed the operating constraints, directed staged implementation campaigns and retained the final acceptance boundary. AI tooling was used heavily to implement, test and review the code; the site does not pretend otherwise.

## Constraints that mattered

- Worker scope and permissions have to be explicit.
- Results need to survive beyond a chat transcript.
- Candidate identity must be sealed before validation.
- Tests and reports must be reproducible against the named candidate.
- Technical completion, substantive acceptance, commit authority and later repository consequences remain separate states.
- A worker must not be treated as the final judge of its own work.
- Publication remains a separate human decision.

## What proved difficult

The hard parts were not prompt decoration. They were lifecycle, persistence and concurrency behaviour: keeping repository state coherent, controlling data-root effects, preserving SQLite durability, handling cancellation and close paths, evolving archive interchange without losing provenance, making backup and whole-installation restore recoverable, and exposing campaign execution through the desktop without weakening the headless authority model.

Later compatibility work also found that a SQL expression accepted by newer SQLite builds could overflow the parser on SQLite 3.45.1. The repair was handled as a bounded compatibility defect rather than hidden behind a newer development environment.

## How failure was handled

Work moved through narrow phases with explicit acceptance records. Failed or blocked candidates were not silently promoted. Phase 10 itself had earlier candidates rejected by independent review, repaired inside the approved fence and resealed before the accepted candidate was validated. Findings became bounded repairs and regression tests rather than narrative exceptions.

The same distinction applies after implementation: a green test suite is technical evidence, not automatic substantive acceptance, commit authority or publication authority.

## Implemented today

The public repository contains the original manifest-driven campaign harness and native Linux application work through Phase 10. The landed desktop includes persistent conversations, streaming generation and cancellation, provider and model configuration, deterministic context and content-addressed attachments, search and exact navigation, inspection and provenance surfaces, transcript and archive interchange, backup and whole-installation restore, and a native campaign dock over the headless campaign engine.

Phase 10 adds attempt-addressed campaign evidence, explicit preflight and one-shot approval binding, truthful cancellation, selected-versus-cumulative cost accounting, worker regeneration, synthesis rerun with staleness classification, and matching headless CLI operations.

Later `main` also contains the SQLite 3.45.1 compatibility repair and CI v1. Those changes do not imply that Phase 11 has begun.

## Validation evidence

The accepted Phase 10 candidate recorded a complete-repository T4 result of **1504 passed, 1 skipped**, exit 0. Independent review completed its verification milestones with no candidate-changing defect, but the reviewer failed while emitting its final report. The final technical disposition, **PASS_WITH_LIMITATIONS**, is a labelled supervisor reconstruction rather than an oracle-authored final report. Accepted limitations remain documented rather than silently rewritten as resolved.

The Phase 10 review and validation used deterministic fake providers and offscreen Qt. They do not establish a real GUI session or live provider acceptance. Accepted regression-test gaps remain around synthesis-rerun independence and legacy-v1 freshness; the final outcome record preserves these alongside the product limitations.

CI v1 subsequently established a separate authoritative sharded T4 result against candidate [`58fca2c7`](https://github.com/necromilias/bots-5/commit/58fca2c7b1b4111d982733980c303565bf91695e), in [run `36682157600`](https://github.com/necromilias/bots-5/actions/runs/36682157600): **1597 passed, 0 failed, 0 errors, 1 permitted skip** across 1598 collected tests. The workflow is dispatch-only. That CI result belongs to this exact candidate, not automatically to every later descendant of `main`.

## Current boundary

Phase 10 is closed and landed in public Git. The public repository describes Phase 11 — product finishing and standalone packaging — as the next sequence boundary and grants no authority to begin it. Later authority decisions are not established by this public snapshot. The final Phase 11 visual and aesthetic basis is recorded there as a separate human decision.

Provider secrets, private operational context and material that is not intentionally public are not reproduced here.
