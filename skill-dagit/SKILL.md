---
name: skill-dagit
description: "Yeni bir skill üretir ve makinedeki tüm yapay zekâ ajanlarına birden kurar (Claude Code, Codex, Hermes, Antigravity, GLM/ZCode, Cursor, Gemini, Grok, Qwen, Copilot, Roo, Trae, Kode, OpenCode, Goose, Devin ve 45+ diğeri) ve Claude masaüstü için .skill paketi teslim eder. Kullanıcı şunlardan bahsettiğinde kullan: skill oluştur, skill yap, beceri oluştur, skill ekle, bu metni skill haline getir, skill kur, skill dağıt, tüm ajanlara kur, codex'e ekle, hermes'e ekle, antigravity'ye ekle, GLM'ye ekle, claude code'a ekle, skill güncelle, skill'i her yere kur, skill paketle, .skill dosyası, SKILL.md yaz. Skill'in içeriğini tasarlamak ve test etmek için skill-creator skilline bak; bu skill onun çıktısını doğrular, paketler ve dağıtır."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---

# Skill Üret ve Dağıt

Bu makinede 60'tan fazla yapay zekâ ajanının kendi skill klasörü var. Bir skill tek yere kurulduğunda diğer 59 ajanda yok sayılır. Bu skill iki işi birden yapar: **doğru biçimde skill üretmek** ve **hepsine birden kurmak**.

---

## Akış

```
1. İÇERİĞİ HAZIRLA      SKILL.md + references/ (+ scripts/)
2. DOĞRULA              frontmatter, isim, bağlantılar
3. PAKETLE              .skill (zip)
4. DAĞIT                scripts/dagit.sh → tüm ajanlar
5. TESLİM ET            .skill dosyasını kullanıcıya gönder (Claude masaüstü için)
6. DOĞRULA              kurulumu örnekleme ile kontrol et
```

---

## 1. İçeriği Hazırla

### Klasör yapısı
```
skill-adi/
├── SKILL.md              zorunlu
├── references/           opsiyonel — derinlemesine bilgi
│   └── *.md
└── scripts/              opsiyonel — çalıştırılabilir yardımcılar
    └── *.sh, *.py
```

### Frontmatter — en sık yapılan hata burada

```yaml
---
name: skill-adi
description: "Ne yaptığı + ne zaman tetiklendiği. Tetikleyici kelimeleri açıkça yaz."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---
```

**Kritik kurallar:**

| Kural | Neden |
|-------|-------|
| Anahtarlar **İngilizce**: `name`, `description` | `isim:` / `Açıklama:` yazılırsa hiçbir sistem skill'i tanımaz |
| `name` = klasör adı, birebir aynı | Eşleşmezse yüklenmez |
| `name` sadece küçük harf, rakam ve tire | Türkçe karakter ve boşluk kullanma (`satış` değil `satis`) |
| `description` hem **ne yaptığını** hem **ne zaman tetiklendiğini** anlatmalı | Tetikleme buradan yapılır; içerik ne kadar iyi olursa olsun açıklama zayıfsa skill hiç çalışmaz |
| Tetikleyici kelimeleri **Türkçe + İngilizce** yaz | Kullanıcı hangi dilde yazarsa yazsın yakalansın |
| İçerik Türkçe olabilir, frontmatter anahtarları asla | Ayrım net: anahtar İngilizce, değer istediğin dilde |

**Açıklama kalıbı:**
```
"[Ne ürettiği]. Kullanıcı şunlardan bahsettiğinde kullan: [tetikleyici 1],
[tetikleyici 2], ... Ayrıca [durum] olduğunda da tetiklenir.
[İlgili konu] için [diğer skill] skilline bak."
```

### Gövde
- Doğrudan talimat yaz — "yapmalısın" değil "yap"
- Tablolar ve kısa maddeler; uzun paragraflardan kaçın
- Detayı `references/` dosyalarına taşı, SKILL.md'yi 400 satırın altında tut
- Referans dosyalarına **göreli bağlantı** ver — markdown bağlantı biçiminde, dosya adı gerçek olacak şekilde
- SKILL.md'de bağlantı verdiğin her dosya **gerçekten var olmalı** — olmayan dosyaya bağlantı, skill'in en sık görülen kusurudur

Ayrıntılı yazım kuralları ve kalite kontrol listesi: [references/skill-yazim.md](references/skill-yazim.md)

---

## 2. Doğrula

Paketlemeden önce:

- [ ] `name` alanı klasör adıyla aynı, küçük harf-tire biçiminde
- [ ] Frontmatter anahtarları İngilizce
- [ ] `description` tetikleyici kelimeleri içeriyor (TR + EN)
- [ ] SKILL.md'deki her `references/...` bağlantısının dosyası var
- [ ] `scripts/` içindekiler çalıştırılabilir (`chmod +x`)
- [ ] Kişisel veri, API anahtarı, token yok

Anthropic'in paketleyicisi varsa doğrulamayı o yapar:
```bash
python3 -m scripts.package_skill <skill-klasoru> <cikti-klasoru>
```
Yoksa `scripts/dagit.sh` kendi temel doğrulamasını çalıştırır.

---

## 3. Paketle

```bash
cd <skill-klasorunun-ust-dizini>
zip -r skill-adi.skill skill-adi -x '*.DS_Store'
```
Arşivin kökünde **skill klasörü** olmalı (`skill-adi/SKILL.md`), dosyalar doğrudan kökte değil.

---

## 4. Dağıt

```bash
bash scripts/dagit.sh <skill-klasoru-veya-.skill-dosyasi>
```

**Seçenekler:**

| Seçenek | İş |
|---------|-----|
| `--liste` | Makinede bulunan hedefleri listeler, hiçbir şey kurmaz |
| `--kuru` | Ne yapacağını yazar, kurmaz (prova) |
| `--hedef a,b,c` | Sadece belirtilen hedeflere kurar (`claude,codex,hermes,antigravity,glm`) |
| `--sadece-ana` | Yalnızca 5 ana hedefe kurar: Claude Code, Codex, Hermes, Antigravity, GLM |
| `--sil` | Skill'i tüm hedeflerden kaldırır |

Script yalnızca **var olan** klasörlere kurar; olmayan ajan sessizce atlanır. Sonunda hangi hedefe kurulduğunun özetini yazar.

Hedef kayıt defteri ve her ajanın yolu: [references/hedefler.md](references/hedefler.md)

**Yeni ajan eklemek:** `~/.config/skill-dagit/hedefler.txt` dosyasına bir satır ekle (`etiket|yol`). Script bu dosya varsa gömülü listeye ekler.

---

## 5. Claude Masaüstü

Masaüstü uygulaması dosya sistemindeki klasörleri okumaz — skill'i hesaba kaydetmek gerekir. Üretilen `.skill` dosyasını `SendUserFile` ile kullanıcıya gönder; kartta **"Save skill"** düğmesi çıkarsa tıklaması yeterli.

Kaydedilip kaydedilmediğine dair geri bildirim gelmez — kullanıcıya "teslim edildi" de, "kaydedildi" deme.

---

## 6. Kurulumu Doğrula

```bash
bash scripts/dagit.sh <skill-adi> --dogrula
```
Her hedefte `SKILL.md`'nin varlığını ve `name` alanını kontrol eder, eksikleri listeler.

---

## Erişim Notları (bu makine)

| Yol | Erişim |
|-----|--------|
| `~/.codex/skills`, `~/.hermes/skills` | Cowork klasör köprüsüyle bağlanabilir (`device_request_folder_access`) |
| `~/.claude/skills` | **Köprü izin vermiyor** (korumalı konum) — Desktop Commander MCP ile yaz |
| Diğer 55+ ajan klasörü | Desktop Commander MCP ile yaz |

Cowork oturumundan çalışırken pratik yol: `.skill` paketini bağlı bir klasöre yaz (`device_commit_files`), sonra Desktop Commander üzerinden `dagit.sh`'i çalıştır.

---

## Skill Güncelleme

Var olan bir skill'i güncellerken:

- **İsmi koru.** Klasör adı ve `name` alanı değişmemeli — `-v2` ekleme.
- `metadata.version` alanını yükselt.
- `dagit.sh` üzerine yazar (`unzip -o`); eski dosyalar kalmasın diye önce `--sil` sonra kur.
- Referans dosyası çıkardıysan SKILL.md'deki bağlantısını da kaldır.

---

## İlgili Skiller

- **skill-creator** — skill içeriğini tasarlama, test etme, değerlendirme
- **mcp-builder** — MCP sunucusu yazma
- **cowork-plugin** — Cowork eklentisi olarak paketleme
