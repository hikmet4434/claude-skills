---
name: stripe-canli-kurulum
description: "Bir SaaS uygulamasına Stripe CANLI (live) abonelik altyapısını uçtan uca kurar: tarayıcı otomasyonuyla ürün+fiyat oluşturma, price ID toplama, webhook (event destination) kurulumu, kullanıcıyı Secret key ve Signing secret ekranlarına getirme, env doğrulaması ve canlı checkout testi. Kullanıcı şunlardan bahsettiğinde kullan: stripe kur, stripe ekle, stripe entegrasyonu, stripe bağla, canlı ödeme, abonelik ödemesi, ödeme altyapısı, stripe ürün fiyat, stripe webhook, stripe secret key, stripe live setup, stripe subscription, payment integration, add stripe. Ayrıca bir uygulamada STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / STRIPE_PRICE_* env değişkenleri doldurulacaksa da tetiklenir."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---

# Stripe Canlı Kurulum

Bir SaaS'ın canlı (live-mode) Stripe abonelik altyapısını kurar. İki katı kural:

1. **Gizli değerleri (sk_live_, whsec_) ASLA okuma, kopyalama, bir alana yazma.** Kullanıcıyı doğru ekrana getir, kopyalamayı o yapar. Senin işin biçim doğrulamasıdır (önek + uzunluk), değerin kendisi değil.
2. **Stripe MCP connector'ının YAZMA araçlarını kullanma** — iç içe parametreleri string'e çevirip gönderir, sunucu object bekler, her çağrı şema hatasıyla düşer. Canlı kurulumun tek güvenilir yolu kullanıcının Chrome oturumuyla tarayıcı otomasyonudur (claude-in-chrome). Okuma araçları (hesap listeleme) çalışır.

## Ön Koşullar

| Koşul | Kontrol |
|---|---|
| Uygulama kodu Stripe'a hazır | Kodda `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, plan→price env eşlemesi ve webhook route'unun dinlediği olayları grep'le çıkar |
| Kullanıcı Stripe'a girişli | dashboard.stripe.com'a git; login ekranı çıkarsa girişi KULLANICI yapar (şifre girmek yasak), sen beklersin |
| Doğru hesap/mod | Sayfa başlığında hesap adını doğrula; live mode'da olduğundan emin ol (test anahtarı `sk_test_` işe yaramaz) |

Önce koddan üç şeyi çıkar: **plan listesi + fiyatları + periyotları**, **beklenen env adları**, **webhook'un dinlediği olaylar**. Kurulum bu üçüne birebir uyar.

## Adım 1 — Ürün + Fiyat Oluşturma

`https://dashboard.stripe.com/<acct_id>/products/create` sayfasında her plan için:

1. **Name** alanına plan adı (örn. "Uygulama Mini")
2. **Price** alanına tutar (`249.99` biçimi, nokta ile)
3. **Para birimi**: seçiciye tıkla → `TRY` yaz → listeden "TRY - Turkish Lira"yı TIKLA (yazmak yetmez; sonrasında ekrandan `TRY` seçildiğini DOĞRULA — ilk denemede tutmayabilir)
4. **Recurring** seçili kalsın; yıllık planda **Billing period** dropdown'ını `Yearly` yap (native select ise `form_input` kullan)
5. Ara planlarda **"Save and add more"** (form sıfırlanır, seri üretim), son planda **"Save product"**

Her kayıttan sonra "Product created" toast'ı ve URL'deki `createdProductId=prod_...` değerini not et.

## Adım 2 — Price ID Toplama

Her ürünün sayfasına git (`/products/prod_...`) → Pricing tablosundaki fiyat satırına tıkla → açılan sayfanın **URL'si** `/prices/price_...` biçimindedir; `price_` ID'yi oradan al (sayfa başlığının sağında da yazar). Fiyat, para birimi ve periyodu bu sayfadan çapraz doğrula.

Topladığın ID'ler gizli DEĞİLDİR — env'e sen yazabilirsin.

## Adım 3 — Webhook (Event Destination)

`https://dashboard.stripe.com/<acct_id>/workbench/webhooks/create` üç adımlı sihirbaz:

1. **Select events**: Kodun dinlediği olayları TEK TEK arama kutusuna yaz + checkbox'ı işaretle (tipik SaaS seti: `checkout.session.completed`, `invoice.payment_failed`, `customer.subscription.deleted`). Fazla olay ekleme — gürültü. URL'ye `?events=a,b,c` parametresi vererek de ön-seçim yapabilirsin.
2. **Destination type**: Webhook endpoint → Continue
3. **Configure**: Name + Endpoint URL (`https://<uygulama>/api/webhooks/stripe`) → Create destination

**16-destination limiti:** "You have reached the limit of destinations" çıkarsa `/workbench/webhooks` listesine git, ölü adayları bul — **ngrok/localtunnel URL'li** olanlar (geçici dev tünelleri, kesin ölü) ve **Disabled** durumundakiler. Silme yıkıcıdır: adayları gerekçesiyle listele, KULLANICI ONAYI al, sonra satır menüsünden Delete.

## Adım 4 — Gizli Değerler (kullanıcının işi)

Kullanıcıya iki linki ver, ikisini karıştırmamasını açıkça söyle:

| Değer | Nerede | Biçim |
|---|---|---|
| `STRIPE_SECRET_KEY` | `/<acct_id>/apikeys` → Secret key → Reveal | `sk_live_` ile başlar, **~107 karakter** |
| `STRIPE_WEBHOOK_SECRET` | webhook detay sayfası → Signing secret → göz simgesi | `whsec_` ile başlar, **~38 karakter** |

> **En sık hata:** İki alana da aynı `sk_live_` değerinin yapıştırılması. Bu durumda ödeme alınır ama webhook imza doğrulaması her bildirimi reddeder → plan asla aktive olmaz. Sessiz ve sinsi bir hatadır.

## Adım 5 — Env Doğrulaması (değeri okumadan)

Kullanıcı env'e yapıştırdıktan sonra yalnız **önek + uzunluk** kontrol et (panelin dev-view'ından JS ile `{onek: v.slice(0,8), uzunluk: v.length}` gibi):

- `STRIPE_SECRET_KEY` → `sk_live_` + ~107 kr ✓
- `STRIPE_WEBHOOK_SECRET` → `whsec_` + ~38 kr ✓ (`sk_liv...` görürsen Adım 4'teki hata gerçekleşmiş — kullanıcıya doğru linki tekrar ver)
- `STRIPE_PRICE_*` → `price_` öneki ✓ (kullanıcı senin mesajındaki `price_...` ŞABLONUNU aynen yapıştırmış olabilir — gerçek ID'lerle sen düzelt)

## Adım 6 — Deploy + Canlı Test

1. Env değişikliği sonrası uygulamayı yeniden deploy et ve deployment geçmişinde **yeni bir "In progress/Success" satırı GÖREREK** doğrula — "tıkladım" yetmez.
2. Uygulamanın abonelik sayfasından bir plana tıkla → **checkout.stripe.com**'a yönleniyorsa secret key + price ID zinciri çalışıyor demektir. Kart bilgisi GİRME, ödemeyi tamamlama — orada dur.
3. Webhook zinciri ancak gerçek bir ödemeyle kanıtlanır; kullanıcıya "ilk gerçek satın almada plan aktivasyonunu birlikte izleyelim" de.

## Sık Sorunlar

Dashboard'un yavaşlığı, Coolify Livewire tık sorunu ve diğer tuzaklar için: [references/sorun-giderme.md](references/sorun-giderme.md)
