# Site Tipi Şablonları

Her şablon bir başlangıç noktasıdır — kopyala, sil, ekle.

---

## SaaS Pazarlama Sitesi

```
Ana Sayfa (/)
├── Özellikler (/ozellikler)
│   ├── [Özellik 1] (/ozellikler/analitik)
│   ├── [Özellik 2] (/ozellikler/otomasyon)
│   └── [Özellik 3] (/ozellikler/raporlama)
├── Çözümler (/cozumler)
│   ├── Sektöre göre (/cozumler/perakende)
│   └── Role göre (/cozumler/pazarlama-ekipleri)
├── Fiyatlandırma (/fiyatlandirma)
├── Müşteriler (/musteriler)
│   └── [Vaka çalışmaları] (/musteriler/{slug})
├── Kaynaklar (/kaynaklar)
│   ├── Blog (/blog)
│   ├── Şablonlar (/sablonlar)
│   └── Webinarlar (/kaynaklar/webinarlar)
├── Dokümanlar (/dokumanlar)
├── Entegrasyonlar (/entegrasyonlar)
│   └── [Her entegrasyon] (/entegrasyonlar/{ad})
├── Hakkında (/hakkinda)
│   ├── Kariyer (/hakkinda/kariyer)
│   └── Basın (/hakkinda/basin)
└── İletişim (/iletisim)
```

**Üst menü:** Özellikler ▾ · Çözümler ▾ · Fiyatlandırma · Kaynaklar ▾ · **[Ücretsiz Dene]**
**Derinlik:** 2–3 seviye
**Dikkat:** "Özellikler" ve "Çözümler" ikisi de varsa farkı net olsun — Özellikler ürün ne yapar, Çözümler kim için. Karışırsa ikisini birleştir.

---

## İçerik / Blog Sitesi

```
Ana Sayfa (/)
├── Blog (/blog)
│   ├── [Kategori] (/blog/kategori/{slug})
│   └── [Yazı] (/blog/{slug})
├── Rehberler (/rehberler)
│   └── [Merkez sayfa] (/rehberler/{konu})
├── Hakkında (/hakkinda)
├── Bülten (/bulten)
└── İletişim (/iletisim)
```

**Üst menü:** Blog · Rehberler · Hakkında · **[Bültene Katıl]**
**Derinlik:** 2–3 seviye
**Kritik karar:** Kategori sayfaları indekslensin mi? Kategoride 10'dan az yazı varsa `noindex` yap — ince içerik sayılır.

---

## E-ticaret

```
Ana Sayfa (/)
├── [Kategori] (/kadin)
│   ├── [Alt kategori] (/kadin/elbise)
│   │   └── [Ürün] (/kadin/elbise/{urun-slug})
│   └── [Alt kategori] (/kadin/pantolon)
├── Yeni Gelenler (/yeni)
├── İndirim (/indirim)
├── Koleksiyonlar (/koleksiyonlar/{slug})
├── Hakkımızda (/hakkimizda)
├── Yardım (/yardim)
│   ├── Kargo (/yardim/kargo)
│   ├── İade (/yardim/iade)
│   └── Beden Rehberi (/yardim/beden-rehberi)
├── Sepet (/sepet)                    [noindex]
└── Hesabım (/hesabim)                [noindex]
```

**Üst menü:** Kategoriler ▾ (mega menü) · Yeni · İndirim · **[Sepet]**
**Derinlik:** 3–4 seviye

**E-ticarete özgü kararlar:**
- **Ürün URL'i kategori içinde mi?** `/kadin/elbise/urun` hiyerarşiyi yansıtır ama ürün iki kategoriye girerse çift URL doğar. Alternatif: `/urun/{slug}` düz yapı + breadcrumb ile hiyerarşi. Çok kategorili katalogda **düz yapı daha güvenli**.
- **Filtre ve sıralama URL'leri** (`?renk=mavi&sirala=fiyat`) `noindex` veya canonical ile ana kategoriye işaret etmeli — yoksa binlerce kopya sayfa doğar.
- **Sepet, ödeme, hesap** sayfaları `noindex`.
- **Tükenen ürün** sayfasını silme; stokta yok olarak bırak ve alternatif öner. Silersen bağlantı değeri gider.

---

## Dokümantasyon

```
Ana Sayfa (/dokumanlar)
├── Başlangıç (/dokumanlar/baslangic)
│   ├── Kurulum (/dokumanlar/baslangic/kurulum)
│   └── İlk Adımlar (/dokumanlar/baslangic/ilk-adimlar)
├── Rehberler (/dokumanlar/rehberler)
│   └── [Konu] (/dokumanlar/rehberler/{konu})
├── API Referansı (/dokumanlar/api)
│   ├── Kimlik Doğrulama (/dokumanlar/api/kimlik-dogrulama)
│   └── [Endpoint] (/dokumanlar/api/{endpoint})
├── SSS (/dokumanlar/sss)
└── Sürüm Notları (/dokumanlar/surum-notlari)
```

**Navigasyon:** Yan menü zorunlu (üst menü yetmez). Arama kutusu üstte.
**Derinlik:** 3–4 seviye
**Dikkat:** Sürüm bazlı dokümantasyonda (`/dokumanlar/v2/...`) eski sürümlere `canonical` ile güncel sürümü işaret et, yoksa sürümler birbiriyle yarışır.

---

## Hibrit (SaaS + İçerik)

SaaS şablonunun üstüne güçlü bir içerik katmanı:

```
Ana Sayfa (/)
├── Ürün (/urun)
│   └── [Özellikler] (/urun/{ozellik})
├── Fiyatlandırma (/fiyatlandirma)
├── Öğren (/ogren)                     ← içerik merkezi
│   ├── Blog (/blog)
│   ├── Rehberler (/rehberler/{konu})
│   └── Sözlük (/sozluk/{terim})
├── Müşteriler (/musteriler)
├── Dokümanlar (/dokumanlar)
└── Şirket (/sirket)
```

**Kritik ayrım:** Pazarlama içeriği (`/blog`, `/rehberler`) ile ürün dokümantasyonu (`/dokumanlar`) ayrı köklerde dursun. Karıştırılırsa hem kullanıcı hem arama kafası karışır.

---

## Küçük İşletme / Yerel

```
Ana Sayfa (/)
├── Hizmetler (/hizmetler)
│   └── [Her hizmet] (/hizmetler/{ad})
├── Hakkımızda (/hakkimizda)
├── Referanslar (/referanslar)
├── Blog (/blog)                       [opsiyonel]
└── İletişim (/iletisim)
```

**Üst menü:** Hizmetler ▾ · Hakkımızda · Referanslar · **[Randevu Al]**
**Derinlik:** 1–2 seviye
**Yerel SEO:** Telefon her sayfanın üstünde tıklanabilir olsun · adres ve çalışma saatleri alt bilgide · `LocalBusiness` şeması · birden fazla şube varsa her şubeye kendi sayfası (`/subeler/{sehir}`) ve gerçek şube verisi — aynı metni şube adı değiştirerek çoğaltmak ince içeriktir, `programatik-seo` skilline bak.

---

## Ortak Sayfalar (hepsinde)

| Sayfa | URL | Not |
|-------|-----|-----|
| Gizlilik politikası | `/gizlilik` | Zorunlu |
| Kullanım koşulları | `/kullanim-kosullari` | Zorunlu |
| KVKK aydınlatma metni | `/kvkk` | TR'de zorunlu |
| Çerez politikası | `/cerez-politikasi` | TR/AB'de zorunlu |
| 404 sayfası | — | Arama kutusu ve ana bölüm bağlantıları içersin |
| İletişim | `/iletisim` | Gerçek adres, telefon, form |

**404 sayfası çoğu sitede ihmal edilir.** İyi bir 404: ne olduğunu açıklar, arama kutusu sunar, en popüler 4–5 sayfaya bağlantı verir. Kullanıcıyı ana sayfaya atıp bırakmaz.
