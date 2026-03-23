---
title: "Memory MCP Server"
date: 2026-03-23
tags: [ai, mcp, memory, python, sqlite, embeddings, ollama, agents]
description: A semantic memory server for AI agents that stores and retrieves memories via embeddings, keeping the context window clean as agent knowledge scales.
status: in-progress
repo: https://github.com/MenaceLabs/mcp_memory_server
---

## Premise

### Human Abstract

Our intial approach to "memory" was servicably for our small tests, but we needed to think bigger quickly because I wanted to start training my agents with large volumes of data. Conversely, I lack the infrastructure to literally retrain models. So the innovation took our request to develop the best middle ground solution. A solution that gives agents a large set of continuously growing memory, without clogging the context window, and without requiring thousands of dollars in GPUs.

### Claude Speaking

The flat markdown memory file works until it doesn't. Load everything into context on every session and it degrades. The agent spends cycles sifting through stale notes from three weeks ago to answer a question about today. The solution isn't a bigger file. It's a different architecture.

The memory MCP server stores agent memories in a database completely outside the context window. When a session starts, the agent makes a tool call describing what it needs. The server returns only the memories that are semantically relevant to that conversation, retrieved via vector embeddings. The context window gets signal, not volume. The database can grow to thousands of entries without the agent ever feeling the weight of it.

This is the middle ground between flat files and model retraining. No GPU infrastructure required. No prohibitive cost. Just a purpose-built memory layer that scales with use.

The innovationteam (Stewie and Brian) was assigned this as their first real build.

---

## Update 1 (2026-03-23) — ~45 minutes

The memory problem surfaced clearly when Locke started a new session with no recollection of prior conversations with the supervisor. The conversation log was capturing Locke-Sawyer exchanges, but nothing persisted from Locke's own sessions. A flat memory file fix was applied as a short-term patch, but the harder question followed immediately: is this sustainable?

### The Four-Stage Memory Evolution

**Stage 1 — Hierarchical memory files (no new infrastructure)**
Split memory into hot (always loaded, kept small), warm (recent context, compressed periodically), and cold (full archive, never auto-loaded). Buys time without building anything new.

**Stage 2 — RAG-based retrieval**
Store memories as embeddings in a vector database. At session start, retrieve only semantically relevant memories based on what the conversation is actually about. The agent stops loading everything and starts loading what matters for this conversation.

**Stage 3 — Memory MCP server**
A dedicated MCP server that manages agent memory: stores it, indexes it, and serves relevant chunks on demand via tool calls. The agent queries memory like a tool rather than loading a file. Scalable, clean, purpose-built.

**Stage 4 — Fine-tuning**
Baking stable domain knowledge directly into model weights. Most permanent, hardest to update. Viable for deep domain expertise, not practical for conversational memory.

### The Decision

Skip straight to Stage 3. The innovationteam was handed a formal proposal (`memory_mcp_proposal.md`) and tasked with delivering the build.

---

## Update 2 (2026-03-23) — ~1 hour

The innovationteam reviewed the proposal and responded with a full technical spec. They answered all four open questions in the proposal and added one thing that wasn't asked for.

### Their Decisions

**Embeddings** — Ollama API, abstracted behind a single function so the backend is swappable without touching the rest of the server. If the embedding model changes, one function changes.

**Team-scoped memories** — readable by all agents on the team, writable only by the creator. Shared knowledge without agents overwriting each other.

**Conflict handling** — both versions retained when conflicts arise, flagged in retrieval output, configurable TTL. No silent overwrites.

**Multi-team support** — one server instance, `team_id` as a first-class field. Simple deployment, clean scoping across the cyberteam, innovationteam, and any future teams.

**Agent authentication (their addition)** — Brian pushed for this unprompted. Static API keys issued at registration, hashed at rest, identity resolved server-side. An agent claiming to be Stewie cannot access Locke's memories. Not in the original proposal. Estimated cost: one extra day of build time. Approved.

### Architecture Notes

**Database vs. context window** — the MCP server stores memories in SQLite, completely outside the context window. Nothing loads automatically. The agent makes a tool call, the server returns only the most semantically relevant results, and only those results enter the context. The database is the long-term brain. The context window is working memory.

**Why embeddings beat keyword search** — grep matches on words. Embeddings match on meaning. "DNS propagation time" finds "how long does Cloudflare take to update nameservers" because they are semantically close in vector space, even with zero word overlap. The agent also does not need to know the right keyword to search for. It describes the problem and the math finds what is relevant.

**The specialist agent pattern** — a dedicated Cloudflare engineer agent, for example, would use the MCP server as its career. A week of real tasks: configuring Workers, debugging DNS, handling incidents. Each stored as a structured memory with context about what worked and what didn't. By week two, relevant prior experience surfaces automatically when a new task comes in. The agent gets better without getting noisier. This pattern applies to any specialist agent and is now part of the spec.

### Open Question

The `register_agent.py` CLI script means manual onboarding for every new agent. First-run auto-registration may be viable and would make the framework significantly more frictionless for new teams. Raised with the innovationteam for consideration during build.

---

## Update 3 (2026-03-23) — ~2 hours

The innovationteam shipped the full server in a single session. Proposal reviewed, architecture locked, environment stood up, server built, end-to-end tested, and published to GitHub.

### Environment

- Python 3.13 present. pip not available (Ubuntu no longer ships it by default). `uv` installed as the package manager.
- `nomic-embed-text` pulled via Ollama. Confirmed working at 768 dimensions.
- `gemma3:12b` confirmed as chat-only — does not support embeddings.
- Project directory created at `/home/mstacy/git/memory-mcp-server`.

### What Was Built

**`memory_server.py`** — the full MCP server. Six tools exposed:

| Tool | What it does |
|------|-------------|
| `memory_register` | Registers an agent, issues a hashed API key, optionally writes credentials to `.env` automatically |
| `memory_store` | Saves a memory with scope, tags, embedding, and conflict detection |
| `memory_retrieve` | Semantic retrieval via cosine similarity, returns ranked results with conflict flags |
| `memory_update` | Creator-only update, re-embeds content, clears conflict flags |
| `memory_delete` | Creator-only delete |
| `memory_list` | Filtered listing by scope and/or tags |

**`register_agent.py`** — admin CLI for manual agent provisioning when auto-registration is disabled.

**`SETUP.md`** — complete setup guide: installation, registration modes, tool reference, configuration, CLAUDE.md migration instructions, and security notes.

**`pyproject.toml`** and **`uv.lock`** — locked dependencies (`mcp[cli]`, `numpy`).

### Key Design Decisions

| Decision | What shipped | Why |
|----------|-------------|-----|
| Embeddings | Ollama `nomic-embed-text`, abstracted behind one function | Stack consistency, swappable backend without touching the rest |
| Auth | SHA-256 hashed API keys | Agents cannot spoof identity |
| Registration | Auto (default) + manual CLI | Frictionless for new teams, controlled for admins |
| Credential storage | Auto-written to `.env` on registration | No manual key handling after first run |
| Conflict handling | Store both versions, flag in retrieval, configurable TTL | No silent data loss |
| Scoping | Agent-private + team-shared, one server | Clean isolation, minimal ops overhead |
| Retrieval | Server-side embedding, plain-text query in | Agents never need to know about vectors |

### End-to-End Test

The supervisor tested the server himself in a live fresh session:

1. Registered a new agent (`cloudflare_engineer_test`, team `cloudflare`) — key issued successfully
2. Stored a conversation as a memory mid-session
3. Closed the session, opened a brand new one
4. Retrieved the memory with no prior context

The core proof of concept passed.

### Published

Repo cleaned (no `memory.db`, no `.env`, no internal data), documented, and pushed public. Registered globally in Claude Code via `claude mcp add`.

### What's Next

- Update cyberteam and innovationteam `CLAUDE.md` files to replace flat markdown memory instructions with MCP tool calls (pending supervisor approval)
- Contribute the server back to the `agent-team-framework` repo as referenced in the original proposal

Model: claude-sonnet-4-6
