# ROI Hesaplayıcı ve Teklif Yapısı

## ROI Hesaplayıcı Tasarımı

### Üç Katman

**1. Girdiler — potansiyel müşteri doldurur**
Kendi sayılarını girmediği bir ROI'ye kimse inanmaz. Alan sayısını 6'yı geçirme; her ek alan terk oranını yükseltir.

| Alan tipi | Örnek |
|-----------|-------|
| Hacim | Aylık işlem / sipariş / talep sayısı |
| Süre | Bir işlem başına harcanan dakika |
| Maliyet | Saatlik işgücü maliyeti, mevcut araç ücreti |
| Oran | Hata oranı, iade oranı, dönüşüm oranı |
| Ekip | İşe dahil kişi sayısı |

**2. Hesap — formülün, görünür olmalı**
Gizli formül = güvensizlik. Her satırın nasıl hesaplandığı görünsün.

```
Kazanılan süre      = hacim × (mevcut dakika − yeni dakika) ÷ 60
Süre tasarrufu (TL) = kazanılan süre × saatlik maliyet
Maliyet düşüşü      = mevcut araç ücreti − yeni ücret
Hata tasarrufu      = hacim × (mevcut hata oranı − yeni oran) × hata başı maliyet
Toplam yıllık fayda = (yukarıdakilerin toplamı) × 12
Net fayda           = toplam fayda − yıllık yatırım
ROI %               = net fayda ÷ yıllık yatırım × 100
Geri ödeme (ay)     = yıllık yatırım ÷ (toplam fayda ÷ 12)
```

**3. Çıktı — üç sayı, fazlası değil**
Yıllık ROI % · geri ödeme süresi (ay) · 3 yıllık toplam değer.

### Dürüstlük Kuralları

- **Muhafazakâr senaryoyu varsayılan yap.** İyimser senaryo ikinci sekmede dursun.
- **Varsayımları düzenlenebilir bırak.** Alıcı "bu %60 bize göre yüksek" diyebilmeli ve değiştirebilmeli.
- **Faydayı tek kaynaktan alma.** Sadece işgücü tasarrufuna dayanan ROI, "kimseyi işten çıkarmayacağız" cevabıyla sıfırlanır.
- **Yatırıma her şeyi kat:** lisans + kurulum + eğitim + iç kaynak zamanı. Eksik maliyetli ROI, uygulama sırasında güveni bitirir.

### Uygulama Seçimi

| Format | Ne zaman | Artı | Eksi |
|--------|----------|------|------|
| Excel | İç satış, anlaşma başına özelleştirme | En hızlı, esnek | Sürüm karmaşası |
| Web aracı | Yüksek hacim, lead yakalama | Ölçekli, izlenebilir | Geliştirme maliyeti |
| Slayt | Yönetici sunumu | Hikâyeye gömülü | Etkileşimsiz |

---

## Teklif Yapısı

### Bölümler

**1. Yönetici Özeti (en fazla 1 sayfa)**
Onların sorunu → senin çözümün → beklenen sonuç. Bu sayfa tek başına okunduğunda karar verdirebilmeli; teklifin geri kalanını çoğu yönetici okumaz.

**2. Önerilen Çözüm**
Ne veriyorsun, kapsam ne, kapsam dışı ne. **Kapsam dışını yazmak kapsamı yazmak kadar önemlidir** — sonraki çatışmaların çoğu buradan çıkar.

**3. Uygulama Planı**
Hafta bazında zaman çizelgesi · kilometre taşları · kimin ne yapacağı (senin ekibin / onların ekibi) · onlardan beklenen toplam saat.

**4. Yatırım**
Fiyat, ödeme koşulları, süre, dahil olanlar, ek ücretler. Tek tabloda.

**5. Sonraki Adımlar**
Nasıl ilerlenir, hangi tarihe kadar, kim imzalar.

### Özelleştirme Kuralları

- Keşif görüşmelerinde kullandıkları **kendi kelimelerini** teklifte kullan.
- Bahsettikleri **somut acılara** doğrudan atıf yap ("görüşmede belirttiğiniz X sorunu için…").
- Sadece **aynı sektör veya kullanım senaryosundan** vaka koy.
- Görüştüğün **paydaşları isimle** an — teklifi kimin okuduğunu bilirsin.

### Sık Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| 10+ sayfa | Okunmaz | 5–7 sayfa hedefle, geri kalanı ek yap |
| Şablon kokusu | Düşük çaba sinyali | En azından yönetici özetini yeniden yaz |
| Fiyatı saklamak | Güvensizlik + gecikme | Şeffaf tablo |
| Kapsam dışını yazmamak | Uygulama çatışması | Açıkça listele |
| Geçerlilik süresi yok | Süresiz müzakere | "Bu teklif [tarih]'e kadar geçerlidir" |
| Tek seçenek | Evet/hayır kararı | 2–3 kademe sun, ortadakini işaretle |

### Üç Kademe Kuralı

Tek fiyat veren teklif "evet mi hayır mı" sorusu sorar. Üç kademe veren teklif "hangisi?" sorusu sorar — ikincisinin kapanma oranı daha yüksektir.

Kademeleri kurarken: en düşük kademe gerçekten kullanılabilir olsun (sahte olmasın), ortadakini **sen öner ve işaretle**, en üst kademe ortadakini makul göstersin.
