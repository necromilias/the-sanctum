---
title: Organisational Memory + OMC
summary: Repository-centred project memory with explicit authority, provenance and deterministic retrieval.
status: implemented
statusNote: Repository governance and deterministic OMC retrieval are implemented; broader successor cutover remains deliberately incomplete.
type: Knowledge systems and governance
lastVerified: 2026-10-01
areas:
  - provenance
  - retrieval
  - governance
  - Git
  - human authority
featured: true
order: 2
evidence:
  - label: Sanitized synthetic governance reference
    url: https://github.com/necromilias/llm-governance-reference/tree/439753a94d976ee277a9fafaf5a0c52d90a61ca6
publicBoundary: This is an architectural account only. It does not reproduce private Organisational Memory records, internal paths, operator material or private repository content.
role: Mick defined the authority model, information boundaries and operating procedures, directed implementation and evaluation, and retains authority over consequential decisions.
---

## The problem

Conversational memory was not reliable enough for long-running technical work. It could collapse current state, history, proposals and decisions into one plausible-sounding narrative. Recency could be mistaken for authority, and a retrieved statement could arrive without enough provenance to judge it.

Organisational Memory was created to make project knowledge durable, reviewable and governed outside the conversation that happens to use it.

## The system Mick designed

Organisational Memory is a repository-centred authority system, not a claim that one repository automatically outranks every other source. Knowledge is stored with structure that separates current state from history, proposals from accepted decisions, and project-local context from broader authority. The applicable authority boundary determines which committed source owns a fact.

The current system deliberately supports split authority: responsibilities that have been explicitly migrated can be owned by the successor repository while excluded responsibilities remain with their prior authoritative source until a separate cutover decision.

OMC — the Organisational Memory Compiler — is a deterministic, read-only interface over explicitly pinned committed repositories. Its implemented retrieval layer selects bounded attributable context for another tool to use. It reports relevance and provenance; it does not become the decision-maker simply because it can retrieve the record.

## Constraints that mattered

- Committed sources outrank conversational recollection within their accepted authority scope.
- Current state, history, proposals and decisions remain distinct.
- Retrieval must preserve source identity and provenance.
- Registry membership alone does not prove current project status.
- Newer material does not automatically outrank accepted authority.
- Split authority must remain explicit until a separately approved cutover.
- Consequential decisions remain human decisions.

## What proved difficult

The central difficulty was preserving meaning across ingestion, compilation and retrieval. A technically successful search can still be wrong if it drops lineage, merges superseded material, treats relevance as authority, or presents a proposal as an accepted decision. Evaluation therefore had to examine not only whether a result was returned, but whether the consuming workflow could still determine where that result came from and what authority it actually carried.

## How failure was handled

The work used staged controls and deterministic evaluations. Retrieval defects and ambiguous authority were treated as system problems, not patched over with better-sounding prose. Where automation could not safely decide between competing records, the system preserved the conflict or stopped the affected work for human adjudication instead of inventing a winner.

## Implemented today

The repository system provides structured organisational knowledge, explicit authority and approval boundaries, durable provenance, deterministic validation and bounded successor ownership. Its current evidence-gated manual successor work has progressed substantially, but full successor cutover remains a separate unperformed decision.

OMC Stage 4 remains the implemented compiler baseline. It can deterministically retrieve bounded exact context from an explicit set of pinned repositories while remaining read-only and network-independent. Further retrieval evolution has accepted design work but remains intentionally unimplemented and parked pending a useful resumption condition.

The private operational corpus is deliberately not published. The linked governance reference is a sanitized, synthetic, non-authoritative architectural example of the principles behind the work. It is not independent proof of the private system’s current operational state.

## Validation evidence

Validation has included deterministic repository and compiler checks, black-box retrieval evaluation, provenance and authority tests, and controlled fresh-context workflows. The public governance repository shows the evidence-first and human-authority model without exposing private project memory.

## Current boundary

The core repository system is in use, and OMC Stage 4 provides an implemented deterministic retrieval interface. Full successor cutover is not implied, and retrieval remains downstream from the authority sources it reads.

Private memory, internal operator procedures, source locations and unpublished project records remain outside the public boundary.
