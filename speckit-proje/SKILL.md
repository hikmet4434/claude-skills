---
name: speckit-proje
description: "Yeni bir proje, uygulama, SaaS, web sitesi, klon veya büyük bir özellik BAŞLARKEN otomatik çalışır. GitHub Spec Kit'in Spec-Driven Development (SDD) akışını Türkçe ve kodlama bilmeyen kullanıcıya göre uygular: anayasa, spesifikasyon, netleştirme, plan, görevler, tutarlılık analizi, uygulama ve yakınsama (converge) döngüsü. Ayrıca kanıtlı hata düzeltme (incele, düzelt, doğrula) ve fikir değerlendirme (devam, netleştir, iptal) modları vardır. Tetikleyiciler: yeni proje, yeni uygulama, uygulama yap, site yap, SaaS kur, sıfırdan başla, X'in klonunu yap, muadilini yap, özellik ekle, büyük değişiklik, spec yaz, PRD'den koda, speckit, spec-kit, spesifikasyon, anayasa, converge, hatayı bul düzelt doğrula, bu fikir yapılmaya değer mi. Tek satırlık küçük düzeltmelerde veya yalnız tasarım eleştirisinde tetikleme."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
  source: "github/spec-kit 1.x (templates/commands, extensions/bug, extensions/assess) uyarlaması"
---

# Speckit Proje: Spesifikasyon Odaklı Geliştirme (SDD)

Kod bir spesifikasyonun çıktısıdır. Önce **ne** ve **neden** yazılır, sonra **nasıl**, sonra görevler, sonra kod; en sonda kodun spesifikasyonu gerçekten karşılayıp karşılamadığı ölçülür ve açık kalan iş yeniden göreve dönüştürülür. Bu skill bu döngüyü uçtan uca **sen** yürütürsün.

## Kullanıcı profili (her adımda geçerli)

- Kullanıcı kodlama bilmez. Komutları, dosyaları, kurulumu, testi ve dağıtımı sen yaparsın. Ona terminal komutu yazdırma.
- Yanıtlar ve tüm üretilen belgeler **Türkçe**. Kod, dosya adı ve teknik anahtarlar İngilizce kalabilir.
- Soru sınırı: tüm akış boyunca **en fazla 3 kritik soru**, `AskUserQuestion` ile, önerilen seçenek ilk sırada "(Önerilen)" etiketiyle. Kullanıcı yoksa veya cevap gelmezse makul varsayımı seç, spec.md içindeki **Varsayımlar** bölümüne yaz ve devam et.
- Geri alınamaz işlemler (canlı ortama ilk dağıtım, veri silme, ödeme anahtarı, alan adı DNS değişikliği) için tek cümlelik onay iste.
- Her adım bitince kullanıcıya tek satır durum ver; ayrıntı dosyalardadır.
- Uzun projede bağlam dolmaya yaklaşırken uyar: tüm durum `specs/` altındaki dosyalarda olduğu için yeni sohbette "speckit devam" demesi yeterli (bkz. Devam etme).

## Diğer skill'lerle iş bölümü

Bu skill orkestratördür; uzman skill'leri doğru adımda çağırır. Spec Kit'teki karşılığı daha güçlü olan adımlarda bu skill'in kuralları geçerlidir.

| Adım | Bu skill'in kuralı | Bu adımda ayrıca çağrılan skill |
|---|---|---|
| Fikir değerlendirme | `references/hata-ve-fikir.md` Fikir modu | `product-management:product-brainstorming` (beyin fırtınası gerekiyorsa) |
| Anayasa | `references/portfoy-anayasasi.md` | yok |
| Spesifikasyon | Bu dosya Adım 2 | `product-management:write-spec` yalnız paydaşa gidecek PRD istenirse |
| Plan | Bu dosya Adım 4 | `engineering:architecture` (tek bir kritik teknoloji kararı için ADR), `site-mimarisi` (web sitesi), `arayuz-tasarimi` / `impeccable` / `frontend-design` (arayüz), `admin-panel-uret` / `panel-tasarimi` (yönetim paneli) |
| Görevler | Bu dosya Adım 5 | `multi-agent-orkestrator` mantığı: `[P]` işaretli görevler paralel alt ajanlara |
| Uygulama | Bu dosya Adım 7 | `kod-guvenlik-test`, `anti-gravity`, `stripe-canli-kurulum` (ödeme varsa) |
| Yakınsama | Bu dosya Adım 8 | `denetim` (canlıya çıkınca kullanıcı senaryolu denetim) |
| Hata | `references/hata-ve-fikir.md` Hata modu | `engineering:debug` yalnız etkileşimli canlı hata ayıklama için |
| Dağıtım | Anayasa Madde VII | Coolify MCP (seymata / Hostinger), statik site için Netlify / Vercel MCP |
| Hızlı prototip | Bu skill'in Hızlı akışı | `proje-otomasyon` yalnız tek dosyalık demo / tek ekranlık prototip için |

## Önce: ortam ve araç kontrolü (sessiz)

1. Bağlı MCP ve bağlayıcıları kontrol et; işe uyan varsa kullan: Coolify (dağıtım), GitHub / `add_repo` (kaynak kod), Supabase, Context7 (kütüphane dokümanı, plan ve uygulamada her zaman), Stripe, Vercel/Netlify (statik), Higgsfield/Canva (görsel varlık).
2. Proje yeni mi (greenfield) yoksa mevcut kod mu (brownfield)? Mevcutsa önce kodu oku; README, paket dosyaları, mevcut `specs/` ve `.specify/` klasörlerini incele.
3. İş boyutunu sınıflandır:
   - **Tam akış**: yeni uygulama, yeni ürün, 3+ ekranlı özellik, ödeme/kimlik/veri modeli değişikliği.
   - **Hızlı akış**: 1-2 dosyalık özellik. Adım 1, 3 ve 6 atlanır; spec kısa tutulur; Adım 8 yine zorunludur.
   - **Hata**: davranış bozuksa Hata modu. **Fikir**: "yapmaya değer mi" sorusuysa Fikir modu.

## Klasör düzeni

```text
<proje>/
├── .specify/memory/constitution.md      # proje anayasası (bir kez)
├── specs/001-kisa-ad/
│   ├── spec.md          # ne ve neden (teknolojisiz)
│   ├── plan.md          # nasıl (teknik bağlam, anayasa kapısı, yapı)
│   ├── research.md      # karar / gerekçe / reddedilen alternatif
│   ├── data-model.md    # varlıklar, alanlar, kısıtlar, durum geçişleri
│   ├── contracts/       # API / arayüz sözleşmeleri
│   ├── quickstart.md    # uçtan uca doğrulama senaryosu
│   ├── checklists/requirements.md
│   └── tasks.md         # görevler + yakınsama fazları
├── .specify/bugs/<slug>/        # Hata modu raporları
└── .specify/assessments/<slug>/ # Fikir modu raporları
```

Yeni özellik klasörünü `scripts/yeni-ozellik.sh "<kısa-ad>" [proje-kökü]` ile aç: sıradaki numarayı verir ve şablonları kopyalar. Şablonların tamamı `references/sablonlar.md` içindedir.

## Adım 1: Anayasa (projede bir kez)

- `.specify/memory/constitution.md` yoksa `references/portfoy-anayasasi.md` dosyasını temel al; proje adını, tarihi ve projeye özgü ilkeleri doldur. Köşeli parantezli yer tutucu bırakma; bilinmeyeni `TODO(ALAN): açıklama` olarak yaz.
- Varsa koru; yalnız değişen ilkeyi güncelle. Sürüm: ilke kaldırma veya yeniden tanımlama MAJOR, yeni ilke MINOR, ifade düzeltme PATCH.
- İlkeler ölçülebilir ve "ZORUNLU / ÖNERİLİR" diliyle yazılır. "Hızlı, güvenli, sezgisel" gibi ölçüsüz sıfat yasak.
- Anayasa adımında kod yazma; kullanıcının mesajındaki özellik isteklerini Adım 2'ye taşı.

## Adım 2: Spesifikasyon (spec.md)

1. 2-4 kelimelik kısa ad üret (`musteri-paneli`, `google-giris`), klasörü aç.
2. Kullanıcının anlattığından ve mevcut proje bilgisinden spec.md'yi doldur:
   - **Kullanıcı hikayeleri** öncelikli (P1, P2, P3). Her hikaye **tek başına** geliştirilebilir, test edilebilir ve gösterilebilir olmalı; yalnız P1 bitse bile değer üreten bir MVP çıkmalı. Her birine "Neden bu öncelik", "Bağımsız test" ve Verilen / Olduğunda / O zaman kabul senaryoları yaz.
   - **Uç durumlar**: sınır değerleri, hata, boş, yükleniyor, eşzamanlı düzenleme.
   - **Fonksiyonel gereksinimler** `FR-001` biçiminde, her biri test edilebilir tek bir "Sistem ... ZORUNLU" cümlesi.
   - **Anahtar varlıklar** (veri varsa), uygulama ayrıntısı olmadan.
   - **Başarı ölçütleri** `SC-001` biçiminde: ölçülebilir ve **teknolojiden bağımsız** ("kullanıcı kaydı 2 dakikadan kısa sürer"; "API 200 ms" değil).
   - **Varsayımlar**: soru sormak yerine seçtiğin makul varsayılanlar.
3. Spec'te dil, çatı, veritabanı, API adı geçmez. Bunlar plana aittir.
4. Gerçekten belirsiz ve kararı kapsamı, güvenliği veya kullanıcı deneyimini anlamlı değiştiren en fazla **3** nokta için `[NETLEŞTİR: soru]` işareti koy. Geri kalan her şey için makul varsayım yaz.
5. `checklists/requirements.md` kalite kontrolünü uygula (şablon `references/sablonlar.md`). Geçmeyen madde varsa spec'i düzelt, en fazla 3 tur.

## Adım 3: Netleştirme (plan öncesi)

Spec'i şu kategorilerde tara ve her birini Açık / Kısmi / Eksik işaretle: işlevsel kapsam ve kapsam dışı, roller; veri modeli ve yaşam döngüsü; kullanıcı akışı ve hata/boş/yükleniyor durumları; performans, ölçek, güvenilirlik, gözlemlenebilirlik; güvenlik, gizlilik, KVKK; dış servisler ve hata modları; uç durumlar ve hız sınırı; teknik kısıtlar; terim tutarlılığı; kabul ölçütlerinin test edilebilirliği; kalan TODO ve ölçüsüz sıfatlar.

- Etki x belirsizlik puanına göre en yüksek **3** soruyu seç (Spec Kit 5 soru önerir; bu kullanıcı için 3). Her soru 2-4 seçenekli olsun ve önerdiğin seçenek ilk sırada olsun.
- Mimariyi, veri modelini, görev bölümünü, test tasarımını veya uyumu değiştirmeyen soruyu sorma; varsayım olarak yaz.
- Her cevabı spec.md içinde `## Netleştirmeler` > `### Oturum YYYY-MM-DD` altına "S: ... > C: ..." olarak işle ve ilgili FR / hikaye / varlık bölümünü de güncelle. `[NETLEŞTİR]` işareti kalmamalı.

## Adım 4: Plan (plan.md ve yan belgeler)

1. **Teknik bağlam**: dil/sürüm, ana bağımlılıklar, depolama, test aracı, hedef platform, proje tipi, performans hedefleri, kısıtlar, ölçek. Bilinmeyeni araştır; tahminle bırakma.
2. **Anayasa kapısı**: her ZORUNLU ilkeyi tek tek kontrol et. İhlal varsa ya planı değiştir ya da "Karmaşıklık takibi" tablosunda gerekçelendir (neden gerekli, daha basit alternatif neden yetmedi). Gerekçesiz ihlalle devam etme. Tasarım bittikten sonra kapıyı bir kez daha kontrol et.
3. **Faz 0, research.md**: her bilinmeyen ve her önemli teknoloji seçimi için "Karar / Gerekçe / Değerlendirilen alternatifler". Kütüphane ve servis bilgisini Context7 MCP veya web aramasıyla güncel kaynaktan doğrula; ezberden sürüm yazma.
4. **Faz 1, tasarım**: `data-model.md` (varlık, alan, doğrulama kuralı, ilişki, durum geçişi), `contracts/` (dışa açılan her API veya arayüz için sözleşme; tamamen iç bir araçsa atla), `quickstart.md` (kullanıcının P1 hikayesini uçtan uca doğrulayan adımlar).
5. **Proje yapısı**: gerçek klasör ağacını yaz; kullanılmayan seçenekleri sil. Varsayılan tek proje; web uygulamasında `frontend/` + `backend/`; mobilde `api/` + `ios/` veya `android/`. Gereksiz katman (repository deseni, mikroservis) yalnız gerekçeyle.

## Adım 5: Görevler (tasks.md)

Biçim zorunludur: `- [ ] T001 [P] [US1] Açıklama, tam dosya yolu ile`

- `T001...` yürütme sırasına göre sıralı numara.
- `[P]` yalnız farklı dosyalara dokunan ve bitmemiş bir göreve bağımlı olmayan görevlere. Bu görevler paralel alt ajanlara verilebilir.
- `[US1]` etiketi yalnız kullanıcı hikayesi fazlarında zorunlu; Kurulum, Temel ve Cila fazlarında yok.
- Fazlar: **Faz 1 Kurulum** > **Faz 2 Temel** (tüm hikayeleri bloklayan altyapı; bitmeden hikayeye geçilmez) > **Faz 3+ her hikaye için ayrı faz** P1'den başlayarak (içinde: model > servis > uç nokta > arayüz > entegrasyon) > **Son faz Cila ve kesişen işler**.
- data-model.md'deki alan kısıtlarını (uzunluk, zorunluluk, enum, doğrulama) görev açıklamasına aynen yaz.
- Testler: kullanıcı test istemediyse bile her P1 hikayesi için en az bir uçtan uca doğrulama görevi ekle (quickstart.md senaryosu). Birim test görevleri yalnız istenirse veya ödeme, kimlik, para hesabı gibi kritik mantıkta.
- Her hikaye fazının sonunda bir "Kontrol noktası: USn bağımsız olarak çalışır ve test edilir" satırı yaz.

## Adım 6: Tutarlılık analizi (salt okunur, uygulama öncesi)

spec.md, plan.md, tasks.md ve anayasayı birlikte tara; **hiçbir dosyayı değiştirme**, önce rapor üret. En fazla 50 bulgu:

- **Tekrar**: neredeyse aynı gereksinimler.
- **Belirsizlik**: ölçüsüz sıfat, kalan TODO / yer tutucu.
- **Eksik tanım**: nesnesi veya ölçülebilir sonucu olmayan gereksinim; spec/plan'da olmayan dosyaya giden görev.
- **Anayasa uyumu**: ZORUNLU ilkeyle çelişen her şey.
- **Kapsama boşluğu**: görevi olmayan gereksinim, gereksinimi olmayan görev, göreve dönüşmemiş performans/güvenlik başarı ölçütü.
- **Tutarsızlık**: terim kayması, bir dosyada olup diğerinde olmayan varlık, sıra çelişkisi, çatışan teknoloji seçimi.

Önem: **KRİTİK** (anayasa ihlali, temel işlevi bloklayan kapsamsız gereksinim) > **YÜKSEK** > **ORTA** > **DÜŞÜK**. Rapor tablosu: Kimlik | Kategori | Önem | Konum | Özet | Öneri, ardından gereksinim-görev kapsama oranı. KRİTİK veya YÜKSEK bulgu varsa ilgili dosyayı düzelt ve analizi tekrarla; bunlar sıfırlanmadan Adım 7'ye geçme.

## Adım 7: Uygulama

1. `checklists/` altındaki listelerde işaretsiz madde varsa önce tamamla.
2. Fazları sırayla yürüt; Temel faz bitmeden hikayeye geçme. `[P]` görevleri birden fazlaysa ve iş büyükse `Agent` ile paralel alt ajanlara dağıt (her ajana görev kimliği, dosya yolu, ilgili FR ve plan kesitini ver).
3. Her görev bitince tasks.md'de `- [X]` yap. Görev tamam demek kanıt değildir; Adım 8 yeniden doğrular.
4. Her hikaye fazının sonunda kontrol noktası testini çalıştır (derleme, test, uygulamayı ayağa kaldırıp quickstart senaryosunu deneme).
5. Komut takılır veya hata verirse `anti-gravity` kurallarını uygula; kod üretildikçe `kod-guvenlik-test` kontrolünü uygula. Sırlar yalnız ortam değişkeninde; koda veya depoya yazılmaz.
6. Mantıklı noktalarda git commit at (`feat(US1): ...`). Repo kullanıcının hesabındaysa itme işlemini yap; hesap erişimi engelliyse kullanıcıya söyle.

## Adım 8: Yakınsama (converge), "bitti" demeden önce zorunlu

spec.md, plan.md ve tasks.md tek niyet kaynağıdır; anayasa bağlayıcıdır. Kodun **şu anki** halini bu niyetle karşılaştır:

- Her FR, inşa gerektiren her SC, her kabul senaryosu (`US1/AC2`), her plan kararı ve her ZORUNLU ilke için kanıt ara. İşaretli görevler dahil hepsini yeniden doğrula.
- Bulgu türleri: **eksik** (hiç yok), **kısmi** (var ama karşılamıyor), **çelişiyor** (niyete veya anayasaya aykırı), **istenmemiş** (spec/plan'da olmayan iş; silme, sadece gözden geçirme görevi aç).
- Önem: anayasa ihlali ve P1'i bloklayan eksik/çelişen KRİTİK; çekirdek FR'de eksik/kısmi YÜKSEK; ikincil kısmi ve gerekçesiz istenmemiş ORTA; cila DÜŞÜK.
- Önce bulgu tablosunu kullanıcıya göster, sonra tasks.md'nin **sonuna** `## Faz N: Yakınsama` ekle: `- [ ] T042 <emir kipinde iş> per FR-003 (eksik)`. Mevcut görevleri asla yeniden numaralama, silme veya değiştirme; spec.md ve plan.md'ye dokunma.
- Bulgu yoksa tasks.md'yi hiç değiştirme ve "Yakınsadı: uygulama spec, plan ve görevleri karşılıyor" de.
- Döngü: Adım 7 > Adım 8, en fazla **3 tur**. 3 turda yakınsamazsa kalan bulguları kullanıcıya özetle ve karar iste.

## Adım 9: Dağıtım ve teslim

- Dağıtım hedefi anayasa Madde VII'ye göre (varsayılan Coolify). İlk canlı dağıtım ve alan adı bağlama öncesi tek cümle onay al.
- Canlıdaysa `denetim` skill'i ile gerçek kullanıcı senaryolu kısa denetim yap; bulunan hatalar Hata moduna girer.
- Teslim mesajı: çalışan adres, ne yapıldığı (hikaye bazında 1 satır), kalan açık iş, bir sonraki mantıklı adım. Adım tekrarı yazma.

## Mevcut projeye özellik ekleme (brownfield)

Anayasa yoksa mevcut koddan çıkar (kullanılan yığın, dağıtım, kurallar) ve portföy anayasasıyla birleştir. Spec'te "Mevcut davranış" ve "Değişecek davranış" ayrımı yap. Plan, yeni dosyalar yerine dokunulacak gerçek dosyaları listeler. Yakınsama yalnız bu özelliğin kapsamına bakar.

## Devam etme (yeni sohbet veya bağlam dolduğunda)

Kullanıcı "speckit devam", "kaldığımız yerden devam" derse: projedeki en yüksek numaralı `specs/NNN-*` klasörünü bul, tasks.md'de ilk işaretsiz görevi bul, anayasa + spec özetini + plan yapısını oku ve oradan sürdür. Bağlam %85 dolduğunda kullanıcıyı uyar, tasks.md'yi güncel bırak ve şu tek satırı ver: "Yeni sohbette `speckit devam: <proje yolu>` yazman yeterli."

## Hata modu ve Fikir modu

Ayrıntılar `references/hata-ve-fikir.md` içinde:
- **Hata**: incele (kök neden, kapsam, düzeltme seçenekleri) > düzelt (en küçük kapsam) > doğrula (orijinal belirti + gerileme). Karar: doğrulandı / kısmi / başarısız. Yalnız "doğrulandı" düzeltilmiş sayılır.
- **Fikir**: giriş > kanıt araştırması > problem tanımı > şekillendirme > karar: devam / netleştir / iptal. "Devam" kararı doğrudan Adım 2'ye girdi olur.

## Kaçınılacaklar

- Spec'e teknoloji yazmak; plana iş hedefi yazmak.
- 3'ten fazla soru sormak veya cevabı değiştirmeyecek soru sormak.
- Analiz veya yakınsama adımını "zaman kazanmak için" atlamak.
- Görev işaretini kanıt saymak; test etmeden "tamamlandı" demek.
- Yakınsama sırasında mevcut görevleri yeniden yazmak, spec'i sessizce değiştirmek.
- Kullanıcıya komut çalıştırtmak.
