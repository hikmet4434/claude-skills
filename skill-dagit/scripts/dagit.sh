#!/usr/bin/env bash
# skill-dagit — bir skill'i makinedeki tüm yapay zeka ajanlarina kurar.
# Kullanim:
#   bash dagit.sh <skill-klasoru | skill.skill>        tum hedeflere kur
#   bash dagit.sh <...> --sadece-ana                   yalnizca 5 ana hedef
#   bash dagit.sh <...> --hedef claude,codex,hermes    secili hedefler
#   bash dagit.sh <...> --kuru                         prova, kurmaz
#   bash dagit.sh --liste                              hedefleri listele
#   bash dagit.sh <skill-adi> --sil                    tum hedeflerden kaldir
#   bash dagit.sh <skill-adi> --dogrula                kurulumu dogrula
set -uo pipefail

HOME_DIR="${HOME}"
EK_LISTE="${HOME_DIR}/.config/skill-dagit/hedefler.txt"

# etiket|goreli-yol
HEDEFLER_GOMULU='
claude|.claude/skills
codex|.codex/skills
hermes|.hermes/skills
antigravity|.gemini/antigravity/skills
glm|.zcode/skills
adal|.adal/skills
agents|.agents/skills
aider-desk|.aider-desk/skills
augment|.augment/skills
autohand|.autohand/skills
bob|.bob/skills
cline|.cline/skills
codeartsdoer|.codeartsdoer/skills
codebuddy|.codebuddy/skills
windsurf|.codeium/windsurf/skills
codemaker|.codemaker/skills
codestudio|.codestudio/skills
commandcode|.commandcode/skills
crush|.config/crush/skills
devin|.config/devin/skills
goose|.config/goose/skills
opencode|.config/opencode/skills
continue|.continue/skills
copilot|.copilot/skills
cursor|.cursor/skills
factory|.factory/skills
forge|.forge/skills
gemini|.gemini/skills
gemini-config|.gemini/config/skills
grok|.grok/skills
iflow|.iflow/skills
inferencesh|.inferencesh/skills
jazz|.jazz/skills
junie|.junie/skills
kilocode|.kilocode/skills
kiro|.kiro/skills
kode|.kode/skills
lingma|.lingma/skills
mcpjam|.mcpjam/skills
minimax|.minimax/skills
moxby|.moxby/skills
mux|.mux/skills
neovate|.neovate/skills
ona|.ona/skills
openclaw|.openclaw/skills
openhands|.openhands/skills
pi|.pi/agent/skills
pochi|.pochi/skills
qoder|.qoder/skills
qoder-cn|.qoder-cn/skills
qwen|.qwen/skills
reasonix|.reasonix/skills
roo|.roo/skills
rovodev|.rovodev/skills
tabnine|.tabnine/agent/skills
terramind|.terramind/skills
tinycloud|.tinycloud/skills
trae|.trae/skills
trae-cn|.trae-cn/skills
verdent|.verdent/skills
vibe|.vibe/skills
zencoder|.zencoder/skills
'
ANA_HEDEFLER="claude codex hermes antigravity glm"

hedef_satirlari() {
  printf '%s\n' "$HEDEFLER_GOMULU" | sed '/^[[:space:]]*$/d'
  [ -f "$EK_LISTE" ] && grep -v '^[[:space:]]*#' "$EK_LISTE" | sed '/^[[:space:]]*$/d'
  return 0
}

KAYNAK=""; MOD="kur"; KURU=0; SADECE_ANA=0; SECILI=""
while [ $# -gt 0 ]; do
  case "$1" in
    --liste)       MOD="liste" ;;
    --kuru)        KURU=1 ;;
    --sil)         MOD="sil" ;;
    --dogrula)     MOD="dogrula" ;;
    --sadece-ana)  SADECE_ANA=1 ;;
    --hedef)       shift; SECILI="$(printf '%s' "${1:-}" | tr ',' ' ')" ;;
    -h|--help)     sed -n '2,12p' "$0"; exit 0 ;;
    *)             [ -z "$KAYNAK" ] && KAYNAK="$1" ;;
  esac
  shift
done

secili_mi() {
  local etiket="$1"
  if [ -n "$SECILI" ]; then
    for s in $SECILI; do [ "$s" = "$etiket" ] && return 0; done
    return 1
  fi
  if [ "$SADECE_ANA" = "1" ]; then
    for s in $ANA_HEDEFLER; do [ "$s" = "$etiket" ] && return 0; done
    return 1
  fi
  return 0
}

# --- liste ---
if [ "$MOD" = "liste" ]; then
  echo "Bulunan hedefler:"; v=0; y=0
  while IFS='|' read -r etiket yol; do
    [ -z "${etiket:-}" ] && continue
    tam="$HOME_DIR/$yol"
    if [ -d "$tam" ]; then printf "  ✓ %-14s %s (%s skill)\n" "$etiket" "$tam" "$(ls -1 "$tam" 2>/dev/null | wc -l | tr -d ' ')"; v=$((v+1))
    else printf "  · %-14s %s (yok)\n" "$etiket" "$tam"; y=$((y+1)); fi
  done <<< "$(hedef_satirlari)"
  echo; echo "Var: $v   Yok: $y"
  exit 0
fi

[ -z "$KAYNAK" ] && { echo "HATA: skill klasoru, .skill dosyasi veya skill adi ver."; exit 1; }

# --- kaynagi coz ---
TMPDIR_D=""
temizle() { [ -n "$TMPDIR_D" ] && rm -rf "$TMPDIR_D"; }
trap temizle EXIT

if [ "$MOD" = "kur" ]; then
  if [ -d "$KAYNAK" ]; then
    SKILL_ADI="$(basename "${KAYNAK%/}")"
    KAYNAK_DIR="$(cd "$(dirname "${KAYNAK%/}")" && pwd)/$SKILL_ADI"
  elif [ -f "$KAYNAK" ]; then
    TMPDIR_D="$(mktemp -d)"
    unzip -o -q "$KAYNAK" -d "$TMPDIR_D" || { echo "HATA: arsiv acilamadi."; exit 1; }
    SKILL_ADI="$(ls -1 "$TMPDIR_D" | head -1)"
    KAYNAK_DIR="$TMPDIR_D/$SKILL_ADI"
  else
    echo "HATA: '$KAYNAK' bulunamadi."; exit 1
  fi

  # dogrulama
  SM="$KAYNAK_DIR/SKILL.md"
  [ -f "$SM" ] || { echo "HATA: SKILL.md yok: $SM"; exit 1; }
  ADI_ICI="$(grep -m1 '^name:' "$SM" | sed 's/^name:[[:space:]]*//' | tr -d '"'"'"' \r')"
  [ -n "$ADI_ICI" ] || { echo "HATA: SKILL.md icinde 'name:' alani yok (Turkce 'isim:' calismaz)."; exit 1; }
  [ "$ADI_ICI" = "$SKILL_ADI" ] || { echo "HATA: name ('$ADI_ICI') klasor adiyla ('$SKILL_ADI') ayni degil."; exit 1; }
  grep -q '^description:' "$SM" || { echo "HATA: 'description:' alani yok."; exit 1; }
  printf '%s' "$SKILL_ADI" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*$' || { echo "HATA: skill adi kucuk harf ve tire olmali: '$SKILL_ADI'"; exit 1; }
  # kirik referans bagi
  EKSIK=0
  while read -r ref; do
    [ -z "$ref" ] && continue
    [ -f "$KAYNAK_DIR/$ref" ] || { echo "UYARI: bagli dosya yok -> $ref"; EKSIK=$((EKSIK+1)); }
  done <<< "$(grep -o '(references/[^)]*\.md)' "$SM" | tr -d '()' | sort -u)"
  echo "Dogrulama tamam: $SKILL_ADI  ($(find "$KAYNAK_DIR" -type f | wc -l | tr -d ' ') dosya, $EKSIK kirik bag)"
else
  SKILL_ADI="$(basename "${KAYNAK%/}")"
fi

# --- uygula ---
OK=0; ATLA=0; HATA=0; KURULU=""
while IFS='|' read -r etiket yol; do
  [ -z "${etiket:-}" ] && continue
  secili_mi "$etiket" || continue
  tam="$HOME_DIR/$yol"
  [ -d "$tam" ] || { ATLA=$((ATLA+1)); continue; }

  case "$MOD" in
    kur)
      # kaynak ile hedef ayni klasorse dokunma (yoksa kaynagi silerdik)
      if [ -d "$tam/$SKILL_ADI" ] && [ "$tam/$SKILL_ADI" -ef "$KAYNAK_DIR" ]; then
        echo "  atlandi (kaynagin kendisi): $tam/$SKILL_ADI"; ATLA=$((ATLA+1)); continue
      fi
      if [ "$KURU" = "1" ]; then echo "  [kuru] $tam/$SKILL_ADI"; OK=$((OK+1)); continue; fi
      # once yanina yaz, sonra yer degistir: yarim kalan kopya birakma
      GECICI="$tam/.$SKILL_ADI.yeni.$$"
      rm -rf "$GECICI" 2>/dev/null
      if cp -R "$KAYNAK_DIR" "$GECICI" 2>/dev/null; then
        rm -rf "$tam/$SKILL_ADI" 2>/dev/null
        if mv "$GECICI" "$tam/$SKILL_ADI" 2>/dev/null; then OK=$((OK+1)); KURULU="$KURULU $etiket"
        else echo "  HATA tasinamadi: $tam"; rm -rf "$GECICI" 2>/dev/null; HATA=$((HATA+1)); fi
      else echo "  HATA yazilamadi: $tam"; rm -rf "$GECICI" 2>/dev/null; HATA=$((HATA+1)); fi
      ;;
    sil)
      if [ -d "$tam/$SKILL_ADI" ]; then
        if [ "$KURU" = "1" ]; then echo "  [kuru] silinecek: $tam/$SKILL_ADI"
        else rm -rf "$tam/$SKILL_ADI" && OK=$((OK+1)); fi
      else ATLA=$((ATLA+1)); fi
      ;;
    dogrula)
      if [ -f "$tam/$SKILL_ADI/SKILL.md" ]; then
        n="$(grep -m1 '^name:' "$tam/$SKILL_ADI/SKILL.md" | sed 's/^name:[[:space:]]*//' | tr -d '"'"'"' \r')"
        if [ "$n" = "$SKILL_ADI" ]; then OK=$((OK+1)); else echo "  BOZUK name: $tam/$SKILL_ADI ('$n')"; HATA=$((HATA+1)); fi
      else echo "  EKSIK: $tam/$SKILL_ADI"; HATA=$((HATA+1)); fi
      ;;
  esac
done <<< "$(hedef_satirlari)"

echo
case "$MOD" in
  kur)     echo "Kuruldu: $OK hedef   Atlanan (klasor yok): $ATLA   Hata: $HATA"
           [ -n "$KURULU" ] && echo "Hedefler:$KURULU" ;;
  sil)     echo "Silindi: $OK hedef   Zaten yoktu: $ATLA" ;;
  dogrula) echo "Saglam: $OK hedef   Sorunlu/eksik: $HATA" ;;
esac
