---
name: tanitim-videosu
description: "Herhangi bir uygulama/site için Wordly tarzı 4'lü tanıtım video seti üretir: analiz → çekime hazır senaryo paketi (artifact) → sahne görselleri (Nano Banana / ChatGPT görsel) → videolar seymata-demo-studio ile. Tetikleyiciler: 'tanıtım videosu', 'demo videosu', 'video seti hazırla', 'X için tanıtım videoları', '/tanitim-videosu'."
trigger: /tanitim-videosu
---

# /tanitim-videosu — Uygulama Tanıtım Video Seti

Bir uygulama/site için kanıtlanmış 4'lü video setini uçtan uca üretir. Kurgu şablonu,
Wordly'nin video setinin kare kare analizinden türetildi (2026-08, Konferist paketi:
https://claude.ai/code/artifact/9346c764-dcfd-44b0-a2cf-b846f7881cba — iyi bir örnek çıktı).

**İş bölümü (değiştirme):** senaryo + storyboard'u SEN yazarsın (artifact),
sahne görsellerini **Nano Banana** (birincil) veya **ChatGPT görseli** (alternatif) üretir,
video render/seslendirme/birleştirme/kapak işlerini **seymata-demo-studio** yapar.

## Girdi

`/tanitim-videosu <uygulama-adı-veya-url>` — hedef verilmezse kullanıcıya sor.
Hedefin canlı sitesini gez (Browser pane), varsa yerel deposuna bak; uygulamanın
GERÇEK ekranlarını ve ayırt edici özelliklerini çıkar. Genel laf yok: senaryodaki her
sahne, uygulamada gerçekten var olan bir ekrana bağlanmalı.

## Adım 1 — 4'lü set senaryosu (artifact)

Dört videonun sabit görevleri (süreler ±%10):

| # | Video | Süre | Görev |
|---|---|---|---|
| V1 | Ürün Demosu — "Kendini Kanıtlayan Demo" | 2:30–3:00 | Bölünmüş ekran: solda sunucu + bölüm başlıkları, sağda ÜRÜNÜN GERÇEK ekranı canlı iş görürken. Ürün kendini videoda kanıtlar |
| V2 | Nasıl Kullanılır | 0:30–0:40 | Kullanıcı akışı, elde telefon/gerçek arayüz, SESSİZ (yalnız adım yazıları + müzik); 9:16 dikey sürümü de üret |
| V3 | Tanışın: [Marka] | 0:35–0:45 | Marka videosu: sorunla aç → logo → 3 sayı kartı → kanıt karesi → aile/CTA |
| V4 | Genel Bakış | 1:45–2:00 | Sorun→çözüm yayı: eski yöntemin maliyeti → ürün akış şeması → kullanıcı deneyimi → kalite/bütçe kartları → CTA. 60 sn sosyal kesimi aynı kurgudan işaretle |

Her video için: zaman kodlu storyboard (sahne başlığı + görüntü tarifi), SES (seslendirme,
Türkçe, konuşma dili) ve EKRAN (bindirme yazısı) satırları. Sonuna "Üretim reçetesi" bölümü:
ekran kaydı çekim listesi, çekim sırası (kısa videodan uzuna), teslim formatları
(16:9 1920×1080 ana; V2+V3 ayrıca 9:16 1080×1920; kapak kareleri).

Altın kurallar:
- Ürün ne yapıyorsa videoda GERÇEKTEN yapsın (çeviri uygulamasıysa altyazıyı ürün üretsin
  ve köşeye "altyazılar [ürün] ile oluşturulmuştur" notu; tasarım aracıysa videodaki
  görseli kendisi üretsin, vb.).
- Çizim maket yerine gerçek arayüz ekran kaydı — gerçek olması kanıttır.
- V1'in sağ paneli kesintisiz tek çekimdir; en son ve en özenli çekilir.

Paketi `artifact-design` skill'ini yükleyip artifact olarak yayınla (kalıcı olsun).
Kullanıcı onayı BEKLEME — paketi üret, sun, düzeltmeleri sonra işle.

## Adım 2 — Sahne görselleri (Nano Banana / ChatGPT)

Fotoğraf/illüstrasyon gereken sahneler için (V3 sorun karesi, V4 harita/kabin sahnesi,
kapaklar, dünya haritası, salon görselleri):

**Birincil — Nano Banana (Gemini görsel):** `~/seymata-demo-studio/gemini-gorsel.js`
zaten var (model `gemini-2.5-flash-image`, anahtar `GEMINI_API_KEY` env veya
`~/seymata-demo-studio/gemini-anahtar.txt`). Tek görsel için desen:

```bash
cd ~/seymata-demo-studio && node -e "require('./gemini-gorsel.js'); ..." # veya doğrudan REST:
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"<istem>"}]}],"generationConfig":{"responseModalities":["IMAGE"]}}'
# yanıttaki inlineData.data (base64 PNG) dosyaya yazılır
```

**Alternatif — ChatGPT görseli (gpt-image):** `OPENAI_API_KEY` varsa
`POST https://api.openai.com/v1/images/generations` model `gpt-image-1`
(`size: 1536x1024` yatay / `1024x1536` dikey). Anahtar yoksa kullanıcıdan
gizli macOS diyaloğuyla iste (osascript hidden answer — sohbete yapıştırtma),
işi bitince dosyayı sil.

Görsel istemleri İngilizce yaz, marka rengini ve "flat vector illustration /
photorealistic" gibi stil kararını her istemde sabit tut (set tutarlılığı).
Kapak için `~/seymata-demo-studio/kapak-uret.js <video.mp4> <senaryo.json>` hazır
(AI başarısızsa yazı bindirmeye kendisi düşer).

## Adım 3 — Video üretimi (seymata-demo-studio)

Depo: `~/seymata-demo-studio` (üretim: studio.seymata.com). Yerel çalıştırma:
`cd ~/seymata-demo-studio && npm run studio` → http://localhost:5599
(GEMINI_API_KEY gerek; ffmpeg/ffprobe kurulu olmalı — .claude/launch.json'a girdi
ekleyip Browser pane'de açmak tercihdir, Bash'te sunucu çalıştırma).

Kullanılacak modlar/araçlar:
- **Site turu (V1 ve V4 ekran bölümleri):** `senaryo-*.json` yaz — alanlar:
  `site`, `videoBoyut {genislik,yukseklik}`, `profil` (marka kiti), opsiyonel `giris
  {url,eposta,sifre,dogrula}`, `adimlar[]` = `{adim, eylem: giris|tikla|bekle|kaydir,
  hedef, bekle(ms), narasyon}`. Playwright siteyi gezip kaydeder, Gemini TTS
  narasyonu seslendirir. Mevcut `senaryo-tam-demo.json` iyi bir şablondur.
- **Belgeden slayt (V3/V4 kart sahneleri):** belge-video modu; ya da Adım 2 görselleri
  `cikti/kutuphane/` üzerinden akışa eklenir (Medya Kütüphanesi).
- **Hazır videoya seslendirme (V1 son montaj):** "Videoyu seslendir" modu —
  görüntüyle zaman-senkron; metni storyboard'daki SES satırlarından ver.
- **Birleştirme:** `birlestir.js`; **9:16:** reel modları (`reel-caption.js`,
  `reel-seslendirme.js`); **kapak:** `kapak-uret.js`.
- Marka kiti: `/marka-medya` ekranından logo + renk paleti kaydet; senaryolar
  `profil` ile ona bağlanır.

## Adım 4 — Teslim

- `cikti/` altındaki MP4'leri kullanıcıya SendUserFile ile gönder (her video hazır
  oldukça, hepsini bekletmeden).
- Kısa durum tablosu: video, süre, format(lar), kapak, nerede yayınlanacağı.
- Sosyal dağıtım istenirse `sosyal-yayinci` skill'ine geç.

## Sınırlar

- Gerçek kullanıcı verisi içeren ekranları kaydetme; test hesabı/test etkinliği kur.
- API anahtarlarını sohbete yazdırtma; env veya gizli diyalog deseni.
- Seslendirme klonu isteniyorsa açık rıza şartı (Demo Stüdyo'nun kendi kuralı).
