# Metrikler ve Gösterge Panoları

## Metrik Hiyerarşisi

**Öncü göstergeler** bugünü kontrol eder, **gecikmeli göstergeler** dünü raporlar. Sadece gecikmeli izlersen düzeltme şansın kalmaz.

### Öncü (Leading)
| Metrik | Sahip | Kıyas | Ritim |
|--------|-------|-------|-------|
| SDR başına günlük e-posta | SDR | 50–100 | Günlük |
| Yanıt oranı | SDR | %9–15 | Haftalık |
| Referans alma oranı | SDR | %5–10 | Haftalık |
| Haftalık planlanan toplantı | SDR | 3–6 | Haftalık |
| Aylık kabul edilmiş fırsat (SQO) | SDR | 10–20 | Aylık |
| Açık pipeline değeri | AE | Hedefin 3–4 katı | Haftalık |
| İlk yanıt süresi (inbound) | MDR | <5 dk | Günlük |

### Gecikmeli (Lagging)
| Metrik | Sahip | Kıyas |
|--------|-------|-------|
| Kapanan gelir | AE | Kota |
| Kazanma oranı | AE | %20–30 |
| Ortalama anlaşma büyüklüğü | AE | Sektöre göre |
| Satış döngüsü | AE | 30–90 gün |
| CAC | Yönetim | LTV'nin 1/3'ünden az |
| Net gelir tutma (NRR) | CSM | >%100 |
| Churn | CSM | <%1/ay (SMB), <%1/yıl (kurumsal) |

### Verimlilik
| Metrik | Formül | Hedef |
|--------|--------|-------|
| Fırsat başına maliyet | SDR toplam maliyeti ÷ SQO | Ort. anlaşmanın <%10'u |
| SDR:AE oranı | SDR sayısı ÷ AE sayısı | 2–3:1 |
| LTV:CAC | LTV ÷ CAC | >3:1 |
| CAC geri ödeme | CAC ÷ (aylık brüt kâr) | <12 ay |
| Kota ulaşım oranı | Kotayı tutturan temsilci % | >%60 |
| Pipeline hızı | (Fırsat × Ort. anlaşma × Kazanma) ÷ Döngü | Artan trend |

---

## Pano Ritmi

### Günlük — Aktivite Panosu (SDR ekibi)
```
| SDR      | E-posta | Yanıt | Toplantı | Ay Toplam SQO | Kota % |
|----------|---------|-------|----------|---------------|--------|
| Ayşe     | 78      | 9     | 2        | 11 / 15       | 73%    |
| Mehmet   | 52      | 4     | 1        | 7 / 15        | 47%    |
```
Amaç: erken uyarı. E-posta hacmi düşerse 3 hafta sonra pipeline düşer.

### Haftalık — Pipeline Panosu
```
Yeni SQO (bu hafta):        __
Toplam açık fırsat:         __
Açık pipeline değeri:       __ $
Pipeline kapsamı:           __ x  (hedef 3–4x)
Aşama geçiş oranları:       Discovery→Demo __%  Demo→Teklif __%  Teklif→Kapanış __%
Bayat fırsatlar (>30 gün hareketsiz): __
```

### Aylık — Gelir Panosu
```
Kapanan gelir:      __ $  (hedef __ $, %__)
Anlaşma sayısı:     __
Ortalama anlaşma:   __ $
Kazanma oranı:      __%
Satış döngüsü:      __ gün
Kaynak kırılımı:    Tohum __% / Ağ __% / Mızrak __%
Kayıp nedenleri:    Fiyat __ | Rakip __ | Zamanlama __ | Aksiyon yok __
```

### Çeyreklik — Verimlilik İncelemesi
```
CAC:                __ $        LTV: __ $       LTV:CAC: __
CAC geri ödeme:     __ ay
Fırsat başına maliyet: __ $
SDR:AE oranı:       __
Kota ulaşım oranı:  __%
SDR devir hızı:     __%
Gelecek çeyrek işe alım ihtiyacı: __ SDR, __ AE
```

---

## Huni Dönüşüm Tablosu (Doldur ve İzle)

| Aşama | Adet | Bir öncekinden dönüşüm | Kıyas |
|-------|------|------------------------|-------|
| Hedef hesap | | — | — |
| Gönderilen e-posta | | | — |
| Yanıt | | %9–15 | |
| Nitelendirme görüşmesi | | %40–60 | |
| Kabul edilmiş fırsat (SQO) | | %50–70 | |
| Demo | | %70–85 | |
| Teklif | | %50–70 | |
| Kapanan | | %40–60 | |

**Kullanım:** En düşük dönüşümlü tek adımı bul, sadece ona odaklan. Aynı anda üç aşamayı düzeltmeye çalışmak hiçbirini düzeltmez.

---

## Kayıp Analizi

Her kayıp fırsat için tek bir birincil neden kaydet:
- Fiyat / bütçe
- Rakibe gitti (hangisi?)
- Zamanlama / proje ertelendi
- Aksiyon yok (statüko kazandı)
- Yanlış nitelendirme (ICP dışıydı)
- Şampiyon şirketten ayrıldı

"Aksiyon yok" %30'u aşıyorsa sorun rakip değil, **aciliyet yaratamamandır** → discovery derinliğine bak.
"Yanlış nitelendirme" %15'i aşıyorsa → SDR kabul kriterlerini sıkılaştır.

---

## Kurulum Notları

- Tek gerçek kaynağı CRM olsun; pano CRM'den beslensin, elle Excel tutulmasın
- Her metriğin **tek** sahibi olsun
- Haftalık ekip toplantısında panoyu ekrana yansıt — görünürlük davranışı değiştirir
- Metrik sayısını sınırla: SDR için 4, AE için 4, yönetim için 8'i geçme
