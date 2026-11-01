<!-- Bu dosya ThirdHand AI / Seymata portföyündeki her yeni projenin varsayılan anayasasıdır.
     Yeni projede .specify/memory/constitution.md olarak kopyala, [PROJE_ADI] ve tarihleri doldur,
     projeye uymayan maddeyi gerekçesiyle "Uygulanmaz" olarak işaretle (silme). -->

# [PROJE_ADI] Anayasası

**Sürüm**: 1.0.0 | **Onay tarihi**: [YYYY-AA-GG] | **Son değişiklik**: [YYYY-AA-GG]
**Sahibi**: Hikmet Tanrıverdi (ThirdHand AI / Strateji Danışmanlık A.Ş.)

## Temel İlkeler

### I. Kullanıcı değeri önce, bağımsız dilimler halinde
- Her özellik öncelikli (P1, P2, P3) kullanıcı hikayelerine bölünür; her hikaye tek başına çalışır, test edilir ve gösterilir. ZORUNLU.
- P1 tek başına satılabilir veya gösterilebilir bir MVP üretir. ZORUNLU.
- Gerekçe: kullanıcı kod bilmez; her teslim çalışır halde görülebilir olmalı.

### II. Basitlik
- En basit çalışan çözüm seçilir; spekülatif genelleme, gereksiz katman ve mikroservis yok. ZORUNLU.
- Bir özellik en fazla 3 ayrı proje/dağıtım birimi içerir (ör. frontend, backend, worker); fazlası plan.md "Karmaşıklık takibi" tablosunda gerekçelendirilir.
- Yönetilen veya mevcut altyapı (portföydeki Supabase, Coolify servisleri, ortak e-posta altyapısı) yeniden kullanılır; aynı işi yapan ikinci sistem kurulmaz.

### III. Güvenlik, gizlilik ve KVKK
- Sırlar (API anahtarı, token, şifre) yalnız ortam değişkeninde veya Coolify env ekranında tutulur; koda, depoya, loga yazılmaz. ZORUNLU.
- Kişisel veri işleyen her uygulamada KVKK aydınlatma metni, çerez onayı ve veri silme yolu bulunur. ZORUNLU.
- Kod üretiminde girdi doğrulama, yetkilendirme, hız sınırı ve güvenli başlıklar uygulanır (`kod-guvenlik-test` kontrol listesi).
- Ödeme varsa `stripe-canli-kurulum` kuralları geçerlidir; canlı gizli anahtar sohbete yazılmaz, kullanıcı doğrudan Coolify env ekranına girer.

### IV. Doğrulanmış teslim
- "Tamamlandı" demek için kanıt gerekir: derleme temiz, P1 quickstart senaryosu gerçekten çalıştırıldı, yakınsama (converge) "Yakınsadı" sonucunu verdi. ZORUNLU.
- Ödeme, kimlik doğrulama, para/vergi hesabı ve veri dönüşümü içeren mantık için otomatik test yazılır. ZORUNLU.
- Canlıya çıkan her sürüm `denetim` skill'iyle kullanıcı senaryosundan geçirilir. ÖNERİLİR.

### V. Yapay zekâ kullanımı
- LLM çağrıları tek bir sunucu tarafı katmandan geçer (merkezi AI ağ geçidi deseni); anahtarlar istemciye inmez. ZORUNLU.
- Model adları sabit sürüm yerine OpenRouter "latest" takma adlarıyla yazılır (`~` önekli, ör. `~google/gemini-flash-latest`). ÖNERİLİR.
- Yedek zinciri tanımlıdır; varsayılan sıra GLM > Gemini > DeepSeek > Grok. Hata **veya boş içerik** sıradakine düşürür. ZORUNLU.
- Kullanılacak model ve yedek sırası yönetim panelinden seçilebilir. ZORUNLU.
- LLM kullanan her yerde başlangıçta otomatik model testi (kalite ve fiyat-performans) yapılır ve sonuç kaydedilir. ZORUNLU.

### VI. Portföy ortak standartları
- **Bildirim zili**: yeni özellik ve düzeltmeler için bildirim ayarı; zil ikonu açılır pencerede okunmuş/okunmamış bildirimleri gösterir. ZORUNLU.
- **İmza**: her uygulamada "ThirdHand AI tarafından yapılmıştır" ibaresi; tıklanınca ThirdHand AI sitesine gider. ZORUNLU.
- **Google ile giriş**: kullanıcı girişi olan her uygulamada; her uygulama için ayrı Google OAuth istemcisi. ZORUNLU (girişsiz uygulamada Uygulanmaz).
- **Yönetim paneli**: tüm uygulamalarda ortak tek düzen admin panel tasarımı (`admin-panel-uret` / `panel-tasarimi`). ÖNERİLİR.
- **Dil**: Türkçe birincil; uluslararası hedefte çok dilli altyapı baştan kurulur (metinler sabit kodlanmaz).
- **Ölçüm**: temel kullanım olayları (kayıt, aktivasyon, ödeme) izlenir; analitik aracı plan.md'de seçilir.

### VII. Dağıtım ve kaynak kod
- Varsayılan dağıtım: kendi sunucusundaki Coolify (seymata.com) ve Coolify MCP. Fasheone ailesi Hostinger Coolify'da. Statik tanıtım siteleri için Netlify/Vercel veya Artifact kabul edilir.
- Kaynak kod GitHub'da, ana hesap hiktan44. Hesap erişimi engelliyse dağıtım kaynağı plan.md'de açıkça yazılır (ör. Gitea).
- Her uygulamanın sağlık kontrolü (health check) uç noktası ve alan adı/SSL kontrolü vardır.
- Veritabanı şeması migration ile değişir; elle şema değişikliği yapılmaz.

## Geliştirme Akışı

Spesifikasyon > netleştirme > plan > görevler > analiz > uygulama > yakınsama. Analizde KRİTİK/YÜKSEK bulgu varken uygulamaya geçilmez; yakınsama "Yakınsadı" demeden teslim yapılmaz.

## Yönetim

- Bu anayasa diğer tüm uygulama alışkanlıklarının üstündedir. Plan.md her seferinde anayasa kapısından geçer.
- Değişiklik: değişen madde, gerekçe ve sürüm artışı dosyanın başına not edilir. Madde kaldırma/yeniden tanımlama MAJOR, yeni madde MINOR, ifade düzeltmesi PATCH.
- İhlal ancak plan.md "Karmaşıklık takibi" tablosunda gerekçeyle ve kullanıcı onayıyla kabul edilir.
