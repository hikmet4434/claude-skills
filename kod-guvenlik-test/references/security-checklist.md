# Güvenlik Kontrol Listesi

## 1. Authentication & Authorization

### Password Güvenliği
```javascript
// ❌ Kötü
const password = req.body.password;
user.password = password; // Plaintext

// ✅ İyi
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(req.body.password, 10);
user.password = hashedPassword;
```

### JWT Token Güvenliği
```javascript
// ❌ Kötü
const token = jwt.sign({ userId: user.id }, 'secret');

// ✅ İyi
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '1h', algorithm: 'HS256' }
);
```

### Rate Limiting
```javascript
// ✅ Express rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // max 100 request
  message: 'Too many requests'
});

app.use('/api/', limiter);
```

## 2. Input Validation

### SQL Injection Koruması
```javascript
// ❌ SQL Injection riski
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Parametreli query (Supabase)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', email);

// ✅ Parametreli query (Raw SQL)
const { rows } = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
```

### XSS Koruması
```javascript
// ❌ XSS riski
const html = `<div>${userInput}</div>`;

// ✅ React auto-escape
const Component = () => <div>{userInput}</div>;

// ✅ Manual escape
const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
```

### File Upload Güvenliği
```javascript
// ✅ File upload validation
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});
```

## 3. Data Protection

### Environment Variables
```javascript
// ❌ Hardcoded secrets
const apiKey = 'sk_live_abc123';

// ✅ Environment variables
const apiKey = process.env.STRIPE_SECRET_KEY;
```

### Secure Cookies
```javascript
// ✅ Secure cookie settings
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // No JS access
    sameSite: 'strict', // CSRF protection
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
```

### CORS Configuration
```javascript
// ❌ Tüm origin'lere açık
app.use(cors());

// ✅ Specific origins
const cors = require('cors');

app.use(cors({
  origin: ['https://myapp.com', 'https://www.myapp.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### Security Headers
```javascript
// ✅ Helmet kullan
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## 4. Error Handling

### Güvenli Error Messages
```javascript
// ❌ Çok fazla bilgi ifşa ediyor
app.use((err, req, res, next) => {
  res.status(500).json({ 
    error: err.message,
    stack: err.stack // ❌ Stack trace production'da olmamalı
  });
});

// ✅ Güvenli error handling
app.use((err, req, res, next) => {
  console.error(err); // Log et
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});
```

### Logging
```javascript
// ✅ Structured logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Kullanım
logger.error('Database connection failed', { 
  error: err.message,
  userId: user.id
});
```

## 5. Dependencies

### npm audit
```bash
# Güvenlik açıklarını kontrol et
npm audit

# Otomatik düzelt
npm audit fix

# Force fix (breaking changes olabilir)
npm audit fix --force
```

### Package version control
```json
// package.json
{
  "dependencies": {
    "express": "^4.18.0", // ✅ Caret - minor updates
    "lodash": "4.17.21"   // ✅ Exact - no auto update
  }
}
```

## 6. Database Security

### Row Level Security (Supabase)
```sql
-- RLS aktif et
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Kullanıcı sadece kendi verisini görebilir
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Policy: Admin tüm veriyi görebilir
CREATE POLICY "Admins can view all data"
  ON users FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

### Prepared Statements
```javascript
// ✅ PostgreSQL prepared statement
const { rows } = await pool.query(
  'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
  [email, name]
);
```

## 7. API Security

### API Key Protection
```javascript
// ✅ API key middleware
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
};

app.use('/api/internal', validateApiKey);
```

### Request Size Limit
```javascript
// ✅ Body size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
```

## 8. Frontend Security

### Content Security Policy
```html
<!-- ✅ CSP meta tag -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://cdn.example.com">
```

### Secure localStorage
```javascript
// ❌ Hassas data localStorage'da
localStorage.setItem('token', jwtToken);

// ✅ HttpOnly cookie kullan (backend'den set et)
res.cookie('token', jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

## Hızlı Güvenlik Tarama Komutu

```bash
# npm audit
npm audit

# OWASP Dependency Check
dependency-check --scan ./

# ESLint security plugin
npx eslint . --ext .js,.jsx --config .eslintrc-security.json

# Git secrets scan
git secrets --scan
```

## Acil Durum Checklist

Eğer güvenlik ihlali tespit edildiyse:

1. ✅ Sistemi hemen kapat/sınırla
2. ✅ Etkilenen kullanıcıları tespit et
3. ✅ Log'ları incele
4. ✅ Güvenlik açığını patch'le
5. ✅ Kullanıcıları bilgilendir
6. ✅ Password reset zorunlu kıl
7. ✅ Post-mortem raporu yaz
