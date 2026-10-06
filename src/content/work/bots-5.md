---
title: B.O.T.S. 5
summary: A local-first AI campaign harness and native Linux desktop built around bounded execution, explicit authority, durable evidence and human acceptance.
status: implemented
statusNote: Phase 11 is closed, substantively accepted and landed. Phase 12 wave 2 repairs and tests have landed, without a public overall closure record. The standalone remains unpublished and requires an ASCII-only executable path; no broad Linux support guarantee is established.
type: AI systems and desktop tooling
lastVerified: 2026-10-06
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
  - label: Phase 12 wave 2 repairs and reported validation
    url: https://github.com/necromilias/bots-5/commit/ba72d16aa3540218cb70e377fa9f452252b7c360
  - label: Known standalone executable-path limitation
    url: https://github.com/necromilias/bots-5/blob/ba72d16aa3540218cb70e377fa9f452252b7c360/README.md#known-standalone-limitation
  - label: Phase 11 final product commit
    url: https://github.com/necromilias/bots-5/commit/59265916abeb2e9f6cbf953726f22a9f7c00f3b5
  - label: Phase 11 accepted closure and validation record
    url: https://github.com/necromilias/bots-5/blob/7446e5c3a85d4043bf387784568458a6d270ff49/docs/LINUX_V0_1_PHASE11_CLOSURE_REPORT.md
  - label: Final Phase 11 authority and effect supplement
    url: https://github.com/necromilias/bots-5/blob/7446e5c3a85d4043bf387784568458a6d270ff49/docs/UNIFIED_AUTHORITY_EFFECT_INVENTORY_PHASE11_FINAL_SUPPLEMENT.md
  - label: Phase 11 implementation report and historical checkpoints
    url: https://github.com/necromilias/bots-5/blob/6a41939388944a450b0169e389901d54de72b02b/docs/LINUX_V0_1_PHASE11_IMPLEMENTATION_REPORT.md
  - label: Standalone Linux packaging and target limits
    url: https://github.com/necromilias/bots-5/blob/6a41939388944a450b0169e389901d54de72b02b/docs/STANDALONE_LINUX_PACKAGING.md
  - label: Provider-managed context and Archive v3 contract
    url: https://github.com/necromilias/bots-5/blob/6a41939388944a450b0169e389901d54de72b02b/docs/PROVIDER_MANAGED_CONTEXT_ARCHIVE_V3.md
  - label: Phase 10 product commit
    url: https://github.com/necromilias/bots-5/commit/9762170099889ecd87d451341a15a29ce7aceae8
  - label: Phase 10 closure report
    url: https://github.com/necromilias/bots-5/blob/088bdaf7c614e450ae85d784493766677e4787e0/docs/LINUX_V0_1_PHASE10_CLOSURE_REPORT.md
  - label: Phase 10 final outcome and limitations
    url: https://github.com/necromilias/bots-5/blob/088bdaf7c614e450ae85d784493766677e4787e0/work/campaign-evidence/phase10/campaign-desktop-integration/bots5-linux-v0.1-phase10-campaign-desktop-integration-20260929-01/outcome/FINAL_OUTCOME.json
  - label: CI v1 evidence record
    url: https://github.com/necromilias/bots-5/blob/088bdaf7c614e450ae85d784493766677e4787e0/docs/CI_V1.md
publicBoundary: This page follows the accepted Phase 10 and Phase 11 records and the subsequent Phase 12 wave 2 commit in public Git, distinguishing recorded acceptance and reported candidate validation from release and platform support. Provider credentials, private operational context and unpublished material remain excluded.
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

The public repository contains the original manifest-driven campaign harness, the accepted native Linux application baseline through Phase 10, and the accepted Phase 11 desktop finishing and packaging work. The Phase 10 baseline includes persistent conversations, streaming generation and cancellation, provider and model configuration, deterministic context and content-addressed attachments, search and exact navigation, inspection and provenance surfaces, transcript and archive interchange, backup and whole-installation restore, and a native campaign dock over the headless campaign engine.

Phase 10 adds attempt-addressed campaign evidence, explicit preflight and one-shot approval binding, truthful cancellation, selected-versus-cumulative cost accounting, worker regeneration, synthesis rerun with staleness classification, and matching headless CLI operations.

Later `main` contains the SQLite 3.45.1 compatibility repair and CI v1, followed by Phase 11. Phase 11 adds command-palette and keyboard workflows, richer message rendering, folders, pins and deletion, workspace restoration, model-selector and desktop presentation work, and a standalone Linux build path for the CLI and desktop. Its final repair makes provider/backend/router stream ownership explicit and drains owned cleanup before application resources are released, preserving valid terminal completion without consuming irrelevant response tails.

Public `main` also adds provider-managed OpenRouter context and Archive v3 preservation. This mode uses deterministic local selection with a heuristic context estimate and provider final admission; it does not promise exact token accounting or guaranteed fit. Existing exact-accounting adapters retain their separate contract.

The subsequent Phase 12 wave 2 commit aligns provider failure reporting with the canonical remote-outcome classification and connects caller-supplied completion deadlines to HTTP transport timeouts. It adds regression coverage and loopback TCP tests for malformed streams, failures before terminal completion, trailing garbage, cancellation, timeout settlement and resource ownership, alongside backup/restore crash tests.

## Validation evidence

The accepted Phase 10 candidate recorded a complete-repository T4 result of **1504 passed, 1 skipped**, exit 0. Independent review completed its verification milestones with no candidate-changing defect, but the reviewer failed while emitting its final report. The final technical disposition, **PASS_WITH_LIMITATIONS**, is a labelled supervisor reconstruction rather than an oracle-authored final report. Accepted limitations remain documented rather than silently rewritten as resolved.

The Phase 10 review and validation used deterministic fake providers and offscreen Qt. They do not establish a real GUI session or live provider acceptance. Accepted regression-test gaps remain around synthesis-rerun independence and legacy-v1 freshness; the final outcome record preserves these alongside the product limitations.

CI v1 subsequently established a separate authoritative sharded T4 result against candidate [`58fca2c7`](https://github.com/necromilias/bots-5/commit/58fca2c7b1b4111d982733980c303565bf91695e), in [run `36682157600`](https://github.com/necromilias/bots-5/actions/runs/36682157600): **1597 passed, 0 failed, 0 errors, 1 permitted skip** across 1598 collected tests. The workflow is dispatch-only. That CI result belongs to this exact candidate, not automatically to every later descendant of `main`.

The 5 October Phase 11 closure record reports final source T4 of **2189 passed, 1 permitted opt-in skip, 0 failures/errors**, **71/71 frozen provider-cleanup cases passed**, and **156/156 M7 package checks passed**, with no skips or unexecuted cases in those two package gates. These results belong to the retained final source and rebuilt standalone, not to later documentation bytes. Packaging validation is separate from T4 and uses offscreen desktop checks; its evidence is confined to the validated target, without a general Linux-distribution compatibility guarantee.

The public closure record distinguishes technical completion, subsequent human acceptance, commit authority and landing. Raw campaign evidence and the standalone remain outside the public product commit; no new public GitHub Actions run is linked for this final candidate. Earlier reports and test counts retain their historical subjects.

The Phase 12 wave 2 commit message separately reports **2240 passed, 1 permitted skip, 0 failures/errors** for its retained source candidate and **19/19 frozen obligations passed** for a rebuilt standalone. These are attributed results from the public commit record; the retained run artifacts and executable are not in the public tree, and the latest public GitHub Actions T4 run still concerns the earlier CI v1 candidate. This site audit inspected public source and tests but did not independently rerun the B.O.T.S. suite or verify the standalone.

## Current boundary

Phase 11 is closed, substantively accepted and landed at the final corrective source commit. Phase 12 now has landed wave 2 repairs and tests; no public overall Phase 12 closure or acceptance record was found. The standalone remains unpublished, with no public release or product deployment established. AppImage remains conditional/deferred; Flatpak and Snap are outside the documented packaging path.

The current README documents a standalone startup abort if any component of the full path to either `bots5` or `bots5-desktop` contains non-ASCII characters, including ancestor directories. Source installation is unaffected. An ASCII-only installation path is required; broader path compatibility needs separate toolchain qualification. The public record accepts this limitation for Mick's current use and explicitly rejects treating it as an undocumented general Linux release property.

The final closure supersedes the earlier unresolved provider-stream cleanup status for the corrected subject. Its finite ownership proof is not a global leak-free guarantee. The record retains **807 pytest warnings**, including resource warnings, alongside observed pending restore-task diagnostics. Their allocation/ownership origins and individual harmlessness findings remain unestablished. Real credential-service operations remain unverified, and the Python/Nuitka toolchain retains its experimental qualification.

The unsupported historical migration downgrade remains accepted/carried and leaves partial database changes. Supported recovery restores attributable prior source or a verified pre-upgrade backup and migrates forward; no successful historical reversal is claimed.

Provider secrets, private operational context and material that is not intentionally public are not reproduced here.
