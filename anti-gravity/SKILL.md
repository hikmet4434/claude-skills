---
name: anti-gravity
description: |
  Tum komut ve kod calistirma islemlerinde otomatik takilma tespiti, yeniden deneme ve hata duzeltme sistemi.
  Her Bash komutu, kod calistirma veya uzun suren islem basladiginda otomatik devreye girer.
  Normal suresi 1 dakikadan az olan komutlar 1 dakikayi gecerse hemen durdurur, hatayi bulur ve duzeltir.
  30 saniyeye kadar surmesi beklenen komutlarda basarisizlik olursa 2 kez otomatik yeniden dener.
  Su durumlarda MUTLAKA kullan: komut calistirma, pip/npm install, kod derleme, API cagrisi, dosya isleme,
  herhangi bir terminal islemi, paket kurulumu, test calistirma. Hata mesaji gormeden once de aktif olur.
---

# Anti-Gravity Skill

Bu skill, tum komut ve islemlerin takilmasini onler, hatalari otomatik tespit eder ve duzeltir.

## Temel Kurallar

Bu skill **her komut calistirmasinda** aktif olmalidir. Istisna yoktur.

### Sure Esikleri

| Islem Turu | Normal Sure | Maksimum Tolerans | Aksiyon |
|------------|-------------|-------------------|---------|
| Hizli komut (ls, echo, cat...) | < 5 sn | 15 sn | Durdur > Hata bul > Duzelt |
| Orta komut (pip install, npm...) | 5-30 sn | 60 sn | 2 kez yeniden dene > Durdur > Duzelt |
| Uzun komut (buyuk download, derleme...) | 30-60 sn | 120 sn | Durdur > Hata bul > Duzelt |

### Yeniden Deneme Politikasi

- Normal suresi 30 saniye ve alti olan komutlar basarisiz olursa: 2 kez yeniden dene
- Her denemede farkli yaklasim uygula (orn: --no-cache, farkli flag, alternatif komut)
- 2 denemeden sonra hala basarisizsa: tam hata analizi yap ve kullaniciya rapor ver

## Uygulama Protokolu

### 1. Komut Baslamadan Once: Sure Tahmini
Her komutu calistirmadan once zihinsel olarak sure tahmini yap.

### 2. Komut Calisirken: Aktif Izleme
- Cikti uretiliyor mu? (Sessiz kalmak = takilma sinyali)
- Dongusel ayni satirlar mi donuyor? (Sonsuz dongu)
- Beklenmedik bir sey mi soruyor? (stdin bekleme)

### 3. Zaman Asimi Tespiti
Komut beklenen sureden fazla surerse:
1. Komutu durdur
2. Son ciktiyi analiz et
3. Olasi nedenleri listele
4. En olasi nedeni sec ve duzeltici adimi uygula
5. Duzeltilmis komutla yeniden dene

### Paket Kurulumu Kurallari
```bash
# Birinci deneme
pip install paket --break-system-packages
# Basarisiz olursa ikinci deneme
pip install paket --break-system-packages --no-cache-dir
# Hala basarisiz: mirror degistir
pip install paket --break-system-packages --index-url https://pypi.org/simple/
```

### Ag Istekleri
- Timeout ekle: --max-time 30 veya --connect-timeout 10
- Basarisiz olursa 2 kez daha dene

## Takilma Belirtileri
1. Sessizlik - 30 saniye ust uste hic cikti yok
2. Tekrar - Ayni satir 5+ kez ust uste yazildi
3. "Waiting" mesajlari
4. Sonsuz dongu gorunumu
5. EOF beklentisi

## Kullaniciya Bildirim
Hata tespit edildiginde: Neden + Cozum + Sonuc bildir.
Basariyla duzeltildiginde: Kisa bilgi ver.

Bu skill her oturumda ve her komut calistirmasinda aktif kalir.
