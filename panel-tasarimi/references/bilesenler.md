# Bileşen İlkeleri

---

## Derinlik Stratejisi — Birini Seç

| Strateji | Hissi | Kime uygun |
|----------|-------|------------|
| **Sadece kenarlık** | Temiz, teknik, hafif | Yoğun araçlar, veri arayüzleri, terminal hissi |
| **Hafif gölge** | Yumuşak, yaklaşılabilir | Tüketici ürünleri, düşük yoğunluklu paneller |
| **Katmanlı gölge** | Boyutlu, öne çıkan | Kart merkezli arayüzler, seçim ekranları |
| **Yüzey renk kayması** | Sessiz, düz | Koyu mod ağırlıklı, gölgesiz sistemler |

**Karıştırma.** Bazı kartlarda gölge bazılarında kenarlık, sistem olmadığını gösterir.

---

## Kartlar

Metrik kartı, plan kartı ve ayar kartı **birbirine benzemek zorunda değil**. İç yapıyı içeriğe göre tasarla, **yüzey işlemini sabit tut**.

```
Sabit kalan:  kenar kalınlığı · gölge derinliği · köşe yarıçapı · dolgu ölçeği
Değişen:      iç düzen · hiyerarşi · hangi öğe öne çıkıyor
```

**Metrik kartı varyasyonları** — hepsi "10 üzerinden 3" gösterebilir:

```
A) Ana sayı           B) Satır içi          C) İlerleme
   ┌──────────┐          ┌──────────┐          ┌──────────┐
   │   3      │          │ Onay  3/10│         │ Onay     │
   │ /10      │          └──────────┘          │ ███░░░░░ │
   │ onaylandı│                                │ 3 / 10   │
   └──────────┘                                └──────────┘

D) Karşılaştırma      E) Trend rozeti       F) Mini grafik
   ┌──────────┐          ┌──────────┐          ┌──────────┐
   │ 3        │          │ 3  ▲ +2  │          │ 3   ╱╲_╱ │
   │ dün 1    │          │ onaylandı│          │ onaylandı│
   └──────────┘          └──────────┘          └──────────┘
```

**Seçim kuralı:** Kullanıcı bu sayıyla ne yapacak? Karşılaştıracaksa D · eğilim arıyorsa F · hedefe ne kadar kaldığını görüyorsa C · sadece bilgi ise B.

**Her seferinde A'yı seçiyorsan seçim yapmıyorsun.**

---

## Durumlar

Eksik durum, sistemin çalışmadığı hissini verir.

### Etkileşimli öğe — beş durum

| Durum | Ne değişir |
|-------|-----------|
| Varsayılan | Taban |
| Hover | Yüzey bir tık açılır veya kenarlık güçlenir |
| Aktif (basılı) | Hafif koyulaşma veya 1px aşağı |
| Odak | Görünür odak halkası — **klavye için zorunlu** |
| Devre dışı | Opaklık düşer, imleç `not-allowed`, etkileşim kapalı |

```css
.dugme{ background:var(--yuzey-2); border:1px solid var(--cizgi);
        transition: background .12s ease, border-color .12s ease; }
.dugme:hover{ background:var(--yuzey-3); border-color:var(--cizgi-guclu); }
.dugme:active{ background:var(--yuzey-1); }
.dugme:focus-visible{ outline:2px solid var(--odak); outline-offset:2px; }
.dugme:disabled{ opacity:.45; cursor:not-allowed; }
```

### Veri — üç durum

| Durum | Ne göstermeli |
|-------|---------------|
| **Yükleniyor** | İskelet (skeleton), spinner değil — düzen zıplamasın |
| **Boş** | Burada ne olacak + ilk adım. Yokluk bildirimi değil, davet |
| **Hata** | Ne oldu + nasıl düzeltilir + tekrar dene eylemi |

**İskelet > spinner:** Spinner "bekle" der, iskelet "buraya şu gelecek" der. Tablo yüklenirken satır iskeletleri düzen kaymasını da önler.

---

## Navigasyon Bağlamı

**Boşlukta yüzen bir tablo ürün değil, bileşen demosudur.**

Ekranın zemine oturması için gerekenler:
- Uygulamada nerede olduğunu gösteren navigasyon
- Konum göstergesi (aktif menü öğesi, breadcrumb)
- Kullanıcı bağlamı (hesap, çalışma alanı, rol)

**Kenar çubuğu kurarken:** ana içerikle **aynı arka plan** + kenarlık ayrımı. Farklı renk alanı böler.

**Aktif öğe işaretleme:**
```css
/* Yeterli değil — sadece renk */
.menu-ogesi.aktif{ color: var(--vurgu); }

/* İyi — biçim de değişiyor */
.menu-ogesi.aktif{
  color: var(--metin-1);
  background: var(--yuzey-2);
  box-shadow: inset 2px 0 0 var(--vurgu);
}
```

---

## Kontroller

Yerel `<select>` ve `<input type="date">` işletim sistemine ait, **stil verilemeyen** öğeler üretir. Panonun geri kalanı ne kadar özenli olursa olsun bu iki öğe arayüzü ucuzlatır.

**Özel bileşen kur:**
- Tetikleyici düğme (stil verilmiş, durum yönetimli)
- Konumlandırılmış açılır panel (`--yuzey-3`, bir seviye üstte)
- Klavye desteği: ok tuşları, Enter, Escape
- Odak tuzağı (modal içinde)
- `aria-expanded`, `role="listbox"`, `aria-selected`

**Erişilebilirlik pazarlığa açık değil.** Özel kontrol kuruyorsan klavye ve ekran okuyucu desteği de kuracaksın; kuramıyorsan yerel öğeyi kullan ve arayüzü ona göre tasarla.

---

## İkonografi

**İkon açıklar, süslemez.** Kaldırınca anlam kaybolmuyorsa kaldır.

- Tek set seç ve ona bağlı kal (karışık set anında fark edilir)
- Boyut ölçeğe uysun: 14px (satır içi), 16px (standart), 20px (öne çıkan)
- Çizgi kalınlığı yazı tipi ağırlığıyla uyumlu olsun
- Bağımsız ikonlara sade bir arka plan çerçevesi varlık kazandırır

```css
.ikon-cerceve{
  width:32px; height:32px; display:grid; place-items:center;
  background: var(--yuzey-3);
  border: 1px solid var(--cizgi);
  border-radius: var(--yaricap-2);
}
```

**Her menü öğesine ikon koyma zorunluluğu yok.** İkon ayırt etmeye yardım etmiyorsa gürültüdür.

---

## Animasyon

| Tür | Süre | Eğri |
|-----|------|------|
| Hover, renk geçişi | 100–150 ms | `ease` |
| Durum değişimi | 150–250 ms | `ease-out` |
| Panel açılışı | 200–300 ms | `cubic-bezier(.2,.7,.3,1)` |
| Sayfa geçişi | 250–400 ms | `ease-out` |

**Profesyonel arayüzde zıplama/yaylanma yok.** `cubic-bezier` ile geri sekme (overshoot) oyuncu ürünlerde çalışır, iş aracında ucuz durur.

```css
@media (prefers-reduced-motion: reduce){
  *{ animation:none !important; transition:none !important; }
}
```

---

## Koyu Mod

Koyu arayüzlerin farklı ihtiyaçları var:

| Konu | Açık modda | Koyu modda |
|------|------------|------------|
| Yükseklik | Gölge + hafif açıklık | **Sadece açıklık** — gölge görünmez |
| Ayrım | Gölge yeterli | **Kenarlık zorunlu**, yoğunluğu artır |
| Anlamsal renk | Doygun | **Doygunluk düşür** — titreşmesin |
| Metin | Koyu üzerine açık zemin | Saf beyaz kullanma (`#F5F2ED` gibi kırık) |
| Vurgu | Doygun olabilir | Genelde açılmalı ve doygunluğu düşmeli |

**Saf siyah zemin (`#000`) kullanma** — OLED dışında sert durur ve yükseklik kuracak yer bırakmaz. `#101210` civarı taban ver.

**Hiyerarşi sistemi aynı kalır, değerler tersine döner.** Açık modda yükseklik = daha açık; koyu modda da yükseklik = daha açık. İkisinde de yükselen yüzey aydınlanır.

---

## Tablo

Panoların en çok kullanılan ve en çok ihmal edilen bileşeni.

- Satır ayırıcı: `--cizgi-yumusak` (standart kenarlık ızgara kâğıdı yapar)
- Başlık satırı: `--boyut-2`, `500` ağırlık, `--metin-3`, büyük harf + harf aralığı
- Sayısal sütunlar sağa hizalı + `tabular-nums`
- Hover: satır zemini `--yuzey-2`'ye
- Yoğunluk: satır yüksekliği 36–44px (yoğun) veya 48–56px (ferah) — niyete göre
- Yatay kaydırma kendi kabında, sayfa kaymasın
- Sıralama göstergesi başlıkta, tıklanabilir olduğu belli olsun
- Boş durum tablonun içinde, altında değil
