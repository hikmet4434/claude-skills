# İtiraz Kütüphanesi

## Nasıl Kullanılır

Her itiraz için beş alan doldurulur. Alanları boş bırakma — özellikle **kanıt noktası** boşsa o itirazı henüz yönetemiyorsun demektir.

**Altın kural:** Önce onayla, sonra yönlendir. Savunmaya geçmek itirazı büyütür.
**İkinci kural:** İtiraz bir sorudur, saldırı değil. "Neden böyle düşünüyorsunuz?" çoğu itirazı çözer.

---

## Hızlı Referans Tablosu (görüşme sırasında bak)

| İtiraz | Tek satırlık yanıt | Kanıt |
|--------|--------------------|-------|
| "Çok pahalı" | "Neye kıyasla pahalı olduğunu anlayabilir miyim?" | Maliyet karşılaştırma tablosu |
| "Bütçe yok" | "Bütçe hiç yok mu, yoksa bu çeyrek mi dolu?" | ROI / geri ödeme hesabı |
| "Şu an sırası değil" | "Ne değişirse sırası gelir?" | Bekleme maliyeti hesabı |
| "Zaten X kullanıyoruz" | "X'te en çok neyi değiştirmek isterdiniz?" | Yan yana karşılaştırma |
| "Patronumla konuşmalıyım" | "Ona neyi göstermeniz gerekir? Onu hazırlayayım." | Şampiyon tek sayfalık özeti |
| "Mevcut sistem iş görüyor" | "Görüyor. Şu an kaç saat/lira'ya mal oluyor?" | Statüko maliyeti |
| "Entegre olur mu?" | "Hangi sistemler? Listeyi 24 saatte netleştireyim." | Entegrasyon listesi + API dokümanı |
| "Güvenlik endişem var" | "Hangi başlık — veri konumu, erişim, uyumluluk?" | Güvenlik dokümanı, sertifikalar |

---

## Detaylı İtiraz Kayıtları

### "Çok pahalı"

**Arkasındaki gerçek endişe** — Üçünden biri: (a) değeri görmedi, (b) bütçe gerçekten yok, (c) daha ucuz alternatif var. Hangisi olduğunu bilmeden yanıt verme.

**Yanıt yaklaşımı**
> "Anlıyorum. Neye kıyasla pahalı — mevcut çözümünüze mi, başka bir teklife mi, yoksa ayrılan bütçeye mi?"

Cevaba göre üç ayrı yola git:
- *Mevcut çözüme kıyasla* → toplam sahip olma maliyeti karşılaştırması (gizli maliyetler: işgücü, hata, kayıp)
- *Başka teklife kıyasla* → farklılaştırıcılar + neden fiyat farkı var
- *Bütçeye kıyasla* → aşağıdaki "bütçe yok" kaydına geç

**Kanıt noktası:** `[DOLDUR: toplam maliyet karşılaştırma tablosu]`
**Takip sorusu:** "Bu yatırımın kendini ne kadar sürede amorti etmesi beklenirdi?"

**Asla yapma:** İlk itirazda indirim teklif etmek. İndirim, fiyatın baştan şişik olduğunu doğrular ve sonraki her müzakerede geri gelir.

---

### "Bu çeyrek bütçe yok"

**Arkasındaki gerçek endişe** — Genelde aciliyet eksikliği. Gerçekten bütçesi olmayan alıcı bunu ilk 10 dakikada söyler; sonda söylüyorsa nazik bir "hayır"dır.

**Yanıt yaklaşımı**
> "Bütçe hiç ayrılmamış mı, yoksa bu çeyrekliği dolu mu? İkisi çok farklı yollar."

- *Hiç yok* → gerekçelendirme yolu var mı? Kim onaylardı? Şampiyona iç satış materyali ver.
- *Bu çeyrek dolu* → gelecek çeyreğin planlama takvimi ne zaman? O takvime **şimdi** gir. Pilot/küçük başlangıç mümkün mü?

**Kanıt noktası:** `[DOLDUR: geri ödeme süresi hesabı]`
**Takip sorusu:** "Gelecek dönem bütçesi ne zaman şekilleniyor? O konuşmada masada olmak için şimdi ne yapmalıyım?"

---

### "Zaten X'i kullanıyoruz"

**Arkasındaki gerçek endişe** — Değiştirme maliyeti ve riski. Ürün karşılaştırması değil, **geçiş korkusu**.

**Yanıt yaklaşımı**
> "İyi bir seçim. X'te işleyen tarafı bozmak istemem — sizde en çok hangi kısmı değiştirmek isterdiniz?"

Bu soru rakibi kötülemeden boşluğu buldurur. Rakibi asla kötüleme: mevcut çözümü seçen kişi çoğu zaman karşındaki kişidir.

**Kanıt noktası:** `[DOLDUR: yan yana karşılaştırma + geçiş yapmış müşteri vakası]`
**Takip sorusu:** "Sözleşmeniz ne zaman yenileniyor?"

---

### "Patronumla konuşmam lazım"

**Arkasındaki gerçek endişe** — Ya gerçekten yetkisi yok, ya da nazikçe erteliyor.

**Yanıt yaklaşımı**
> "Tabii. Ona neyi göstermeniz gerekiyor? Bunu sizin için hazırlayabilirim — hatta isterseniz 20 dakikalık ortak bir görüşme yapalım, teknik sorulara ben cevap vereyim."

**Kanıt noktası:** Şampiyona iç satış tek sayfalık özeti (bkz. one-pager-templates.md)
**Takip sorusu:** "Bu kararda sizden başka kimin onayı gerekiyor?"

**Kritik:** Bu itiraz nitelendirmenin eksik olduğunu gösterir. Yetki (ANUM'daki A) ilk görüşmede netleşmeliydi.

---

### "Mevcut sistem iş görüyor"

**Arkasındaki gerçek endişe** — Statüko. Satışın en güçlü rakibi hiçbir zaman başka bir ürün değil, **hiçbir şey yapmamaktır**.

**Yanıt yaklaşımı**
> "Görüyor, katılıyorum. Sorum şu: şu anki hâli size ayda kaç saate ve kaç liraya mal oluyor? Rakamı bilmiyorsak birlikte kabaca çıkaralım."

Statükoyu kırmanın tek yolu **maliyetini görünür kılmak**. Görünmeyen maliyet, sıfır maliyettir.

**Kanıt noktası:** `[DOLDUR: hareketsizlik maliyeti hesabı]`
**Takip sorusu:** "Bu maliyet iki katına çıksa ne zaman harekete geçerdiniz?"

---

### "X ile entegre oluyor mu?"

**Arkasındaki gerçek endişe** — Kendi ekibinin iş yükü. "Bunu kurmak benim başımı ağrıtacak mı?"

**Yanıt yaklaşımı**
> "Hangi sistemler tam olarak? Listeyi alayım, 24 saat içinde her biri için net cevap vereyim — hangileri hazır, hangileri API ile, hangileri değil."

**Bilmiyorsan bilmiyorum de.** Teknik alıcıya verilen yanlış "evet", anlaşmayı uygulama aşamasında öldürür ve referansı da yok eder.

**Kanıt noktası:** Entegrasyon listesi + API dokümanı + benzer yığında bir müşteri
**Takip sorusu:** "Kurulum sırasında sizin ekibinizden ne kadar zaman ayrılabilir?"

---

### "Güvenlik endişem var"

**Arkasındaki gerçek endişe** — Sorumluluk. Bir şey olursa kim hesap verecek?

**Yanıt yaklaşımı**
> "Hangi başlık öncelikli — veri nerede tutuluyor, kim erişiyor, yoksa uyumluluk mu? Her biri için ayrı cevap vereyim."

Genel güvence verme ("çok güvenliyiz"). Somut ol: veri konumu, şifreleme, erişim kontrolü, sertifikalar, veri işleme sözleşmesi, KVKK/GDPR uyumu, olay müdahale süresi.

**Kanıt noktası:** `[DOLDUR: güvenlik dokümanı, sertifikalar, DPA]`
**Takip sorusu:** "Güvenlik ekibinizle doğrudan bir oturum yapalım mı?"

---

## Şablon — Yeni İtiraz Ekleme

```
### "[İtirazın tam duyulduğu cümle]"

**Arkasındaki gerçek endişe** — [Söylenenle kastedilen arasındaki fark]

**Yanıt yaklaşımı**
> "[Onaylayan + yönlendiren tek cümle]"

[Dallanma varsa: cevaba göre 2–3 yol]

**Kanıt noktası:** [Somut veri / doküman / vaka]
**Takip sorusu:** "[Konuşmayı ilerleten açık uçlu soru]"

**Asla yapma:** [Bu itirazda en sık yapılan hata]
```

---

## Rol Yapma Senaryoları (ekip eğitimi için)

**Senaryo 1 — Sert fiyat itirazı.** Alıcı ilk 5 dakikada fiyat sorar ve duyunca "çok yüksek" der. Temsilci indirime girmeden değeri kurmalı.
**Başarı ölçütü:** Temsilci indirim teklif etmedi ve "neye kıyasla?" sorusunu sordu.

**Senaryo 2 — Sessiz komite üyesi.** Görüşmede hiç konuşmayan bir kişi var; aslında engelleyici. Temsilci onu konuşmaya çekmeli.
**Başarı ölçütü:** Temsilci doğrudan ona bir soru yöneltti ve endişesini yüzeye çıkardı.

**Senaryo 3 — Rakip karşılaştırması.** Alıcı elinde rakibin teklifiyle geliyor ve maddeleri karşılaştırmak istiyor. Temsilci rakibi kötülemeden farkı kurmalı.
**Başarı ölçütü:** Temsilci rakip hakkında olumsuz tek kelime etmedi, kendi farklılaştırıcısını iş sonucuna bağladı.

**Senaryo 4 — "Düşünelim, döneriz."** Klasik yumuşak ret. Temsilci somut bir sonraki adım almadan görüşmeyi bitirmemeli.
**Başarı ölçütü:** Takvimde tarihli bir sonraki adım var ya da temsilci net bir "hayır" alıp fırsatı kapattı.
