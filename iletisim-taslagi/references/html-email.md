# HTML E-posta Hazırlığı

## Önce Karar: HTML mi, Düz Metin mi?

| Durum | Format | Neden |
|-------|--------|-------|
| İlk soğuk temas | **Düz metin** | HTML "toplu gönderim" sinyali verir, spam skorunu ve yanıt oranını bozar |
| Takip dizisi (gün 3/7/14) | **Düz metin** | Aynı konuşmanın devamı; biçim değiştirmek yapaylık yaratır |
| Görüşme sonrası özet | HTML uygun | Yapı ve başlıklar okumayı kolaylaştırır |
| Teklif / fiyat sunumu | HTML uygun | Tablo gerekiyor |
| Etkinlik daveti | HTML uygun | Tarih, konum, buton bloğu |
| Bülten / ürün duyurusu | HTML | Zaten izinli liste |
| Şampiyona iç sunum materyali | HTML | İçeride iletilecek, biçim güven verir |

**Kural:** Şüphedeysen düz metin. B2B'de sade e-posta, tasarımlı e-postadan daha fazla yanıt alır.

---

## Teknik Zorunluluklar

E-posta istemcileri 2000'lerin HTML'inde takılı. Modern web teknikleri çalışmaz.

| Kural | Neden |
|-------|-------|
| **Tablo tabanlı yerleşim** | Flexbox ve Grid, Outlook'ta hiç çalışmaz |
| **Satır içi CSS** | Gmail `<style>` bloğunu kısmen, bazı istemciler hiç okumaz |
| **Maksimum 600 px** | Outlook önizleme paneli ve mobil için standart |
| **Web fontu yok** | Google Fonts çoğu istemcide düşer; sistem font yığını kullan |
| **Tek sütun** | Açılmaların %60'ından fazlası mobil |
| **Görsele bağımlı olma** | Çoğu istemci görselleri varsayılan engeller; `alt` metni zorunlu |
| **Düz metin alternatifi** | Multipart gönderim; olmayan mesaj spam puanı alır |
| **Abonelikten çıkma bağlantısı** | KVKK / GDPR / CAN-SPAM — ticari toplu gönderimde zorunlu |
| **Karanlık tema** | Şeffaf PNG ve açık zeminli logo karanlıkta kaybolur |

---

## Hazır Şablon

600 px, tek sütun, tablo tabanlı, satır içi CSS, karanlık tema uyumlu.

```html
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>[Konu]</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;">

<!-- Preheader: gelen kutusu önizlemesinde konudan sonra görünen satır -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
  [Önizleme satırı — 40-90 karakter, konuyu tekrar etme, merakı sürdür]
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background:#f4f4f5;">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="width:600px;max-width:100%;background:#ffffff;border-radius:8px;">

        <!-- Başlık -->
        <tr>
          <td style="padding:28px 32px 8px 32px;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
                     font-size:20px;line-height:1.3;font-weight:600;color:#18181b;">
            [Başlık]
          </td>
        </tr>

        <!-- Gövde -->
        <tr>
          <td style="padding:8px 32px 20px 32px;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
                     font-size:15px;line-height:1.6;color:#3f3f46;">
            <p style="margin:0 0 14px 0;">Merhaba [İsim],</p>
            <p style="margin:0 0 14px 0;">[Paragraf]</p>
            <p style="margin:0;">[Paragraf]</p>
          </td>
        </tr>

        <!-- Veri tablosu (gerekiyorsa) -->
        <tr>
          <td style="padding:0 32px 20px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
                          font-size:14px;color:#3f3f46;border-collapse:collapse;">
              <tr>
                <td style="padding:9px 0;border-bottom:1px solid #e4e4e7;">[Satır]</td>
                <td style="padding:9px 0;border-bottom:1px solid #e4e4e7;text-align:right;
                           font-weight:600;color:#18181b;">[Değer]</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Buton: tablo tabanlı, <button> veya CSS buton kullanma -->
        <tr>
          <td style="padding:0 32px 28px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="#18181b" style="border-radius:6px;">
                  <a href="[URL]"
                     style="display:inline-block;padding:12px 24px;
                            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
                            font-size:15px;font-weight:600;color:#ffffff;
                            text-decoration:none;border-radius:6px;">
                    [Buton metni]
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- İmza -->
        <tr>
          <td style="padding:0 32px 28px 32px;border-top:1px solid #e4e4e7;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
                     font-size:14px;line-height:1.6;color:#71717a;">
            <p style="margin:20px 0 0 0;">
              [Ad Soyad]<br>
              [Unvan] · [Şirket]<br>
              <a href="mailto:[e-posta]" style="color:#71717a;">[e-posta]</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- Altbilgi -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="width:600px;max-width:100%;">
        <tr>
          <td style="padding:16px 32px;text-align:center;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;
                     font-size:12px;line-height:1.5;color:#a1a1aa;">
            [Şirket] · [Açık adres — yasal zorunluluk]<br>
            <a href="[abonelik-iptal-url]" style="color:#a1a1aa;">Bu e-postaları almak istemiyorum</a>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>
```

### Karanlık Tema Eki

`<head>` içine ekle. Destekleyen istemcilerde çalışır, desteklemeyende zararsızdır.

```html
<style>
  @media (prefers-color-scheme: dark) {
    .body-bg   { background:#18181b !important; }
    .card-bg   { background:#27272a !important; }
    .t-title   { color:#fafafa !important; }
    .t-body    { color:#d4d4d8 !important; }
    .t-muted   { color:#a1a1aa !important; }
    .divider   { border-color:#3f3f46 !important; }
  }
</style>
```
Sonra ilgili hücrelere sınıfı ekle: `<td class="card-bg" style="background:#ffffff;...">`.
**Satır içi stili silme** — sınıflar sadece destekleyen istemcide devreye girer, diğerlerinde satır içi stil geçerli kalır.

---

## Preheader (önizleme satırı)

Gelen kutusunda konudan sonra görünen ~90 karakter. Boş bırakılırsa istemci gövdenin ilk satırını çeker — genelde "Görüntülenmiyorsa buraya tıklayın" gibi bir şey görünür ve açılma oranı düşer.

**İyi:** "Geçen hafta konuştuğumuz üç maddenin özeti ve önerdiğim sonraki adım."
**Kötü:** Konu satırının tekrarı.

---

## Test Kontrol Listesi

Göndermeden önce:

- [ ] Gmail web + Gmail mobil (Android **ve** iOS)
- [ ] Outlook masaüstü (Windows) — en katı istemci, burada bozulan her yerde bozulur
- [ ] Apple Mail (macOS + iOS)
- [ ] Görseller **engelliyken** okunabiliyor mu
- [ ] Karanlık temada logo ve metin görünüyor mu
- [ ] 320 px genişlikte yatay kaydırma yok
- [ ] Tüm bağlantılar çalışıyor, UTM parametreleri doğru
- [ ] Düz metin alternatifi anlamlı (otomatik dönüşüm değil, elle yazılmış)
- [ ] Abonelikten çıkma bağlantısı çalışıyor
- [ ] Kendine test gönderimi yapıldı ve **spam klasörü kontrol edildi**

---

## Teslim Edilebilirlik

Şablon ne kadar iyi olursa olsun, altyapı bozuksa e-posta gelen kutusuna düşmez.

**Alan adı ve kimlik doğrulama**
- SPF, DKIM, DMARC kayıtları kurulu ve doğrulanmış
- Soğuk gönderim için **ayrı alan adı** — ana alan adının itibarını riske atma
- Yeni alan adı 3–4 hafta ısıtılır: günde 10 ile başla, kademeli 30–50'ye çık

**Gönderim hijyeni**
- Alan adı başına günlük 30–50 (soğuk), ısınmış listede daha yüksek
- Sert geri dönüş (hard bounce) oranı %2'nin altında — üstündeyse liste kalitesi bozuk
- Şikâyet oranı %0,1'in altında
- Geri dönen adresleri **anında** listeden çıkar

**İçerik**
- Soğuk e-postada link sayısı 0–1
- Ek dosya yok
- Takip pikseli soğuk e-postada kullanma (bazı filtreler işaretler)
- Spam tetikleyici kelimelerden kaçın: "ücretsiz", "garanti", "acele", "%100", "sınırlı süre", büyük harfli başlık, arka arkaya ünlem

**Ölçüm**
Açılma oranı artık güvenilir bir metrik değil (gizlilik korumaları önceden yükleme yapıyor). **Yanıt oranını** ve **toplantı sayısını** izle.
