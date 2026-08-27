---
name: icerik-taslagi
description: "Pazarlama metnini kanalın gerçekten ihtiyaç duyduğu formatta taslak olarak yazar: blog yazısı, sosyal medya gönderisi, e-posta bülteni, açılış sayfası, basın bülteni, vaka çalışması. Kullanıcı şunlardan bahsettiğinde kullan: içerik taslağı, blog yazısı yaz, blog post, makale yaz, sosyal medya gönderisi, LinkedIn paylaşımı, Instagram gönderisi, tweet, X paylaşımı, e-posta bülteni, newsletter, konu başlığı, subject line, açılış sayfası metni, landing page copy, başlık önerisi, headline, basın bülteni, press release, vaka çalışması, case study, müşteri hikâyesi, pazarlama metni, metin yazarlığı, copywriting, kampanya metni, ürün duyurusu, SEO metni, CTA yaz, harekete geçirici mesaj. Ayrıca aynı mesajı farklı kanala uyarlarken de tetiklenir. Soğuk e-posta ve potansiyel müşteriye ulaşma için iletisim-taslagi, satış materyalleri için satis-destekleme, ölçekli SEO sayfaları için programatik-seo skilline bak."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---

# İçerik Taslağı

Pazarlama metnini **kanalın gerçekten ihtiyaç duyduğu formatta** üret. Aynı metni altı yere yapıştırmak değil; her kanalın kendi kuralına göre yeniden kurmak.

---

## Başlamadan Önce

**Önce mevcut bağlamı oku** — bunlardan biri varsa soru sormadan önce oku ve orada cevabı olanı tekrar sorma:
`.agents/product-marketing.md` · `.claude/product-marketing.md` · `product-marketing-context.md` · `CLAUDE.md` · `brand-guidelines` skilli

**Marka sesi:**
- `brand-guidelines` skilli veya kayıtlı bir marka sesi profili varsa **otomatik uygula** ve kullanıcıya uyguladığını söyle.
- Kullanıcının kendi ağzından çıkacak bir metinse (kişisel LinkedIn gönderisi, kurucu e-postası) `my-writing-style` profili varsa onu kullan; yoksa taslağı ver ve tek satırla stilini öğrenmeyi öner.
- Hiçbiri yoksa: "Marka sesi kılavuzun var mı? Yoksa nötr-profesyonel bir ton kullanacağım."

## Toplanacak Bilgi

Verilmemişse sor — **hepsini değil, formatın gerektirdiğini**:

1. **Format** — blog · sosyal medya (platform belirt) · e-posta · açılış sayfası · basın bülteni · vaka çalışması
2. **Konu** — neyi anlatıyoruz
3. **Hedef kitle** — rol, sektör, kıdem, acı noktası
4. **Ana mesajlar** — 2–4 madde, akılda kalması gereken
5. **Ton** — otoriter · sohbet havasında · ilham verici · teknik · esprili (marka sesi varsa gerekmez)
6. **Uzunluk** — kelime sayısı veya biçim sınırı

Kullanıcı bilmiyorsa **uydurma**: makul bir varsayım yap, açıkça yaz ve devam et.

---

## Değişmez Kurallar

**Sayı ve alıntı uydurma.** Metinde geçen her istatistik, müşteri sonucu ve alıntı ya kullanıcıdan gelir ya da `[DOLDUR: ...]` işaretiyle boş bırakılır. Uydurulmuş bir ölçüt, ilk kontrol edildiğinde markanın güvenilirliğini bitirir — ve basın bülteninde hukuki risk yaratır.

**Gerçek kişinin ağzından alıntı yazma.** Alıntı yer tutucusu koy, kimin söyleyeceğini ve neyi kapsaması gerektiğini yaz. Onaysız alıntı yayınlanmaz.

**Özellik değil sonuç.** "Yapay zekâ destekli analitik" değil → "raporlama süresini %80 kısaltın". Sonucu bilmiyorsan özelliği yazma, kullanıcıya sor.

**Tek fikir, tek metin.** Bir gönderide üç mesaj varsa hiçbiri akılda kalmaz.

**Kanal formatını taklit etme, uygula.** LinkedIn gönderisini blog gibi yazmak, e-postayı açılış sayfası gibi yazmak en sık görülen hata.

---

## Formatlar

### Blog Yazısı

**Yapı:** Başlık (2–3 seçenek) → kancalı giriş → 3–5 alt başlıklı bölüm → sonuç + CTA

- **Kanca tipleri:** soru · çarpıcı istatistik · iddialı cümle · kısa hikâye · yaygın bir yanlışı çürütme
- Her bölümde destekleyici nokta, örnek veya veri
- **SEO:** birincil anahtar kelime öner · başlıkta ve ilk paragrafta geçir · ilgili kelimeleri alt başlıklarda kullan · meta açıklama (160 karakter altı) · iç ve dış bağlantı fırsatları · görsel alt metni önerisi

Ayrıntılı yapı, kanca örnekleri ve SEO yerleşimi: [references/blog.md](references/blog.md)

### Sosyal Medya

Platforma göre değişen tek şey uzunluk değil, **metnin kuruluşu**.

| Platform | Uzunluk | Kuruluş |
|----------|---------|---------|
| LinkedIn | 1.300 karakter (ilk 2 satır "daha fazla göster" öncesi kritik) | Profesyonel çerçeve, kısa paragraflar, tek boşluk satırları |
| X / Twitter | 280 karakter (veya thread) | Sıkı, vurucu, tek fikir |
| Instagram | 2.200 karakter (ilk 125 karakter görünür) | Görsel öncelikli dil, hikâye anlatımı, hashtag bloğu sonda |
| Facebook | Kısa (40–80 kelime en iyi performans) | Sohbet havası, soru ile bitir |

**Her platformda:** ilk satır kanca · 3–5 ilgili hashtag · net etkileşim isteği · markaya ve platforma uygun emoji (LinkedIn'de az, Instagram'da serbest)

Platform bazlı kalıplar ve hashtag stratejisi: [references/sosyal-medya.md](references/sosyal-medya.md)

### E-posta Bülteni

**Yapı:** Konu başlığı (2–3 seçenek + neden bu) → önizleme metni → selamlama → hiyerarşili gövde → CTA buton metni → kapanış → abonelikten çıkma notu

- **Konu başlığı:** 50 karakter altı · merak veya somut fayda · spam kelimesi yok · her seçenek için farklı bir açı (fayda / merak / aciliyet)
- **Önizleme metni:** konuyu tekrar etme, cümleyi tamamla. Boş bırakılırsa istemci gövdenin ilk satırını çeker.
- **CTA:** tek birincil eylem. İki buton, sıfır tıklama demektir.

HTML e-posta gerekiyorsa `iletisim-taslagi` skillindeki `references/html-email.md` çalışan bir şablon ve teslim edilebilirlik kuralları içerir.

Konu başlığı kalıpları ve gövde yapısı: [references/eposta.md](references/eposta.md)

### Açılış Sayfası

**Yapı:** Başlık + alt başlık → hero metni → 3–4 fayda odaklı değer önerisi → sosyal kanıt → birincil ve ikincil CTA → SSS

- **Başlık formülü:** `[Sonuç] — [kime] [ne kadar sürede]`. Ürün adı başlıkta olmak zorunda değil.
- **Değer önerisi:** özellik değil fayda. Her madde "ee, ne olacak?" testini geçmeli.
- **Sosyal kanıt yerleşimi:** ilk CTA'nın hemen altına bir kanıt öğesi (logo, sayı veya alıntı) koy — dönüşümü en çok etkileyen yerleşim budur.
- **SEO:** meta başlık ve meta açıklama önerisi

Bölüm bölüm metin ve CTA kalıpları: [references/acilis-sayfasi.md](references/acilis-sayfasi.md)

### Basın Bülteni

**Yapı:** Başlık → tarih ve yer satırı → giriş paragrafı (kim, ne, ne zaman, nerede, neden) → destekleyici alıntılar → şirket künyesi → medya iletişim bilgisi

- Üçüncü tekil şahıs, abartısız dil. "Devrim niteliğinde" gibi ifadeler gazeteciyi kaçırır.
- **Ters piramit:** en önemli bilgi ilk paragrafta. Gazeteci sondan keser.
- **Alıntılar:** en az iki — biri şirketten, biri müşteri veya ortaktan. İkisi de yer tutucu; **onaysız alıntı yayınlanmaz**.
- Her iddia doğrulanabilir olmalı.

Tam biçim ve alıntı yönergeleri: [references/basin-bulteni.md](references/basin-bulteni.md)

### Vaka Çalışması

**Yapı:** Sonucu vurgulayan başlık → müşteri profili (sektör, büyüklük, alıcı rolü) → zorluk → çözüm → **3 somut ölçüt (öncesi/sonrası)** → müşteri alıntısı → CTA

- Ölçüt yoksa kullanıcıdan iste; alamıyorsan nitel sonuç yaz ve sayı uydurma.
- Müşterinin adını kullanmak için **yazılı izin** gerekir. İzin yoksa "orta ölçekli bir lojistik firması" gibi anonimleştir.
- Satış ekibi için kısa sürüm de üret: `satis-destekleme` skillindeki satış formatı (tarama için, hikâye için değil).

Yapı, ölçüt sunumu ve izin notları: [references/vaka-calismasi.md](references/vaka-calismasi.md)

---

## Web İçeriği İçin SEO

Blog ve açılış sayfası için standart çıktı:

```
Birincil anahtar kelime:  ___
Yerleşim:                 başlık · ilk paragraf · en az 1 alt başlık · meta açıklama
İlgili kelimeler:         ___ (alt başlıklarda doğal geçsin)
Meta açıklama:            ___ (160 karakter altı, CTA içersin)
İç bağlantı fırsatı:      ___
Dış bağlantı fırsatı:     ___ (otorite kaynağa)
Görsel alt metni:         ___
```

**Anahtar kelime doldurma yapma.** Metin insan için yazılır; anahtar kelime doğal geçmiyorsa cümleyi değiştir, kelimeyi zorlama.

Ölçekli sayfa üretimi (yüzlerce şehir/karşılaştırma sayfası) farklı bir iştir — `programatik-seo` skilline geç.

---

## Çıktı

Taslaktan sonra **kısa** bir not ekle:

1. Hangi marka sesi ve ton uygulandı
2. SEO önerileri (web içeriğiyse)
3. Doldurulması gereken yer tutucular listesi
4. Sonraki adım önerisi (ekiple gözden geçir · müşteri alıntısı ekle · görselle eşle)

Sonra sor: **"Bir bölümü revize edeyim mi, tonu değiştireyim mi, yoksa başka bir kanal için varyasyon üreteyim mi?"**

**Dosyaya dökme:** 4 paragraftan uzun metinleri `.md` veya `.docx` olarak dosyaya yaz ve gönder — kullanıcı bunları kopyalayıp başka yere taşıyacak. Kısa sosyal gönderileri sohbette bırak.

---

## Kanal Uyarlaması

Kullanıcı aynı mesajı başka kanala taşımak istediğinde **çevirme, yeniden kur**:

| Kaynak → Hedef | Ne değişir |
|----------------|------------|
| Blog → LinkedIn | Tek bölümü al, kancayı öne çek, bağlantıyı yoruma koy |
| Blog → e-posta | Özet + tek CTA; tam metni e-postaya yapıştırma |
| Vaka çalışması → sosyal | Tek ölçüt + tek alıntı, gerisi bağlantı |
| Açılış sayfası → reklam metni | Sadece başlık ve tek fayda; sayfadaki her şey sığmaz |
| Basın bülteni → blog | Üçüncü tekilden birinci çoğula çevir, hikâye ekle |

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| Aynı metni her kanala yapıştırmak | Hiçbir kanalda çalışmaz | Formatı kanala göre yeniden kur |
| Uydurulmuş istatistik | Güven kaybı, basında hukuki risk | `[DOLDUR]` bırak |
| Özellik listesi | "Ee, ne olacak?" cevapsız kalır | Sonuca çevir |
| İki CTA | Tıklama dağılır | Tek birincil eylem |
| Kancasız giriş | İlk satırda kaybedilir | Soru, veri veya iddia ile başla |
| Anahtar kelime doldurma | Hem okunmaz hem cezalık | Doğal geçmiyorsa cümleyi değiştir |
| Onaysız müşteri adı/alıntısı | İzin ihlali | Yazılı izin veya anonimleştir |

---

## İlgili Skiller

- **brand-guidelines** — marka sesi ve görsel tutarlılık
- **iletisim-taslagi** — soğuk e-posta, potansiyel müşteriye ulaşma, HTML e-posta şablonu
- **satis-destekleme** — satış sunumu, tek sayfalık özet, itiraz kütüphanesi
- **programatik-seo** — ölçekli SEO sayfa üretimi
- **docx / pdf / pptx** — metni dosyaya dökme
