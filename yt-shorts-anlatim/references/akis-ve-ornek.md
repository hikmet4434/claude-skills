# Anlatım akışı, metin kuralları ve metin.json

İçindekiler: [Akış](#akış) · [Üslup ve uzunluk](#üslup-ve-uzunluk) · [metin.json biçimi](#metinjson-biçimi) · [Yayın metni](#yayın-metni) · [İngilizce](#i̇ngilizce) · [Örnek](#örnek)

## Akış

Short, uzun videonun bir kesiti değildir; aynı KONU için baştan yazılan, tek başına anlaşılan bir anlatımdır. Sıra şudur ve her madde ayrı, kısa bir cümledir:

1. **Kanca.** Zıtlık ya da şaşırtıcı sonuç söyleyen tek cümle. Selam, "bu videoda", "merhaba" yok. İlk iki saniye izleyiciyi tutmazsa gerisi izlenmez.
   *"Yapay zeka ajanları artık tek başına çalışmıyor."*
2. **Merak sorusu.** 2-4 kelime. *"Bu nasıl oldu?"*
3. **Olgu.** Ne oldu, kim yaptı; tek cümle. *"Cursor, Projects özelliğini çok oyunculu yaptı."*
4. **İzleyicinin aklındaki soru.** Az önce geçen yabancı terimi ya da kavramı izleyici adına sor. *"Çok oyunculu mu? O ne demek?"*
5. **Sade tanım.** Tek cümle, jargonsuz. Ardından kaynakta varsa tek somut tarih ya da rakam.
6. **Eski durum → yeni durum → "Yani ...".** Üç ayrı cümle; neden önemli olduğunu "Yani" bağlar.
7. **Dönüş.** *"Ama asıl mesele şu:"* Ardından en önemli 3-4 nokta, her biri ayrı kısa cümle.
8. **Şart ya da sınır.** Kaynakta varsa: hangi hesap, hangi sürüm, hangi ülke, ne zaman.
9. **İzleyiciye soru.** *"Sence ...?"*
10. *"Yorumlarda konuşalım."*
11. **Son cümle aynen:** *"Detaylı izlemek istersen, tam video YouTube'da."* Bu cümlede kapanış kartı (tam videonun kapağı, başlığı, linki) görünür; betik cümle yoksa kendisi ekler.

Soru-cevap ritmi bu tarzın özüdür: anlatıcı izleyicinin soracağı soruyu ondan önce sorar, sonra cevaplar. Art arda üç düz bilgi cümlesi gelirse araya bir soru ya da "Yani" koy.

## Üslup ve uzunluk

- Arkadaşına anlatır gibi: sıcak, içten, konuşma dili. Reklam ve spiker dili yok ("devrim niteliğinde", "kaçırmayın").
- Cümle başına en çok 11 kelime; uzun cümleyi ikiye böl. Altyazı kelime kelime aktığı için uzun cümle ekranda yorar.
- 18-21 cümle, Türkçede toplam 115-130 kelime (İngilizcede 125-145). Bu aralık ~55 saniyeye denk gelir; 60 saniyeyi aşan video Shorts sayılmaz.
- Standart yazım. "nası", "bi", "yapıyo" yazma; doğallığı ses tonu verir, yazım değil.
- Uzun tire (—) ve emoji metinde yok (sahnelerde ikon olarak emoji olabilir).
- **Olgular yalnızca kaynaktan.** Uzun videonun metninde ya da verilen kaynakta olmayan özellik, tarih, fiyat, rakam yazma. Emin olmadığın rakamı çıkar; tarih ve rakam sahneleri (takvim, rakam) yalnızca kaynakta karşılığı varsa kullanılır.

## metin.json biçimi

```json
{
  "dil": "tr",
  "baslik": "YouTube Shorts başlığı (en çok 80 karakter)",
  "aciklama": "1-2 cümlelik açıklama",
  "kanca": "EN ÇOK 38 HARFLİK KISA BAŞLIK",
  "kaynak": "cursor.com/blog · changelog",
  "tema": "mavi",
  "tamVideo": { "baslik": "Tam videonun başlığı", "link": "youtu.be/XXXXXXXXXXX", "kanal": "THİRDHAND AI", "kapak": "kapak.jpg" },
  "satirlar": [
    { "yazi": "Duyuru 10 Kasım'da geldi. Şimdilik beta.", "okunus": "Duyuru on Kasım'da geldi. Şimdilik beta.", "vurgu": ["beta"] }
  ],
  "sahneler": [ { "tip": "dev", "ilk": 0, "kelime": "AJANLAR" } ]
}
```

- `yazi`: ekranda (altyazıda) görünen metin.
- `okunus`: yalnızca cümlede rakam ya da kısaltma varsa doldur: aynı cümle, sayılar yazıyla ("3.26.13" → "üç nokta yirmi altı nokta on üç", "CIP" → "si ay pi"). **Marka ve ürün adlarını (Cursor, Slack, Team) Türkçe okunuşla yeniden yazma** ("Körsır", "Tiym"); model bu adları kendi okur, yeniden yazınca yanlış okur. Betik böyle bir okunuş görürse uyarır. Tek istisna: kullanıcı sesi dinleyip bir kelimenin yanlış okunduğunu söylerse o kelime için okunuş yazılır.
- `vurgu`: altyazıda tema rengiyle boyanacak 1-2 kelime. Her öğe TEK kelimedir ve cümlede geçtiği biçimdedir; öbek yazılırsa betik kelimelere böler, cümlede olmayanı atar.
- `marka`: sol üstteki yazı (varsayılan "ThirdHand AI"). `kapanis`: YouTube dışı içerikte kapanış kartı; bkz. SKILL.md "YouTube dışı içerik".
- `tema`, `tamVideo`: komut satırındaki `--tema --kapak --link --baslik --kanal` ile de verilebilir (komut satırı önceliklidir). `kapak` yolu metin.json'un bulunduğu klasöre göredir.
- `kaynak`: kapanış kartının altında küçük yazıyla görünür.
- `sahneler`: bkz. `sahne-tipleri.md`. Son cümleye sahne yazılmaz; kapanış kartı otomatik gelir.

## Yayın metni

`baslik` ve `aciklama` videoya basılmaz; yüklerken kullanılır. Açıklamaya tam videonun linkini ekle: `Tam video: https://youtu.be/XXXXXXXXXXX` ve sonuna `#Shorts`.

## İngilizce

İngilizce kanal için `"dil": "en"` yaz; metni doğal Amerikan İngilizcesiyle kur (akış aynı: "How did that happen?", "Multiplayer? What does that mean?", "So ...", "But here is the real point:", "Do you think ...?", "Let's talk in the comments."). Son cümle aynen: *"Want the details? The full video is on YouTube."* Üslup yönergesi otomatik İngilizceye geçer. İngilizce örnek: `assets/ornek-metin-en.json` (20 cümle, 140 kelime; Türkçe örneğin aynı olgularla karşılığı). Not: İngilizce örnek 2026-11-16'da baştan sona üretildi (45,7 sn); sesin dökümünde eksik, fazla ya da yer değiştirmiş cümle yok. **Sesi dinleyen olmadı**: ton ve telaffuz doğrulanmış değil. İlk İngilizce üretimde kullanıcıdan sesi dinlemesini iste.

## Örnek

Onaylanmış örnek (Cursor çok oyunculu Projects, 20 cümle, 127 kelime, 57,7 sn): `assets/ornek-metin.json`. Yeni bir metin yazarken bunu kopyalayıp üzerinden gitmek en kolay yoldur; cümle sırası yukarıdaki akışla bire bir örtüşür. Örnekte `tema` ve `tamVideo` yoktur; kendi dosyana ekle ya da komut satırından ver.
