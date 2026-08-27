#!/usr/bin/env bash
# Claude Code skill senkronu: uzaktan çek (birleştir) → yerel değişiklikleri gönder.
# Kullanım: ~/.claude/skills/sync.sh
set -e
cd "$(dirname "$0")"
BR="$(git symbolic-ref --short HEAD 2>/dev/null || echo master)"
echo "→ çekiliyor (origin/$BR)…"
git pull --no-edit origin "$BR" || true
git add -A
if git diff --cached --quiet; then
  echo "• yerelde yeni skill yok"
else
  git commit -m "skill senkron $(date '+%Y-%m-%d %H:%M')"
fi
echo "→ gönderiliyor…"
git push origin "$BR"
echo "✓ Skill'ler senkron"
