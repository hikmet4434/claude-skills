# Sahne tipleri

Her cümle (ya da ardışık iki cümle) için bir grafik sahne yazılır. Çizici (`assets/motor/dikey.js`) aşağıdaki tipleri tanır; bilinmeyen tip atlanır ve o cümleye yedek bir "dev" sahnesi konur.

## Ortak kurallar

- `ilk`: sahnenin başladığı cümlenin sıra numarası, 0'dan başlar. İlk sahnenin `ilk` değeri 0'dır; sahneler `ilk` değerine göre artan sırada olur.
- Bir sahne en çok iki cümle sürer. Daha uzun boşluk bırakırsan betik araya yedek sahne koyar ve uyarır.
- Son cümleye (tam videoya çağrı) sahne yazma; kapanış kartı otomatik eklenir.
- Aynı tip art arda gelmesin; bir Short'ta en az 6 farklı tip kullan. Aynı görüntünün tekrar etmesi izleyiciyi düşürür.
- Harf sınırlarına uy. Sınırı aşan metin kesilir; kesilmiş kelime ekranda kötü durur. Büyük kelimeler (dev, soru, kutular) BÜYÜK HARFLE yazılır; iki satıra bölmek için `|` kullan (`"ÇOK|OYUNCULU"`).
- Her sahnede isteğe bağlı iki alan:
  - `"etiket"`: sol üstte küçük etiket, en çok 22 harf (`"Duyuru"`, `"Şimdi"`, `"Şart"`).
  - `"hap": {"metin": "...", "renk": "sari"|"kirmizi", "at": n}`: sahnenin vurucu sonucunu söyleyen eğik etiket, en çok 26 harf. `akis`, `etiket` ve `bulut` sahnelerinde hap çizilmez (bu tiplerin kendi sonuç alanı vardır: `blok`, `buyuk`, `sonuc`); yazarsan betik uyarır. `kirmizi` olumsuz durum içindir. `at`, hangi cümlede belireceğidir (yazılmazsa sahnenin ilk cümlesi); iki cümlelik sahnede ikinci cümleye koymak iyi çalışır.
- `baslik` alanlarında vurgulanacak kısım `*yıldız*` içine alınır.
- İkon adları: `robot, kisi, bulut, laptop, laptopKapali, belge, para, saat, kilit, grafik, roket, dunya, sohbet, ayar, yildiz, telefon, kod`. Uygunu yoksa tek bir emoji yaz (`"🤔"`). İkon yazılmayan sahnede varsayılan çoğu zaman robottur; konu yapay zeka değilse ikonu her sahnede açıkça ver.
- Sınırı aşan metin kelime sınırından kesilir. `etiketler` içindeki 8 harfi aşan tek kelime kesilmez, atılır. Büyük kelime ekrana sığmıyorsa çizici yazıyı kendisi küçültür.
- `soru` sahnesinde kelimeye soru işareti yazma; rozet zaten soru işaretidir.

## Tipler

| Tip | Ne zaman | Alanlar |
|---|---|---|
| `dev` | Kanca; tek bir kavramı büyük göstermek | `kelime` (≤9 harf, `\|` ile iki satır), `kontur` (true: içi boş yazı), `ikon`, `adet` (1-3 ikon) |
| `soru` | Merak sorusu, "O ne demek?", "Sence ...?" | `kelime` (sorulan terim, ≤9 harf, `\|` ile iki satır), `ikon` |
| `kapak` | Olguyu söyleyen cümle; tam videonun kapağını gösterir. **Bir Short'ta yalnızca bir kez** | `etiket` (marka), `kelime` (ürün/özellik adı, ≤9 harf) |
| `tanim` | Sade tanım cümlesi | `baslik` (≤46 harf, `*vurgu*`), `ikonlar` (2-6), `kart` (≤14 harf) |
| `takvim` | Tarih. Yalnızca kaynakta tarih varsa | `ay` (`"KASIM"`), `gun` (`"10"`), `yil` (`"2026"`) |
| `rakam` | Sürüm, fiyat, yüzde, şart. Yalnızca kaynakta rakam varsa | `ust` (neyin rakamı), `buyuk` (≤9 harf), isteğe bağlı `kart2: {ust, metin ≤14 harf}` |
| `kutular` | "Eskiden" durumu, yan yana ayrı şeyler | `kelime` (≤9 harf), `kutular: [{ikon, etiket ≤10 harf}]` (2-3), `kopuk` (true: aralarında kırmızı çarpı) |
| `pano` | Görev panosu, iş listesi, ortak alan | `baslik` (≤30 harf, `*vurgu*`), isteğe bağlı `sutunlar` (tam 3 başlık), `ikonlar` |
| `liste` | 3-4 maddelik sayım | `baslik` (≤30 harf), `maddeler: [{ikon, metin ≤30 harf}]` (en az 2) |
| `akis` | Bir şeyin bir yere işlenmesi, akması | `kart` (giren şey, ≤12 harf), `blok` (gittiği yer, ≤14 harf), `ikonlar` |
| `etiket` | Dönüş cümlesi ("Ama asıl mesele şu:") | `ust` (`"Ama"`), `buyuk` (≤12 harf, `"ASIL MESELE"`) |
| `ikili` | İki tarafın konuşması, karşılaştırma | `sol`, `sag` (ikon), `balonlar` (≤3, her biri ≤12 harf), isteğe bağlı `kelime` (ikinci cümlede beliren kelime) ve `cizili` (true: kelimenin üstü çizilir) |
| `pencere` | Uygulama ekranı, yan panel, sohbet | `ana`, `yan` (alan adları), `balonlar` (≤3, her biri ≤14 harf) |
| `bulut` | Bulutta, arka planda, kendiliğinden çalışan şeyler | `sol` (ikon), `solHap` (≤8 harf), `sag` (ikon), `etiketler` (≤2 kısa), `sonuc` (≤16 harf) |
| `kartlar` | İki bilgi kartı (hesap + sürüm gibi) | `kartlar: [{ust, metin ≤12 harf}]` (1-2) |

Zorunlu alanlar: `liste` en az 2 madde, `kartlar` en az 1 kart, `takvim` için `ay` ve `gun`, `rakam` için `buyuk`. Eksikse sahne atlanır.

## Akışa göre tipik eşleşme

| Cümle | Uygun tip |
|---|---|
| Kanca | `dev` (kontur + kırmızı hap) |
| "Bu nasıl oldu?" | `soru` |
| Olgu | `kapak` |
| "X mi? O ne demek?" | `soru` (ikon 🤔) |
| Tanım | `tanim` |
| Tarih / rakam | `takvim` / `rakam` |
| Eski durum | `kutular` (kopuk) |
| Yeni durum + "Yani" | `pano`, `akis` |
| "Ama asıl mesele şu:" | `etiket` |
| Önemli noktalar | `ikili`, `pencere`, `bulut`, `liste` |
| Şart | `rakam` (kart2 ile) ya da `kartlar` |
| "Sence ...?" + "Yorumlarda konuşalım." | `soru` (hap: "Yorumlarda konuşalım", `at`: sonraki cümle) |

Bu eşleşme bir başlangıçtır; konunun kendisi başka bir tipi daha iyi anlatıyorsa onu kullan. Örnek sahne dizisi: `assets/ornek-metin.json`.

## Renkler

Renkler elle seçilmez; ana videonun temasından gelir (`--tema` ya da metin.json'da `tema`): `yesil, turkuaz, mavi, mor, pembe, turuncu, sari`. Zemin her temada koyu laciverttir; vurgu rengi temaya göre döner. Sarı ve kırmızı haplar her temada aynıdır. Ana videonun teması bilinmiyorsa videonun kendi karelerindeki vurgu rengine en yakın temayı seç ya da ton açısını sayı olarak ver (`--tema 208`). Kapağa bakarak seçme; kapak çoğu zaman videodan farklı renktedir.
