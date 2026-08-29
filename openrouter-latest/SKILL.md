---
name: openrouter-latest
description: OpenRouter kullanılan HER işte geçerli kurallar - ~latest alias'ları ve glm→gemini→deepseek→grok fallback zinciri. Tetikleyici - kod OpenRouter API'sine istek atacaksa veya OPENROUTER_MODEL seçilecekse bu skill uygulanır.
---

# OpenRouter Kullanım Kuralları (~latest + Fallback Zinciri)

Bu kurallar, OpenRouter üzerinden LLM çağrısı yapan HER kodda (yeni veya mevcut)
aksi açıkça söylenmedikçe geçerlidir.

## 1. Model adları: her zaman `~...-latest` alias'ları

`~` önekli latest alias'ları OpenRouter'da hep en güncel modele çözülür —
versiyon kovalamak yok. Sabit versiyon adı (örn. `google/gemini-2.0-flash`)
YAZMA; alias kullan.

Doğrulanmış alias'lar (2026-08 itibarıyla çözüldükleri model):

| Alias | Şu an çözüldüğü model |
|---|---|
| `~z-ai/glm-latest` | glm-5.3 |
| `~google/gemini-flash-latest` | gemini-3.7-flash |
| `~deepseek/deepseek-v4-flash-latest` | deepseek-v4-flash |
| `~x-ai/grok-latest` | grok-4.6 |
| `~openai/gpt-latest` | gpt-5.6 |
| `~anthropic/claude-opus-latest` | claude-opus-5 |

## 2. Fallback zinciri (zorunlu desen)

Tek modele bağlanma. Varsayılan sıra:

1. `~z-ai/glm-latest`
2. `~google/gemini-flash-latest`
3. `~deepseek/deepseek-v4-flash-latest`
4. `~x-ai/grok-latest`

Bir model **hata dönerse VEYA boş içerik dönerse** otomatik sıradakine düş.
Boş içerik kontrolü şart: glm gibi reasoning modelleri bazen `content: null`
dönüyor (cevap reasoning alanında kalıyor) — bu "başarılı ama boş" yanıt da
fallback tetiklemeli. Referans uygulama: ihaleist `ai.service.ts`.

```ts
const CHAIN = [
  "~z-ai/glm-latest",
  "~google/gemini-flash-latest",
  "~deepseek/deepseek-v4-flash-latest",
  "~x-ai/grok-latest",
];

for (const model of CHAIN) {
  try {
    const res = await openrouterChat(model, messages);
    const content = res.choices?.[0]?.message?.content;
    if (content && content.trim()) return { content, model };
    // boş içerik → sıradaki modele düş
  } catch { /* hata → sıradaki modele düş */ }
}
throw new Error("Tüm OpenRouter modelleri başarısız/boş döndü");
```

## 3. Admin panelden seçilebilir olmalı (zorunlu)

Model listesi koda gömülü kalmaz — uygulamanın **admin paneline eklenir** ve
yönetici zincirdeki modelleri oradan seçebilir:

- Ayarlar DB'de tutulur (örn. `app_settings` tablosu, anahtar/değer JSON).
- Admin panelde "Yapay Zekâ Modelleri" bölümü: tüm `~...-latest` alias'ları
  listelenir, yönetici hangilerinin **hangi sırayla** deneneceğini seçer
  (birden çok seçim = fallback zinciri).
- Kayıtlı ayar yoksa varsayılan zincir (glm → gemini → deepseek → grok) geçerlidir.
- Ortam değişkeni `OPENROUTER_MODEL` yalnızca acil geçersiz kılma içindir;
  normal akışta panel ayarı kullanılır.
- Panelde "Bağlantıyı test et" düğmesi: seçilen zincirle küçük bir istek atıp
  hangi modelin cevap verdiğini gösterir.

## 4. Diğer kurallar

- Ortam değişkeni ile geçersiz kılınabilir olmalı (örn. `OPENROUTER_MODEL`
  tanımlıysa zincirin başına o eklenir) ama varsayılan hep yukarıdaki zincirdir.
- JSON çıktı isteniyorsa `response_format: {type:"json_object"}` + markdown
  ```json çitlerini soyan bir temizleyici kullan (bazı modeller çite sarar).
- Anahtar: `OPENROUTER_API_KEY`. Anahtar yoksa throw etme; anlamlı,
  kullanıcı diline uygun bir hata nesnesi döndür.
- Tek bir ortak istemci dosyası olsun (örn. `lib/openrouter.ts`); çeviri,
  analiz vb. tüm çağrılar oradan geçsin — `fetch("https://openrouter.ai/...")`
  satırı kod tabanında yalnızca o dosyada bulunmalı.
- Zincir denemelerini `tried: [{model, ok, reason}]` olarak döndür; panelin
  test ekranı hangi modelin neden atlandığını gösterebilsin.

## Referans uygulama

İhaleAB (`~/ihaleab`): `backend/src/lib/openrouter.ts` (istemci + zincir +
`app_settings` okuma), `backend/src/routes/admin.ts` (GET/PUT `/api/admin/settings`,
POST `/settings/test-ai`), `backend/sql/0010_app_settings.sql`,
`frontend/src/pages/AdminSettings.tsx` (model seçimi + sıralama + test).
