# Arayüz Metni

Kelimeler tasarım malzemesidir, dekorasyon değil. Metne, boşluğa ve renge gösterdiğin özeni göster.

Yazmadan önce sor: **tasarımın ne anlatması gerekiyor ve kişinin bunu en kolay anlayacağı ifade ne?**

---

## Kullanıcının Tarafından Yaz

Sistemin nasıl kurulduğuna göre değil, insanın tanıdığı şeye göre isimlendir.

| Sistem dili | İnsan dili |
|-------------|-----------|
| Webhook yapılandırması | Bildirimler |
| Kimlik doğrulama sağlayıcısı | Nasıl giriş yaparsınız |
| Kayıt oluştur | Yeni müşteri ekle |
| Senkronizasyon işi başarısız | Verileriniz güncellenemedi |
| Örnek sonlandırıldı | Sunucu durduruldu |
| Yetkilendirme hatası | Bu sayfaya erişiminiz yok |

---

## Etken Çatı, Net Eylem

Bir kontrol, kullanıldığında **tam olarak ne olacağını** söyler.

| Zayıf | Güçlü |
|-------|-------|
| Gönder | Değişiklikleri kaydet |
| Tamam | Faturayı onayla |
| Devam | Ödemeye geç |
| Tıklayın | Raporu indir |
| İşlem yap | Hesabı sil |

**Tutarlı sözlük:** Aynı eylem akış boyunca aynı adı taşır. "Yayınla" yazan düğme, "Yayınlandı" diyen bir bildirim üretir — "Gönderildi" değil.

---

## Hata Mesajları

Hata **yönlendirmedir**, ruh hâli değil. Ne olduğunu ve nasıl düzeltileceğini söyler. Özür dilemez, belirsiz kalmaz, kullanıcıyı suçlamaz.

**Yapı:** `[ne oldu] + [nasıl düzeltilir]`

| Kötü | İyi |
|------|-----|
| Bir hata oluştu | Dosya yüklenemedi — 10 MB sınırını aşıyor. Daha küçük bir dosya seçin. |
| Geçersiz giriş | E-posta adresi `@` içermeli |
| İşlem başarısız | Ödeme reddedildi. Kartınızın limitini kontrol edin veya başka bir kart deneyin. |
| Üzgünüz, bir şeyler ters gitti 😔 | Bağlantı koptu. Sayfayı yenileyin — yazdıklarınız kaydedildi. |
| 403 Forbidden | Bu projeye erişiminiz yok. Proje sahibinden davet isteyin. |

**Emoji ve özür kullanma.** "Üzgünüz" kullanıcının sorununu çözmez; ne yapacağını söylemek çözer.

---

## Boş Durumlar

Boş ekran bir **davettir**, bir yokluk bildirimi değil.

**Yapı:** `[burada ne olacak] + [ilk adım]`

| Kötü | İyi |
|------|-----|
| Veri yok | Henüz müşteri eklemediniz. İlk müşterinizi ekleyin, buradan takip edin. [Müşteri ekle] |
| Sonuç bulunamadı | "kırmızı elbise" için sonuç yok. Filtreleri kaldırmayı veya farklı bir terim denemeyi deneyin. |
| Liste boş | Kaydettiğiniz raporlar burada birikir. Bir rapor açıp "Kaydet" deyin. |

**Arama sonuçsuzsa:** aranan terimi göster (kullanıcı yazım hatasını fark etsin) ve somut bir alternatif öner.

---

## Her Öğe Tek İş Yapsın

Etiket etiketler, örnek gösterir, yardım metni açıklar. Hiçbiri sessizce iki iş yapmaz.

```
Kötü:
  [ E-posta adresinizi girin        ]     ← placeholder etiket görevi görüyor

İyi:
  E-posta                                 ← etiket
  [ ornek@sirket.com               ]     ← örnek gösteren placeholder
  Faturalar bu adrese gönderilir.         ← yardım metni
```

**Placeholder etiket değildir.** Kullanıcı yazmaya başlayınca kaybolur ve ne doldurduğunu unutur.

---

## Ton

- **Sade fiiller.** "Gerçekleştirmek" değil "yapmak", "sağlamak" değil "vermek"
- **Cümle düzeni büyük harf.** "Değişiklikleri Kaydet" değil "Değişiklikleri kaydet"
- **Gereksiz kelime yok.** "Lütfen", "sadece", "kolayca", "basitçe" — çoğu silinebilir
- **"Basitçe" hiç kullanma.** Kullanıcı zorlanıyorsa bu kelime onu aşağılar
- **Spesifik, zekiden iyidir.** Şaka ikinci okumada bayatlar; netlik bayatlamaz

---

## Onay ve Yıkıcı Eylemler

Geri alınamayan bir eylemde onay diyaloğu **ne kaybedileceğini** söyler.

| Kötü | İyi |
|------|-----|
| Emin misiniz? [İptal] [Tamam] | "Q3 Raporu"nu silmek üzeresiniz. Bu işlem geri alınamaz. [Vazgeç] [Raporu sil] |

**Kurallar:** Düğme eylemi adlandırsın ("Raporu sil"), "Tamam" demesin · yıkıcı düğme görsel olarak ayrışsın · kaçış düğmesi ("Vazgeç") solda ve sönük olsun · geri alınabilen bir işlemse onay sorma, **geri al** seçeneği sun.

---

## Mikro Metin Kontrol Listesi

- [ ] Her düğme ne yapacağını söylüyor
- [ ] Aynı eylem her yerde aynı adı taşıyor
- [ ] Hata mesajları çözüm içeriyor
- [ ] Boş durumlar ilk adımı gösteriyor
- [ ] Placeholder etiket yerine geçmiyor
- [ ] "Basitçe", "kolayca", "sadece" yok
- [ ] Yıkıcı eylem ne kaybedileceğini söylüyor
- [ ] Sistem terimi değil, kullanıcı terimi kullanılıyor
- [ ] Cümle düzeni büyük harf tutarlı
