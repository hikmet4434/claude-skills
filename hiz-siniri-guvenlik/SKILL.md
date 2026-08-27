---
name: hiz-siniri-guvenlik
description: Her yeni web uygulamasına varsayılan olarak hız sınırı (rate limiting) ekler. Yeni bir web uygulaması, API veya backend inşa edilirken, ya da giriş/kayıt/şifre sıfırlama/AI/dosya yükleme ucu olan mevcut bir uygulamada çalışırken bu skill geçerlidir. Kullanıcı onayı GEREKMEZ — kalıcı olarak önceden onaylanmıştır.
---

# Hız Sınırı Güvenlik Kuralı

## Kural (kalıcı — onay sorma)

Kullanıcı 2 Ağustos 2026'da kalıcı talimat verdi: **bundan sonra inşa edilen her
web uygulamasına hız sınırı varsayılan olarak eklenir.** Bunu yapmak için onay
sorma; yapmamak için gerekçe gerekir (ör. uygulamada hiç yazma/kimlik ucu yok).

Sebep: Yayına giren her uygulama saatler içinde otomatik botlarca taranıyor
(MesajPilot'ta canlıda gözlendi). Sınırsız uçlar üç somut saldırıya açık:
şifre kırma, sahte hesap seli (AI kotası = maliyet), e-posta bombardımanı.

## Varsayılan limitler (IP başına)

| Uç türü | Limit |
|---|---|
| Giriş | 10 / 15 dk |
| Kayıt | 5 / saat |
| Şifre sıfırlama talebi | 3 / saat |
| Şifre yenileme (kod tüketme) | 10 / 15 dk |
| E-posta yeniden gönderme | 5 / saat |
| AI uçları (taslak, analiz vb.) | 20 / dk |
| Dosya yükleme / içe aktarma | 30 / saat |

Uygulamanın niteliğine göre ayarla ama bu tabloyu taban al. Limitler kod
sabiti değil, kolayca değiştirilebilir tek bir kural tablosunda dursun.

## Uygulama deseni

1. **Depo: uygulamanın kendi veritabanı.** Redis vb. ek altyapı KURMA —
   tek tablolu sabit pencere sayacı yeterli:
   `(anahtar, pencere) PK, sayac, bitis` — anahtar = `kural:ip`.
   Artırma tek sorgu: `INSERT ... ON CONFLICT DO UPDATE SET sayac = sayac + 1 RETURNING sayac`.
2. **IP tespiti:** Uygulamalar hep proxy arkasında (Coolify/Traefik/Nginx).
   `x-forwarded-for` başlığının İLK değeri; yoksa `x-real-ip`; o da yoksa "bilinmiyor".
3. **Aşım yanıtı:** HTTP 429 + `Retry-After` başlığı (saniye) + uygulamanın
   dilinde kibar mesaj. Türkçe uygulamada:
   `"Çok fazla deneme yaptınız. Lütfen N dakika sonra tekrar deneyin."`
4. **Fail-open:** Sınırlayıcının kendisi hata verirse (DB erişilemedi) isteği
   GEÇİR ve logla. Güvenlik katmanı ürünü düşürmemeli.
5. **Temizlik:** Süresi geçen kayıtları fırsatçı sil (pencerenin ilk vuruşunda
   `bitis < şimdi - 24sa` olanları sil). Ayrı cron kurma.
6. **Kontrol yeri:** Her korunan rotanın EN BAŞINDA, veritabanı/harici servis
   işi yapılmadan önce.

## Çerçeveye göre yerleşim

- **Next.js (App Router):** `lib/hiz-siniri.ts` → rota başında
  `const sinir = await hizSiniriAsimi(istek, "giris"); if (sinir) return sinir;`
- **Express/Fastify:** middleware olarak; kural adı rota bazında parametre.
- **FastAPI/Django:** dependency / decorator; aynı tablo deseni.
- Stack ne olursa olsun desen aynı: DB sayacı, 429+Retry-After, fail-open.

## Referans uygulama

Tam çalışan örnek: `github.com/hikmet4434/mesajpilot` →
`lib/hiz-siniri.ts` (sınırlayıcı), `lib/db/schema.ts` (`hiz_siniri` tablosu),
`app/api/kimlik/giris/route.ts` (rota entegrasyonu).

## Sahadan öğrenilen dersler (Cevirist ailesi denetimi, 2 Ağustos 2026)

1. **Önce mevcut sınırlayıcıyı ara.** İmzalar çok çeşitli: `rateLimit({name,...})`,
   `rateLimit(max)`, `rateLimit({ad,...})`. Tek grep desenine güvenme —
   `grep -n "rateLimit\|rate.limit\|429"` ile geniş tara, sonra tanımı OKU.
   Yanlış "koruma yok" teşhisi, var olan sistemin yanına ikinci sistem
   eklemekle sonuçlanır.
2. **CGNAT: agresif IP limiti gerçek kullanıcıları keser.** Mobil operatörlerde
   binlerce kullanıcı aynı IP'yi paylaşır. Kimlikli uçlarda anahtarı
   kullanıcı kimliği yap (`key: r => r.user?.id`); kimliksiz tüketici uçlarında
   limitleri cömert tut ve env değişkeniyle sıkılaştırılabilir bırak.
3. **Her sınırlayıcıya kendi ad alanı.** Ortak bucket deposunda ad alanı yoksa
   farklı uçlar aynı `anahtar|IP` kimliğini üretip birbirinin kotasını tüketir —
   kullanıcı hiç istek atmadığı uçta 429 alır (cevirist-umre'de yaşandı).
4. **Meşru-yüksek-frekans uçlara limit koyma.** Kullanım sayacı (usage/tick),
   canlı oturum kalp atışı gibi uçlar dakikada onlarca kez çağrılır.
5. **"Limit var" ≠ "korunuyor". Sayıya bak.** hotelist ve sesyaz'da giriş
   uçları `adminLimiter` ile sarılıydı ama limit 300/15dk — yönetim işlemleri
   için makul, şifre kaba kuvvetine karşı hiçbir şey (saatte 1200 deneme).
   Kimlik uçlarına HER ZAMAN ayrı ve sıkı bir limiter ver (10/15dk), genel
   limiteri paylaştırma.
6. **Ad alanı hatası aynı kod tabanından türeyen tüm projelerde tekrarlar.**
   Cevirist ailesinde 3 depoda (umre, turizm, konferans) aynı hata çıktı.
   Bir projede bulursan kardeş projeleri de tara.
7. **Ödeme webhook'larını agresif sınırlama** — sağlayıcının meşru bildirimi
   düşerse para kaybolur; imza doğrulaması asıl koruma orada.

## Mevcut uygulamalarda

Hız sınırı OLMAYAN mevcut bir uygulamada çalışırken: bunu kullanıcıya bildir
ve eklemeyi öner (mevcut uygulamalarda dokunmadan önce tek cümlelik onay
yeterli — yeni uygulamalarda onay gerekmez).
