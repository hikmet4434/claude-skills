# Ürün Alanı Keşfi

## Dört Zorunlu Çıktı

Bunlar üretilmeden hiçbir yön önerilmez.

```
1. ALAN            5+ kavram, metafor, kelime
2. RENK DÜNYASI    5+ renk, gerçek dünyadan
3. İMZA            1 öğe, sadece bu ürüne ait
4. REDDEDİLENLER   3 varsayılan + yerine ne geldiği
```

---

## 1. Alan

Bu ürünün dünyasındaki kavramlar. **Özellik listesi değil** — özellikler ürünün ne yaptığını söyler, alan ürünün *nerede yaşadığını* söyler.

| Özellik (yanlış) | Alan (doğru) |
|------------------|--------------|
| Kullanıcı yönetimi | Vardiya, nöbet devri, yetki zinciri |
| Raporlama modülü | Kapanış, mutabakat, denetim izi |
| Stok takibi | Raf ömrü, sayım, fire, sevkiyat |
| Randevu sistemi | Boşluk, çakışma, bekleme listesi |

**Nasıl bulunur:** Bu işi yapan insanlar birbirleriyle konuşurken hangi kelimeleri kullanıyor? Sektörün kendi jargonu ne? Fiziksel karşılığı olan araçlar neler?

---

## 2. Renk Dünyası

**"Sıcak" veya "soğuk" yazma.** Gerçek dünyaya git.

Sorular:
- Bu ürün fiziksel bir mekân olsaydı içine girdiğinde ne görürdün?
- Hangi malzemeler var? (metal, kâğıt, cam, ahşap, kumaş, beton)
- Hangi ışık? (floresan, gün ışığı, ekran parıltısı, sabah, gece)
- Hangi nesneler? (etiket, mühür, kablo, tepsi, cetvel, defter)

Sonra sor: **Bu renklerden hangisi başka hiçbir yerde yeri olmayan ama burada yeri olan?**

**Örnek — restoran mutfak yönetimi:**
```
paslanmaz çelik      #A8AAA6   tezgâh, dolap
alev mavisi          #2B6CA3   ocak alevi
kesme tahtası        #D9C9A8   ahşap
sipariş fişi         #F2EDE4   ince kâğıt
et damgası mürekkebi #6B2737   mor-kırmızı
buzdolabı ışığı      #E8EFF2   soğuk beyaz
```

**Örnek — laboratuvar numune takibi:**
```
numune camı          #DCE6E3   yeşilimsi cam
etiket bandı         #EFE9DC   kraft
reaktif turuncusu    #C4622D   uyarı bandı
soğutucu mavisi      #7A9BB0   -20°C dolap
kalibrasyon siyahı   #1C1E1D   cihaz gövdesi
kâğıt çıktısı        #F7F6F2   termal yazıcı
```

Bu listelerden **bir tanesi** vurgu olur, gerisi yüzey ve metin hiyerarşisine dağılır.

---

## 3. İmza

Yalnızca BU ürüne ait olabilecek **tek** öğe. Üç tipten biri olabilir:

| Tip | Örnek |
|-----|-------|
| **Görsel** | Sipariş fişi dokusunu taşıyan liste satırları · zeminde kalibrasyon ızgarası |
| **Yapısal** | Zaman ekseninin dikey akması (nöbet devri gibi) · listenin vardiyalara bölünmesi |
| **Etkileşimsel** | Satırı "damgalayarak" onaylama · sürükleyerek raf değiştirme |

**Sınama:** İmzayı kaldır. Arayüz hâlâ bu ürüne mi ait, yoksa herhangi bir panoya mı benziyor?

**Aklına gelmiyorsa keşfe devam et.** İmzasız devam etmek, şablon üretmeyi kabul etmektir.

---

## 4. Reddedilen Varsayılanlar

Bu arayüz türü için 3 bariz seçim — **görsel VE yapısal**. Adını koymadığın kalıptan kaçamazsın.

**Pano için tipik varsayılanlar:**
```
Görsel:
  · Üstte 4 eşit metrik kutusu, ikon solda, sayı büyük, etiket küçük
  · Mavi vurgu rengi
  · Her kartın köşesi 12px yuvarlak, ince gri kenarlık
  · Kenar çubuğu koyu, içerik açık

Yapısal:
  · Sol kenar çubuğu 240px, üstte logo, altta profil
  · Metrik şeridi → grafik → tablo sıralaması
  · Her sayfa aynı düzeni tekrarlıyor
  · Filtreler tablonun üstünde yatay şerit
```

**Her varsayılan için "yerine ne" yaz:**
```
Reddedilen: Üstte 4 eşit metrik kutusu
Yerine:     Tek büyük "bugünkü durum" bloğu + altında satır içi
            küçük göstergeler — çünkü bu kullanıcı sabah tek bir
            soruyla geliyor: "bugün ne aksadı?"

Reddedilen: Mavi vurgu
Yerine:     Et damgası morumsu kırmızısı — mutfak dünyasından,
            ve zaten "onaylandı" anlamını taşıyor

Reddedilen: Koyu kenar çubuğu / açık içerik
Yerine:     İkisi de aynı zemin, ayrım tek bir ince kenarlıkla —
            alan bölünmüş hissettirmesin
```

---

## Öneri Şablonu

```
Alan
  [kavram 1] · [kavram 2] · [kavram 3] · [kavram 4] · [kavram 5]

Renk dünyası
  [ad]  #______   [nereden geldiği]
  [ad]  #______   [nereden geldiği]
  ... (5+)

İmza
  [ne] — [neden sadece bu ürüne ait]

Reddedilenler
  [varsayılan 1] → [yerine, gerekçeyle]
  [varsayılan 2] → [yerine, gerekçeyle]
  [varsayılan 3] → [yerine, gerekçeyle]

Yön
  [yukarıdakilere açıkça bağlanan 2-3 cümle]

Bu yön doğru geliyor mu?
```

---

## Öneri Testi

Öneriyi yaz, **ürün adını sil**, oku.

| Sonuç | Anlamı |
|-------|--------|
| Ne için olduğu anlaşılıyor | Keşif çalışmış |
| Herhangi bir panoya uyabilir | Genel — daha derine in |

Yaygın genel ifadeler: "modern ve temiz bir arayüz" · "kullanıcı dostu" · "veri odaklı" · "profesyonel görünüm" · "sezgisel navigasyon". Bunlardan biri önerinde geçiyorsa o cümleyi sil ve yerine somut bir şey yaz.

---

## Doldurulmuş Örnek

```
ÜRÜN: Küçük restoran zinciri için vardiya ve fire takip paneli
KULLANICI: Şube müdürü, sabah 07:30, servis açılmadan önce,
           telefonda, ayakta, 3 dakikası var
GÖREV: Dün gece ne aksadı, bugün kim eksik, hangi ürün fire vermiş
HİS: Sipariş fişi gibi — hızlı taranan, kalabalık ama panik değil

Alan
  vardiya devri · fire · sayım · sevkiyat · prep listesi ·
  mise en place · 86 (tükendi) · ateş hattı

Renk dünyası
  paslanmaz çelik      #A8AAA6  tezgâh
  sipariş fişi         #F2EDE4  termal kâğıt
  et damgası           #6B2737  onay mührü
  alev mavisi          #2B6CA3  ocak
  buzdolabı ışığı      #E8EFF2  soğuk beyaz
  yanık kenar          #3A2E28  tava

İmza
  Liste satırları sipariş fişi ritmini taşıyor: mono etiket solda,
  değer sağda hizalı, satır aralarında kesikli ayırıcı — mutfaktaki
  fişin kendisi. "86" durumu (tükendi) ayrı bir görsel dil alıyor.

Reddedilenler
  4 eşit metrik kutusu → tek "bugün ne aksadı" bloğu + satır içi
    göstergeler; müdürün 3 dakikası var, tek soru soruyor
  Mavi vurgu → et damgası morumsu kırmızısı; zaten "onaylandı" demek
  Koyu kenar çubuğu → aynı zemin + tek ince kenarlık; mutfakta
    "iki ayrı dünya" yok, tek alan var

Yön
  Fiş dokusunda, mono etiketli, hızlı taranan bir liste arayüzü.
  Yüzeyler termal kâğıt tonunda; yapı çelik grisi kenarlıklarla
  kuruluyor. Tek vurgu damga kırmızısı ve sadece onay/aksama
  durumlarında görünüyor.
```
