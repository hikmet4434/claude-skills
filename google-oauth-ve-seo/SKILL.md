---
name: google-oauth-ve-seo
description: Bir web uygulamasına Google ile giriş (OAuth) eklemek veya uygulamanın Google'da (ve GPTBot/ClaudeBot gibi GEO botlarında) doğru indekslenmesi için gereken SEO temel taşlarını kurmak/denetlemek gerektiğinde bu skill geçerlidir. "Google girişi ekle", "Google ile giriş", "SEO", "sitemap", "Google'da çıksın", "arama sonuçlarında üstte çıksın" gibi istekler tetikler.
---

# Google OAuth Girişi + SEO Temel Taşları

Referans uygulama: **mesajpilot** (`lib/google.ts`, `app/api/google/baglan|donus`,
`components/GoogleGirisButonu.tsx`, `app/sitemap.ts`, `public/robots.txt`,
`app/YapisalVeri.tsx`). Yeni bir uygulamada bu skill tetiklendiğinde önce o
dosyalara bakıp deseni kopyala/uyarlamayı dene.

## Bölüm 1 — Google ile Giriş (OAuth 2.0 Authorization Code)

### Neden kütüphane değil, elle fetch

Proje zaten eBay OAuth'u elle (next-auth vb. olmadan) `fetch` ile yapıyor.
Aynı deseni tekrar kullan — ekstra bağımlılık gerekmiyor, akış üç adımdan
ibaret: onay ekranına yönlendir → kod al → token'a takas et → profil çek.

### Adımlar

1. **Ortam değişkenleri:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
   Tanımlı değilse özellik SESSİZCE KAPALI olmalı (anlaşılır hata döner),
   uygulama çökmemeli. Google Cloud Console > APIs & Services > Credentials'ta
   "Web application" tipi istemci oluşturulur; yetkili yönlendirme URI'si
   `<TABAN_URL>/api/google/donus` olarak eklenir.

2. **`lib/google.ts`** — üç fonksiyon:
   - `googleUygulamasi()`: env'den client id/secret okur, biri eksikse `null`.
   - `onayAdresi(uygulama, durum)`: `https://accounts.google.com/o/oauth2/v2/auth`
     adresine `client_id, redirect_uri, response_type=code, scope=openid email profile,
     state, prompt=select_account` parametreleriyle URL kurar.
   - `koduTakasEt(uygulama, kod)`: `https://oauth2.googleapis.com/token`'a POST
     (`grant_type=authorization_code`), dönen `access_token` ile
     `https://www.googleapis.com/oauth2/v3/userinfo`'dan `sub, email,
     email_verified` çeker. `id_token` JWT'sini kendin doğrulamaya kalkma —
     userinfo endpoint'i çağırmak daha basit ve güvenli (Google zaten TLS
     üzerinden doğrulanmış token'la konuşuyor).

3. **`/api/*/baglan` rotası (GET):** CSRF için rastgele `durum` (state) üret,
   **SHA-256 özetini** HttpOnly+Secure+SameSite=lax çerezde 10 dakika sakla,
   `onayAdresi()`'ye redirect et. Bu, projede eBay/diğer OAuth akışlarıyla
   birebir aynı desendir — yeni bir CSRF stratejisi icat etme.

4. **`/api/*/donus` rotası (GET):** `code` ve `state` query param'larını oku.
   Çerezdeki özeti **sabit süreli karşılaştırma** ile eşleştir (zamanlama
   saldırısına karşı). Kod yoksa "kullanıcı vazgeçti" say, hata sayfasına
   yönlendir — 500 döndürme. Token takasından sonra:
   - Önce `googleId` (Google'ın `sub` alanı) ile mevcut kullanıcı ara.
   - Yoksa `eposta` ile ara — varsa **hesabı birleştir** (mevcut parolalı
     hesaba `googleId` yaz), yeni mükerrer kayıt AÇMA.
   - O da yoksa yeni kullanıcı oluştur. `email_verified=true` ise kendi
     e-posta doğrulama akışını ATLA (Google zaten doğruladı).
   - Şifre alanı `NOT NULL` ise şemayı nullable yap (Google-only hesapta
     parola yok) ve şifre doğrulama fonksiyonunun `null` hash'i güvenle
     `false` döndürdüğünden emin ol.

5. **KVKK/gizlilik onayı:** Ayrı bir onay kutusu EKLEME (OAuth redirect akışı
   ara adımda form göstermeyi zorlaştırır). Bunun yerine düğmenin hemen
   altına küçük, bağlantılı bir metin koy: "Devam ederek [Kullanım Şartları]
   ve [Gizlilik/KVKK metnini] kabul edersiniz." Düğmeye tıklamak onay
   sayılır — parola formundaki ayrı checkbox'ın OAuth eşdeğeri budur.

6. **UI:** Giriş VE kayıt sayfalarında aynı tek "Google ile devam et" düğmesi
   (`/api/*/baglan`'e giden düz `<a href>`, JS'e gerek yok). Google resmi
   4 renkli "G" logosunu SVG olarak inline koy (marka kurallarına uygun,
   başka bir logo kullanma). Hata durumlarını (`?hata=...` query param) sayfa
   üstünde okunur bir mesajla göster; sessizce yutma.

### Yaygın hatalar

- Şifre hash'i `NOT NULL` bırakıp Google-only kullanıcıda boş string/placeholder
  yazmak — güvenlik açığı olabilir (biri o placeholder'ı bilirse giriş yapar).
  Doğrusu: alan gerçekten `NULL` olsun, doğrulama fonksiyonu `null`'da `false`.
- `redirect_uri`'yi hem `baglan` hem `donus` rotasında AYNI ÜRETMEMEK —
  Google bunu tam eşleşme ister, tek bir `donusAdresi()` fonksiyonunda tut.
- State doğrulamasını atlamak veya düz string karşılaştırmak (zamanlama
  saldırısı) — sabit süreli karşılaştırma şart.

## Bölüm 2 — SEO / Google'da İndekslenme Kontrol Listesi

### Kodla yapılabilenler (bu skill'i çalıştıran ajan halleder)

- [ ] `app/sitemap.ts` (Next.js `MetadataRoute.Sitemap`) — yalnızca herkese
      açık sayfalar, panel/API/oturum gerektiren yollar HARİÇ. Çift dilli
      siteyse her girişte `alternates.languages`.
- [ ] `public/robots.txt` — `Allow` ile herkese açık yollar, `Disallow` ile
      panel/api/oturum yolları; `Sitemap:` satırı. GEO botları (GPTBot,
      ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended) için de aynı
      izinleri ekle — ürün artık üretken arama motorlarında da bulunuyor.
- [ ] `app/layout.tsx` metadata: `title`, `description`, `keywords`,
      `openGraph`, `twitter`, `alternates.canonical`, çift dilliyse
      `alternates.languages` (hreflang, `x-default` dahil).
- [ ] `robots: { index: true, follow: true, googleBot: {...} }` metadata alanı.
- [ ] JSON-LD yapılandırılmış veri (`@context: schema.org`) — en az
      `Organization`/`SoftwareApplication` + `WebSite`. SSS varsa `FAQPage`
      (üretken motorlar soru-cevap içeriğini doğrudan alıntılar). Sahte/gerçek
      olmayan `aggregateRating` EKLEME — Google politikasına aykırı.
- [ ] `dangerouslySetInnerHTML` ile JSON-LD basılıyorsa `<` karakterini
      `<` ile kaçır (`</script>` enjeksiyon kapısı).
- [ ] `GOOGLE_SITE_VERIFICATION` ortam değişkeni + `metadata.verification.google`
      alanı — kullanıcı Search Console'dan kod alıp env'e koyduğunda kod
      değişikliği gerekmeden doğrulama tamamlanır.
- [ ] Her herkese açık sayfanın kendi `metadata`/`generateMetadata`'sı olsun
      (başlık/açıklama tekrar etmesin, her sayfa kendi arama sonucu snippet'i
      alsın).
- [ ] Yetim sayfa bırakma: yeni herkese açık her sayfa hem sitemap'te hem
      site içinde en az bir yerden (footer/nav) bağlantılı olsun.

### Kod DIŞINDA, kullanıcının kendisinin yapması gerekenler

Bunları kullanıcıya AÇIKÇA bir liste olarak ver — ajan bunları yapamaz:

1. **Google Search Console** (search.google.com/search-console) — mülk ekle
   (URL öneki yöntemi), doğrulama kodunu `GOOGLE_SITE_VERIFICATION`'a koy,
   deploy sonrası Console'da "Doğrula"ya tıkla.
2. Search Console'da **Sitemaps** bölümünden `sitemap.xml` gönder.
3. Search Console'da **URL Denetimi** ile ana sayfayı "Dizine eklenmesini
   iste" (indexing request) — ilk keşfi hızlandırır.
4. **Bing Webmaster Tools** (bing.com/webmasters) — aynı site, ayrı ayrı
   ekle; Bing/Yahoo/DuckDuckGo (bazı bölgelerde) trafiği de gelir.
5. **Google Business Profile** — fiziksel/yerel hizmet varsa mutlaka aç;
   yerel aramalarda (ör. "İstanbul X hizmeti") kritik.
6. **Sayfa hızı:** PageSpeed Insights (pagespeed.web.dev) ile Core Web
   Vitals kontrolü — Google sıralamasında doğrudan etkili sinyal.
7. **Geri bağlantı (backlink):** İçerik pazarlaması, topluluk paylaşımı,
   ortak/entegrasyon sayfalarından link — teknik SEO tek başına yetmez,
   Google'ın siteyi "önemli" görmesi için dışarıdan referans gerekir.
8. **Sabır:** Yeni alan adı genelde haftalar/aylar içinde tam indekslenir;
   "hemen ilk sırada çıkma" beklentisini yönet.

### Doğrulama

Kod tarafında yapılan her değişiklik sonrası: `next build` ile derleme
hatasız geçmeli, `curl -s <site>/sitemap.xml` ve `/robots.txt` gerçek
içerik döndürmeli, tarayıcıda sayfa kaynağında `<script type="application/ld+json">`
bloğunun geçerli JSON olduğu (ör. Google'ın Rich Results Test aracıyla)
teyit edilmeli.
