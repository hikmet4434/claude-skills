---
name: kod-guvenlik-test
description: Her kod yaziminda otomatik guvenlik taramasi ve test olusturur. SQL injection, XSS, CSRF gibi guvenlik aciklarini tespit eder. Unit test, integration test ve end-to-end test otomatik olusturur. Yeni kod yazildiginda, mevcut kod guncellendiginde, deployment oncesi ve production'a gitmeden once kullan.
---

# Kod Guvenlik & Test

Bu skill, kodun guvenligini ve kalitesini otomatik kontrol eder.

## Otomatik Aktivasyon
Herhangi bir kod olusturuldugunda veya guncellendiginde otomatik devreye girer.

## Guvenlik Kontrolu
Kodu otomatik tara:
- SQL Injection riskleri
- XSS aciklari
- CSRF token eksikligi
- Hardcoded credentials
- Insecure dependencies

Her sorun icin: Sorunlu kod + Guvenli alternatif + Aciklama goster.
Kritik guvenlik sorunlarini otomatik duzelt.

## Test Olusturma
- Unit Tests: Her fonksiyon icin test olustur (>%80 coverage)
- Integration Tests: Tum API endpoints
- E2E Tests: Core user flows

## Guvenlik Kontrol Listesi
- Authentication: Password hash, JWT guvenlik, rate limiting
- Input Validation: SQL injection, XSS, file upload korumasi
- Data Protection: Encryption, HTTPS, secure cookies, CORS, CSP
- Error Handling: Guvenli error mesajlari, logging
- Dependencies: npm audit, guncel versiyonlar
