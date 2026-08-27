---
name: hermes-repo-scout
description: Monitor competitor or upstream GitHub repos for notable recent activity — merged PRs, releases, new features — and summarize what changed and why it matters. Use when the user wants to track what a repo or org is shipping. Read-only via gh/GitHub API.
---

# Competitive Repository Scout

Report notable recent activity in one or more GitHub repos. Strictly read-only:
it inspects public/authorized repos and summarizes. It never pushes, comments,
forks, or opens issues.

## Steps

1. **Get targets.** A list of `owner/repo` (or a GitHub org). Ask if not given.
2. **Default window:** last 7 days (override if the user says otherwise).
3. **Gather** with the `gh` CLI (read-only subcommands only):
   - Merged PRs: `gh pr list --repo <r> --state merged --search "merged:>=<date>" --json number,title,url,mergedAt,author`
   - Releases: `gh release list --repo <r> --limit 10`
   - Notable commits if no PRs: `gh api repos/<r>/commits?since=<iso>`
4. **Triage.** Keep only meaningful changes — new features, API changes, perf
   work, notable fixes. Drop chores, version bumps, typo fixes.
5. **Summarize:**

   ```
   # Repo Scout — <date range>

   ## owner/repo
   - **<PR title>** (#123) — what it does / why it matters. [link]
   - 🏷️ Release **vX.Y** — highlights.

   ## What this signals
   2–3 lines on the direction these changes suggest.
   ```

## Rules
- Only read-only `gh`/`gh api` calls. Never `gh pr create`, `gh pr merge`,
  `gh issue create`, push, or any write.
- Attribute every item to its PR/commit/release URL.
- If `gh` isn't authenticated, say so and stop — don't work around it.
