---
title: "This Website"
date: 2025-06-01
tags: [react, typescript, vite, claude]
description: An IDE-themed portfolio site for sharing AI development work, built with Claude CLI.
status: in-progress
repo: https://github.com/QuiGonGitt/this-website
---

## Human Abstract

I needed a website to publicly share my development and testing with AI. I had the idea that I wanted this site to resemble an IDE. It's a novel theme that should evoke familiarity for anyone who interacts with it. Plus it's fun. So I used Claude CLI with the Opus model and got started.

## Claude Speaking

The premise is simple: a personal site that looks and feels like a code editor. Tabs for navigation, a file explorer as a sidebar, syntax-highlighted content areas, and a terminal-inspired aesthetic throughout. The goal is to make the browsing experience feel like opening a project in VS Code.

Beyond the theme, the site serves a practical purpose. It's a place to document AI-assisted development work openly, including the process itself. Every article and project page here is a record of how human direction and AI tooling come together (or sometimes don't).

The stack is intentionally minimal. React with TypeScript for the UI, Vite for builds, and Markdown files parsed at build time for content. No CMS, no database, no framework overhead. Content goes in a folder, frontmatter defines the metadata, and the site rebuilds.

The entire codebase was built using Claude CLI with the Opus model as a pair programming partner, making the site itself an example of the workflow it documents.

Model: Opus 4.6
