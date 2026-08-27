# Toplu Liste: sektor-ara → Kişiselleştirilmiş İletişim

Kullanıcı tek kişi değil bir **segment** hedeflediğinde ("İzmir'deki diş kliniklerine ulaşalım", "Ankara'daki kongre organizatörlerine yazalım") bu akış çalışır.

---

## Akış

```
1. LİSTE ÇIKAR      sektor-ara skilli → sektör + şehir → Excel
2. ELE               ICP dışını ve portal kayıtlarını at
3. SEGMENTLE         2-4 alt gruba böl, her birine ayrı açı
4. ZENGİNLEŞTİR      kişi adı ve doğrulanmış e-posta bul
5. KİŞİSELLEŞTİR     satır başına 1 somut detay üret
6. AŞAMALI GÖNDER    günde 30-50, alan adı başına
7. GERİ İŞLE         yanıt ve ret nedenlerini listeye yaz
```

---

## 1. Liste Çıkarma

`sektor-ara` skillini çalıştır. En çok fark yaratan adım **sektöre özgü ek sorgular**: sektörün jargonunu ve bilinen büyük oyuncularını `--ek-sorgu` olarak ekle.

Çıktı sütunları: firma adı · telefon · adres · web sitesi · puan · yorum sayısı · ilçe

**Sınır:** Bu bir örnektir, sektörün tamamı değildir. Kullanıcıya bunu söyle.

---

## 2. Eleme

sektor-ara portal/ilan sitelerini zaten ayıklar, ama ICP elemesi sana kalır:

| Ele | Neden |
|-----|-------|
| Web sitesi olmayan kayıtlar | E-posta bulunamaz, kurumsallık düşük |
| Yorum sayısı çok düşük / hiç yok | Aktif olmayabilir |
| Zincir/franchise şubeleri | Karar merkezde, şubeye yazma |
| Büyüklük bandı dışındakiler | ICP dışı — dokunma |
| CRM'de son 60 günde temas edilmişler | Çifte temas, kötü izlenim |

Elediklerini **silme**, ayrı bir sekmede tut. İkinci turda kriter değişebilir.

---

## 3. Segmentleme

Tek şablonla 300 kişiye yazmak, 300 kişiye hiç yazmamaktır. Listeyi 2–4 alt gruba böl:

| Bölme kriteri | Örnek | Açı farkı |
|---------------|-------|-----------|
| Büyüklük | Tek şube / çok şube | Tek şube: maliyet · Çok şube: standardizasyon |
| Konum | Merkez / çevre ilçe | Merkez: rekabet · Çevre: erişim |
| Olgunluk | Web sitesi modern / eski | Modern: entegrasyon · Eski: temel dijitalleşme |
| Alt kategori | Sektör içi uzmanlık | Jargon ve referans farkı |

Her segment için ayrı bir açılış cümlesi ve ayrı bir kanıt noktası hazırla.

---

## 4. Zenginleştirme

sektor-ara firma verir, **kişi vermez**. Karar vericiyi bulman gerekir.

| Yöntem | Ne verir |
|--------|----------|
| Apollo / zenginleştirme MCP'si | İsim, unvan, doğrulanmış e-posta |
| Web sitesi "Hakkımızda / Ekip" sayfası | İsim ve unvan |
| LinkedIn şirket sayfası → çalışanlar | İsim, unvan, kıdem |
| Ticaret sicil / şirket kayıtları | Yetkili kişi |

**E-posta tahmini yapma.** `ad.soyad@firma.com` tahmini geri dönüş oranını yükseltir, alan adı itibarını bozar. Doğrulanamıyorsa o satırı telefon veya LinkedIn koluna al.

---

## 5. Satır Başına Kişiselleştirme

Her satır için **bir somut detay** üret. Bu, şablonu kişisel yapan tek şeydir.

Ucuz ama gerçek kişiselleştirme kaynakları:
- Web sitesinden bir hizmet/ürün adı ("[X] hizmetinizi görünce…")
- Google yorumlarından tekrar eden bir tema (olumlu olanı kullan)
- İlçe/konum bağlamı ("[İlçe]'de üç rakibiniz zaten…")
- Web sitesinin son güncelleme veya blog tarihi
- Sosyal medyadaki son gönderi

**Kalite kontrolü:** Kişiselleştirme alanını doldurduktan sonra rastgele 10 satırı oku. Herhangi biri başka bir firmaya da uyuyorsa, o alan kişiselleştirme değil dolgu.

**Otomatikleştirme:** Detayları elle toplamak 200 satırda sürdürülemez. Kısa bir betikle web sitelerinin başlık ve `<h1>` etiketlerini çekip sütuna yaz, sonra elden geçir. Uydurulmuş detay her zaman ters teper — betiğin bulamadığı satırı boş bırak ve o satıra segment bazlı genel açı kullan.

---

## 6. Aşamalı Gönderim

| Kural | Değer |
|-------|-------|
| Alan adı başına günlük | 30–50 (ısınmış), yeni alan adında 10'dan başla |
| Aynı firmadaki kişiler | 2 gün arayla, aynı gün değil |
| Gönderim saati | Yerel saatle 08:00–10:00 veya 13:00–15:00 |
| Gün | Salı–Perşembe en yüksek; Pazartesi sabahı ve Cuma öğleden sonra en düşük |
| Dizi | Gün 1 / 3 / 7 / 14 / 30 (bkz. email-templates.md) |

**Hepsini aynı gün gönderme.** 300 e-postalık tek seferlik patlama, alan adını yakar.

---

## 7. Geri İşleme

Excel'e üç sütun ekle: `temas tarihi` · `sonuç` · `ret nedeni`.

20 temastan sonra dur ve bak:
- Yanıt oranı %8'in altındaysa → **konu satırını veya açılış cümlesini** değiştir, listeyi değil
- Yanıt geliyor ama hepsi "ilgilenmiyoruz" ise → **değer önerisi** yanlış
- Hiç açılmıyorsa → **teslim edilebilirlik** sorunu, altyapıya bak (bkz. html-email.md)
- Yanıt iyi ama toplantıya dönmüyorsa → **CTA** fazla yüksek sürtünmeli

Her turda **tek bir değişkeni** değiştir. Aynı anda üç şeyi değiştirirsen hangisinin işe yaradığını asla bilemezsin.

---

## Yasal Not

Türkiye'de ticari elektronik ileti için **İYS (İleti Yönetim Sistemi)** kaydı ve onay yükümlülüğü vardır; AB hedefleri için GDPR, ABD için CAN-SPAM geçerlidir. B2B bire bir iletişim ile toplu ticari ileti arasındaki sınır ülkeye göre değişir.

Bu bir hukuki tavsiye değildir — toplu gönderime başlamadan önce kendi yükümlülüğünü doğrula. Her durumda: gerçek bir gönderici adresi kullan, açık adres bilgisi ver, çıkma talebini **aynı gün** uygula ve talep edenlerin kaydını tut.
