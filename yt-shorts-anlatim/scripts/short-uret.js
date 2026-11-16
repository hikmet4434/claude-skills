#!/usr/bin/env node
// Anlatım tarzı dikey Short/Reel üretir (1080x1920, ~55-58 sn): metin.json -> ses -> hizalama -> çizim -> mp4.
// Hattın (seymata-demo-studio/ytv/lib/shorts-anlatim.js) bağımsız sürümüdür; aynı çiziciyi (assets/motor) kullanır.
//
//   node short-uret.js --metin metin.json --cikti short.mp4 [seçenekler]
//
// Ses (birini seç; hiçbiri yoksa Gemini TTS çağrılır; anahtar: GEMINI_API_KEY ya da ~/.config/ytv/gemini-anahtar.txt):
//   --ses anlatim.wav           hazır anlatım sesi (metnin tamamı tek parça okunmuş olmalı)
//   --tts-yanit yanit.json      başka bir araçla alınmış Gemini TTS yanıtı (base64 ses buradan çıkarılır)
//   --ses-metni                 yalnızca seslendirilecek metni ve üslup yönergesini yazdırır, üretim yapmaz
// Görünüm ve kapanış kartı:
//   --tema mavi                 ana videonun teması: yesil|turkuaz|mavi|mor|pembe|turuncu|sari ya da ton açısı (0-359)
//   --kapak kapak.jpg           tam videonun kapağı        --link youtu.be/XXXX   tam videonun linki
//   --baslik "Tam video başlığı"   --kanal "Kanal adı"   --marka "ThirdHand AI"
// Diğer:
//   --onizleme                  ses üretmeden, yaklaşık zamanlarla her sahneden bir kare çizer (onizleme.jpg)
//   --calisma klasor            ara dosyaların yeri (varsayılan: çıktının yanında <ad>-calisma)
//   --ses-adi Achird  --tts-model gemini-3.8-flash-tts  --hedef 56.5  --son-pay 2.4
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const MOTOR = path.join(__dirname, '..', 'assets', 'motor');
const FPS = 30, W = 1080, H = 1920;
const TEMA = { yesil: 0, turkuaz: 58, mavi: 95, mor: 150, pembe: 205, turuncu: -88, sari: -68 }; // hattın tema adları (yeşil taban 113 derece)
const STIL = 'warm, sincere and natural, like telling a close friend something genuinely interesting; relaxed conversational Turkish with a smile in the voice, heartfelt, never an announcer or advertisement tone; lively, flowing pace with clear short pauses between sentences';
const STIL_EN = STIL.replace('conversational Turkish', 'conversational American English');
const KAPANIS = { tr: "Detaylı izlemek istersen, tam video YouTube'da.", en: 'Want the details? The full video is on YouTube.' };
const TIPLER = ['dev', 'soru', 'kapak', 'tanim', 'takvim', 'rakam', 'kutular', 'pano', 'liste', 'akis', 'etiket', 'ikili', 'pencere', 'bulut', 'kartlar'];
const IKONLAR = ['robot', 'kisi', 'bulut', 'laptop', 'laptopKapali', 'belge', 'para', 'saat', 'kilit', 'grafik', 'roket', 'dunya', 'sohbet', 'ayar', 'yildiz', 'telefon', 'kod'];

// ---------- yardımcılar ----------
function secenekler(a) {
  const o = {}; const bayrak = ['onizleme', 'ses-metni'];
  for (let i = 0; i < a.length; i++) { const k = a[i].replace(/^--/, ''); if (bayrak.includes(k)) o[k] = true; else o[k] = a[++i]; }
  return o;
}
function calistir(komut, arg, { zaman = 30 * 60000 } = {}) {
  return new Promise((coz, red) => {
    const p = spawn(komut, arg, { stdio: ['ignore', 'pipe', 'pipe'] });
    let o = '', e = ''; const t = setTimeout(() => { p.kill('SIGKILL'); red(new Error(`${komut} zaman aşımı`)); }, zaman);
    p.stdout.on('data', (x) => { o += x; }); p.stderr.on('data', (x) => { e += x; if (e.length > 2e6) e = e.slice(-1e6); });
    p.on('error', (x) => { clearTimeout(t); red(x); });
    p.on('close', (k) => { clearTimeout(t); k === 0 ? coz({ o, e }) : red(new Error(`${komut} hata (${k}): ${e.slice(-500)}`)); });
  });
}
const sure = async (f) => parseFloat((await calistir('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f])).o);
const uzunTireYok = (s) => String(s || '').replace(/\s*[—–]\s*/g, ', ').replace(/\s+/g, ' ').trim();
// sınırı aşan metin mümkünse kelime sınırından kesilir ("Arka Plan" 8 harfe "Arka Pla" diye değil "Arka" diye iner)
const kis = (s, n) => { const t = uzunTireYok(s == null ? '' : String(s)); if (t.length <= n) return t; const b = t.slice(0, n + 1).lastIndexOf(' '); return (b >= n / 2 ? t.slice(0, b) : t.slice(0, n)).trim(); };
const soyle = (c) => c.okunus || c.yazi;
function chrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const adaylar = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  const f = adaylar.find((x) => fs.existsSync(x)); if (!f) throw new Error('Chrome bulunamadı; CHROME ortam değişkeniyle yolunu verin.'); return f;
}

// ---------- metin.json doğrulama (hattaki temizle ile aynı kurallar) ----------
function temizle(r, { kapakVar = true } = {}) {
  const dil = r.dil === 'en' ? 'en' : 'tr'; const uyari = [];
  // altyazı kelime kelime eşleştirir (çiziciyle aynı sadeleştirme): vurgu öbekleri kelimelere bölünür, cümlede olmayan atılır
  const sade = (w) => String(w).toLocaleLowerCase(dil === 'en' ? 'en-US' : 'tr-TR').replace(/[^0-9a-zçğıöşü.]/g, '').replace(/\.$/, '');
  const vurguTemiz = (v, yazi) => { const var_ = new Set(yazi.split(' ').map(sade)); return [...new Set((Array.isArray(v) ? v : []).flatMap((x) => String(x).split(/\s+/)).filter((w) => sade(w) && var_.has(sade(w))))].slice(0, 3); };
  let satirlar = (r.satirlar || []).map((c) => { const yazi = kis(c && c.yazi, 150); return { yazi, okunus: kis(c && c.okunus, 200), vurgu: vurguTemiz(c && c.vurgu, yazi) }; }).filter((c) => c.yazi);
  // marka adını Türkçe heceleyen okunuş ("Cursor" -> "Körsır") çoğu zaman yanlış okutur; bilinçli bir düzeltme değilse kaldırılmalı
  satirlar.forEach((c, i) => { if (!c.okunus) return; const kucuk = c.okunus.toLocaleLowerCase('tr-TR'); const d = (c.yazi.match(/(?<![\p{L}\p{N}])[A-Z][a-z]+(?![\p{L}])/gu) || []).filter((w) => !kucuk.includes(w.toLocaleLowerCase('tr-TR'))); if (d.length) uyari.push(`${i}. cümlenin okunuşunda ad yeniden yazılmış (${d.join(', ')}); kullanıcı dinleyip istemediyse okunus'ta adı olduğu gibi bırak.`); });
  if (satirlar.length < 10) throw new Error(`Metin kısa (${satirlar.length} cümle); 18-21 cümle bekleniyor.`);
  satirlar = satirlar.slice(0, 24);
  const son = satirlar[satirlar.length - 1];
  // kapanis verilmişse (YouTube dışı içerik: ürün tanıtımı, Instagram hesabı, web sitesi) son cümleyi yazar belirler
  const ozelKapanis = !!(r.kapanis && typeof r.kapanis === 'object');
  if (!ozelKapanis) {
    if (!/youtube/i.test(son.yazi)) { satirlar.push({ yazi: KAPANIS[dil], okunus: '', vurgu: [] }); uyari.push('Son cümle tam videoya çağrı değildi; kapanış cümlesi eklendi.'); }
    if (!satirlar[satirlar.length - 1].vurgu.length) satirlar[satirlar.length - 1].vurgu = dil === 'en' ? ['full', 'video'] : ['tam', 'video'];
  } else if (/youtube/i.test(son.yazi) && r.kapanis.logo && r.kapanis.logo !== 'youtube') uyari.push('Son cümle YouTube diyor ama kapanış kartı YouTube değil; ikisini uyumlu yap.');
  const N = satirlar.length;
  const kelime = satirlar.reduce((t, c) => t + c.yazi.split(/\s+/).length, 0);
  if (kelime > (dil === 'en' ? 150 : 140)) uyari.push(`Metin uzun (${kelime} kelime); ${dil === 'en' ? '125-145' : '115-130'} kelime ~55 saniyeye sığar.`);
  satirlar.forEach((c, i) => { if (c.yazi.split(/\s+/).length > 13) uyari.push(`${i}. cümle uzun (${c.yazi.split(/\s+/).length} kelime).`); });
  const ikonTemiz = (x, v) => (typeof x === 'string' && x.trim() ? [...x.trim()].slice(0, IKONLAR.includes(x.trim()) ? 99 : 2).join('') : v);
  const anahtar = (i) => { const c = satirlar[i]; const k = (c.vurgu[0] || c.yazi.split(/\s+/).sort((a, b) => b.length - a.length)[0] || '').replace(/[^\p{L}\p{N}]/gu, ''); return kis(k, 9) || '✦'; };
  const sahneler = []; let onceki = -1, kapakKullanildi = false;
  for (const h of (r.sahneler || []).slice().sort((a, b) => (a.ilk | 0) - (b.ilk | 0))) {
    if (!h || !TIPLER.includes(h.tip)) { if (h && h.tip !== 'son') uyari.push(`Bilinmeyen sahne tipi atlandı: ${h && h.tip}`); continue; }
    const ilk = h.ilk | 0; if (ilk <= onceki || ilk >= N - 1) { uyari.push(`Sahne atlandı (ilk=${ilk} sıra dışı ya da son cümlede).`); continue; }
    const s = { tip: h.tip, ilk };
    if (s.tip === 'kapak' && (!kapakVar || kapakKullanildi)) s.tip = 'dev';
    if (s.tip === 'kapak') kapakKullanildi = true;
    if (h.etiket) s.etiket = kis(h.etiket, 24);
    if (h.hap && h.hap.metin && ['akis', 'etiket', 'bulut'].includes(s.tip)) uyari.push(`${ilk}. cümledeki ${s.tip} sahnesinde hap çizilmez; "${kis(h.hap.metin, 28)}" ekranda görünmeyecek.`);
    else if (h.hap && h.hap.metin) s.hap = { metin: kis(h.hap.metin, 28), renk: h.hap.renk === 'kirmizi' ? 'kirmizi' : 'sari', at: Math.max(ilk, Math.min(N - 2, h.hap.at == null ? ilk : h.hap.at | 0)) };
    if (h.kelime != null) s.kelime = String(h.kelime).split('|').slice(0, 2).map((x) => kis(s.tip === 'soru' ? x.replace(/\?+\s*$/, '') : x, 11)).filter(Boolean).join('|');
    for (const k of ['kontur', 'kopuk', 'cizili']) if (h[k] != null) s[k] = !!h[k];
    if (h.adet != null) s.adet = Math.max(1, Math.min(3, h.adet | 0));
    for (const k of ['ikon', 'sol', 'sag']) if (h[k] != null) s[k] = ikonTemiz(h[k], 'robot');
    if (Array.isArray(h.ikonlar)) s.ikonlar = h.ikonlar.slice(0, 6).map((x) => ikonTemiz(x, 'robot'));
    if (h.baslik != null) s.baslik = kis(h.baslik, 50);
    for (const [k, n] of [['kart', 16], ['blok', 16], ['ay', 9], ['gun', 3], ['yil', 4], ['ust', 22], ['buyuk', 12], ['ana', 14], ['yan', 14], ['solHap', 10], ['sonuc', 18]]) if (h[k] != null && typeof h[k] !== 'object') s[k] = kis(h[k], n);
    if (h.kart2 && h.kart2.metin) s.kart2 = { ust: kis(h.kart2.ust, 22), metin: kis(h.kart2.metin, 16) };
    if (Array.isArray(h.kutular)) s.kutular = h.kutular.slice(0, 3).map((x) => ({ ikon: ikonTemiz(x && x.ikon, 'robot'), etiket: kis(x && x.etiket, 12) }));
    if (Array.isArray(h.sutunlar) && h.sutunlar.length === 3) s.sutunlar = h.sutunlar.map((x) => kis(x, 12));
    if (Array.isArray(h.maddeler)) s.maddeler = h.maddeler.slice(0, 4).map((x) => ({ ikon: ikonTemiz(x && x.ikon, 'yildiz'), metin: kis(x && x.metin, 34) })).filter((x) => x.metin);
    if (Array.isArray(h.balonlar)) s.balonlar = h.balonlar.slice(0, 3).map((x) => kis(x, 16)).filter(Boolean);
    if (Array.isArray(h.etiketler)) s.etiketler = h.etiketler.slice(0, 2).map((x) => { const t = kis(x, 8); return t === String(x).trim() || String(x).trim().startsWith(t + ' ') ? t : ''; }).filter(Boolean); // sığmayan tek kelime kesilmez, atılır
    if (Array.isArray(h.kartlar)) s.kartlar = h.kartlar.slice(0, 2).map((x) => ({ ust: kis(x && x.ust, 22), metin: kis(x && x.metin, 14) }));
    const eksik = (s.tip === 'liste' && !(s.maddeler && s.maddeler.length >= 2)) || (s.tip === 'kartlar' && !(s.kartlar && s.kartlar.length)) || (s.tip === 'takvim' && !(s.ay && s.gun)) || (s.tip === 'rakam' && !s.buyuk);
    if (eksik) { uyari.push(`${ilk}. cümledeki ${s.tip} sahnesi eksik alan yüzünden atlandı.`); continue; }
    if (['dev', 'soru', 'kutular', 'kapak'].includes(s.tip) && !s.kelime) s.kelime = anahtar(ilk);
    sahneler.push(s); onceki = ilk;
  }
  // boşlukları kapat: ilk sahne 0'da başlar, hiçbir sahne iki cümleden uzun sürmez
  const dolu = []; let yedek = 0;
  for (let i = 0, j = 0; i < N - 1;) {
    const s = sahneler[j];
    if (s && s.ilk === i) { dolu.push(s); const sonraki = sahneler[j + 1] ? sahneler[j + 1].ilk : N - 1; i = Math.min(sonraki, i + 2); j++; }
    else if (s && s.ilk < i) j++;
    else { dolu.push({ tip: 'dev', ilk: i, kelime: anahtar(i), kontur: dolu.length % 2 === 0, ikon: '✦', adet: 1 }); i++; yedek++; }
  }
  if (yedek) uyari.push(`${yedek} cümleye sahne yazılmamıştı; yedek "dev" sahnesi eklendi.`);
  for (let i = 1; i < dolu.length; i++) if (dolu[i].tip === dolu[i - 1].tip && dolu[i].tip !== 'dev') uyari.push(`Art arda aynı sahne tipi: ${dolu[i].tip} (${dolu[i - 1].ilk} ve ${dolu[i].ilk}).`);
  dolu.push({ tip: 'son', ilk: N - 1 });
  const kp = ozelKapanis ? { etiket: kis(r.kapanis.etiket || '', 26), ust: kis(r.kapanis.ust || '', 44), alt: r.kapanis.alt == null ? null : kis(r.kapanis.alt, 64), logo: ['youtube', 'instagram', 'web', 'yok'].includes(r.kapanis.logo) ? r.kapanis.logo : 'yok' } : null;
  return { kapanis: kp, kayit: { dil, kaynak: kis(r.kaynak || '', 60), baslik: kis(r.baslik || '', 90), aciklama: kis(r.aciklama || '', 300), kanca: kis(r.kanca || '', 44), satirlar, sahneler: dolu }, uyari, kelime };
}

// ---------- ses ----------
function wavBaslik(n, hiz) {
  const b = Buffer.alloc(44); b.write('RIFF', 0); b.writeUInt32LE(36 + n, 4); b.write('WAVE', 8); b.write('fmt ', 12);
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(hiz, 24); b.writeUInt32LE(hiz * 2, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n, 40); return b;
}
// Gemini yanıtının herhangi bir sarmalından (ham yanıt, {body: ...}, MCP içerik dizisi) base64 sesi bulur
function sesiCikar(j) {
  const bul = (x) => {
    if (typeof x === 'string') { if (x.length < 200 || !/^\s*[[{]/.test(x)) return null; try { return bul(JSON.parse(x)); } catch { return null; } } // iç içe JSON metni
    if (!x || typeof x !== 'object') return null; if (x.inlineData && x.inlineData.data) return x.inlineData;
    for (const v of Object.values(x)) { const r = bul(v); if (r) return r; } return null;
  };
  const p = bul(j); if (!p) throw new Error('Yanıtta ses verisi (inlineData) bulunamadı.');
  let veri = Buffer.from(p.data, 'base64'); if (veri.slice(0, 4).toString() !== 'RIFF') veri = Buffer.concat([wavBaslik(veri.length, 24000), veri]);
  return veri;
}
// Hatla aynı yerlerden okunur; anahtar hiçbir zaman yazdırılmaz. Önerilen yer: ~/.config/ytv/gemini-anahtar.txt (0600).
function anahtarBul() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  const ev = require('os').homedir();
  for (const d of [process.env.GEMINI_ANAHTAR_DOSYA, path.join(ev, '.config', 'ytv', 'gemini-anahtar.txt'), path.join(ev, 'seymata-demo-studio', 'gemini-anahtar.txt')].filter(Boolean))
    if (fs.existsSync(d)) { const k = fs.readFileSync(d, 'utf8').trim(); if (k) return k; }
  return '';
}
async function geminiTts(metin, stil, model, sesAdi) {
  const y = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': anahtarBul() }, signal: AbortSignal.timeout(240000),
    body: JSON.stringify({ contents: [{ parts: [{ text: metin, speechMetadata: { style: stil } }] }], generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: sesAdi } } } } }) });
  const j = await y.json().catch(() => ({}));
  if (!y.ok) throw new Error(`Gemini TTS hatası ${y.status}: ${(j.error && j.error.message) || ''}`.slice(0, 300));
  return sesiCikar(j);
}
// Sesteki sessizlikler: [başlangıç, bitiş] (sn). bas/uz verilirse yalnız o aralığa bakılır.
async function duraklar(wav, esik, enaz, bas, uz) {
  const arg = ['-nostdin', '-hide_banner']; if (bas != null) arg.push('-ss', bas.toFixed(3), '-t', uz.toFixed(3));
  const { e } = await calistir('ffmpeg', [...arg, '-i', wav, '-af', `silencedetect=noise=${esik}:d=${enaz}`, '-f', 'null', '-']);
  const D = [], kay = bas || 0; let b = null;
  e.split('\n').forEach((l) => { let m; if ((m = l.match(/silence_start: (-?[0-9.]+)/))) b = Math.max(0, +m[1]); else if ((m = l.match(/silence_end: ([0-9.]+)/)) && b != null) { D.push([b + kay, +m[1] + kay]); b = null; } });
  return { D, acik: b == null ? null : b + kay };
}

// Cümle sınırları sesteki duraklamalardan bulunur (beklenen süre harf sayısıyla orantılı), sonra aradaki boşluklar kısaltılır.
// Model bazen iki cümleyi duraklamasız okur. Bu yüzden iki duraklama arasına en çok GRUP cümle sığabilir (eksik her sınır
// cezalıdır); böyle bir grubun iç sınırı harf oranıyla tahmin edilip yakındaki kısa sessizliğe çekilir. Grubun sesi bölünmez
// (kelime ortasından kesilmesin), yalnızca altyazı ve sahne zamanı ayrılır.
async function hizala(wav, kayit, dizin, { hedef = 56.5, sonPay = 2.4 } = {}) {
  const N = kayit.satirlar.length, harf = kayit.satirlar.map((c) => soyle(c).length);
  const toplamSes = await sure(wav);
  const ilk = await duraklar(wav, '-38dB', 0.10); let D = ilk.D; if (ilk.acik != null) D.push([ilk.acik, toplamSes]);
  D = D.reduce((o, d) => { const s = o[o.length - 1]; if (s && d[0] - s[1] < 0.15) s[1] = d[1]; else o.push(d.slice()); return o; }, []); // nefes, tıkırtı: tek duraklama
  const kBas = D.length && D[0][0] < 0.08 ? D.shift()[1] : 0;
  const kSon = D.length && D[D.length - 1][1] >= toplamSes - 0.05 ? D.pop()[0] : toplamSes;
  const on = [0]; harf.forEach((h, i) => on.push(on[i] + h)); // harf ön toplamı
  const hiz = (kSon - kBas) / on[N], INF = 1e9, M = D.length, GRUP = 4, CEZA = 0.6;
  const mal = (i, j, t0, t1) => { const f = (t1 - t0) - (on[j] - on[i]) * hiz; return f * f + (j - i - 1) * CEZA; }; // i..j-1 cümleleri t0-t1 arasında
  // en[k][j]: ilk k cümle j. duraklamada biterse en küçük bedel; geri[k][j] = [önceki duraklama (-1: baştan), gruptaki cümle sayısı]
  const en = Array.from({ length: N }, () => new Array(M).fill(INF)), geri = Array.from({ length: N }, () => new Array(M).fill(null));
  for (let k = 1; k < N; k++) for (let j = 0; j < M; j++) {
    const odul = 0.4 * (D[j][1] - D[j][0]);
    for (let g = 1; g <= Math.min(GRUP, k); g++) {
      if (k === g) { const c = mal(0, k, kBas, D[j][0]) - odul; if (c < en[k][j]) { en[k][j] = c; geri[k][j] = [-1, g]; } continue; }
      for (let p = 0; p < j; p++) { if (en[k - g][p] >= INF) continue; const c = en[k - g][p] + mal(k - g, k, D[p][1], D[j][0]) - odul; if (c < en[k][j]) { en[k][j] = c; geri[k][j] = [p, g]; } }
    }
  }
  let enaz = INF, son = null; // son grup konuşmanın bitişine kadar sürer
  for (let g = 1; g <= Math.min(GRUP, N); g++) {
    if (N === g) { const c = mal(0, N, kBas, kSon); if (c < enaz) { enaz = c; son = [-1, g]; } continue; }
    for (let j = 0; j < M; j++) { if (en[N - g][j] >= INF) continue; const c = en[N - g][j] + mal(N - g, N, D[j][1], kSon); if (c < enaz) { enaz = c; son = [j, g]; } }
  }
  let gruplar = [], yontem = 'duraklama';
  if (son) {
    let k = N, [j, g] = son, b = kSon;
    for (;;) { gruplar.unshift({ ilk: k - g, son: k - 1, a: j < 0 ? kBas : D[j][1], b }); k -= g; if (k <= 0) break; b = D[j][0]; [j, g] = geri[k][j]; }
  } else { yontem = 'oran'; gruplar = [{ ilk: 0, son: N - 1, a: kBas, b: kSon }]; } // çözüm yok: bütün metin harf oranına göre bölünür
  const ham = new Array(N); let birlesik = 0, ince = 0;
  for (const G of gruplar) {
    const kes = [];
    if (G.son > G.ilk) {
      birlesik += G.son - G.ilk;
      const top = on[G.son + 1] - on[G.ilk], uz = G.b - G.a, pay = Math.min(0.6, 0.18 * uz);
      const aday = (await duraklar(wav, '-30dB', 0.03, G.a, uz)).D.map(([x, y]) => (x + y) / 2).filter((x) => x > G.a + 0.25 && x < G.b - 0.25);
      let alt = G.a;
      for (let i = G.ilk; i < G.son; i++) {
        const tah = G.a + uz * (on[i + 1] - on[G.ilk]) / top;
        const yakin = aday.filter((x) => x > alt + 0.25 && Math.abs(x - tah) <= pay).sort((x, y) => Math.abs(x - tah) - Math.abs(y - tah))[0];
        if (yakin != null) ince++;
        alt = yakin != null ? yakin : Math.max(alt + 0.05, tah); kes.push(alt);
      }
    }
    for (let i = G.ilk; i <= G.son; i++) ham[i] = { a: i === G.ilk ? G.a : kes[i - G.ilk - 1], b: i === G.son ? G.b : kes[i - G.ilk] };
  }
  const ara = (i) => (/\?\s*$/.test(kayit.satirlar[i].yazi) ? 0.26 : 0.17), BAS = 0.15, P = 0.03;
  const konusma = gruplar.reduce((t, G) => t + (G.b - G.a), 0), bosluk = gruplar.slice(0, -1).reduce((t, G) => t + ara(G.son), 0) + BAS;
  const tempo = Math.min(1.10, Math.max(1, konusma / (hedef - bosluk)));
  let t = BAS; const zaman = new Array(N);
  gruplar.forEach((G, gi) => {
    G.yeni = t;
    for (let i = G.ilk; i <= G.son; i++) zaman[i] = { a: +(t + (ham[i].a - G.a) / tempo).toFixed(3), b: +(t + (ham[i].b - G.a) / tempo).toFixed(3) };
    t += (G.b - G.a) / tempo + (gi < gruplar.length - 1 ? ara(G.son) : 0);
  });
  const toplam = +(zaman[N - 1].b + sonPay).toFixed(3);
  // her grup ayrı dosyaya kesilir (uçları yumuşatılır), yeni anına yerleştirilip karıştırılır
  const cd = path.join(dizin, 'cumle'); fs.mkdirSync(cd, { recursive: true });
  const arg = ['-y', '-loglevel', 'error'];
  for (const [gi, G] of gruplar.entries()) {
    const a = Math.max(0, G.a - P), d = G.b + P - a, dosya = path.join(cd, `c${gi}.wav`);
    await calistir('ffmpeg', ['-y', '-loglevel', 'error', '-ss', a.toFixed(3), '-t', d.toFixed(3), '-i', wav, '-af', `afade=t=in:d=0.012,afade=t=out:st=${Math.max(0, d - 0.02).toFixed(3)}:d=0.02,atempo=${tempo.toFixed(4)}`, '-ar', '48000', '-ac', '1', dosya]);
    arg.push('-i', dosya);
  }
  const n = gruplar.length;
  const filtre = gruplar.map((G, gi) => `[${gi}:a]adelay=${Math.max(0, Math.round((G.yeni - P / tempo) * 1000))}:all=1[a${gi}]`).join(';') + ';' +
    gruplar.map((_, gi) => `[a${gi}]`).join('') + (n > 1 ? `amix=inputs=${n}:normalize=0:dropout_transition=0,` : '') + `apad=whole_dur=${toplam},loudnorm=I=-15:TP=-1.5:LRA=11,aresample=48000,pan=stereo|c0=c0|c1=c0[o]`;
  const ses = path.join(dizin, 'ses.m4a');
  await calistir('ffmpeg', [...arg, '-filter_complex', filtre, '-map', '[o]', '-t', String(toplam), '-c:a', 'aac', '-b:a', '192k', ses]);
  fs.rmSync(cd, { recursive: true, force: true });
  const hizlar = ham.map((z, i) => +(harf[i] / Math.max(0.05, z.b - z.a)).toFixed(1));
  return { zaman, toplam, tempo: +tempo.toFixed(4), ses, yontem, hamSure: +toplamSes.toFixed(2), supheli: hizlar.map((h, i) => (h < 8 || h > (kayit.dil === 'en' ? 33 : 27) ? i : -1)).filter((i) => i >= 0), hizlar, birlesik, ince };
}

// ---------- çizim ----------
async function sayfa(veri, dizin) {
  const { chromium } = require('playwright-core');
  const u = (f) => 'file://' + path.join(MOTOR, f);
  fs.writeFileSync(path.join(dizin, 'veri.js'), 'window.SHORT=' + JSON.stringify(veri) + ';');
  fs.writeFileSync(path.join(dizin, 'dikey.html'), fs.readFileSync(path.join(MOTOR, 'dikey.html'), 'utf8').replace('<!--BETIKLER-->', `<script src="${u('gsap.min.js')}"></script><script src="veri.js"></script><script src="${u('dikey.js')}"></script>`));
  const b = await chromium.launch({ executablePath: chrome(), headless: true, args: ['--no-sandbox', `--window-size=${W},${H}`, '--force-color-profile=srgb', '--font-render-hinting=none', '--disable-lcd-text', '--hide-scrollbars', '--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const hatalar = []; p.on('pageerror', (e) => hatalar.push(e.message));
  await p.goto('file://' + path.join(dizin, 'dikey.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  if (hatalar.length) { await b.close(); throw new Error('Sayfa hatası: ' + hatalar[0]); }
  const info = await p.evaluate(() => window.INFO), cdp = await p.context().newCDPSession(p);
  const kare = async (t) => { await p.evaluate((x) => seek(x), t); const r = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92, optimizeForSpeed: true, captureBeyondViewport: false, clip: { x: 0, y: 0, width: W, height: H, scale: 1 } }); return Buffer.from(r.data, 'base64'); };
  return { b, info, kare };
}
async function ciz(veri, dizin, ses, cikti) {
  const { b, info, kare } = await sayfa(veri, dizin);
  try {
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', ses, '-map', '0:v', '-map', '1:a', '-vf', `scale=${W}:${H},setsar=1`,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'copy', '-movflags', '+faststart', '-shortest', cikti], { stdio: ['pipe', 'ignore', 'pipe'] });
    let hata = ''; ff.stderr.on('data', (d) => { hata += d; }); const bitti = new Promise((r) => ff.on('close', r));
    const n = Math.round(info.total * FPS);
    for (let f = 0; f < n; f++) { const buf = await kare(f / FPS); if (!ff.stdin.write(buf)) await new Promise((x) => ff.stdin.once('drain', x)); if (f % 300 === 0) console.log(`çiziliyor: %${Math.round(100 * f / n)}`); }
    ff.stdin.end(); const kod = await bitti; if (kod !== 0) throw new Error('ffmpeg hatası: ' + hata.slice(-300));
    return { kare: n, sahne: info.sahne };
  } finally { await b.close(); }
}
// her sahnenin ortasından bir kare alıp tek görselde toplar (gözle kontrol için)
async function kontrolGorseli(veri, dizin, hedef) {
  const { b, kare } = await sayfa(veri, dizin);
  try {
    const kd = path.join(dizin, 'kare'); fs.rmSync(kd, { recursive: true, force: true }); fs.mkdirSync(kd, { recursive: true });
    const L = veri.satirlar, S = veri.sahneler, anlar = [];
    S.forEach((s, i) => { const sonCumle = i < S.length - 1 ? S[i + 1].ilk - 1 : L.length - 1; anlar.push(i === S.length - 1 ? veri.toplam - 0.4 : Math.max(L[s.ilk].a + 0.2, L[sonCumle].b - 0.15)); });
    for (const [i, t] of anlar.entries()) fs.writeFileSync(path.join(kd, `k${String(i).padStart(2, '0')}.jpg`), await kare(t));
    const sutun = Math.min(9, Math.ceil(anlar.length / 2));
    await calistir('ffmpeg', ['-y', '-loglevel', 'error', '-pattern_type', 'glob', '-i', path.join(kd, 'k*.jpg'), '-vf', `scale=270:480,tile=${sutun}x${Math.ceil(anlar.length / sutun)}:padding=6:color=white`, '-q:v', '3', hedef]);
    return anlar.length;
  } finally { await b.close(); }
}

// ---------- ana akış ----------
(async () => {
  const o = secenekler(process.argv.slice(2));
  if (!o.metin) { console.error(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 22).map((l) => l.replace(/^\/\/ ?/, '')).join('\n')); process.exit(2); }
  const ham = JSON.parse(fs.readFileSync(o.metin, 'utf8'));
  const kapak = o.kapak ? path.resolve(o.kapak) : (ham.tamVideo && ham.tamVideo.kapak ? path.resolve(path.dirname(o.metin), ham.tamVideo.kapak) : '');
  if (kapak && !fs.existsSync(kapak)) throw new Error('Kapak dosyası yok: ' + kapak);
  const { kayit, uyari, kelime, kapanis } = temizle(ham, { kapakVar: !!kapak });
  console.log(`metin: ${kayit.satirlar.length} cümle, ${kelime} kelime, ${kayit.sahneler.length} sahne (${[...new Set(kayit.sahneler.map((s) => s.tip))].length} farklı tip)`);
  uyari.forEach((u) => console.log('UYARI: ' + u));
  const stil = o.stil || (kayit.dil === 'en' ? STIL_EN : STIL), metin = kayit.satirlar.map(soyle).join('\n');
  if (o['ses-metni']) { console.log('--- SESLENDİRİLECEK METİN (tamamı TEK çağrıda, olduğu gibi) ---\n' + metin + '\n--- ÜSLUP (metne yazılmaz; speechMetadata.style) ---\n' + stil); return; }

  const cikti = path.resolve(o.cikti || 'short.mp4');
  const dizin = path.resolve(o.calisma || cikti.replace(/\.mp4$/i, '') + '-calisma'); fs.mkdirSync(dizin, { recursive: true });
  const tm = ham.tamVideo || {};
  const temaAd = String(o.tema || ham.tema || '').trim().toLowerCase().replace(/̇/g, '').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ğ/g, 'g'); // "yeşil", "sarı" da kabul
  const temaSayi = /^\d+$/.test(temaAd);
  if (!temaSayi && !(temaAd in TEMA)) console.log(`UYARI: ${temaAd ? `"${temaAd}" bilinen bir tema değil` : 'tema verilmedi'}; yeşil kullanılıyor. Renkler ana videonun renkleri olmalı: --tema ${Object.keys(TEMA).join('|')} ya da ton açısı (0-359).`);
  const tonH = temaSayi ? +temaAd % 360 : (113 + (TEMA[temaAd] || 0) + 360) % 360;
  const veri = { dil: kayit.dil, tonH, marka: o.marka || ham.marka || 'ThirdHand AI', kaynak: kayit.kaynak, sahneler: kayit.sahneler,
    tam: { baslik: o.baslik || tm.baslik || '', link: (o.link || tm.link || '').replace(/^https?:\/\//, ''), kanal: o.kanal || tm.kanal || '', kapak: kapak ? 'file://' + kapak : '' } };
  if (kapanis) veri.tam.kapanis = Object.fromEntries(Object.entries(kapanis).filter(([, v]) => v != null && v !== ''));
  if (!veri.tam.link) console.log('UYARI: kapanış kartı için link verilmedi; kartta "Link açıklamada" yazacak.');
  if (!kapak) console.log('UYARI: kapak verilmedi; kapanış kartında kapak görünmeyecek.');

  if (o.onizleme) { // yaklaşık zamanlar: ses üretmeden görünümü kontrol et
    let t = 0.15; veri.satirlar = kayit.satirlar.map((c) => { const d = soyle(c).length * 0.058; const z = { a: +t.toFixed(3), b: +(t + d).toFixed(3), yazi: c.yazi, vurgu: c.vurgu }; t += d + 0.17; return z; });
    veri.toplam = +(t + 2.2).toFixed(3);
    const hedef = path.join(dizin, 'onizleme.jpg'); const n = await kontrolGorseli(veri, dizin, hedef);
    console.log(`önizleme: ${n} sahne -> ${hedef} (tahmini süre ${veri.toplam} sn)`); return;
  }

  let wav = o.ses ? path.resolve(o.ses) : path.join(dizin, 'anlatim.wav');
  if (!o.ses) {
    if (o['tts-yanit']) fs.writeFileSync(wav, sesiCikar(JSON.parse(fs.readFileSync(o['tts-yanit'], 'utf8'))));
    else if (anahtarBul()) { const model = o['tts-model'] || 'gemini-3.8-flash-tts', ad = o['ses-adi'] || 'Achird'; console.log(`seslendiriliyor: ${model}, ${ad}`); fs.writeFileSync(wav, await geminiTts(metin, stil, model, ad)); }
    else { console.error('Ses yok: --ses ya da --tts-yanit verin, ya da Gemini anahtarını ~/.config/ytv/gemini-anahtar.txt dosyasına koyun (ya da GEMINI_API_KEY). Metni ve üslubu görmek için --ses-metni.'); process.exit(4); }
  }
  const h = await hizala(wav, kayit, dizin, { hedef: +(o.hedef || 56.5), sonPay: +(o['son-pay'] || 2.4) });
  console.log(`ses: ham ${h.hamSure} sn -> video ${h.toplam} sn, hız x${h.tempo}, hizalama: ${h.yontem}`);
  if (h.yontem !== 'duraklama') console.log('UYARI: yeterli duraklama bulunamadı; altyazı zamanları harf oranına göre yaklaşık.');
  if (h.birlesik) console.log(`NOT: ${h.birlesik} cümle arası duraklamasız okunmuş; bu sınırlar tahmin edildi (${h.ince} tanesi kısa sessizliğe oturtuldu). O cümlelerde altyazı geçişi çok az kayabilir.`);
  if (h.supheli.length) console.log(`UYARI: şu cümlelerin hızı olağan dışı, altyazı eşleşmesini kontrol et: ${h.supheli.join(', ')}`);
  if (h.toplam > 60) console.log(`UYARI: video ${h.toplam} sn; 60 saniyeyi aşıyor, metni kısalt.`);
  veri.toplam = h.toplam; veri.satirlar = kayit.satirlar.map((c, i) => ({ a: h.zaman[i].a, b: h.zaman[i].b, yazi: c.yazi, vurgu: c.vurgu }));
  const c = await ciz(veri, dizin, h.ses, cikti);
  const n = await kontrolGorseli(veri, dizin, path.join(dizin, 'kontrol.jpg'));
  fs.writeFileSync(path.join(dizin, 'sonuc.json'), JSON.stringify({ cikti, sure: h.toplam, cumle: kayit.satirlar.length, sahne: c.sahne, hizalama: h.yontem, tempo: h.tempo, birlesik: h.birlesik, hizlar: h.hizlar, baslik: kayit.baslik, aciklama: kayit.aciklama, uyari }, null, 1));
  console.log(`bitti: ${cikti} (${h.toplam} sn, ${kayit.satirlar.length} cümle, ${c.sahne} sahne); kontrol görseli: ${path.join(dizin, 'kontrol.jpg')} (${n} kare)`);
})().catch((e) => { console.error('HATA: ' + (e.message || e)); process.exit(1); });
