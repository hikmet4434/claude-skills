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
const hreflangs = [...home.text.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi)]
  .map(([, language, href]) => ({ language, href }));
const metaRobots = match(home.text, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
  match(home.text, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["'][^>]*>/i);
const ogTitle = match(home.text, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
  match(home.text, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["'][^>]*>/i);
const ogDescription = match(home.text, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
  match(home.text, /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:description["'][^>]*>/i);
const legalDefinitions = {
  privacy: {
    pattern: /(?:gizlilik|privacy|kişisel veriler|kisisel veriler|kvkk)/i,
    paths: ["/gizlilik", "/gizlilik-politikasi", "/privacy", "/privacy-policy", "/kvkk"]
  },
  terms: {
    pattern: /(?:kullanim-kosullari|kullanım koşulları|kullanim-sartlari|kullanım şartları|terms(?:-of-service)?)/i,
    paths: ["/kullanim-kosullari", "/kullanim-sartlari", "/terms", "/terms-of-service"]
  },
  cookies: {
    pattern: /(?:cerez|çerez|cookie)/i,
    paths: ["/cerez-politikasi", "/cerezler", "/cookies", "/cookie-policy"]
  },
  contact: {
    pattern: /(?:iletisim|iletişim|contact|destek|support)/i,
    paths: ["/iletisim", "/contact", "/destek", "/support"]
  }
};
const legalCorpus = home.text + sitemap.text;
const missingLegal = Object.entries(legalDefinitions).filter(([, definition]) => !definition.pattern.test(legalCorpus));
const routeResults = await Promise.all(missingLegal.flatMap(([name, definition]) =>
  definition.paths.map(async path => ({ name, path, definition, response: await get(path) }))
));
const legalRoutes = {};
for (const { name, path, definition, response } of routeResults) {
  if (legalRoutes[name]) continue;
  const resolvedPath = (() => { try { return new URL(response.url).pathname; } catch { return ""; } })();
  const routeStayedDistinct = resolvedPath !== "/" && resolvedPath !== base.pathname;
  if (response.status === 200 && routeStayedDistinct && definition.pattern.test(response.text)) legalRoutes[name] = path;
}
const legalSignals = Object.fromEntries(Object.entries(legalDefinitions).map(([name, definition]) => [
  name,
  definition.pattern.test(legalCorpus) || Boolean(legalRoutes[name])
]));
const aiBotNames = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended"];
const robotsLower = robots.text.toLowerCase();
const aiPolicy = Object.fromEntries(aiBotNames.map(name => [name, robotsLower.includes(`user-agent: ${name.toLowerCase()}`) ? "explicit" : "default"]));

const checks = [
  ["home_http", home.status >= 200 && home.status < 400, home.status],
  ["title", title.length > 0, title],
  ["description", description.length > 0, description],
  ["canonical", /^https?:\/\//.test(canonical), canonical],
  ["hreflang_urls", hreflangs.every(item => /^https?:\/\//.test(item.href)), hreflangs],
  ["meta_robots", !/noindex/i.test(metaRobots), metaRobots || "index varsayımı"],
  ["open_graph", Boolean(ogTitle && ogDescription), `${Boolean(ogTitle)}/${Boolean(ogDescription)}`],
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
  legalRoutes,
  aiCrawlerPolicy: aiPolicy,
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
