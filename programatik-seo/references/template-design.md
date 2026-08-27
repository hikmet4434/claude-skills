# Şablon Tasarımı

## Amaç

Şablon, aynı iskeleti tekrarlarken **sayfaların birbirine benzememesini** sağlamalı. Bunun ölçüsü net: sayfanın en az **%60'ı satıra özgü** olmalı.

---

## Sayfa İskeleti

```
1. BAŞLIK          Hedef anahtar kelimeyi doğal biçimde içerir
2. GİRİŞ           2-3 cümle, satır verisinden ÜRETİLMİŞ (yer değiştirme değil)
3. ANA VERİ        Satırın kendi verisi — tablo, liste, kart
4. ANALİZ          Hesaplanmış içgörü (sıralama, sapma, karşılaştırma)
5. KOŞULLU BLOK    Satır özelliğine göre açılan bölüm(ler)
6. SSS             Satıra özgü soru-cevap
7. İLGİLİ SAYFALAR İç bağlantılar
8. CTA             Sayfanın amacına uygun
```

Bölüm sayısı sabit olmak zorunda değil — **koşullu bölümler** hem farklılık hem gerçek değer üretir.

---

## Yer Değiştirme vs Üretim

**Yer değiştirme (yasak bölgesi):**
```
"{sehir} şehrinde {hizmet} arıyorsanız doğru yerdesiniz.
{sehir}'de en iyi {hizmet} hizmetini sunuyoruz."
```
Bu 81 şehir için 81 kez basıldığında Google'ın tam olarak aradığı kalıptır.

**Üretim (doğru):**
```
"{sehir}'de {firma_sayisi} {hizmet} bulunuyor; bunların
{merkez_ilce_yuzde}%'i {en_yogun_ilce} çevresinde toplanmış.
Ortalama müşteri puanı {ort_puan}, {il_ortalamasi_karsilastirma}."
```
Her değişken gerçek veriden geliyor ve cümlenin **anlamı** şehirden şehre değişiyor.

**Fark:** Birincide veri süsleme, ikincide veri **içeriğin kendisi**.

---

## Koşullu Bloklar

Satırın özelliğine göre farklı bölümler açılır. Bu, hem benzersizliği hem kullanışlılığı artırır.

```
EĞER firma_sayisi > 50:
    → "Nasıl seçilir" bölümü (çok seçenek var, karar zor)
EĞER firma_sayisi < 5:
    → "Yakın şehirler" bölümü (seçenek az, alternatif sun)
EĞER ortalama_fiyat > il_ortalamasi * 1.2:
    → "Neden bu şehirde daha pahalı" bölümü
EĞER yorum_sayisi > 100:
    → "Kullanıcılar ne diyor" tema analizi bölümü
EĞER veri_guncelleme < 90 gün:
    → "Son değişiklikler" bölümü
```

**Kural:** 4-6 koşullu blok, sayfa çeşitliliğini kombinatorik olarak artırır. 5 blok = 32 farklı sayfa şekli.

---

## Hesaplanmış Analiz

En ucuz benzersizlik kaynağı: eldeki veriden **türetilmiş** içgörü. Ek veri toplamaz, gerçek değer üretir.

| Analiz tipi | Örnek cümle |
|-------------|-------------|
| Sıralama | "Bu, 81 il arasında 12. sırada" |
| Ortalamadan sapma | "Ülke ortalamasının %23 üzerinde" |
| Yoğunlaşma | "Firmaların %64'ü tek bir ilçede" |
| Trend | "Geçen yıla göre 8 firma artmış" |
| Aykırılık | "Bu şehirde fiyat aralığı alışılmadık şekilde geniş" |
| Eşleştirme | "Benzer büyüklükteki [X] ile karşılaştırıldığında" |

---

## Başlık ve Meta Şablonları

```
BAŞLIK   {birincil_kelime} | {ayirici_deger} — {marka}
         Örnek: "İzmir Diş Klinikleri | 47 Klinik, Puan ve Fiyat — SiteAdı"
         ≤ 60 karakter; ayırıcı değer satırdan gelmeli

META     {sayi} {konu} karşılaştırıldı. {ayirt_edici_veri}.
         {eylem_cagrisi}.
         Örnek: "İzmir'deki 47 diş kliniği karşılaştırıldı.
         Ortalama puan 4.3, fiyat aralığı geniş. Semt semt liste."
         ≤ 155 karakter; her sayfada farklı sayı → doğal benzersizlik

H1       Başlıkla aynı olmasın; daha doğal, daha uzun olabilir
```

**Uyarı:** Meta açıklamada satırdan gelen sayı kullanmak, benzersizliği bedava sağlar. Sabit meta şablonu = binlerce aynı meta = ince içerik sinyali.

---

## Şema İşaretlemesi

| Playbook | Şema tipi |
|----------|-----------|
| Konumlar | `LocalBusiness` + `ItemList` |
| Dizin / Derleme | `ItemList` + `Product` / `SoftwareApplication` |
| Karşılaştırmalar | `FAQPage` (karar soruları) |
| Sözlük | `DefinedTerm` + `DefinedTermSet` |
| Örnekler | `ImageObject` + `CreativeWork` |
| Profiller | `Organization` / `Person` |
| Tümü | `BreadcrumbList` |

**Kural:** Şema, sayfada **görünen** bilgiyi işaretler. Sayfada olmayan veriyi şemaya koymak yapılandırılmış veri ihlalidir.

---

## Eksik Veri Yönetimi

En kritik kural: **eksik alanı uydurma.**

```
Zorunlu alan eksik      → satırı ele, sayfa üretme
İkincil alan eksik      → o bölümü gizle (boş bırakma, "bilinmiyor" yazma)
Veri eski (>12 ay)      → sayfada tarih göster veya noindex
Veri çelişkili          → yayınlama, kaynağı düzelt
```

Şablonda her alan için `varsa göster / yoksa gizle` mantığı kurulmalı. "Telefon: —" yazan 400 sayfa, veri kalitesizliğini ilan eder.

---

## Sabit İçerik Bütçesi

| Bölüm | Sabit olabilir mi |
|-------|-------------------|
| Navigasyon, altbilgi | Evet |
| CTA metni | Evet |
| Genel açıklama paragrafı | En fazla 1, kısa |
| Giriş | **Hayır** — üretilmiş olmalı |
| Ana içerik | **Hayır** |
| SSS | Kısmen — 1-2 genel, kalanı satıra özgü |

**Ölçüm:** İki rastgele sayfayı yan yana koy ve ortak metni işaretle. Ortak kısım %40'ı geçiyorsa şablon yetersiz.
