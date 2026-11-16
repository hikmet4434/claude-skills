// Anlatım tarzı dikey Short sahne çizici (1080x1920). Hattın motoruyla aynı sözleşme: seek(t) çağrılır, kare alınır.
// Veri window.SHORT ile gelir:
//   satirlar: [{a, b, yazi, vurgu:[...]}]   cümleler ve gerçek zamanları (sn)
//   sahneler: [{ilk, tip, ...}]             her sahne `ilk` numaralı cümlede başlar, sonraki sahneye kadar sürer
//   toplam, tonH (ana videonun tema ton açısı), marka, kaynak, tam: {baslik, link, kanal, kapak, kapanis?}
//   tam.kapanis (isteğe bağlı, YouTube dışı içerik için): {etiket, ust, alt, logo: 'youtube'|'instagram'|'web'|'yok'}
// Sahne tipleri (hepsinde isteğe bağlı `etiket` ve `hap: {metin, renk: 'sari'|'kirmizi', at, p}` vardır):
//   dev      {kelime, kontur, ikon, adet}                 dev kelime + renk bloğunda ikon(lar)
//   soru     {kelime, ikon}                               dev kelime + soru rozeti
//   kapak    {kelime}                                     bant içinde konturlu kelime + ana videonun kapağı
//   tanim    {baslik, ikonlar[], kart}                    bant içinde tek cümlelik tanım (*vurgu*), ikon sırası, sonuç kartı
//   takvim   {ay, gun, yil}                               takvim yaprağı
//   rakam    {ust, buyuk, kart2: {ust, metin}}            büyük rakam kartı (+ üstünde ikinci kart)
//   kutular  {kelime, kutular: [{ikon, etiket}], kopuk}   dev kelime + kesik çizgili kutular (kopuk: aralarında çarpı)
//   pano     {baslik, sutunlar[3], ikonlar[2]}            bant içinde üç sütunlu iş panosu
//   liste    {baslik, maddeler: [{ikon, metin}]}          bant içinde 3-4 maddelik liste
//   akis     {kart, blok, ikonlar[]}                      kart renk bloğuna düşer, alttaki ikonlar onaylanır
//   etiket   {ust, buyuk}                                 tek büyük vurgu etiketi (ör. ASIL MESELE)
//   ikili    {sol, sag, balonlar[], kelime, cizili}       bant içinde iki karakter + konuşma balonları (+ üstü çizili kelime)
//   pencere  {ana, yan, balonlar[]}                       uygulama penceresi: ana alan + yan sütunda balonlar
//   bulut    {sol, solHap, sag, etiketler[], sonuc}       bant içinde solda öğe, sağda bulut + ilerleme çubukları
//   kartlar  {kartlar: [{ust, metin}, {ust, metin}]}      alt alta iki kart (koyu + renkli)
//   son      (otomatik)                                   kapanış: tam videonun kapağı, başlığı ve linki
const D = window.SHORT, L = D.satirlar, TOPLAM = D.toplam, TAM = D.tam || {};
const H = D.tonH == null ? 113 : D.tonH;
document.documentElement.style.setProperty('--h', H);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const BUYUK = (s) => String(s || '').toLocaleUpperCase(D.dil === 'en' ? 'en-US' : 'tr-TR');
const at = (i, p = 0) => { const s = L[Math.max(0, Math.min(L.length - 1, i))]; return +(s.a + p * (s.b - s.a)).toFixed(3); };
const KOYU = '#0B1220', ACIK = '#EAF2FF', AC = `hsl(${H} 100% 68%)`, ACA = `hsl(${H} 100% 84%)`;

// --- ikonlar (r: ana renk, g: ayrıntı rengi) ---
const svg = (s, ic) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" style="display:block">${ic}</svg>`;
const IKON = {
  robot: (r, g) => `<circle cx="50" cy="9" r="6" fill="${r}"/><rect x="47" y="12" width="6" height="12" fill="${r}"/><rect x="16" y="22" width="68" height="50" rx="13" fill="${r}"/><rect x="6" y="38" width="9" height="20" rx="4" fill="${r}"/><rect x="85" y="38" width="9" height="20" rx="4" fill="${r}"/><circle cx="37" cy="44" r="8" fill="${g}"/><circle cx="63" cy="44" r="8" fill="${g}"/><rect x="36" y="58" width="28" height="6" rx="3" fill="${g}"/><rect x="28" y="76" width="44" height="20" rx="7" fill="${r}"/>`,
  kisi: (r) => `<circle cx="50" cy="32" r="20" fill="${r}"/><path d="M12 97 C12 58 88 58 88 97 Z" fill="${r}"/>`,
  bulut: (r) => `<path d="M28 78 a20 20 0 0 1 2 -40 a26 26 0 0 1 50 6 a17 17 0 0 1 -4 34 Z" fill="${r}"/>`,
  laptop: (r, g) => `<rect x="18" y="18" width="64" height="46" rx="6" fill="${r}"/><rect x="24" y="24" width="52" height="34" rx="2" fill="${g}"/><rect x="6" y="68" width="88" height="10" rx="5" fill="${r}"/>`,
  laptopKapali: (r) => `<rect x="12" y="52" width="76" height="10" rx="4" fill="${r}"/><rect x="6" y="64" width="88" height="10" rx="5" fill="${r}"/>`,
  belge: (r, g) => `<rect x="22" y="8" width="56" height="84" rx="8" fill="${r}"/><rect x="32" y="28" width="36" height="6" rx="3" fill="${g}"/><rect x="32" y="43" width="36" height="6" rx="3" fill="${g}"/><rect x="32" y="58" width="24" height="6" rx="3" fill="${g}"/>`,
  para: (r, g) => `<circle cx="50" cy="50" r="42" fill="${r}"/><text x="50" y="69" font-size="56" font-weight="900" text-anchor="middle" fill="${g}" font-family="-apple-system,Helvetica,sans-serif">₺</text>`,
  saat: (r, g) => `<circle cx="50" cy="50" r="42" fill="${r}"/><path d="M50 50 V24 M50 50 L70 60" stroke="${g}" stroke-width="8" stroke-linecap="round" fill="none"/>`,
  kilit: (r, g) => `<path d="M32 48 V32 a18 18 0 0 1 36 0 V48" stroke="${r}" stroke-width="10" fill="none"/><rect x="20" y="44" width="60" height="48" rx="9" fill="${r}"/><circle cx="50" cy="66" r="8" fill="${g}"/>`,
  grafik: (r) => `<rect x="12" y="58" width="20" height="34" rx="4" fill="${r}"/><rect x="40" y="38" width="20" height="54" rx="4" fill="${r}"/><rect x="68" y="14" width="20" height="78" rx="4" fill="${r}"/>`,
  roket: (r, g) => `<path d="M50 4 C70 22 72 50 62 70 H38 C28 50 30 22 50 4 Z" fill="${r}"/><circle cx="50" cy="36" r="9" fill="${g}"/><path d="M38 54 L20 78 L38 70 Z M62 54 L80 78 L62 70 Z" fill="${r}"/><path d="M43 74 L50 96 L57 74 Z" fill="${g}"/>`,
  dunya: (r, g) => `<circle cx="50" cy="50" r="42" fill="${r}"/><ellipse cx="50" cy="50" rx="17" ry="42" stroke="${g}" stroke-width="5" fill="none"/><path d="M8 50 H92 M14 30 H86 M14 70 H86" stroke="${g}" stroke-width="5" fill="none"/>`,
  sohbet: (r, g) => `<rect x="8" y="12" width="84" height="58" rx="17" fill="${r}"/><path d="M28 66 L22 92 L50 68 Z" fill="${r}"/><circle cx="32" cy="41" r="6.5" fill="${g}"/><circle cx="50" cy="41" r="6.5" fill="${g}"/><circle cx="68" cy="41" r="6.5" fill="${g}"/>`,
  ayar: (r, g) => [0, 45, 90, 135, 180, 225, 270, 315].map((k) => `<rect x="43" y="4" width="14" height="20" rx="4" fill="${r}" transform="rotate(${k} 50 50)"/>`).join('') + `<circle cx="50" cy="50" r="33" fill="${r}"/><circle cx="50" cy="50" r="13" fill="${g}"/>`,
  yildiz: (r) => `<polygon points="50,5 62,37 96,38 69,59 79,93 50,73 21,93 31,59 4,38 38,37" fill="${r}"/>`,
  telefon: (r, g) => `<rect x="27" y="5" width="46" height="90" rx="11" fill="${r}"/><rect x="33" y="15" width="34" height="60" rx="3" fill="${g}"/><circle cx="50" cy="85" r="4.5" fill="${g}"/>`,
  kod: (r, g) => `<rect x="6" y="14" width="88" height="72" rx="13" fill="${r}"/><path d="M38 36 L24 50 L38 64 M62 36 L76 50 L62 64 M55 32 L45 68" stroke="${g}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
};
// katalogda olmayan ad emoji/sembol olarak çizilir (ör. "🤔", "⚡")
function ikon(ad, s, r = KOYU, g = ACA) {
  if (IKON[ad]) return svg(s, IKON[ad](r, g));
  return `<div style="width:${s}px;height:${s}px;font-size:${Math.round(s * 0.84)}px;line-height:${s}px;text-align:center">${esc([...String(ad || '✦')].slice(0, 2).join(''))}</div>`;
}
// kapanış kartındaki yer işareti: içerik nerede bulunacaksa onun simgesi
const igLogo = (g) => `<svg width="${g}" height="${g}" viewBox="0 0 100 100" style="display:block"><defs><linearGradient id="igr" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".45" stop-color="#D62976"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><rect width="100" height="100" rx="26" fill="url(#igr)"/><rect x="24" y="24" width="52" height="52" rx="15" fill="none" stroke="#fff" stroke-width="7"/><circle cx="50" cy="50" r="13" fill="none" stroke="#fff" stroke-width="7"/><circle cx="67" cy="33" r="4.5" fill="#fff"/></svg>`;
const webLogo = (g) => `<svg width="${g}" height="${g}" viewBox="0 0 100 100" style="display:block"><rect width="100" height="100" rx="26" fill="hsl(${D.tonH != null ? D.tonH : 113} 85% 52%)"/><g fill="none" stroke="#fff" stroke-width="6"><circle cx="50" cy="50" r="27"/><path d="M23 50h54M50 23c-14 8-14 46 0 54M50 23c14 8 14 46 0 54"/></g></svg>`;
const ytLogo = (g) => `<svg width="${g}" height="${Math.round(g * 0.7)}" viewBox="0 0 100 70" style="display:block"><rect width="100" height="70" rx="18" fill="#FF0033"/><path d="M40 20 L68 35 L40 50 Z" fill="#fff"/></svg>`;

// --- yapı taşları ---
const A = (t, k = 'pop') => ` data-t="${t}" data-k="${k}"`;
const chip = (m, x, y, cls = '', an = '') => (m ? `<div class="abs chip ${cls}" style="left:${x}px;top:${y}px"${an}>${esc(m)}</div>` : '');
const pill = (m, x, y, cls = '', an = '') => (m ? `<div class="abs pill ${cls}" style="left:${x}px;top:${y}px"${an}>${esc(m)}</div>` : '');
// ortalanmış hap: uzunluğa göre yazı küçülür, ekrandan taşmaz
function hap(s, y, vars = 'sari') {
  const h = s.hap; if (!h || !h.metin) return '';
  const m = String(h.metin), fs = Math.max(34, Math.min(50, Math.floor(1500 / Math.max(10, m.length))));
  const zaman = at(h.at == null ? s.ilk : h.at, h.p == null ? 0.5 : h.p);
  return `<div class="abs" style="left:0;top:${y}px;width:1080px;text-align:center"${A(zaman)}><span class="pill ${(h.renk || vars) === 'kirmizi' ? '' : 'y'}" style="font-size:${fs}px">${esc(m)}</span></div>`;
}
function dev(m, y, { o = false, max = 250, x = 84, gen = 912, an = '' } = {}) {
  const st = String(m || '').split('|').slice(0, 2), uz = Math.max(1, ...st.map((s) => s.length));
  const fs = Math.min(max, Math.floor(gen / (uz * 0.66)));
  // çok satırda satır aralığı açılır: üst satırdaki Ç/Ş kuyruğu alt satırın harfine değmesin
  return `<div class="abs dev ${o ? 'o' : ''}" style="left:${x}px;top:${y}px;font-size:${fs}px;${st.length > 1 ? 'line-height:1.06;' : ''}"${an}>${st.map((s) => `<div>${esc(BUYUK(s))}</div>`).join('')}</div>`;
}
const blok = (x, y, w, h, ic = '', an = '') => `<div class="abs" style="left:${x - 60}px;top:${y}px;width:${w + 120}px;height:${h + 24}px"${an}><div class="abs blok" style="left:60px;top:0;width:${w}px;height:${h}px">${ic}</div><div class="abs taban" style="left:0;top:${h}px;width:${w + 120}px"></div></div>`;
const rozet = (x, y, an = '') => `<div class="abs rozet" style="left:${x}px;top:${y}px"${an}>?</div>`;
const yz = (ic) => `<div class="yz">${ic}</div>`; // hafifçe yüzen öğe
const vurgulu = (m) => esc(m).replace(/\*([^*]+)\*/g, '<b>$1</b>');
const baslikBoy = (m, taban = 78) => Math.max(52, Math.min(taban, Math.floor(taban * 46 / Math.max(46, String(m || '').replace(/\*/g, '').length))));

// --- sahne tipleri: her biri html (ve gerekiyorsa ek animasyon) üretir ---
const T = {
  dev: { html(s) {
    const n = Math.max(1, Math.min(3, s.adet || 1)), boy = n === 1 ? 330 : n === 2 ? 250 : 210;
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) + dev(s.kelime, 392, { o: !!s.kontur, an: A(at(s.ilk, 0.08), 'sol') }) +
      blok(170, 770, 740, 440, [...Array(n)].map(() => `<div style="margin:0 12px -6px">${yz(ikon(s.ikon || 'robot', boy))}</div>`).join(''), A(at(s.ilk, 0.2))) + hap(s, 1150, 'kirmizi');
  } },
  soru: { html(s) {
    const iki = !!(s.kelime && s.kelime.includes('|')); // iki satırda yazı küçülür: kısa kelimelerde alt satır soru rozetine değmesin
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) + dev(s.kelime, iki ? 372 : 470, { max: iki ? 188 : 300, an: A(at(s.ilk, 0), 'sol') }) +
      blok(250, 880, 520, 360, `<div style="margin-bottom:-6px">${yz(ikon(s.ikon || '🤔', 300))}</div>`, A(at(s.ilk, 0.12))) + rozet(760, 790, A(at(s.ilk, 0.3))) + hap(s, 1180);
  } },
  kapak: { koyu: true, html(s) {
    return chip(s.etiket, 84, 440, 'y', A(at(s.ilk, 0.02))) + dev(s.kelime, 520, { o: true, max: 210, an: A(at(s.ilk, 0.1), 'sol') }) +
      `<div class="abs foto" style="left:120px;top:770px;width:840px;height:472px;transform:rotate(-3deg)"${A(at(s.ilk, 0.22), 'sag')}><img src="${esc(TAM.kapak || '')}"></div>` + hap(s, 1215);
  } },
  tanim: { koyu: true, html(s) {
    const ik = (s.ikonlar && s.ikonlar.length ? s.ikonlar : ['kisi', 'robot']).slice(0, 6), w = Math.min(150, Math.floor(820 / ik.length) - 16);
    return chip(s.etiket, 84, 440, 'y', A(at(s.ilk, 0.02))) +
      `<div class="abs baslik" style="left:84px;top:528px;width:912px;font-size:${baslikBoy(s.baslik)}px"${A(at(s.ilk, 0.06), 'sol')}>${vurgulu(s.baslik)}</div>` +
      `<div class="abs" style="left:84px;top:770px;width:912px;display:flex;justify-content:center;gap:16px">${ik.map((ad, j) => `<div${A(at(s.ilk, 0.2 + j * 0.06))}>${ikon(ad, w, j % 2 ? AC : ACIK, KOYU)}</div>`).join('')}</div>` +
      (s.kart ? `<div class="abs" style="left:240px;top:${790 + w}px;width:600px;height:${250 - w}px"${A(at(s.ilk, 0.5), 'ciz')}><svg width="600" height="${250 - w}" viewBox="0 0 600 150" preserveAspectRatio="none"><path d="M10 0 L300 140 M300 0 L300 140 M590 0 L300 140" stroke="${AC}" stroke-width="6" fill="none" stroke-dasharray="14 12"/></svg></div>` +
        `<div class="abs kart renk" style="left:150px;top:1060px;width:780px;height:150px;padding:0 20px;text-align:center;font-weight:900;font-size:${Math.min(76, Math.floor(1150 / Math.max(9, s.kart.length)))}px;line-height:150px;letter-spacing:-.03em;white-space:nowrap"${A(at(s.ilk, 0.6))}>${esc(BUYUK(s.kart))}</div>` : '') + hap(s, 1240);
  } },
  takvim: { html(s) {
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) +
      `<div class="abs" style="left:270px;top:450px;width:540px;height:600px;transform:rotate(-3deg);border-radius:22px;overflow:hidden;box-shadow:0 26px 0 rgba(0,0,0,.28),0 0 70px hsl(${H} 100% 60% / .3)"${A(at(s.ilk, 0.05))}>
         <div style="height:130px;background:${AC};color:${KOYU};font-weight:900;font-size:${Math.min(76, Math.floor(560 / Math.max(5, String(s.ay || '').length)))}px;line-height:130px;text-align:center;letter-spacing:.08em">${esc(BUYUK(s.ay))}</div>
         <div style="height:380px;background:#fff;color:${KOYU};font-weight:900;font-size:${String(s.gun || '').length > 2 ? 230 : 340}px;line-height:372px;text-align:center;letter-spacing:-.05em">${esc(s.gun)}</div>
         <div style="height:90px;background:#fff;border-top:4px solid #dde3ee;font-weight:800;font-size:38px;line-height:86px;text-align:center;letter-spacing:.2em;color:#6b7791">${esc(s.yil || '')}</div></div>` + hap(s, 1100);
  } },
  rakam: { html(s) {
    const k2 = s.kart2, y = k2 ? 780 : 560, b = String(s.buyuk || '');
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) +
      (k2 ? `<div class="abs kart koyu" style="left:84px;top:430px;width:912px;height:300px"${A(at(s.ilk, 0.08), 'sol')}><div class="kucuk">${esc(BUYUK(k2.ust))}</div><div style="font-weight:900;font-size:${Math.min(128, Math.floor(1500 / Math.max(8, String(k2.metin || '').length)))}px;line-height:1.1;letter-spacing:-.04em;margin-top:10px;white-space:nowrap">${esc(k2.metin)}</div></div>` : '') +
      `<div class="abs kart renk" style="left:84px;top:${y}px;width:912px;height:400px"${A(at(s.ilk, k2 ? 0.45 : 0.1), 'sag')}><div class="kucuk">${esc(BUYUK(s.ust))}</div><div style="font-weight:900;font-size:${Math.min(250, Math.floor(1560 / Math.max(4, b.length)))}px;line-height:${k2 ? 1.05 : 1.2};letter-spacing:-.05em;margin-top:6px;white-space:nowrap">${esc(b)}</div></div>` + hap(s, y + 430);
  } },
  kutular: { html(s) {
    const ks = (s.kutular && s.kutular.length ? s.kutular : [{}, {}, {}]).slice(0, 3), n = ks.length, w = n === 3 ? 292 : 440, ara = n === 3 ? 18 : 32, x0 = (1080 - (n * w + (n - 1) * ara)) / 2;
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) + dev(s.kelime, 380, { max: 200, an: A(at(s.ilk, 0), 'sol') }) +
      ks.map((k, j) => `<div class="abs kesik" style="left:${x0 + j * (w + ara)}px;top:700px;width:${w}px;height:390px"${A(at(s.ilk, 0.12 + j * 0.1))}>${yz(ikon(k.ikon || 'robot', 170, ACIK, KOYU))}<div class="kucuk" style="max-width:${w - 30}px;overflow:hidden;white-space:nowrap">${esc(BUYUK(k.etiket || ''))}</div></div>`).join('') +
      (s.kopuk ? ks.slice(1).map((_, j) => `<div class="abs" style="left:${x0 + (j + 1) * (w + ara) - ara / 2 - 49}px;top:850px;width:98px;height:98px;border-radius:50%;background:var(--kirmizi);color:#fff;font-weight:900;font-size:70px;line-height:92px;text-align:center"${A(at(s.ilk, 0.55 + j * 0.08))}>×</div>`).join('') : '') + hap(s, 1140, 'kirmizi');
  } },
  pano: { koyu: true, html(s) {
    const ad = (s.sutunlar && s.sutunlar.length === 3 ? s.sutunlar : D.dil === 'en' ? ['TO DO', 'DOING', 'DONE'] : ['YAPILACAK', 'SÜRÜYOR', 'BİTTİ']);
    const ik = s.ikonlar && s.ikonlar.length >= 2 ? s.ikonlar : ['kisi', 'robot'];
    const duzen = [[[0, 78], [1, 60]], [[1, 70], [0, 55], [1, 82]], [[1, 64]]]; let n = 0;
    return chip(s.etiket, 84, 440, 'y', A(at(s.ilk, 0.02))) +
      `<div class="abs baslik" style="left:84px;top:528px;width:912px;font-size:${baslikBoy(s.baslik, 84)}px"${A(at(s.ilk, 0.06), 'sol')}>${vurgulu(s.baslik)}</div>` +
      `<div class="abs pano" style="left:64px;top:680px;width:952px;height:600px;border:6px solid transparent;border-radius:30px"></div>` +
      duzen.map((ks, j) => `<div class="abs" style="left:${84 + j * 310}px;top:700px;width:292px"><div class="kucuk" style="margin-bottom:16px;white-space:nowrap;overflow:hidden"${A(at(s.ilk, 0.15 + j * 0.06))}>${esc(BUYUK(ad[j]))}</div>` +
        ks.map(([t, gen]) => `<div class="kart acik" style="padding:18px 20px;margin-bottom:16px;display:flex;align-items:center;gap:14px;border-radius:20px"${A(at(s.ilk, 0.25) + (n++) * 0.11)}>${ikon(ik[t], 64, KOYU, AC)}<div style="flex:1"><div class="cizgi" style="background:#1b2438;width:${gen}%"></div><div class="cizgi" style="background:#c5cddd;width:${gen - 22}%;margin-top:10px"></div></div></div>`).join('') + '</div>').join('') + hap(s, 1225);
  }, anim(tl, s, q1) { const h = s.hap; tl.to(q1('.pano'), { borderColor: AC, duration: 0.3 }, Math.max(at(s.ilk, 0.6), at(h && h.at != null ? h.at : s.ilk, 0.05))); } },
  liste: { koyu: true, html(s) {
    const m = (s.maddeler || []).slice(0, 4), h = m.length > 3 ? 132 : 158;
    return chip(s.etiket, 84, 440, 'y', A(at(s.ilk, 0.02))) +
      `<div class="abs baslik" style="left:84px;top:528px;width:912px;font-size:${baslikBoy(s.baslik, 84)}px"${A(at(s.ilk, 0.06), 'sol')}>${vurgulu(s.baslik)}</div>` +
      m.map((x, j) => `<div class="abs kart koyu" style="left:84px;top:${700 + j * (h + 20)}px;width:912px;height:${h}px;padding:0 30px;display:flex;align-items:center;gap:28px"${A(at(s.ilk, 0.22 + j * 0.16), j % 2 ? 'sag' : 'sol')}>${ikon(x.ikon || 'yildiz', h - 50, AC, KOYU)}<div style="font-weight:800;font-size:${Math.min(52, Math.floor(1500 / Math.max(18, String(x.metin || '').length)))}px;line-height:1.1;letter-spacing:-.02em">${esc(x.metin)}</div></div>`).join('') + hap(s, 1275);
  } },
  akis: { html(s) {
    const ik = (s.ikonlar && s.ikonlar.length ? s.ikonlar : ['kisi', 'robot', 'kisi', 'robot', 'kisi', 'robot']).slice(0, 6), w = 128, x0 = (1080 - (ik.length * w + (ik.length - 1) * 24)) / 2;
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) +
      `<div class="abs kart koyu akk" style="left:220px;top:430px;width:640px;height:170px;padding:0 20px;text-align:center;font-weight:900;font-size:${Math.min(70, Math.floor(1000 / Math.max(8, String(s.kart || '').length)))}px;line-height:164px;letter-spacing:-.03em;transform:rotate(-3deg);white-space:nowrap"${A(at(s.ilk, 0.05))}>${esc(BUYUK(s.kart))}</div>` +
      blok(140, 760, 800, 300, `<div class="akb" style="align-self:center;font-weight:900;font-size:${Math.min(84, Math.floor(1250 / Math.max(8, String(s.blok || '').length)))}px;letter-spacing:-.03em;white-space:nowrap">${esc(BUYUK(s.blok))}</div>`, A(at(s.ilk, 0.15))) +
      ik.map((ad, j) => `<div class="abs" style="left:${x0 + j * (w + 24)}px;top:1130px;width:${w}px;height:150px"${A(at(s.ilk, 0.3 + j * 0.05))}>${ikon(ad, w, ACIK, KOYU)}<div class="abs" style="right:-6px;top:-12px;width:58px;height:58px;border-radius:50%;background:#19C37D;color:#fff;font-weight:900;font-size:38px;line-height:58px;text-align:center"${A(at(s.ilk, 0.62) + j * 0.08)}>✓</div></div>`).join('');
  }, anim(tl, s, q1) { tl.to(q1('.akk'), { y: 300, scale: 0.5, opacity: 0, duration: 0.45, ease: 'power2.in' }, at(s.ilk, 0.38)); tl.fromTo(q1('.akb'), { scale: 1 }, { scale: 1.12, duration: 0.16, yoyo: true, repeat: 1 }, at(s.ilk, 0.38) + 0.42); } },
  etiket: { html(s) {
    const b = BUYUK(s.buyuk || ''), fs = Math.min(150, Math.floor(1260 / Math.max(6, b.length)));
    return chip(s.ust, 150, 600, '', A(at(s.ilk, 0))) +
      `<div class="abs" style="left:0;top:720px;width:1080px;text-align:center"${A(at(s.ilk, 0.15))}><span class="pill y" style="font-size:${fs}px;padding:${Math.round(fs * 0.28)}px ${Math.round(fs * 0.44)}px ${Math.round(fs * 0.35)}px;transform:rotate(-5deg)">${esc(b)}</span></div>`;
  } },
  ikili: { koyu: true, html(s) {
    const b = (s.balonlar || []).slice(0, 3), i2 = Math.min(L.length - 1, s.ilk + 1), ikinci = s.son > s.ilk ? i2 : s.ilk, p2 = s.son > s.ilk ? 0 : 0.6;
    return chip(s.etiket, 84, 440, 'y', A(at(s.ilk, 0.02))) +
      `<div class="abs" style="left:96px;top:640px"${A(at(s.ilk, 0.05), 'sol')}>${yz(ikon(s.sol || 'robot', 310, ACIK, KOYU))}</div>` +
      `<div class="abs" style="left:674px;top:640px"${A(at(s.ilk, 0.1), 'sag')}>${yz(ikon(s.sag || 'robot', 310, AC, KOYU))}</div>` +
      b.map((m, j) => `<div class="abs" style="left:0;top:${560 + j * 130}px;width:1080px;text-align:center"${A(at(s.ilk, 0.3 + j * 0.25))}><span class="balon ${j % 2 ? 'y' : ''}" style="display:inline-block;position:relative;left:${j % 2 ? 60 : -40}px">${esc(m)}</span></div>`).join('') +
      (s.kelime ? dev(s.kelime, 1010, { o: true, max: 150, an: A(at(ikinci, p2 + 0.02), 'sol') }) + (s.cizili ? `<div class="abs" style="left:70px;top:1076px;width:820px;height:16px;border-radius:8px;background:var(--kirmizi);transform:rotate(-3deg)"${A(at(ikinci, p2 + 0.3), 'ciz')}></div>` : '') : '') + hap(s, 1200);
  } },
  pencere: { html(s) {
    const b = (s.balonlar || []).slice(0, 3);
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) +
      `<div class="abs kart koyu" style="left:84px;top:430px;width:912px;height:740px;padding:0;overflow:hidden"${A(at(s.ilk, 0.05))}>
         <div style="height:64px;background:rgba(255,255,255,.07);display:flex;align-items:center;gap:12px;padding:0 26px"><i style="width:18px;height:18px;border-radius:50%;background:#56627c"></i><i style="width:18px;height:18px;border-radius:50%;background:#56627c"></i><i style="width:18px;height:18px;border-radius:50%;background:#56627c"></i></div>
         <div class="abs" style="left:36px;top:104px;width:540px"><div class="kucuk" style="color:#8e9ab4;margin-bottom:26px">${esc(BUYUK(s.ana || ''))}</div>${[86, 62, 74, 40, 80, 56, 68, 34, 72].map((g, j) => `<div class="cizgi" style="width:${g}%;margin-bottom:24px;${j % 3 === 1 ? `background:hsl(${H} 100% 68% / .6)` : ''}"></div>`).join('')}</div>
         <div class="abs" style="left:612px;top:64px;width:300px;height:676px;background:hsl(${H} 60% 15%);border-left:4px solid ${AC};padding:36px 22px"><div class="kucuk" style="margin-bottom:28px;white-space:nowrap">${esc(BUYUK(s.yan || ''))}</div>
           ${b.map((m, j) => `<div class="balon ${j % 2 ? 'y' : ''}" style="font-size:34px;margin-bottom:22px;display:inline-block;white-space:normal;max-width:256px"${A(at(s.ilk, 0.3 + j * 0.2))}>${esc(m)}</div>`).join('')}</div></div>` + hap(s, 1140);
  } },
  bulut: { koyu: true, html(s) {
    const e = (s.etiketler || []).slice(0, 2), i2 = s.son > s.ilk ? s.ilk + 1 : s.ilk, p2 = s.son > s.ilk ? 0 : 0.55; let x = 96;
    const cipler = e.map((m, j) => { const h = chip(m, x, 1150, 'b', A(at(i2, p2 + 0.05 + j * 0.1))); x += 80 + String(m).length * 24; return h; }).join('');
    return chip(s.etiket, 84, 440, 'y', A(at(s.ilk, 0.02))) +
      `<div class="abs" style="left:70px;top:640px"${A(at(s.ilk, 0.05), 'sol')}>${ikon(s.sol || 'laptopKapali', 380, ACIK, KOYU)}</div>` +
      pill(s.solHap, 150, 950, '', A(at(s.ilk, 0.3))) +
      `<div class="abs" style="left:520px;top:520px"${A(at(s.ilk, 0.2), 'sag')}>${yz(svg(470, IKON.bulut(AC)))}<div class="abs" style="left:170px;top:170px">${ikon(s.sag || 'robot', 150, KOYU, ACA)}</div></div>` +
      [0, 1, 2].map((j) => `<div class="abs" style="left:560px;top:${920 + j * 40}px;width:400px;height:20px;border-radius:10px;background:rgba(255,255,255,.14)"><div class="bar" style="height:20px;border-radius:10px;background:${AC};width:30px"></div></div>`).join('') +
      cipler + (s.sonuc ? `<div class="abs" style="left:${Math.min(430, x)}px;top:1138px;color:${AC};font-weight:900;font-size:80px;line-height:1"${A(at(i2, p2 + 0.35))}>→</div>` + pill(s.sonuc, Math.min(540, x + 110), 1136, 'y', A(at(i2, p2 + 0.5))) : '');
  }, anim(tl, s, q1, q) { const z = L[s.ilk]; q('.bar').forEach((b, j) => tl.to(b, { width: 400 - j * 70, duration: (z.b - z.a) * 0.75, ease: 'power1.out' }, at(s.ilk, 0.25) + j * 0.15)); } },
  kartlar: { html(s) {
    const k = (s.kartlar || []).slice(0, 2), boy = (m, taban, pay) => Math.min(taban, Math.floor(pay / Math.max(6, String(m || '').length)));
    return chip(s.etiket, 84, 318, '', A(at(s.ilk, 0.02))) +
      (k[0] ? `<div class="abs kart koyu" style="left:84px;top:430px;width:912px;height:330px"${A(at(s.ilk, 0.08), 'sol')}><div class="kucuk">${esc(BUYUK(k[0].ust))}</div><div style="font-weight:900;font-size:${boy(k[0].metin, 128, 1500)}px;line-height:1.1;letter-spacing:-.04em;margin-top:14px;white-space:nowrap">${esc(k[0].metin)}</div></div>` : '') +
      (k[1] ? `<div class="abs kart renk" style="left:84px;top:810px;width:912px;height:370px"${A(at(s.ilk, 0.45), 'sag')}><div class="kucuk">${esc(BUYUK(k[1].ust))}</div><div style="font-weight:900;font-size:${boy(k[1].metin, 220, 1560)}px;line-height:1.08;letter-spacing:-.05em;margin-top:10px;white-space:nowrap">${esc(k[1].metin)}</div></div>` : '') + hap(s, 1210);
  } },
  // kapanış: tam videonun kapağı, başlığı ve linki
  son: { html(s) {
    const en = D.dil === 'en', link = TAM.link || '', bs = String(TAM.baslik || ''), K = TAM.kapanis || {}, tur = K.logo || 'youtube', yt = tur === 'youtube';
    const logo = (g) => (yt ? ytLogo(g) : tur === 'instagram' ? igLogo(Math.round(g * 0.8)) : tur === 'web' ? webLogo(Math.round(g * 0.8)) : '');
    const ust = K.ust != null ? esc(K.ust) : (en ? 'Full video on YouTube' : 'Tam video YouTube\'da') + (TAM.kanal ? ' · ' + esc(TAM.kanal) : '');
    const alt = K.alt != null ? esc(K.alt) : (en ? 'Link in description' : 'Link açıklamada') + (D.kaynak ? ' · ' + (en ? 'Source: ' : 'Kaynak: ') + esc(D.kaynak) : '');
    return chip(s.etiket || K.etiket || (en ? 'Want the full story?' : 'Detaylı izlemek istersen'), 84, 318, 'y', A(at(s.ilk, 0))) +
      `<div class="abs foto" style="left:70px;top:430px;width:940px;height:529px"${A(at(s.ilk, 0.05), 'sag')}>${TAM.kapak ? `<img src="${esc(TAM.kapak)}">` : ''}${yt ? `<div class="abs" style="left:50%;top:50%;transform:translate(-50%,-50%);filter:drop-shadow(0 10px 24px rgba(0,0,0,.6))">${ytLogo(190)}</div>` : ''}</div>` +
      `<div class="abs" style="left:70px;top:990px;width:940px;height:108px;overflow:hidden;font-weight:800;font-size:${bs.length > 84 ? 38 : 44}px;line-height:1.18;letter-spacing:-.02em"${A(at(s.ilk, 0.25))}>${esc(bs)}</div>` +
      `<div class="abs kart acik" style="left:70px;top:1130px;width:940px;height:170px;padding:0 34px;display:flex;align-items:center;gap:30px"${A(at(s.ilk, 0.45))}>${logo(130)}<div><div style="font-weight:800;font-size:30px;color:#5b6780;letter-spacing:.02em">${ust}</div><div style="font-weight:900;font-size:${Math.min(60, Math.floor(1260 / Math.max(14, link.length)))}px;line-height:1.1;letter-spacing:-.03em;white-space:nowrap">${esc(link || (en ? 'Link in description' : 'Link açıklamada'))}</div></div></div>` +
      `<div class="abs" style="left:70px;top:1326px;width:940px;text-align:center;font-weight:700;font-size:30px;color:#9aa6bf;white-space:nowrap;overflow:hidden"${A(at(s.ilk, 0.65))}>${alt}</div>`;
  } },
};

// --- kurulum ---
let master; const CAPS = [];
const capEl = document.getElementById('cap');
const KIP = {
  pop: { opacity: 0, scale: 0.55, y: 36, duration: 0.34, ease: 'back.out(2)' },
  sol: { opacity: 0, x: -260, duration: 0.38, ease: 'power3.out' },
  sag: { opacity: 0, x: 260, duration: 0.38, ease: 'power3.out' },
  ciz: { opacity: 0, scaleX: 0, transformOrigin: '0 50%', duration: 0.34, ease: 'power2.out' },
};
function kur() {
  const m = String(D.marka || 'ThirdHand AI').trim().split(' '), son = m.length > 1 ? m.pop() : '';
  document.getElementById('logo').innerHTML = esc(m.join(' ')) + (son ? ` <i>${esc(son)}</i>` : '');
  const kok = document.getElementById('sahneler'); master = gsap.timeline({ paused: true });
  const S = (D.sahneler || []).filter((s) => T[s.tip] && s.ilk >= 0 && s.ilk < L.length).sort((a, b) => a.ilk - b.ilk);
  S.forEach((s, i) => { s.t0 = i === 0 ? 0 : +(L[s.ilk].a - 0.1).toFixed(3); s.son = i < S.length - 1 ? S[i + 1].ilk - 1 : L.length - 1; });
  S.forEach((s, i) => {
    s.t1 = i < S.length - 1 ? S[i + 1].t0 : TOPLAM;
    const tip = T[s.tip], el = document.createElement('div'); el.className = 'sh';
    el.innerHTML = (tip.koyu ? '<div class="panel"></div>' : '') + `<div class="shic">${tip.html(s)}</div>`;
    kok.appendChild(el); s.el = el;
    // geniş harfli büyük kelime (M, N, U) sağ kenardan taşmasın: sığana kadar küçült
    el.querySelectorAll('.dev').forEach((d) => { let f = parseFloat(d.style.fontSize) || 0; const sinir = 1080 - 56 - (parseFloat(d.style.left) || 0); while (f > 60 && d.offsetWidth > sinir) { f -= 4; d.style.fontSize = f + 'px'; } });
    const q1 = (x) => el.querySelector(x), q = (x) => el.querySelectorAll(x);
    if (i > 0) {
      master.from(q1('.shic'), { opacity: 0, y: i % 2 ? 90 : -90, duration: 0.24, ease: 'power3.out' }, s.t0);
      if (tip.koyu) master.from(q1('.panel'), { scaleY: 0, transformOrigin: '50% 50%', duration: 0.26, ease: 'power3.out' }, s.t0);
    }
    q('[data-t]').forEach((e) => master.from(e, Object.assign({}, KIP[e.dataset.k] || KIP.pop), Math.min(Math.max(s.t0, +e.dataset.t), Math.max(s.t0, s.t1 - 0.5))));
    q('.yz').forEach((e, j) => master.to(e, { y: -14, duration: 0.9 + (j % 3) * 0.15, ease: 'sine.inOut', yoyo: true, repeat: Math.ceil((s.t1 - s.t0) / 0.9) + 1 }, s.t0));
    if (tip.anim) tip.anim(master, s, q1, q);
  });
  window.__S = S;
  altyaziKur();
  window.INFO = { W: 1080, H: 1920, total: TOPLAM, sahne: S.length };
  seek(0);
}
// altyazı: cümle kısa parçalara bölünür, söylenen kelime beyaz, sıradaki soluk, anahtar kelime tema renginde
function altyaziKur() {
  const MAX = 22, sade = (w) => w.toLocaleLowerCase(D.dil === 'en' ? 'en-US' : 'tr-TR').replace(/[^0-9a-zçğıöşü.]/g, '').replace(/\.$/, '');
  L.forEach((s) => {
    const ws = String(s.yazi).split(' '), par = []; let cur = [];
    ws.forEach((w) => { if (cur.length && (cur.join(' ').length + 1 + w.length) > MAX) { par.push(cur); cur = []; } cur.push(w); }); if (cur.length) par.push(cur);
    if (par.length > 1 && par[par.length - 1].join(' ').length < 6) { const l = par.pop(); par[par.length - 1] = par[par.length - 1].concat(l); }
    const tot = s.yazi.length, vg = (s.vurgu || []).map((v) => sade(String(v))); let acc = 0;
    par.forEach((c, k) => {
      const st = s.a + (s.b - s.a) * acc / tot; acc += c.join(' ').length + 1; const en = s.a + (s.b - s.a) * Math.min(1, acc / tot);
      CAPS.push({ st, en, w: c, vg: c.map((w) => vg.includes(sade(w))), hold: en + (k === par.length - 1 ? 0.35 : 0) });
    });
  });
  CAPS.forEach((c, i) => { const n = CAPS[i + 1]; if (n && n.st < c.hold) c.hold = n.st; });
}
function altyaziCiz(t) {
  let k = -1; for (let i = 0; i < CAPS.length; i++) { if (t >= CAPS[i].st - 0.05 && t < CAPS[i].hold) { k = i; break; } }
  if (k < 0) { capEl.innerHTML = ''; return; }
  const c = CAPS[k], tot = c.w.join(' ').length, pr = Math.max(0, Math.min(0.999, (t - c.st) / (c.en - c.st))); let acc = 0, h = '';
  c.w.forEach((w, j) => { const a = acc / tot; acc += w.length + 1; h += `<span class="${pr >= a ? (c.vg[j] ? 'vg' : '') : 'nx'}">${esc(w)}</span> `; });
  const sc = 0.92 + 0.08 * Math.min(1, (t - c.st + 0.05) / 0.12);
  // uzun parça ekran genişliğine sığsın diye yazı küçülür
  const fs = tot > 26 ? Math.floor(62 * 26 / tot) : 62;
  capEl.innerHTML = `<div style="transform:scale(${sc});font-size:${fs}px">${h.trim()}</div>`;
}
function seek(t) {
  master.time(t, false);
  window.__S.forEach((s) => { s.el.style.visibility = t >= s.t0 - 0.001 && t < s.t1 ? 'visible' : 'hidden'; });
  altyaziCiz(t);
}
kur();
