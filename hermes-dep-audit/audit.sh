#!/usr/bin/env bash
# Read-only dependency audit. Runs each ecosystem's own audit tool.
# Does NOT install, upgrade, or modify any lockfile. Usage: audit.sh [project-dir]
set -uo pipefail
DIR="${1:-.}"
cd "$DIR" || { echo "no such dir: $DIR"; exit 1; }
echo "# Dependency audit for: $(pwd)"
echo

run() { echo "## \$ $*"; "$@" 2>&1; echo; }

if [ -f package.json ]; then
  if [ -f pnpm-lock.yaml ] && command -v pnpm >/dev/null; then run pnpm audit
  elif [ -f yarn.lock ] && command -v yarn >/dev/null; then run yarn npm audit
  elif command -v npm >/dev/null; then run npm audit --json
  else echo "npm/yarn/pnpm not found"; fi
fi
if [ -f requirements.txt ] || [ -f pyproject.toml ]; then
  if command -v pip-audit >/dev/null; then
    [ -f requirements.txt ] && run pip-audit -r requirements.txt || run pip-audit
  else echo "pip-audit not installed → pip install pip-audit"; fi
fi
if [ -f Cargo.toml ]; then
  command -v cargo-audit >/dev/null && run cargo audit || echo "cargo-audit not installed → cargo install cargo-audit"
fi
if [ -f go.mod ]; then
  command -v govulncheck >/dev/null && run govulncheck ./... || echo "govulncheck not installed → go install golang.org/x/vuln/cmd/govulncheck@latest"
fi
echo "# Done (read-only — nothing was modified)."
