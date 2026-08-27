# Mermaid Site Haritası Şablonları

## 1. Temel Hiyerarşi

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

Ne zaman: hızlı yapı taslağı, ekiple ilk konuşma.

---

## 2. Navigasyon Bölgeli

Hangi sayfanın nerede göründüğünü gösterir — üst menü, alt bilgi, gizli.

```mermaid
graph TD
    subgraph "Üst Menü"
        HOME[Ana Sayfa]
        FEAT[Özellikler]
        PRICE[Fiyatlandırma]
        BLOG[Blog]
        CTA[Ücretsiz Dene]
    end

    subgraph "Alt Bilgi"
        ABOUT[Hakkında]
        CAREER[Kariyer]
        CONTACT[İletişim]
        PRIVACY[Gizlilik]
    end

    subgraph "Sadece iç bağlantı"
        LP1[Kampanya sayfası]
        THANKS[Teşekkür sayfası]
    end

    HOME --> FEAT
    HOME --> PRICE
    HOME --> BLOG
    HOME --> ABOUT
    FEAT --> F1[Analitik]
    FEAT --> F2[Otomasyon]
    CTA --> THANKS
```

Ne zaman: navigasyon spesifikasyonu sunarken; "bu sayfa menüde mi" tartışmasını bitirir.

---

## 3. Tıklama Mesafesi

Her seviyeyi ayrı katmanda gösterir — 3 tıklama kuralını denetlemek için.

```mermaid
graph LR
    subgraph "0 tıklama"
        L0[Ana Sayfa]
    end
    subgraph "1 tıklama"
        L1A[Özellikler]
        L1B[Fiyatlandırma]
        L1C[Blog]
    end
    subgraph "2 tıklama"
        L2A[Analitik]
        L2B[Otomasyon]
        L2C[Blog yazısı]
    end
    subgraph "3 tıklama"
        L3A[Analitik: Raporlar]
    end

    L0 --> L1A & L1B & L1C
    L1A --> L2A & L2B
    L1C --> L2C
    L2A --> L3A
```

Ne zaman: yeniden yapılandırmada gömülü sayfaları görünür kılmak için. 4. sütun oluşuyorsa yapıyı düzleştir.

---

## 4. Merkez–Uç (İç Bağlantı)

```mermaid
graph TD
    HUB[Merkez: SEO Rehberi<br/>/rehberler/seo]

    S1[Anahtar Kelime Araştırması]
    S2[Sayfa İçi SEO]
    S3[Teknik SEO]
    S4[Bağlantı İnşası]

    HUB --> S1
    HUB --> S2
    HUB --> S3
    HUB --> S4

    S1 --> HUB
    S2 --> HUB
    S3 --> HUB
    S4 --> HUB

    S1 -.ilgili.-> S2
    S3 -.ilgili.-> S2
```

Düz ok: merkezden uca ve uçtan merkeze. Kesikli ok: uçlar arası ilgili bağlantı.
Ne zaman: içerik kümesi planlarken.

---

## 5. Dönüşüm Akışı

Sayfa yapısını değil, kullanıcının yolunu gösterir.

```mermaid
graph LR
    ENTRY1[Organik: Blog] --> PROD[Ürün sayfası]
    ENTRY2[Reklam] --> LP[Açılış sayfası]
    ENTRY3[Direkt] --> HOME[Ana Sayfa]

    HOME --> PROD
    PROD --> PRICE[Fiyatlandırma]
    LP --> FORM[Form]
    PRICE --> FORM
    FORM --> THANKS[Teşekkür]
    THANKS --> ONBOARD[Onboarding]
```

Ne zaman: sitenin iş hedefine hizmet edip etmediğini tartışırken. Yapı doğru ama dönüşüm yoksa sorun genelde burada görünür.

---

## 6. Yeniden Yapılandırma: Eski → Yeni

```mermaid
graph LR
    subgraph "Eski yapı"
        O1[/urunler/analitik]
        O2[/product/automation]
        O3[/blog/2024/01/seo-yazisi]
    end

    subgraph "Yeni yapı"
        N1[/ozellikler/analitik]
        N2[/ozellikler/otomasyon]
        N3[/blog/seo-yazisi]
    end

    O1 -->|301| N1
    O2 -->|301| N2
    O3 -->|301| N3
```

Ne zaman: geçiş planını onaya sunarken. Her okun bir 301 yönlendirme satırı olduğunu gösterir.

---

## 7. E-ticaret Kategori Ağacı

```mermaid
graph TD
    HOME[Ana Sayfa] --> C1[Kadın]
    HOME --> C2[Erkek]
    HOME --> C3[Aksesuar]

    C1 --> S1[Elbise]
    C1 --> S2[Pantolon]
    C1 --> S3[Üst Giyim]

    S1 --> P1[Ürün sayfaları]
    S2 --> P2[Ürün sayfaları]

    HOME --> COL[Koleksiyonlar]
    COL -.çapraz.-> S1
    COL -.çapraz.-> S3
```

Kesikli ok: koleksiyon sayfalarının kategorilerle çapraz ilişkisi — aynı ürün iki yerden erişilebilir, ama **tek canonical URL** olmalı.

---

## Biçim Notları

- **`graph TD`** (yukarıdan aşağı) hiyerarşi için; **`graph LR`** (soldan sağa) akış ve tıklama mesafesi için
- Düğüm etiketinde URL göstermek istersen `<br/>` ile alt satıra al
- Türkçe karakterler etiket içinde sorunsuz; **düğüm kimliklerinde (ID) kullanma** — `FEAT` iyi, `ÖZELLİK` riskli
- Çok büyük siteyi tek diyagrama sığdırmaya çalışma; bölüm bölüm ayrı diyagram üret
- Artifact olarak yayınlanan sayfalarda mermaid doğrudan render edilir; sohbete gönderilen HTML dosyasında renderer script'i gömülmelidir
