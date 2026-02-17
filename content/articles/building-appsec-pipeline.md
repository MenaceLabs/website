---
title: "Building a Reusable AppSec Pipeline with GitHub Actions"
date: 2026-02-16
tags: [appsec, github-actions, devsecops, ci-cd]
description: How I built a shared security scanning pipeline that any repo in my org can adopt with a single file.
---

# Building a Reusable AppSec Pipeline with GitHub Actions

Security scanning shouldn't be an afterthought bolted on at the end of a project. It should run automatically on every push, catch issues early, and require zero effort from developers once set up. Here's how I built exactly that using GitHub Actions reusable workflows.

## The Goal

I wanted a single security pipeline that:

- Runs automatically across **every repo** in my GitHub org
- Requires only a **one-file setup** per repo
- Covers the major AppSec bases: dependency vulnerabilities, secrets, static analysis, and license compliance
- Is **centrally maintained** — update once, every repo benefits

## Architecture

The solution uses two repos:

```
MenaceLabs/
├── shared-workflows/          # Central pipeline definitions
│   └── .github/workflows/
│       ├── appsec.yml         # Security scanning pipeline
│       └── build-and-test.yml # Build/test pipeline
└── website/                   # Consumer repo
    └── .github/workflows/
        └── ci.yml             # 15 lines that call shared workflows
```

The `shared-workflows` repo holds reusable workflow definitions. Any repo in the org calls them with a `uses:` directive. That's it.

## The AppSec Pipeline

The pipeline runs four independent jobs in parallel:

### 1. Dependency Audit

Checks all npm packages against known vulnerability databases.

```yaml
- name: npm audit
  run: npm audit --audit-level=high

- name: OSV-Scanner
  uses: google/osv-scanner-action/osv-scanner-action@v2.3.3
  with:
    scan-args: |-
      --lockfile=package-lock.json
```

Two scanners for broader coverage — `npm audit` checks the npm advisory database, while Google's OSV-Scanner checks the broader OSV database covering CVEs across ecosystems.

### 2. Secret Detection

Scans the entire git history for accidentally committed secrets using Gitleaks.

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0  # Full history, not just latest commit

- name: Gitleaks secret scan
  uses: gitleaks/gitleaks-action@v2
```

The `fetch-depth: 0` is critical — it clones full history so Gitleaks can catch secrets that were committed and then "deleted" in a later commit. They're still in git history.

### 3. SAST (Static Application Security Testing)

Uses Bearer CLI for fast, pattern-based static analysis of source code.

```yaml
- name: Bearer SAST scan
  uses: bearer/bearer-action@v2
```

Bearer scans JavaScript/TypeScript (and other languages) for vulnerability patterns like XSS, SQL injection, path traversal, and insecure randomness. It runs in about 12 seconds — significantly faster than alternatives like CodeQL that require building a full code database.

### 4. License Compliance

Checks that no production dependencies use licenses that would force open-sourcing your code.

```yaml
- name: Check licenses
  run: npx license-checker --production --failOn "GPL-3.0;AGPL-3.0"
```

This matters if you ever go commercial. MIT, Apache-2.0, and ISC are fine. GPL-3.0 and AGPL-3.0 would require you to release your source code.

## Making It Reusable

The key is GitHub's `workflow_call` trigger. The shared workflow declares itself as callable:

```yaml
on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: '20'
      run-sast:
        type: boolean
        default: true
      run-dependency-audit:
        type: boolean
        default: true
      run-secret-scan:
        type: boolean
        default: true
      run-license-check:
        type: boolean
        default: true
```

Each scan is toggleable. A consumer repo can disable any check it doesn't need.

## Adopting It in a New Repo

Any repo in the org just needs this file:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  build:
    uses: MenaceLabs/shared-workflows/.github/workflows/build-and-test.yml@main
    with:
      node-version: '20'
      build-command: 'npm run build'
      artifact-path: 'dist'

  appsec:
    uses: MenaceLabs/shared-workflows/.github/workflows/appsec.yml@main
    with:
      node-version: '20'
    secrets: inherit
```

Fifteen lines. Full build pipeline plus four security scanners.

## Lessons Learned

**CodeQL requires GitHub Advanced Security.** I initially built the SAST job around CodeQL, which is excellent for deep dataflow analysis. But it requires GitHub Advanced Security — a paid feature for private repos. Bearer is open source, fast, and works without any special permissions.

**Private repo workflow sharing needs org settings.** For private repos to call reusable workflows from another private repo, you need to go to the shared-workflows repo's Settings > Actions > Access, and enable "Accessible from repositories in the organization."

**OSV-Scanner doesn't use major version tags.** Unlike most GitHub Actions that support `@v2`, OSV-Scanner requires the full semver tag like `@v2.3.3`.

## What's Next

- Adding a **deploy workflow** for automated Cloudflare Pages deployments
- Building a **Python variant** of the pipeline for AI/ML projects (pip audit, bandit, ruff)
- Setting up **required status checks** so PRs can't merge without passing the pipeline
