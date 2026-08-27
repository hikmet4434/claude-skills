# Veri Kaynakları ve Savunulabilirlik

## Savunulabilirlik Hiyerarşisi

```
1. TESCİLLİ         Sen ürettin — rakip kopyalayamaz
2. ÜRÜN KAYNAKLI    Kullanıcılarından çıkan toplu veri
3. KULLANICI ÜRETİMİ Topluluğundan gelen içerik
4. LİSANSLI         Parayla aldığın ayrıcalıklı erişim
5. HALKA AÇIK       Herkesin ulaşabildiği veri
```

**Kritik:** 4. ve 5. seviyede kalıyorsan, aynı sayfayı rakibin de üretebilir — ve daha yüksek otoriteyle üretirse kazanır. Bu durumda ya bir üst katman ekle ya da playbook'u değiştir.

---

## Katman Yükseltme Yöntemleri

Halka açık veriden başlayıp savunulabilir hâle getirmenin yolları:

| Yöntem | Ne yapar | Örnek |
|--------|----------|-------|
| **Toplama** | Dağınık veriyi tek yerde birleştirir | 5 kaynaktan firma listesi, telefon-adres eşleştirmeli |
| **Normalize etme** | Karşılaştırılabilir hâle getirir | Farklı fiyatlandırma modellerini tek birime çevirme |
| **Hesaplama** | Türetilmiş metrik üretir | Sıralama, ortalama sapması, yoğunlaşma oranı |
| **Doğrulama** | Kalite katmanı ekler | Telefonları arayıp doğrulama, kapalıları işaretleme |
| **Zenginleştirme** | Kendi gözlemini ekler | Her girdi için kısa değerlendirme |
| **Zaman serisi** | Geçmişi biriktirir | Aylık anlık görüntü → trend verisi (zamanla en güçlü hâle gelir) |

**En güçlü hamle: zaman serisi.** Halka açık veriyi her ay kaydetmeye bugün başlarsan, 12 ay sonra kimsenin sahip olmadığı bir trend verin olur.

---

## Kaynak Tipleri

### Tescilli veri
Ürün analitiğinden çıkan anonim toplu veriler · kendi testlerin ve ölçümlerin · kendi araştırman (anket, deney) · kürasyonun ve editoryal değerlendirmen.

**Uyarı:** Ürün verisi yayınlarken müşteri gizliliğini koru. Tekil müşteriye geri izlenebilir veri yayınlama; eşik altı segmentleri birleştir.

### Halka açık kaynaklar
Resmi istatistik kurumları · açık veri portalları · kurumsal web siteleri · Google Maps / arama sonuçları (SerpAPI vb.) · uygulama mağazaları.

**Kullanım hakkı kontrolü zorunlu:** Kazıdığın verinin yayın hakkı var mı? Kaynağın kullanım şartları ne diyor? Telif korumalı metni yeniden yayınlamak, SEO sorunundan önce hukuki sorundur.

### `sektor-ara` ile veri üretimi
Konum ve dizin playbook'ları için hazır yol: `sektor-ara` skilli sektör + şehir alıp Google Maps ve organik aramayı birleştirir, portal/ilan sitelerini ayıklar, telefon-adres eşleştirir ve çok sekmeli Excel üretir.

Programatik SEO için kullanımı:
```
1. Hedef şehir listesini çıkar (arama hacmi olanlar)
2. Her şehir için sektor-ara çalıştır, sektörel jargonu ek sorgu olarak ver
3. Sonuçları tek veri setinde birleştir, ilçe ve puan alanlarını normalize et
4. Şehir başına hesaplanmış alanlar üret (firma sayısı, ilçe yoğunlaşması, ortalama puan)
5. Eksik zorunlu alanı olan satırları ele
```
**Sınır:** Bu bir örneklemdir, sektörün tamamı değildir. Sayfada "X tarihinde derlenmiş, N kayıt" gibi bir kapsam notu bulunsun — hem dürüstlük hem güven.

---

## Veri Kalitesi Kuralları

| Kural | Neden |
|-------|-------|
| Her sayı bir kaynaktan gelmeli | Uydurulmuş veri, ilk fark edildiğinde tüm siteyi yakar |
| Eksik alanı boş bırak, tahmin etme | "Tahmini telefon" en kötü hatadır |
| Güncelleme tarihini sayfada göster | Tazelik sinyali + kullanıcı güveni |
| Çelişkili kayıtları yayınlamadan çöz | İki farklı telefon = güvenilmez site |
| Satır izlenebilirliği tut | Hangi sayfanın hangi satırdan geldiği kayıtlı olmalı |
| Yayın öncesi örneklem al | Rastgele 20 satırı elle doğrula |

---

## Güncelleme Takvimi

| Veri tipi | Sıklık | Bayatlarsa |
|-----------|--------|------------|
| Fiyat / kur | Günlük–canlı | Sayfa yanlış bilgi verir, güven biter |
| Firma listesi | 3 ayda bir | Kapanan işletmeler birikir |
| Özellik matrisi | 6 ayda bir | Rakip yeni özellik ekler, karşılaştırma yanlışlanır |
| Yorum/puan | Aylık | Sıralama gerçeği yansıtmaz |
| Tanım/sözlük | Yıllık | Genelde stabil |

**Otomasyon şart:** Elle güncellenecek 500 sayfalık veri seti, 3 ay içinde güncellenmez hâle gelir. Güncelleme boru hattı kurulamıyorsa sayfa sayısını güncelleyebileceğin kadarla sınırla.
