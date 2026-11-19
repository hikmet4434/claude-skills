/**
 * GitNexus reverse proxy — serves production web UI + proxies /api/* to backend.
 * Zero dependencies, Node.js built-ins only.
 *
 * Usage: node proxy.mjs <dist-dir> [port]
 *   dist-dir: path to gitnexus-web/dist (production build)
 *   port: listen port (default: 8888)
 *
 * Environment:
 *   API_PORT: GitNexus serve backend port (default: 4747)
 *   HOST:     Bind host (default: 127.0.0.1)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const API_PORT = parseInt(process.env.API_PORT || '4747', 10);
const HOST = process.env.HOST || '127.0.0.1';
const DIST_DIR = process.argv[2] || './dist';
const ROOT_DIR = path.resolve(DIST_DIR);
const PORT = parseInt(process.argv[3] || '8888', 10);

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.wasm': 'application/wasm',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

function proxyToApi(req, res) {
  const opts = {
    hostname: '127.0.0.1',
    port: API_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `127.0.0.1:${API_PORT}` },
  };
  const proxy = http.request(opts, (upstream) => {
    res.writeHead(upstream.statusCode, upstream.headers);
    upstream.pipe(res, { end: true });
  });
  proxy.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('GitNexus backend unavailable — is `npx gitnexus serve` running?');
  });
  req.pipe(proxy, { end: true });
}

function serveStatic(req, res) {
  const rawUrlPath = (req.url || '/').split('?')[0];
  let urlPath;
  try {
    urlPath = decodeURIComponent(rawUrlPath);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad request');
    return;
  }

  if (!urlPath.startsWith('/') || urlPath.includes('\0')) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const target =
    urlPath === '/'
      ? path.join(ROOT_DIR, 'index.html')
      : path.resolve(ROOT_DIR, '.' + urlPath);
  if (target !== ROOT_DIR && !target.startsWith(ROOT_DIR + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  let filePath = target === ROOT_DIR ? path.join(ROOT_DIR, 'index.html') : target;

  // SPA fallback: if file doesn't exist and isn't a static asset, serve index.html
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    filePath = path.join(ROOT_DIR, 'index.html');
  }

  try {
    const realRoot = fs.realpathSync(ROOT_DIR);
    const realFile = fs.realpathSync(filePath);
    if (realFile !== realRoot && !realFile.startsWith(realRoot + path.sep)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    const ext = path.extname(realFile);
    const mime = MIME[ext] || 'application/octet-stream';
    const data = fs.readFileSync(realFile);
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}

const server = http.createServer((req, res) => {
  if ((req.url || '/').startsWith('/api')) {
    proxyToApi(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`GitNexus proxy listening on http://${HOST}:${PORT}`);
  console.log(`  Web UI: http://${HOST}:${PORT}/`);
  console.log(`  API:    http://${HOST}:${PORT}/api/repos`);
  console.log(`  Backend: http://127.0.0.1:${API_PORT}`);
});
