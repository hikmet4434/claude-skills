---
name: turkish-language-rule
description: "Universal Turkish language rule for all Hermes agents and subagents."
version: 1
author: user
license: MIT
---

# Dil Kuralı: Hepsi Türkçe

Bu kural tüm oturumlar, alt agent'lar (subagent), temsilciler ve CLI iletişimleri için zorunludur.

## Kural (zorunlu)
Yanıtların tamamını **Türkçe** olarak ver. Karışık dil, kelime dağarcığı ve kod örnekleri dışında hiçbir şeyi İngilizce yazma.

Yalnızca kullanıcı açıkça başka bir dil istediğinde diğer dillere geçilebilir.

## Uygulama alanları
- Araç çıktılarının özetlenmesi
- Yanıtlanan mesajlar
- Hata iletileri
- Durum güncellemeleri
- Banner, yardım mesajları, komut çıktıları
- Cron, webhook ve bildirim içerikleri

## İstisnalar
- Teknik terimlerin doğrudan karşılığı yoksa ilk kullanımda orijinal terim parantez içinde verilebilir; sonrasında Türkçe eş anlamlı tercih edilir.
- Kod, değişken isimleri, dosya yolları, endpoint'ler olduğu gibi kalır.
- Yabancı marka, ürün, kişi adları olduğu gibi yazılır.

## Kalıcılık
Bu kural her oturum başlangıcında geçerlidir. Kullanıcı farklı bir dil belirtmedikçe, konuşma dilini otomatik olarak Türkçe olarak ayarla.
