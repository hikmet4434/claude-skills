# Pipeline Matematiği ve Kapasite Planlama

## Temel Formül (Geriye Doğru Çalış)

```
1) Gereken Anlaşma   = Gelir Hedefi ÷ Ortalama Anlaşma Büyüklüğü
2) Gereken Fırsat    = Gereken Anlaşma ÷ Kazanma Oranı
3) Gereken Yanıt     = Gereken Fırsat ÷ (Yanıt→Fırsat dönüşümü)
4) Gereken E-posta   = Gereken Yanıt ÷ Yanıt Oranı
5) Gereken SDR       = Gereken E-posta ÷ (SDR başına aylık e-posta)
```

Zaman kaymasını unutma: bugünkü e-posta, satış döngüsü kadar sonra gelire döner.

---

## Örnek 1 — 1M$ ARR

| Adım | Hesap | Sonuç |
|------|-------|-------|
| Gelir hedefi | — | 1.000.000 $ |
| Ortalama anlaşma | — | 20.000 $ |
| Gereken anlaşma | 1.000.000 ÷ 20.000 | 50 |
| Kazanma oranı | %25 | — |
| Gereken fırsat | 50 ÷ 0,25 | 200 |
| Yanıt→fırsat | %10 | — |
| Gereken yanıt | 200 ÷ 0,10 | 2.000 |
| Yanıt oranı | %10 | — |
| Gereken e-posta | 2.000 ÷ 0,10 | 20.000 |
| SDR aylık e-posta | 1.500 (günde ~75) | — |
| SDR-ay | 20.000 ÷ 1.500 | ~13 |
| **Gereken SDR (12 ay)** | 13 ÷ 12 | **~1,1 → rampa payıyla 2** |

**Rampa düzeltmesi:** Yeni SDR ilk 3 ay ortalama %50 kapasitede çalışır. 12 ayda 1 SDR ≈ 10,5 SDR-ay üretir. Bu yüzden hedefe 2 SDR ile git.

---

## Örnek 2 — 5M$ ARR, Kurumsal

| Girdi | Değer |
|-------|-------|
| Gelir hedefi | 5.000.000 $ |
| Ortalama anlaşma | 100.000 $ |
| Kazanma oranı | %20 |
| Yanıt→fırsat | %8 |
| Yanıt oranı | %12 |
| SDR aylık e-posta | 1.200 |

- Gereken anlaşma: 50
- Gereken fırsat: 250
- Gereken yanıt: 3.125
- Gereken e-posta: ~26.050
- SDR-ay: ~21,7 → **2 SDR** (rampa payıyla 3)
- AE ihtiyacı: AE başına yıllık 12–15 anlaşma → **4 AE**
- SDR:AE oranı düşük görünüyor → kurumsalda normal (fırsat başına AE emeği yüksek)

---

## Pipeline Kapsamı (Coverage)

```
Gereken Pipeline Değeri = Çeyrek Gelir Hedefi × Kapsam Katsayısı
```

| Kazanma oranı | Kapsam katsayısı |
|---------------|------------------|
| %30+ | 3x |
| %20–30 | 3,5x |
| %15–20 | 4x |
| %15 altı | 5x+ |

Çeyrek hedefi 250K$ ve kazanma oranı %20 ise → çeyrek başında **~875K$** açık pipeline gerekir.

---

## Pipeline Hızı (Velocity)

```
Pipeline Hızı = (Fırsat Sayısı × Ortalama Anlaşma × Kazanma Oranı) ÷ Satış Döngüsü (gün)
```

Sonuç: günlük üretilen gelir. Dört kaldıraçtan hangisinin en ucuz olduğunu gösterir.

**Örnek:** 200 fırsat × 20.000$ × 0,25 ÷ 60 gün = **16.667 $/gün**
- Döngüyü 60→45 güne indirmek: 22.222 $/gün (+%33)
- Kazanma oranını %25→%30: 20.000 $/gün (+%20)
- Genelde **döngüyü kısaltmak** en ucuz kaldıraçtır.

---

## Kıyas Tablosu (Doldur)

| Metrik | Kıyas | Bizim | Fark | Aksiyon |
|--------|-------|-------|------|---------|
| SDR günlük e-posta | 50–100 | | | |
| Yanıt oranı | %9–15 | | | |
| Yanıt→fırsat | %8–15 | | | |
| SDR aylık SQO | 10–20 | | | |
| AE demo→kapanış | %20–30 | | | |
| Satış döngüsü | 30–90 gün | | | |
| Pipeline kapsamı | 3–4x | | | |
| SDR:AE | 2–3:1 | | | |
| LTV:CAC | >3:1 | | | |
| CAC geri ödeme | <12 ay | | | |

---

## Kapasite Planlama Takvimi

Bir SDR'ın **bugün** işe alınması, **~7 ay sonra** tam gelire döner:

```
Ay 0: İlan + mülakat
Ay 1: İşe başlama, eğitim
Ay 2–3: Rampa (%50 kapasite)
Ay 4: Tam kota → fırsat üretmeye başlar
Ay 4+döngü (2 ay): İlk kapanışlar
```

**Sonuç:** Gelecek yılın hedefini bu yılın 2. çeyreğinde işe alarak kur.

---

## Hızlı Hesap Şablonu

```
Gelir hedefi:            ____ $
Ortalama anlaşma:        ____ $
Kazanma oranı:           ____ %
Yanıt→fırsat:            ____ %
Yanıt oranı:             ____ %
SDR aylık e-posta:       ____

→ Gereken anlaşma:       ____
→ Gereken fırsat:        ____
→ Gereken yanıt:         ____
→ Gereken e-posta:       ____
→ Gereken SDR-ay:        ____
→ Gereken SDR (rampa +%20): ____
→ Gereken AE (AE başına 12–15 anlaşma/yıl): ____
```
