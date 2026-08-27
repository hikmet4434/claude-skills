# Skill Yazım Kuralları

## Frontmatter

```yaml
---
name: skill-adi
description: "..."
license: MIT
metadata:
  version: "1.0.0"
  language: tr
---
```

### `name`
- Klasör adıyla **birebir aynı**
- Yalnızca `a-z`, `0-9` ve tire — Türkçe karakter ve boşluk yok
- `satış-destekleme` ✕ · `satis-destekleme` ✓
- Güncellerken **değiştirme**; `-v2` eklemek yeni bir skill yaratır ve eskisi ortada kalır

### `description` — skill'in en önemli alanı

Tetikleme buradan yapılır. Gövde ne kadar iyi olursa olsun, açıklama zayıfsa skill hiç çağrılmaz.

**İçermesi gerekenler:**
1. Ne ürettiği — tek cümle, somut
2. Tetikleyici kelimeler — kullanıcının yazacağı gerçek ifadeler
3. Türkçe **ve** İngilizce karşılıklar
4. Sınır çizgisi — hangi durumda başka bir skill'e yönlendirdiği

**Kalıp:**
```
"[Ne ürettiği]. Kullanıcı şunlardan bahsettiğinde kullan: [tetikleyici 1],
[tetikleyici 2], [tetikleyici 3]... Ayrıca [özel durum] olduğunda da tetiklenir.
[Komşu konu] için [diğer-skill] skilline bak."
```

**Zayıf:** `"Satış materyalleri oluşturur."`
**Güçlü:** `"Satış temsilcilerinin kullandığı materyalleri üretir: sunum, tek sayfalık özet, itiraz kütüphanesi, demo senaryosu. Kullanıcı şunlardan bahsettiğinde kullan: satış materyali, pitch deck, one-pager, itiraz yönetimi, objection handling, demo script, satış kılavuzu, playbook, sales enablement, satış ekibime ne vermeliyim..."`

**Uzunluk:** 300–800 karakter iyi çalışır. Çok kısa → tetiklenmez. Çok uzun → sinyal seyrelir.

---

## Gövde

| Kural | Açıklama |
|-------|----------|
| Emir kipi | "yapmalısın" değil "yap" |
| Tablo tercih et | Karşılaştırma, kriter, eşleştirme tabloda daha okunur |
| Kısa madde | 2 satırı geçen madde paragraf olmuş demektir |
| 400 satır sınırı | Aşarsa detayı `references/` altına taşı |
| Karar kuralları yaz | "X ise Y yap" — model bunu uygular; belirsiz tavsiye uygulanmaz |
| Sık hatalar bölümü | En değerli bölümlerden biri; neyin yanlış gittiğini yaz |
| Dürüstlük kuralları | Uydurma yasağı, kanıt gerekliliği — açıkça yaz |

### Bölüm sırası (önerilen)
```
1. Başlık + tek paragraf: bu skill ne yapar
2. Başlamadan önce: hangi bağlamı oku, ne sor
3. Temel ilkeler
4. Ana çerçeve / adımlar
5. Referans dosyalarına bağlantılar
6. Sık yapılan hatalar
7. Çıktı formatı
8. İlgili skiller
```

---

## `references/` Klasörü

- Her dosya tek bir konuya odaklansın
- SKILL.md'den **göreli bağlantı**: `[references/x.md](references/x.md)`
- Bağlantı verilen her dosya var olmalı — kırık bağ, en sık görülen kusur
- Dosya adları da küçük harf-tire

**Ne SKILL.md'de, ne referansta?**

| SKILL.md | references/ |
|----------|-------------|
| Karar kuralları | Uzun şablonlar |
| Çerçeve ve adımlar | Örnek metinler |
| Kısa tablolar | Detaylı tablolar |
| Ne zaman ne yapılır | Nasıl yapılır, adım adım |

---

## `scripts/` Klasörü

- `chmod +x` verilmiş olmalı
- Bağımlılıkları başta kontrol etsin ve yoksa anlaşılır hata versin
- Yıkıcı işlemler için `--kuru` (dry-run) bayrağı bulunsun
- Yol varsayımı yapmasın; `$HOME` ve göreli yol kullansın

---

## Yayın Öncesi Kontrol Listesi

**Biçim**
- [ ] Frontmatter anahtarları İngilizce (`name`, `description`)
- [ ] `name` = klasör adı, küçük harf-tire
- [ ] `description` tetikleyici kelimeleri içeriyor (TR + EN)
- [ ] Tüm `references/` bağlantılarının dosyası var
- [ ] `scripts/` çalıştırılabilir

**İçerik**
- [ ] Gövde emir kipinde, uygulanabilir
- [ ] Karar kuralları belirsiz değil
- [ ] "Sık yapılan hatalar" bölümü var
- [ ] Uydurma/kanıt kuralları yazılı
- [ ] SKILL.md < 400 satır

**Güvenlik**
- [ ] API anahtarı, token, parola yok
- [ ] Kişisel veri yok
- [ ] Yıkıcı komut varsayılan olarak çalışmıyor

**Dağıtım**
- [ ] `dagit.sh --kuru` ile prova yapıldı
- [ ] Kurulum `--dogrula` ile kontrol edildi
- [ ] `.skill` paketi kullanıcıya gönderildi (Claude masaüstü için)

---

## Sık Yapılan Hatalar

| Hata | Sonuç | Çözüm |
|------|-------|-------|
| Türkçe frontmatter anahtarı (`isim:`, `Açıklama:`) | Skill hiç yüklenmez | `name:`, `description:` |
| `name` ≠ klasör adı | Yüklenmez | Eşitle |
| Türkçe karakterli isim | Yol sorunları | `satis-destekleme` |
| Zayıf açıklama | Skill hiç tetiklenmez | Tetikleyici kelime listesi ekle |
| Olmayan dosyaya bağlantı | Model dosyayı arar, bulamaz | Bağlantıyı ya da dosyayı düzelt |
| Her şeyi SKILL.md'ye yığmak | Bağlam şişer, kalite düşer | `references/`e taşı |
| Belirsiz tavsiye | Model uygulamaz | Karar kuralına çevir |
| Sadece bir ajana kurmak | Diğer 60 ajanda yok | `dagit.sh` ile hepsine kur |
