# URL Geçişi ve 301 Yönlendirme

Yeniden yapılandırmanın en riskli kısmı burasıdır. Yapı ne kadar iyi olursa olsun, yönlendirmeler eksikse trafik kaybedilir.

---

## Sıra

```
1. ENVANTER      Mevcut tüm URL'leri ve trafiklerini çıkar
2. EŞLEŞTİR      Her eski URL için yeni karşılığını belirle
3. HARİTALA      301 yönlendirme tablosunu yaz
4. TEST          Yayına almadan önce staging'de doğrula
5. YAYINLA       Yapı ve yönlendirmeler AYNI ANDA
6. İZLE          4-8 hafta yakın takip
```

**Kural:** Yeni yapı ile yönlendirmeler aynı anda yayınlanır. Arada bir saat bile boşluk olsa o saatte gelen her ziyaretçi 404 görür ve tarayıcı 404'leri kaydeder.

---

## 1. Envanter

Toplaman gerekenler:

| Kaynak | Ne verir |
|--------|----------|
| XML site haritası | Yayındaki URL listesi |
| Search Console | Gösterim ve tıklama alan URL'ler |
| Analytics | Trafik alan URL'ler (site haritasında olmayanlar dahil) |
| Sunucu logları | Gerçekten istenen her URL |
| Tarayıcı (crawler) | İç bağlantıyla ulaşılabilen her sayfa |
| Backlink aracı | **Dışarıdan bağlantı alan URL'ler — en kritik liste** |

**En sık yapılan hata:** Sadece site haritasını almak. Site haritasında olmayan ama backlink alan eski bir sayfa varsa ve yönlendirilmezse, o bağlantı değeri tamamen kaybolur.

Tabloya dök:
```
eski_url | aylik_trafik | backlink_sayisi | sayfa_tipi | karar
```

---

## 2. Eşleştirme Kararları

| Durum | Karar |
|-------|-------|
| Sayfa yeni URL'e taşınıyor | 301 → yeni URL |
| Sayfa başka bir sayfayla birleşiyor | 301 → birleştirilen sayfa |
| Sayfa kaldırılıyor, muadili var | 301 → en yakın muadil |
| Sayfa kaldırılıyor, muadili yok, trafik yok | 410 (Gone) |
| Sayfa kaldırılıyor ama backlink var | 301 → üst kategori sayfası |
| URL aynı kalıyor | Dokunma |

**Alakasız yönlendirme yapma.** Silinen bir ürün sayfasını ana sayfaya yönlendirmek "yumuşak 404" sayılır ve değer taşımaz — o ürünün kategorisine yönlendir.

**410 ne zaman:** Gerçekten kalıcı olarak yok olan, muadili olmayan, trafiği ve backlinki olmayan sayfa. 410 arama motoruna "bunu indeksten çıkar" der ve tarama bütçesini korur.

---

## 3. Yönlendirme Haritası

```
eski_url                              yeni_url                        tip
/urunler/analitik                     /ozellikler/analitik            301
/product/automation                   /ozellikler/otomasyon           301
/blog/2024/01/15/seo-yazisi          /blog/seo-yazisi                301
/hakkimizda.html                      /hakkinda                        301
/eski-kampanya                        /kampanyalar                     301
/kaldirilmis-urun-2019                —                                410
```

### Kalıp Bazlı Yönlendirme

Tek tek yazmak yerine desen kullan (sunucuya göre sözdizimi değişir):

```
# Tarihli blog URL'lerini düzleştir
/blog/YYYY/MM/DD/{slug}  →  /blog/{slug}

# Eski bölüm adını değiştir
/urunler/{slug}          →  /ozellikler/{slug}

# .html uzantısını kaldır
/{sayfa}.html            →  /{sayfa}
```

**Uyarı:** Desen yönlendirmelerini mutlaka test et — tek bir hatalı desen yüzlerce URL'i yanlış yere gönderir.

---

## 4. Zincir ve Döngü

**Zincir:** `A → B → C`. Her adım değer kaybettirir ve tarayıcı belirli bir zincir derinliğinden sonra takibi bırakır.
**Çözüm:** Her eski URL **doğrudan** son hedefe gitsin — `A → C`, `B → C`.

**Döngü:** `A → B → A`. Sayfa hiç açılmaz.
**Çözüm:** Yayın öncesi haritayı otomatik kontrol et.

**Eski yönlendirmeleri koruyun.** İki yıl önceki geçişin yönlendirmeleri hâlâ duruyorsa, yeni geçişte onları da güncelle — yoksa zincir uzar.

---

## 5. Yayın Öncesi Test

- [ ] Her eski URL haritada var (envanter listesiyle karşılaştır)
- [ ] Hiçbir yönlendirme 404'e gitmiyor
- [ ] Zincir yok (her yönlendirme tek adım)
- [ ] Döngü yok
- [ ] 301 kullanılıyor (302 geçicidir, değer aktarmaz)
- [ ] Büyük/küçük harf yönlendirmesi çalışıyor
- [ ] Sondaki eğik çizgi tutarlı ve yönlendirmeli
- [ ] HTTPS ve www tercihi tek yönlendirmede çözülüyor
- [ ] Yeni XML site haritası hazır
- [ ] Yeni yapıda iç bağlantılar **yeni URL'lere** işaret ediyor (eski URL'e bağlantı = gereksiz yönlendirme)

**En sık atlanan madde sonuncusu:** İç bağlantılar eski URL'de kalırsa her tıklama bir yönlendirmeden geçer; site yavaşlar ve tarama bütçesi boşa gider.

---

## 6. Yayın Sonrası İzleme

### İlk 48 saat
- Search Console **tarama hataları** — 404 patlaması var mı
- Analytics **trafik** — %20'den fazla ani düşüş varsa yönlendirme eksiği ara
- Sunucu logları — hangi URL'ler 404 dönüyor

### İlk 4 hafta
- İndekslenme: yeni URL'ler indekse giriyor, eskiler çıkıyor mu
- Sıralama: kilit sorgularda pozisyon takibi
- Search Console'da yeni site haritasını gönder

### Beklenen davranış
Geçiş sonrası **2–6 hafta geçici sıralama dalgalanması normaldir**. Panikleyip yapıyı geri almak, ikinci bir geçiş demektir ve zararı ikiye katlar. Yönlendirmeler doğruysa bekle.

**Ne normal değil:** trafiğin yarıdan fazlasının kaybı · 404 sayısının sürekli artması · yeni URL'lerin 4 haftada indekslenmemesi. Bunlardan biri varsa yönlendirme haritasında eksik var.

---

## Hızlı Karar Tablosu

| Soru | Cevap |
|------|-------|
| 301 mi 302 mi? | Kalıcı değişimde **her zaman 301** |
| Ana sayfaya toplu yönlendirme? | Hayır — alakasız yönlendirme değer taşımaz |
| Yönlendirmeler ne kadar kalmalı? | En az 1 yıl, mümkünse süresiz |
| Sadece URL'i güzelleştirmek için değiştireyim mi? | Hayır. Mevcut URL çalışıyorsa dokunma — kazanç riski karşılamaz |
| Aynı anda hem yapı hem tasarım değişsin mi? | Tercihen hayır — sorun çıkarsa hangisinden geldiğini ayırt edemezsin |
