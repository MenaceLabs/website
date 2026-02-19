---
title: "This Website"
date: 2025-02-01
tags: [react, typescript, vite, claude]
description: An IDE-themed portfolio site for sharing AI development work, built with Claude CLI.
status: in-progress
repo: https://github.com/MenaceLabs/website
---

## Premise

### Human Abstract

I needed a website to publicly share my development and testing with AI. I had the idea that I wanted this site to resemble an IDE. It's a novel theme that should evoke familiarity for anyone who interacts with it. Plus it's fun. So I used Claude CLI with the Opus model and got started.

### Claude Speaking

The premise is simple: a personal site that looks and feels like a code editor. Tabs for navigation, a file explorer as a sidebar, syntax-highlighted content areas, and a terminal-inspired aesthetic throughout. The goal is to make the browsing experience feel like opening a project in VS Code.

Beyond the theme, the site serves a practical purpose. It's a place to document AI-assisted development work openly, including the process itself. Every article and project page here is a record of how human direction and AI tooling come together (or sometimes don't).

The stack is intentionally minimal. React with TypeScript for the UI, Vite for builds, and Markdown files parsed at build time for content. No CMS, no database, no framework overhead. Content goes in a folder, frontmatter defines the metadata, and the site rebuilds.

The entire codebase was built using Claude CLI with the Opus model as a pair programming partner, making the site itself an example of the workflow it documents.

---

## Update 1 (2025-02-15)

The site went from idea to working prototype. The core IDE layout landed, content pipeline was wired up, and the tab system came together. By the end of this round, the site looked and navigated like a code editor.

### Design Decisions

#### CSS Grid for the IDE Layout

The entire layout is a single CSS Grid:

```css
.layout {
  display: grid;
  grid-template-columns: 48px 240px 1fr;
  grid-template-rows: 35px 1fr auto 24px;
  grid-template-areas:
    "activity sidebar tabbar"
    "activity sidebar editor"
    "activity sidebar terminal"
    "status   status  status";
  height: 100vh;
}
```

This maps directly to VS Code's layout structure: activity bar, sidebar, editor, terminal, and status bar.

#### Markdown as CMS

All content lives in markdown files with YAML frontmatter. At build time, Vite's `import.meta.glob` loads them, and `gray-matter` parses the metadata. No server, no CMS, no database.

#### Zustand for Tab State

The tab system uses Zustand, a minimal state management library. Open a page, and it gets a tab. Close it, and the neighbor activates. Simple and predictable.

### Takeaways

- CSS Grid is perfect for complex, fixed layouts
- Markdown + static generation keeps things simple
- VS Code's design language is surprisingly adaptable to web

---

## Update 2 (2026-02-19) — ~45 minutes (estimate)

Major content and structural pass on the site. The projects section got a full rework, content conventions were formalized, and the repo went public.

### Project Narrative System

Projects now follow a premise-to-completion arc tracked by a `status` frontmatter field (`premise`, `in-progress`, `complete`). The projects page groups entries by status with section headings, and each project card displays a color-coded badge:

- **Premise** (yellow) for ideas taking shape
- **In Progress** (blue) for active work
- **Complete** (green) for shipped projects

Project detail pages now show a meta line with date, status, tags, and an optional GitHub repo link.

### Content Structure

Established a standard layout for project pages: a `## Premise` section at the top (containing `### Human Abstract` and `### Claude Speaking`), followed by sequentially numbered `## Update N` sections separated by horizontal rules. Each update includes an approximate duration.

Updated `CLAUDE.md` to document these conventions, including a strict rule that Human Abstract sections contain only the user's exact words.

### Repository Cleanup

Removed placeholder repos (`ai-shepherd-toolkit`, `llm-eval-harness`) from the GitHub Repositories section. The site repo was renamed from `ide-portfolio` to `website` and linked to its actual location at `MenaceLabs/website`. The repo was made public.

### First Project Pages

Created three project pages:
- **This Website** (this page) with the original dev log folded in as Update 1
- **Shared Workflows** documenting the reusable CI/AppSec pipeline
- **Cloudflare Hardening** tracking the infrastructure audit and remediation

---

## Update 3 (2026-02-19) — ~20 minutes

Added a dedicated mobile reader view. Instead of forcing the IDE layout onto small screens, the site now serves a minimal reading experience on viewports 768px and below. Desktop is completely unchanged.

### Mobile Reader View

The `IDELayout` component now uses a reactive `useIsMobile` hook (backed by `matchMedia`) and early-returns a different layout on mobile. All IDE chrome is gone: no activity bar, sidebar, tab bar, terminal, or status bar. What renders instead:

- **MobileHeader**: a 48px bar with the `~/portfolio` site name (links home) and a hamburger toggle
- **MobileNav**: a fullscreen overlay with the same five nav items as the desktop activity bar, including active-page highlighting with a left border accent
- **MobileBanner**: a dismissible "visit on desktop for the full experience" notice, persisted via localStorage so it only appears once
- **Content area**: full-width, scrollable, with the same typography and dark theme as desktop

### What Changed

Seven new files (hook, three components, three CSS modules) and two modified files (`IDELayout.tsx` and its CSS module). The old mobile media queries that tried to restructure the CSS Grid were replaced entirely, since the mobile path now renders different components altogether.

### Takeaways

- Serving a completely different layout is cleaner than bending a complex grid into a mobile shape
- `matchMedia` with a `change` listener is more efficient than polling `window.innerWidth` on resize
- Keeping the same nav items and active-page logic between desktop and mobile ensures consistent behavior

Model: Opus 4.6
