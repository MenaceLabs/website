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

Model: claude-sonnet-4-6
