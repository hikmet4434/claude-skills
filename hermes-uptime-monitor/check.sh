#!/usr/bin/env bash
# Read-only uptime probe. GET each URL, print status + latency. No writes.
# Usage: check.sh <url> [url...]
set -uo pipefail
[ "$#" -eq 0 ] && { echo "usage: check.sh <url> [url...]"; exit 1; }
TIMEOUT="${UPTIME_TIMEOUT:-10}"
printf "%-45s %-7s %-10s %s\n" "URL" "STATUS" "LATENCY" "HEALTH"
for url in "$@"; do
  out=$(curl -sS -o /dev/null -m "$TIMEOUT" -w "%{http_code} %{time_total}" "$url" 2>/dev/null) || out="000 0"
  code="${out%% *}"; t="${out##* }"
  ms=$(awk "BEGIN{printf \"%dms\", $t*1000}")
  if [ "$code" -ge 200 ] 2>/dev/null && [ "$code" -lt 400 ]; then health="OK"; else health="DOWN"; fi
  printf "%-45s %-7s %-10s %s\n" "$url" "$code" "$ms" "$health"
done
