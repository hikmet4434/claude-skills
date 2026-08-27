# Yayın Yolları

Bu makinede gerçekten neyin yayınlanabildiği. Çalışmaya başlamadan önce **kontrol et**, varsayma.

---

## 1. TikTok — higgsfield MCP (doğrudan)

Tek gerçek doğrudan yayın yolu.

```
1. mcp__higgsfield__tiktok_accounts       → bağlı hesapları listele
   • accounts boşsa      → tiktok_connect ile bağla
   • status "error" ise  → tiktok_reconnect
   • status "active" ise → devam

2. mcp__higgsfield__tiktok_prepare_publish → yükleme hazırlığı
3. mcp__higgsfield__tiktok_publish         → yayınla
4. mcp__higgsfield__tiktok_publish_status  → sonucu doğrula
```

**Not:** Video higgsfield tarafında erişilebilir olmalı. Yerel dosya için önce `media_upload` veya `media_import_url` gerekir.

**Yayın sonrası doğrula.** `tiktok_publish` çağrısının dönmesi yayının tamamlandığı anlamına gelmez; `tiktok_publish_status` ile teyit et, sonra takip tablosuna "yayınlandı" yaz.

---

## 2. Zapier / Make (dolaylı)

Instagram, LinkedIn, X, Facebook, Pinterest için gerçekçi yol.

**Zapier ile:**
```
1. discover_zapier_actions({ app: "Instagram" })   → mevcut aksiyonları ara
2. enable_zapier_action({ selected_api, action })  → aksiyonu aç
3. inspect_zapier_actions({ tool_name })           → parametre şemasını al
4. execute_zapier_write_action({ ... })            → yayınla
```

**Make ile:** Hazır bir senaryo varsa `scenarios_run` ile tetikle; yoksa `scenarios_create` ile kur.

**Gerçekçi beklenti:** Bu yol kurulum gerektirir. İlk seferde bağlantı yoksa kullanıcıya "Zapier'da Instagram bağlantısı kurman gerekiyor" de ve altyazıları elle yapıştırması için hazırla. Kurulumu onun yerine yapmaya çalışıp yarım bırakma.

---

## 3. Elle (her zaman çalışır)

Bağlantı yoksa varsayılan yol budur ve **utanılacak bir şey değildir**. Çoğu küçük ekip böyle çalışıyor.

Kullanıcıya ver:
- Platform başına altyazı, **kopyalanmaya hazır** (kod bloğu içinde)
- Hashtag'ler altyazıya dahil
- Önerilen yayın saati
- Video dosyasının yolu
- Sırayla yapılacaklar listesi

```
YAPILACAKLAR — 26 Ağustos

□ 12:00  TikTok      video.mp4 + altyazı #1
□ 15:00  YouTube     video.mp4 + başlık/açıklama #3
□ 19:00  Instagram   video.mp4 + altyazı #2
□ ertesi 09:00 LinkedIn  video-1x1.mp4 + altyazı #4
```

---

## 4. Zamanlanmış Yayın

**Cowork oturumundan zamanlama:** `create_trigger` ile belirli saatte çalışan bir görev kurulabilir. Her tetikleme yeni oturum başlatır — görev metni kendi kendine yeten bir talimat olmalı (dosya yolu, platform, altyazı dahil).

**Uyarı:** Zamanlanmış görev, bağlantısı olmayan bir platforma yayın yapamaz. Zamanlama sadece yayın yolu zaten çalışıyorsa anlamlıdır; aksi hâlde hatırlatıcı olarak kurulur ("saat 19:00'da TikTok'a yükle").

---

## 5. Yayın Öncesi Kontrol Listesi

Hangi yol kullanılırsa kullanılsın:

- [ ] Video **watermarksız** (başka platformun logosu yok)
- [ ] Doğru en-boy oranı ve çözünürlük
- [ ] Video içi altyazı var (sessiz izlenme)
- [ ] Güvenli alan dışına metin taşmamış
- [ ] Ses telifi temiz (ticari hesapta telifli müzik yok)
- [ ] Altyazı platform sınırını aşmıyor
- [ ] Hashtag sayısı platform kuralına uygun ve dili doğru
- [ ] Bağlantı doğru yerde (LinkedIn/X'te yoruma)
- [ ] **Kullanıcı altyazıları gördü ve onayladı**

Son madde pazarlıksız. Onaysız yayın yapma.

---

## 6. Hata Durumları

| Durum | Ne yap |
|-------|--------|
| Hesap bağlı değil | Bağlantı kurmayı öner, bu arada elle yapılacaklar listesi ver |
| Yayın API'si hata döndü | Hatayı olduğu gibi aktar, tekrar deneme sayısını 2 ile sınırla, sonra elle yola geç |
| Video formatı reddedildi | Hangi kural ihlal edilmiş söyle, dönüştürme öner |
| Kısmi başarı (3/5 platform) | Takip tablosuna gerçek durumu yaz, kalanları elle listesine ekle |
| Yayın durumu belirsiz | "Yayınlandı" **yazma** — durumu "belirsiz" bırak ve kullanıcıdan teyit iste |

**Asla:** Yayınlanmamış bir gönderiyi yayınlandı diye raporlama. Takip tablosunun tek değeri doğruluğudur.
