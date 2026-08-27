# Kalite Kapıları

Dört aşama: üretim öncesi · üretim sırasında · yayın öncesi · yayın sonrası.

---

## 1. Üretim Öncesi

- [ ] Her sayfa türü için **belirgin kullanıcı ihtiyacı** tanımlandı
- [ ] URL başına **tek birincil arama amacı** eşlendi
- [ ] Sayfaya özgü **veri alanları** belirlendi
- [ ] **Eksik satır kuralı** yazıldı (hangi alan eksikse satır elenir)
- [ ] Kaynak **kullanım hakları** doğrulandı
- [ ] Hangi sayfaların `noindex` olacağına karar verildi
- [ ] **Arama hacmi elemesi** yapıldı (hacmi sıfır olan kombinasyon üretilmeyecek)

**Kapı sorusu:** *"Organik arama trafiği tamamen kesilse bu sayfalar yine de var olmayı hak eder miydi?"* Hayırsa buradan ileri gitme.

---

## 2. Üretim Sırasında

- [ ] **Satır izlenebilirliği** korunuyor (her sayfa hangi kayıttan geldi)
- [ ] Olgusal içerik ile üretilmiş içerik **ayrı tutuluyor**
- [ ] Eksik alanlarda **uydurma engelleniyor** (boş → bölüm gizlenir)
- [ ] **Doğrulama kuralları** çalışıyor (telefon formatı, tarih aralığı, sayısal sınırlar)
- [ ] Desteklenmeyen iddialar **işaretleniyor**
- [ ] **Tekrarlanan paragraf tespiti** açık (aynı cümle N sayfada geçiyorsa uyarı)

---

## 3. Yayın Öncesi

### İçerik
- [ ] **Rastgele örneklem** incelendi — en az 20 sayfa, elle okundu
- [ ] **Yüksek riskli satırlar** ayrıca gözden geçirildi (uç değerler, eksik alanı çok olanlar)
- [ ] Ticari ve güvenlikle ilgili iddialar **doğrulandı**
- [ ] Satıra özgü içerik oranı **≥ %60**
- [ ] İki rastgele sayfa yan yana kondu, ortak metin **≤ %40**

### Teknik
- [ ] Benzersiz `<title>` ve meta açıklama (kopya kontrolü çalıştırıldı)
- [ ] Doğru başlık hiyerarşisi (tek H1)
- [ ] Şema işaretlemesi uygulandı ve **sayfada görünen** veriyi işaretliyor
- [ ] `canonical` doğrulandı
- [ ] Sayfa hızı kabul edilebilir (Core Web Vitals)
- [ ] Mobilde okunabilir

### Örtüşme
- [ ] **Anahtar kelime yamyamlığı** kontrolü — iki sayfa aynı birincil sorguyu hedefliyor mu?
- [ ] Mevcut sayfalarla çakışma var mı?

### Onay
- [ ] Sorumlu bir kişi imzaladı (kim yayınladı, ne zaman)

---

## 4. Yayın Sonrası İzleme

### Haftalık
```
İndekslenme oranı (site haritası bazında):  ___ / ___  (%__)
Yeni indekslenen:                            ___
İndeksten düşen:                             ___
Tarama hataları:                             ___
```

### Aylık
```
Gösterim alan sayfa:                ___
Tıklama alan sayfa:                 ___
Gösterim var + tıklama YOK sayfa:   ___   ← incele
Ortalama pozisyon:                  ___
Dönüşüm:                            ___
```

**"Gösterim var, tıklama yok"** en önemli sinyaldir: sayfa sıralanıyor ama kimse tıklamıyor → başlık/meta zayıf ya da amaç eşleşmiyor.

### Uyarı sinyalleri
| Sinyal | Anlamı | Aksiyon |
|--------|--------|---------|
| İndekslenme oranı < %50 | Google sayfaları değersiz buluyor | Üretimi durdur, kaliteyi yükselt |
| Toplu sıralama düşüşü | Algoritmik değerlendirme | Ölçekle üretimi durdur, denetim yap |
| Search Console manuel işlem | Politika ihlali | Hangi politika olduğuna bak, düzelt, yeniden değerlendirme talebi aç |
| Etkileşim çok düşük | Sayfa amacı karşılamıyor | Şablonu yeniden tasarla |
| Tarama bütçesi tükeniyor | Çok fazla düşük değerli URL | Zayıfları `noindex` yap |

---

## Budama (Pruning)

Programatik SEO üretmekle bitmez, **budamakla** sürer. Aylık:

```
90 gündür gösterim almayan sayfa      → noindex veya kaldır
Birbiriyle yarışan sayfalar           → birleştir, 301 yönlendir
Verisi bayatlamış sayfalar            → güncelle veya kaldır
Gösterim var + etkileşim yok          → şablonu iyileştir, tek tek deneme yap
```

**Ölçü:** Toplam sayfa sayısı büyürken indekslenme oranı düşüyorsa, üretimi durdurup budamaya geç. Sayfa sayısı bir başarı metriği değildir.

---

## Dalgalı Yayın

Hepsini birden yayınlama. Öğrenerek ilerle:

```
Dalga 1:  50 sayfa   → 4 hafta bekle → indekslenme ve sıralamayı ölç
Dalga 2:  200 sayfa  → sadece 1. dalga kıyasları tuttuysa
Dalga 3:  1000 sayfa → sadece 2. dalga tuttuysa
```

**Kıyas eşiği:** İndekslenme oranı ≥ %70 ve ortalama pozisyon iyileşiyorsa devam. Tutmuyorsa şablonu ve veri katmanını düzelt, sayfa sayısını artırma.

Bu tek disiplin, programatik SEO projelerinin çoğunu başarısızlıktan kurtarır.
