# Kod Best Practices

## Genel Prensipler

### 1. Tek Sorumluluk Prensibi
Her fonksiyon/component tek bir iş yapsın.

### 2. DRY (Don't Repeat Yourself)
Tekrar eden kodu fonksiyonlara/component'lere taşı.

### 3. Açıklayıcı İsimlendirme
```javascript
// ❌ Kötü
const a = getData();
const x = a.filter(y => y.z > 10);

// ✅ İyi
const users = getUserList();
const activeUsers = users.filter(user => user.loginCount > 10);
```

## Frontend Best Practices

### React Component Yapısı
```javascript
// ✅ İyi yapı
const UserCard = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = async () => {
    try {
      await onEdit(user.id, data);
      setIsEditing(false);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };
  
  return (
    <div className="p-4 border rounded">
      {/* Component içeriği */}
    </div>
  );
};
```

### State Management
- Local state: `useState` kullan
- Global state: Context API veya Zustand
- Server state: React Query veya SWR

### Tailwind CSS Kullanımı
```javascript
// ✅ Responsive design
<div className="
  p-4 md:p-6 lg:p-8
  text-sm md:text-base lg:text-lg
  flex flex-col md:flex-row
">
  {/* İçerik */}
</div>
```

## Backend Best Practices

### API Endpoint Yapısı
```javascript
// ✅ RESTful endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Validation
    if (!email || !name) {
      return res.status(400).json({ 
        error: 'Email ve name gerekli' 
      });
    }
    
    // İşlem
    const user = await createUser({ email, name });
    
    // Response
    return res.status(201).json({ 
      success: true, 
      data: user 
    });
    
  } catch (error) {
    console.error('User creation failed:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});
```

### Error Handling
```javascript
// ✅ Merkezi error handling
const errorHandler = (error, req, res, next) => {
  console.error(error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);
```

## Database Best Practices

### Schema Design
```sql
-- ✅ İyi schema tasarımı
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index'ler
CREATE INDEX idx_users_email ON users(email);

-- Constraints
ALTER TABLE users ADD CONSTRAINT check_email_format 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');
```

## Security Best Practices

### 1. Environment Variables
```javascript
// ✅ Hassas bilgileri .env'de tut
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
```

### 2. Input Validation
```javascript
// ✅ Her input'u validate et
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 3. SQL Injection Koruması
```javascript
// ❌ SQL Injection riski
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Parametreli query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', email);
```

## Performance Best Practices

### 1. Lazy Loading
```javascript
// ✅ Component'leri lazy load et
const Dashboard = lazy(() => import('./Dashboard'));
```

### 2. Memoization
```javascript
// ✅ Expensive hesaplamaları cache'le
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

### 3. Code Splitting
```javascript
// ✅ Route-based code splitting
const routes = [
  { path: '/', component: lazy(() => import('./Home')) },
  { path: '/dashboard', component: lazy(() => import('./Dashboard')) }
];
```

## Testing Best Practices

### Unit Tests
```javascript
// ✅ Her fonksiyonu test et
describe('calculateTotal', () => {
  it('should sum all items', () => {
    const items = [10, 20, 30];
    expect(calculateTotal(items)).toBe(60);
  });
  
  it('should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### Integration Tests
```javascript
// ✅ API endpoint'leri test et
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com', name: 'Test' });
    
    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('test@test.com');
  });
});
```
