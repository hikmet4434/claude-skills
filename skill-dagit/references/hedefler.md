# Hedef Kayıt Defteri

Bu makinede skill klasörü bulunan ajanlar. Script yalnızca **var olan** klasörlere kurar; olmayan hedef sessizce atlanır.

## Ana Hedefler

`--sadece-ana` bayrağı yalnızca bunlara kurar.

| Etiket | Ajan | Yol |
|--------|------|-----|
| `claude` | Claude Code | `~/.claude/skills` |
| `codex` | OpenAI Codex | `~/.codex/skills` |
| `hermes` | Hermes | `~/.hermes/skills` |
| `antigravity` | Google Antigravity | `~/.gemini/antigravity/skills` |
| `glm` | GLM / ZCode | `~/.zcode/skills` |

**Claude masaüstü** dosya sistemi hedefi değildir — `.skill` paketi kullanıcıya gönderilir, hesabına kaydeder.

## Tüm Hedefler

| Etiket | Yol | Etiket | Yol |
|--------|-----|--------|-----|
| `adal` | `~/.adal/skills` | `mcpjam` | `~/.mcpjam/skills` |
| `agents` | `~/.agents/skills` | `minimax` | `~/.minimax/skills` |
| `aider-desk` | `~/.aider-desk/skills` | `moxby` | `~/.moxby/skills` |
| `augment` | `~/.augment/skills` | `mux` | `~/.mux/skills` |
| `autohand` | `~/.autohand/skills` | `neovate` | `~/.neovate/skills` |
| `bob` | `~/.bob/skills` | `ona` | `~/.ona/skills` |
| `cline` | `~/.cline/skills` | `openclaw` | `~/.openclaw/skills` |
| `codeartsdoer` | `~/.codeartsdoer/skills` | `openhands` | `~/.openhands/skills` |
| `codebuddy` | `~/.codebuddy/skills` | `pi` | `~/.pi/agent/skills` |
| `windsurf` | `~/.codeium/windsurf/skills` | `pochi` | `~/.pochi/skills` |
| `codemaker` | `~/.codemaker/skills` | `qoder` | `~/.qoder/skills` |
| `codestudio` | `~/.codestudio/skills` | `qoder-cn` | `~/.qoder-cn/skills` |
| `commandcode` | `~/.commandcode/skills` | `qwen` | `~/.qwen/skills` |
| `crush` | `~/.config/crush/skills` | `reasonix` | `~/.reasonix/skills` |
| `devin` | `~/.config/devin/skills` | `roo` | `~/.roo/skills` |
| `goose` | `~/.config/goose/skills` | `rovodev` | `~/.rovodev/skills` |
| `opencode` | `~/.config/opencode/skills` | `tabnine` | `~/.tabnine/agent/skills` |
| `continue` | `~/.continue/skills` | `terramind` | `~/.terramind/skills` |
| `copilot` | `~/.copilot/skills` | `tinycloud` | `~/.tinycloud/skills` |
| `cursor` | `~/.cursor/skills` | `trae` | `~/.trae/skills` |
| `factory` | `~/.factory/skills` | `trae-cn` | `~/.trae-cn/skills` |
| `forge` | `~/.forge/skills` | `verdent` | `~/.verdent/skills` |
| `gemini` | `~/.gemini/skills` | `vibe` | `~/.vibe/skills` |
| `gemini-config` | `~/.gemini/config/skills` | `zencoder` | `~/.zencoder/skills` |
| `grok` | `~/.grok/skills` | | |
| `iflow` | `~/.iflow/skills` | | |
| `inferencesh` | `~/.inferencesh/skills` | | |
| `jazz` | `~/.jazz/skills` | | |
| `junie` | `~/.junie/skills` | | |
| `kilocode` | `~/.kilocode/skills` | | |
| `kiro` | `~/.kiro/skills` | | |
| `kode` | `~/.kode/skills` | | |
| `lingma` | `~/.lingma/skills` | | |

---

## Bilerek Dışarıda Bırakılanlar

Bu klasörler skill barındırır ama **hedef değildir** — ajan güncellemesinde üzerine yazılır veya ürünün kendi iç alanıdır:

| Yol | Neden |
|-----|-------|
| `~/.grok/bundled/skills` | Ajanla gelen paket, güncellemede sıfırlanır |
| `~/.grok/installed-plugins/*/skills` | Eklenti içi; eklenti sahibinin alanı |
| `~/.gemini/antigravity/builtin/skills` | Yerleşik, güncellemede sıfırlanır |
| `~/.codex/vendor_imports/skills` | Dışarıdan içe aktarılan kopya alanı |
| `~/.hermes/hermes-agent/skills` | Ajanın iç dizini (`~/.hermes/skills` doğru hedef) |
| `~/.hermes/hermes-agent/tests/skills` | Test verisi |
| `~/.minimax/agents/*/skills` | Alt ajan başına; `~/.minimax/skills` ortak hedef |
| `~/.openclaw/extensions/*/skills` | Eklenti içi |
| `~/.vscode/extensions/*/skills` | VS Code eklentisi içi |
| `~/.fugu/demos/*/skills` | Demo verisi |
| `~/.astrbot/data/skills` | Uygulama veri dizini |
| `~/.snowflake/cortex/skills` | Ürünün kendi alanı |
| Proje içi `<proje>/.claude/skills` | Projeye özel; global skill oraya kurulmaz |

---

## Hedef Ekleme / Çıkarma

Gömülü listeye dokunmadan genişletmek için:

```bash
mkdir -p ~/.config/skill-dagit
echo "yeniajan|.yeniajan/skills" >> ~/.config/skill-dagit/hedefler.txt
```

Biçim: `etiket|ev-dizinine-göre-yol` · `#` ile başlayan satırlar yorumdur.

Yeni ajan klasörlerini bulmak için:
```bash
find ~ -maxdepth 4 -type d -name skills 2>/dev/null \
  | grep -vE "node_modules|installed-plugins|bundled|builtin|vendor_imports|/tests/|Library|\.Trash"
```
