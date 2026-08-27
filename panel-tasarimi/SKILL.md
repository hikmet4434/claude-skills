---
name: panel-tasarimi
description: "Gösterge panosu, yönetim paneli, SaaS uygulaması, ayarlar sayfası ve veri arayüzü tasarlar; ürünün kendi dünyasından çıkan, şablon gibi durmayan arayüzler. Kullanıcı şunlardan bahsettiğinde kullan: gösterge paneli, dashboard tasarla, yönetim paneli, admin panel, SaaS uygulaması, uygulama arayüzü, ayarlar sayfası, settings sayfası, veri tablosu arayüzü, metrik kartı, kenar çubuğu, sidebar, navigasyon paneli, konsol arayüzü, iç araç, internal tool, CRUD arayüzü, form ekranı, yükseklik ve katmanlama, elevation, tasarım token'ı, design token, koyu mod paneli, bileşen durumları, boş durum, panelim şablon gibi duruyor. Açılış sayfası, pazarlama sitesi ve kampanya sayfası için arayuz-tasarimi skilline bak; Artifact olarak yayınlanacak sayfa için artifact-design, grafik ve veri görselleştirme için dataviz skilline bak."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---

# Panel Tasarımı

Gösterge panosu, yönetim paneli ve uygulama arayüzlerini zanaatla kur.

**Kapsam:** Panolar · yönetim panelleri · SaaS uygulamaları · araçlar · ayarlar sayfaları · veri arayüzleri.
**Kapsam dışı:** Açılış sayfaları, pazarlama siteleri, kampanyalar → `arayuz-tasarimi` skilline geç.

---

## Sorun

Genel çıktı üreteceksin. Eğitiminde binlerce pano gördün, kalıplar derin oturmuş.

Aşağıdaki süreci baştan sona uygulayabilir — alanı keşfeder, imza belirler, niyeti yazarsın — ve **yine de şablon üretebilirsin.** Soğuk yapıda sıcak renkler. Genel düzende samimi yazı tipi. Diğer her uygulamaya benzeyen bir "mutfak hissi".

Çünkü niyet metinde yaşar, kod üretimi kalıptan beslenir. Aradaki boşlukta varsayılan kazanır.

Süreç yardım eder ama tek başına ustalık getirmez. **Kendini denetlemen gerekir.**

---

## Varsayılanlar Nerede Saklanır

Varsayılanlar kendini belli etmez. Altyapı kılığına girer — tasarlanması değil sadece çalışması gereken parçalar gibi görünür.

**Tipografi bir kap gibi hissettirir.** Okunur bir şey seç, geç. Ama tipografi tasarımını *tutmaz*, tasarımın *kendisidir*. Başlığın ağırlığı, etiketin kişiliği, paragrafın dokusu — kimse tek kelime okumadan ürünün nasıl hissettirdiğini bunlar belirler. Bir fırın yönetim aracı ile bir işlem terminali ikisi de "temiz, okunur yazı tipi" isteyebilir; ama sıcak ve el yapımı olan, soğuk ve kesin olanla aynı değildir. **Her zamanki yazı tipini kullanıyorsan tasarım yapmıyorsun.**

**Navigasyon iskele gibi hissettirir.** Kenar çubuğunu kur, bağlantıları koy, asıl işe geç. Ama navigasyon ürünün *etrafında* değil, ürünün *kendisidir*. Neredesin, nereye gidebilirsin — en çok bu önemlidir. Boşlukta yüzen bir sayfa yazılım değil, bileşen demosudur. Navigasyon insanlara içinde bulundukları alanı nasıl düşüneceklerini öğretir.

**Veri sunum gibi hissettirir.** Rakamların var, rakamları göster. Ama ekrandaki bir rakam tasarım değildir. Soru şu: **bu rakam ona bakan kişi için ne anlama geliyor, onunla ne yapacak?** Bir ilerleme halkası ile üst üste dizilmiş bir etiket ikisi de "10 üzerinden 3" gösterir; biri hikâye anlatır, diğeri boşluk doldurur. **Etiketin üstüne rakam koymaya çalışıyorsan tasarım yapmıyorsun.**

**Token adları uygulama detayı gibi hissettirir.** Ama CSS değişkenlerin tasarım kararlarıdır. `--murekkep` ve `--kagit` bir dünya çağırır. `--gray-700` ve `--surface-2` bir şablon çağırır. **Sadece token'larını okuyan biri bunun hangi ürün olduğunu tahmin edebilmeli.**

Tuzak, bazı kararların yaratıcı bazılarının yapısal olduğunu sanmaktır. **Yapısal karar diye bir şey yoktur.** Her şey tasarımdır. "Neden bu?" diye sormayı bıraktığın anda varsayılan devreye girer.

---

## Önce Niyet

Kod yazmadan önce bunları cevapla — kafandan değil, **yazılı olarak**.

**Bu insan kim?**
"Kullanıcılar" değil, gerçek kişi. Bunu açtığında nerede? Aklından ne geçiyor? 5 dakika önce ne yaptı, 5 dakika sonra ne yapacak? Sabah 7'de kahvesiyle oturan bir öğretmen, gece yarısı hata ayıklayan bir geliştirici ya da iki yatırımcı toplantısı arasındaki bir kurucu — aynı insan değil. Onun dünyası arayüzü şekillendirir.

**Ne başarması gerekiyor?**
"Panoyu kullan" değil — fiil kullan. *Bu gönderileri değerlendir. Bozuk dağıtımı bul. Ödemeyi onayla.* Cevap neyin öne çıkacağını, neyin arkadan geleceğini, neyin gizleneceğini belirler.

**Nasıl hissettirmeli?**
Anlamı olan kelimelerle. "Temiz ve modern" hiçbir şey demek değildir; her yapay zekâ bunu söyler. Defter gibi sıcak mı? Terminal gibi soğuk mu? Borsa salonu gibi yoğun mu? Okuma uygulaması gibi sakin mi? Cevap rengi, yazı tipini, boşluğu, yoğunluğu — hepsini şekillendirir.

**Bu üçüne somut cevap veremiyorsan dur ve kullanıcıya sor.** Tahmin etme, varsayılana düşme.

### Her Seçim Bir Seçim Olmalı

Her karar için **neden**ini söyleyebilmelisin: neden bu düzen · neden bu renk sıcaklığı · neden bu yazı tipi · neden bu aralık ölçeği · neden bu bilgi hiyerarşisi.

Cevabın "yaygın", "temiz" veya "işe yarıyor" ise seçim yapmadın — varsayılanı aldın. Varsayılanlar görünmezdir; görünmez seçimler birikip genel bir sonuç üretir.

### Niyet Sistematik Olmalı

"Sıcak" deyip soğuk renk kullanmak sözü tutmamaktır. Niyet bir etiket değil, **her kararı bağlayan bir kısıt**.

Niyet sıcaksa: yüzeyler, metin, kenarlıklar, vurgular, anlamsal renkler, tipografi — hepsi sıcak. Niyet yoğunsa: boşluk, yazı boyutu, bilgi mimarisi — hepsi yoğun. Niyet sakinse: hareket, kontrast, doygunluk — hepsi sakin.

Çıktını yazdığın niyetle karşılaştır: **her token bunu destekliyor mu, yoksa niyeti yazıp varsayılanı mı kurdun?**

---

## Ürün Alanı Keşfi

Varsayılanın yakalanıp yakalanmadığı burada belli olur.

```
Genel çıktı:      Görev türü → Görsel şablon → Tema
Yaratılan çıktı:  Görev türü → Ürün alanı → İmza → Yapı + İfade
```

Fark: görsel veya yapısal düşünmeden **önce** ürünün dünyasında geçirilen zaman.

### Dört Zorunlu Çıktı

**Dördü de üretilmeden hiçbir yön önerme.**

1. **Alan** — Bu ürünün dünyasındaki kavramlar, metaforlar, kelime dağarcığı. Özellikler değil, alan. **En az 5.**
2. **Renk dünyası** — Bu alanda doğal olarak hangi renkler bulunur? "Sıcak/soğuk" değil — gerçek dünyaya git. Bu ürün fiziksel bir mekân olsaydı ne görürdün? Hangi malzemeler, hangi ışık, hangi nesneler? Başka hiçbir yerde yeri olmayan ama orada yeri olan renkler. **En az 5.**
3. **İmza** — Yalnızca BU ürüne ait olabilecek tek bir öğe: görsel, yapısal veya etkileşimsel. Aklına bir şey gelmiyorsa keşfe devam et.
4. **Reddedilen varsayılanlar** — Bu arayüz türü için 3 bariz seçim; **görsel ve yapısal**. Adını koymadığın kalıptan kaçamazsın.

### Öneri Testi

Önerini yaz, sonra **ürün adını sil**. Biri bunun ne için olduğunu anlayabiliyor mu? Anlayamıyorsa genel bir şey yazmışsın — daha derine in.

Keşif şablonu ve doldurulmuş örnek: [references/kesif.md](references/kesif.md)

---

## Bileşen Yazmadan Önce

Her arayüz kodu yazışında — küçük eklemeler dahil — şunu belirt:

```
Niyet:      [bu insan kim, ne yapmalı, nasıl hissetmeli]
Palet:      [keşiften çıkan renkler ve neden bu ürünün dünyasına ait]
Derinlik:   [kenarlık / gölge / katman — ve neden bu niyete uygun]
Yüzeyler:   [yükseklik ölçeği ve renk sıcaklığının nedeni]
Tipografi:  [yazı tipi ve neden amaca uygun]
Aralık:     [temel birim]
```

Bu kontrol noktası **zorunlu**. Her teknik seçimi niyete bağlar. Bir seçimin nedenini söyleyemiyorsan varsayılanı kullanıyorsun — dur ve düşün.

---

## Zanaatın Temeli: İnce Katmanlama

Yön, ürün türü veya görsel stil ne olursa olsun bu ilke her şeye uygulanır. **Sistemin çalıştığını neredeyse hiç fark etmemelisin.** İyi bir panoya bakınca "ne güzel kenarlıklar" diye düşünmezsin — sadece yapıyı anlarsın. Zanaat görünmezdir; çalıştığını bu yüzden anlarsın.

### Yüzey Yüksekliği

Yüzeyler üst üste yığılır: açılır menü, kartın üstünde; kart, sayfanın üstünde. Numaralı bir sistem kur — taban, sonra artan seviyeler. Koyu modda yüksek yükseklik = biraz daha açık. Açık modda biraz daha açık veya gölge.

**Her sıçrama yalnızca birkaç yüzde puanlık açıklık farkı olmalı.** Tek başına bakınca farkı göremezsin. Ama yüzeyler üst üste gelince hiyerarşi belirir. Görülen değil, **hissedilen** fısıltı kadar sessiz geçişler.

**Üç kritik karar:**

- **Kenar çubuğu tuvalle aynı arka planı alır**, farklı değil. Farklı renk görsel alanı "kenar çubuğu dünyası" ve "içerik dünyası" diye böler. İnce bir kenarlık yeterli ayrımı sağlar.
- **Açılır menü, ana yüzeyinin bir seviye üstündedir.** İkisi aynı seviyedeyse menü karta karışır ve katmanlama kaybolur.
- **Girdi alanları çevresinden biraz daha koyu**, daha açık değil. Girdiler "iç içe geçmiştir" — içerik alırlar. Koyu arka plan, kalın kenarlık olmadan "buraya yaz" der.

### Kenarlıklar

Kenarlık aranmadığında kaybolmalı, yapıya ihtiyaç duyulduğunda bulunabilmeli. **Düşük opaklıkta RGBA** arka planla karışır ve dikkat çekmeden kenarı tanımlar; düz hex kenarlık sert durur.

Bir ilerleme kur — tüm kenarlıklar eşit değildir: standart ayrım · daha yumuşak ayrım · vurgu kenarlığı · odak halkası için maksimum vurgu. Yoğunluğu önemle eşle.

Sayısal ölçekler, koyu/açık mod değerleri ve kod: [references/katmanlama.md](references/katmanlama.md)

---

## Sonsuz İfade

Her kalıbın sonsuz ifadesi vardır. **Hiçbir arayüz aynı görünmemeli.**

Bir metrik: ana sayı · satır içi istatistik · mini grafik · gösterge · ilerleme çubuğu · karşılaştırma farkı · trend rozeti · ya da tamamen yeni bir şey. Bir pano yoğunluğu, boşluğu, hiyerarşiyi veya akışı tamamen farklı vurgulayabilir. Kenar çubuğu + kartlar bile oran, aralık ve vurguda sonsuz varyasyona sahiptir.

**İnşadan önce sor:** Kullanıcılar burada en çok ne yapıyor? · Benzer sorunu mükemmel çözen ürünler hangileri, onlar nasıl çözmüş? · Bu arayüz neden şablon değil de amaca özel duruyor?

**Asla aynı çıktıyı üretme.** Her seferinde aynı kenar çubuğu genişliği, aynı kart ızgarası, "ikon solda–sayı büyük–etiket küçük" formatındaki aynı metrik kutuları — bu, yapay zekâ ürünü olduğunu anında gösterir ve unutulur.

Mimari ve bileşenler **görevden ve veriden** doğmalı. Aynı kavramlar, sonsuz ifadeler.

---

## Renk Bir Yerde Yaşar

Her ürün bir dünyada var olur ve o dünyanın renkleri vardır.

Palete uzanmadan önce ürünün dünyasında zaman geçir. Bu mekânın fiziksel hâline girsen ne görürdün — hangi malzemeler, hangi ışık, hangi nesneler? **Paletin bir yerden gelmiş gibi hissettirmeli, bir şeye uygulanmış gibi değil.**

**Sıcak/soğuğun ötesi:** Sıcaklık tek eksendir. Sessiz mi gürültülü mü? Yoğun mu ferah mı? Ciddi mi oyuncu mu? Geometrik mi organik mi? Bir işlem terminali ve bir meditasyon uygulaması ikisi de "odaklı"dır — tamamen farklı odak türleri. Genel etiketi değil, **belirli niteliği** bul.

**Renk anlam taşır:** Gri yapı kurar. Renk iletişim kurar — durum, eylem, vurgu, kimlik. Amaçsız renk gürültüdür. **Amaçlı tek bir vurgu rengi, düşünülmemiş beş renkten iyidir.**

---

## Token Mimarisi

Arayüzdeki her renk küçük bir temel kümeye dayanır: ön plan (metin hiyerarşisi) · arka plan (yüzey yüksekliği) · kenarlık (ayrım hiyerarşisi) · marka · anlamsal (yıkıcı, uyarı, başarı). **Rastgele hex yok** — her şey bir temele karşılık gelir.

**Metin hiyerarşisi dört seviye:** birincil (varsayılan metin) · ikincil (destekleyici) · üçüncül (meta veri) · sessiz (devre dışı, yer tutucu). Dördünü de tutarlı kullan. **Sadece ikisini kullanıyorsan hiyerarşin çok düz.**

**Kontrol token'ları ayrı olsun.** Form kontrollerinin özel ihtiyaçları var; yüzey token'larını yeniden kullanma. Kontrol arka planı, kontrol kenarlığı ve odak durumu için ayrı token kur — böylece etkileşimli öğeleri düzen yüzeylerinden bağımsız ayarlarsın.

Token yapısı, adlandırma ve boşluk ölçeği: [references/token-mimarisi.md](references/token-mimarisi.md)

---

## Bileşen İlkeleri

**Derinlik** — Tek yaklaşım seç ve ona bağlı kal: sadece kenarlık (temiz, teknik — yoğun araçlar) · hafif gölge (yumuşak — tüketici ürünleri) · katmanlı gölge (boyutlu — öne çıkan kartlar) · yüzey renk kaymaları (gölgesiz hiyerarşi). **Karıştırma.**

**Kenar yarıçapı** — Keskin teknik, yuvarlak samimi hissettirir. Ölçek kur: küçük (girdi, düğme) · orta (kart) · büyük (modal). Rastgele karıştırma.

**Kartlar** — Metrik kartı, plan kartı ve ayar kartı **birbirine benzemek zorunda değil**. Her kartın iç yapısını içeriğine göre tasarla, ama yüzey işlemini sabit tut: aynı kenar kalınlığı, gölge derinliği, köşe yarıçapı, dolgu ölçeği.

**Kontroller** — Yerel `<select>` ve `<input type="date">` işletim sistemine ait, stil verilemeyen öğeler üretir. Özel bileşen kur: konumlandırılmış açılır menü, takvim, stillendirilmiş durum yönetimi.

**İkonografi** — İkon açıklar, süslemez. Kaldırınca anlam kaybolmuyorsa kaldır. Tek set seç ve ona bağlı kal.

**Durumlar** — Her etkileşimli öğe: varsayılan · hover · aktif · odak · devre dışı. Her veri: yükleniyor · boş · hata. **Eksik durum, sistemin çalışmadığı hissini verir.**

**Animasyon** — Hızlı mikro etkileşim, yumuşak geçiş. Büyük geçişler biraz uzun. Yavaşlayan eğri. **Profesyonel arayüzde zıplama/yaylanma yok.**

**Koyu mod** — Gölgeler koyu zeminde görünmez; ayrım için kenarlığa güven. Anlamsal renkler genelde doygunluk düşürmeli. Hiyerarşi sistemi aynı kalır, değerler tersine döner.

Kod örnekleri, durum tabloları ve navigasyon kalıpları: [references/bilesenler.md](references/bilesenler.md)

---

## Göstermeden Önce: Dört Test

**Kullanıcıya göstermeden önce ne yaptığına bak.** Sor: *"Biri 'bu işte zanaat yok' dese ne demek isterdi?"* Aklına ilk geleni önce hallet.

İlk çıktın muhtemelen geneldir. Bu normal. Amaç, kullanıcı müdahale etmeden önce bunu **senin** yakalaman.

| Test | Nasıl | Başarısızsa |
|------|-------|-------------|
| **Değiştirme** | Yazı tipini her zamankiyle değiştir — fark eden olur mu? Düzeni standart pano şablonuyla değiştir — farklı hissettirir mi? | Fark yaratmayan yer, varsayılana düştüğün yerdir |
| **Göz kısma** | Gözlerini kıs. Hiyerarşiyi hâlâ algılıyor musun? Bir şey göze batıyor mu? | Keskin çizgi veya rahatsız renk sıçraması varsa katmanlamayı yumuşat |
| **İmza** | İmzanın göründüğü **beş somut bileşeni** gösterebiliyor musun? | "Genel izlenim" cevabı yeterli değil — bulamadığın imza yoktur |
| **Token** | CSS değişkenlerini sesli oku. Bu ürünün dünyasına mı ait, herhangi bir projeye mi? | `--gray-700` varsa yeniden adlandır |

**Herhangi biri başarısızsa göstermeden önce tekrarla.**

Eleştiri protokolü ve `system.md` yönetimi: [references/denetim.md](references/denetim.md)

---

## Kaçınılacaklar

| Hata | Neden |
|------|-------|
| Sert kenarlıklar | İlk gördüğün şey kenarlıksa çok serttir |
| Ani yüzey sıçramaları | Yükseklik değişimi fısıltı kadar sessiz olmalı |
| Tutarsız aralık | Sistem olmadığının en açık işareti |
| Karışık derinlik stratejisi | Bir yaklaşım seç |
| Eksik etkileşim durumu | Hover, odak, devre dışı, yükleniyor, hata |
| Gösterişli gölge | Gölge incelikli olmalı, dikkat çekici değil |
| Küçük öğede büyük yarıçap | Orantısız |
| Renkli zemin üzerinde bembeyaz kart | Sert |
| Kalın dekoratif kenarlık | Süs |
| Dekorasyonda degrade ve renk | Renk anlam taşımalı |
| Birden çok vurgu rengi | Odağı dağıtır |
| Farklı yüzeyler için farklı ton | Aynı tonu koru, sadece açıklığı değiştir |
| Boşlukta yüzen tablo | Ürün değil, bileşen demosu |

---

## İş Akışı

**İletişimde görünmez ol.** Mod duyurma, süreç anlatma. "Kurulum modundayım", "Şu dosyayı kontrol edeyim…" deme. Doğrudan işe gir; gerekçeni belirterek öneriyi sun.

**Projede `.panel-tasarimi/system.md` varsa:** oku ve uygula. Kararlar alınmış.

**Yoksa:**
```
1. KEŞFET     Dört zorunlu çıktıyı üret
2. ÖNER       Yön dördüne de açıkça atıf yapsın
3. ONAYLAT    "Bu yön doğru geliyor mu?"
4. KUR        İlkeleri uygula
5. DENETLE    Dört testi çalıştır — göstermeden önce
6. KAYDET     Kalıpları saklamayı teklif et
```

**Öneri biçimi:**
```
Alan:      [ürünün dünyasından 5+ kavram]
Renk dünyası: [bu alanda var olan 5+ renk]
İmza:      [bu ürüne özgü tek öğe]
Reddedilen: [varsayılan 1] → [yerine], [varsayılan 2] → [yerine], [varsayılan 3] → [yerine]
Yön:       [yukarıdakilere bağlanan yaklaşım]

Bu yön doğru geliyor mu?
```

**Görev bitince her zaman kaydetmeyi teklif et:** *"Bu kalıpları sonraki oturumlar için kaydedeyim mi?"* Evet ise `.panel-tasarimi/system.md` dosyasına yön ve his · derinlik stratejisi · aralık temel birimi · temel bileşen kalıpları yazılır.

**Ne kaydedilir:** 2+ kez kullanılan bileşen · proje genelinde yeniden kullanılabilir kalıp · hatırlanmaya değer belirli ölçüler.
**Ne kaydedilmez:** tek seferlik bileşen · geçici deneme · prop ile çözülebilecek varyasyon.

---

## İlgili Skiller

- **arayuz-tasarimi** — açılış sayfası, pazarlama sitesi, kampanya
- **dataviz** — grafik, sparkline, KPI kutusu, renk paleti doğrulama
- **artifact-design** — Artifact olarak yayınlanacak sayfalar
- **theme-factory** — tema ve token üretimi
- **design** — elle düzenlenebilir çok artboard'lı tuval
