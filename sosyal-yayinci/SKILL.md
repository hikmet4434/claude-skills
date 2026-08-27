---
name: sosyal-yayinci
description: "Tek bir videoyu veya gönderiyi tüm sosyal platformlara uyarlar: platforma özel başlık, hashtag ve yayın saatiyle. TikTok, Instagram, YouTube Shorts, LinkedIn, X, Facebook, Threads, Pinterest destekler. Kullanıcı şunlardan bahsettiğinde kullan: sosyal medya paylaşımı, çoklu platform yayını, tüm platformlara paylaş, TikTok paylaş, Instagram Reels, YouTube Shorts, LinkedIn gönderisi, X paylaşımı, caption yaz, altyazı üret, hashtag stratejisi, hashtag öner, yayın takvimi, içerik takvimi, ne zaman paylaşmalıyım, en iyi paylaşım saati, toplu paylaşım, video yayınla, gönderi planla, sosyal medya raporu, etkileşim takibi. Tek platformluk metin için icerik-taslagi, reklam videosu üretimi için reklam-videosu, Instagram yorum/DM otomasyonu için instagram-yorum-dm-otomasyonu skilline bak."
license: MIT
metadata:
  version: "2.0.0"
  language: tr
---

# Sosyal Yayıncı

Tek bir içeriği her platformun kendi diline çevir, yayın saatini planla, yayınla ve sonucu takip et.

**Temel ilke:** Aynı altyazıyı sekiz yere yapıştırmak "çoklu platform yayını" değildir. Her platformun izleyicisi, biçimi ve algoritması farklı — metin de farklı olmalı.

---

## Önce Yayın Yolunu Belirle

Bu skill üç ayrı iş yapar ve **ikisi her zaman çalışır, biri bağlantıya bağlıdır**:

| İş | Bağlantı gerekir mi |
|----|---------------------|
| Altyazı, hashtag, takvim üretme | **Hayır** — her zaman çalışır |
| Takip tablosu ve rapor | **Hayır** — yerel dosyada tutulur |
| Gerçekten yayınlama | **Evet** — aşağıdaki yollardan biri |

**Yayın yolları (çalışmaya başlamadan önce hangisinin açık olduğunu kontrol et):**

| Platform | Yol | Durum kontrolü |
|----------|-----|----------------|
| TikTok | higgsfield MCP → `tiktok_accounts` ile bak, hesap yoksa `tiktok_connect` | Doğrudan yayın mümkün |
| Instagram, LinkedIn, X, Facebook, Pinterest | Zapier veya Make MCP üzerinden ilgili aksiyon | Bağlantı varsa mümkün |
| YouTube | Zapier/Make veya elle yükleme | Genelde elle |
| Hepsi | Elle — sen üret, kullanıcı yapıştırır | Her zaman mümkün |

**Dürüstlük kuralı:** Bağlantı yoksa "yayınladım" deme. Altyazıları ve takvimi üret, hangi platforma elle yapıştırılacağını açıkça söyle. Yayınlanmamış bir gönderiyi yayınlanmış diye takip tablosuna yazma.

---

## Toplanacak Bilgi

1. **İçerik** — video dosyası, görsel veya konu. Video varsa süresi ve en-boy oranı.
2. **Ana mesaj** — izleyici ne hatırlasın (tek cümle)
3. **Hedef platformlar** — hepsi mi, seçili mi
4. **Hedef kitle ve dil** — TR mi, EN mi, ikisi mi
5. **Marka sesi** — `brand-guidelines` skilli veya kayıtlı profil varsa otomatik uygula
6. **CTA** — kaydet, yorum yap, profildeki bağlantı, abone ol

Eksikse makul varsayım yap, açıkça yaz, devam et. Kullanıcıyı altı soruyla bekletme.

---

## Platform Özeti

| Platform | Biçim | Süre | Altyazı sınırı | Hashtag |
|----------|-------|------|----------------|---------|
| TikTok | 9:16 dikey | 15 sn – 10 dk | 2.200 karakter (ilk ~90'ı görünür) | 3–5 |
| Instagram Reels | 9:16 | 3 sn – 3 dk | 2.200 karakter (ilk 125 görünür) | 5–15 |
| YouTube Shorts | 9:16 | ≤ 3 dk | Başlık 100, açıklama 5.000 | Başlıkta 0, açıklamada 3–5 |
| LinkedIn | 9:16 veya 1:1 | 3 sn – 10 dk | 3.000 karakter (ilk 2 satır kritik) | 3–5 |
| X / Twitter | 16:9 veya 9:16 | ≤ 2 dk 20 sn (temel hesap) | 280 karakter | 1–2 |
| Facebook | 9:16 (Reels) | ≤ 90 sn | Kısa kazanır | 0–2 |
| Threads | 9:16 | ≤ 5 dk | 500 karakter | 0–3 |
| Pinterest | 9:16 | 4 sn – 15 dk | Başlık 100, açıklama 500 | 2–5 (anahtar kelime odaklı) |

Platform sınırları değişir — kritik bir kampanya öncesi güncel limiti doğrula.

Detaylı biçim, kapak görseli ve teknik gereksinimler: [references/platform-kurallari.md](references/platform-kurallari.md)

---

## Altyazı Uyarlaması

Aynı mesaj, altı farklı kuruluş. **Çeviri değil, yeniden yazım.**

| Platform | Ton | Kuruluş |
|----------|-----|---------|
| TikTok | Samimi, hızlı, trend farkında | Kanca ilk satırda, kısa, emoji serbest |
| Instagram | İlgi çekici, hikâye odaklı | İlk 125 karakter kanca, gövde hikâye, hashtag blok sonda |
| YouTube | Arama odaklı | Başlık anahtar kelimeli, açıklama zaman damgalı |
| LinkedIn | Profesyonel, içgörü odaklı | İlk 2 satır kanca, numaralı yapı, soru ile bitir |
| X | Sıkı, vurucu | Tek fikir veya thread |
| Facebook | Sohbet havasında | Kısa, soru ile bitir |
| Threads | Rahat, konuşma | Kısa, tepki davet eden |
| Pinterest | Açıklayıcı, arama odaklı | Ne olduğu net, anahtar kelimeli |

Her platform için tam örnek ve dönüşüm kalıpları: [references/altyazi-sablonlari.md](references/altyazi-sablonlari.md)

---

## Hashtag Stratejisi

| Platform | Adet | Yerleşim | Karışım |
|----------|------|----------|---------|
| TikTok | 3–5 | Altyazı sonu | 1 geniş + 2 niş + 1 markalı |
| Instagram | 5–15 | Ayrı blok, metinden sonra | 3 geniş + 5 orta + 5 niş |
| YouTube | 3–5 | Açıklamada (başlıkta değil) | Anahtar kelime odaklı |
| LinkedIn | 3–5 | Gönderi sonu | Profesyonel, sektörel |
| X | 1–2 | Cümle içinde veya sonda | Sadece niş |
| Facebook | 0–2 | Sonda | Genelde gereksiz |
| Threads | 0–3 | Sonda | Rahat |
| Pinterest | 2–5 | Açıklamada | Arama terimi gibi |

**Kurallar:**
- Sadece **gerçekten aranan** hashtag kullan. Uydurulmuş marka etiketi (`#BizimYolculugumuz`) kimse tarafından aranmaz — markalı etiket sadece kampanya ölçümü için anlamlıdır.
- `#fyp`, `#viral`, `#keşfet` gibi etiketler artık ölçülebilir fayda sağlamıyor; yer kaplıyor. 3-5 etiketin hepsini konuya ayır.
- TR içerikte TR etiket kullan. `#productivity` Türk izleyiciye ulaşmaz.
- Aynı etiket setini her gönderide tekrarlama.

---

## Yayın Zamanlaması

**Önce uyarı:** İnternetteki "en iyi paylaşım saati" tabloları çoğunlukla eski ve başka pazarlara ait. Aşağıdaki değerler **başlangıç noktasıdır, gerçek değil**. 3–4 hafta sonra kendi analytics verinle değiştir.

Türkiye saati (UTC+3) için makul başlangıç:

| Platform | Gün | Saat |
|----------|-----|------|
| TikTok | Her gün | 12:00–13:00 · 19:00–22:00 |
| Instagram | Salı–Cuma | 12:00–13:00 · 19:00–21:00 |
| YouTube Shorts | Perşembe–Pazar | 15:00–18:00 |
| LinkedIn | Salı–Perşembe | 08:00–10:00 |
| X | Hafta içi | 09:00 · 12:00 · 17:00 |
| Facebook | Hafta içi | 13:00–16:00 |
| Threads | Her gün | 08:00–10:00 · 20:00–22:00 |
| Pinterest | Cumartesi–Pazar | 20:00–23:00 |

**Aralık kuralı:** Aynı içeriği farklı platformlara **en az 2 saat arayla** koy. Aynı anda her yere düşen içerik, kendi izleyicisiyle yarışır.

**Kendi verinle doğrulama:** 3 hafta boyunca aynı içerik türünü farklı saatlerde yayınla, görüntülenme/etkileşim farkını kaydet, tabloyu güncelle. Kendi 20 gönderin, internetteki her makaleden değerlidir.

---

## Akış

```
1. İÇERİĞİ AL        video/görsel + ana mesaj
2. PLATFORM SEÇ      hangi platformlar, hangi dil
3. ALTYAZI ÜRET      her platform için ayrı kuruluş
4. HASHTAG SEÇ       platform kuralına göre
5. TAKVİM KUR        saat + aralık kuralı
6. ONAY AL           kullanıcı görmeden yayın yok
7. YAYINLA           bağlı olan platformlara; kalanı elle listele
8. KAYDET            takip tablosuna satır ekle
9. BİLDİR            özet + bağlantılar
```

**6. adım pazarlıksız.** Otomatik yayın, yanlış altyazıyı kalıcı hale getirir. Her zaman önce göster, sonra yayınla.

Yayın yollarının kurulumu ve sınırları: [references/yayin-yollari.md](references/yayin-yollari.md)

---

## Bildirim (Slack yok)

Slack bağlı değil. Yayın özeti şu sırayla verilir:

1. **Sohbette özet** — her zaman. Platform, saat, bağlantı, durum.
2. **Yerel log dosyası** — `sosyal-yayin-log.md`, bağlı klasöre yazılır. Her yayın bir satır.
3. **Gmail özeti** — kullanıcı isterse kendine e-posta olarak gönderilir (Gmail bağlı).
4. **Notion sayfası** — kullanıcı isterse takip veritabanına kayıt (Notion bağlı).

Özet biçimi:
```
✅ Yayınlandı — [içerik adı] · [tarih]

TikTok      19:00   [bağlantı]        ✅
Instagram   21:00   planlandı          ⏳
YouTube     —       elle yüklenecek    ⚠️
LinkedIn    —       bağlantı yok       ⚠️

Elle yapılacaklar: YouTube Shorts yüklemesi, LinkedIn gönderisi
```

---

## Takip ve Ölçüm

**Dürüst sınır:** Platform hesaplarına API erişimi yoksa metrikler **otomatik çekilemez**. Bu skill takip tablosunu kurar ve doldurulacak alanları hazırlar; sayıları sen veya kullanıcı girer.

Takip edilecek alanlar: gönderi kimliği · platform · yayın zamanı · içerik türü · altyazı · hashtag'ler · görüntülenme (24s / 7g) · beğeni · yorum · paylaşım · kaydetme · profil ziyareti · takipçi değişimi.

**En değerli iki metrik:**
- **Kaydetme (save)** — "sonra lazım olur" sinyali, algoritmalar bunu ağırlıklandırıyor
- **Paylaşım (share)** — organik erişimin gerçek motoru

Beğeni en zayıf sinyaldir; rapora koy ama karar verirken ona bakma.

Takip tablosu şablonu, haftalık rapor biçimi ve ölçüm kuralları: [references/takip-ve-olcum.md](references/takip-ve-olcum.md)

---

## Toplu Yayın

Haftalık içerik paketi için:

```
1. Klasördeki videoları listele
2. Her birini türe ayır (eğitici / eğlence / tanıtım / topluluk)
3. Türe göre platform ve gün ata
4. Tüm altyazıları tek seferde üret
5. Takvime yay — aynı platforma günde birden fazla koyma
6. Onaya sun (tek liste hâlinde)
7. Onaylananları sırayla yayınla
```

**Günde bir platform bir gönderi.** TikTok'ta günde 2–3 gönderi çalışabilir, ama LinkedIn'de günde 2 gönderi erişimi böler.

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| Aynı altyazıyı her yere yapıştırmak | Hiçbirinde çalışmaz | Platform başına yeniden yaz |
| Watermark'lı video (TikTok logosu ile Reels) | Erişim cezası | Kaynak dosyayı watermarksız dışa aktar |
| Hepsini aynı anda yayınlamak | İçerik kendiyle yarışır | En az 2 saat aralık |
| Onaysız otomatik yayın | Yanlış metin kalıcı olur | Her zaman önce göster |
| `#fyp` `#keşfet` doldurmak | Ölçülebilir fayda yok | 3-5 etiketi konuya ayır |
| İngilizce hashtag, Türk kitle | Ulaşmaz | Kitlenin dilinde etiket |
| Metrikleri uydurmak | Yanlış karar | Girilmemiş alanı boş bırak |
| Yayınlanmamışı yayınlandı yazmak | Takip tablosu bozulur | Durum alanını dürüst tut |

---

## İlgili Skiller

- **icerik-taslagi** — tek platformluk uzun metin (blog, e-posta, açılış sayfası)
- **reklam-videosu** — video üretimi
- **instagram-yorum-dm-otomasyonu** — yayın sonrası yorum ve DM yönetimi
- **brand-guidelines** — marka sesi tutarlılığı
- **xlsx** — takip tablosunu Excel olarak üretme
