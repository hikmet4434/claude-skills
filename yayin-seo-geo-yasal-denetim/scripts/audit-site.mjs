#!/usr/bin/env node

const raw = process.argv[2];
const jsonOnly = process.argv.includes("--json");
if (!raw) {
  console.error("Kullanım: node audit-site.mjs https://example.com [--json]");
  process.exit(64);
}

const base = new URL(raw);
base.pathname = base.pathname.replace(/\/$/, "");
const origin = base.origin;
const timeoutMs = 15000;

async function get(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(path.startsWith("http") ? path : `${origin}${path}`, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "release-seo-geo-legal-audit/1.0" }
    });
    return { status: response.status, url: response.url, text: await response.text(), contentType: response.headers.get("content-type") || "" };
  } catch (error) {
    return { status: 0, url: path, text: "", error: error instanceof Error ? error.message : String(error), contentType: "" };
  } finally {
    clearTimeout(timer);
  }
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

const [home, robots, sitemap, llms] = await Promise.all([
  get(base.href), get("/robots.txt"), get("/sitemap.xml"), get("/llms.txt")
]);
const title = match(home.text, /<title[^>]*>([\s\S]*?)<\/title>/i);
const description = match(home.text, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
  match(home.text, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
const canonical = match(home.text, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i) ||
  match(home.text, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
const jsonLdBlocks = [...home.text.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
let validJsonLd = 0;
for (const block of jsonLdBlocks) {
  try { JSON.parse(block[1]); validJsonLd += 1; } catch {}
}
const legalSignals = {
  privacy: /(?:gizlilik|privacy)/i.test(home.text + sitemap.text),
  terms: /(?:kullanim-kosullari|kullanım şartları|terms)/i.test(home.text + sitemap.text),
  cookies: /(?:cerez|çerez|cookie)/i.test(home.text + sitemap.text),
  contact: /(?:iletisim|iletişim|contact)/i.test(home.text + sitemap.text)
};

const checks = [
  ["home_http", home.status >= 200 && home.status < 400, home.status],
  ["title", title.length > 0, title],
  ["description", description.length > 0, description],
  ["canonical", /^https?:\/\//.test(canonical), canonical],
  ["robots_http", robots.status === 200, robots.status],
  ["robots_sitemap", /sitemap:/i.test(robots.text), /sitemap:/i.test(robots.text)],
  ["sitemap_http", sitemap.status === 200, sitemap.status],
  ["sitemap_xml", /<urlset|<sitemapindex/i.test(sitemap.text), /<urlset|<sitemapindex/i.test(sitemap.text)],
  ["json_ld", validJsonLd > 0, `${validJsonLd}/${jsonLdBlocks.length}`]
];
const warnings = [];
if (llms.status !== 200) warnings.push("llms.txt yok (opsiyonel GEO yardımcısı)");
for (const [name, present] of Object.entries(legalSignals)) if (!present) warnings.push(`${name} sayfası/sinyali bulunamadı`);
const failures = checks.filter(([, ok]) => !ok).map(([name]) => name);
const report = {
  target: base.href,
  resolvedUrl: home.url,
  checks: Object.fromEntries(checks.map(([name, ok, value]) => [name, { ok, value }])),
  legalSignals,
  llms: { status: llms.status },
  warnings,
  failures
};

if (jsonOnly) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Yayın denetimi: ${base.href}`);
  for (const [name, ok, value] of checks) console.log(`${ok ? "✓" : "✗"} ${name}: ${String(value).slice(0, 180)}`);
  for (const warning of warnings) console.log(`! ${warning}`);
}
process.exitCode = failures.length ? 2 : 0;
