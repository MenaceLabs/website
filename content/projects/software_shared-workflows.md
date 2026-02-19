---
title: "Shared Workflows"
date: 2025-05-15
tags: [github-actions, appsec, sast, ci-cd]
description: A zero-cost application security pipeline that runs autonomously within GitHub.
status: in-progress
repo: https://github.com/MenaceLabs/shared-workflows
---

## Human Abstract

I wanted a zero-cost application security pipeline that can run within my SCM and autonomously assess my code as I continue to rapidly develop.

## Claude Speaking

The project is a set of reusable GitHub Actions workflows designed to be called from any repository in the organization. Rather than duplicating CI and security configuration across every repo, each project references these shared workflows with minimal configuration.

There are two workflows today:

**Build & Test** handles the standard Node.js pipeline: install, build, and optionally run tests. It accepts parameterized inputs for Node version, build command, and test command, so it adapts to each project without modification.

**AppSec Pipeline** runs four security checks in parallel with zero cost:

- **Dependency Audit** using `npm audit` and Google's OSV-Scanner to catch known vulnerabilities in dependencies
- **Secret Detection** using Gitleaks to scan the full git history for leaked credentials
- **SAST Analysis** using Bearer for static application security testing
- **License Compliance** using `license-checker` to flag copyleft licenses that could create legal issues

All four jobs run with `continue-on-error: true`, so they report findings without blocking development. The pipeline is informational by default, giving visibility into security posture without slowing down iteration.

The entire setup is consumed by calling repos with just a few lines of YAML and `secrets: inherit` for any tools that need API keys.

Model: Opus 4.6
