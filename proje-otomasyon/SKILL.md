---
name: "proje-otomasyon"
description: Hızlı prototip ve demo üretir; kullanıcı kodlama bilmiyor, tek seferde çalışan küçük ürün teslim et. Tek dosyalık HTML/React demo, tek ekranlı araç, hesaplayıcı, landing sayfası denemesi, müşteri toplantısı için hızlı gösterim gibi 1-2 dosyalık işlerde kullan. Yeni uygulama, SaaS, çok ekranlı ürün, veritabanı/ödeme/giriş içeren proje veya mevcut projeye büyük özellik isteniyorsa BU SKILL'İ DEĞİL speckit-proje skill'ini kullan.
metadata:
  version: "2.0.0"
  language: tr
---

# Proje Otomasyonu (Hızlı Prototip)

Bu skill küçük ve hızlı işler içindir. Kalıcı ürünler, yeni uygulamalar ve büyük özellikler `speckit-proje` skill'iyle (anayasa, spec, plan, görev, analiz, uygulama, yakınsama) yapılır. İş büyürse (3+ ekran, kullanıcı girişi, veritabanı, ödeme, birden fazla servis) dur ve `speckit-proje` akışına geç; o ana kadar yapılanı Varsayımlar ve mevcut kod olarak devret.

## Temel İlkeler

- Kullanıcı kodlama bilmez; kurulum, test ve yayını sen yaparsın, ona komut yazdırmazsın.
- Soru sorma; makul varsayılanı seç ve teslimde tek satırla belirt. Tek istisna: sonucu tamamen değiştirecek, tahmin edilemeyen bir bilgi (ör. hangi müşteri verisi) varsa en fazla 1 soru.
- Portföy standartları küçük işte de geçerli: "ThirdHand AI tarafından yapılmıştır" imzası, sırlar koda yazılmaz.

## Akış

### 1. İstek analizi (sessiz)
Eksik gereksinimleri tahmin et, modern varsayılanları seç. `references/proje-plan-template.md` ile 5-10 maddelik kısa plan çıkar; onay beklemeden uygula.

### 2. Uygulama
- Tek dosya önceliği: mümkünse tek HTML veya tek React dosyası, CDN kütüphaneleri, Tailwind.
- Kütüphane kullanımını Context7 MCP ile güncel dokümandan doğrula.
- Tüm hata durumlarını ele al (boş, yükleniyor, hata mesajı).

### 3. Test
`scripts/test_project.py` ile uç noktaları ve arayüz bileşenlerini kontrol et; ayrıca uygulamayı gerçekten açıp ana senaryoyu bir kez dene. Kod üretildiyse `kod-guvenlik-test` hızlı kontrolünü uygula.

### 4. Yayın
Öncelik sırası:
1. Kullanıcının görüp paylaşacağı tek sayfa: Claude Artifact olarak yayınla.
2. Kalıcı küçük uygulama: kendi Coolify sunucusu (seymata.com) ve Coolify MCP.
3. Statik site: Netlify veya Vercel MCP.
Platform ayrıntıları `references/deployment-guide.md` içinde (Railway yalnız kullanıcı isterse).

### 5. Teslim
Çalışan adres veya artifact, 3-5 satırlık kullanım notu, kaynak kodun yeri. Sonraki adım olarak, ürün kalıcı olacaksa "bunu speckit-proje ile ürüne dönüştürelim" önerisi.

## Teknoloji varsayılanları
- Arayüz: React + Tailwind veya düz HTML; Next.js yalnız sunucu tarafı gerekiyorsa.
- Arka uç gerekiyorsa: Node.js + Express veya Python FastAPI; veri için mevcut Supabase.
- LLM çağrısı varsa anahtar istemciye inmez; sunucu tarafı küçük bir proxy kullanılır, model OpenRouter "latest" takma adıyla seçilir.

## Referanslar
- `references/proje-plan-template.md`: kısa plan şablonu
- `references/best-practices.md`: kod standartları
- `references/deployment-guide.md`: platforma göre yayın
- `scripts/test_project.py`: otomatik test
