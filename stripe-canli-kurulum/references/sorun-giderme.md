# Sorun Giderme — Saha Notları

Bu notlar gerçek bir canlı kurulumdan (Ağustos 2026, TEXMART/Randevuist) çıkarıldı.

## Stripe Dashboard çok yavaş yüklenir

- Sayfalar 10–25 saniye boş/iskelet kalabilir. Kalıp: `navigate → wait 8-10s → screenshot → boşsa tekrar wait+screenshot`. `find` "sayfa hata gösteriyor" derse çoğu zaman hâlâ yükleniyordur — 8-10 sn bekleyip tekrar dene.
- `wait` aksiyonu tek seferde en fazla 10 sn kabul eder; uzun bekleyişleri zincirle.
- Oturum düşerse login sayfası gelir: alanlar autofill'le dolu olsa bile **Sign in'e sen basma** — kimlik doğrulamayı kullanıcı tamamlar, sen "girdim" haberini beklersin.

## Stripe MCP connector

- `stripe_api_write` (ve muhtemelen benzer yazma uçları): istemci iç içe `parameters` nesnesini JSON-string'e çevirip gönderiyor, sunucu `object` bekliyor → her çağrı `Invalid tool arguments: ... of type string did not match ... object`. **Düzeltilemez; tarayıcı otomasyonuna geç.**
- `list_available_accounts_or_orgs` gibi düz-parametreli okuma uçları çalışır — hesap ID'sini (`acct_...`) buradan alıp dashboard URL'lerinde kullan.

## Para birimi seçici inatçıdır

Currency dropdown'ında `TRY` yazıp Enter'a güvenme: bazen seçim tutmaz ve EUR kalır. Her üründe seçimden sonra fiyat alanını zoom'la **`TRY 249.99`** biçiminde gördüğünü teyit et. Tutmadıysa seçiciyi yeniden aç → yaz → listedeki satıra tıkla.

## Coolify v4.3.x hedefse (env + redeploy)

- **Butonlar normal 'click' ile ÇALIŞMAZ** (Livewire v3 pointer-event bekler; tık sessizce yutulur, hiçbir şey olmaz). JS ile sırayla dispatch et:
  ```js
  ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(t=>{
    const E=t.startsWith('pointer')?PointerEvent:MouseEvent;
    el.dispatchEvent(new E(t,{bubbles:true,cancelable:true,view:window}));
  });
  ```
- Env düzenleme modalında **Value alanı maskeliyken odak almaz** — önce "Toggle password visibility" (göz) butonuna bas, ya da input'a native setter + input/change/blur event'leriyle yaz.
- Koordinat tıklamaları ~40px kayabilir; **yalnız ref-tabanlı** tıklama kullan (`find` → `left_click {ref}`).
- Deploy'un gerçekten başladığını **Deployment history'de yeni "In progress" satırını görerek** kanıtla. "Changes pending" rozeti duruyorsa deploy OLMAMIŞTIR.
- "Restart without rebuilding" onay dialogu, env kaydından ÖNCE açılmışsa eski env ile koşar — env kaydettikten sonra DAİMA yeni Redeploy tetikle.

## Şablon-yapıştırma hatası

Kullanıcıya env örneği verirken `price_...`, `sk_live_...`, `whsec_...` gibi şablonlar yazarsan kullanıcı bunları OLDUĞU GİBİ yapıştırabilir. Doğrulamada uzunluğa bak: `price_...`=9 kr, `sk_live_...`=11 kr, `whsec_...`=9 kr gibi kısa değerler şablonun kendisidir. Price ID'leri sen düzelt (gizli değil), secret'lar için kullanıcıyı doğru ekrana yönlendir.

## Webhook imzası sessiz ölür

`STRIPE_WEBHOOK_SECRET` yanlışsa (örn. içine sk_live yapıştırılmışsa) hiçbir yerde gürültülü hata görmezsin: Stripe tarafında delivery'ler 4xx birikir, uygulamada plan aktive olmaz. Şüphede webhook detay sayfasındaki **Event deliveries** sekmesine bak — Failed sayacı büyüyorsa imza uyuşmuyordur.
