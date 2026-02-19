---
title: "Cloudflare Hardening"
date: 2026-02-19
tags: [cloudflare, security, networking, infrastructure]
description: Auditing and hardening the Cloudflare deployment for this website.
status: in-progress
---

## Premise

### Human Abstract

I would like Claude to be a senior cloud network engineer and analyze our deployment in Cloudflare and provide recommendations for security, efficiency, and whatever else the expert thinks is best.

### Claude Speaking

The site is deployed to Cloudflare Pages as a static site. The current setup is functional but has not been reviewed for production readiness. The goal is to systematically assess the deployment across several dimensions:

- **Security posture**: Headers, TLS configuration, access policies, token hygiene, and exposure surface
- **Performance**: Caching behavior, asset delivery, compression, and edge configuration
- **Operational hygiene**: DNS settings, redirect rules, deployment pipeline, and monitoring

The approach is to query the Cloudflare API to inventory the current state, identify gaps against best practices, then implement changes one by one with documented rationale. Each change will be recorded as an update to this project page.

This is not a theoretical exercise. The audit runs against live infrastructure and changes will be applied to the production deployment.

---

## Update 1 (2026-02-19) — ~10 minutes

Queried the Cloudflare API to inventory the current deployment state. The site runs on Cloudflare Pages (free tier) with ad-hoc CLI deploys. No custom domain is configured, so the only entry point is the default `pages.dev` subdomain.

### Security Findings

| Finding | Current State | Severity |
|---------|--------------|----------|
| No `_headers` file | Security headers not set (no CSP, no X-Frame-Options, no Permissions-Policy) | High |
| No custom domain | Cannot configure zone-level security (HSTS, WAF, firewall rules, SSL mode) without one | High |
| API token over-scoped | Deploy token has zone edit, WAF edit, DNS edit, and SSL read permissions | Medium |
| Always Use HTTPS | Off | Medium |
| HSTS | Disabled | Medium |
| SSL mode | "Full" instead of "Full (Strict)", origin cert not validated | Medium |
| WAF | Disabled | Medium |

### Performance Findings

| Finding | Current State | Impact |
|---------|--------------|--------|
| Early Hints | Off | Medium |
| No asset cache headers | `max-age=0, must-revalidate` on fingerprinted assets that could be cached forever | Medium |
| Edge minification | Off (not critical since Vite minifies at build) | Low |
| Web Analytics | Not enabled | Low |

### What's Working

- HTTP/2 and HTTP/3 both enabled
- Brotli compression on
- Minimum TLS version set to 1.2
- SPA redirect rule (`/* /index.html 200`) correctly configured

### Remediation Plan

1. Add a `_headers` file with security headers and asset caching (no custom domain required)
2. Enable Early Hints at the account level
3. Add a custom domain to unlock zone-level controls
4. Once a zone exists: enable HSTS, Always Use HTTPS, SSL Strict, and WAF
5. Create a scoped API token for deploys only
6. Connect GitHub for automated deploys

---

## Update 2 (2026-02-19) — ~5 minutes

Applied the first round of hardening changes. All changes verified against the live deployment.

### Security Headers (`_headers` file)

Added `public/_headers` to the site with the following headers applied to all routes:

- `Content-Security-Policy`: restricts scripts, styles, images, and fonts to same-origin
- `X-Frame-Options: DENY`: prevents clickjacking
- `X-Content-Type-Options: nosniff`: prevents MIME-type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`: limits referrer leakage
- `Permissions-Policy`: disables camera, microphone, and geolocation APIs

### Asset Caching

Fingerprinted assets under `/assets/*` now serve with `Cache-Control: public, max-age=31536000, immutable`, allowing browsers to cache them for one year without revalidation.

### Zone-Level Changes

| Setting | Before | After |
|---------|--------|-------|
| SSL mode | Full | Full (Strict) |
| Always Use HTTPS | Off | On |
| HSTS | Disabled | Enabled (1 year, include subdomains, preload) |
| Early Hints | Off | On |

### Still Outstanding

- WAF managed rulesets need to be toggled on via the Cloudflare dashboard (API token lacks permission)
- No custom domain configured yet
- API token still over-scoped
- No automated deploy pipeline (still using ad-hoc CLI pushes)

---

## Update 3 (2026-02-19) — ~10 minutes

Tackled the two remaining actionable items: WAF managed rulesets and automated deploys.

### WAF Managed Rulesets

The API token lacks permission to manage rulesets. The free managed ruleset and DDoS L7 protection are already present on the zone but need to be toggled on via the Cloudflare dashboard at **Security > WAF > Managed Rules**. This is a manual step.

### Automated Deploy Pipeline

Added a `deploy` job to the CI workflow (`.github/workflows/ci.yml`). The pipeline now runs on every push to `main`:

1. **Build** - installs, builds, uploads `dist` as artifact
2. **AppSec** - runs all four security checks in parallel
3. **Deploy** - downloads the build artifact and deploys to Cloudflare Pages via `wrangler-action`

The deploy job uses two repository secrets (`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`) set via the GitHub CLI. CI also now triggers on push to main (previously `workflow_dispatch` only).

First automated deploy completed successfully in 34 seconds.

### Updated Outstanding Items

- WAF managed rulesets (manual dashboard toggle)
- Custom domain not configured
- API token still over-scoped (separate deploy-only token recommended)

Model: Opus 4.6
