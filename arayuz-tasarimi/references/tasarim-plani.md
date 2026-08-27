# Tasarım Planı Şablonu

Kod yazmadan önce doldur. Dört başlık, yarım sayfa.

---

## Şablon

```
KONU
  Ne:        [somut ürün/konu]
  Kime:      [hedef kitle]
  Tek iş:    [sayfanın yapması gereken tek şey]
  Dünyası:   [malzemeleri, araçları, jargonu — seçimlerin kaynağı]

RENK
  --zemin      #______   [ne için]
  --yuzey      #______   [ne için]
  --murekkep   #______   [ana metin]
  --sessiz     #______   [ikincil metin]
  --vurgu      #______   [tek vurgu]
  --cizgi      #______   [ayırıcı]
  Nötrün eğilimi: [vurguya doğru hangi yönde kaydırıldı]

TİPOGRAFİ
  Başlık:    [aile] — [ağırlık] — [neden bu]
  Gövde:     [aile] — [ağırlık]
  Yardımcı:  [aile] — [nerede kullanılacak]
  Ölçek:     [örn. 13 / 15 / 18 / 24 / 34 / 48]

DÜZEN
  Konsept:   [tek cümle]
  Tel çerçeve: [ASCII]

İMZA
  Ne:        [tek öğe]
  Neden:     [brief'i nasıl somutlaştırıyor]
  Risk:      [bu neden güvenli değil, neden değer]
```

---

## Denetim Adımı

Planı yazdıktan sonra her satır için sor:

> "Bunu benzer bir brief için de yazar mıydım?"

| Cevap | Aksiyon |
|-------|---------|
| Evet, aynen | **Revize et** — bu bir varsayılan, seçim değil |
| Evet ama gerekçem bu konuya özgü | Kalsın, gerekçeyi yaz |
| Hayır, bu konudan çıktı | Kalsın |

Değiştirdiğin her parçayı **ne** ve **neden** diye not et. Bu not çıktının bir parçası.

---

## ASCII Tel Çerçeve Örnekleri

Fikir üretmek ve karşılaştırmak için. İki alternatif çiz, birini seç.

### A — Sakin, kenar hizalı

```
┌────────────────────────────────────────────┐
│ logo                          nav    [cta] │
├────────────────────────────────────────────┤
│                                            │
│  ÜST ETİKET                                │
│  Başlık burada, iki satır kadar,           │
│  sola hizalı                               │
│                                            │
│  Alt açıklama, 65 karakter genişlikte      │
│                                            │
│  [birincil]  ikincil →                     │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ İMZA ÖĞESİ — canlı demo / görsel     │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

### B — İmza öğesi hero'nun kendisi

```
┌────────────────────────────────────────────┐
│ logo                          nav    [cta] │
├────────────────────────────────────────────┤
│                                            │
│   ┌──────────────────────────────────┐     │
│   │                                  │     │
│   │      İMZA — ekranın çoğunu       │     │
│   │      kaplayan tek an             │     │
│   │                                  │     │
│   └──────────────────────────────────┘     │
│                                            │
│   Başlık tek satır, altında tek cümle      │
│                        [birincil eylem]    │
└────────────────────────────────────────────┘
```

### C — Araç/pano düzeni (hero yok)

```
┌────────────────────────────────────────────┐
│ logo    ara...                    [hesap]  │
├──────────┬─────────────────────────────────┤
│          │  ÖZET ŞERİDİ                    │
│  yan     │  ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  menü    │  │    │ │    │ │    │ │    │    │
│          │  └────┘ └────┘ └────┘ └────┘    │
│  · bölüm │                                 │
│  · bölüm │  ANA İÇERİK                     │
│  · bölüm │  [tablo / grafik / liste]       │
│          │                                 │
└──────────┴─────────────────────────────────┘
```

**Pano kuralı:** Bu bir doküman değil, çalıştırılan bir arayüz. Zanaat tipografiden bilgi tasarımına kayar: özet detaydan önce · durum sayıyla değil **biçimle** de kodlanır (rozet, çip, şerit) · anlamsal renk (iyi/uyarı/kritik) vurgu renginden ayrıdır ve vurgu yerine geçmez · etkileşimli olan etkileşimli görünür.

---

## İmza Öğesi Fikirleri

Konudan türeyen, konuya bağlı örnekler:

| Konu | Olası imza |
|------|-----------|
| Terzilik/moda aracı | Ölçü şeridi olarak kullanılan bir ölçek çizgisi; kumaş dokusu zemin |
| Ses/müzik aracı | Hero'da canlı dalga formu; hover'da titreşen tipografi |
| Finans paneli | Rakamların hizalandığı sıkı mono ızgara; tek bir sparkline |
| Harita/lojistik | Hero'da hareket eden rota çizgisi |
| Yazma aracı | İmleç ritmi; metnin gerçekten yazıldığı bir açılış |
| Laboratuvar/ölçüm | Cihaz arayüzünden alınmış ölçek işaretleri ve tolerans bantları |
| Tarım/üretim | Mevsim döngüsünü kodlayan renk geçişi |

**Sınama:** İmza öğesini kaldır. Sayfa hâlâ tanınabilir mi? Tanınabiliyorsa imza yeterince güçlü değil.

---

## Plan Örneği (doldurulmuş)

```
KONU
  Ne:        Küçük tekstil atölyeleri için kalıp yönetim aracı
  Kime:      2-10 kişilik atölyelerin üretim sorumluları
  Tek iş:    Ücretsiz denemeyi başlatmak
  Dünyası:   Kalıp kağıdı, ölçü şeridi, tebeşir, dikiş payı,
             beden tablosu, serim planı

RENK
  --zemin      #F7F4F0   kalıp kağıdının kırık beyazı
  --yuzey      #FFFFFF
  --murekkep   #1F1B18   koyu, hafif sıcak
  --sessiz     #7A7068
  --vurgu      #B4472F   terzi tebeşiri kırmızısı (işaretleme rengi)
  --cizgi      #E3DCD4
  Nötrün eğilimi: vurguya doğru sıcak/kırmızımsı

  DENETİM: Krem zemin + toprak vurgu, kaçınılacak varsayılan #1'e
  yakın. Ama burada gerekçesi konudan geliyor: kalıp kağıdı ve
  terzi tebeşiri. Vurguyu terracotta'dan tebeşir kırmızısına
  kaydırdım ve zemini biraz daha soğuttum, ayrışsın diye.

TİPOGRAFİ
  Başlık:    Bitter, 600 — yavaş, ağır serif; ölçü cetveli hissi
  Gövde:     Public Sans, 400
  Yardımcı:  IBM Plex Mono — ölçü ve beden değerleri için
  Ölçek:     12 / 14 / 16 / 20 / 28 / 40

DÜZEN
  Konsept:   Kalıp kağıdı gibi — ince ızgara çizgileri zeminde,
             içerik o ızgaraya oturuyor
  Tel çerçeve: [A varyantı]

İMZA
  Ne:        Zemindeki 1 cm'lik ölçü ızgarası ve hero'da hareket
             eden bir ölçü şeridi
  Neden:     Ürün ölçü yönetiyor; sayfa ölçünün kendisiyle kuruluyor
  Risk:      Izgara zemin dikkat dağıtabilir — %4 opaklıkta tuttum,
             hero dışında kayboluyor
```
