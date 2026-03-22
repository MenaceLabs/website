---
title: "Agent Team Framework"
date: 2026-03-21
tags: [ai, framework, ollama, claude, python, open-source, agents]
description: A reusable template for standing up two-agent AI teams with shared memory, a communication layer, and configurable personas.
status: complete
repo: https://github.com/MenaceLabs/agent-team-framework
---

## Premise

### Human Abstract

The cyberteam project seemed to work as intended with tremendous room to grow. Before we got too far into the weeds I wanted extract the guts of what we accomplished and templatize it for future use.

### Claude Speaking

The cyberteam was built for a specific purpose with specific people. But the architecture underneath it — two agents with distinct identities, a shared memory system, and a structured communication layer — had nothing inherently cybersecurity-specific about it. The same bones could support a dev team, a research team, a legal team, anything.

The framework extracts exactly that: the structure without the specifics. One config file to wire up a new team. Persona templates to fill in. A communication script with zero external dependencies. The memory system already in place. Stand up a new two-agent team in minutes rather than sessions.

The goal was to make the next team easier than the first one, and the one after that easier still.

---

## Update 1 (2026-03-21) — ~30 minutes

Extracted the cyberteam architecture into a clean, team-agnostic template and published it as a public repo.

### What Was Built

**`team.config`** — the only file that needs editing to wire up a new team. Team name, agent names, Ollama model, API URL. Everything else reads from here. No hardcoded values anywhere else in the stack.

**`CLAUDE.md`** — Agent 1 persona template with placeholders. Character, dynamic, role. Fill in the specifics, keep the structure.

**`agent_system_prompt.md`** — Agent 2 persona template. Same approach. Injected per Ollama API request with the shared team context prepended automatically.

**`team_context.md`** — Shared memory template. Mission, current focus, key decisions, standing facts. Both agents read this before every interaction.

**`talk_to_agent.py`** — The communication script, rewritten in Python from the original bash. Reads entirely from `team.config`. Handles all three memory layers automatically. Zero external dependencies — standard library only.

**`logs/`** and **`updates/`** — same directory structure as the cyberteam, ready to go.

### Prerequisites

- Python 3.6+
- Ollama installed and running with your chosen model pulled
- Claude Code CLI with an Anthropic API key
- Sufficient RAM for your model (~10GB for gemma3:12b)
- GPU optional — CPU works, just slower

### What Stayed Local

The cyberteam itself was not pushed. Personas, conversation logs, session history, and updates remain local. The framework is the skeleton only — no operational data from any specific team.

### Published

The framework was initialized, committed, and pushed to the MenaceLabs org as a public repository. Anyone can clone it, fill in the config and persona files, and have a working two-agent team running against their own Ollama instance.

Model: claude-sonnet-4-6
