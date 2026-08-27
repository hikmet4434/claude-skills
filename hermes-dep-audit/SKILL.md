---
name: hermes-dep-audit
description: Run a dependency vulnerability audit for a project (npm/pip and friends) and produce a prioritized, plain-English report of issues and fixes. Use when the user asks to check dependencies for vulnerabilities, run a security/dep audit, or review CVEs. Read-only scan; never auto-upgrades.
---

# Dependency Security Audit

Scan a project's dependencies for known vulnerabilities and report clearly. The
audit is **read-only** — it runs the ecosystem's own audit tools and summarizes.
It never modifies lockfiles, installs, or upgrades without explicit approval.

## Steps

1. **Detect the ecosystem(s)** present in the project root:
   - `package.json` → npm: `npm audit --json`
   - `requirements.txt` / `pyproject.toml` → `pip-audit` (or `pip-audit -r requirements.txt`)
   - `yarn.lock` → `yarn npm audit` / `pnpm audit` as appropriate
   - `Cargo.toml` → `cargo audit`; `go.mod` → `govulncheck ./...`
2. **Run the audit** with the helper, or directly. Capture JSON where possible.
   ```
   bash ~/.claude/skills/hermes-dep-audit/audit.sh <project-dir>
   ```
3. **Parse and prioritize** by severity (Critical → High → Moderate → Low). For
   each, capture: package, installed version, fixed-in version, advisory link.
4. **Report:**

   ```
   # Dependency Audit — <project> — <date>

   **Summary:** 2 critical, 5 high, 11 moderate.

   ## 🔴 Critical / High (fix first)
   - **lodash 4.17.15 → 4.17.21** — prototype pollution. [advisory]
     Fix: bump in package.json, re-test.

   ## 🟡 Moderate / Low
   - ...

   ## Recommended actions
   Ordered list of safe upgrades vs. ones needing a major bump / manual review.
   ```

## Rules
- **Never** run `npm audit fix`, `npm update`, `pip install -U`, or edit
  lockfiles automatically. Recommend; let the user approve and run, or do it only
  on explicit instruction.
- If an audit tool isn't installed, report that and give the one-line install
  command — don't silently skip the ecosystem.
- Distinguish transitive vs. direct deps; note when a fix needs an upstream bump.
