# CLAUDE.md

## Content Naming Conventions

### Articles (`content/articles/`)

Filenames follow the pattern: `prefix_rest-of-title.md` (underscore after prefix, hyphens for the rest).

| Prefix | Use When |
|--------|----------|
| `devlog_` | Documenting the build process of a project |
| `research_` | Deep dives, comparisons, or analysis of tools/techniques |
| `guide_` | How-to or tutorial-style content |
| `proposal_` | Pitching an idea, architecture, or approach |
| `success_` | Documenting a notable success or win |
| `failure_` | Documenting something that didn't work |
| `experiment_` | Testing a hypothesis or trying something new |

Examples: `success_this-website.md`, `guide_appsec-pipeline.md`, `failure_ascii-qui-gon-jinn.md`

### Projects (`content/projects/`)

Filenames follow the same pattern: `prefix_rest-of-title.md`.

| Prefix | Use When |
|--------|----------|
| `ai_` | AI/ML-powered tools or agents |
| `software_` | Traditional software projects |
| `research_` | Research-oriented projects |

## Frontmatter Template

Every content file must include this YAML frontmatter:

```yaml
---
title: "Human-readable title"
date: YYYY-MM-DD
tags: [tag1, tag2]
description: One-line summary of the content.
---
```

### Project-Specific Frontmatter

Project files require additional fields:

```yaml
---
title: "Human-readable title"
date: YYYY-MM-DD
tags: [tag1, tag2]
description: One-line summary of the content.
status: premise | in-progress | complete
repo: https://github.com/user/repo  # optional, for complete/in-progress projects
---
```

- `status` is required for all projects. Values: `premise`, `in-progress`, `complete`.
- `repo` is optional. Include when the project has a public repository.

## Project Narrative Structure

Projects follow a narrative arc from idea to shipped product:

1. **Premise** (always present): The opening section of the project page. Describes the idea, motivation, and planned approach.
2. **Progress updates** (added over time): Use `## Update: YYYY-MM-DD` sections to document milestones, decisions, and progress.
3. **Outcome** (added at completion): Use a `## Result` section to document the final state, lessons learned, and link to the repo.

When a project's status changes, update the `status` field in frontmatter. Add the `repo` field when the repository goes public.

## Content Structure Rules

### AI Transparency

- AI-written sections use a `## Claude Speaking` header (or the appropriate model name, e.g. `## Gemini Speaking`).
- Human-written sections use a `## Human Abstract` header. These sections are always 100% human-written, without AI assistance or formatting.
- All AI-assisted pages end with `Model: <model name>` on the last line (e.g. `Model: Opus 4.6`).

### Style

- No em dashes anywhere. Use commas, periods, or parentheses instead.
- Slugs are derived from filenames, so the filename is the URL path.

## Build

- `npm run dev` -- local dev server
- `npm run build` -- production build
- Content is loaded via `import.meta.glob` at build time; slugs come from filenames.
