---
title: "This Website"
date: 2025-02-01
tags: [react, typescript, vite, claude]
description: An IDE-themed portfolio site for sharing AI development work, built with Claude CLI.
status: in-progress
repo: https://github.com/MenaceLabs/website
---

## Human Abstract

I needed a website to publicly share my development and testing with AI. I had the idea that I wanted this site to resemble an IDE. It's a novel theme that should evoke familiarity for anyone who interacts with it. Plus it's fun. So I used Claude CLI with the Opus model and got started.

## Claude Speaking

The premise is simple: a personal site that looks and feels like a code editor. Tabs for navigation, a file explorer as a sidebar, syntax-highlighted content areas, and a terminal-inspired aesthetic throughout. The goal is to make the browsing experience feel like opening a project in VS Code.

Beyond the theme, the site serves a practical purpose. It's a place to document AI-assisted development work openly, including the process itself. Every article and project page here is a record of how human direction and AI tooling come together (or sometimes don't).

The stack is intentionally minimal. React with TypeScript for the UI, Vite for builds, and Markdown files parsed at build time for content. No CMS, no database, no framework overhead. Content goes in a folder, frontmatter defines the metadata, and the site rebuilds.

The entire codebase was built using Claude CLI with the Opus model as a pair programming partner, making the site itself an example of the workflow it documents.

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

Model: Opus 4.6
