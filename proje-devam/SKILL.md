---
name: proje-devam
description: >-
  Bir projeye kaldığı yerden devam ederken oturumlar arası bağlamı geri yükler.
  ŞU DURUMLARDA kullan: kullanıcı "kaldığımız yerden devam", "projeye devam et",
  "bu projede devam edelim", "önceki sohbetten devam", "continue the project",
  "resume where we left off" derse; ya da yeni bir sohbet açıp mevcut bir proje
  üzerinde çalışmaya başlıyorsa. Proje kökündeki PROJECT_NOTES.md dosyasını okur,
  özetler ve devir notundaki bekleyen işlerden devam eder. İş bitince notu güncel tutar.
---

# Proje Devam (oturumlar arası devir)

Amaç: Yeni bir sohbette, bir projeye **kaldığı yerden** devam ederken bağlamı
`PROJECT_NOTES.md` üzerinden geri yüklemek ve notu güncel tutmak.

## Devama başlarken (bu skill tetiklenince)
1. Çalışılan projenin **kökünde `PROJECT_NOTES.md` var mı** bak (Read/Glob).
   - Yoksa: kullanıcıya "Bu projede devir notu (PROJECT_NOTES.md) yok — oluşturayım mı?"
     diye sor; isterse aşağıdaki şablonla oluştur.
   - Varsa: **tamamını oku.**
2. Kısa bir **özet** ver (3-6 madde): ne yapılmış, aktif müşteri/kapsam, **bekleyen işler**.
3. Bekleyen işlerden hangisiyle devam edileceğini kullanıcıya sor (ya da açıkça
   söylediyse doğrudan başla). Notta yazan **kararlara ve kısıtlara** uy.
4. Notta bir dosya/selector/flag adı geçiyorsa, **önermeden önce hâlâ var mı doğrula**
   (kod değişmiş olabilir).

## Notu güncel tutma
- Anlamlı bir iş bittiğinde, yeni bir karar alındığında ya da yeni bekleyen iş
  çıktığında `PROJECT_NOTES.md`'yi **güncelle** (ilgili bölümü düzenle, tarih notunu yenile).
- Kullanıcı "notları güncelle / devir notu çıkar / bu sohbeti özetle" derse tamamını tazele.
- Notu **kısa ve eyleme dönük** tut: uzun kod dökme; dosya yolları, kimlikler (brandId vb.),
  selector'lar, kararlar ve **bekleyen işler** yeterli. Sırları (API anahtarı, token) yazma.

## PROJECT_NOTES.md şablonu (yoksa oluştururken)
```markdown
# PROJECT_NOTES — <Proje Adı>

> Oturumlar arası devir notu. Yeni sohbette proje devamıysa önce bunu oku.
> Son güncelleme: <YYYY-MM>

## Proje
- Stack / deploy yöntemi / repo / canlı adres.

## Mimari (kısa)
- Ana parçalar ve nerede oldukları (dosya yolları).

## Aktif kapsam / müşteri
- Kimlikler (brandId vb.), önemli selector/ayarlar, konfigürasyon yeri.

## Yapılanlar
- Son sohbet(ler)de tamamlananlar (madde madde).

## Bekleyen / operasyonel
- Devam edilecek işler; kullanıcı tarafındaki adımlar (deploy vb.).

## Kararlar & kısıtlar
- Uyulması gereken güvenlik/iş kuralları, "şunu yapma" notları.
```

## Notlar
- Bu skill kod yazmaz; sadece bağlamı geri yükler ve notu yönetir. Asıl işi
  notta yazan bekleyen maddelerden devam ederek yaparsın.
- PROJECT_NOTES.md repo içinde durur → takım/başka makineden de erişilir. Sırları yazma.
