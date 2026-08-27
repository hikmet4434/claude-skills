# Deployment Kılavuzu

## Platform Seçimi

### Vercel (Önerilen: Next.js, React)
- **Avantajlar**: Otomatik CI/CD, serverless functions, edge network
- **En iyi**: Next.js, React, static sites
- **Ücretsiz**: 100GB bandwidth, unlimited requests

### Netlify (Önerilen: Static Sites)
- **Avantajlar**: Form handling, split testing, identity
- **En iyi**: React, Vue, static HTML
- **Ücretsiz**: 100GB bandwidth, 300 build minutes

### Railway (Önerilen: Backend APIs)
- **Avantajlar**: Database hosting, Docker support, cron jobs
- **En iyi**: Node.js, Python, PostgreSQL
- **Ücretsiz**: $5 monthly credit

## Vercel Deployment

### 1. Otomatik Deploy
```bash
# Vercel CLI kur
npm i -g vercel

# Deploy
cd /path/to/project
vercel --prod

# Environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_KEY
```

### 2. next.config.js
```javascript
module.exports = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
  async redirects() {
    return [
      {
        source: '/api/:path*',
        has: [{ type: 'host', value: 'old-domain.com' }],
        destination: 'https://new-domain.com/api/:path*',
        permanent: true,
      },
    ];
  },
};
```

### 3. vercel.json (Opsiyonel)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## Netlify Deployment

### 1. netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

### 2. Serverless Functions
```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' })
  };
};
```

## Railway Deployment

### 1. railway.json
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. PostgreSQL Setup
```bash
# Railway CLI
npm i -g @railway/cli
railway login

# Database oluştur
railway add postgresql

# Connection string al
railway variables
```

### 3. Environment Variables
```bash
# Railway dashboard'dan ekle
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_KEY=...
```

## Supabase Integration

### 1. Client Setup
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
```

### 2. Row Level Security (RLS)
```sql
-- Users tablosuna RLS ekle
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Kullanıcı sadece kendi verisini görebilir
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Policy: Kullanıcı kendi verisini güncelleyebilir
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

### 3. Storage Setup
```javascript
// Dosya upload
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`public/${userId}/avatar.png`, file);

// Public URL al
const { publicURL } = supabase.storage
  .from('avatars')
  .getPublicUrl(`public/${userId}/avatar.png`);
```

## Environment Variables

### Development (.env.local)
```bash
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database
DATABASE_URL=postgresql://localhost:5432/mydb

# API Keys
STRIPE_KEY=sk_test_...
SENDGRID_KEY=SG...
```

### Production
```bash
# Vercel
vercel env add SUPABASE_URL production
vercel env add SUPABASE_KEY production

# Netlify
netlify env:set SUPABASE_URL "https://..."
netlify env:set SUPABASE_KEY "eyJ..."

# Railway
railway variables set SUPABASE_URL=https://...
railway variables set SUPABASE_KEY=eyJ...
```

## Post-Deployment Checklist

### ✅ Functionality
- [ ] Tüm sayfalar yükleniyor
- [ ] API endpoints çalışıyor
- [ ] Database bağlantısı aktif
- [ ] Auth flow çalışıyor

### ✅ Performance
- [ ] Lighthouse score >90
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3.5s
- [ ] Images optimize edilmiş

### ✅ Security
- [ ] HTTPS aktif
- [ ] Environment variables secure
- [ ] CORS düzgün ayarlanmış
- [ ] API rate limiting var

### ✅ Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring (Vercel Analytics)

## Troubleshooting

### Build Hatası
```bash
# Cache temizle
rm -rf node_modules package-lock.json
npm install

# Build log'ları kontrol et
vercel logs
netlify build --dry
```

### Runtime Hatası
```bash
# Environment variables kontrol
echo $SUPABASE_URL

# Logs kontrol
vercel logs --follow
railway logs
```

### Database Connection
```bash
# PostgreSQL bağlantı test
psql $DATABASE_URL

# Supabase bağlantı test
curl https://xxxxx.supabase.co/rest/v1/ \
  -H "apikey: $SUPABASE_KEY"
```
