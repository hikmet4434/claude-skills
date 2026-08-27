---
name: appstore-gonderim-kontrol
description: iOS / App Store Connect gönderim öncesi zorunlu kontrol listesi (Cevirist uygulamasının gerçek red sebeplerinden derlenmiştir). Bu skill'i MUTLAKA şu durumlarda kullan: kullanıcı bir iOS uygulaması geliştiriyorsa, App Store Connect'e yeni uygulama veya yeni sürüm gönderecekse, TestFlight/App Review sürecine hazırlanıyorsa, in-app purchase (IAP) ekliyorsa, App Store'dan red (rejection) aldıysa, ya da "app gönder", "yayınla", "submit", "review'a yolla", "App Store'a yükle" gibi ifadeler kullanıyorsa. iOS uygulama geliştirme sürecinin SONUNA gelmeden de ilgili maddeleri (hesap silme, IAP doğrulama, izin ekranları) tasarım aşamasında uygula — çoğu red, kod yazılırken önlenebilir. Yeni bir red veya sorun yaşandığında bu listeye yeni madde eklenmesi gerektiğini kullanıcıya hatırlat.
---

# App Store Connect Gönderim Öncesi Kontrol Listesi

Bu skill, Cevirist uygulamasının App Store sürecinde yaşanan **gerçek red sebeplerinden ve hatalardan** derlenmiştir. Amaç: aynı hatayı bir daha yapmamak.

## Nasıl kullanılır

1. **Geliştirme sırasında**: Aşağıdaki maddelerden koda gömülü olanları (hesap silme, IAP makbuz doğrulama, üçüncü taraf AI izin ekranı) uygulamayı yazarken baştan ekle. Gönderim gününe bırakma — çoğu red, mimari bir eksikten kaynaklanır ve son dakikada düzeltmesi pahalıdır.
2. **Gönderimden önce**: Her maddeyi TEK TEK kontrol et ve kullanıcıya kısa bir tablo/rapor halinde "✅ tamam / ❌ eksik / ⚠️ kontrol edilemedi" olarak sun. Eksik varsa gönderimi önerme; önce eksiği kapat.
3. **Red gelirse**: Red sebebini bu listeyle eşleştir. Listede yoksa, YENİ BİR MADDE olarak ekle (aşağıdaki "Listeyi güncelleme" bölümüne bak) ve kullanıcıya güncellenmiş skill dosyasını teslim et.

Kullanıcı kodlama bilmiyor: her maddeyi kontrol ederken teknik işi sen yap, kullanıcıya sadece sonucu ve (App Store Connect arayüzünde el ile yapması gerekiyorsa) ekran ekran basit Türkçe talimat ver.

## Kontrol Listesi

### A. Metadata ve mağaza sayfası

**1. Ekran görüntüleri (Guideline 2.3.7)**
Ekran görüntüleri gerçek uygulama deneyimini yansıtmalı. Kontrol: her zorunlu cihaz boyutu için (iPhone 6.5"/6.7", iPad destekleniyorsa iPad) gerçek ve güncel ekran görüntüleri var mı; çözünürlükler tam mı; en az 3 adet mi; mockup/reklam görseli değil, uygulamanın gerçek ekranları mı?

**7. Privacy Policy ve Support URL canlı olmalı**
İki URL de bağımsız, gerçek içerikli, erişilebilir sayfalar olmalı (404 veya ana sayfaya yönlendirme kabul edilmez). Kontrol: gönderimden hemen önce her iki URL'yi gerçekten aç ve içeriğin yüklendiğini doğrula.

**8. Age Rating anketi**
7 adımlık anket eksiksiz doldurulmalı; sonuç uygulamaya uygun olmalı (çoğu uygulama için 4+).

**9. Content Rights, kategori ve App Privacy etiketleri**
Content Rights beyanı, doğru kategori seçimi ve App Privacy (gizlilik etiketleri) bölümü eksiksiz girilmiş olmalı. Toplanan her veri türü ve kullanım amacı doğru işaretlenmeli.

### B. Hesap ve gizlilik

**2. Hesap silme özelliği (Guideline 5.1.1(v))**
Uygulamada hesap oluşturma varsa, uygulama İÇİNDEN hesap silme de zorunlu. "Bize e-posta gönderin" yeterli DEĞİL — uygulama içinde çalışan bir "Hesabımı sil" akışı/butonu olmalı. Kontrol: akış gerçekten hesabı ve verileri siliyor mu, test edildi mi?

**6. Üçüncü taraf AI'ya veri paylaşımı (Guideline 5.1.1(i) & 5.1.2(i))**
Kullanıcı verisi bir üçüncü taraf AI servisine (OpenAI, Google, Anthropic vb.) gönderiliyorsa dört şart birden sağlanmalı: (a) hangi verinin gönderildiği uygulama içinde açıklanıyor, (b) kime gönderildiği belirtiliyor, (c) paylaşmadan ÖNCE kullanıcıdan uygulama içi izin alınıyor (sadece ToS/Privacy Policy'ye yazmak yetmez), (d) gizlilik politikası bu paylaşımı (veri türü, toplama şekli, tüm kullanımlar, üçüncü tarafın eşdeğer koruma sağladığı) tanımlıyor. Kontrol: onboarding veya ilk kullanım anında bir izin ekranı var mı?

### C. In-App Purchase (IAP)

**3. IAP'ler binary ile aynı gönderimde olmalı ("IAP not in binary")**
İlk IAP ürünleri mutlaka yeni uygulama sürümüyle BİRLİKTE, tek submission'da gönderilmeli. Kontrol: sürüm sayfasının "In-App Purchases" bölümünden ürünler seçilmiş mi?

**4. Satın alma sonrası kredi/bakiye kalıcı olarak artmalı (Guideline 2.1)**
Consumable satın almalarda backend makbuz doğrulaması hem `receipt.in_app` hem `latest_receipt_info` alanlarını kontrol edip transaction identifier ile eşleştirmeli (Cevirist'te kök neden: sadece `in_app`'e bakılıyordu). Kontrol: sandbox'ta satın alma yap → bakiye artıyor mu → uygulamayı kapat/aç → bakiye KALICI mı?

**5. IAP ürünleri her cihazda yüklenmeli (Guideline 2.1(b))**
StoreKit ürün sorgusu cihazın mağazasına doğru scope'lanmış olmalı; özellikle iPad'de test edilmeli. Kontrol: sandbox'ta gerçek bir test hesabıyla ürünler fiyatlarıyla listeleniyor mu; -1001 timeout / "Bag Load Failed" gibi ağ-sandbox hataları yok mu?

**10. Paid Apps sözleşmesi + banka/vergi bilgileri**
Sözleşme imzalı, banka ve vergi bilgileri tamamlanmış olmalı; yoksa IAP'ler "Missing Metadata" durumunda takılı kalır.

### D. Build ve gönderim mekaniği

**11. Doğru build gönderildiğinden emin ol**
Sürüme bağlı build numarası ile göndermek istediğin build aynı mı? ("Newer Build Available" uyarısı çıkıyorsa yanlış/eski build bağlı demektir.) Video ve inceleme notları hangi build içinse o build ekli olmalı.

**12. Sunucu tarafı düzeltmede build değiştirme**
Düzeltme sadece backend'deyse aynı build'i yeniden gönder (binary değişmedi); tanıtım/inceleme videosu da o build üzerinde çekilmiş olmalı.

### E. App Review notları ve test

**13. İnceleme notları (App Review Notes) dürüst ve doğrulanabilir olmalı**
Test edilmemiş şeyler için "başarıyla test edildi" yazma. Sadece gerçekten doğrulanan adımları, mümkünse nasıl doğrulandığıyla birlikte yaz.

**14. Demo hesap + yeterli kredi**
Giriş gerektiren uygulamalarda çalışan bir demo hesap ver ve incelemecinin tüm özellikleri deneyebilmesi için bol kredi/bakiye tanımla. Kontrol: gönderimden hemen önce demo hesapla gerçekten giriş yapılabiliyor mu?

## Gönderim öncesi son rapor formatı

Gönderimden önce kullanıcıya HER ZAMAN şu formatta bir özet sun:

```
📋 App Store Gönderim Kontrolü — [Uygulama adı] v[sürüm]

A. Metadata:        1 ✅  7 ✅  8 ✅  9 ✅
B. Hesap/Gizlilik:  2 ✅  6 ❌ → [eksik ne, nasıl düzeltilecek]
C. IAP:             3 ✅  4 ✅  5 ⚠️ → [neden kontrol edilemedi]
D. Build:           11 ✅  12 —(geçerli değil)
E. Review:          13 ✅  14 ✅

Sonuç: ❌ olan maddeler kapatılmadan gönderim ÖNERİLMEZ.
```

IAP olmayan bir uygulamada C bölümünü "geçerli değil" olarak işaretle; maddeleri sessizce atlama, neden atlandığını göster.

## Listeyi güncelleme

Yeni bir red veya daha önce görülmemiş bir sorun yaşandığında:

1. Sorunu kök nedeniyle birlikte (hangi Guideline, ne eksikti, nasıl çözüldü) yeni bir numaralı madde olarak uygun bölüme ekle.
2. Skill dosyasının güncellenmiş halini yeniden paketleyip kullanıcıya teslim et ve "Kaydet" (Save skill) butonuyla eski sürümün üzerine kaydetmesini söyle — skill'ler otomatik güncellenmez, kullanıcının yeni dosyayı kaydetmesi gerekir.
