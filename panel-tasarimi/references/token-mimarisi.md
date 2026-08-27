# Token Mimarisi

Arayüzdeki her renk küçük bir temel kümeye dayanır. **Rastgele hex yok.**

---

## Adlandırma

Token adları tasarım kararlarıdır, uygulama detayı değil.

| Şablon çağırır | Dünya çağırır |
|----------------|---------------|
| `--gray-700` | `--celik` |
| `--surface-2` | `--fis-kagidi` |
| `--primary` | `--damga` |
| `--text-muted` | `--silik-mürekkep` |
| `--bg-secondary` | `--tezgah` |

**Token testi:** Değişkenlerini sesli oku. Bu ürünün dünyasına mı ait, herhangi bir projeye mi?

**Denge:** Aşırıya kaçma. `--yuzey-1`, `--metin-2` gibi yapısal adlar kalabilir; **kimlik taşıyan renkler** (vurgu, zemin, ana metin) dünyadan gelsin. Her token'ı şiirsel adlandırmak okunabilirliği bozar.

---

## Temel Kümeler

```css
:root{
  /* ── Yüzeyler (yükseklik) ─────────────── */
  --yuzey-0: #______;   /* sayfa */
  --yuzey-1: #______;   /* kenar çubuğu, üst bar */
  --yuzey-2: #______;   /* kart */
  --yuzey-3: #______;   /* açılır menü */
  --yuzey-4: #______;   /* modal */

  /* ── Metin (dört seviye) ──────────────── */
  --metin-1: #______;   /* birincil — varsayılan metin */
  --metin-2: #______;   /* ikincil — destekleyici */
  --metin-3: #______;   /* üçüncül — meta veri, zaman damgası */
  --metin-0: #______;   /* sessiz — devre dışı, yer tutucu */

  /* ── Kenarlık (ilerleme) ──────────────── */
  --cizgi-yumusak: rgba(_,_,_,.06);
  --cizgi:         rgba(_,_,_,.10);
  --cizgi-guclu:   rgba(_,_,_,.16);

  /* ── Kontroller (ayrı küme) ───────────── */
  --girdi-zemin:   #______;   /* çevresinden koyu */
  --girdi-cizgi:   rgba(_,_,_,.12);
  --odak:          #______;   /* odak halkası */

  /* ── Kimlik ───────────────────────────── */
  --vurgu:         #______;   /* TEK vurgu rengi */
  --vurgu-uzeri:   #______;   /* vurgu üzerindeki metin */

  /* ── Anlamsal ─────────────────────────── */
  --basari:  #______;
  --uyari:   #______;
  --yikici:  #______;
  --bilgi:   #______;
}
```

---

## Metin Hiyerarşisi: Dört Seviye

**Sadece "metin" ve "gri metin" ile yetinme.**

| Seviye | Rolü | Örnek kullanım |
|--------|------|----------------|
| `--metin-1` | Varsayılan metin | Başlık, tablo hücresi, gövde |
| `--metin-2` | Destekleyici | Alt açıklama, ikincil sütun |
| `--metin-3` | Meta veri | Zaman damgası, kayıt kimliği, birim |
| `--metin-0` | Sessiz | Devre dışı, yer tutucu, boş durum |

**Sadece ikisini kullanıyorsan hiyerarşin çok düz.** Bir tabloda ürün adı, miktar ve son güncelleme aynı renkteyse göz nereye bakacağını bilmez.

**Kontrast kontrolü:** `--metin-3` ve `--metin-0` çoğu tasarımda WCAG sınırının altına düşer. Meta veri için 4.5:1 zorunlu değilse bile 3:1'in altına inme; devre dışı öğelerde erişilebilirlik istisnası var ama okunmaz olmasın.

---

## Anlamsal Renkler

Anlamsal renk **vurgu renginden ayrıdır** ve onun yerine geçmez.

```css
/* Yanlış — vurgu rengi başarı olarak kullanılıyor */
.rozet-basarili{ background: var(--vurgu); }

/* Doğru */
.rozet-basarili{
  background: color-mix(in srgb, var(--basari) 12%, transparent);
  color: var(--basari);
  border: 1px solid color-mix(in srgb, var(--basari) 24%, transparent);
}
```

**Koyu modda anlamsal renkler doygunluk düşürmeli.** Açık modda çalışan parlak kırmızı, koyu zeminde titreşir.

**Renk tek başına durum taşımaz.** Renk körü kullanıcılar için ikon, biçim veya metin ekle: yeşil nokta + "Aktif", kırmızı üçgen + "Hata".

---

## Boşluk Ölçeği

Bir temel birim seç ve **katlarına bağlı kal**. Rastgele değerler sistem olmadığını gösterir.

```css
:root{
  --bosluk-1:  4px;   /* mikro — ikon ile metin arası */
  --bosluk-2:  8px;   /* sıkı — rozet içi, satır içi */
  --bosluk-3: 12px;   /* bileşen içi */
  --bosluk-4: 16px;   /* standart — kart dolgusu */
  --bosluk-5: 24px;   /* gruplar arası */
  --bosluk-6: 32px;   /* bölüm arası */
  --bosluk-7: 48px;   /* büyük ayrım */
}
```

**Bağlama göre ölçek:**

| Bağlam | Aralık |
|--------|--------|
| İkon–metin | 1–2 |
| Düğme iç dolgusu | 2–3 dikey, 3–4 yatay |
| Kart iç dolgusu | 4–5 |
| Liste öğeleri arası | 2–3 |
| Bölüm grupları arası | 5–6 |
| Sayfa kenar boşluğu | 5–7 |

**Yoğunluk niyeti değiştirir.** "Yoğun" bir niyet varsa ölçeği sıkıştır (temel birim 4px, kart dolgusu 12px); "ferah" ise genişlet (temel 8px, kart dolgusu 24px). **Niyeti yazıp varsayılan ölçeği kullanma.**

---

## Dolgu Simetrisi

Bir tarafın değeri varsa diğerleri de uymalı — içerik doğal olarak asimetri gerektirmiyorsa.

```css
/* Şüpheli */
.kart{ padding: 16px 20px 24px 16px; }

/* Net */
.kart{ padding: 20px; }

/* Bilinçli asimetri — üstte başlık var, altta eylem */
.kart{ padding: 16px 20px 20px; }
```

Bilinçli asimetriyi **yorum satırıyla gerekçelendir**; yoksa altı ay sonra kimse neden öyle olduğunu bilmez.

---

## Yarıçap Ölçeği

```css
:root{
  --yaricap-1: 4px;    /* rozet, küçük çip */
  --yaricap-2: 6px;    /* girdi, düğme */
  --yaricap-3: 10px;   /* kart */
  --yaricap-4: 14px;   /* modal, büyük panel */
  --yaricap-tam: 999px;/* pill, avatar */
}
```

**Keskin teknik, yuvarlak samimi hissettirir.** Niyet "kesin ve teknik" ise ölçeği düşür (2/4/6/8); "sıcak ve yaklaşılabilir" ise yükselt (6/10/14/20).

**Küçük öğede büyük yarıçap orantısızdır.** 20px yüksekliğindeki bir rozete 12px yarıçap verirsen kapsül olur ama kapsül olmasını istemiyorsan hata.

**İç içe yarıçap:** Dış kabın yarıçapı, iç öğenin yarıçapı + aradaki dolgu kadar olmalı. 16px dolgulu bir kartın içindeki 6px yarıçaplı düğme için kart yarıçapı ~10-12px doğru durur.

---

## Tipografi Token'ları

```css
:root{
  --yazi-baslik: "______", ______, sans-serif;
  --yazi-govde:  "______", ______, sans-serif;
  --yazi-veri:   "______", ui-monospace, monospace;

  --boyut-1: 11px;  /* mikro etiket */
  --boyut-2: 12px;  /* meta veri */
  --boyut-3: 13px;  /* ikincil */
  --boyut-4: 14px;  /* gövde, tablo */
  --boyut-5: 16px;  /* öne çıkan gövde */
  --boyut-6: 20px;  /* bölüm başlığı */
  --boyut-7: 28px;  /* sayfa başlığı */
  --boyut-8: 40px;  /* ana metrik */
}
```

**Panolarda taban boyut 14px'tir**, 16px değil. Pano taranır, okunmaz; 16px gövde metni yoğun bir tabloda yer israfıdır. Ama **11px'in altına inme** — okunmaz.

**Veri için mono + tabular:**
```css
.veri{
  font-family: var(--yazi-veri);
  font-variant-numeric: tabular-nums;
}
```
Rakamların alt alta hizalanması sadece estetik değil işlevsel — göz sütunu tarayabilir.

**Sadece boyuta güvenme.** Hiyerarşi boyut + ağırlık + harf aralığı + renkten oluşur:
```css
.etiket{ font-size:var(--boyut-1); font-weight:500;
         letter-spacing:.06em; text-transform:uppercase;
         color:var(--metin-3); }
.baslik{ font-size:var(--boyut-6); font-weight:600;
         letter-spacing:-.01em; color:var(--metin-1); }
```

---

## Token Denetimi

Kod bittiğinde tara:

- [ ] Hiçbir yerde ham hex yok (token dışında)
- [ ] Dört metin seviyesi de kullanılıyor
- [ ] Kenarlık ilerlemesi kullanılıyor (hepsi `--cizgi` değil)
- [ ] Kontroller kendi token'larını kullanıyor
- [ ] Tek vurgu rengi var
- [ ] Anlamsal renkler vurgudan ayrı
- [ ] Boşluklar ölçekten geliyor
- [ ] Token adları ürünün dünyasına ait
