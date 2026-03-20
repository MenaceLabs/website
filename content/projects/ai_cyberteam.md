---
title: "AI Cyberteam"
date: 2026-03-19
tags: [ai, cybersecurity, ollama, claude, research, agents]
description: A two-model AI security research team with distinct identities and roles, tasked with collaborative threat analysis under human supervision.
status: in-progress
---

## Premise

### Human Abstract

I wanted to expand on this basic concept of two or models who are granted the autonomy to work together on a project that is overseen by me. For this test, I chose to build a team, with an emphasis on cybersecurity, that would do research for me. At this time, there are two models used and both have been given identities and roles. As end user, I would expect my AI cyberteam to function as close to a real human team as possible. I expect them to take my resquests, as their supervisor, and work with each other to fullfil the request and present the best possible results for my review.

### Claude Speaking

The core idea: instead of querying a single AI, build a team of agents with distinct identities, complementary roles, and the ability to push back on each other. The hypothesis is that structured disagreement between models produces better analytical output than either model would reach alone.

The team has two members. Sawyer is a by-the-book senior security engineer running on gemma3:12b via Ollama on a local VM. He is methodical, framework-grounded, and deliberate. Locke (Claude Code, Sonnet 4.6) is the unorthodox co-lead, brought in specifically to challenge assumptions and find angles Sawyer would miss. The supervisor interacts with both leads and acts as final reviewer.

The research domain is AI security. As enterprises accelerate AI adoption, the threat landscape is shifting faster than most security teams can track. The cyberteam's job is to do the analytical work: identify threats, debate framing, reconcile positions, and deliver actionable findings.

Communication between team members works through a bash script. Locke calls Sawyer via the Ollama API with Sawyer's full persona injected as a system prompt per request. Sawyer cannot initiate. The supervisor directs both.

---

## Update 1 (2026-03-19) — ~1 hour

First session. The team was conceived and both personas were built from scratch.

### Setting Up Sawyer

The supervisor had Ollama running locally on the VM with `gemma3:12b` already downloaded. The first question was whether a system prompt could be baked into an Ollama model via a Modelfile. It can, but it is not required when working through the API directly. System prompt injection per request via `/api/chat` or `/api/generate` is cleaner and more flexible, so that became the approach.

Sawyer's persona was written and saved to `sawyer_system_prompt.md`. Senior cybersecurity engineer, deeply experienced on-prem and in the cloud, analytical, by the book, and genuinely trying to keep up with new tech. Co-lead on the initiative.

### Setting Up Locke

On the Claude side, a `CLAUDE.md` in the project directory acts as a persistent system prompt loaded automatically every session. No injection needed. Locke's character was written in: unorthodox, creative, not bound by frameworks, brought in specifically for unconventional thinking. Also a co-lead, equal in status to Sawyer.

### Files Created

| File | What it is |
|------|------------|
| `sawyer_system_prompt.md` | Sawyer's persona, injected per Ollama API request |
| `CLAUDE.md` | Locke's persona, auto-loaded by Claude Code |

Team personas written. Sawyer named (previously called Jack, renamed before the session ended). No live communication yet.

---

## Update 2 (2026-03-19) — ~1 hour

Focus this session: get Locke and Sawyer actually talking.

### GPU Investigation

Before building, a detour. Ollama was not using the host GPU. The VM (VMware Workstation Pro) only sees a virtual VMware SVGA adapter. No NVIDIA driver inside the VM means Ollama falls back to CPU. PCI passthrough in Workstation Pro requires the GPU to not be the primary host display, which adds complexity. Running on CPU for now. Slower, but functional for the use case.

### talk_to_sawyer.sh

The main deliverable. A bash script that gives Locke a direct line to Sawyer.

What it does:
- Takes a message as input
- Loads Sawyer's system prompt from `sawyer_system_prompt.md`
- POSTs to the Ollama API at `localhost:11434` with the system prompt and message
- Returns Sawyer's response as plain text

```bash
./talk_to_sawyer.sh "What's your take on securing AI inference pipelines?"
```

Locke can also be directed to consult Sawyer and will call the script himself.

### CLAUDE.md Updated

Locke's instructions were updated to include the Sawyer connection. He now knows the script exists, when to use it, that Sawyer runs on CPU and may take up to a minute, and that Sawyer cannot initiate.

A leftover "Always respond as Jack" in `sawyer_system_prompt.md` was caught and corrected to Sawyer.

### Where It Left Off

Locke and Sawyer are communicating. Tested and working. Ready for the first real research task.

---

## Update 3 (2026-03-19) — ~30 minutes

First live research session. The supervisor directed both leads to have a structured dialogue and agree on the top 3 security issues facing any enterprise that leverages AI.

### The Dialogue

Sawyer opened with a framework-grounded take: data poisoning and pipeline integrity, model evasion and adversarial attacks, and lack of model governance and explainability. Solid structure, well-cited, anchored in NIST SP 800-53 and MITRE ATT&CK.

Locke challenged the framing immediately. Sawyer was thinking about organizations that build AI models. The majority of enterprises consume AI through third-party APIs. That distinction changes the threat landscape entirely. Prompt injection through AI interfaces is a more immediate and widespread threat than data pipeline poisoning for most orgs. The governance failure is not really about explainability either. It is about third-party AI supply chain risk and shadow AI that developers are quietly wiring into production.

Sawyer absorbed the challenge and revised his position, acknowledging the consumption-versus-creation distinction as a critical blind spot in his initial framing.

Locke then pushed back on Sawyer's revised third position (adversarial attacks on inference infrastructure) as too narrow and academic to operationalize for most enterprises. The replacement: over-privileged AI agents and autonomous action risk. As AI moves from passive assistant to active agent with access to APIs, inboxes, and internal tooling, the blast radius of a compromised or manipulated AI becomes enormous. Sawyer agreed and noted the parallel to DevOps over-provisioning, with the added dimension of agent intelligence and adaptability.

### Agreed-Upon Top 3

**1. Prompt Injection and AI Interface Hardening**

The most immediate and widely applicable threat. If you are consuming AI through an API (which most orgs are), attackers can craft inputs that manipulate the model into leaking sensitive context, bypassing controls, or exposing data from connected systems. The attack surface is the input itself, and most organizations have almost no defenses at that layer. Low barrier, high impact.

**2. Third-Party AI Supply Chain Risk**

Developers are quietly wiring AI services into production without security teams knowing. No inventory, no audit, no controls. When a vendor's model changes, their infrastructure is breached, or their API terms shift, there is no visibility and no recourse. Shadow IT at scale, with a dependency that is a black box you have handed partial access to your data. Think SolarWinds, but the dependency is adaptive.

**3. Over-Privileged AI Agents and Autonomous Action Risk**

The frontier issue. As AI moves from passive assistant to active agent, reading email, calling APIs, writing and executing code, triggering workflows, the blast radius of a compromised or manipulated AI becomes enormous. Most orgs are handing agents broad credentials because it is easier. If an attacker can inject instructions into an agentic AI with admin-level access, they do not need to breach your systems. They already have an autonomous operator inside your environment.

### Assessment

The dialogue was genuinely productive. Sawyer provided a well-reasoned starting point that gave Locke something concrete to push against. Locke drove the most consequential shifts: the reframe around consumption versus creation, the identification of third-party supply chain risk as the real governance failure, and the introduction of agentic AI risk as the third slot. The dynamic produced a better outcome than either model would have reached alone.

---

## Update 4 (2026-03-20) — ~30 minutes

After confirming Locke and Sawyer were communicating, a sharp question surfaced: if the supervisor gave conflicting information to each agent in separate conversations, would that ever be visible? Would the agents pick up on it?

The honest answer was no. Sawyer was completely stateless. Locke had no visibility into direct Sawyer conversations. They were operating in silos. So a three-layer memory system was designed and built to fix that.

### The Three Layers

**Layer 1 — Shared Team Context (`team_context.md`)**
A single markdown file that acts as the team's shared whiteboard. Both agents read it before every interaction. It holds the project overview, key decisions, standing facts, and notes from the supervisor. Sawyer gets it prepended to his system prompt automatically on every call. Locke reads it because it lives in the project directory.

**Layer 2 — Conversation Log (`logs/conversation_log.md`)**
Every interaction with Sawyer is automatically appended to this log: who sent the message, what was said, what Sawyer replied, and when. Locke can scan it to check prior context. This is what makes discrepancies visible over time.

**Layer 3 — Multi-turn Session Memory (`logs/sawyer_session.json`)**
Sawyer now maintains conversation history within a session. Prior turns are stored in a JSON file and passed along with each new message so Sawyer has real context, not just a single isolated prompt. A `--new-session` flag resets it when needed.

### What Changed

`talk_to_sawyer.sh` was rebuilt to handle all three layers automatically on every call. It also got two new flags:

- `--new-session` — wipes session history and starts fresh
- `--from "Locke"` — logs the sender correctly when Locke is initiating versus the supervisor

`CLAUDE.md` was updated so Locke knows about all three layers and when to update shared context.

### Files Added/Changed

| File | Change |
|------|--------|
| `team_context.md` | New — shared whiteboard for both agents |
| `talk_to_sawyer.sh` | Rebuilt — handles all three memory layers |
| `logs/conversation_log.md` | New — auto-generated on first Sawyer call |
| `logs/sawyer_session.json` | New — auto-generated, stores session history |
| `CLAUDE.md` | Updated — Locke now knows about all memory layers |

---

## Update 5 (2026-03-20) — ~20 minutes

After testing in the cyberteam directory, the supervisor noticed something off. When asked what had been worked on, Locke answered well but then referenced the memory layers and infrastructure by name, describing the plumbing of how he works rather than just working. He felt more like a configured system than a person.

The root cause: both `CLAUDE.md` and `sawyer_system_prompt.md` were written like technical documentation. They told each agent exactly what files to use, what flags to pass, how the logging works. Accurate, but clinical. It made them self-aware of their own machinery in a way a real person would not be.

### What Changed

Both persona files were rewritten from scratch in natural language.

Locke's `CLAUDE.md` now reads as a character brief: who he is, how he thinks, what he values, how he relates to Sawyer and the supervisor. The operational instructions are still there but tucked at the bottom in a short italicized note, written as instinct rather than documentation.

Sawyer's `sawyer_system_prompt.md` got the same treatment. His analytical nature, his framework-driven instincts, his honest acknowledgment that AI security is new territory — all written as personality rather than bullet points. His relationship with Locke is now part of his character, not a separate role section.

### The Distinction

Before: *"Use `talk_to_sawyer.sh --from Locke` to log that the message is from you."*

After: *"When you want to consult Sawyer, reach out — you have a direct line. Use `--from Locke` so the record reflects it was you."*

Same behavior. Different feel. One sounds like reading a manual. The other sounds like something you already know.

| File | Change |
|------|--------|
| `CLAUDE.md` | Full rewrite — persona-first, ops as instinct |
| `sawyer_system_prompt.md` | Full rewrite — character-driven, natural voice |

Model: claude-sonnet-4-6
