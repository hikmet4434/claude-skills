# E-posta Bülteni

## Yapı

```
KONU BAŞLIĞI    2-3 seçenek, her biri farklı açı
ÖNİZLEME METNİ  Konuyu tamamlar, tekrar etmez
SELAMLAMA
GÖVDE           Hiyerarşili — en önemli üstte
CTA             Tek birincil buton
KAPANIŞ
ABONELİK NOTU
```

---

## Konu Başlığı

**Kurallar:** 50 karakter altı (mobilde kesilmesin) · her kelimeyi büyük harfle başlatma · ünlem yok · spam kelimesi yok ("ÜCRETSİZ", "FIRSAT", "%50 İNDİRİM", "ACELE") · emoji B2B'de genelde açılma oranını düşürür.

**Üç seçeneği farklı açılardan üret:**

| Açı | Kalıp | Örnek |
|-----|-------|-------|
| Somut fayda | "[Sonuç]" | "İade oranını düşüren 3 değişiklik" |
| Merak | "[Eksik bilgi]" | "340 iadeyi tek tek inceledik" |
| Aciliyet / zaman | "[Zaman çerçevesi]" | "Bu ay biten şey" |
| Kişisel / soru | "[Doğrudan soru]" | "Beden rehberin işe yarıyor mu?" |

Her seçeneğin yanına **neden bu açı** diye tek satır not düş.

---

## Önizleme Metni

Gelen kutusunda konudan sonra görünen ~90 karakter. Boş bırakılırsa istemci gövdenin ilk satırını çeker — genelde "Bu e-posta görüntülenmiyorsa…" görünür ve açılma oranı düşer.

**İyi:** Konuyu tamamlayan, cümleyi ileriye taşıyan.
> Konu: "340 iadeyi tek tek inceledik"
> Önizleme: "291'i aynı şeyi söylüyordu. Hangisi olduğunu tahmin edebilirsiniz."

**Kötü:** Konunun tekrarı.

---

## Gövde

**Ters piramit:** En önemli bilgi üstte. Çoğu okuyucu ilk ekranı geçmez.

```
[Açılış — 1-2 cümle, neden yazdın]

[Ana içerik — bölümlere ayrılmış, her bölüm kısa]

[CTA]

[İkincil içerik — varsa, CTA'nın ALTINDA]
```

**Kurallar:** paragraf başına 2–3 cümle · alt başlık kullan (taranıyor, okunmuyor) · madde listesi düz tire · tek sütun (mobil %60+) · metin blokları 600 px genişliği geçmesin.

**Uzunluk:** 200–500 kelime. Uzun içerik varsa özet + bağlantı; tam metni e-postaya yapıştırma.

---

## CTA

**Tek birincil eylem.** İkinci buton tıklamayı böler.

| Zayıf | Güçlü |
|-------|-------|
| "Tıklayın" | "Rehberi indir" |
| "Daha fazla bilgi" | "3 dakikalık demoyu izle" |
| "Gönder" | "Yerimi ayır" |

Buton metni **ne olacağını** söylesin. Tıklayınca ne göreceğini bilmeyen kişi tıklamaz.

**Yerleşim:** Birincil CTA ilk ekranda görünür olsun; uzun bültende sonda tekrarla (aynı metin, aynı hedef).

---

## Kapanış

- Gerçek bir kişiden gelsin (`bulten@` değil, bir isim)
- Yanıtlanabilir bir adres kullan — `noreply@` hem soğuk hem teslim edilebilirliği düşürür
- İmza sade: isim, unvan, şirket

---

## Yasal ve Teknik

- **Abonelikten çıkma bağlantısı zorunlu** (KVKK / İYS · GDPR · CAN-SPAM)
- Açık posta adresi (ticari toplu iletide yasal gereklilik)
- Türkiye'de ticari elektronik ileti için **İYS kaydı ve onay** yükümlülüğü var — bu hukuki tavsiye değildir, gönderim öncesi kendi yükümlülüğünü doğrula
- Çıkma talebini **aynı gün** uygula

**HTML gerekiyorsa:** `iletisim-taslagi` skillindeki `references/html-email.md` — çalışan 600 px tablo şablonu, karanlık tema, test kontrol listesi ve teslim edilebilirlik kuralları içerir.

---

## Ölçüm Notu

Açılma oranı artık güvenilir değil (gizlilik korumaları e-postaları önceden yüklüyor). **Tıklama oranını ve dönüşümü** izle. Konu başlığı A/B testi yapıyorsan başarı ölçütü tıklama olsun, açılma değil.
