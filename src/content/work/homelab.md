---
title: Homelab Operations
summary: The practical Linux, storage, networking and recovery work that keeps Mick’s development and local-AI systems usable.
status: maintained
statusNote: An ongoing operating capability, described without drift-prone inventory claims or exposed-service detail.
type: Infrastructure and operations
lastVerified: 2026-09-09
areas:
  - Linux administration
  - containers
  - networking
  - storage and recovery
  - automation
featured: false
order: 5
evidence: []
publicBoundary: Hardware inventories, private addresses, credentials, detailed topology and unnecessary exposed-service information are deliberately omitted.
role: Mick operates and evolves the environment, diagnoses failures and directs migrations, rebuilds and automation work with AI assistance where useful.
---

## The problem

Local AI and long-running production work need more than a collection of self-hosted applications. They need machines and services that can be diagnosed, repaired, migrated and recovered when something fails. The homelab is the operating environment beneath that work.

## What Mick operates

The work spans Linux administration, containerised services, networking, storage, backup and recovery, fault isolation, automation, and the migration or rebuilding of systems when their original shape no longer serves the job.

The emphasis is operational capability: understanding dependencies, preserving data, controlling exposure and restoring useful service. A product list would age quickly and say less about the engineering involved.

## Constraints that mattered

- Private services and sensitive topology should remain private.
- Recovery matters more than a decorative uptime number.
- Storage changes need explicit evidence and rollback thinking.
- Local-AI workloads compete for finite compute and memory.
- Automation must remain understandable when it fails.
- Public descriptions must not increase the home network’s attack surface.

## What proved difficult

Real operating work includes broken upgrades, storage pressure, failed services, hardware constraints and migrations whose risks only become visible under load. Details also drift: a precise machine specification or current service inventory can become wrong shortly after publication.

## How failure is addressed

Problems are reduced to observable layers: host, storage, network, process and application. Changes are staged, evidence is collected before destructive action, and recovery paths are considered part of the work rather than an afterthought. Rebuild experience is treated as useful system knowledge, not hidden embarrassment.

## Implemented today

The homelab actively supports development, local-AI inference, creative production and private services. This public account intentionally stays at the capability level. It does not claim a frozen current inventory of machines, capacities or exposed endpoints.

## Validation and evidence

Operational validation is performed against the environment itself: service state, process and resource evidence, storage health, restart behaviour and recovery outcomes. Those internal records and topology details are not copied into the portfolio.

## Current boundary

This is maintained infrastructure, not a finished product. Exact topology, hardware values and service lists are omitted because they are both drift-prone and unnecessarily revealing.
