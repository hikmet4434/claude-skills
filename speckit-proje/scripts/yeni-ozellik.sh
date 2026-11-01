#!/usr/bin/env bash
# Kullanım: yeni-ozellik.sh "<kisa-ad>" [proje-koku]
# specs/ altında sıradaki numarayla özellik klasörü açar, şablonları kopyalar,
# anayasa yoksa portföy anayasasını .specify/memory/constitution.md olarak yerleştirir.
# Çıktı: tek satır JSON {"FEATURE_DIR": "...", "FEATURE_NUM": "...", "CONSTITUTION_CREATED": true|false}
set -euo pipefail

AD_HAM="${1:-}"
KOK="${2:-$PWD}"
if [ -z "$AD_HAM" ]; then
  echo '{"error":"kisa ad gerekli: yeni-ozellik.sh <kisa-ad> [proje-koku]"}' >&2
  exit 1
fi

BETIK_DIZINI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIZINI="$(dirname "$BETIK_DIZINI")"
SABLONLAR="$SKILL_DIZINI/references/sablonlar.md"
ANAYASA="$SKILL_DIZINI/references/portfoy-anayasasi.md"

# Kısa adı güvenli slug'a çevir (Türkçe karakterleri sadeleştir)
AD=$(printf '%s' "$AD_HAM" \
  | sed -e 's/ç/c/g; s/Ç/c/g; s/ğ/g/g; s/Ğ/g/g; s/ı/i/g; s/İ/i/g' \
        -e 's/ö/o/g; s/Ö/o/g; s/ş/s/g; s/Ş/s/g; s/ü/u/g; s/Ü/u/g' \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' \
  | cut -c1-40)
[ -n "$AD" ] || AD="ozellik"

mkdir -p "$KOK/specs"
SON=$(find "$KOK/specs" -maxdepth 1 -mindepth 1 -type d -name '[0-9][0-9][0-9]-*' 2>/dev/null \
  | sed -E 's#.*/([0-9]{3})-.*#\1#' | sort -n | tail -1)
SON=${SON:-0}
NUM=$(printf '%03d' $((10#$SON + 1)))
DIZIN="$KOK/specs/$NUM-$AD"
mkdir -p "$DIZIN/contracts" "$DIZIN/checklists"

# Şablon bloklarını ayıkla
awk -v hedef="$DIZIN" '
  /<!-- SABLON:/ {
    ad=$0; sub(/.*<!-- SABLON:/, "", ad); sub(/ -->.*/, "", ad);
    dosya=hedef "/" ad; yaz=1; next
  }
  /<!-- \/SABLON -->/ { if (yaz) close(dosya); yaz=0; next }
  yaz { print > dosya }
' "$SABLONLAR"

OLUSTU=false
if [ ! -f "$KOK/.specify/memory/constitution.md" ]; then
  mkdir -p "$KOK/.specify/memory"
  cp "$ANAYASA" "$KOK/.specify/memory/constitution.md"
  OLUSTU=true
fi

TARIH=$(date +%F)
for f in "$DIZIN"/*.md "$DIZIN"/checklists/*.md; do
  [ -f "$f" ] && sed -i.bak -e "s|\[YYYY-AA-GG\]|$TARIH|g" -e "s|\[###-kisa-ad\]|$NUM-$AD|g" "$f" && rm -f "$f.bak"
done

printf '{"FEATURE_DIR":"%s","FEATURE_NUM":"%s","CONSTITUTION_CREATED":%s}\n' "$DIZIN" "$NUM" "$OLUSTU"
