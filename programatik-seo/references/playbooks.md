# 12 Playbook — Veri, Şablon ve Risk

Her playbook için: hangi veri gerekir, sayfa neye benzer, ceza riski nedir.

---

## 1. Şablonlar — "[tür] şablonu"

**Veri:** Şablon dosyalarının kendisi (tescilli), kategori, kullanım senaryosu, format.
**Sayfa:** Önizleme görseli → indirilebilir dosya → nasıl kullanılır → ilgili şablonlar.
**Benzersizlik kaynağı:** Şablonun kendisi zaten benzersiz. En düşük riskli playbook.
**Risk:** Düşük — gerçek bir varlık sunuyorsun.
**Şart:** Şablonlar gerçekten farklı olmalı; aynı dosyanın renk varyasyonu 40 sayfa etmez.

## 2. Derleme — "en iyi [kategori]"

**Veri:** Ürün listesi, fiyat, özellik matrisi, **kendi değerlendirmen**.
**Sayfa:** Seçim kriteri → sıralı liste (her biri için neden bu sırada) → karşılaştırma tablosu → kime hangisi.
**Benzersizlik kaynağı:** Kendi test ve değerlendirmen.
**Risk:** **Yüksek** — üretici metnini kopyalayan derleme sayfası, affiliate spam kategorisine girer.
**Şart:** Her üründe en az bir kendi gözlemin olmalı. Yoksa bu playbook'u seçme.

## 3. Dönüşümler — "[X] → [Y]"

**Veri:** Dönüşüm oranları (canlı API), birim tanımları.
**Sayfa:** Hesaplayıcı (üstte, hemen çalışan) → güncel oran → yaygın miktarlar tablosu → kısa açıklama.
**Benzersizlik kaynağı:** Canlı veri + çalışan araç.
**Risk:** Orta — araç gerçekten çalışmalı; statik sayı listesi ince içeriktir.
**Şart:** Değer sayfanın **üstünde** ve tıklamadan görünür olmalı.

## 4. Karşılaştırmalar — "[X] vs [Y]"

**Veri:** Özellik matrisi, fiyat, kullanım senaryosu farkları.
**Sayfa:** Tek cümlelik karar özeti → yan yana tablo → kimin için X, kimin için Y → dürüst zayıf yönler.
**Benzersizlik kaynağı:** Karar rehberliği — tablo değil, **hangisi kime uygun** analizi.
**Risk:** **Yüksek** — kelime düzeyinde farklı, örtüşen karşılaştırma sayfaları doğrudan hedefte.
**Şart:** Kendi ürününü karşılaştırıyorsan rakibin güçlü yanını da yaz. Tek taraflı karşılaştırma hem güven hem sıralama kaybettirir.
**Kombinasyon patlaması uyarısı:** 20 ürün = 190 çift. Hepsini üretme; arama hacmi olan 30-40 çifti üret.

## 5. Örnekler — "[tür] örnekleri"

**Veri:** Gerçek örnekler (ekran görüntüsü, bağlantı), kategori etiketleri, **neden iyi olduğuna dair analiz**.
**Sayfa:** Galeri → her örnek için kısa analiz → filtreler → ilgili kategoriler.
**Benzersizlik kaynağı:** Analiz katmanı.
**Risk:** Orta — sadece ekran görüntüsü listesi ince içeriktir.
**Şart:** Ekran görüntüsü kullanım hakkı; başkasının tasarımını yayınlarken kaynak göster.

## 6. Konumlar — "[hizmet] [şehir]"

**Veri:** Gerçek yerel veri — firma listesi, adres, telefon, puan, ilçe dağılımı, yerel fiyat aralığı.
**Sayfa:** Şehirdeki gerçek durum → firma/hizmet listesi (gerçek veriyle) → yerel bağlam (ilçe, ulaşım, fiyat) → sık sorulanlar.
**Benzersizlik kaynağı:** Yerel verinin kendisi.
**Risk:** **En yüksek** — "şehir adını değiştir" kalıbı politikanın birinci maddesi.
**Şart:** Her şehir sayfasında o şehre ait doğrulanmış veri olmalı. Yerel veri yoksa **bu playbook'u seçme**.
**Veri kaynağı:** `sektor-ara` skilli sektör + şehir için gerçek firma listesi üretir (Google Maps + organik arama, telefon/adres eşleştirmeli).

## 7. Persona — "[hedef kitle] için [ürün]"

**Veri:** Segment bazlı kullanım senaryoları, o segmentin acıları, ilgili müşteri örnekleri.
**Sayfa:** O segmentin özel sorunu → ürünün o senaryodaki kullanımı → aynı segmentten vaka → segmente özel SSS.
**Benzersizlik kaynağı:** Segment araştırması ve gerçek müşteri hikâyeleri.
**Risk:** Orta-yüksek — segment adı değiştirilmiş aynı sayfa klasik ince içerik.
**Şart:** Her segmentte en az bir gerçek müşteri örneği veya segmente özel veri.

## 8. Entegrasyonlar — "[A] [B] entegrasyonu"

**Veri:** Gerçek entegrasyon detayları, kurulum adımları, desteklenen alanlar, sınırlar.
**Sayfa:** Ne yapıyor → kurulum adımları (ekran görüntülü) → hangi veri akıyor → sınırlar → SSS.
**Benzersizlik kaynağı:** Her entegrasyonun kendi teknik gerçekliği.
**Risk:** Düşük — teknik detay doğal olarak farklılaşır.
**Şart:** Entegrasyon **gerçekten var olmalı**. "Yakında" sayfası doorway'dir.

## 9. Sözlük — "[terim] nedir"

**Veri:** Terim tanımları, örnekler, ilgili kavramlar.
**Sayfa:** Tek cümlelik tanım (öne çıkan snippet için) → detay → örnek → ilgili terimler → kaynaklar.
**Benzersizlik kaynağı:** Kendi açıklaman ve örneklerin.
**Risk:** Orta — Wikipedia'yı yeniden yazan sözlük değersizdir.
**Şart:** Kendi alanından örnek ver. 200 kelimenin altı sayfalar birleştirilmeli.

## 10. Çeviriler — çok dilli

**Veri:** Kaliteli çeviri + **yerelleştirme** (yerel örnek, para birimi, yasal bağlam).
**Sayfa:** Kaynak sayfanın yerelleştirilmiş hâli.
**Benzersizlik kaynağı:** Yerelleştirme katmanı.
**Risk:** **Yüksek** — makine çevirisi doğrudan politikada sayılıyor.
**Şart:** `hreflang` doğru kurulmalı; ham makine çevirisi yayınlanmamalı.

## 11. Dizin — "[kategori] araçları"

**Veri:** Kürasyonlu liste, kategori, fiyat, özellik, kullanıcı yorumu.
**Sayfa:** Kategori tanımı → filtrelenebilir liste → her giriş için kısa değerlendirme → alt kategoriler.
**Benzersizlik kaynağı:** Kürasyon + kendi verin (yorum, puan, kullanım verisi).
**Risk:** Orta — halka açık veriyi tekrarlayan dizin zayıftır.
**Şart:** Dizinin bir bakış açısı olmalı; "her şeyin listesi" olan dizin kimseye lazım değil.

## 12. Profiller — "[kurum/kişi adı]"

**Veri:** Doğrulanmış kurumsal/kişisel bilgi, finansal veri, geçmiş.
**Sayfa:** Özet kartı → detay bölümler → ilgili profiller.
**Benzersizlik kaynağı:** Veri derinliği ve güncelliği.
**Risk:** Orta + **hukuki risk** — kişisel veri KVKK/GDPR kapsamındadır.
**Şart:** Yaşayan kişiler hakkında sayfa üretiyorsan veri kaynağını, doğruluğunu ve silme talebi sürecini baştan çöz.

---

## Playbook Kombinasyonları

| Kombinasyon | Örnek | Not |
|-------------|-------|-----|
| Konum + Derleme | "izmir'deki en iyi ortak çalışma alanları" | Yerel veri + kürasyon, güçlü |
| Persona + Karşılaştırma | "ajanslar için webflow vs wordpress" | Uzun kuyruk, düşük rekabet |
| Entegrasyon + Persona | "e-ticaret için shopify slack entegrasyonu" | Çok dar, hacim kontrolü şart |
| Konum + Persona | "istanbul'daki startuplar için muhasebeci" | Kombinasyon patlaması riski |

**Kural:** İki playbook birleştiğinde kombinasyon sayısı çarpılır. 50 şehir × 8 persona = 400 sayfa. Hacim kontrolü yapmadan üretme.

---

## Risk Sıralaması (düşükten yükseğe)

```
1. Şablonlar        — gerçek varlık sunuyorsun
2. Entegrasyonlar   — teknik detay doğal farklılaşır
3. Dönüşümler       — çalışan araç
4. Örnekler         — analiz katmanı gerekli
5. Sözlük           — özgün açıklama gerekli
6. Dizin            — kürasyon gerekli
7. Profiller        — veri + hukuki dikkat
8. Persona          — segment araştırması gerekli
9. Derleme          — kendi değerlendirmen şart
10. Karşılaştırmalar — örtüşme riski yüksek
11. Çeviriler       — makine çevirisi doğrudan yasak
12. Konumlar        — "şehir adı değiştir" kalıbı birinci hedef
```

Alt sıradakiler yasak değil — **veri katmanın zayıfsa** yasak. Gerçek yerel veriyle konum sayfası mükemmel çalışır; veri yoksa aynı sayfa cezalıktır.
