---
name: yayin-seo-geo-yasal-denetim
description: "Bir web uygulaması canlıya çıkmadan veya iş teslimi biterken resmî/kurumsal sayfaları, SEO, GEO, indeksleme ve canlı çıktıyı denetler; eksikleri kodda tamamlar ve üretimde kanıtlar. Uygulama bitti, canlıya hazır mı, yayına al, launch checklist, release readiness, SEO audit, GEO audit, legal pages, privacy policy, terms, cookies, KVKK, robots, sitemap, canonical, hreflang, JSON-LD, llms.txt ifadelerinde kullan. Yeni veya önemli ölçüde değişmiş halka açık web uygulamasının son teslim aşamasında kullanıcı ayrıca istemese de uygula. Güvenlik sızma testi için güvenlik skillini ayrıca kullan."
license: MIT
metadata:
  version: "1.1.0"
  language: tr
---

# Yayın SEO/GEO ve Yasal Denetim

Halka açık bir web uygulamasının bitiş kontrolünü yap. Mevcut teknolojiye uyum sağla; belirli bir framework dayatma. İncelemekle yetinme: kullanıcının yetkilendirdiği kapsamda eksikleri uygula, test et ve canlı çıktıda doğrula.

## Ne zaman çalıştır

- Yeni web uygulamasının ilk yayını veya önemli bir sürümü biterken.
- Kullanıcı “hazır mı?”, “canlıya al”, “yayına çıkalım”, “SEO/GEO kontrol et” dediğinde.
- Domain, dil yapısı, kurumsal kimlik, veri kapsamı veya ürün iddiaları değiştiğinde.
- Yalnız iç araç, CLI, mobil uygulama veya halka açık sitesi olmayan servis için bu denetimi zorlama.

## Başlamadan önce

1. Proje notlarını, repo kurallarını ve mevcut yayın akışını oku.
2. Canlı domaini, gerçek public rotaları, desteklenen dilleri ve uygulamanın iş modelini koddan doğrula.
3. Mevcut resmî sayfaları ara; yeniden yazmadan önce gerçek içeriği ve linkleri denetle.
4. Ülke ve kullanıcı kitlesine göre geçerli yükümlülükleri güncel, birincil kaynaklardan doğrula. Hukuki hüküm uydurma.
5. Şirket unvanı, kayıtlı adres, vergi/MERSİS/sicil, fiyat, veri kapsamı, müşteri sayısı, değerlendirme veya sertifika uydurma. Eksik işletme bilgisini açık bekleyen madde yap.
6. Hikmet'in Coolify portföyündeki sitelerde işletmeci bilgisi için [references/strateji-danismanlik-portfoy-profili.md](references/strateji-danismanlik-portfoy-profili.md) dosyasını uygula. Projede farklı ve doğrulanmış bir işletmeci açıkça tanımlanmışsa proje kaydı önceliklidir; çelişkiyi sessizce ezme.

Ayrıntılı kontrol listesi için [references/kontrol-listesi.md](references/kontrol-listesi.md) dosyasını gerektiğinde oku.

## Uygulama akışı

### 1. Kamuya açık sayfaları sınıflandır

Her rotayı şu gruplardan birine koy:

| Grup | Davranış |
|---|---|
| Pazarlama ve içerik | Canonical, açıklama, sitemap ve indeksleme açık |
| Gerçek dil sürümü | Self-canonical ve karşılıklı `hreflang` |
| Çevrilmemiş kopya rota | Dil alternatifi ilan etme; gerçek içerik diline canonical |
| Giriş, kayıt ve şifre ekranı | `noindex, nofollow`; sitemap dışında |
| Hesap, admin, dashboard, API | Kimlik doğrulama ve `noindex`; sitemap dışında |
| Demo, fixture, preview | Üretimde indeksleme kapalı veya erişim kontrollü |

`robots.txt` dosyasını gizlilik mekanizması gibi kullanma. Bir HTML sayfasının arama sonuçlarına girmemesi gerekiyorsa botun `noindex` işaretini görebilmesini sağla veya sayfayı kimlik doğrulama arkasında tut.

### 2. Resmî ve kurumsal sayfaları tamamla

Ürüne uygun olanları doğrula:

- Hakkımızda / kurumsal kimlik
- İletişim ve destek kanalı
- Gizlilik politikası
- Kullanım şartları
- Çerez politikası ve gerçek tercih davranışı
- Türkiye’de kişisel veri işleniyorsa işlem bağlamına uygun KVKK aydınlatması
- Ücretli hizmette fiyat, yenileme, iptal ve iade bilgileri
- Beta, veri kapsamı, yapay zekâ veya üçüncü taraf veri sınırları varsa açık kapsam sayfası

Metin ile gerçek uygulama davranışı eşleşsin. Kullanılmayan analitik çerez, sağlayıcı, ödeme yöntemi veya saklama süresi yazma. Gizlilik politikası ile belirli veri toplama anındaki aydınlatmayı otomatik olarak aynı belge sayma.

### 3. Teknik SEO’yu düzelt

- Benzersiz, sayfaya özgü `title` ve açıklama.
- Mutlak ve self-referential canonical.
- Yalnız gerçekten çevrilmiş sayfalarda karşılıklı `hreflang` ve uygun `x-default`.
- Sitemap içinde yalnız canonical, başarılı ve indekslenebilir public URL’ler.
- Robots içinde sitemap adresi; hassas veriyi robots ile korumaya çalışma.
- Open Graph/Twitter alanları ve paylaşım görseli gerçekten mevcut olsun.
- Organization, WebSite, WebApplication/Product/Article gibi yalnız doğru şema türlerini kullan.
- Yapılandırılmış veride sahte fiyat, puan, yorum, şirket adresi veya logo üretme.
- Redirect, canonical, sitemap ve dahili linklerin aynı URL tercihini göstermesini sağla.

### 4. GEO ve kaynak şeffaflığını tamamla

- Kamuya açık sayfalarda ürünün ne yaptığı, kim için olduğu, sınırları, kaynakları ve güncellik bilgisi düz metin olarak okunabilsin.
- Önemli iddiaları yalnız görsel, canvas veya oturum arkasında bırakma.
- Gerçek kaynak, dönem, para birimi, model/veri kapsamı ve bilinmeyen alanları açık etiketle.
- Uygunsa kısa bir `/llms.txt` ekle; bunun gelişmekte olan, sıralama garantisi vermeyen yardımcı bir sözleşme olduğunu kabul et.
- Arama/AI bot erişimini bilinçli yönet; özel kullanıcı verisi, admin ve API uçlarını açma.
- Ana sayfa, kapsam, fiyatlandırma, resmî sayfalar ve iletişim için kararlı canonical URL’ler sağla.

### 5. Doğrula

Önce statik yardımcıyı çalıştır:

```bash
node scripts/audit-site.mjs https://example.com
```

Ardından framework kontrollerini ve üretim derlemesini çalıştır. Gerçek tarayıcıda en az şunları doğrula:

- Ana sayfa içerikli açılıyor, hata katmanı ve kritik konsol hatası yok.
- Canonical, robots meta ve gerçek dil/RTL davranışı doğru.
- Resmî sayfa bağlantıları çalışıyor.
- Çerez/beta dialogu varsa klavye odağı, kapanma ve tercih kalıcılığı çalışıyor.
- Login/dashboard URL’leri sitemap’te yok ve indeksleme kapalı.

Deploy yetkisi mevcutsa canlıya al ve aynı kontrolleri canlı domain üzerinde tekrar et. Deploy yetkisi yoksa kodu, testleri ve incelemeye hazır diff’i tamamladıktan sonra yalnız son dış işlem için izin iste.

## Kabul ölçütü

İşi ancak şu kanıtlarla bitmiş say:

- Üretim derlemesi ve ilgili testler başarılı.
- `robots.txt` ile sitemap HTTP 200.
- Her indekslenebilir örnek sayfada doğru title, açıklama ve canonical.
- Çoklu dil bildirimi yalnız gerçek çeviriler için doğru ve karşılıklı.
- Auth/uygulama rotaları sitemap dışında ve `noindex` veya erişim kontrollü.
- Resmî sayfalar uygulama davranışıyla tutarlı.
- JSON-LD ayrıştırılabilir ve yalnız doğrulanmış iddialar içeriyor.
- Canlı sürüm gerçekten yeni commit’i gösteriyor; health/smoke kontrolü geçiyor.

## Rapor

Son yanıtta kısa biçimde belirt:

- Eklenen/düzeltilen sayfalar
- SEO düzeltmeleri
- GEO ve kaynak şeffaflığı düzeltmeleri
- Çalıştırılan testler ve canlı URL kanıtları
- Kullanıcıdan gereken gerçek işletme bilgileri veya harici hesap adımları
- Commit, PR ve deploy kimliği varsa bunlar

“SEO tamam” veya “yasal olarak tamamen uyumlu” gibi kanıtsız kesinlik kullanma. Arama motoru sıralaması, iletişim verisi, veri kapsamı veya hukuki yeterlilik garantisi verme.
