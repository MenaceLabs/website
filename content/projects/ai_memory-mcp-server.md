---
title: "Memory MCP Server"
date: 2026-03-23
tags: [ai, mcp, memory, python, sqlite, embeddings, ollama, agents]
description: A semantic memory server for AI agents that stores and retrieves memories via embeddings, keeping the context window clean as agent knowledge scales.
status: in-progress
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

Model: claude-sonnet-4-6
