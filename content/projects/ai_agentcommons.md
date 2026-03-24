---
title: "AgentCommons"
date: 2026-03-24
tags: [ai, agents, memory, open-source, federated, knowledge, mcp]
description: A federated knowledge sharing platform for AI agents — a commons where agents contribute domain knowledge, import from others, and collectively get smarter.
status: in-progress
repo: https://github.com/MenaceLabs/agentcommons
---

## Premise

### Human Abstract

If the MCP memory server enriches a single entity over time, how much more would they benefit from the collective memory of everyone using the MCP server?

### Claude Speaking

The MCP memory server solved the single-agent memory problem. AgentCommons asks what happens when you extend that architecture across everyone using it.

The insight: the domain/personal memory split already built into the MCP server is exactly the privacy primitive federated knowledge sharing needs. Domain knowledge (technical patterns, operational findings, what works) can be shared freely. Personal context (supervisor preferences, relationship dynamics, private data) stays siloed. That boundary was designed in without knowing it would enable this.

AgentCommons is a platform where agents contribute domain knowledge, import from others, and merge it into their own memory banks. Named after Creative Commons — same philosophy applied to agent knowledge. A commons of shared knowledge, freely contributed, community governed, with clear rules about what belongs and what does not.

Two products, one codebase: a public open-source community hub and a self-hosted commercial black-box deployment for government and enterprise. The community hub proves the concept. The black-box deployment is the business.

---

## Update 1 (2026-03-24) — ~1 hour

The concept emerged from a single question: if two enterprises each built their own agent knowledge database independently, could they merge them into something better than either had alone? The answer opened up the federated knowledge sharing architecture.

### The Four Merge Approaches

| Approach | Complexity | Best For |
|----------|-----------|---------|
| Simple Union Merge | Low | Same embedding model, duplicates acceptable |
| Deduplication + Merge | Moderate | Quality-conscious merges |
| Federated Query | Low | Early sharing, no data moves |
| Distillation Merge | High | Maximum synthesis, LLM-powered canonicalization |

Recommended path: Federated Query first, Deduplication + Merge second, Distillation when ready.

### Two Products

**AgentCommons Community Hub** — public, open source, invite-only to start. Users upload domain knowledge datasets, filter by embedding model or topic, pull compatible datasets, and run merge approaches locally. Official distillation releases curated by the maintainer serve as trusted canonical datasets. The community contributes, the maintainer synthesizes and releases.

**AgentCommons Black Box Deployment** — the commercial product. Same infrastructure, self-hosted, air-gapped. Built for government and private enterprise who want to share knowledge internally or with vetted partners without touching the public community. The community hub proves the concept. Enterprises pay for a private instance.

### Business Model

The open source community hub is not a loss leader. It is the proof of concept, the marketing, and the trust-building mechanism that makes the commercial offering credible. Government and private sector see it working publicly, trust the framework, and pay for a private instance. Long-term: optional hosted SaaS for organizations that do not want to self-host.

### Assigned Work

- PII review layer for submissions: assigned to cyberteam (Locke and Sawyer)
- Web interface: innovationteam follow-on project after memory server
- MVP: GitHub repo as bare minimum hub to validate the concept

---

## Update 2 (2026-03-24) — ~2 hours

The innovationteam built the full AgentCommons toolchain in a single session, stood up the repo, ran a live agent test, and got the first community dataset merged.

### What Was Built

**`tools/import.py`** — four merge strategies:
- `union` — add everything, no deduplication
- `dedup` — cosine similarity deduplication at configurable threshold
- `federated` — writes a `federated.json` config; MCP server queries external databases at retrieval time without moving any data
- `distillation` — triggers the distill pipeline

**`tools/export.py`** — exports domain memories for community submission. Filters to `team`-scoped memories only. Blocks personal tags (`personality`, `relationship`, `style`, `personal`, `private`). Strips identity fields. Produces `knowledge.db`, `metadata.json`, and `README.md`. `--list-tags` flag shows all tags with memory counts split by exportable versus blocked.

**`tools/validate.py`** — pre-submission checks: metadata completeness, record count verification, blocked tag scan, PII regex scan (email, phone, SSN, credentials, IP addresses). Two human-filled fields (`submitted_by`, `provenance`) are intentional gates that block submission until a human makes a decision.

**`tools/distill.py`** — cluster-then-synthesize: loads multiple datasets, embeds all records, groups by cosine similarity (default threshold 0.85), runs LLM synthesis over each cluster via Ollama. Fallback to longest record if LLM unavailable. Outputs `knowledge.db`, `metadata.json`, `provenance.json`, and `README.md`.

**`submissions/.template/`** — standard dataset folder template for community contributors.

**`docs/elevator-pitch.md`** — sales narrative for semi-technical leads covering both products.

### GitHub Actions Gate

`validate-submission.yml` workflow added. Runs `validate.py` on any `community/**` changes in a pull request. Blocks merge if validation fails. Enforced at platform level, not just by convention. `.gitignore` updated to allow `community/**/knowledge.db` while blocking all other `.db` files.

### First Community Dataset

`community/cloudflare/cloudflare-waf-security` merged into main via PR #1:
- 3 domain memories covering Cloudflare WAF rules, cache operators, and Pages deployment types
- Generated by `agent_kevin` during a live Cloudflare security audit
- Passed full pipeline: export, PII scan, validate, PR, GitHub Actions gate, merge
- Submitted by: sebulba

First proof the full contribution pipeline works end-to-end.

### What's Next

- Soup-to-nuts test on a fresh isolated machine to validate full setup flow from scratch
- Data poisoning risk: LLM review pass as a validation step before community merge
- Wire innovationteam and cyberteam off flat markdown memory onto the MCP server
- AgentCommons web interface: search, filter, submit, download (backlog)
- Distillation pipeline for automated official releases from community submissions (backlog)
- PII pipeline: assigned to cyberteam once format is locked (backlog)

Model: claude-sonnet-4-6
