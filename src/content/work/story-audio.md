---
title: Story Audio
summary: A resumable local-AI production system for turning long-form writing into directed, assembled audio.
status: active
statusNote: The production pipeline is active and incomplete; this is not presented as a finished audiobook system.
type: Creative production system
lastVerified: 2026-09-09
areas:
  - local AI
  - speech synthesis
  - production planning
  - resumable pipelines
  - audio assembly
featured: true
order: 3
evidence: []
publicBoundary: Only the public-safe production shape is described. Manuscript content, voice assets, private production records, local paths and unpublished audio are excluded.
role: Mick defined the production goal, editorial and performance constraints, staged workflow and acceptance expectations. AI tools assist with preparation, implementation and rendering.
---

## The problem

Generating speech is easy to demonstrate and hard to turn into a reliable long-form production process. A real project needs stable source control, repeatable preparation, deliberate performance choices, restartable rendering and deterministic assembly. A single opaque “make an audiobook” step provides none of those guarantees.

Story Audio exists to make that work inspectable and recoverable while keeping the production local.

## The production system

The current public-safe workflow is organised as five connected stages:

1. **Canonical source** — establish the authoritative text before production begins.
2. **Semantic preparation** — turn prose into bounded units with enough context for downstream work.
3. **Performance planning** — record delivery intent separately from raw source text.
4. **Backend compilation and resumable rendering** — compile plans for the selected local backend, render bounded units and preserve progress across interruption.
5. **Deterministic assembly** — join accepted outputs in a known order rather than relying on an opaque generation session.

## Constraints that mattered

- The manuscript remains the canonical source.
- Editorial preparation and performance direction are explicit artifacts.
- A long render must be resumable rather than all-or-nothing.
- Backend-specific details should not contaminate the canonical production plan.
- Failed units need to remain visible and recoverable.
- Private writing and voice material must not leak into public evidence.

## What proved difficult

Long-form audio amplifies small inconsistencies. Segmentation affects pacing, performance instructions affect continuity, and a backend can fail after hours of otherwise useful work. The system also has to distinguish a technically rendered segment from an editorially acceptable one.

## How failure is addressed

The workflow records plans and render progress as durable artifacts. Work is divided into bounded units that can be inspected and rerun without discarding the entire production. Assembly is separated from generation so missing or rejected units cannot quietly disappear into a final file.

## Implemented today

The staged production shape, local rendering work and resumable artifact flow are implemented far enough to support active production. Backend and quality work continues. The system is not represented here as a completed end-to-end audiobook release process.

## Validation evidence

Validation focuses on deterministic plans and ordering, resumability, explicit failed-unit handling, and reproducible assembly. Detailed internal run evidence is private and is not copied into this public repository.

## Current boundary

Story Audio is active and incomplete. The system architecture and production method can be described publicly; manuscript material, voice assets, unpublished recordings and internal operational records cannot.
