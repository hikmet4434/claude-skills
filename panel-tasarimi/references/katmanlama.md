# İnce Katmanlama

Zanaatın temeli. Sistemin çalıştığını neredeyse hiç fark etmemelisin.

---

## Yüzey Yükseklik Ölçeği

Numaralı sistem: taban, sonra artan seviyeler. **Her sıçrama birkaç yüzde puanlık açıklık farkı.**

### Koyu mod (yükseklik = daha açık)

```css
:root[data-tema="koyu"]{
  --yuzey-0:#121412;   /* sayfa zemini */
  --yuzey-1:#181B18;   /* kenar çubuğu, üst bar */
  --yuzey-2:#1E221E;   /* kart */
  --yuzey-3:#252A25;   /* açılır menü, popover */
  --yuzey-4:#2D332D;   /* modal, en üst katman */
  --girdi:  #101210;   /* girdi — çevresinden DAHA KOYU */
}
```

### Açık mod (yükseklik = daha açık + gölge)

```css
:root{
  --yuzey-0:#F2EDE4;   /* sayfa zemini — saf beyaz değil */
  --yuzey-1:#F7F4EE;   /* kenar çubuğu */
  --yuzey-2:#FCFAF6;   /* kart */
  --yuzey-3:#FFFFFF;   /* açılır menü */
  --yuzey-4:#FFFFFF;   /* modal + daha güçlü gölge */
  --girdi:  #EEE9E0;   /* girdi — DAHA KOYU */
}
```

**Fark ölçüsü:** Ardışık iki yüzeyi yan yana koy. Farkı görebiliyorsan çok fazla. Üst üste bindirdiğinde hiyerarşiyi hissedebiliyorsan doğru.

**Açık modda saf beyaz zemin kullanma.** `#FFFFFF` sayfa zemini olduğunda kartların yükselecek yeri kalmaz — kart ya gri olur (kirli durur) ya da gölgeye mahkûm kalır.

---

## Üç Kritik Karar

### Kenar çubuğu = tuval zemini

```css
/* YANLIŞ — alanı ikiye böler */
.kenar-cubugu{ background: var(--yuzey-3); }
.tuval{ background: var(--yuzey-0); }

/* DOĞRU — tek alan, ince ayrım */
.kenar-cubugu{
  background: var(--yuzey-0);
  border-right: 1px solid var(--cizgi);
}
.tuval{ background: var(--yuzey-0); }
```

Farklı renkli kenar çubuğu, kullanıcıya "burası ayrı bir dünya" der. Oysa navigasyon ürünün kendisidir, yanında duran bir şey değil.

**İstisna:** Ürünün dünyası gerçekten iki alanlı ise (örneğin bir düzenleyici ile önizleme) ayrım anlamlıdır. O zaman **bilinçli** yap.

### Açılır menü = bir seviye üstü

```css
.kart{ background: var(--yuzey-2); }
.kart .acilir-menu{ background: var(--yuzey-3); }  /* +1 */

.sayfa .acilir-menu{ background: var(--yuzey-2); } /* sayfa üstünde ise +1 */
```

İkisi aynı seviyedeyse menü karta karışır ve "üstte" hissi kaybolur.

### Girdi = daha koyu

```css
.girdi{
  background: var(--girdi);            /* çevresinden daha koyu */
  border: 1px solid var(--cizgi);
  color: var(--metin-1);
}
.girdi::placeholder{ color: var(--metin-sessiz); }
```

Girdiler içerik **alır** — iç içe geçmiştir. Koyu arka plan, kalın kenarlık olmadan "buraya yaz" der. Açık girdi ise kalın kenarlık ister ve sertleşir.

---

## Kenarlık İlerlemesi

Düz hex kenarlık sert durur. **Düşük opaklıkta RGBA** arka planla karışır.

```css
:root{
  --cizgi-yumusak: rgba(28,30,29,.06);   /* zayıf ayrım, liste satırları */
  --cizgi:         rgba(28,30,29,.10);   /* standart */
  --cizgi-guclu:   rgba(28,30,29,.16);   /* vurgu, aktif kart */
  --cizgi-odak:    var(--vurgu);          /* odak halkası */
}
:root[data-tema="koyu"]{
  --cizgi-yumusak: rgba(255,252,245,.05);
  --cizgi:         rgba(255,252,245,.09);
  --cizgi-guclu:   rgba(255,252,245,.15);
}
```

**Kullanım:** liste satır ayırıcı → yumuşak · kart ve panel → standart · seçili/aktif öğe → güçlü · klavye odağı → odak.

**Her kenarlık aynı ağırlığı hak etmez.** Bir tabloda her satıra standart kenarlık koymak ızgara kâğıdı üretir; yumuşak kenarlık ritim üretir.

---

## Gölge

Koyu modda gölge **görünmez** — ayrım için kenarlığa güven. Açık modda gölge yükseklik taşır ama incelikli olmalı.

```css
:root{
  --golge-1: 0 1px 2px rgba(28,30,29,.04);
  --golge-2: 0 1px 3px rgba(28,30,29,.06), 0 8px 24px -12px rgba(28,30,29,.14);
  --golge-3: 0 2px 6px rgba(28,30,29,.08), 0 16px 40px -16px rgba(28,30,29,.22);
}
:root[data-tema="koyu"]{
  --golge-1: none;
  --golge-2: 0 1px 2px rgba(0,0,0,.4);
  --golge-3: 0 8px 32px -12px rgba(0,0,0,.7);
}
```

**Gösterişli gölge yasağı:** Renkli gölge, geniş yayılım, çift katman parlaklık — bunlar dikkat çeker. Gölgenin işi yükseklik taşımak, görünmek değil.

---

## Göz Kısma Testi

Arayüze gözlerini kısarak bak.

**Görmen gereken:** yapı · neyin neyin üstünde olduğu · bölümlerin nerede ayrıldığı · sayfadaki tek vurgu noktası.

**Görmemen gereken:** keskin çizgiler · rahatsız renk sıçraması · göze batan bir kutu · birden çok yarışan vurgu.

**Bu test profesyonel arayüzü amatörden ayırır.** Katmanlama yanlışsa gerisi önemli olmaz — tipografi ne kadar iyi olursa olsun arayüz ucuz durur.

---

## Sık Yapılan Hatalar

| Hata | Belirti | Düzeltme |
|------|---------|----------|
| Yüzey sıçraması çok büyük | Kartlar zeminden "kopmuş" durur | Açıklık farkını yarıya indir |
| Saf beyaz zemin | Kartlar yükselemiyor | Zemini birkaç puan koyulaştır |
| Girdi çevresinden açık | Kalın kenarlık gerekiyor, sert duruyor | Girdiyi koyulaştır, kenarlığı inceltl |
| Kenar çubuğu farklı renk | Alan ikiye bölünmüş | Aynı zemin + tek kenarlık |
| Düz hex kenarlık | Çizgiler göze batıyor | RGBA düşük opaklığa geçir |
| Tüm kenarlıklar aynı | Izgara kâğıdı hissi | İlerleme kur, listede yumuşak kullan |
| Koyu modda gölgeye güvenme | Katmanlama kayboluyor | Kenarlık yoğunluğunu artır |
| Farklı yüzeyler farklı ton | Renk kirlenmesi | Aynı tonu koru, sadece açıklık değiştir |
