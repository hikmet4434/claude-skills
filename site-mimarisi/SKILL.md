---
name: site-mimarisi
description: "Bir web sitesinin sayfa hiyerarşisini, navigasyonunu, URL yapısını ve iç bağlantı düzenini planlar veya yeniden kurar. Kullanıcı şunlardan bahsettiğinde kullan: site mimarisi, site yapısı, site haritası, sitemap, görsel site haritası, sayfa hiyerarşisi, bilgi mimarisi, information architecture, IA, navigasyon tasarımı, menü yapısı, URL yapısı, URL şeması, breadcrumb, ekmek kırıntısı, iç bağlantı stratejisi, internal linking, site planlama, hangi sayfalar gerekli, sitemi nasıl düzenlemeliyim, site navigasyonu, menü kaç maddeli olmalı, sayfa derinliği, tıklama mesafesi, site yeniden yapılandırma, migration, 301 yönlendirme. XML site haritası teknik SEO konusudur, seo-audit skilline bak. Ölçekli şablon sayfa üretimi için programatik-seo, sayfa metinleri için icerik-taslagi skilline bak."
license: MIT
metadata:
  version: "2.0.0"
  language: tr
---

# Site Mimarisi

Bilgi mimarisi uzmanısın. Amacın sayfa hiyerarşisini, navigasyonu, URL kalıplarını ve iç bağlantıları planlamak — hem insanın kolay gezineceği hem aramanın kolay tarayacağı bir yapı kurmak.

---

## Başlamadan Önce

**Önce mevcut bağlamı oku** — varsa soru sormadan önce oku, orada cevabı olanı tekrar sorma:
`.agents/product-marketing.md` · `.claude/product-marketing.md` · `product-marketing-context.md` · `CLAUDE.md`

Sonra dört başlıkta bağlam topla:

**1. İş bağlamı** — şirket ne yapıyor · birincil hedef kitleler kim · sitenin ilk üç hedefi ne (dönüşüm, SEO trafiği, eğitim, destek)

**2. Mevcut durum** — yeni site mi, yeniden yapılandırma mı · yeniden yapılandırmaysa **ne bozuk** (yüksek çıkma oranı, zayıf SEO, kullanıcı bulamıyor) · korunması gereken URL'ler var mı

**3. Site tipi** — SaaS pazarlama · içerik/blog · e-ticaret · dokümantasyon · hibrit · küçük işletme

**4. İçerik envanteri** — kaç sayfa var veya planlanıyor · en önemli sayfalar hangileri (trafik, dönüşüm veya iş değeri) · planlanan bölüm veya genişleme var mı

**Yeniden yapılandırmada kritik uyarı:** Mevcut URL listesini ve trafik verisini almadan yapıya dokunma. Değişen her URL için 301 yönlendirme gerekir; yönlendirilmeyen URL hem bağlantı değerini hem sıralamayı kaybettirir.

---

## Site Tipleri ve Başlangıç Noktaları

| Site tipi | Tipik derinlik | Ana bölümler | URL kalıbı |
|-----------|----------------|--------------|------------|
| SaaS pazarlama | 2–3 seviye | Ana sayfa, Özellikler, Fiyatlandırma, Blog, Dokümanlar | `/ozellikler/ad`, `/blog/slug` |
| İçerik / blog | 2–3 seviye | Ana sayfa, Blog, Kategoriler, Hakkında | `/blog/slug`, `/kategori/slug` |
| E-ticaret | 3–4 seviye | Ana sayfa, Kategoriler, Ürünler, Sepet | `/kategori/alt-kategori/urun` |
| Dokümantasyon | 3–4 seviye | Ana sayfa, Rehberler, API Referansı | `/dokumanlar/bolum/sayfa` |
| Hibrit (SaaS + içerik) | 3–4 seviye | Ana sayfa, Ürün, Blog, Kaynaklar, Dokümanlar | `/urun/ozellik`, `/blog/slug` |
| Küçük işletme | 1–2 seviye | Ana sayfa, Hizmetler, Hakkında, İletişim | `/hizmetler/ad` |

Her tip için tam sayfa hiyerarşisi şablonu: [references/site-tipi-sablonlari.md](references/site-tipi-sablonlari.md)

---

## Sayfa Hiyerarşisi

### 3 Tıklama Kuralı

Kullanıcı önemli her sayfaya ana sayfadan **3 tıklamada** ulaşabilmeli. Mutlak bir kural değil, ama kritik bir sayfa 4+ seviye gömülüyse yapıda sorun vardır.

### Düz mü Derin mi

| Yaklaşım | Kime uygun | Bedeli |
|----------|------------|--------|
| Düz (2 seviye) | Küçük siteler, portfolyo | Basit ama ölçeklenmez |
| Orta (3 seviye) | Çoğu SaaS ve içerik sitesi | Derinlik ve bulunabilirlik dengesi |
| Derin (4+ seviye) | E-ticaret, büyük dokümantasyon | Ölçeklenir ama içerik gömülme riski |

**Kural:** Navigasyonu temiz tutabildiğin kadar düz git. Bir menüde 20+ madde varsa bir seviye hiyerarşi ekle.

### Seviyeler

| Seviye | Ne | Örnek |
|--------|-----|-------|
| L0 | Ana sayfa | `/` |
| L1 | Birincil bölümler | `/ozellikler`, `/blog`, `/fiyatlandirma` |
| L2 | Bölüm sayfaları | `/ozellikler/analitik`, `/blog/seo-rehberi` |
| L3+ | Detay sayfaları | `/dokumanlar/api/kimlik-dogrulama` |

### ASCII Ağaç Biçimi

```
Ana Sayfa (/)
├── Özellikler (/ozellikler)
│   ├── Analitik (/ozellikler/analitik)
│   ├── Otomasyon (/ozellikler/otomasyon)
│   └── Entegrasyonlar (/ozellikler/entegrasyonlar)
├── Fiyatlandırma (/fiyatlandirma)
├── Blog (/blog)
│   ├── [Kategori: SEO] (/blog/kategori/seo)
│   └── [Kategori: CRO] (/blog/kategori/cro)
├── Kaynaklar (/kaynaklar)
│   ├── Vaka Çalışmaları (/kaynaklar/vaka-calismalari)
│   └── Şablonlar (/kaynaklar/sablonlar)
├── Dokümanlar (/dokumanlar)
├── Hakkında (/hakkinda)
│   └── Kariyer (/hakkinda/kariyer)
└── İletişim (/iletisim)
```

**ASCII mi Mermaid mi:** ASCII → hızlı taslak, metin bağlamı, basit yapı. Mermaid → görsel sunum, karmaşık ilişki, navigasyon bölgelerini gösterme.

---

## Navigasyon

### Navigasyon Tipleri

| Tip | İşi | Yeri |
|-----|-----|------|
| Üst menü | Birincil navigasyon, hep görünür | Her sayfanın üstü |
| Açılır menü | Alt sayfaları ana başlık altında toplar | Üst menüden açılır |
| Alt bilgi (footer) | İkincil bağlantılar, yasal, site haritası | Her sayfanın altı |
| Yan menü | Bölüm içi navigasyon (doküman, blog) | Bölüm içinde solda |
| Breadcrumb | Konumu gösterir | Başlığın altı, içeriğin üstü |
| Bağlamsal bağlantı | İlgili içerik, sonraki adım | Metin içinde |

### Üst Menü Kuralları

- **4–7 madde.** Fazlası karar felci yaratır.
- **CTA butonu en sağda** ("Ücretsiz Dene", "Başla")
- **Logo sol üstte** ve ana sayfaya bağlı
- **Önem sırasına göre diz** — en çok ziyaret edilen/en değerli önde
- Mega menü kullanıyorsan 3–4 sütunla sınırla

### Alt Bilgi Düzeni

Sütunlara ayır:
- **Ürün:** Özellikler, Fiyatlandırma, Entegrasyonlar, Sürüm notları
- **Kaynaklar:** Blog, Vaka çalışmaları, Şablonlar, Dokümanlar
- **Şirket:** Hakkında, Kariyer, İletişim, Basın
- **Yasal:** Gizlilik, Kullanım koşulları, KVKK, Çerez politikası

### Breadcrumb

```
Ana Sayfa > Özellikler > Analitik
Ana Sayfa > Blog > SEO > Yazı Başlığı
```

URL hiyerarşisini birebir yansıtmalı. Mevcut sayfa hariç her parça tıklanabilir olmalı. `BreadcrumbList` şemasıyla işaretle.

Ayrıntılı navigasyon kalıpları ve mobil davranış: [references/navigasyon-kaliplari.md](references/navigasyon-kaliplari.md)

---

## URL Yapısı

### İlkeler

1. **İnsan okuyabilsin** — `/ozellikler/analitik`, `/o/a123` değil
2. **Tire kullan, alt çizgi değil** — `/blog/seo-rehberi`, `/blog/seo_rehberi` değil
3. **Hiyerarşiyi yansıtsın** — URL yolu site yapısıyla eşleşsin
4. **Sondaki eğik çizgide tutarlı ol** — birini seç, her yerde uygula
5. **Hep küçük harf** — `/Hakkinda` → `/hakkinda` yönlendirmesi olsun
6. **Kısa ama açıklayıcı** — `/blog/acilis-sayfasi-donusum-oranlarini-nasil-artirirsiniz` uzun; `/blog/acilis-sayfasi-donusumu` iyi
7. **Türkçe karakter kullanma** — `ı→i, ş→s, ç→c, ğ→g, ü→u, ö→o`. Kodlanmış karakterler URL'i okunmaz yapar ve bazı sistemlerde kırılır.

### Sayfa Tipine Göre Kalıplar

| Sayfa tipi | Kalıp | Örnek |
|------------|-------|-------|
| Ana sayfa | `/` | `site.com` |
| Özellik | `/ozellikler/{ad}` | `/ozellikler/analitik` |
| Fiyatlandırma | `/fiyatlandirma` | `/fiyatlandirma` |
| Blog yazısı | `/blog/{slug}` | `/blog/seo-rehberi` |
| Blog kategorisi | `/blog/kategori/{slug}` | `/blog/kategori/seo` |
| Vaka çalışması | `/musteriler/{slug}` | `/musteriler/acme` |
| Dokümantasyon | `/dokumanlar/{bolum}/{sayfa}` | `/dokumanlar/api/kimlik-dogrulama` |
| Yasal | `/{sayfa}` | `/gizlilik`, `/kullanim-kosullari` |
| Açılış sayfası | `/{slug}` veya `/lp/{slug}` | `/ucretsiz-deneme` |
| Karşılaştırma | `/karsilastir/{rakip}` | `/karsilastir/rakip-adi` |
| Entegrasyon | `/entegrasyonlar/{ad}` | `/entegrasyonlar/slack` |
| Şablon | `/sablonlar/{slug}` | `/sablonlar/pazarlama-plani` |

### Sık Yapılan Hatalar

| Hata | Neden kötü | Doğrusu |
|------|------------|---------|
| Blog URL'inde tarih | `/blog/2026/01/15/baslik` uzun, değer katmaz | `/blog/baslik` |
| Aşırı iç içe geçirme | `/urunler/kategori/alt/urun/detay` çok derin | Düzleştir |
| Yönlendirmesiz URL değişimi | Bağlantı değeri ve sıralama gider | Her eski URL'e 301 |
| URL'de ID | `/urun/12345` okunmaz | Slug kullan |
| İçerik için sorgu parametresi | `/blog?id=123` | `/blog/yazi-basligi` |
| Tutarsız kalıp | `/ozellikler/analitik` ve `/urun/otomasyon` karışık | Tek ebeveyn seç |
| Türkçe karakter | `/hakkımızda` kodlanır, kırılır | `/hakkimizda` |

URL geçişi ve 301 yönlendirme planı: [references/url-ve-yonlendirme.md](references/url-ve-yonlendirme.md)

---

## Görsel Site Haritası (Mermaid)

```mermaid
graph TD
    HOME[Ana Sayfa] --> FEAT[Özellikler]
    HOME --> PRICE[Fiyatlandırma]
    HOME --> BLOG[Blog]
    HOME --> ABOUT[Hakkında]

    FEAT --> F1[Analitik]
    FEAT --> F2[Otomasyon]
    FEAT --> F3[Entegrasyonlar]

    BLOG --> B1[Kategori: SEO]
    BLOG --> B2[Kategori: CRO]
```

Navigasyon bölgeli, akış odaklı ve büyük site şablonları: [references/mermaid-sablonlari.md](references/mermaid-sablonlari.md)

---

## İç Bağlantı

### Bağlantı Tipleri

| Tip | İşi | Örnek |
|-----|-----|-------|
| Navigasyonel | Bölümler arası geçiş | Üst menü, alt bilgi, yan menü |
| Bağlamsal | Metin içinde ilgili içerik | "…[analitik özelliklerimiz](/ozellikler/analitik)…" |
| Merkez–uç | Küme içeriğini merkeze bağlar | Blog yazıları ana rehbere |
| Bölümler arası | Farklı bölümleri bağlar | Özellik sayfası → ilgili vaka çalışması |

### Kurallar

1. **Yetim sayfa olmasın** — her sayfaya en az bir iç bağlantı gelmeli
2. **Açıklayıcı bağlantı metni** — "buraya tıklayın" değil, "analitik özelliklerimiz"
3. **1.000 kelimede 5–10 iç bağlantı** (yaklaşık ölçü)
4. **Önemli sayfalara daha çok bağlantı** — ana sayfa, kilit özellik sayfaları, fiyatlandırma
5. **Breadcrumb kullan** — her sayfada bedava iç bağlantı
6. **İlgili içerik bölümü** — sayfa sonunda "Bunlar da ilginizi çekebilir"

### Merkez–Uç Modeli

```
Merkez: /blog/seo-rehberi (kapsamlı genel bakış)
├── Uç: /blog/anahtar-kelime-arastirmasi  → merkeze geri bağlanır
├── Uç: /blog/sayfa-ici-seo               → merkeze geri bağlanır
├── Uç: /blog/teknik-seo                  → merkeze geri bağlanır
└── Uç: /blog/baglanti-insasi             → merkeze geri bağlanır
```

Her uç merkeze bağlanır, merkez tüm uçlara bağlanır, uçlar birbirine ilgili olduğunda bağlanır.

### Bağlantı Denetim Listesi

- [ ] Her sayfaya en az bir iç bağlantı geliyor
- [ ] Kırık iç bağlantı (404) yok
- [ ] Bağlantı metinleri açıklayıcı
- [ ] En önemli sayfalar en çok iç bağlantıyı alıyor
- [ ] Breadcrumb tüm sayfalarda
- [ ] Blog yazılarında ilgili içerik bağlantıları var
- [ ] Özellik ↔ vaka çalışması, blog ↔ ürün bağlantıları kurulu

---

## Çıktı

Site mimarisi planı beş parçadan oluşur:

**1. Sayfa hiyerarşisi (ASCII ağaç)** — her düğümde URL ile tam yapı

**2. Görsel site haritası (Mermaid)** — sayfa ilişkileri, gerekirse navigasyon bölgeleri alt grafiklerle

**3. URL haritası tablosu**

| Sayfa | URL | Üst sayfa | Navigasyon yeri | Öncelik |
|-------|-----|-----------|-----------------|---------|
| Ana Sayfa | `/` | — | Üst menü | Yüksek |
| Özellikler | `/ozellikler` | Ana Sayfa | Üst menü | Yüksek |
| Analitik | `/ozellikler/analitik` | Özellikler | Açılır menü | Orta |

**4. Navigasyon spesifikasyonu** — üst menü maddeleri (sıralı, CTA dahil) · alt bilgi bölümleri · yan menü (varsa) · breadcrumb uygulama notları · mobil davranış

**5. İç bağlantı planı** — merkez sayfalar ve uçları · bölümler arası bağlantı fırsatları · yetim sayfa denetimi (yeniden yapılandırmada) · kilit sayfa başına önerilen bağlantılar

**Yeniden yapılandırmaysa altıncı parça zorunlu: 301 yönlendirme haritası** (eski URL → yeni URL, satır satır).

Çıktı uzunsa dosyaya dök. Ekiple paylaşılacaksa tek sayfalık interaktif HTML pano, statik dokümandan iyi çalışır.

---

## Göreve Özgü Sorular

1. Yeni site mi, mevcut sitenin yeniden yapılandırması mı?
2. Site tipi ne? (SaaS, içerik, e-ticaret, doküman, hibrit, küçük işletme)
3. Kaç sayfa var veya planlanıyor?
4. Sitedeki en önemli 5 sayfa hangisi?
5. Korunması veya yönlendirilmesi gereken mevcut URL'ler var mı?
6. Birincil hedef kitleler kim ve sitede ne yapmaya çalışıyorlar?

---

## İlgili Skiller

- **programatik-seo** — şablon ve veriyle ölçekli sayfa üretimi (yüzlerce konum/karşılaştırma sayfası)
- **icerik-taslagi** — planladığın sayfaların metinlerini yazma
- **seo-audit** — teknik SEO, sayfa içi optimizasyon, indeksleme
- **schema** — breadcrumb ve site navigasyonu yapılandırılmış verisi
- **sektor-ara** — dizin/konum bölümleri için gerçek firma verisi
