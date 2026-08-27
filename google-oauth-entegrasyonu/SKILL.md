---
name: google-oauth-entegrasyonu
description: "Bir web uygulamasına 'Google ile Giriş'i uçtan uca (Google Cloud OAuth istemcisi oluşturma + Production'a yayınlama + backend/frontend kod entegrasyonu + e-posta bazlı admin + deploy + doğrulama) ekler. Tetikleyiciler: 'google girişi ekle', 'google ile giriş', 'google oauth', 'sign in with google', 'google login', 'google auth', 'gmail ile giriş'. Google Cloud tarafı için Claude-in-Chrome (gerçek Chrome, kullanıcının Google oturumu) ile tarayıcı otomasyonu kullanır."
trigger: /google-oauth
---

# Google OAuth Entegrasyonu (Uçtan Uca)

Bir web uygulamasına **Google ile Giriş** özelliğini baştan sona kurar: Google Cloud projesi/istemcisi, Production'a yayın, backend doğrulama, frontend buton, e-posta bazlı yönetici erişimi, deploy ve doğrulama. Bu playbook gerçek bir kurulumdan (TradeOne, tradeone.tr) türetilmiştir.

## Ne zaman kullanılır
Kullanıcı "Google ile giriş ekleyelim", "google oauth", "gmail ile giriş", "admin google ile girsin" dediğinde. İki bağımsız parça vardır: (A) **Google Cloud tarafı** (tarayıcı), (B) **Uygulama kodu**. İkisini de yap.

## Tasarım kararları (neden böyle)
- **GIS ID-token akışı** kullan (`google.accounts.id`), redirect/OAuth-code akışı DEĞİL. Sebep: **client secret gerekmez**, redirect URI gerekmez, sadece **Authorized JavaScript origins** yeterli. Backend ID token'ı doğrular.
- **Client ID GİZLİ DEĞİLDİR.** Backend env'e (GOOGLE_CLIENT_ID) yaz; frontend'e runtime bir uçtan ver — böylece `NEXT_PUBLIC_*` build-time bake gerekmez.
- **Kütüphane ekleme:** ID token'ı `https://oauth2.googleapis.com/tokeninfo?id_token=...` ile doğrula (google-auth-library'e gerek yok). `aud === GOOGLE_CLIENT_ID` ve `email_verified` kontrol et.
- **Admin:** `ADMIN_EMAILS` (virgüllü) listesindeki e-postalar ADMIN rolü alsın; token'a `isAdmin` claim'i koy.

---

## A) GOOGLE CLOUD TARAFI (Claude-in-Chrome ile)

Gerçek Chrome + kullanıcının Google oturumu gerekir (`mcp__claude-in-chrome__*`). Sır/onay tıklarını kullanıcıya bırak; yasal politika onayını (User Data Policy) onlara tıklat.

1. **Proje oluştur:** `https://console.cloud.google.com/projectcreate` → Project name gir (örn. uygulamanın adı) → **Create**. Bildirimden bitince proje seçiciyle yeni projeye geç. Project ID'yi not al (`<ad>-<sayı>`).
2. **Auth Platform kurulumu:** `https://console.cloud.google.com/auth/clients?project=<PROJECT_ID>` → "Get started". Sihirbaz:
   - **App Information:** App name + User support email (dropdown'dan kullanıcının hesabı).
   - **Audience:** Organizasyon yoksa zorunlu **External**.
   - **Contact Information:** geliştirici e-postası.
   - Sihirbaz bittiğinde genelde doğrudan **Create OAuth client ID** ekranına atlar.
3. **OAuth Client (Web):** Application type = **Web application**, Name (örn. "<App> Web"). **Authorized JavaScript origins**'e prod origin(ler)i ekle: `https://<domain>` ve `https://www.<domain>`. **Redirect URI GEREKMEZ** (GIS ID-token). → **Create**.
   - Açılan dialogdan **Client ID**'yi al (sır olan client secret'a gerek yok). Not: yeni proje "Testing" modunda → sadece test kullanıcıları girebilir.
4. **Hemen test için** (admin'in anında girebilmesi): Audience → **Test users** → Add users → admin e-postasını ekle → Save.
5. **HERKESE AÇMAK (Production):**
   - Önce **Branding** sayfasına git: App name, support email dolu olmalı; ayrıca **Application home page**, **Application privacy policy link** ve **Application terms of service link** doldur (bunlar OLMADAN "Publish app" butonu pasif kalır). Save.
   - **Audience** → **Publish app** → "Push to production?" → **Confirm**. Non-sensitive kapsamlarda (openid/email/profile) Google doğrulaması GEREKMEZ, anında yayınlanır. Durum "In production" olur.
   - **Logo yükleme:** yükleme Google doğrulama incelemesi tetikler → girişi hemen açmak istiyorsan logoyu ATLA.

> Gizlilik/şartlar sayfaları yoksa: uygulamada gerçek `Gizlilik Politikası` ve `Kullanım Şartları` sayfaları oluştur (KVKK/GDPR maddeleri, veri işleme/aktarım, çerez, haklar), deploy et, canlı olduklarını doğrula, sonra Branding'e URL'lerini gir.

---

## B) UYGULAMA KODU

### Backend (örnek: NestJS; kavramlar taşınabilir)
- **Kullanıcı upsert:** Google kullanıcısı şifresizdir → rastgele bcrypt hash ile kaydet (parolayla giriş engellenir).
- **`ADMIN_EMAILS` yardımcıları:** `adminEmails()` (virgülle böl, trim, lowercase), `isAdminEmail(email)`.
- **Claim:** app JWT'sine `isAdmin` ekle; publicUser rolleri `isAdmin ? ["USER","ADMIN"] : ["USER"]`.
- **`loginWithGoogle(credential)`:**
  ```ts
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw new UnauthorizedException("Google girişi kapalı");
  const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  if (!r.ok) throw new UnauthorizedException("Google doğrulanamadı");
  const p = await r.json();
  if (p.aud !== clientId) throw new UnauthorizedException("aud eşleşmiyor");
  if (p.email_verified !== "true" && p.email_verified !== true) throw new UnauthorizedException("email doğrulanmamış");
  const user = await users.upsertGoogleUser({ email: p.email.toLowerCase(), firstName: p.given_name ?? p.name, lastName: p.family_name ?? "" });
  return issueTokensForApp(user); // claims.isAdmin = isAdminEmail(user.email)
  ```
- **Uçlar:**
  - `POST /auth/google` `{credential}` → loginWithGoogle → refresh cookie set.
  - `GET /auth/google/config` → `{ clientId: process.env.GOOGLE_CLIENT_ID ?? null }` (PUBLIC; frontend butonu bununla kurar).
- **Admin kapısı:** `verifyAdmin(authHeader)` (geçerli token yoksa 401, ADMIN rolü yoksa 403). Admin controller'ların `assertAdmin`'i x-admin-token'a EK OLARAK admin Bearer JWT'yi de kabul etsin (böylece giriş yapmış admin token yazmadan paneli kullanır).

### Frontend (örnek: Next.js login sayfası)
- Runtime'da config çek, GIS script'ini yükle, butonu render et:
  ```ts
  const { clientId } = await api("/auth/google/config");
  if (!clientId) return;
  // <script src="https://accounts.google.com/gsi/client"> ekle (id="gsi-script", async/defer)
  window.google.accounts.id.initialize({ client_id: clientId, callback: async (res) => {
    const result = await api("/auth/google", { method:"POST", body: JSON.stringify({ credential: res.credential }) });
    localStorage.setItem("access_token", result.access_token);
    if (result.user?.roles?.includes("ADMIN")) localStorage.setItem("admin_unlocked","1");
    location.href = "/";
  }});
  window.google.accounts.id.renderButton(divRef, { theme:"outline", size:"large", text:"continue_with", locale:"tr" });
  ```
- CSP varsa `accounts.google.com` / `apis.google.com` script-src'ye eklenmeli (yoksa dokunma).

### Env & Deploy
- `GOOGLE_CLIENT_ID = <client id>` ve `ADMIN_EMAILS = <admin@e-posta>` ekle (docker-compose passthrough gerekiyorsa ekle). Client ID sır değildir → doğrudan girilebilir.
- Deploy et (env değişikliği çalışan container'a ancak **redeploy** ile yansır).

---

## DOĞRULAMA
1. `GET /auth/google/config` artık Client ID döndürmeli (boş değil).
2. Login sayfasında Google butonu görünmeli. **DİKKAT:** GIS butonu bir **iframe** içinde render olur → `find`/accessibility-tree onu GÖREMEZ (yanlış negatif). JS ile doğrula:
   ```js
   !!(window.google && window.google.accounts && window.google.accounts.id)  // true
   document.querySelectorAll('iframe[src*="accounts.google.com"]').length      // >=1
   ```
3. Admin e-postasıyla giriş → kullanıcı `roles` içinde ADMIN olmalı; admin paneli/uçları Bearer ile açılmalı.

## SIK HATALAR
- **Publish butonu pasif:** Branding'de gizlilik + şartlar URL'leri eksik. Doldur, Save, tekrar dene.
- **"Only test users can access":** app hâlâ Testing modunda → Production'a yayınla ya da test user ekle.
- **Buton çıkmıyor:** /auth/google/config boş (GOOGLE_CLIENT_ID set değil ya da redeploy edilmedi) veya GIS script CSP'ye takılıyor.
- **401 aud eşleşmiyor:** frontend'in kullandığı client_id ile backend'in GOOGLE_CLIENT_ID'si farklı.
- **Origin hatası (redirect_uri/origin mismatch):** prod origin Authorized JavaScript origins'e eklenmemiş (http/https ve www farkına dikkat).
