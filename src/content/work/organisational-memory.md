---
title: Organisational Memory + OMC
summary: Repository-centred project memory with explicit authority, provenance and deterministic retrieval.
status: implemented
statusNote: The core approach and deterministic interface are implemented; private operational memory remains private.
type: Knowledge systems and governance
lastVerified: 2026-09-09
areas:
  - provenance
  - retrieval
  - governance
  - Git
  - human authority
featured: true
order: 2
evidence:
  - label: Public LLM governance reference
    url: https://github.com/necromilias/llm-governance-reference/tree/439753a94d976ee277a9fafaf5a0c52d90a61ca6
publicBoundary: This is an architectural account only. It does not reproduce private Organisational Memory records, internal paths, operator material or private repository content.
role: Mick defined the authority model, information boundaries and operating procedures, directed implementation and evaluation, and retains authority over consequential decisions.
---

## The problem

Conversational memory was not reliable enough for long-running technical work. It could collapse current state, history, proposals and decisions into one plausible-sounding narrative. Recency could be mistaken for authority, and a retrieved statement could arrive without enough provenance to judge it.

Organisational Memory was created to make project knowledge durable, reviewable and governed outside the conversation that happens to use it.

## The system Mick designed

The repository is the durable authority. Knowledge is stored with structure that separates what is current from what happened historically, what has merely been proposed and what a human has actually decided. Provenance travels with the record so a claim can be traced back to its source and authority.

OMC — the Organisational Memory Compiler — is a deterministic interface over that committed knowledge. It resolves a bounded query against a named corpus and returns attributable context for another tool to use. It does not become the decision-maker simply because it can retrieve the record.

## Constraints that mattered

- Committed sources outrank conversational recollection.
- Current state, history, proposals and decisions remain distinct.
- Retrieval must preserve source identity and provenance.
- Registry membership alone does not prove current project status.
- Newer material does not automatically outrank accepted authority.
- Consequential decisions remain human decisions.

## What proved difficult

The central difficulty was preserving meaning across ingestion, compilation and retrieval. A technically successful search can still be wrong if it drops lineage, merges superseded material, or presents a proposal as an accepted decision. Black-box evaluation therefore had to examine not only whether a result was returned, but whether its authority and provenance survived the full path.

## How failure was handled

The work used staged controls and deterministic evaluations. Retrieval defects and ambiguous authority were treated as system problems, not patched over with better-sounding prose. Where automation could not safely decide between competing records, the system preserved the conflict for human adjudication.

## Implemented today

The implemented system provides repository-centred knowledge organisation and deterministic OMC retrieval over committed material. It supports provenance-aware context delivery while keeping the consuming model downstream from the authority source.

The private operational corpus is deliberately not published. The linked governance reference is the appropriate public account of the principles behind the work.

## Validation evidence

Validation has included deterministic compiler checks, black-box retrieval evaluation and repository governance rules. The public governance repository shows the evidence-first and human-authority model without exposing private project memory.

## Current boundary

The core system and interface are implemented and actively used. Further operational refinements remain ongoing. Private memory, internal operator procedures and unpublished project records remain outside the public boundary.
