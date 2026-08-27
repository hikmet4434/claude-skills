# Alıcı Persona Kartları

## Kart Şablonu

```
─────────────────────────────────────────────
PERSONA: [Kısa ad — örn. "Bütçe Sahibi Burak"]
─────────────────────────────────────────────
ROL          [Yaygın unvanlar] · [kime rapor verir]
HEDEFLERİ    [Onun için başarı ne demek — 3 madde]
ACILARI      [Her gün canını sıkan şey — 3 madde]
İTİRAZLARI   [Bu rolden duyacağın 3–5 itiraz]
NASIL KARAR VERİR
             [Değerlendirme kriteri, kimi dinler, ne okur]
SATIN ALMADAKİ ROLÜ
             [Onaylar / değerlendirir / kullanır / engeller]
MESAJ AÇISI  [En çok yankı uyandıran tek cümle]
KAÇIN        [Bu personada işe yaramayan yaklaşım]
─────────────────────────────────────────────
```

---

## Beş Temel Persona Tipi

### 1. Ekonomik Alıcı — çeki imzalar

**Önemsediği:** ROI, geri ödeme süresi, toplam sahip olma maliyeti, risk, öngörülebilirlik.
**Zaman ayırdığı:** 20–30 dakika, fazlası yok.
**Mesaj açısı:** "Bu yatırım kendini X ayda amorti ediyor, muhafazakâr senaryoda."
**Kaçın:** Ürün turu, özellik derinliği, teknik terminoloji. İlgilenmiyor, kabalık da etmiyor — sadece o bilgiyi kullanamıyor.
**Kritik soru:** "Bu kararı onaylarken en çok neyden endişe edersiniz?"

### 2. Teknik Alıcı — ürünü değerlendirir

**Önemsediği:** Mimari, entegrasyon derinliği, güvenlik, ölçeklenebilirlik, dokümantasyon kalitesi, ekibinin iş yükü.
**Karar gücü:** Genelde "evet" diyemez ama **"hayır" diyebilir**. Vetosu vardır.
**Mesaj açısı:** "Kurulum ekibinizden şu kadar zaman alır, geri kalanını biz yaparız."
**Kaçın:** Abartı, belirsiz cevap, bilmediğine "evet" demek. Bir kez yakalarsa güven geri gelmez.
**Kritik soru:** "Bunu değerlendirirken en çok neye bakarsınız?"

### 3. Son Kullanıcı — her gün kullanır

**Önemsediği:** Kullanım kolaylığı, günlük akışına oturması, öğrenme süresi, işini kolaylaştırması.
**Karar gücü:** Doğrudan yok, ama benimseme onun elinde. Kullanmazsa yenileme olmaz.
**Mesaj açısı:** "Şu an 40 dakika süren işi 5 dakikaya indiriyor."
**Kaçın:** Stratejik dil, ROI hesabı. Onun derdi kendi günü.
**Kritik soru:** "Bu işin en sinir bozucu kısmı ne?"

### 4. Şampiyon — içeride savunur

**Önemsediği:** Doğru kararı verdiğinin görülmesi, itibarı, projesinin başarısı.
**İhtiyacı:** Senin yerine sunabileceği malzeme. Şampiyon içeride yalnız kalırsa anlaşma ölür.
**Mesaj açısı:** "Bunu patronunuza götürmeniz için gereken her şeyi hazırlayayım."
**Kaçın:** Onu bilgiyle boğmak. Şampiyona **daha az** ama **daha keskin** malzeme ver.
**Kritik soru:** "Bunu içeride onaylatırken en zor soru ne olur?"

### 5. Engelleyici — karşı çıkar

**Neden karşı çıkar:** Mevcut çözümü o seçti · iş yükü artacak · yetki alanı daralacak · geçmişte kötü bir tedarikçi deneyimi.
**Yapılacak:** Yok saymak yerine **erkenden konuş**. Görmezden gelinen engelleyici, en son toplantıda ortaya çıkar.
**Mesaj açısı:** "Sizin endişenizi anlamak istiyorum, çünkü uygulama sırasında en çok siz etkileneceksiniz."
**Kaçın:** Onu atlayıp üstüyle konuşmak. Bunu öğrenir ve daha sert engeller.
**Kritik soru:** "Bu değişiklikte sizin için en büyük risk ne?"

---

## Doldurulmuş Örnek

```
─────────────────────────────────────────────
PERSONA: E-ticaret Direktörü
─────────────────────────────────────────────
ROL          E-ticaret Direktörü / Dijital Kanal Müdürü
             CMO veya COO'ya rapor verir
HEDEFLERİ    • Dönüşüm oranını artırmak
             • İade oranını düşürmek
             • Çeyreklik online ciro hedefini tutturmak
ACILARI      • İade lojistiği kârı yiyor
             • Ürün sayfası dönüşümü aylardır sabit
             • Ekip küçük, yeni araç entegrasyonu ona iş çıkarıyor
İTİRAZLARI   • "Bu bizim tema ile çalışır mı?"
             • "Ekibimin kurulum için zamanı yok"
             • "Daha önce benzer bir araç denedik, kullanılmadı"
NASIL KARAR VERİR
             Pilot ister. Rakiplerin ne kullandığına bakar.
             Ajansına danışır. Vaka çalışması okur.
SATIN ALMADAKİ ROLÜ
             Değerlendirir ve önerir; 25K$ üstünde onay CFO'da
MESAJ AÇISI  "Beden kaynaklı iadeleri ölçülebilir şekilde düşürüyoruz —
             ilk 100 denemeyi 2 haftada görürsünüz."
KAÇIN        Uzun teknik anlatım; "yapay zeka" vurgusu.
             Sonuç istiyor, teknoloji değil.
─────────────────────────────────────────────
```

---

## Kartları Canlı Tutma

- Her kaybedilen anlaşmadan sonra ilgili kartın **itirazlar** bölümünü güncelle.
- Yeni bir itiraz üç kez duyulduysa karta girer ve itiraz kütüphanesine kayıt açılır.
- Çeyrekte bir en iyi temsilciyle kartları gözden geçir: "bu kartta yanlış olan ne?"
- Kart sayısını 5'i geçirme. Altı persona, hiç persona olmamasıyla aynı şeydir — kimse okumaz.
