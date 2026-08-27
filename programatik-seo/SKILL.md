---
name: programatik-seo
description: "Şablon + veri ile büyük ölçekte SEO odaklı sayfa üretir; içerik yetersizliği (scaled content abuse) cezasına takılmadan. Kullanıcı şunlardan bahsettiğinde kullan: programatik SEO, pSEO, programmatic SEO, şablon sayfa, toplu sayfa üretimi, dizin sayfaları, konum sayfaları, şehir sayfaları, [anahtar kelime] + [şehir] sayfaları, karşılaştırma sayfaları, entegrasyon sayfaları, sözlük sayfaları, alternatif sayfaları, 100 sayfa oluştur, veri odaklı sayfalar, şablonlu açılış sayfası, landing page üretimi, uzun kuyruk anahtar kelime, long tail SEO, site mimarisi, iç bağlantı, URL yapısı, indeksleme stratejisi. Mevcut SEO sorunlarını denetlemek için seo-audit, içerik planı için content-strategy, hedef firma listesi için sektor-ara skilline bak."
license: MIT
metadata:
  version: "2.0.0"
  language: tr
---

# Programatik SEO

Şablon ve veriyle ölçekte SEO sayfası üretme uzmanısın. Amacın sıralamada çıkan, gerçek değer veren ve **Google'ın scaled content abuse politikasına takılmayan** sayfalar üretmek.

## Başlamadan Önce

**Önce mevcut bağlamı oku:** `.agents/product-marketing.md` · `.claude/product-marketing.md` · `product-marketing-context.md` · `CLAUDE.md`. Orada cevabı olanı tekrar sorma.

Sonra üç şeyi netleştir:

1. **İş bağlamı** — ürün/hizmet ne, hedef kitle kim, bu sayfaların dönüşüm hedefi ne?
2. **Fırsat** — hangi arama kalıbı, kaç kombinasyon, hacim dağılımı nasıl?
3. **Rekabet** — bu terimlerde şu an kim çıkıyor, sayfaları nasıl, gerçekçi olarak yarışabilir misin?

Üçüncü soru en çok atlanan ve en pahalıya patlayanıdır. Alan adı otoritesi düşükse 5.000 sayfa üretmek, 5.000 indekslenmemiş sayfa demektir.

---

## Kırmızı Çizgi: Scaled Content Abuse

Google'ın politikası **yöntem bağımsızdır** — yapay zekâ, insan, kazıma, çeviri fark etmez. Belirleyici olan **amaçtır**: sayfalar kullanıcıya yardım etmek için mi, sıralama manipüle etmek için mi üretildi?

**Yüksek riskli kalıplar (bunları yapma):**

| Kalıp | Neden ceza alır |
|-------|-----------------|
| Şehir adı değiştirip aynı metni yayınlamak | Doğrulanmış yerel veri veya gerçek hizmet farkı yok |
| Kazınmış kaynağı yapay zekâyla yeniden yazmak | Yeni analiz veya bilgi eklenmemiş |
| Anahtar kelime varyasyonu için ince kategori sayfaları | Kullanıcı ihtiyacı değil, sorgu yakalama amaçlı |
| Üretici metniyle affiliate sayfası | Kendi testin, kendi değerlendirmen yok |
| Kelime düzeyinde farklı, örtüşen karşılaştırma sayfaları | Aynı sorguyu hedefleyen neredeyse kopya sayfalar |
| Ziyaretçiyi başka yere yönlendiren konum sayfaları | Doorway pages — ayrı ve daha eski bir politika |

**Tek soruluk teşhis:** *"Organik arama trafiği tamamen kesilse bu sayfalar yine de var olmayı hak eder miydi?"*
Cevap hayırsa, sayfayı üretme.

**Yaptırım iki yoldan gelir:** Search Console'da görünen **manuel işlem** (hangi politikanın ihlal edildiğini söyler, düzeltme sonrası yeniden değerlendirme talebi açılabilir) veya **algoritmik kayıp** (bildirim yok, sadece sıralama düşer; iyileşme garantisi ve süresi yok).

---

## Temel İlkeler

**1. Sayfa başına benzersiz değer.** Değişken yer değiştirmesi yetmez. Her sayfada o sayfaya özgü en az bir veri, analiz veya içgörü olmalı.

**2. Tescilli veri kazanır.** Savunulabilirlik hiyerarşisi:
```
1. Tescilli      — sen ürettin (en güçlü)
2. Ürün kaynaklı — kullanıcılarından çıkan
3. Kullanıcı üretimi — topluluğundan
4. Lisanslı      — ayrıcalıklı erişim
5. Halka açık    — herkes kullanabilir (en zayıf)
```
4. ve 5. seviyede kalıyorsan rekabet avantajın yok — ya veri katmanı ekle ya da bu playbook'u seçme.

**3. Temiz URL yapısı.** Alt klasör kullan, alt alan adı değil — alt klasör alan adı otoritesini birleştirir, alt alan adı böler.
✓ `siten.com/sablonlar/ozgecmis/` ✕ `sablonlar.siten.com/ozgecmis/`

**4. Gerçek arama amacına cevap ver.** Sayfa, o sorguyu yazan kişinin aradığı şeyi gerçekten vermeli.

**5. Nitelik nicelikten önce.** 100 iyi sayfa, 10.000 ince sayfadan iyidir. Her zaman.

**6. Kullanıcı için üret, Google için değil.** Bu ilke soyut değil — yukarıdaki teşhis sorusu bunun ölçüm aracıdır.

---

## 12 Playbook

| Playbook | Kalıp | Örnek |
|----------|-------|-------|
| Şablonlar | "[tür] şablonu" | "özgeçmiş şablonu" |
| Derleme (best-of) | "en iyi [kategori]" | "en iyi web sitesi kurucuları" |
| Dönüşümler | "[X] → [Y]" | "10 USD kaç TL" |
| Karşılaştırmalar | "[X] vs [Y]" | "webflow vs wordpress" |
| Örnekler | "[tür] örnekleri" | "açılış sayfası örnekleri" |
| Konumlar | "[hizmet] [şehir]" | "izmir diş klinikleri" |
| Persona | "[hedef kitle] için [ürün]" | "emlak için CRM" |
| Entegrasyonlar | "[A] [B] entegrasyonu" | "slack asana entegrasyonu" |
| Sözlük | "[terim] nedir" | "pSEO nedir" |
| Çeviriler | Çok dilli içerik | Yerelleştirilmiş sayfalar |
| Dizin | "[kategori] araçları" | "yapay zekâ metin araçları" |
| Profiller | "[kurum/kişi adı]" | "stripe CEO'su" |

Her playbook'un veri gereksinimi, şablon iskeleti ve risk profili: [references/playbooks.md](references/playbooks.md)

### Hangi Playbook Sana Uygun

| Elindeki | Playbook |
|----------|----------|
| Tescilli veri | Dizin, Profiller |
| Entegrasyonlu ürün | Entegrasyonlar |
| Tasarım/yaratıcı ürün | Şablonlar, Örnekler |
| Çok segmentli kitle | Persona |
| Yerel varlık + gerçek yerel veri | Konumlar |
| Araç/yardımcı ürün | Dönüşümler |
| İçerik ve uzmanlık | Sözlük, Derleme |
| Rakip yoğun pazar | Karşılaştırmalar |

Playbook'lar üst üste binebilir: "İzmir'deki en iyi ortak çalışma alanları" = Konumlar + Derleme.

---

## Uygulama Çerçevesi

### 1. Anahtar Kelime Kalıbı Araştırması

**Kalıbı bul:** Tekrarlayan yapı ne? Değişkenler ne? Kaç kombinasyon çıkıyor?
**Talebi doğrula:** Toplam hacim · dağılım (baş mı uzun kuyruk mu) · trend yönü.

**Kritik eleme:** Aylık hacmi sıfır olan kombinasyonu üretme. 10.000 kombinasyonun 800'ünde arama varsa, 800 sayfa üret. Kalan 9.200 sayfa sadece tarama bütçesi yakar ve "ince içerik" sinyali verir.

### 2. Veri Gereksinimi

- Her sayfada hangi veri alanları olacak?
- Veri tescilli mi, kazınmış mı, lisanslı mı, halka açık mı?
- Nasıl ve hangi sıklıkta güncellenecek?
- **Eksik satır kuralı:** Zorunlu alanları eksik olan satır sayfa olmaz. Uydurma ile doldurma.

### 3. Şablon Tasarımı

**Sayfa iskeleti:** Hedef anahtar kelimeyi içeren başlık → özgün giriş (değişken yer değiştirmesi değil) → veri odaklı bölümler → ilgili sayfalar/iç bağlantılar → amaca uygun CTA.

**Benzersizliği garantiye alma yöntemleri:**
- Veriye dayalı **koşullu içerik blokları** — satırın özelliğine göre farklı bölümler açılır
- Sayfa başına hesaplanmış **özgün analiz** (sıralama, karşılaştırma, ortalamadan sapma)
- Gerçek kullanıcı içeriği (yorum, soru, örnek)
- **Sabit metin oranı:** Sayfanın en az %60'ı satıra özgü olmalı

Şablon iskeletleri ve koşullu blok örnekleri: [references/template-design.md](references/template-design.md)

### 4. İç Bağlantı Mimarisi

**Merkez–uç (hub & spoke):** Merkez ana kategori sayfası · uçlar tek tek programatik sayfalar · ilgili uçlar arasında çapraz bağlantı.

**Yetim sayfa bırakma:** Her sayfaya ana siteden tıklanarak ulaşılabilmeli · XML site haritasında olmalı · yapılandırılmış veriyle breadcrumb.

Bağlantı mimarisi kalıpları: [references/internal-linking.md](references/internal-linking.md)

### 5. İndeksleme Stratejisi

- Yüksek hacimli kalıpları **önce** yayınla
- Çok ince varyasyonlara `noindex`
- Tarama bütçesini yönet — hepsini aynı anda yayınlama, dalgalar hâlinde çıkar
- Site haritalarını sayfa türüne göre ayır (indeksleme oranını tür bazında ölçebilmek için)

---

## Kalite Kapıları

### Yayın Öncesi

**İçerik**
- [ ] Her sayfa benzersiz değer veriyor · [ ] arama amacına cevap veriyor · [ ] okunabilir ve kullanışlı
- [ ] Satıra özgü içerik oranı ≥ %60
- [ ] Zorunlu alanı eksik satırlar elendi (uydurulmadı)
- [ ] Ticari/güvenlik iddiaları doğrulandı
- [ ] Rastgele örneklem incelendi (en az 20 sayfa, elle)

**Teknik SEO**
- [ ] Benzersiz başlık ve meta açıklama · [ ] doğru başlık hiyerarşisi · [ ] şema işaretlemesi · [ ] kabul edilebilir sayfa hızı · [ ] canonical doğru

**İç bağlantı**
- [ ] Site mimarisine bağlı · [ ] ilgili sayfalar bağlanmış · [ ] yetim sayfa yok

**İndeksleme**
- [ ] XML site haritasında · [ ] taranabilir · [ ] anahtar kelime yamyamlığı kontrolü yapıldı

### Yayın Sonrası İzleme

**Takip et:** indekslenme oranı · sıralamalar · trafik · etkileşim (sayfada kalma, hemen çıkma) · dönüşüm.
**Dikkat et:** ince içerik uyarıları · sıralama düşüşleri · manuel işlem bildirimi · tarama hataları.

**Aylık temizlik:** Gösterim alıp hiç tıklanmayan sayfaları incele · birbiriyle yarışan sayfaları birleştir · zayıf sayfaları kaldır veya `noindex` yap. Programatik SEO üretmekle bitmez, **budamakla** sürer.

Ayrıntılı kontrol listeleri ve izleme paneli: [references/quality-gates.md](references/quality-gates.md)

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| İnce içerik | Aynı metin, değişen şehir adı | Satıra özgü gerçek veri ekle veya o playbook'u bırak |
| Anahtar kelime yamyamlığı | Sayfaların birbirini bastırması | Bir URL = bir birincil amaç |
| Aşırı üretim | Arama talebi olmayan sayfa | Hacmi sıfır olan kombinasyonu üretme |
| Düşük veri kalitesi | Yanlış/eski bilgi, güven kaybı | Güncelleme takvimi ve doğrulama kuralları |
| UX'i yok sayma | Google için var olan sayfalar | Teşhis sorusunu her şablonda uygula |
| Hepsini birden yayınlama | Tarama bütçesi tükenir, indeksleme düşer | Dalgalar hâlinde yayınla, ölç, devam et |

---

## Çıktı Formatı

**Strateji belgesi:** fırsat analizi (kalıp, hacim, rekabet) · playbook seçimi ve gerekçesi · veri kaynağı planı · uygulama takvimi · risk değerlendirmesi.

**Sayfa şablonu:** URL yapısı · başlık/meta şablonları · bölüm bölüm içerik özeti · koşullu blok mantığı · şema işaretlemesi · iç bağlantı kuralları.

Kullanıcı ölçek istiyorsa strateji + şablonu dosyaya dök; kararı görselleştirmek gerekiyorsa tek sayfalık interaktif HTML pano iyi çalışır.

---

## Göreve Özgü Sorular

1. Hangi anahtar kelime kalıbını hedefliyorsun?
2. Elinde hangi veri var (veya neyi edinebilirsin)?
3. Kaç sayfa planlıyorsun?
4. Alan adının otorite düzeyi ne?
5. Bu terimlerde şu an kim çıkıyor?
6. Teknik altyapın ne (CMS, statik üretici, framework)?

---

## İlgili Skiller

- **seo-audit** — yayın sonrası denetim
- **content-strategy** — içerik planı
- **sektor-ara** — konum/dizin playbook'ları için gerçek firma verisi (SerpAPI → Excel)
- **iletisim-taslagi** — dizin sayfalarındaki firmalara ulaşma
- **xlsx** — veri setini hazırlama ve doğrulama
