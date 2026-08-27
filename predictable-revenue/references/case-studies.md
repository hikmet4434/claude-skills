# Vaka Çalışmaları

## Salesforce.com — Metodolojinin Doğduğu Yer

**Durum (2003):** Salesforce hızlı büyüyordu ama büyüme neredeyse tamamen inbound ve ağızdan ağıza (Tohumlar ve Ağlar) kaynaklıydı. Outbound denemeleri klasik soğuk aramayla yapılıyor, sonuç vermiyordu. AE'ler hem arıyor hem kapatıyordu ve prospecting sürekli ertelenmişti.

**Müdahale (Aaron Ross):**
1. Prospecting'i kapanıştan tamamen ayıran ayrı bir ekip kuruldu (bugünkü SDR rolü).
2. Telefon yerine kısa, kişiselleştirilmiş **referans isteyen** e-postalar kullanıldı — karar vericinin üstündeki yöneticiye.
3. Ekip metriği "aranan kişi sayısı" değil, **AE tarafından kabul edilmiş nitelikli fırsat** oldu.
4. Süreç ölçülüp tekrarlanabilir hale getirildi; SDR sayısı ile pipeline arasında doğrusal ilişki kuruldu.

**Sonuç:** Küçük bir outbound ekibi, birkaç yıl içinde **100M$+ yinelenen gelire** katkı verdi. Yanıt oranları klasik cold email'in kat kat üzerine çıktı (%1–3 → %9–15 bandı).

**Çıkarılan ders:** Outbound'u öngörülebilir yapan şey daha iyi bir script değil, **rol uzmanlaşması + ölçülebilir süreç**tir.

---

## HubSpot — Uzmanlaşmanın Kurumsallaşması

**Durum:** HubSpot inbound pazarlamanın öncüsüydü — yani "Ağlar" konusunda dünya çapında güçlüydü. Ancak inbound lead hacmi büyüdükçe AE'ler nitelendirilmemiş lead'lerle boğuldu.

**Müdahale:** Inbound lead'leri nitelendiren ayrı bir katman kuruldu (MDR / inbound SDR). AE'lere yalnızca kabul kriterlerini geçen fırsatlar iletildi. İlk yanıt süresi kritik metrik yapıldı.

**Sonuç:** AE verimliliği ve kazanma oranı belirgin arttı; işe alım "kaç lead geliyorsa o kadar MDR" formülüne bağlandı.

**Çıkarılan ders:** Uzmanlaşma sadece outbound'a özgü değil. Inbound hacmi de kendi nitelendirme rolünü gerektirir. Ayrıca güçlü bir inbound motoru bile tek başına öngörülebilirlik vermez — kaç lead geleceğini kontrol edemezsin.

---

## Tipik SaaS Ölçekleme Hikâyesi (Kompozit Örnek)

**0 → 1M$ ARR**
- Kurucu satışı, Tohum ağırlıklı
- Outbound yok veya kurucunun kişisel e-postaları
- **Risk:** Kurucu satıştan çıktığında büyüme durur
- **Aksiyon:** Kurucu, outbound'un çalıştığını kendi eliyle kanıtlasın; şablonları ve ICP'yi yazıya dök

**1 → 3M$ ARR**
- İlk 2 SDR + 2 AE
- ICP daralır, kayıp analizi başlar
- **Risk:** Süreç kanıtlanmadan erken işe alım
- **Aksiyon:** 2 SDR ile başla, 3. ayda kıyaslara bak, tutuyorsa 2 SDR daha

**3 → 10M$ ARR**
- 5+ SDR → SDR Yöneticisi zorunlu
- Outbound ve inbound ekipleri ayrışır
- CSM rolü kurulur, NRR ölçülmeye başlar
- **Risk:** SDR devir hızı (12–18 ay ömür) → terfi yolu yoksa en iyiler gider
- **Aksiyon:** Yazılı terfi kriterleri, SDR→AE hattı

**10M$+ ARR**
- Segmentasyon: SMB / mid-market / enterprise ayrı ekipler
- Coğrafi bölgeler, sektör dikeyleri
- Gelir operasyonları (RevOps) rolü
- **Risk:** Süreç ağırlaşması, kıyasların sessizce bozulması
- **Aksiyon:** Çeyreklik verimlilik incelemesi, huni dönüşümlerinin sürekli izlenmesi

---

## Başarısızlık Örüntüleri

| Örüntü | Belirti | Kök neden |
|--------|---------|-----------|
| Erken SDR alımı | 6 ay sonra sıfır SQO | Süreç kanıtlanmamıştı, SDR süreci icat edemez |
| Tek SDR alımı | Başarısızlık teşhis edilemiyor | Karşılaştırma noktası yok |
| Hacim tuzağı | Çok e-posta, az fırsat | Sadece adede prim veriliyor, kaliteye değil |
| Devir kaybı | Fırsatlar CRM'de ölüyor | Yazılı devir kriteri ve toplantısı yok |
| ICP genişliği | Yanıt oranı %3 | Herkese yazılıyor |
| Terfi yolsuzluğu | 9. ayda toplu ayrılma | Kariyer haritası gösterilmemiş |
| Tek kanal bağımlılığı | Bir algoritma değişimi geliri yarıyor | Tohum/Ağ/Mızrak dengesizliği |

---

## Uyarlama Notu

Bu vakalar ABD B2B SaaS bağlamından gelir. Farklı pazarlarda uyarlanması gerekenler:
- **Yanıt oranları** pazara ve sektöre göre değişir — kendi taban çizgini 4–6 haftada ölç, kıyasları hedef değil pusula olarak kullan
- **E-posta kültürü** zayıf olan pazarlarda LinkedIn ve telefon karışımı gerekebilir; süreç mantığı (referans iste, uzmanlaş, ölç) aynı kalır
- **KVKK/GDPR** gibi düzenlemeler outbound veri kaynaklarını ve onay gerekliliklerini etkiler — liste kaynağını ve saklama süresini baştan netleştir
