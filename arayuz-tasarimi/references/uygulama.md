# Uygulama

## Tema Kurulumu

Görüntüleyenin üç durumu vardır, iki değil:

| Durum | Kök öğe | Ne belirler |
|-------|---------|-------------|
| Açık seçilmiş | `data-theme="light"` | Kullanıcı açıkça seçti |
| Koyu seçilmiş | `data-theme="dark"` | Kullanıcı açıkça seçti |
| **Sistem (varsayılan)** | **Damga yok** | Sadece `prefers-color-scheme` |

Çoğu kullanıcı üçüncü durumdadır. Rengi yalnızca `[data-theme]` bloğunda tanımlarsan o kullanıcıda **hiç uygulanmaz** — sayfa bir temanın metnini diğerinin zemininde gösterir. En sık görülen okunmaz-sayfa hatası budur.

**Doğru sıra:**

```css
/* 1. Tam açık palet — çıplak :root */
:root{
  --zemin:#F7F4F0; --yuzey:#FFF; --murekkep:#1F1B18;
  --sessiz:#7A7068; --vurgu:#B4472F; --cizgi:#E3DCD4;
}

/* 2. Sistem koyu — sadece token'ları yeniden tanımla */
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --zemin:#16130F; --yuzey:#201C18; --murekkep:#F0EAE3;
    --sessiz:#9C9186; --vurgu:#E28A72; --cizgi:#332C25;
  }
}

/* 3. Açık seçim — geçersiz kılma kazansın */
:root[data-theme="dark"]{
  --zemin:#16130F; --yuzey:#201C18; --murekkep:#F0EAE3;
  --sessiz:#9C9186; --vurgu:#E28A72; --cizgi:#332C25;
}

/* 4. Bileşenler HER ZAMAN token üzerinden */
body{ background:var(--zemin); color:var(--murekkep); }
```

**Dört kural:**
1. Her rengin ilk tanımı çıplak `:root`'ta olur
2. Bileşenler token kullanır, medya sorgusu içinde renk tanımlanmaz
3. `body` mutlaka açık bir `background` alır — şeffaf gövde ana sayfanın zeminini ödünç alır
4. Yayından önce stil sayfasını tara: **sadece** medya sorgusu veya `[data-theme]` içinde tanımlanmış renk var mı?

**Tek temaya bilinçli bağlanmak serbesttir** (neon oyun ekranı, tipo baskı daveti) — o zaman medya sorgusunu ve damgaları hiç kullanma, ama her rengi ve zemini yine açıkça boya. Seçim olsun, ihmal değil.

**Koyu tema naif ters çevirme değildir.** Kontrastı yeniden dengele; vurgu rengi koyu zeminde genelde açılmalı ve doygunluğu düşmeli.

---

## CSS Tuzakları

### Seçici özgüllüğü

En sık görülen sessiz hata: birbirini iptal eden sınıflar.

```css
.section { padding: 64px 0; }     /* tür tabanlı */
.cta     { padding: 24px; }       /* öğe tabanlı */
/* <div class="section cta"> → hangisi kazanır? */
```

**Çözüm:** Tek bir katman mantığı kur. Yerleşim sınıfları boşluğu, bileşen sınıfları görünümü belirlesin; ikisi aynı özelliği yönetmesin.

### Boşluğu yerleşim versin

```css
/* Kötü — marj birleşmesi, çift boşluk */
.kart { margin-bottom: 24px; }

/* İyi — öngörülebilir */
.liste { display:flex; flex-direction:column; gap:24px; }
```

### Geniş içerik

Tablo, kod bloğu ve diyagram **kendi kabında** kaysın; sayfa gövdesi asla yatay kaymamalı.

```css
.tablo-kabi{ overflow-x:auto; }
```

### Rakam hizası

```css
.sayi{ font-variant-numeric: tabular-nums; }
```

### `color-mix` ile ara tonlar

```css
background: color-mix(in srgb, var(--vurgu) 12%, transparent);
```
Ayrı bir "vurgu-açık" token tanımlamak yerine mevcut token'dan türet — palet küçük kalır.

---

## Hareket

```css
@media (prefers-reduced-motion: reduce){
  *{ animation:none !important; transition:none !important; }
}
```

**Tek orkestrasyonlu an:**
```css
.hero > *{ opacity:0; transform:translateY(12px);
           animation: ac .6s cubic-bezier(.2,.7,.3,1) forwards; }
.hero > *:nth-child(1){ animation-delay:.05s }
.hero > *:nth-child(2){ animation-delay:.15s }
.hero > *:nth-child(3){ animation-delay:.25s }
@keyframes ac{ to{ opacity:1; transform:none } }
```

**Süre kılavuzu:** hover 120–180 ms · durum değişimi 200–300 ms · giriş 400–700 ms · ortam döngüsü 8 s+.

**Yumuşatma:** `cubic-bezier(.2,.7,.3,1)` çoğu giriş için doğal durur. `linear` sadece ortam/döngü hareketinde.

**Aşırıya kaçma:** Her bölümün kaydırmayla belirmesi, tasarımın yapay zekâ ürünü olduğu hissini en çok güçlendiren şeydir. Bir veya iki yerde kullan.

---

## Erişilebilirlik

| Konu | Kural |
|------|-------|
| Kontrast | Gövde metni 4.5:1 · büyük başlık 3:1 · **her iki temada** ölç |
| Klavye odağı | Görünür olsun: `outline:2px solid var(--vurgu); outline-offset:2px` |
| Dokunma hedefi | ≥ 44×44 px |
| Renk tek başına | Durumu sadece renkle kodlama — biçim, ikon veya metin ekle |
| Alternatif metin | Anlam taşıyan her görselde |
| Başlık hiyerarşisi | Tek `h1`, seviye atlamadan |
| Form etiketi | Her girdiye gerçek `<label>` |
| Odak sırası | Görsel sırayla eşleşsin |

**Vurgu rengi kontrolü:** Vurgu rengin üzerine beyaz metin koyuyorsan kontrastı ölç. Açık pembe/sarı üzerine beyaz okunmaz — o zaman `--vurgu-uzeri` diye ayrı bir token tanımla ve temaya göre değiştir.

---

## Duyarlılık

```css
/* Göreli birimler, sabit piksel genişlik değil */
.kap{ max-width: 1080px; margin-inline:auto; padding-inline:20px; }

/* Izgara otomatik uyarlansın */
.kartlar{ display:grid; gap:16px;
          grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); }

/* Görseller taşmasın */
img{ max-width:100%; height:auto; }
```

**Kesme noktası düşünmeden önce `auto-fit` + `minmax` dene** — çoğu ızgara medya sorgusu olmadan çalışır.

**Mobil kontrolü:** 320 px genişlikte yatay kaydırma olmamalı. Tasarımı bitirdiğinde ilk bakacağın yer burasıdır.

---

## Temiz İnşa

- Void olmayan her öğeyi kapat
- Öznitelikleri çift tırnakla yaz
- Üst üste binen öğelere dikkat (z-index savaşı)
- Yazı tipi sessizce yedeğe düşmüş mü kontrol et
- Üretken/dekoratif grafikler için Canvas veya WebGL kullan — elle uzun SVG path verisi yazma
- Gerçek içerikle kur, lorem ipsum ile değil — düzen gerçek metinle çöker, sahte metinle değil

---

## Yayın Öncesi Denetim

- [ ] Sadece medya sorgusu/`[data-theme]` içinde tanımlanmış renk yok
- [ ] `body` açık bir zemin rengi alıyor
- [ ] Her iki temada kontrast yeterli
- [ ] 320 px'de yatay kaydırma yok
- [ ] Klavye odağı görünür
- [ ] `prefers-reduced-motion` uygulanmış
- [ ] Geniş içerik kendi kabında kayıyor
- [ ] Yazı tipleri yükleniyor, TR karakterler doğru
- [ ] Gerçek içerik var, lorem yok
- [ ] Bir aksesuar çıkarıldı
