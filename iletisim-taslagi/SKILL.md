---
name: iletisim-taslagi
description: "Potansiyel müşteriyi araştırır ve kişiselleştirilmiş iletişim taslağı hazırlar (e-posta, LinkedIn, takip dizisi ve gerektiğinde HTML e-posta). Kullanıcı şunlardan bahsettiğinde kullan: iletişim taslağı, outreach, soğuk e-posta, cold email, cold outreach, potansiyel müşteriye yaz, X kişisine e-posta yaz, LinkedIn mesajı, bağlantı isteği, takip e-postası, follow-up, veda e-postası, break-up, yeniden etkileşim, etkinlik sonrası takip, kişiselleştirilmiş e-posta, HTML e-posta, e-posta şablonu, toplu e-posta, mail listesi. Araştırma önce yapılır: web araması varsayılan, zenginleştirme ve CRM bağlıysa eklenir; toplu liste için sektor-ara skilli kullanılır. Satış materyali ve itiraz belgeleri için satis-destekleme, satış hattı matematiği için predictable-revenue skilline bak."
license: MIT
metadata:
  version: "2.0.0"
  language: tr
---

# İletişim Taslağı (Draft Outreach)

**Önce araştır, sonra yaz.** Bu skill asla genel geçer mesaj üretmez. Araştırmadan yazılan e-posta, kişiselleştirilmiş görünse bile alıcı tarafından ilk cümlede anlaşılır.

Web aramasıyla tek başına çalışır; zenginleştirme, CRM ve e-posta araçları bağlıysa çok daha güçlü olur.

## Bağlayıcılar (opsiyonel)

| Bağlayıcı | Ne katar |
|-----------|----------|
| **Web araması** | Varsayılan. Haber, içerik, işe alım ilanı, tetikleyici olay |
| **Apollo / zenginleştirme** | Doğrulanmış e-posta, telefon, unvan, şirket verisi |
| **CRM (HubSpot vb.)** | Önceki ilişki, mevcut kişiler, geçmiş yazışma |
| **Gmail / e-posta** | Taslağı doğrudan gelen kutusunda oluşturma |
| **sektor-ara** | Sektör + şehir için toplu hedef hesap listesi (Excel) |

> Hiçbiri bağlı değilse web araştırması yeterli sonuç verir. Metni sohbette veririm, kopyalarsın.

**Önce MCP kontrolü:** İş başlamadan hangi bağlayıcıların açık olduğunu kontrol et ve varsa otomatik kullan. Zenginleştirme aracı varsa e-postayı tahmin etme, doğrulat.

---

## Akış

```
1. ARAŞTIR (her zaman ilk)
   web araması → + zenginleştirme → + CRM geçmişi
   toplu iş ise: sektor-ara ile liste çıkar

2. KANCA SEÇ
   tetikleyici olay > ortak bağlantı > kendi içeriği
   > şirket girişimi > rol bazlı acı

3. TASLAK YAZ
   kişiselleştirilmiş açılış → tek değer önerisi
   → tek kanıt → tek düşük sürtünmeli CTA

4. TESLİM ET
   e-posta bağlıysa taslak oluştur · her zaman metni ver
   · LinkedIn alternatifi · takip dizisi
```

---

## Adım 1 — İsteği Çöz

| Girdi kalıbı | Anlamı |
|--------------|--------|
| "Acme'deki Ali Yılmaz'a taslak yaz" | Kişi + şirket |
| "Acme'nin CTO'suna soğuk e-posta" | Rol + şirket → önce kişiyi bul |
| "ayse@acme.com'a ulaş" | E-posta verilmiş |
| "[LinkedIn URL] için mesaj" | Profil verilmiş |
| "İzmir'deki diş kliniklerine e-posta" | **Toplu iş** → sektor-ara akışına geç |

---

## Adım 2 — Araştırma (atlanamaz)

Taslak yazmadan önce mutlaka bul:

- **Kim** — unvan, sorumluluk alanı, geçmişi
- **Şirket ne yapıyor** — ürün, büyüklük, pazar
- **Ne değişti** — son haber, yatırım, işe alım, lansman, düzenleme
- **Kanca** — mesajı kişisel yapacak somut tek şey

**Bulamazsan:** Kanca yoksa e-postayı gönderme, rol bazlı bir açı seç ve bunu kullanıcıya söyle. Sahte kişiselleştirme, hiç kişiselleştirmemekten kötüdür.

Kanca kaynakları, tetikleyici olay listesi ve araştırma kontrol listesi: [references/research-hooks.md](references/research-hooks.md)

---

## Adım 3 — Kanca Önceliği

| # | Kanca | Neden bu sırada |
|---|-------|-----------------|
| 1 | **Tetikleyici olay** (yatırım, işe alım, lansman, yeni yönetici) | Zamanlaması mükemmel, aciliyet hazır |
| 2 | **Ortak bağlantı** | Sosyal kanıt, en yüksek yanıt |
| 3 | **Kendi içeriği** (yazı, konuşma, podcast) | Gerçekten araştırdığını kanıtlar |
| 4 | **Şirket girişimi** | Önceliğiyle ilgili ama kişisel değil |
| 5 | **Rol bazlı acı** | En zayıf; sadece diğerleri yoksa |

---

## Adım 4 — Mesaj Yapısı

### E-posta (AIDA)

```
KONU: [<50 karakter, kişisel, spam kelimesi yok]

[DİKKAT: kişiselleştirilmiş açılış — araştırma yaptığın burada belli olur]

[İLGİ: onların sorunu/fırsatı, 1–2 cümle]

[İSTEK: tek kısa kanıt — benzer şirkette çıkan sonuç]

[EYLEM: tek, net, düşük sürtünmeli CTA]

[İmza]
```

### LinkedIn bağlantı isteği (<300 karakter)

```
Merhaba [İsim], [ortak bağlantı / ortak ilgi / somut iltifat].
Bağlantı kurmak isterim.
```
**Bağlantı isteğinde satış yapma.** Tek amaç kabul edilmek.

### LinkedIn takip (bağlantı kabul edildikten sonra)

```
Bağlantı için teşekkürler! [Değer: içgörü, gözlem, kaynak]

[Neden yazdığına yumuşak geçiş]

[Soru — sunum değil]
```

---

## Yazım Kuralları

1. **Kısa ama dolu.** Konuya hemen gir. 60–120 kelime.
2. **Markdown kullanma.** Yıldız, kalın, başlık yok. Hiçbir e-posta istemcisinde düzgün görünmez, üstelik şablon kokar. Düz metin yaz.
3. **Kısa paragraf.** Paragraf başına 2–3 cümle. Boşluk en güçlü aracın.
4. **Sade liste.** Madde gerekiyorsa düz tire kullan.
5. **Tek istek.** İki CTA, sıfır CTA demektir.
6. **Uydurma.** Bilmediğin bir sonucu, tanımadığın bir referansı yazma.

**İyi:**
```
Paylaşabileceklerim:
- Benzer bir şirketten vaka çalışması
- Bu hafta 15 dakikalık kısa görüşme
- Faydalıysa kısa bir tanıştırma
```

**Kötü:**
```
**Size Neler Sunabilirim:**
- Benzer bir şirketten **Vaka Çalışması**
- Bu hafta **Tanışma görüşmesi**
```

---

## Yapma Listesi

**Klişe açılışlar:** "Umarım iyisinizdir" · "Sizinle iletişime geçiyorum çünkü…" · "Kendimi tanıtmak istedim"
**Özellik dökümü:** Ürün hakkında uzun paragraf · aynı anda üç değer önerisi · CTA'sız e-posta
**Sahte kişiselleştirme:** "[Şirket]'te çalıştığınızı gördüm" (bariz) · "Terfiniz için tebrikler" (bağlamsız)
**Biçim hataları:** Markdown · ek dosya · üç link · imza görseli · takip pikseli (soğuk e-postada)

**Yerine:** Öğrendiğin somut bir şeyle başla · tek net değer · tek net istek · düz metin.

---

## Kanal Seçimi

```
Doğrulanmış e-posta varsa       → E-posta (yanıt oranı daha yüksek) + LinkedIn yedeği
E-posta yoksa                   → LinkedIn bağlantı isteği + kabul sonrası mesaj
Sıcak tanıştırma mümkünse       → Önce ortak bağlantıdan tanıştırma iste (en yüksek dönüşüm)
Toplu liste (10+ hedef)         → sektor-ara → segmentli şablon → aşamalı gönderim
```

---

## Toplu İş: sektor-ara Entegrasyonu

Kullanıcı tek kişi değil bir **segment** hedefliyorsa ("İzmir'deki diş kliniklerine ulaşalım"), akış değişir:

```
1. sektor-ara skillini çalıştır → sektör + şehir için firma listesi (Excel)
   Çıktı sütunları: firma adı, telefon, adres, web sitesi, puan, ilçe
2. Listeyi ICP'ye göre ele: portal/ilan kayıtlarını at, kapsam dışını çıkar
3. Segmentlere böl (büyüklük, ilçe, alt kategori) — her segmente ayrı açı
4. Her satır için kişiselleştirme alanı üret (web sitesinden 1 somut detay)
5. Aşamalı gönder: günde 30, alan adı başına; hepsini aynı gün gönderme
6. Yanıtları ve ret nedenlerini listeye geri işle
```

Tam akış, kişiselleştirme alanı üretimi ve teslim edilebilirlik kuralları: [references/toplu-liste.md](references/toplu-liste.md)

---

## HTML E-posta Hazırlığı

**Önce dürüst kural: soğuk e-postayı HTML yapma.** HTML soğuk e-posta, teslim edilebilirliği düşürür, "toplu gönderim" sinyali verir ve yanıt oranını kırar. İlk temas her zaman düz metindir.

**HTML nerede doğru:**

| Kullanım | Neden HTML |
|----------|------------|
| Görüşme sonrası özet | Yapı ve okunabilirlik değer katar |
| Teklif / fiyat sunumu | Tablo gerekiyor |
| Etkinlik daveti | Görsel ve tarih bloğu |
| Ürün duyurusu / bülten | Zaten izinli liste |
| Şampiyona iç sunum materyali | İçeride iletilecek, biçim önemli |

**Teknik zorunluluklar (hepsi):** tablo tabanlı yerleşim (flex/grid e-postada çalışmaz) · satır içi CSS · maksimum 600 px genişlik · web fontu yok, sistem font yığını · görseller `alt` metinli ve engellenirse bozulmayan tasarım · tek sütun (mobil %60+) · karanlık tema uyumu · düz metin alternatifi (multipart) **her zaman** · CAN-SPAM/KVKK için abonelikten çıkma bağlantısı.

Hazır şablon, satır içi CSS örnekleri ve test kontrol listesi: [references/html-email.md](references/html-email.md)

---

## Çıktı Formatı

```markdown
# İletişim Taslağı: [Kişi] @ [Şirket]
**Tarih:** [x] · **Araştırma kaynakları:** [Web / Zenginleştirme / CRM]

## Araştırma Özeti
**Hedef:** [İsim], [Unvan], [Şirket]
**Kanca:** [neden şimdi — kişiselleştirmenin dayanağı]
**Amaç:** [bu temastan ne bekliyorsun]

## E-posta Taslağı
**Kime:** [e-posta veya "bulunması gerekiyor"]
**Konu:** [kişiselleştirilmiş konu]

[Düz metin gövde]

**Konu alternatifleri:** 1) [...]  2) [...]

## LinkedIn (e-posta yoksa)
**Bağlantı isteği (<300 karakter):** [...]
**Kabul sonrası mesaj:** [...]

## Neden Bu Yaklaşım
| Öğe | Dayanağı |
|-----|----------|
| Açılış | [araştırma bulgusu] |
| Değer | [onların önceliği] |
| Kanıt | [ilgili müşteri sonucu] |
| CTA | [neden düşük sürtünmeli] |

## Takip Dizisi
**Gün 3:** [kısa, yeni açı]
**Gün 7:** [farklı değer]
**Gün 14:** [veda]
**Gün 30:** [yeniden etkileşim]

## Durum
[Taslak gelen kutusunda oluşturuldu] / [Metni kopyala] / [E-posta bulunamadı → LinkedIn]
```

---

## Şirket Yapılandırması [DOLDUR]

Kullanıcı bunları bir kez verdiğinde memory'ye kaydet, her seferinde sorma.

```
Adım:            [___]
Unvanım:         [___]
Şirketim:        [___]
Değer önerisi:   [tek cümle]
İmza:            [___]

Kanıt noktaları:
- [Müşteri 1]: [sonuç]
- [Müşteri 2]: [sonuç]

CTA seçenekleri:
- Varsayılan: "15 dakikalık kısa bir görüşme mantıklı olur mu?"
- Yumuşak:    "Kısaca anlatmamı ister misiniz?"
- Spesifik:   "2 dakikalık bir demo videosu göndereyim mi?"

Ton: [Profesyonel / Samimi / Doğrudan]
Sektör jargonu kullanılsın mı: [Evet/Hayır]
```

---

## Senaryo Şablonları

Soğuk temas · sıcak temas · yeniden etkileşim · etkinlik sonrası · yönlendirme sonrası · veda ve dirilme e-postaları — hepsi hazır metinle: [references/email-templates.md](references/email-templates.md)

---

## İlgili Skiller

- **sektor-ara** — sektör + şehir için hedef hesap listesi
- **satis-destekleme** — sunum, itiraz kütüphanesi, demo senaryoları
- **predictable-revenue** — outbound satış hattı matematiği, referans e-postası yöntemi
- **brand-guidelines** — marka sesi tutarlılığı
