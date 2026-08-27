# Takip ve Ölçüm

## Dürüst Sınır

Platform hesaplarına analytics API erişimi yoksa metrikler **otomatik çekilemez**. Bu skill tabloyu kurar ve doldurulacak alanları hazırlar; sayıları kullanıcı platform panelinden girer veya dışa aktarır.

**Uydurma yasağı:** Girilmemiş metrik boş kalır. Tahmini görüntülenme yazmak, tüm tabloyu değersiz kılar.

---

## Takip Tablosu

`sosyal-yayin-takip.csv` veya Excel olarak tut:

| Alan | Tip | Not |
|------|-----|-----|
| tarih | tarih | Yayın günü |
| icerik_adi | metin | Video/gönderi kimliği |
| platform | metin | tiktok / instagram / youtube / linkedin / x / facebook / threads / pinterest |
| yayin_saati | saat | Gerçek yayın saati |
| icerik_turu | metin | egitici / eglence / tanitim / topluluk |
| altyazi | metin | Kullanılan metin |
| hashtagler | metin | Virgülle ayrık |
| durum | metin | yayinlandi / planlandi / elle_bekliyor / basarisiz |
| baglanti | URL | Yayın bağlantısı |
| goruntulenme_24s | sayı | 24 saat sonra |
| goruntulenme_7g | sayı | 7 gün sonra |
| begeni | sayı | |
| yorum | sayı | |
| paylasim | sayı | |
| kaydetme | sayı | Instagram/TikTok/Pinterest |
| profil_ziyareti | sayı | Varsa |
| takipci_degisimi | sayı | Gün bazında |

**Ölçüm zamanı:** 24 saat ve 7 gün. Tek ölçüm yeterli değil — TikTok ve Pinterest'te içerik günler sonra açılabiliyor.

---

## Hangi Metriğe Bakılır

| Metrik | Değer | Neden |
|--------|-------|-------|
| **Paylaşım** | En yüksek | Organik erişimin gerçek motoru |
| **Kaydetme** | Çok yüksek | "Sonra lazım" sinyali, algoritma ağırlıklandırıyor |
| **Yorum** | Yüksek | Etkileşim derinliği |
| İzlenme süresi / tamamlanma | Yüksek | Video platformlarında sıralama sinyali |
| Profil ziyareti | Orta | Niyet göstergesi |
| Görüntülenme | Orta | Ham erişim, tek başına anlam taşımaz |
| **Beğeni** | En düşük | Ucuz sinyal, karar verirken kullanma |

**Etkileşim oranı** = (beğeni + yorum + paylaşım + kaydetme) ÷ görüntülenme × 100

Platformlar bunu farklı hesaplar; kendi formülünü sabit tut ve platformlar arası değil, **aynı platformda zaman içinde** karşılaştır.

---

## Haftalık Rapor Biçimi

```markdown
# Sosyal Medya Haftalık — [tarih aralığı]

## Özet
| Platform | Gönderi | Görüntülenme | Etkileşim | Takipçi |
|----------|---------|--------------|-----------|---------|
| TikTok    |   |   |   |   |
| Instagram |   |   |   |   |
| YouTube   |   |   |   |   |
| LinkedIn  |   |   |   |   |

## En iyi 3 gönderi
1. [platform] "[içerik]" — [görüntülenme], %[etkileşim]
2. ...
3. ...

## En zayıf gönderi
[platform] "[içerik]" — neden zayıf kaldığına dair gözlem

## Bu haftanın çıkarımı
[Tek cümle — veriye dayalı, tahmin değil]

## Gelecek hafta denenecek tek değişiklik
[Tek şey. İki değişiklik yaparsan hangisinin işe yaradığını bilemezsin.]
```

**"Gelecek hafta denenecek tek değişiklik"** raporun en önemli satırıdır. Rapor okunup unutuluyorsa değersizdir.

---

## Kendi Yayın Saatini Bulma

İnternetteki tablolar başlangıç noktasıdır. Gerçeği kendi verin söyler.

```
Hafta 1-3:  Aynı içerik türünü farklı saatlerde yayınla
            (örn. TikTok: 12:00 / 16:00 / 19:00 / 22:00)
Hafta 4:    24 saatlik görüntülenmeleri saat bazında karşılaştır
            En iyi iki saati seç
Hafta 5+:   O iki saate yerleş, çeyrekte bir tekrar test et
```

**En az 15-20 gönderi** olmadan sonuç çıkarma. 3 gönderiyle "sabah daha iyi" demek gürültüyü sinyal sanmaktır.

---

## Ne Zaman İçerik Türünü Değiştirmeli

| Gözlem | Anlamı | Aksiyon |
|--------|--------|---------|
| Görüntülenme yüksek, etkileşim düşük | Kanca iyi, içerik vaadi tutmuyor | Gövdeyi güçlendir |
| Görüntülenme düşük, etkileşim yüksek | İçerik iyi, kanca zayıf | İlk 3 saniyeyi/satırı değiştir |
| İkisi de düşük | Konu ilgi çekmiyor | Konuyu değiştir |
| Kaydetme yüksek | "Faydalı" algılanıyor | Bu türden daha çok üret |
| Paylaşım yüksek | Kimlikle örtüşüyor | Bu açıyı sürdür |
| Takipçi artıyor ama etkileşim düşüyor | Yanlış kitle geliyor | Hedeflemeyi daralt |

---

## Log Dosyası

Her yayın oturumunda `sosyal-yayin-log.md` dosyasına bir blok eklenir:

```markdown
## 2026-08-26 · "uzaktan-calisma-ipuclari.mp4"

| Platform | Saat | Durum | Bağlantı |
|----------|------|-------|----------|
| TikTok | 19:00 | ✅ yayınlandı | https://... |
| Instagram | 21:00 | ⏳ planlandı | — |
| YouTube | — | ⚠️ elle bekliyor | — |
| LinkedIn | — | ⚠️ bağlantı yok | — |

Elle yapılacak: YouTube Shorts yüklemesi, LinkedIn gönderisi
```

Bu dosya hem geçmiş kaydı hem de "neyi yayınlamayı unuttum" kontrolü sağlar.
