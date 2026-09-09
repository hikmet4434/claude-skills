---
name: saglayici-gizleme-model-haritasi
description: "Bir SaaS uygulamasında tedarikçi/sağlayıcı adlarını (Apollo, OpenRouter, Anthropic, Stripe, model isimleri) son kullanıcıdan gizler ve admin paneline 'hangi işlem hangi modeli/sağlayıcıyı kullanıyor' haritası ekler. Harita sabit liste değildir: canlı getter'lardan okunur, ayar değişince kendini günceller. Tetikleyiciler: 'sağlayıcı adlarını gizle', 'llm adları görünmesin', 'hangi işlemde hangi model', 'model haritası', 'admin panele model bilgisi ekle', 'vendor gizle'."
trigger: /saglayici-gizle
---

# Sağlayıcı Gizleme + Admin Model Haritası

Uygulamanın hangi tedarikçilerden beslendiği (LLM sağlayıcısı, model adları,
veri sağlayıcıları) **rekabet bilgisidir**. Son kullanıcı bunu görmemeli; admin
ise tek bakışta "hangi işlem hangi modeli kullanıyor" görebilmeli.

Bu skill iki işi birlikte yapar, çünkü ayrı yapılırsa bilgi ya tamamen kaybolur
(admin de göremez) ya da sızmaya devam eder.

## Ne zaman kullanılır
- "Apollo/OpenRouter/model adları kullanıcıya görünmesin"
- "Admin panelde hangi işlemde hangi LLM kullanılıyor görelim"
- "Model değişince panel kendini güncellesin"

## Temel kural: TEK KAYNAK

Model haritasını **elle yazılmış sabit liste** olarak tutma. Böyle bir liste
kaçınılmaz olarak gerçekten sapar — bu projede fiyat karşılaştırma tablosu tam
bunun yüzünden yanlış limitler gösteriyordu.

Bunun yerine haritayı, uygulamanın gerçekten kullandığı **canlı getter'lardan**
türet:

```ts
// ai.service.ts — YALNIZ ADMİN'e gösterilir
get modelUsage() {
  return {
    provider: this.provider,
    enabled: this.enabled,
    fallbackChain: this.fallbackModels,
    tasks: [
      { key: "gtip_text",   label: "Metinden GTİP önerisi", where: "AI GTİP Bulucu",
        model: this.defaultModel, envVar: "AI_MODEL" },
      { key: "gtip_image",  label: "Görselden GTİP önerisi", where: "Fotoğraf yükleme",
        model: this.visionModel,  envVar: "AI_VISION_MODEL" },
      { key: "company_judge", label: "Firma kanıt hakemliği", where: "Site doğrulaması",
        model: this.judgeModel,   envVar: "AI_JUDGE_MODEL" }
    ]
  };
}
```

`this.defaultModel` zaten çağrı anında env/ayarı okuduğu için, ayar değişince
harita **kendiliğinden** güncellenir. Güncellenecek ikinci bir kopya yoktur.

## Adım 1 — Sızıntı envanteri çıkar

Önce nerelerden sızdığını bul; tahmin etme:

```bash
# Kullanıcıya görünen metinler
grep -rn "Apollo\|OpenRouter\|Anthropic\|Claude\|GPT\|Gemini\|DeepSeek\|Grok\|Stripe" \
  <web-bilesenleri-dizini> | grep -vi admin

# API yanıtlarındaki ham alanlar
grep -rn "source:\|provider:" <api-modulleri-dizini>
```

Tipik sızıntı noktaları:
1. **Rozet/etiket metinleri** — "Apollo.io kaydı"
2. **Bilgi bantları** — "X üzerinden canlı bulundu"
3. **Buton açıklamaları** — "…Apollo'dan getirir"
4. **Boş sonuç mesajları** — "Apollo adres döndürmedi"
5. **Hata mesajları** — "Apollo entegrasyonu tanımlı değil"
6. **API yanıtındaki ham enum** — `source: "apollo"` (devtools'tan görünür)
7. **İç teşhis alanları** — sorgu/terim dökümleri

## Adım 2 — Kullanıcıya görünen metinleri nötrleştir

Etiket **ne olduğunu** söylesin, **kimden geldiğini** değil:

| Önce | Sonra |
|---|---|
| "Apollo.io kaydı" | "Firma rehberi kaydı" |
| "Apollo.io üzerinden canlı bulundu" | "canlı firma rehberinden bulundu" |
| "Apollo entegrasyonu tanımlı değil" | "Kişi araması şu anda kullanılamıyor" |

Kod **yorumlarındaki** sağlayıcı adlarını KALDIRMA — onlar geliştirici için
gereklidir ve kullanıcıya görünmez.

## Adım 3 — Ham API alanlarını role göre maskele

Arayüz metnini değiştirmek yetmez; kullanıcı devtools'tan ham yanıtı görebilir.

```ts
const isAdmin = Boolean(user?.roles?.includes("ADMIN"));
return {
  // Admin gerçek kaynağı görür, son kullanıcı nötr değeri
  source: isAdmin ? realSource : (rows.length ? "directory" : "none"),
  // İç teşhis yalnız admine
  query: isAdmin ? this.provider.lastQuery : undefined,
  rows
};
```

Arayüzde **her iki değeri de aynı rozete eşle**, yoksa görünüm role göre
değişir ve admin ile kullanıcı farklı ekran görür:

```ts
const map = {
  apollo:    ["blue", "Firma rehberi kaydı"],  // admine dönen değer
  directory: ["blue", "Firma rehberi kaydı"]   // kullanıcıya dönen değer
};
```

## Adım 4 — Admin ucu

```ts
@Get("llm/usage")
llmUsage(@Headers("x-admin-token") token?: string, @Headers("authorization") auth?: string) {
  this.assertAdmin(token, auth);
  return {
    generatedAt: new Date().toISOString(),
    llm: this.ai.modelUsage,
    integrations: [
      { key: "apollo", provider: "Apollo.io", label: "Firma & kişi keşfi",
        where: "Firma Veritabanı", configured: Boolean(process.env.APOLLO_API_KEY),
        envVar: "APOLLO_API_KEY" }
      // … diğer dış servisler
    ]
  };
}
```

LLM dışı servisleri de aynı panele koy: admin "neyimiz nereye bağlı ve anahtarı
var mı" sorusunu tek ekranda yanıtlayabilsin.

## Adım 5 — Panel bölümü + otomatik yenileme

Ayar kaydedildiğinde/sıfırlandığında usage sorgusunu da geçersiz kıl; yoksa
panel eski modeli göstermeye devam eder:

```ts
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
  queryClient.invalidateQueries({ queryKey: ["admin-llm-usage"] }); // ← kritik
}
```

Tabloda göster: **İşlem · Nerede · Model · Ayar değişkeni**. "Nerede" sütunu
adminin "bu modeli değiştirirsem hangi ekran etkilenir" sorusunu yanıtlar.
Yedek zinciri (fallback chain) varsa onu da yaz.

## Adım 6 — Doğrula (atlanmaz)

```bash
# 1) Admin uç çalışıyor mu
curl -s -H "x-admin-token: $ADMIN_TOKEN" "$API/admin/settings/llm/usage" | jq '.llm.tasks'

# 2) Admin OLMADAN teşhis alanları gelmiyor mu
curl -s -X POST "$API/<liste-ucu>" -d '{...}' | jq '{source, query, verifyTerms}'
#    beklenen: source nötr, query ve verifyTerms null

# 3) Arayüzde sağlayıcı adı kalmış mı (derlenmiş JS'te ara)
curl -s "$SITE/<sayfa>" | grep -o '/_next/static/chunks/[^"]*\.js' | sort -u | \
  while read c; do curl -s "$SITE$c" > /tmp/c.js; grep -lF "Apollo" /tmp/c.js; done
```

Üçüncü kontrol önemli: kaynak koddan sildiğini sandığın metin başka bir
bileşende kalmış olabilir.

## Dokunulmayacak yer: hukuki açıklamalar

**Gizlilik politikasındaki alt işleyici (sub-processor) listesini KALDIRMA.**
KVKK/GDPR kapsamında hangi üçüncü taraflara veri aktarıldığını açıklamak
genellikle bir yükümlülüktür. Pazarlama gizliliği için hukuki açıklamayı
silmek yanlıştır. Bunu kullanıcıya bildir ve olduğu gibi bırak.

Aynı şekilde, pazarlama sayfasında "X benzeri katmanlar" gibi **kategori**
tarifi varsa, bu bilinçli bir açıklama olabilir — sessizce değiştirme, sor.

## Sık yapılan hatalar

- **Sadece arayüz metnini değiştirmek.** Ham API alanı devtools'tan görünür.
- **Sabit model listesi yazmak.** Zamanla gerçekten sapar; getter'dan türet.
- **Ayar kaydında usage sorgusunu yenilememek.** Panel eski modeli gösterir.
- **Rozet eşlemesini tek değere bağlamak.** Admin ile kullanıcı farklı ekran görür.
- **Kod yorumlarını temizlemeye çalışmak.** Gereksiz; kullanıcıya görünmez.
- **Gizlilik politikasını da temizlemek.** Hukuki risk.
