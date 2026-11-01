# Şablonlar

`scripts/yeni-ozellik.sh` bu dosyadaki SABLON işaretli HTML yorum blokları arasındaki içeriği, işaretteki dosya adıyla özellik klasörüne kopyalar. Elle kullanırken de aynı blokları al. Köşeli parantezli yer tutucuların tamamı doldurulmalı; kullanılmayan bölüm "Uygulanmaz" yazılarak bırakılır.

<!-- SABLON:spec.md -->
# Özellik Spesifikasyonu: [ÖZELLİK ADI]

**Klasör**: `specs/[###-kisa-ad]` | **Tarih**: [YYYY-AA-GG] | **Durum**: Taslak
**Girdi**: Kullanıcı anlatımı: "[KULLANICININ İSTEĞİ]"

## Kullanıcı Senaryoları ve Test *(zorunlu)*

### Kullanıcı Hikayesi 1: [Kısa başlık] (Öncelik: P1)
[Kullanıcı yolculuğu, sade dille]

**Neden bu öncelik**: [değer ve gerekçe]
**Bağımsız test**: [Yalnız bu hikaye bitse nasıl test edilir ve hangi değeri verir]

**Kabul senaryoları**:
1. **Verilen** [başlangıç durumu], **Olduğunda** [eylem], **O zaman** [beklenen sonuç]
2. **Verilen** [...], **Olduğunda** [...], **O zaman** [...]

### Kullanıcı Hikayesi 2: [Kısa başlık] (Öncelik: P2)
[...]

### Uç Durumlar
- [Sınır koşulunda ne olur?]
- [Hata, boş, yükleniyor, yetkisiz erişim, eşzamanlı düzenleme]

## Gereksinimler *(zorunlu)*

### Fonksiyonel Gereksinimler
- **FR-001**: Sistem [yetenek] ZORUNLU.
- **FR-002**: Kullanıcı [etkileşim] yapabilmeli.
- **FR-003**: Sistem [veri gereksinimi] ZORUNLU. [NETLEŞTİR: yalnız gerçekten belirsizse, en fazla 3]

### Anahtar Varlıklar *(veri varsa)*
- **[Varlık]**: [neyi temsil eder, ana nitelikler, ilişkiler; uygulama ayrıntısı yok]

## Başarı Ölçütleri *(zorunlu, ölçülebilir ve teknolojiden bağımsız)*
- **SC-001**: [ör. Kullanıcı kaydı 2 dakikadan kısa sürer]
- **SC-002**: [ör. İlk denemede ana görevi tamamlayan kullanıcı oranı %90]
- **SC-003**: [iş metriği]

## Varsayımlar
- [Soru sormak yerine seçilen makul varsayılan]
- [Kapsam dışı: ör. v1'de mobil uygulama yok]

## Netleştirmeler
<!-- Adım 3'te eklenir: ### Oturum YYYY-AA-GG > - S: ... > C: ... -->
<!-- /SABLON -->

<!-- SABLON:checklists/requirements.md -->
# Spesifikasyon Kalite Kontrolü: [ÖZELLİK ADI]

## İçerik kalitesi
- [ ] Uygulama ayrıntısı yok (dil, çatı, veritabanı, API adı geçmiyor)
- [ ] Kullanıcı değeri ve iş ihtiyacına odaklı
- [ ] Teknik olmayan biri okuyup anlayabilir
- [ ] Zorunlu bölümlerin hepsi dolu

## Gereksinim bütünlüğü
- [ ] En fazla 3 `[NETLEŞTİR]` işareti var (Adım 3 sonrası sıfır)
- [ ] Her gereksinim test edilebilir ve tek anlamlı
- [ ] Başarı ölçütleri ölçülebilir ve teknolojiden bağımsız
- [ ] Her hikayenin kabul senaryosu var
- [ ] Uç durumlar yazılmış
- [ ] Kapsam ve kapsam dışı net
- [ ] Bağımlılıklar ve varsayımlar yazılmış

## Özellik hazırlığı
- [ ] Her FR'nin karşılığı bir kabul senaryosunda görülüyor
- [ ] Hikayeler birincil akışları kapsıyor ve bağımsız test edilebilir
- [ ] Spec'e teknoloji sızmamış
<!-- /SABLON -->

<!-- SABLON:plan.md -->
# Uygulama Planı: [ÖZELLİK]

**Klasör**: `specs/[###-kisa-ad]` | **Tarih**: [YYYY-AA-GG] | **Spec**: ./spec.md

## Özet
[Ana gereksinim + araştırmadan çıkan teknik yaklaşım, 3-5 cümle]

## Teknik Bağlam
**Dil/Sürüm**: [...]
**Ana bağımlılıklar**: [...]
**Depolama**: [... veya Uygulanmaz]
**Test**: [...]
**Hedef platform**: [web / iOS / Android / sunucu]
**Proje tipi**: [web uygulaması / mobil + API / statik site / CLI]
**Performans hedefleri**: [...]
**Kısıtlar**: [...]
**Ölçek**: [...]
**Dağıtım**: [Coolify (seymata) / Hostinger Coolify / Netlify / ...]
**AI katmanı**: [birincil model, yedek zinciri, model testi | Uygulanmaz]

## Anayasa Kapısı
*Faz 0'dan önce geçmeli, Faz 1 sonrası tekrar kontrol edilir.*
| Madde | Durum (Uyar / İhlal / Uygulanmaz) | Not |
|---|---|---|
| I. Bağımsız dilimler | | |
| II. Basitlik | | |
| III. Güvenlik ve KVKK | | |
| IV. Doğrulanmış teslim | | |
| V. Yapay zekâ kullanımı | | |
| VI. Portföy standartları | | |
| VII. Dağıtım ve kaynak kod | | |

## Proje Yapısı

### Belgeler
```text
specs/[###-kisa-ad]/
├── plan.md  research.md  data-model.md  quickstart.md
├── contracts/
└── tasks.md
```

### Kaynak kod
```text
[Gerçek klasör ağacı; kullanılmayan seçenekleri sil]
```
**Yapı kararı**: [seçilen yapı ve neden]

## Karmaşıklık Takibi
*Yalnız anayasa ihlali gerekçelendirilecekse doldur.*
| İhlal | Neden gerekli | Daha basit alternatif neden yetmedi |
|---|---|---|
<!-- /SABLON -->

<!-- SABLON:research.md -->
# Araştırma: [ÖZELLİK]

## [Konu / bilinmeyen 1]
- **Karar**: [...]
- **Gerekçe**: [...]
- **Değerlendirilen alternatifler**: [... ve neden seçilmediler]
- **Kaynak**: [Context7 / resmi doküman bağlantısı]
<!-- /SABLON -->

<!-- SABLON:data-model.md -->
# Veri Modeli: [ÖZELLİK]

## [Varlık]
| Alan | Tip | Zorunlu | Kısıt / doğrulama |
|---|---|---|---|

**İlişkiler**: [...]
**Durum geçişleri**: [taslak > aktif > arşiv, tetikleyiciler]
<!-- /SABLON -->

<!-- SABLON:quickstart.md -->
# Hızlı Doğrulama: [ÖZELLİK]

## Ön koşullar
[ortam, test hesabı, örnek veri]

## P1 senaryosu
1. [adım] > Beklenen: [sonuç]
2. [adım] > Beklenen: [sonuç]

## Başarı ölçütü kontrolleri
- SC-001: [nasıl ölçülür]
<!-- /SABLON -->

<!-- SABLON:tasks.md -->
# Görevler: [ÖZELLİK]

**Girdi**: specs/[###-kisa-ad]/ (spec.md, plan.md, research.md, data-model.md, contracts/)
**Biçim**: `- [ ] T### [P?] [USn?] Açıklama, dosya yolu ile`. `[P]` = paralel çalışabilir (farklı dosya, bekleyen bağımlılık yok).

## Faz 1: Kurulum
- [ ] T001 Plana göre proje yapısını oluştur
- [ ] T002 [P] Bağımlılıkları ve ortam değişkeni şablonunu (.env.example) ekle

## Faz 2: Temel (tüm hikayeleri bloklar)
- [ ] T003 [...]
**Kontrol noktası**: Temel hazır; hikaye fazları başlayabilir.

## Faz 3: Kullanıcı Hikayesi 1 - [başlık] (P1) MVP
**Hedef**: [...]
**Bağımsız test**: [...]
- [ ] T010 [P] [US1] [model] src/...
- [ ] T011 [US1] [servis] src/...
- [ ] T012 [US1] [uç nokta / arayüz] src/...
- [ ] T013 [US1] quickstart.md P1 senaryosunu uçtan uca doğrula
**Kontrol noktası**: US1 bağımsız olarak çalışır ve test edilir.

## Faz 4: Kullanıcı Hikayesi 2 - [başlık] (P2)
- [ ] T020 [US2] [...]

## Faz N: Cila ve Kesişen İşler
- [ ] T090 [P] Bildirim zili, ThirdHand AI imzası, KVKK metinleri (anayasa VI, III)
- [ ] T091 Sağlık kontrolü uç noktası ve dağıtım yapılandırması (anayasa VII)
- [ ] T092 Güvenlik taraması (kod-guvenlik-test)

## Bağımlılıklar ve Paralellik
- Kurulum > Temel > Hikayeler (öncelik sırasıyla veya paralel) > Cila
- Hikaye içinde: model > servis > uç nokta > arayüz > entegrasyon
<!-- /SABLON -->
