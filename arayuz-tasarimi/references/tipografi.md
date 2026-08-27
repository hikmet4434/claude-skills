# Tipografi

## Eşleştirme Mantığı

İyi eşleştirme **kontrast** ve **ortak bir şey** ister aynı anda:
- **Kontrast:** iskelet farklı olsun (serif ↔ sans, geniş ↔ dar, yüksek kontrast ↔ düşük)
- **Ortaklık:** x-yüksekliği veya dönem/karakter uyumlu olsun

İki nötr sans yan yana koymak eşleştirme değil, kararsızlıktır.

---

## Karakterli Başlık Yazı Tipleri (Google Fonts)

Artifact ve web sayfalarında Google Fonts kullanılabiliyor. Aşağıdakiler Inter/Space Grotesk varsayılanının dışında ve karakter taşıyor:

| Aile | Karakteri | Nereye yakışır |
|------|-----------|----------------|
| **Fraunces** | Değişken optik boyut, tuhaf serifler | Editoryal, zanaat, gastronomi |
| **Instrument Serif** | İnce, yüksek kontrast, zarif | Lüks, moda, kültür |
| **Bricolage Grotesque** | Sıkışık, kasıtlı düzensiz | Yaratıcı stüdyo, kültür |
| **Newsreader** | Ciddi, okunur, gazete kökenli | Uzun metin, haber, araştırma |
| **Bitter** | Ağır slab serif | Endüstri, üretim, mühendislik |
| **Sora** | Geometrik, hafif teknik | Teknoloji, altyapı |
| **Unbounded** | Geniş, iddialı | Etkinlik, lansman, spor |
| **Playfair Display** | Yüksek kontrast didone | Klasik, ama **çok kullanıldı** — dikkat |
| **DM Serif Display** | Kalın, kısa, net | Başlık ağırlıklı sayfalar |
| **Syne** | Değişken genişlik, çağdaş | Sanat, tasarım, deneysel |
| **Archivo** | Değişken genişlik, endüstriyel | Veri, panel, teknik |
| **Lora** | Yumuşak serif, sıcak | Sağlık, eğitim, hikâye |

---

## Gövde Yazı Tipleri

| Aile | Not |
|------|-----|
| **Public Sans** | Nötr ama Inter'den karakterli, TR karakterleri tam |
| **Source Sans 3** | Uzun metinde çok okunur |
| **IBM Plex Sans** | Hafif teknik ton, mono/serif kardeşleri var |
| **Figtree** | Yumuşak, dostane |
| **Manrope** | Modern, hafif geometrik |
| **Karla** | Biraz tuhaf, karakterli |
| **Newsreader** | Gövdede serif isteniyorsa güçlü |

## Yardımcı / Veri

| Aile | Not |
|------|-----|
| **IBM Plex Mono** | En dengeli mono; etiket, rakam, kod |
| **JetBrains Mono** | Kod ağırlıklı arayüz |
| **Space Mono** | Karakterli, etiket için, uzun metin için değil |

**Türkçe uyarısı:** Yazı tipini seçmeden önce `ğ ı İ ş ç ö ü Ğ İ Ş Ç Ö Ü` karakterlerini kontrol et. Bazı görüntü yazı tiplerinde eksik veya bozuk — özellikle noktasız `ı` ve noktalı `İ`. Eksikse tarayıcı sessizce yedek yazı tipine düşer ve tasarım bozulur.

---

## Örnek Eşleştirmeler

| Başlık | Gövde | Yardımcı | Ton |
|--------|-------|----------|-----|
| Fraunces 600 | Public Sans 400 | IBM Plex Mono | Zanaat, editoryal |
| Bitter 600 | Source Sans 3 | IBM Plex Mono | Endüstri, üretim |
| Instrument Serif | Figtree | — | Lüks, sade |
| Bricolage Grotesque | Karla | Space Mono | Yaratıcı, çağdaş |
| Archivo 700 (dar) | IBM Plex Sans | IBM Plex Mono | Veri, panel |
| Newsreader 600 | Newsreader 400 | Archivo | Ciddi, metin ağırlıklı |
| Sora 600 | Manrope | JetBrains Mono | Teknik altyapı |
| Unbounded 700 | Public Sans | — | Etkinlik, lansman |

---

## Tip Ölçeği

Bir ölçek seç ve **ondan sapma**. Ara değer icat etmek tutarlılığı bozar.

**Sakin (doküman, panel):**
```
12 · 14 · 16 · 20 · 24 · 32
```

**Dengeli (çoğu sayfa):**
```
13 · 15 · 18 · 24 · 34 · 48
```

**İddialı (editoryal, lansman):**
```
14 · 16 · 20 · 28 · 44 · 72
```

**Uygulama:**
- `clamp()` ile duyarlı ölçekle: `clamp(30px, 5vw, 46px)`
- Akan metin `~65ch` genişlikte
- Satır yüksekliği: başlıkta `1.1–1.2`, gövdede `1.5–1.65`
- Başlıklara `text-wrap: balance`

---

## Karakter Kazandıran Ayrıntılar

Yazı tipini değiştirmeden kişilik ekleyen küçük kararlar:

| Teknik | Nerede |
|--------|--------|
| Büyük harf + `letter-spacing: .12em` | Üst etiket (eyebrow), küçük etiket |
| Negatif harf aralığı (`-.02em`) | Büyük başlıklarda sıkılık |
| Değişken genişlik ekseni | Archivo, Syne — başlıkta dar, gövdede normal |
| `font-variant-numeric: tabular-nums` | Rakamların hizalandığı her yer |
| Optik boyut ekseni (`opsz`) | Fraunces, Newsreader — büyük başlıkta ince, gövdede kalın |
| Tek bir ağırlık atlaması | 400 → 700 arası 500/600 kullanmamak keskinlik verir |
| Ligatür ve stil setleri | `font-feature-settings` ile alternatif harf biçimleri |

---

## Yedek Yığını

Her yazı tipine gerçek bir yedek ver. Google Fonts yüklenmezse sayfa yine de düzgün dursun:

```css
--baslik: "Fraunces", "Iowan Old Style", Georgia, serif;
--govde:  "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--mono:   "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

**Yükleme:** `<link>` ile `display=swap`. Google Fonts dışındaki bir yazı tipi `@font-face` ile data URI olarak gömülmezse sessizce düşer.

---

## Sık Yapılan Hatalar

| Hata | Sonuç |
|------|-------|
| İki nötr sans eşleştirmek | Kontrast yok, karakter yok |
| 5+ yazı tipi | Dağınık, yavaş |
| Ölçek dışı ara boyutlar | Hiyerarşi bulanır |
| TR karakter kontrolü yapmamak | `ı` ve `İ` bozulur, sessizce yedeğe düşer |
| Yedek yığını vermemek | Yüklenmezse sayfa çöker |
| 90+ karakter satır uzunluğu | Okunmaz |
| Başlıkta `text-wrap` yok | Tek kelimelik son satırlar |
| Sadece 400 ve 700 kullanmak | Ara hiyerarşi kurulamaz |
