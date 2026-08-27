---
name: hermes-uptime-monitor
description: Check whether one or more URLs/endpoints are up and healthy — status code, latency, optional body keyword — and report only what's wrong. Use when the user wants an uptime check, health check, or to verify a site/API is responding. Read-only HTTP GETs.
---

# Uptime Monitor

Probe URLs and report health. Safe and read-only: it issues plain HTTP `GET`/`HEAD`
requests to user-supplied URLs and reports results. It performs no writes, no
auth-bearing requests unless the user supplies a token, and follows the
"notify only on problems" pattern when asked to run quietly.

## Steps

1. **Collect targets** — a list of URLs. Optionally an expected status (default
   200–399 = healthy) and an expected keyword in the body.
2. **Probe** each with the helper or `curl` directly:
   ```
   bash ~/.claude/skills/hermes-uptime-monitor/check.sh https://a.com https://b.com/health
   ```
   Capture: HTTP status, total latency, and whether it connected at all.
3. **Evaluate.** A target is **DOWN** if: connection failed/timed out, status ≥ 400,
   or expected keyword missing.
4. **Report.** Two modes:
   - **Full** (default in chat): a small table of every target with ✅/❌, status, latency.
   - **Silent** (if the user wants quiet monitoring): output `[ALL OK]` when
     everything is healthy and a detailed alert only when something is down.

   ```
   # Uptime Check — <time>
   | URL | Status | Latency | Health |
   |---|---|---|---|
   | https://a.com | 200 | 142ms | ✅ |
   | https://b.com/health | 503 | 88ms | ❌ DOWN |

   ## ⚠️ Down: https://b.com/health (503) — investigate.
   ```

## Rules
- Only GET/HEAD to URLs the user provided. No POST/PUT/DELETE.
- Reasonable timeout (default 10s) so a hung host doesn't stall the check.
- Don't send alerts to any external channel unless the user explicitly asks and
  names the destination.
- To run this on a schedule, suggest the `/schedule` skill rather than building a daemon.
