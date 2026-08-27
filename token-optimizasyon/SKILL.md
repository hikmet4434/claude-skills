---
name: token-optimizasyon
description: Kodlari daha verimli, daha az token tuketen versiyonlara donusturur. Gereksiz aciklamalari, tekrarlanan kodlari ve verbose yapilari optimize eder. Token limitine yaklasirken kullaniciyi uyarir. Her kod yaziminda otomatik, uzun chatler icin token tasarrufu, limit dolmadan once uyari ve kod refactoring icin kullan.
---

# Token Optimizasyon

Bu skill, kodlari ve yanitlari token-efficient hale getirir.

## Otomatik Aktivasyon
Token kullanimi %85 oldugunda veya kod yazildiginda otomatik aktif olur.

## Token Tasarrufu Stratejileri
1. Gereksiz aciklamalari kaldir, arrow function kullan, kod tekrarini onle
2. Tum component'leri tek HTML/React dosyasinda topla
3. Local files yerine CDN kullan

## Token Uyari Sistemi
- %85: Kullaniciyi uyar
- %90: Ozet olusturup yeni chat oner

## Best Practices
DO: Tek dosya yaklasimi, arrow functions, Tailwind inline styles, CDN kullan
DON'T: Gereksiz aciklamalar, separate CSS files, local dependencies
