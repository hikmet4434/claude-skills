---
name: yt-shorts-anlatim
description: >-
  YouTube Shorts, Instagram Reels ve TikTok için "anlatım tarzı" dikey video (1080x1920, ~55 sn) üretir:
  konuya özel yazılmış soru-cevap akışlı metin, her cümleye ayrı grafik sahne, kelime kelime altyazı,
  Gemini TTS ile sıcak ve içten seslendirme, ana videonun renkleri ve sonda tam videonun kapağı + linki.
  Kullanıcının kalıcı kararı (2026-11-16): bütün Shorts ve Reels bu tarzda yapılır. Kullanıcı "short yap",
  "shorts hazırla", "reel yap", "reels", "dikey video", "kısa video", "tiktok videosu", "bu videonun
  short'unu çıkar", "shorts üret", "short ve reel hazırla", "make a short" dediğinde, bir YouTube
  videosu için kısa dikey tanıtım istediğinde ya da bir Instagram Reel'ini, TikTok videosunu, ürün
  tanıtımını "bizim tarzda yeniden üret" dediğinde, tarz belirtmese bile bu skill'i kullan. Uzun videodan
  parça kesme ("kesme tarzı") yalnızca kullanıcı açıkça isterse yapılır.
trigger: /yt-shorts-anlatim
---

# Anlatım tarzı Shorts / Reels

Bir konuyu ~55 saniyede, arkadaşına anlatır gibi anlatan dikey video üretir. Uzun videodan parça kesmez; aynı konu için yeni bir metin yazılır ve her cümle kendi grafik sahnesiyle çizilir. Kullanıcı bu tarzı örnek bir TikTok videosu üzerinden seçti, bir deneme Short'u üzerinde düzeltti ve onayladı; aşağıdaki kurallar o düzeltmelerden gelir.

## Vazgeçilmezler (ve nedenleri)

1. **Akış soru-cevaptır.** Kanca → "Bu nasıl oldu?" → olgu → "X mi? O ne demek?" → sade tanım → tarih/rakam → eskiden / şimdi / "Yani" → "Ama asıl mesele şu:" → 3-4 önemli nokta → şart → "Sence ...?" → "Yorumlarda konuşalım." → tam videoya çağrı. Ayrıntı: `references/akis-ve-ornek.md`. Tarzı tanınır kılan bu ritimdir; düz bir özet metni bu skill'in çıktısı değildir.
2. **Ses Gemini TTS'tir, en güncel model; ton doğal, samimi, içten.** Başka bir seslendirme motoruna (ElevenLabs, macOS `say` vb.) geçme. Kullanıcı bunu açıkça düzeltti: sorun motor değil tondu. Ton, metne değil üslup yönergesine yazılır (betik bunu kendisi yapar). 2026-11-16 itibarıyla en güncel model `gemini-3.8-flash-tts`, ses `Achird`; aradan zaman geçtiyse Google'ın TTS belgelerinden daha yeni model çıkıp çıkmadığına bak ve varsa `--tts-model` ile onu kullan.
3. **Renkler ana videonun renkleridir.** Tema elle seçilmez; uzun videonun temasından (`--tema`) gelir.
4. **Son kare tam videoyu gösterir.** "Detaylı izlemek istersen" çağrısı, tam videonun kapağı, başlığı ve `youtu.be/...` linki. Bu yüzden Short'tan önce tam video yayınlanmış (ya da en azından linki belli) olmalı; link yoksa kullanıcıya söyle, uydurma link yazma. Tam videosu olmayan içerikte (ürün tanıtımı, bir Reel'in yeniden üretimi) olmayan bir videoya çağrı yazılmaz; kapanış kartı `kapanis` alanıyla gerçek adrese (hesap, web sitesi) çevrilir. Bkz. "YouTube dışı içerik".
5. **Olgular yalnızca kaynaktan.** Uzun videonun metninde ya da kullanıcının verdiği kaynakta olmayan tarih, rakam, özellik yazılmaz.
6. **Yayınlamak ayrı bir iştir.** Bu skill dosya üretir. YouTube'a, Instagram'a ya da TikTok'a yüklemek için kullanıcının o yükleme için açık onayı gerekir; "reel hazırla" bir Instagram paylaşım izni değildir.

## Önce: hat mı, bu skill mi?

Üretim hattının (`seymata-demo-studio/ytv`) kurulu olduğu makinede ve iş klasörü varken hattı kullan; aynı çiziciyi kullanır ve metni, sesi, kapağı, linki iş klasöründen kendisi alır:

```bash
node ytv/yap.js <iş-klasörü> --asama shorts
```

Hatta `ytv/lib/shorts-anlatim.js` varsa anlatım tarzı zaten varsayılandır (`--shorts-tarz kesme` eski tarza döner). Dosya yoksa hat henüz güncellenmemiştir (dal: `feat/shorts-anlatim-tarzi`); o zaman ya da hattın olmadığı makinede aşağıdaki bağımsız yolu izle.

## Bağımsız üretim

Gerekenler: `node`, `ffmpeg`/`ffprobe`, Google Chrome. İlk kullanımda bir kez:

```bash
cd <skill-klasörü>/scripts && npm install --no-audit --no-fund
```

### 1. Girdileri topla

- **Kaynak:** uzun videonun metni (altyazı `.srt`, plan ya da senaryo) ya da kullanıcının verdiği kaynaklar.
- **Tam video:** başlığı, `youtu.be/<id>` linki, kanal adı, kapak görseli (16:9 jpg/png). Kapak elde yoksa `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` adresinden alınabilir.
- **Tema:** uzun videonun teması (`yesil, turkuaz, mavi, mor, pembe, turuncu, sari`). Önce iş klasöründeki `tema.json` dosyasına bak. O yoksa videonun kendi karelerine bak (yayınlanmış videoda `https://i.ytimg.com/vi/<id>/hq1.jpg`, `hq2.jpg`, `hq3.jpg` videonun içinden otomatik alınmış karelerdir) ve vurgu rengine en yakın temayı seç. **Kapağa göre seçme:** kapak çoğu zaman videodan farklı renktedir (onaylı örnekte kapak turuncu, video mavidir). Emin olamıyorsan kullanıcıya sor; tema verilmezse betik yeşile düşer ve uyarır.
- **Dil ve kanal:** Türkçe kanal için `"dil":"tr"`, İngilizce kanal için `"dil":"en"` ve İngilizce kanalın kendi videosunun linki, başlığı, kapağı. İngilizce örnek 2026-11-16'da baştan sona üretildi ve sesin dökümü metinle aynı çıktı, ama sesi dinleyen olmadı; ilk İngilizce üretimde kullanıcıdan sesi dinlemesini iste.

Eksik olan tek şey kullanıcıdan gelebilecek bir bilgiyse (hangi video, link) sor; geri kalanını kendin çıkar.

### 2. metin.json yaz

`references/akis-ve-ornek.md` (akış, üslup, dosya biçimi) ve `references/sahne-tipleri.md` (sahne kataloğu, harf sınırları) dosyalarını oku, sonra metni yaz. En kolay başlangıç `assets/ornek-metin.json` dosyasını kopyalayıp konuya göre baştan yazmaktır. Hedef: 18-21 kısa cümle, 115-130 kelime, en az 6 farklı sahne tipi, art arda aynı tip yok.

### 3. Sessiz önizleme

```bash
node scripts/short-uret.js --metin metin.json --cikti short.mp4 --tema mavi --kapak kapak.jpg --link youtu.be/XXXXXXXXXXX --baslik "Tam video başlığı" --kanal "Kanal adı" --onizleme
```

Ses üretmeden her sahneden bir kare çizer (`<çıktı>-calisma/onizleme.jpg`). Görsele bak: taşan ya da kesilen yazı, boş kalan sahne, tekrar eden görüntü var mı? Betiğin `UYARI:` satırlarını da oku (yedek sahne eklendi, cümle uzun, metin uzun gibi). Ses üretmeden önce metni ve sahneleri burada düzelt; ses adımı en pahalı adımdır.

### 4. Seslendir

Metnin tamamı TEK çağrıda okunur (cümle cümle ayrı çağrı tonu bozar, cümleler birbirine bağlanmaz). Üç yoldan biri:

- **Anahtar varsa:** hiçbir şey yapma, betik 5. adımda kendisi seslendirir. Betik anahtarı hatla aynı yerlerde arar: `GEMINI_API_KEY` ortam değişkeni, `GEMINI_ANAHTAR_DOSYA` ile gösterilen dosya, `~/.config/ytv/gemini-anahtar.txt` (önerilen yer, 0600), `~/seymata-demo-studio/gemini-anahtar.txt`. Anahtarı sen yazma, dosyayı açıp içeriğini okuma ya da yazdırma; yoksa kullanıcıya nereye koyacağını söyle, kendisi koysun.
- **Anahtar yoksa, bağlı bir araç üzerinden** (ör. treg MCP'de `google-ai.voice-gen.gemini-3-8-flash-tts`): `node scripts/short-uret.js --metin metin.json --ses-metni` okunacak metni ve üslup yönergesini yazdırır. Aracı Gemini `generateContent` gövdesiyle çağır (treg'de `method: POST`, `query: {"model": "gemini-3.8-flash-tts"}`): metin `contents[0].parts[0].text`, üslup `contents[0].parts[0].speechMetadata.style`, ses `generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName = "Achird"`, `generationConfig.responseModalities: ["AUDIO"]`. Dönen yanıt büyük olduğu için dosyaya kaydedilir; o dosyayı `--tts-yanit <dosya>` ile ver (betik sesi yanıtın içinden kendisi çıkarır). Ücretli bir çağrıdır; metin ve sahneler önizlemede oturmadan yapma.
- **Hazır ses dosyası** varsa: `--ses anlatim.wav`.

Makinede anahtar aramak için diski ya da başka projelerin `.env` dosyalarını tarama; yukarıdaki yerlerde yoksa ikinci yolu kullan ya da kullanıcıya sor.

### 5. Üret

```bash
node scripts/short-uret.js --metin metin.json --cikti short.mp4 --tema mavi --kapak kapak.jpg --link youtu.be/XXXXXXXXXXX --baslik "Tam video başlığı" --kanal "Kanal adı" --tts-yanit yanit.json
```

Betik cümle sınırlarını sesteki duraklamalardan bulur, aradaki boşlukları kısaltır, gerekirse en çok %10 hızlandırır, kareleri çizer ve videoyu birleştirir (yaklaşık 1-2 dakika). Bitince:

- `ses:` satırında `hizalama: duraklama` yazmalı. `oran` yazıyorsa altyazı zamanları yaklaşıktır; sesi yeniden üretmeyi dene.
- "hızı olağan dışı" uyarısı çıkan cümlelerde altyazı sesle kaymış olabilir; o cümlelere bak.
- `NOT: N cümle arası duraklamasız okunmuş` normaldir: model bazen iki cümleyi nefes almadan okur. Betik bunu bulur, o cümleleri tek ses parçası olarak tutar ve aradaki sınırı tahmin eder; altyazı geçişi o noktada çok az kayabilir. Sayı 3'ü geçiyorsa sesi yeniden üretmek daha temiz sonuç verir.
- Süre 60 saniyeyi aşıyorsa metni kısalt (cümle çıkar; hızlandırma sınırını zorlama).
- `<çıktı>-calisma/kontrol.jpg` dosyasına bak: gerçek zamanlamayla her sahneden bir kare.
- Sesi kulakla doğrulayamazsın; kullanıcıya bunu söyle ve dinlemesini iste (ton, yabancı adların okunuşu). Yanlış okunan kelime için o cümleye `okunus` yazıp sesi yeniden üret.
- İstersen sesi bir modele yazıya döktürüp metinle karşılaştır (ör. Gemini'ye ses girdisi). Bu yalnızca cümlelerin eksik, fazla ya da yer değiştirmiş olmadığını gösterir; döküm yanlış okunan bir adı doğru yazıma çevirir, o yüzden telaffuzun ya da tonun kanıtı değildir.

### 6. Teslim et

Kullanıcıya videoyu, Shorts başlığını (`baslik`, sonuna `#Shorts`) ve açıklamayı (`aciklama` + `Tam video: https://youtu.be/...`) ver. Aynı dosya Reels ve TikTok için de uygundur. Yükleme istenirse ve o yükleme için açık onay varsa mevcut yükleme yöntemini kullan; onay yoksa dosyayı teslim edip sor.

## YouTube dışı içerik (ürün tanıtımı, bir Reel'in yeniden üretimi)

Kullanıcı bir Instagram Reel'i, TikTok videosu ya da ürün sayfası verip "bunu bizim tarzda yeniden üret" dediğinde akış, ses ve görünüm aynı kalır; dikkat edilecek beş şey vardır:

1. **Kaynağı al.** Açıklama metni ve videonun kendisi gerekir. Bağlı bir araç varsa onu kullan (ör. treg'de `scrapecreators.x.v1-instagram-post` açıklamayı ve video adresini, `scrapecreators.x.v2-instagram-media-transcript` konuşma dökümünü verir; ikisi de kuruşun altında). Videoyu ayrı, boş bir klasöre indir, `ffmpeg` ile kareler çıkar ve bak: ekrandaki yazılar, ürün, marka rengi. Yanıttaki `clips_music_attribution_info.uses_original_audio` `false` ise videoda konuşma yoktur, yalnızca müzik vardır; o durumda döküm anlamsız çıkar, dikkate alma.
2. **Olgular açıklamadan ve üreticinin kendi sayfasından.** Açıklamadaki teknik değerleri aynen kullan; "neden önemli" kısmı için üreticinin sitesindeki ürün sayfasına bak. Terimleri (aseptik, CIP, PTFE gibi) açıklamak serbesttir, ürüne açıklamada olmayan bir özellik ya da üstünlük yakıştırmak değildir. Kesin sonuç vaat etme: "ürün riske girmez" değil, "riski azaltmak için tasarlandı"; gıda ve ilaç gibi alanlarda bu fark önemlidir. Bir malzemeyi başka bir firmanın markasıyla adlandırma ("teflon" değil "PTFE"). Kaynak videonun cümlelerini ve görsel düzenini kopyalama; metin bu skill'in akışıyla baştan yazılır.
3. **Kim konuşuyor?** Video markanın kendi hesabında yayınlanacaksa metin markanın ağzından yazılır ("profilimize göz at"; "X markasının vanası" değil "bu vana"). Kullanıcının kendi kanalında yayınlanacaksa sol üstteki marka kullanıcınınki olur, üründen üçüncü kişiyle söz edilir ve ürün görselini kullanmak için marka sahibinin izni gerekir. Hangisi olduğu belli değilse kaynağı paylaşan hesabın kendi videosu varsay ve varsayımını söyle.
4. **Marka ve renk.** `"marka": "Marka adı"` sol üstteki yazıyı değiştirir. Tema, kaynağın marka rengine en yakın olandır. Varsayılan ikonlar yapay zeka konularına göredir (robot, kişi); başka konularda her sahnede ikonu emoji olarak açıkça ver (`"🧪"`, `"🌡️"`), yoksa ekrana robot çıkar.
5. **Kapanış.** Son cümleyi kendin yaz ve `kapanis` ekle; kart YouTube yerine verdiğin adresi gösterir:

```json
"tamVideo": { "baslik": "Ürünün adı", "link": "@hesapadi", "kapak": "urun.jpg" },
"kapanis": { "etiket": "Detaylı bilgi için", "ust": "Instagram · Marka", "alt": "Kaynak: marka ürün açıklaması", "logo": "instagram" }
```

`logo`: `instagram`, `web`, `youtube` ya da `yok`. `link` olarak yalnızca doğruladığın bir adres yaz (videoyu paylaşan hesap, üreticinin gerçek sitesi). `kapak` yerine ürünün görseli gelir (16:9; dikey videodan alınan kareyi 16:9'a tamamla).

Bu iş başkasının içeriğinden yola çıkar. Markanın kendi hesabı ya da kullanıcının müşterisi için yapılıyorsa sorun yoktur; emin değilsen çıktıyı teslim ederken hangi varsayımla ürettiğini söyle. Yayınlamak her durumda ayrı onay ister.

## Seçenekler

| Bayrak | İşlev |
|---|---|
| `--metin`, `--cikti` | metin dosyası, çıkacak mp4 |
| `--tema` | tema adı ya da ton açısı (0-359) |
| `--kapak`, `--link`, `--baslik`, `--kanal` | kapanış kartı; metin.json'daki `tamVideo` alanını ezer |
| `--marka` | sol üstteki marka yazısı (varsayılan "ThirdHand AI") |
| `--onizleme` | sessiz, yaklaşık zamanlı kare görseli |
| `--ses-metni` | okunacak metni ve üslup yönergesini yazdırır |
| `--ses`, `--tts-yanit` | hazır ses / kaydedilmiş Gemini yanıtı |
| `--ses-adi`, `--tts-model`, `--stil` | ses, model, üslup yönergesi (varsayılanlar onaylanmış olanlardır; kullanıcı istemedikçe değiştirme) |
| `--hedef`, `--son-pay` | hedef konuşma süresi (56.5 sn), kapanış kartının ekranda kalma payı (2.4 sn) |
| `--calisma` | ara dosyaların klasörü |

## Dosyalar

- `scripts/short-uret.js`: doğrulama, ses, hizalama, çizim.
- `assets/motor/`: çizici (`dikey.html`, `dikey.js`, `gsap.min.js`). Hattaki `ytv/motor` ile aynıdır; birinde yapılan görsel değişiklik diğerine de taşınmalı.
- `assets/ornek-metin.json`: onaylanmış örnek metin ve sahneler. `assets/ornek-metin-en.json`: aynısının İngilizcesi.
- `references/akis-ve-ornek.md`, `references/sahne-tipleri.md`.
