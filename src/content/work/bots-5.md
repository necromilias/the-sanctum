---
title: B.O.T.S. 5
summary: A local-first AI campaign harness and native Linux desktop built around bounded execution, explicit authority, durable evidence and human acceptance.
status: implemented
statusNote: Linux v0.1 is closed and accepted with limitations for Mick's current use. A later Unicode-path packaging repair and application icon implementation have landed. The standalone remains unpublished; broader Linux compatibility and installed launcher matching remain unqualified.
type: AI systems and desktop tooling
lastVerified: 2026-10-08
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
  - label: Phase 12 and Linux v0.1 accepted closure record
    url: https://github.com/necromilias/bots-5/blob/7db9c2d357902a1f554b211af885af9c31eac4c6/docs/LINUX_V0_1_PHASE12_CLOSURE_REPORT.md
  - label: Phase 12 wave 2 repairs and reported validation
    url: https://github.com/necromilias/bots-5/commit/ba72d16aa3540218cb70e377fa9f452252b7c360
  - label: Unicode-path packaging repair and scoped validation
    url: https://github.com/necromilias/bots-5/commit/7c0f74d6b886d9b30c22e8772948a6f6ca8a282a
  - label: Accepted artifact limitation and rebuilt candidate distinction
    url: https://github.com/necromilias/bots-5/blob/7c0f74d6b886d9b30c22e8772948a6f6ca8a282a/README.md#standalone-unicode-installation-paths
  - label: Application icon implementation and installation boundary
    url: https://github.com/necromilias/bots-5/blob/db82e0b34bf83ea9d0e306f90e8699d3e16e135b/docs/APPLICATION_ICON.md
  - label: Phase 11 final product commit
    url: https://github.com/necromilias/bots-5/commit/59265916abeb2e9f6cbf953726f22a9f7c00f3b5
  - label: Phase 11 accepted closure and validation record
    url: https://github.com/necromilias/bots-5/blob/7446e5c3a85d4043bf387784568458a6d270ff49/docs/LINUX_V0_1_PHASE11_CLOSURE_REPORT.md
  - label: Final Phase 11 authority and effect supplement
    url: https://github.com/necromilias/bots-5/blob/7446e5c3a85d4043bf387784568458a6d270ff49/docs/UNIFIED_AUTHORITY_EFFECT_INVENTORY_PHASE11_FINAL_SUPPLEMENT.md
  - label: Phase 11 implementation report and historical checkpoints
    url: https://github.com/necromilias/bots-5/blob/6a41939388944a450b0169e389901d54de72b02b/docs/LINUX_V0_1_PHASE11_IMPLEMENTATION_REPORT.md
  - label: Standalone Linux packaging and target limits
    url: https://github.com/necromilias/bots-5/blob/7c0f74d6b886d9b30c22e8772948a6f6ca8a282a/docs/STANDALONE_LINUX_PACKAGING.md
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
publicBoundary: This page follows the accepted Linux v0.1 closure records and subsequent packaging and icon work in public Git, distinguishing recorded acceptance and reported candidate validation from release and platform support. Provider credentials, private operational context and unpublished material remain excluded.
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

The public repository contains the original manifest-driven campaign harness and the native Linux v0.1 application, closed and accepted with limitations through Phase 12. The Phase 10 baseline includes persistent conversations, streaming generation and cancellation, provider and model configuration, deterministic context and content-addressed attachments, search and exact navigation, inspection and provenance surfaces, transcript and archive interchange, backup and whole-installation restore, and a native campaign dock over the headless campaign engine.

Phase 10 adds attempt-addressed campaign evidence, explicit preflight and one-shot approval binding, truthful cancellation, selected-versus-cumulative cost accounting, worker regeneration, synthesis rerun with staleness classification, and matching headless CLI operations.

Later `main` contains the SQLite 3.45.1 compatibility repair and CI v1, followed by Phase 11. Phase 11 adds command-palette and keyboard workflows, richer message rendering, folders, pins and deletion, workspace restoration, model-selector and desktop presentation work, and a standalone Linux build path for the CLI and desktop. Its final repair makes provider/backend/router stream ownership explicit and drains owned cleanup before application resources are released, preserving valid terminal completion without consuming irrelevant response tails.

Public `main` also adds provider-managed OpenRouter context and Archive v3 preservation. This mode uses deterministic local selection with a heuristic context estimate and provider final admission; it does not promise exact token accounting or guaranteed fit. Existing exact-accounting adapters retain their separate contract.

The subsequent Phase 12 wave 2 commit aligns provider failure reporting with the canonical remote-outcome classification and connects caller-supplied completion deadlines to HTTP transport timeouts. It adds regression coverage and loopback TCP tests for malformed streams, failures before terminal completion, trailing garbage, cancellation, timeout settlement and resource ownership, alongside backup/restore crash tests.

Later packaging work pins Nuitka 4.2, freezes Python UTF-8 mode and normalizes filesystem-byte arguments in generated entrypoints. Application icon work embeds size-specific SVG badges in Qt and supplies desktop-entry and hicolor resources for wheels and standalone bundles. It sets application/window icons and a shared launcher identity; it does not install shortcuts or change desktop settings.

## Validation evidence

The accepted Phase 10 candidate recorded a complete-repository T4 result of **1504 passed, 1 skipped**, exit 0. Independent review completed its verification milestones with no candidate-changing defect, but the reviewer failed while emitting its final report. The final technical disposition, **PASS_WITH_LIMITATIONS**, is a labelled supervisor reconstruction rather than an oracle-authored final report. Accepted limitations remain documented rather than silently rewritten as resolved.

The Phase 10 review and validation used deterministic fake providers and offscreen Qt. They do not establish a real GUI session or live provider acceptance. Accepted regression-test gaps remain around synthesis-rerun independence and legacy-v1 freshness; the final outcome record preserves these alongside the product limitations.

CI v1 subsequently established a separate authoritative sharded T4 result against candidate [`58fca2c7`](https://github.com/necromilias/bots-5/commit/58fca2c7b1b4111d982733980c303565bf91695e), in [run `36682157600`](https://github.com/necromilias/bots-5/actions/runs/36682157600): **1597 passed, 0 failed, 0 errors, 1 permitted skip** across 1598 collected tests. The workflow is dispatch-only. That CI result belongs to this exact candidate, not automatically to every later descendant of `main`.

The 5 October Phase 11 closure record reports final source T4 of **2189 passed, 1 permitted opt-in skip, 0 failures/errors**, **71/71 frozen provider-cleanup cases passed**, and **156/156 M7 package checks passed**, with no skips or unexecuted cases in those two package gates. These results belong to the retained final source and rebuilt standalone, not to later documentation bytes. Packaging validation is separate from T4 and uses offscreen desktop checks; its evidence is confined to the validated target, without a general Linux-distribution compatibility guarantee.

The public closure record distinguishes technical completion, subsequent human acceptance, commit authority and landing. Raw campaign evidence and the standalone remain outside the public product commit; no new public GitHub Actions run is linked for this final candidate. Earlier reports and test counts retain their historical subjects.

The Phase 12 closure record retains **2240 passed, 1 permitted skip, 0 failures/errors** for its source candidate and **19/19 frozen obligations passed** for a rebuilt standalone. It records Mick's acceptance as **PASS_WITH_LIMITATIONS** on 6 October UTC. These are retained campaign results, not checks rerun for the documentation closeout; the public record does not establish independent byte-level verification of local seals or manifests. The retained run artifacts and executable are not in the public tree, and the latest public GitHub Actions T4 run still concerns the earlier CI v1 candidate.

The later Unicode-path repair commit separately reports **164 mandatory checks passed**, **19 retained frozen cases passed**, two loopback stalled-provider deadline trials passed, and **363/363 final artifact files verified unchanged**. Its qualification is Forge with offscreen Qt, covering ASCII, accented and CJK/home-like paths, renamed Unicode executables, plain `C` locale startup and restore re-entry. It is not full T4, real-compositor, general Linux or arbitrary non-UTF-8 filename-byte qualification. Those results predate the subsequent icon commit and do not automatically validate its descendant. The icon implementation includes resource-rendering and launcher-identity tests, but no new public result is supplied. This site audit inspected public source and tests without independently rerunning B.O.T.S. or verifying its standalone.

## Current boundary

The public closure record reports Phase 12 closed and accepted with limitations, making Linux v0.1 complete for Mick's current use. Deferred post-v0.1 work retains its separate authority boundary. The standalone remains local and unpublished, with no public release or product deployment established. AppImage remains conditional/deferred; Flatpak and Snap are outside the documented packaging path.

The accepted v0.1.0 artifact built with Nuitka 4.1.1 retains DEP-01: non-ASCII executable-path components can abort `bots5` or `bots5-desktop` at startup. That artifact still requires an ASCII-only installation path; source installation is unaffected. The later rebuilt candidate reports scoped Unicode-path qualification and does not replace the accepted artifact or establish broader distribution compatibility. The historical closure's DEP-01 wording remains applicable to its accepted artifact, rather than describing every later build recipe.

The icon resources are landed implementation, not proof of an installed desktop integration. The supplied desktop entry expects `bots5-desktop` on PATH. Installing launcher resources and checking actual pinned-launcher matching in a KDE session remain separate steps; no such installation or session verification is claimed here.

The Phase 11 closure supersedes the earlier unresolved provider-stream cleanup status for the corrected subject. Its finite ownership proof is not a global leak-free guarantee. That record retains **807 pytest warnings**, including resource warnings, alongside observed pending restore-task diagnostics. Their allocation/ownership origins and individual harmlessness findings remain unestablished. Real credential-service operations remain unverified, and the Python/Nuitka toolchain retains its experimental qualification.

The unsupported historical migration downgrade remains accepted/carried and leaves partial database changes. Supported recovery restores attributable prior source or a verified pre-upgrade backup and migrates forward; no successful historical reversal is claimed.

Provider secrets, private operational context and material that is not intentionally public are not reproduced here.
