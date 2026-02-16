---
title: "Dev Log: Building a VS Code Portfolio"
date: 2025-02-15
tags: [react, typescript, css, portfolio]
description: How I built this IDE-themed portfolio site with React, TypeScript, and Vite.
---

# Dev Log: Building a VS Code Portfolio

I wanted my portfolio to reflect how I actually work — so I built it to look and feel like VS Code.

## Design Decisions

### CSS Grid for the IDE Layout

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

### Markdown as CMS

All content lives in markdown files with YAML frontmatter. At build time, Vite's `import.meta.glob` loads them, and `gray-matter` parses the metadata. No server, no CMS, no database.

### Zustand for Tab State

The tab system uses Zustand — a minimal state management library. Open a page, and it gets a tab. Close it, and the neighbor activates. Simple and predictable.

## Takeaways

- CSS Grid is perfect for complex, fixed layouts
- Markdown + static generation keeps things simple
- VS Code's design language is surprisingly adaptable to web
