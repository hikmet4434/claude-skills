---
name: hermes-docs-drift
description: Detect documentation drift — code that changed recently without corresponding doc updates. Use when the user wants to find stale docs, check whether README/docs match the code, or audit doc coverage after changes. Read-only analysis.
---

# Docs Drift Detection

Find places where code changed but documentation didn't follow. Read-only: it
analyzes and reports; it does not edit docs unless the user explicitly asks
afterward.

## Steps

1. **Pick the window.** Default: changes since the last 7 days or the last tag.
   In a git repo, use `git log --since=...` / `git diff <ref>..HEAD --stat`.
2. **Map code → docs.** Identify which changed files have associated docs:
   - Public APIs / exported functions → API docs, README usage sections
   - CLI flags / config keys → README, config docs
   - New features / modules → docs site, CHANGELOG
3. **Detect drift.** For each meaningful code change, check whether the relevant
   doc was touched in the same window. Flag:
   - New/renamed public symbols absent from docs
   - Changed signatures or flags with stale doc examples
   - Removed features still documented
   - Missing CHANGELOG entries
4. **Report:**

   ```
   # Docs Drift Report — <window>

   | Code change | Doc that should update | Status |
   |---|---|---|
   | added flag `--foo` (cli.ts) | README "Usage" | ❌ not updated |

   ## Suggested doc edits
   - <file>: add/adjust ...
   ```

## Rules
- Read-only by default. Only edit docs if the user says "fix them" after seeing the report.
- Ground every drift claim in a specific code change + the doc that omits it.
- Don't flag internal/private code that has no doc obligation.
