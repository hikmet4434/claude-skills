---
name: arayuz-tasarimi
description: "Şablon gibi görünmeyen, gerçek bir bakış açısı olan arayüz tasarlar: konuya özel renk paleti, karakterli yazı tipi eşleşmesi, tezi olan bir hero, gerekçelendirilebilir tek bir estetik risk. Kullanıcı şunlardan bahsettiğinde kullan: arayüz tasarımı, UI tasarımı, frontend tasarım, web sitesi tasarla, açılış sayfası tasarla, landing page, sayfa tasarımı, tema, renk paleti seç, yazı tipi seç, font eşleştirme, tipografi, hero bölümü, görsel kimlik, tasarım yönü, mevcut arayüzü yenile, redesign, sayfam şablon gibi duruyor, daha özgün görünsün, tasarım eleştirisi, dark mode, karanlık tema, CSS düzeni, animasyon ve hareket. Gösterge panosu, yönetim paneli, SaaS uygulaması ve ayarlar sayfası için panel-tasarimi skilline bak; hazır artboard'lı görsel tuval için design, Artifact olarak yayınlanacak sayfa için artifact-design, marka sesi ve kurumsal kimlik için brand-guidelines skilline bak."
license: MIT
metadata:
  version: "1.1.0"
  language: tr
---

# Arayüz Tasarımı

Bu işe, her müşterisine başkasınınkiyle karıştırılamayacak bir görsel kimlik veren küçük bir stüdyonun tasarım lideri olarak yaklaş. Bu müşteri şablon kokan teklifleri **zaten reddetti** ve kendine özgü bir bakış açısı için ödüyor.

Renk, tipografi ve düzende bu projeye özgü, görüşlü seçimler yap. Gerekçelendirebileceğin **tek bir gerçek estetik risk** al.

---

## Önce Konuyu Sabitle

Brief ürünün ne olduğunu net söylemiyorsa, tasarıma başlamadan **sen belirle ve yazılı olarak söyle**: somut konu · hedef kitle · sayfanın tek işi. Seçimini bir cümleyle gerekçelendir.

**Ayırt edici seçimlerin kaynağı konunun kendi dünyasıdır** — malzemeleri, araçları, üretim süreci, kendi jargonu. Bir terzilik yazılımının paleti terzihaneden çıkar; bir laboratuvar aracının tipografisi ölçüm cihazından. Genel "modern SaaS" havuzundan değil.

**Mevcut sistem varsa ona saygı göster.** Sırayla bak: `CLAUDE.md` · tasarım token dosyası · mevcut bileşen stilleri · `brand-guidelines` skilli. Varsa uygula; aşağıdaki her şey boşlukları doldurur, mevcut sistemi ezmez.

**Öncelik sırası her zaman:** kullanıcının kendi sözleri → projenin mevcut sistemi → senin seçimlerin.

---

## Kaçınılacak Varsayılanlar

Yapay zekâ üretimi tasarımlar şu an üç görünüm etrafında kümeleniyor. Üçü de bazı briefler için doğru olabilir — ama **konudan bağımsız olarak ortaya çıkıyorlar**, yani seçim değil varsayılanlar:

1. **Sıcak krem zemin** (~`#F4F1EA`) + yüksek kontrastlı serif başlık + toprak/terracotta vurgu
2. **Neredeyse siyah zemin** + tek bir asit yeşili veya parlak vermilyon vurgu
3. **Gazete düzeni** — saç teli çizgiler, sıfır köşe yarıçapı, yoğun sütunlar

Ek olarak sık görülen varsayılanlar: mor–mavi degrade hero · Inter veya Space Grotesk'in "güvenli" tercih olarak seçilmesi · bölüm başlıklarında emoji · her şeyin ortalanması · her yerde `rounded-lg` · yuvarlak kartların solunda vurgu şeridi.

**Kural:** Brief bir görsel yön belirtiyorsa **aynen uygula** — kullanıcının sözü her zaman kazanır, istediği şey bu görünümlerden biri olsa bile. Brief bir ekseni serbest bırakıyorsa, o özgürlüğü bu varsayılanlardan birine harcama.

---

## Süreç

### 1. Tasarım Planı (kod yazmadan önce)

Dört başlıkta kompakt bir token sistemi kur:

**Renk** — 4–6 adlandırılmış hex değeri. Her birinin işi belli olsun.
```
--zemin      #___   ana yüzey
--yuzey      #___   kart, panel
--murekkep   #___   ana metin
--sessiz     #___   ikincil metin
--vurgu      #___   tek vurgu rengi
--cizgi      #___   ayırıcı
```
**Nötr seçilir, miras alınmaz.** Saf orta gri düşünülmemiş durur; vurguya doğru hafif renk eğilimi olan gri seçilmiş durur. Saf beyaz ve neredeyse siyah da uygun zeminlerdir — mesele rengin seçilmiş olmasıdır.

**Tipografi** — en az 2 rol: kısıtlı kullanılan karakterli bir başlık yazı tipi + tamamlayıcı bir gövde yazı tipi. Gerekirse üçüncü olarak veri/etiket için bir yardımcı (tercihen mono).

**Düzen** — tek cümlelik konsept + ASCII tel çerçeve. Karşılaştırma için iki alternatif çiz.

**İmza** — bu sayfanın hatırlanacağı **tek** öğe. Brief'i somutlaştıran, cesaretini harcadığın yer.

### 2. Planı Kendine Karşı Denetle

Kod yazmadan önce planı oku ve sor: *"Bu planın herhangi bir parçası, benzer bir brief için üreteceğim genel varsayılana benziyor mu?"*

Benziyorsa **o parçayı revize et** ve neyi neden değiştirdiğini yaz. Bu adımı atlama — planın özgünlüğünü doğrulamadan koda geçme.

### 3. Kur

Revize edilmiş plana **birebir** uy. Her renk ve yazı tipi kararı plandan türesin; kod yazarken "şurada mavi daha iyi durur" diye plandan sapma.

### 4. Eleştir

İnşa ederken kendi işini eleştir. Ortamın destekliyorsa **ekran görüntüsü al** — bir görsel bin token değerinde.

**Chanel kuralı:** Evden çıkmadan önce aynaya bak ve bir aksesuarı çıkar. Amaca hizmet etmeyen her süsü kaldır.

Detaylı plan şablonu ve ASCII tel çerçeve örnekleri: [references/tasarim-plani.md](references/tasarim-plani.md)

---

## Tasarım İlkeleri

### Hero bir tezdir

Konunun dünyasındaki **en karakteristik şeyle** aç — başlık, görsel, animasyon, canlı demo, etkileşimli bir an; hangisi konuya uyuyorsa.

Küçük bir etiket + devasa bir sayı + degrade vurgu + destekleyici istatistikler: **şablon cevap**. Gerçekten en iyi seçenek buysa kullan, ama seçtiğini bilerek kullan.

Çoğu sayfanın dev bir hero'ya ihtiyacı yoktur. Bir plan, bir memo, bir gösterge paneli — bunlar sakin bir açılışla daha iyi çalışır.

### Tipografi kişiliği taşır

Sayfa tipografi hakkında olmasa bile tipografi sayfayı taşır.

- Başlık ve gövde yazı tiplerini **bilinçli eşleştir** — başka projede kullanacağın aynı aileleri değil
- Bir tip ölçeği belirle ve ondan sapma
- Kasıtlı ağırlık, genişlik ve harf aralığı seç
- Akan metni ~65 karakter genişlikte tut
- Başlıklara `text-wrap: balance`
- Büyük harf etiketlere hafif harf aralığı

Yazı tipi uygulaması içeriğin nötr taşıyıcısı değil, **tasarımın hatırlanan parçası** olsun.

Somut eşleştirme önerileri ve tip ölçeği: [references/tipografi.md](references/tipografi.md)

### Yapı bilgidir

Yapısal öğeler — numaralandırma, üst etiket (eyebrow), ayırıcı, rozet — içeriği süslemek için değil, **içerik hakkında doğru bir şey kodlamak** için vardır.

Numaralı işaretler (01 / 02 / 03) yaygın bir genel tasarım öğesidir, ama sadece içerik **gerçekten bir sıraysa** doğrudur: gerçek bir süreç, okuyucunun sırayı bilmesi gereken bir zaman çizelgesi. Üç bağımsız özelliği numaralamak yalan söyler.

Her yapısal öğeyi kullanmadan önce sor: **bu neyi doğru söylüyor?**

### Hareketi bilinçli kullan

Animasyonun konuya nerede hizmet edeceğini düşün: sayfa yükleme dizisi · kaydırmayla tetiklenen bir açılış · hover mikro etkileşimleri · ortam atmosferi.

**Orkestrasyonlu tek bir an, dağınık efektlerden daha çok iş görür.** Ve bazen az çoktur — fazla animasyon, tasarımın yapay zekâ ürünü olduğu hissini güçlendirir.

`prefers-reduced-motion` her zaman.

### Karmaşıklığı vizyonla eşleştir

Maksimalist bir yön ayrıntılı uygulama ister; minimal bir yön boşluk, tip ve detayda **hassasiyet** ister. Zarafet, seçilen vizyonu iyi uygulamaktır — az öğe kullanmak değil.

### Cesaretini tek yerde harca

İmza öğesi akılda kalan tek şey olsun; etrafındaki her şey sessiz ve disiplinli kalsın. Vurgu zeminle kavga ediyorsa rengi değiştirme — **analog tona kaydır veya doygunluğu düşür**.

**Risk almamak da bir risktir.** Şablon gibi görünmemek, tanımı gereği bir seçim yapmayı gerektirir.

---

## Metin de Tasarım Malzemesidir

Arayüzde kelimelerin tek bir sebebi var: anlaşılmayı ve dolayısıyla kullanılmayı kolaylaştırmak. Metne, boşluğa ve renge gösterdiğin özeni göster.

- **Kullanıcının tarafından yaz.** İnsan *bildirimleri* yönetir, *webhook yapılandırmasını* değil.
- **Etken çatı.** Bir kontrol ne olacağını tam söyler: "Değişiklikleri kaydet", "Gönder" değil.
- **Tutarlı sözlük.** "Yayınla" yazan düğme, "Yayınlandı" diyen bir bildirim üretir. Aynı eylem akış boyunca aynı adı taşır.
- **Hata ve boş durum yönlendirmedir**, ruh hâli değil. Hata ne olduğunu ve nasıl düzeltileceğini söyler; özür dilemez, belirsiz kalmaz. Boş ekran bir davettir.
- **Her öğe tek iş yapsın.** Etiket etiketler, örnek gösterir; hiçbir şey sessizce iki iş yapmaz.
- **Spesifik, zekiden iyidir.**

Örnekler ve düzeltme tablosu: [references/arayuz-metni.md](references/arayuz-metni.md)

---

## Temel Kalite (duyurmadan)

Bunlar övünülecek şeyler değil, olmazsa olmazlar:

- Mobil uyumlu — göreli birimler, flex/grid, `max-width:100%`
- Görünür klavye odağı
- `prefers-reduced-motion` desteği
- Her iki tema (açık/koyu) token düzeyinde kurulu
- Geniş içerik (tablo, kod, diyagram) kendi `overflow-x:auto` kabında
- Rakamların hizalandığı yerde `font-variant-numeric: tabular-nums`
- Kapatılmamış etiket, tırnaksız öznitelik yok

**CSS'te dikkat:** Seçici özgüllüklerini yapılandır. Birbirini sessizce iptal eden sınıflar üretmek kolaydır — tür tabanlı `.section` ile öğe tabanlı `.cta` bölümler arası dolgu ve kenar boşluğu üzerinde kavga eder. Kardeş grupları `gap` ile aralıkla, öğe başına marjla değil.

Tema kurulumu, CSS tuzakları ve erişilebilirlik detayları: [references/uygulama.md](references/uygulama.md)

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| Planı atlayıp koda başlamak | Varsayılana savrulur | Önce 4 başlıklı plan |
| Planı denetlememek | Şablon fark edilmeden geçer | "Bu genel varsayılan mı?" sorusu |
| Cesareti üç yere dağıtmak | Hiçbiri akılda kalmaz | Tek imza öğesi |
| Konuya değil kategoriye tasarlamak | Her SaaS gibi görünür | Konunun kendi dünyasından türet |
| Anlamsız numaralandırma | Yapı yalan söyler | Sıra gerçekse numarala |
| Fazla animasyon | Yapay zekâ ürünü hissi | Tek orkestrasyonlu an |
| Rengi sadece medya sorgusunda tanımlamak | Sistem temasında okunmaz sayfa | Token'ı bare `:root`'ta tanımla |
| Lorem ipsum | Düzen gerçek içerikle çöker | Baştan gerçek metin |

---

## Çıktı

Tasarımı sunarken kısa bir not ekle:

1. **Konu ve tek iş** — ne için tasarlandı
2. **Token sistemi** — renk (hex), yazı tipleri, ölçek
3. **İmza öğesi** — ne ve neden
4. **Aldığın risk** — ve gerekçesi
5. **Denetimde değiştirdiğin şey** — planın hangi parçası varsayılan görünüyordu, ne yaptın

Sonra sor: **"İmza öğesini mi değiştireyim, paleti mi, yoksa daha sakin bir yön mü deneyeyim?"**

---

## İlgili Skiller

- **artifact-design** — Artifact olarak yayınlanacak sayfalar için (temalar, CSP, yayın mekaniği)
- **design** — çok artboard'lı görsel tuval, elle düzenlenebilir mockup
- **theme-factory** — tema ve token üretimi
- **brand-guidelines** — marka sesi ve kurumsal görsel kimlik
- **dataviz** — grafik, pano ve veri görselleştirme
- **panel-tasarimi** — pano, yönetim paneli, SaaS uygulaması ve ayarlar ekranları
- **web-artifacts-builder** — etkileşimli web bileşeni kurma
- **icerik-taslagi** — sayfanın pazarlama metni
