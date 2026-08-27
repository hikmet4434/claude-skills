# Denetim ve Eleştiri

---

## Göstermeden Önce

**Kullanıcıya göstermeden önce ne yaptığına bak.**

Sor: *"Biri bu işe 'burada zanaat yok' dese, neyi kastederdi?"*
Aklına ilk geleni **önce** hallet.

İlk çıktın muhtemelen geneldir. Bu normal ve utanılacak bir şey değil. Amaç, kullanıcı müdahale etmeden önce bunu senin yakalaman.

---

## Dört Test

### 1. Değiştirme Testi

| Ne değiştir | Soru |
|-------------|------|
| Yazı tipini her zamankiyle (Inter, sistem yazı tipi) | Fark eden olur mu? |
| Düzeni standart pano şablonuyla | Farklı hissettirir mi? |
| Vurgu rengini maviye | Bir şey kaybolur mu? |
| Boşluk ölçeğini 8px varsayılana | Yoğunluk niyeti bozulur mu? |

**Fark yaratmayan yer, varsayılana düştüğün yerdir.**

Bu test acıtıcıdır çünkü çoğu zaman "hayır, fark etmez" cevabı gelir. O noktada geri dönüp o kararı gerçekten vermen gerekir.

### 2. Göz Kısma Testi

Gözlerini kıs ve bak.

**Görmen gereken:** yapı · neyin neyin üstünde olduğu · bölüm ayrımları · **tek** vurgu noktası.
**Görmemen gereken:** keskin çizgiler · rahatsız renk sıçraması · göze batan kutu · yarışan vurgular.

Başarısızsa: kenarlık opaklığını düşür · yüzey sıçramalarını yumuşat · fazla vurguyu kaldır.

### 3. İmza Testi

**İmzanın göründüğü beş somut bileşeni gösterebiliyor musun?**

```
İmza: [ne]
  1. [bileşen] — nasıl görünüyor
  2. [bileşen] — nasıl görünüyor
  3. [bileşen] — nasıl görünüyor
  4. [bileşen] — nasıl görünüyor
  5. [bileşen] — nasıl görünüyor
```

"Genel izlenim" cevabı yeterli değil. **Bulamadığın imza yoktur.**

Beş bulamıyorsan imza ya çok zayıf ya da sadece bir yerde uygulanmış — o zaman dekorasyondur, imza değil.

### 4. Token Testi

CSS değişkenlerini **sesli oku**.

| Duyduğun | Sonuç |
|----------|-------|
| `--gray-700`, `--surface-2`, `--primary` | Şablon — yeniden adlandır |
| `--celik`, `--fis-kagidi`, `--damga` | Dünya — geçti |

Kimlik taşıyan renkler (zemin, ana metin, vurgu) dünyadan gelmeli. Yapısal olanlar (`--yuzey-2`, `--metin-3`) kalabilir.

---

## Herhangi Biri Başarısızsa

**Göstermeden önce tekrarla.** Kullanıcıya "şurası biraz genel oldu ama" diyerek sunma — düzelt, sonra sun.

---

## Yapı Sonrası Eleştiri Protokolü

Büyük bir arayüz bitince, sunmadan önce şu sırayla geç:

```
1. NİYET      Yazdığın niyeti oku. Çıktı bunu tutuyor mu?
              "Sıcak" yazıp soğuk renk kullandın mı?

2. SİSTEM     Aralık ölçekten mi geliyor? Rastgele değer var mı?
              Derinlik stratejisi karışmış mı?
              Token dışı ham hex var mı?

3. DURUMLAR   Her etkileşimli öğede 5 durum var mı?
              Her veri alanında yükleniyor/boş/hata var mı?

4. BAĞLAM     Ekran zemine oturmuş mu? Navigasyon, konum, kullanıcı
              bağlamı var mı? Yoksa bileşen demosu mu?

5. DÖRT TEST  Değiştirme · göz kısma · imza · token

6. AKSESUAR   Amaca hizmet etmeyen bir şey var mı? Bir tanesini çıkar.
```

**Sonuncu Chanel kuralıdır:** evden çıkmadan önce aynaya bak ve bir aksesuarı çıkar.

---

## `system.md` Yönetimi

Görev bitince **her zaman kaydetmeyi teklif et**:

> "Bu kalıpları sonraki oturumlar için kaydedeyim mi?"

Evet ise `.panel-tasarimi/system.md`:

```markdown
# [Ürün] — Panel Sistemi
Son güncelleme: [tarih]

## Niyet
Kullanıcı:  [kim, nerede, ne zamanı var]
Görev:      [fiil]
His:        [belirli nitelik, "temiz ve modern" değil]

## Alan ve İmza
Alan:       [5+ kavram]
İmza:       [ne, nerede görünüyor]

## Palet
--[ad]: #______   [dünyadaki karşılığı]
...

## Derinlik
Strateji:   [kenarlık / hafif gölge / katmanlı gölge / yüzey kayması]
Gerekçe:    [neden bu niyete uygun]

## Ölçekler
Boşluk temel birimi: __px
Yarıçap:    __ / __ / __ / __
Yazı tipleri: başlık / gövde / veri
Taban boyut: __px

## Bileşen Kalıpları
### [Bileşen adı]
[Yapı, ölçüler, ne zaman kullanılır]
```

### Ne Kaydedilir

| Kaydet | Kaydetme |
|--------|----------|
| 2+ kez kullanılan bileşen | Tek seferlik bileşen |
| Proje genelinde yeniden kullanılabilir kalıp | Geçici deneme |
| Hatırlanmaya değer belirli ölçü | Prop ile çözülebilecek varyasyon |
| Niyet ve his (asla unutulmamalı) | Sayfa özel düzenler |

### Tutarlılık Denetimi

`system.md` varsa yeni iş ona göre denetlenir:

- [ ] Aralık tanımlı ölçekten
- [ ] Derinlik belirtilen stratejiyle
- [ ] Renkler tanımlı paletten
- [ ] Belgelenmiş kalıplar yeniden icat edilmemiş, yeniden kullanılmış
- [ ] Niyet hâlâ tutuluyor

**Her kaydetme sonraki işi hızlandırır ve tutarlılığı artırır.** Sistem büyüdükçe keşif aşaması kısalır.

---

## Benzerlik Başarısızlıktır

Benzer bir istek verilse başka bir yapay zekâ da aynı çıktıyı üretiyorsa, başarısız olmuşsun.

Bu, farklı olmak için farklı olmak değil. **Belirli bir sorundan, belirli bir kullanıcıdan, belirli bir bağlamdan doğan arayüz** demek. Niyetten tasarlarsan aynı olmak imkânsızlaşır, çünkü hiçbir iki niyet aynı değildir.

Varsayılandan tasarlarsan her şey aynı görünür, çünkü **varsayılanlar paylaşılır**.
