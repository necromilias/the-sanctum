---
title: B.O.T.S. 5
summary: A custom AI campaign harness built around bounded workers, explicit contracts, durable evidence and human acceptance.
status: implemented
statusNote: Public main includes the accepted native Linux work through Phase 5. Later work is intentionally excluded.
type: AI systems and desktop tooling
lastVerified: 2026-09-09
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
  - label: Public Phase 5 commit
    url: https://github.com/necromilias/bots-5/commit/c9efdb374e37be94bb9ab68abd45e8ed718c3437
  - label: Phase 5 implementation report
    url: https://github.com/necromilias/bots-5/blob/c9efdb374e37be94bb9ab68abd45e8ed718c3437/docs/LINUX_V0_1_PHASE5_IMPLEMENTATION_REPORT.md
publicBoundary: This page stops at the public Phase 5 commit. Unreleased later-phase work, private campaign material and provider credentials are excluded.
role: Mick identified the operating problems, set the constraints and acceptance boundaries, directed the implementation campaigns, and required independent evidence. AI tools performed substantial implementation and review work within those boundaries.
---

## The problem

Ordinary model conversations are poor foundations for consequential project work. Context drifts, a confident answer can masquerade as proof, and the record of what actually ran is easy to lose. B.O.T.S. exists to turn AI-assisted work into bounded campaigns with inspectable inputs, outputs and acceptance decisions.

## The system Mick directed

B.O.T.S. is a custom harness for coordinating AI workers. A worker receives an explicit contract, works within a defined repository and authority boundary, and leaves durable artifacts that can be checked after the conversation is over. The system is designed around a simple rule: model findings are evidence, not authority.

Mick framed the problems, designed the operating constraints, directed staged implementation campaigns and retained the final acceptance boundary. AI tooling was used heavily to implement, test and review the code; the site does not pretend otherwise.

## Constraints that mattered

- Worker scope and permissions have to be explicit.
- Results need to survive beyond a chat transcript.
- Candidate identity must be sealed before validation.
- Tests and reports must be reproducible against the named candidate.
- A worker must not be treated as the final judge of its own work.
- Publication remains a separate human decision.

## What proved difficult

The hard parts were not prompt decoration. They were lifecycle, persistence and concurrency behaviour: keeping repository state coherent, recording outcomes durably, managing cancellation and close paths, and making sure the desktop application reflected the same underlying authority as its storage layer.

Earlier wording in the public README trails the implementation history in places. This description therefore follows the landed Phase 5 code and acceptance report rather than repeating the older phase summary.

## How failure was handled

Work moved through narrow phases with explicit acceptance reports. Failed or blocked candidates were not silently promoted. Findings were turned into bounded repairs, then checked again against an exact repository state. Human review remained the final gate even when automated suites were green.

## Implemented today

At the public Phase 5 boundary, the repository contains the custom campaign harness and the landed native Linux application work. The public implementation includes durable local state, explicit lifecycle handling, worker and provider boundaries, and deterministic test coverage appropriate to the accepted phases.

The public record does **not** establish unreleased Phase 6 work, so this page makes no claim about it.

## Validation evidence

The Phase 5 acceptance record names the accepted commit and records a deterministic suite result of **344 passed, 1 skipped**. That is evidence for the bounded public candidate, not a claim that the system can never fail or that later work is complete.

## Current boundary

Public Phase 5 is implemented and accepted locally in the project’s recorded process. Later work remains outside this case study. Provider secrets, private run artifacts and unpublished engineering findings are not reproduced here.
