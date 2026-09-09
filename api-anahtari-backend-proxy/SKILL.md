---
name: api-anahtari-backend-proxy
description: "Sağlayıcı API anahtarları (OpenRouter, Anthropic, OpenAI, Apollo, Stripe secret, Gemini) asla istemciye konmaz — anahtar yalnızca kendi kontrolündeki backend'de durur, istemci backend'e istek atar. ThirdHand AI Agency çatısındaki tüm uygulamalar (Fasheone, TradeOne, SektörAra, RestoSepet, AtelierOS, Sesyaz, Çevirist) bu mimariyi kullanır. Kullanıcı şunlardan bahsettiğinde uygula: api anahtarı, api key, openrouter key, anahtar sızdı, key leak, anahtar güvenliği, frontend'den llm çağırmak, dangerouslyAllowBrowser, NEXT_PUBLIC/VITE_/EXPO_PUBLIC değişkeni, proxy uç, backend proxy, anahtar rotasyonu. Ayrıca YENİ bir uygulamaya LLM/dış servis entegrasyonu eklenirken onay sorulmadan uygulanır. İstismarı önleyen hız sınırı için hiz-siniri-guvenlik, sağlayıcı adını kullanıcıdan gizlemek için saglayici-gizleme-model-haritasi skilline bak."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---

# API Anahtarı = Yalnız Backend (Kalıcı Mimari Kural)

## Kural (onay sorma)

Kullanıcı 9 Eylül 2026'da kalıcı mimari talimat verdi:

> Sağlayıcı API anahtarları **hiçbir zaman** istemci tarafına konmaz — frontend
> JavaScript, mobil uygulama içine gömülü kod, herkese açık GitHub deposu,
> Notion/Google Docs gibi paylaşılan dokümanlar dahil. Anahtar yalnızca kendi
> kontrolündeki backend sunucusunda durur. ThirdHand AI Agency çatısındaki her
> uygulama kendi backend'i üzerinden anahtara erişir; kullanıcı tarafındaki kod
> yalnızca kendi backend'ine istek atar.

Bunu yapmak için onay sorma. Yapmamak için gerekçe gerekir ve gerekçe neredeyse
hiç yoktur: anahtar dışarı çıkmıyorsa dışarıdaki kimse ona dokunamaz.

Kapsam: OpenRouter, Anthropic, OpenAI, Google Gemini, DeepSeek, Groq, Apollo,
Stripe **secret** anahtarı, Twilio, SendGrid, Supabase `service_role`, S3/R2
erişim anahtarları — kısaca fatura üretebilen veya veri okuyabilen her sır.

**İstisna (gerçek public anahtarlar):** `pk_live_...` (Stripe publishable),
Supabase `anon` anahtarı, Firebase web config, Google Maps JS anahtarı. Bunlar
tasarım gereği istemcide durur; korumaları RLS/domain kısıtı/referrer kuralıdır.
Bunları backend'e taşımaya çalışma — sadece kısıtlarının kurulu olduğunu doğrula.

---

## Neden: sızan anahtar ne yapar

1. **Fatura senin.** OpenRouter anahtarı bulan bot krediyi saatler içinde tüketir.
2. **Geri alınamaz.** Yayınlanan bir bundle, klonlanan bir depo, indirilen bir APK
   geri çağrılamaz — anahtarı iptal etmekten başka çare kalmaz.
3. **Gecikmeli patlar.** Anahtar yıllar sonra taranan bir depoda bulunabilir;
   "kimse fark etmedi" kanıt değildir.

Bu yüzden çözüm "anahtarı gizlemek" (obfuscation) değil, **anahtarı hiç
göndermemek**tir. İstemciye giden her şey okunabilir: minify edilmiş JS, .env
build'e gömülen değer, mobil uygulama binary'si, ağ isteğinin başlıkları.

---

## Adım 1 — Sızıntı envanteri (tahmin etme, tara)

```bash
# 1) İstemciye gömülen env değişkenleri — en sık kaynak
grep -rnE "(NEXT_PUBLIC|VITE_|REACT_APP_|EXPO_PUBLIC|PUBLIC_)[A-Z_]*(KEY|TOKEN|SECRET|API)" \
  --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.env*" .

# 2) Tarayıcıda SDK çalıştırma bayrağı
grep -rn "dangerouslyAllowBrowser" .

# 3) İstemci kodundan doğrudan sağlayıcıya istek
grep -rnE "openrouter\.ai|api\.anthropic\.com|api\.openai\.com|generativelanguage\.googleapis" \
  <istemci-dizini>

# 4) Depoya girmiş ham anahtar biçimleri
grep -rnE "sk-or-v1-|sk-ant-|sk-proj-|sk_live_|AIza[0-9A-Za-z_-]{35}" . \
  --exclude-dir=node_modules --exclude-dir=.git

# 5) Git geçmişinde kalmış mı (dosyayı silmek yetmez)
git log --all -p -S "sk-or-v1-" --oneline | head
```

Bulduğun her satırı **sınıflandır**: gerçek sır mı, yoksa tasarım gereği public
anahtar mı? Yanlış sınıflandırma iki yönde de zarar verir.

---

## Adım 2 — Sızmışsa önce rotasyon, sonra kod

Sızmış bir anahtarı koddan silmek onu geçersiz kılmaz. Sıra şudur:

1. **Sağlayıcı panelinden anahtarı iptal et / yeni anahtar üret.**
2. Yeni anahtarı yalnız backend ortam değişkenine koy (Railway/Vercel/Render
   secret alanı — depoya değil).
3. Sağlayıcı panelinde kullanım kaydına bak: yabancı çağrı var mı, ne kadar harcandı.
4. Sonra kodu düzelt.

Git geçmişinden temizlemek (`filter-repo`, `BFG`) **rotasyonun yerine geçmez**;
depo çoktan klonlanmış olabilir. Önce iptal, temizlik sonra ve isteğe bağlı.

---

## Adım 3 — Doğru mimari

```
[ İstemci ]  →  [ SENİN backend'in ]  →  [ Sağlayıcı ]
  oturum          API anahtarı            OpenRouter
  çerezi          burada durur            Anthropic
  (anahtar yok)   ve dışarı çıkmaz        Apollo …
```

İstemci sağlayıcıyı **hiç tanımaz**. Kendi backend'inin ucunu çağırır:

```ts
// istemci — anahtar yok, sağlayıcı adı yok
const res = await fetch("/api/ai/ozetle", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",          // oturum çerezi
  body: JSON.stringify({ metin })
});
```

```ts
// backend — anahtar yalnız burada
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,      // asla NEXT_PUBLIC_ değil
  baseURL: "https://openrouter.ai/api/v1"
});

export async function ozetle(req, res) {
  const user = await requireUser(req);          // 1) kimlik
  await rateLimit(user.id, "ai:ozetle");        // 2) kota
  const { metin } = parse(schema, req.body);    // 3) girdi doğrulama
  const out = await client.chat.completions.create({
    model: process.env.AI_MODEL,
    messages: [{ role: "user", content: metin }]
  });
  return res.json({ ozet: out.choices[0].message.content });  // 4) daraltılmış yanıt
}
```

### Backend'i nereye koyacaksın

| Uygulama tipi | Sunucu tarafı |
|---|---|
| Next.js | Route Handler / Server Action (`app/api/...`) — `"use server"` veya server dosyası |
| Vite + React SPA | Ayrı bir API servisi (NestJS/Express/Fastify) veya edge function |
| React Native / Expo | Kendi API'n — `EXPO_PUBLIC_*` build'e gömülür, sır olmaz |
| Statik site | Cloudflare Worker / Netlify Function / Vercel Function |

Kural sabit: **anahtarın okunduğu dosya istemci bundle'ına dahil edilmemeli.**
Next.js'te bir sunucu modülünü yanlışlıkla bir `"use client"` bileşenine import
edersen anahtar bundle'a girer — bu, en sık gözden kaçan sızıntıdır.

---

## Adım 4 — Proxy'yi korumasız bırakma

**Kimliksiz ve kotasız bir proxy, halka açık bir anahtardan farksızdır.**
Anahtarı gizlersin ama faturayı yine herkes ödettirir. Dört koruma zorunlu:

| Koruma | Neden |
|---|---|
| **Kimlik** — oturum/JWT kontrolü | Anonim çağrıyı engeller |
| **Hız sınırı** — kullanıcı **ve** IP başına | Tek hesapla kota yakmayı engeller (→ `hiz-siniri-guvenlik`) |
| **Girdi doğrulama** — şema + uzunluk sınırı | 200 sayfalık girdiyle token yakmayı engeller |
| **Dar uç** — serbest "prompt geçir" ucu YOK | Uç işi tanımlar (`ozetle`, `gtip-oner`), keyfi prompt kabul etmez |

Serbest proxy anti-kalıbı:

```ts
// ❌ YAPMA — kullanıcı model ve prompt'u seçiyorsa proxy'yi bedava LLM'e çevirdin
app.post("/api/llm", (req, res) => forward(req.body));   // model + messages dışarıdan
```

Model seçimini **backend belirler** (env/ayardan). Kullanıcı yalnızca veriyi gönderir.

Ek olarak sağlayıcı panelinde **aylık harcama limiti** tanımla — kod tarafındaki
her koruma delinse bile üst sınır fatura hasarını sabitler.

---

## Adım 5 — Uygulama başına ayrı anahtar

Tüm ThirdHand uygulamaları tek anahtarı paylaşmasın:

| Neden | Sonuç |
|---|---|
| Sızıntıda etki alanı | Yalnız o uygulamanın anahtarı iptal edilir, diğerleri ayakta kalır |
| Maliyet takibi | Hangi uygulama ne harcıyor, sağlayıcı panelinden ayrışır |
| Kota tavanı | Uygulama başına ayrı üst sınır |

İsimlendirme: `OPENROUTER_API_KEY` (her uygulamanın kendi ortamında, farklı değer).
Değişken adını uygulamaya göre değiştirme — **değeri** farklı olsun ki kod taşınabilir kalsın.

---

## Adım 6 — Doğrula (atlanmaz)

```bash
# 1) Derlenmiş bundle'da anahtar deseni var mı — asıl kanıt bu
npm run build
grep -rE "sk-or-v1-|sk-ant-|sk-proj-|sk_live_" dist/ .next/static/ build/ 2>/dev/null && echo "!! SIZINTI"

# 2) Canlıdaki JS chunk'larını tara (kaynakta sildiğini sandığın metin başka bileşende kalmış olabilir)
curl -s "$SITE" | grep -o '/_next/static/chunks/[^"]*\.js' | sort -u | \
  while read c; do curl -s "$SITE$c" | grep -qE "sk-or-v1-|sk-ant-" && echo "SIZINTI: $c"; done

# 3) Proxy kimliksiz çağrıyı reddediyor mu
curl -s -o /dev/null -w "%{http_code}\n" -X POST "$API/api/ai/ozetle" \
  -H "Content-Type: application/json" -d '{"metin":"test"}'
#    beklenen: 401 (200 geliyorsa uç herkese açık)

# 4) Hız sınırı devrede mi
for i in $(seq 1 30); do
  curl -s -o /dev/null -w "%{http_code} " -X POST "$API/api/ai/ozetle" \
    -H "Cookie: $OTURUM" -H "Content-Type: application/json" -d '{"metin":"test"}'
done; echo
#    beklenen: bir noktada 429
```

Tarayıcı ağ sekmesinde de bak: giden isteklerin başlıklarında `Authorization:
Bearer sk-...` görünüyorsa mimari yanlıştır — istemci sağlayıcıya doğrudan
konuşuyor demektir.

---

## Sık yapılan hatalar

- **`NEXT_PUBLIC_` / `VITE_` / `EXPO_PUBLIC_` önekiyle sır koymak.** Bu önekler
  "istemciye gömülecek" demektir; adı ne olursa olsun sır olmaz.
- **`dangerouslyAllowBrowser: true`.** Bayrağın adı zaten uyarı. Anahtar tarayıcıya iner.
- **Sunucu modülünü `"use client"` bileşenine import etmek.** Anahtar sessizce bundle'a girer.
- **Anahtarı `.env` ile depoya göndermek.** `.gitignore`'a `.env*` (ama `.env.example` hariç) ekle.
- **Sızan anahtarı iptal etmeden koddan silmek.** Anahtar hâlâ geçerli, sızıntı hâlâ açık.
- **Proxy'yi kimliksiz bırakmak.** Anahtar gizli, fatura hâlâ ortak.
- **Serbest prompt/model geçen genel `/api/llm` ucu.** Bedava LLM servisi açmış olursun.
- **Anahtarı Notion/Docs/Slack'e yapıştırmak.** Paylaşılan doküman istemci tarafıdır.
- **Gerçek public anahtarları da backend'e taşımaya çalışmak.** Boşuna iş; onların
  koruması RLS/domain kısıtıdır — onu doğrula.
- **Anahtarı `pm2`/`docker run` komut satırına yazmak.** `ps` çıktısında ve shell
  geçmişinde görünür; ortam değişkeni dosyası veya secret yöneticisi kullan.

---

## İlgili skiller

- **hiz-siniri-guvenlik** — proxy uçlarına zorunlu hız sınırı
- **saglayici-gizleme-model-haritasi** — sağlayıcı **adını** son kullanıcıdan gizleme (bu skill anahtarı gizler, o skill ismi)
- **openrouter-latest** — backend'de kullanılacak model alias'ları ve fallback zinciri
- **agentic-security-firewall** — LLM uçları için geniş kapsamlı savunma katmanları
