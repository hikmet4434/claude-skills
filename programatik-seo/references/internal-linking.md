# İç Bağlantı Mimarisi

## Merkez–Uç Modeli

```
                    Ana sayfa
                        │
              ┌─────────┴─────────┐
         Merkez sayfa        Merkez sayfa
        (kategori hub)      (kategori hub)
              │                   │
      ┌───┬───┼───┬───┐      ┌───┼───┐
     uç  uç  uç  uç  uç     uç  uç  uç
      └───┴───┴───┴───┘      └───┴───┘
        (çapraz bağlantılar)
```

**Merkez sayfa:** Kategoriyi tanımlar, tüm uçları listeler, kendi başına sıralanabilir bir sayfadır ("izmir diş klinikleri" merkezse, "türkiye diş klinikleri" üst merkez olabilir).
**Uç sayfalar:** Tek tek programatik sayfalar.
**Çapraz bağlantılar:** İlgili uçlar arasında — bu, tarama derinliğini azaltır ve otorite dağıtır.

---

## Bağlantı Kuralları

| Kural | Değer | Neden |
|-------|-------|-------|
| Ana sayfadan tıklama mesafesi | ≤ 3 | Daha derini nadiren taranır |
| Uç sayfadan çıkan iç bağlantı | 3–8 | Az: yetim kalır; çok: otorite dağılır |
| Merkez sayfadan uçlara | Hepsi (veya sayfalanmış) | Keşfedilebilirlik |
| Uçtan merkeze | Her zaman (breadcrumb) | Hiyerarşi sinyali |
| Bağlantı metni | Hedef sayfanın birincil terimi | "buraya tıklayın" değersizdir |

---

## Çapraz Bağlantı Seçimi

Rastgele bağlamak değersizdir. İlgililik gerçek olmalı:

| Playbook | Neye bağla |
|----------|------------|
| Konumlar | Komşu şehirler · aynı bölge · aynı hizmetin alt türleri |
| Karşılaştırmalar | Aynı ürünün diğer karşılaştırmaları · her iki ürünün kendi sayfası |
| Entegrasyonlar | Aynı ürünün diğer entegrasyonları · benzer kategori |
| Sözlük | İçerikte geçen diğer terimler (otomatik terim bağlama) |
| Dizin | Alt kategoriler · benzer araçlar |
| Persona | Yakın segmentler · aynı segmentin diğer kullanım senaryoları |

**Otomatik bağlama:** Sözlük ve dizin playbook'larında, metinde geçen terimleri otomatik bağlayan bir katman güçlü çalışır — ama sayfa başına en fazla 5-6 otomatik bağlantı, yoksa metin okunmaz hâle gelir.

---

## Yetim Sayfa Önleme

Bir sayfa şu üç yoldan **en az ikisiyle** ulaşılabilir olmalı:

- [ ] Merkez sayfadan doğrudan bağlantı
- [ ] En az bir kardeş uç sayfadan çapraz bağlantı
- [ ] XML site haritasında

Sadece site haritasında olan sayfa, Google için "önemsiz" sinyalidir — indekslense bile sıralanmaz.

---

## Sayfalama

Merkez sayfada 500 uç varsa hepsini listeleyemezsin.

**Doğru yaklaşım:** Alt merkezler kur (`/diş-klinikleri/izmir/` → `/diş-klinikleri/izmir/karsiyaka/`), böylece hiyerarşi derinleşir ama her seviye anlamlı kalır.
**Yanlış yaklaşım:** `?sayfa=2` ile 25 sayfalık sayfalama — 20. sayfadaki uçlar pratikte hiç taranmaz.

Sayfalama şartsa: `rel="next"/"prev"` yerine her sayfalama sayfasının kendi kendine indekslenebilir olmasını sağla ve "hepsini gör" bağlantısı ver.

---

## URL Yapısı

```
✓ siten.com/dis-klinikleri/izmir/
✓ siten.com/karsilastir/webflow-vs-wordpress/
✓ siten.com/sozluk/programatik-seo/

✕ izmir.siten.com/dis-klinikleri/        alt alan adı otoriteyi böler
✕ siten.com/p?id=4821                     anlamsız
✕ siten.com/dis-klinikleri-izmir-en-iyi-2026-guncel/   anahtar kelime doldurma
```

**Kurallar:** Alt klasör kullan · kısa ve okunabilir tut · tarih koyma (güncelleyince URL değişmesin) · Türkçe karakterleri sadeleştir (ı→i, ş→s) · URL'i sonradan değiştirme, gerekirse 301 yönlendir.

---

## XML Site Haritası

Sayfa türüne göre **ayrı** site haritaları:
```
sitemap-index.xml
├── sitemap-konumlar.xml
├── sitemap-karsilastirmalar.xml
├── sitemap-sozluk.xml
└── sitemap-blog.xml
```

**Neden ayrı:** Search Console indekslenme oranını site haritası bazında gösterir. Hepsi tek dosyadaysa hangi sayfa türünün indekslenmediğini göremezsin — ve bu, en değerli teşhis verisidir.

**Kurallar:** Dosya başına en fazla 50.000 URL · `lastmod` gerçek güncelleme tarihini göstersin (her gün bugünü yazma, güven kaybı) · `noindex` sayfaları site haritasına koyma.

---

## Breadcrumb

Her uç sayfada, `BreadcrumbList` şemasıyla:
```
Ana Sayfa › Diş Klinikleri › İzmir › Karşıyaka
```
Hem kullanıcı yönelimi hem hiyerarşi sinyali hem arama sonucunda görünüm avantajı sağlar.
