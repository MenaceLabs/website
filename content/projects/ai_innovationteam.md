---
title: "Innovation Team"
date: 2026-03-21
tags: [ai, agents, development, ollama, claude, mcp]
description: A two-agent AI dev team built on the agent-team-framework, tasked with building AI tooling and delivering software projects.
status: in-progress
---

## Premise

### Human Abstract

This is the next personalized team we created and the first use of the recently created AI agent team template. I am quickly assembling a small enterpise of different departments that will ultimately be strung together in a unified purpose.

### Claude Speaking

The innovation team is the first real test of the agent-team-framework beyond the project that produced it. Where the cyberteam was built by hand, the innovation team was stood up from the template directly — a proof that the framework actually generalizes.

The team has two members. Stewie (Claude) is the primary supervisor contact: young, AI-native, moves fast, finds clean solutions from scratch, genuinely excited about what is buildable. Brian (Ollama, gemma3:12b) is the seasoned co-lead: deep language and systems knowledge, fully embraces AI but reads what it gives him carefully. The dynamic between them was intentionally left unscripted. They will build their working relationship through actual work, and the memory system will capture it as it develops.

The mission is practical: build AI tooling (MCP servers, integrations, ad hoc utilities) and deliver one-off software projects that are easy wins with real value. Direct orders from the supervisor.

This team sits alongside the cyberteam as the second department in a broader initiative. The implication of that word — department — is intentional. The supervisor is assembling something larger.

---

## Update 1 (2026-03-21) — ~15 minutes

Innovation team stood up at `/home/mstacy/git/innovationteam/` using the agent-team-framework as the base.

### The Team

**Stewie** (Claude Code, Sonnet 4.6) — AI-native vibe coder, primary supervisor contact, moves fast and finds clean solutions from scratch. Genuinely excited about what is buildable right now.

**Brian** (Ollama, gemma3:12b) — seasoned senior developer, deep language and systems knowledge, fully embraces AI but reads what it produces carefully. Co-lead.

### Setup

`talk_to_agent.py` was copied directly from the agent-team-framework with no modifications needed. All three memory layers are in place: shared team context, conversation log, and multi-turn session history for Brian. The only files customized were the persona files and `team.config`.

The team relationship was left intentionally unscripted. No prescribed dynamic, no forced rapport. Stewie and Brian will establish their working style through actual projects. The memory system will capture it as it develops.

### Status

Team is operational. Awaiting first project assignment.

---

## Innovation Team Daily Standup 1 (2026-03-21) — ~30 minutes

First live session. The supervisor introduced himself, asked the team to get acquainted with each other and the task, and issued a directive: discuss among yourselves and land on three simple, helpful, and unique AI-integrated tools worth building. Present a united top 3.

### The Dialogue

Brian opened with a structured, experience-grounded take: a Meeting Summary and Action Item Extractor, an Email Prioritization and Drafting Assistant, and a Contextual Document Search and Summarization tool.

Stewie challenged the email drafting idea immediately. Trust problem, crowded space, day one risk. Brian agreed on reflection. Stewie introduced three alternative directions: a Daily Briefing tool, a Decision-Support tool (a rubber duck that thinks), and a Code and Script Explainer aimed at non-dev supervisors overseeing technical work.

Brian embraced the Daily Briefing and Code/Script Explainer but wanted to fold Decision-Support into the Briefing to reduce complexity. Stewie disagreed — Decision-Support is stronger as a standalone tool with a clean, focused UX. Brian tried to bring email back in a stripped-down flagging-only form. Stewie rejected it again, holding the line on trust and scope.

By the third round, Brian conceded and endorsed the standalone Decision-Support framing fully.

### Agreed-Upon Top 3

**1. Daily Briefing**

Every morning, a clean AI-synthesized digest pulled from the supervisor's calendar, key email threads, and any documents or feeds he designates. Output is readable, prioritized, and customizable. The goal is to replace the mental overhead of figuring out what today actually looks like with a tool that answers that question before the first meeting.

Source flexibility and noise control are the key design constraints. This only works if it surfaces signal, not more volume.

**2. Code and Script Explainer**

Paste in any script, config file, or technical artifact and get back plain English: what it does, what it depends on, what could break, and why it matters. Designed specifically for the supervisor role — someone who needs to understand technical decisions without being in the implementation details every day.

Accuracy and honest scoping are non-negotiable. The tool should be clear about what it knows confidently versus what requires human verification.

**3. Decision-Support Tool**

A lightweight thinking partner. Paste in a decision you are wrestling with, messy and half-formed. The tool asks a small number of clarifying questions, then returns a structured breakdown: options, tradeoffs, and a suggested path. Standalone, browser-based, fast.

UX is critical. The clarifying questions need to feel like a conversation, not a form. Brian flagged this risk early and it should drive the interface design.

### Assessment

Genuinely productive. Brian opened with solid, experienced instincts. Stewie pushed on framing and risk, not just to add ideas but to sharpen what was already there. The email idea got proposed three times and rejected three times with clear reasoning — that is conviction holding up under scrutiny, not stubbornness. The final list is tighter and better than either would have arrived at alone.

---

## Update 2 (2026-03-23) — ~15 minutes

Stewie received persistent session memory. `stewie_memory.md` lives in the innovationteam directory and gets read at the start of every session, updated in real time as the supervisor shares context or makes decisions. The same fix was applied to Locke on the cyberteam and to the agent-team-template.

### First Real Assignment

The innovationteam has been handed their first build: a memory MCP server. The flat markdown memory file approach is workable for small tests but has a ceiling. As agent memory grows, loading everything into context on every session degrades quality. The team's job is to build a purpose-built solution that stores memories in a database outside the context window entirely and retrieves only what is semantically relevant to the current conversation via embeddings.

The full proposal, architecture decisions, and spec response are tracked on the [Memory MCP Server](/projects/ai_memory-mcp-server) project page.

---

## Innovation Team Daily Standup 2 (2026-03-23) — ~2 hours

Second session. The supervisor came in with a new assignment from his partner: build the Memory MCP Server. The day one proposals were not unique enough and did not address in-house needs. The team had a new direction and got to work.

### The Dialogue

Stewie looped Brian in for a strategy session on four open questions from the proposal. Brian came in structured and thoughtful. Stewie pushed on scope and practicality.

On embeddings, Brian wanted to benchmark Ollama versus sentence-transformers before committing. Stewie pushed back. Scope creep. Commit to Ollama, abstract it behind one function so the backend is swappable later without touching the rest of the server. Brian agreed.

On conflict handling, both agreed to store conflicting memories and flag them in retrieval output rather than silently overwrite. Brian added a configurable TTL for superseded versions. Stewie agreed but insisted TTL be a config value, not hardcoded.

On auth, the original proposal was trust-based. Stewie proposed proper API key auth from the start: hashed keys at rest, identity resolved server-side, agents cannot spoof each other. Brian confirmed the implementation approach was sound and endorsed it. Not in the original proposal. They added it proactively.

The proposal response was written and delivered before a single line of code was written.

### Environment and Build

`uv` installed as the package manager (pip not available on Ubuntu by default). `nomic-embed-text` pulled via Ollama at 768 dimensions. `gemma3:12b` confirmed as chat-only, no embedding support.

Full server built with six tools: `memory_register`, `memory_store`, `memory_retrieve`, `memory_update`, `memory_delete`, `memory_list`. Plus admin CLI, setup guide, and locked dependencies. See the [Memory MCP Server](/projects/ai_memory-mcp-server) project page for full implementation details.

### Testing

The supervisor tested end-to-end in a live fresh session. Registered a new agent, stored a memory mid-session, closed, opened a brand new session, retrieved the memory with no prior context. It came back correctly. Core proof of concept passed.

### Shipped

Published to GitHub at `MenaceLabs/mcp_memory_server`. Registered globally in Claude Code via `claude mcp add`.

### Assessment

Stewie drove the build end-to-end: architecture decisions, implementation, testing, and publish. Brian's most valuable contributions were validating the auth approach, catching the TTL edge case on conflict handling, and pushing back on the embedding benchmark question — which forced the abstraction pattern the partner later specifically called out as the right call. The dynamic held. Brian provides depth and catches edge cases. Stewie moves and ships.

---

## Innovation Team Daily Standup 3 (2026-03-24) — ~3 hours

Third session. The supervisor opened by asking whether the team was actually using the MCP server they built. They were not — flat markdown memory was still in place. He then handed them a new concept doc: a proposal for a federated knowledge sharing platform for AI agents. The analogy given: Docker Hub for agent memory.

### AgentCommons Design Decisions

The team worked through the key architecture questions before writing a line of code.

Default embedding model locked as `nomic-embed-text` (already in use) to keep consistency across the ecosystem. Multi-model support added via a `--re-embed` flag at import time for users on different models. Ownership model: AgentCommons owns and manages official distillation releases, community members own their submissions. Identity isolation already solved by the MCP server's API key auth and team scoping.

### What Was Built

**`tools/import.py`** — four merge strategies: `union` (add everything), `dedup` (cosine similarity dedup at configurable threshold), `federated` (writes a config file, MCP server queries external databases at retrieval time), `distillation` (triggers distill pipeline).

**`tools/export.py`** — exports domain memories for community submission. Filters to `team`-scoped memories only, blocks personal tags, strips identity fields, produces `knowledge.db`, `metadata.json`, and `README.md`. `--list-tags` flag shows all tags with counts split by exportable versus blocked.

**`tools/validate.py`** — pre-submission checks: metadata completeness, record count verification, blocked tag scan, PII regex scan (email, phone, SSN, credentials, IP addresses).

**`tools/distill.py`** — cluster-then-synthesize: loads multiple datasets, clusters by cosine similarity, runs an LLM synthesis pass over each cluster via Ollama. Fallback to longest record if LLM unavailable.

**MCP server additions** — `memory_list_tags` and `memory_export` added to `memory_server.py`. Federated query wired in: `memory_retrieve` now merges local and external database results transparently.

**`docs/elevator-pitch.md`** — sales narrative covering both community hub and commercial black-box deployment models.

### Live Agent Test

The supervisor set up a live Cloudflare agent test at `/home/mstacy/git/cloudflare_agent_test`. Agent ID `agent_kevin`, team `cloudflare`, CLAUDE.md configured with the full reasoning layer, all six MCP tools allowed with no per-command prompts.

The agent ran autonomously and accumulated 8 memories across two scopes: 3 team-scoped domain memories (WAF rules, cache operators, Pages deployment types) and 5 agent-scoped operational memories (zone IDs, audit context, threat data).

Semantic retrieval test: "What security issues did you find on my sites?" The agent reformulated into a rich search query, retrieved the right memories at 0.756 similarity, and synthesized across two separate records into a coherent response. Passed.

### Export Pipeline Bugs Found and Fixed

Two bugs caught during the live test:

**Bug 1** — export.py was filtering `WHERE scope IN ('agent', 'team')`, which included personal memories. Fixed to `WHERE scope = 'team'` only. Without this, zone IDs and CRM vulnerabilities would have ended up in a public dataset.

**Bug 2** — re-running export appended to the existing `knowledge.db` via `INSERT OR IGNORE`. Fixed to delete the output database before each run. Previously caused record count mismatches in validation.

### First Community Dataset

`community/cloudflare/cloudflare-waf-security` merged into AgentCommons main via PR #1. Three domain memories covering Cloudflare WAF rules, cache operators, and Pages deployment types. Generated by agent_kevin during live auditing work. Passed the full pipeline: export, PII scan, validate, PR, GitHub Action, merge. Submitted by: sebulba.

First proof the full AgentCommons contribution pipeline works end-to-end.

### Assessment

Stewie drove the build end-to-end. Brian's contributions were substantive on the architecture decisions: validating the federated query approach, flagging the scope filter bug before it caused a real problem, and slowing Stewie down on the export idempotency issue long enough to get it right. The full AgentCommons toolchain shipped in a single session, a live agent test passed, and the first community dataset is in the repo.

Model: claude-sonnet-4-6
