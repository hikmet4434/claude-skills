# Agent Yetenekleri ve Sınırları

## Gemini 3 Flash

### ✅ Güçlü Olduğu Alanlar
- **Hız**: En hızlı yanıt süresi
- **Basit Tasarım**: CSS, HTML, basit layouts
- **UI Component'ler**: Button, card, form elements
- **Styling**: Tailwind, inline CSS
- **İkon ve Grafikler**: SVG, basit animasyonlar

### ❌ Zayıf Olduğu Alanlar
- Kompleks mantık
- State management
- API entegrasyonu
- Database işlemleri
- Güvenlik implementasyonu

### 📊 Performans
- Yanıt süresi: 1-3 saniye
- Token limiti: Orta
- Maliyet: Düşük
- Kalite: Tasarım için yüksek

### 🎯 İdeal Kullanım
```javascript
// ✅ Flash için mükemmel
const Button = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded"
  >
    {children}
  </button>
);

// ✅ Flash için uygun
const ProductCard = ({ product }) => (
  <div className="border rounded p-4">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price}</p>
  </div>
);

// ❌ Flash için uygun değil
const useAuth = () => {
  const [user, setUser] = useState(null);
  // Çok kompleks...
};
```

## Gemini 3 Pro Low

### ✅ Güçlü Olduğu Alanlar
- **Frontend Logic**: useState, useEffect, custom hooks
- **Form Handling**: Validation, submission
- **API Calls**: fetch, axios, data fetching
- **Routing**: React Router, navigation
- **State Management**: Context API, basic Redux
- **Event Handling**: onClick, onChange, onSubmit

### ❌ Zayıf Olduğu Alanlar
- Kompleks backend logic
- Database optimization
- Security best practices
- Performance critical algorithms
- System architecture

### 📊 Performans
- Yanıt süresi: 3-8 saniye
- Token limiti: Orta-Yüksek
- Maliyet: Orta
- Kalite: Frontend için yüksek

### 🎯 İdeal Kullanım
```javascript
// ✅ Pro Low için mükemmel
const useCart = () => {
  const [items, setItems] = useState([]);
  
  const addItem = (product) => {
    setItems(prev => [...prev, product]);
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return { items, addItem, removeItem, total };
};

// ✅ Pro Low için uygun
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <Spinner />;
  return <div>{products.map(p => <ProductCard key={p.id} {...p} />)}</div>;
};

// ❌ Pro Low için uygun değil
const optimizeDatabase = async () => {
  // Çok kompleks DB optimization...
};
```

## Gemini 3 Pro High

### ✅ Güçlü Olduğu Alanlar
- **Backend Development**: Express, FastAPI, APIs
- **Database**: Schema design, optimization, queries
- **Authentication**: JWT, OAuth, sessions
- **Security**: Encryption, validation, sanitization
- **Algorithms**: Complex logic, optimization
- **Architecture**: System design, scalability
- **Performance**: Caching, load balancing

### ❌ Zayıf Olduğu Alanlar
- Basit UI tasarımı (overkill)
- Hızlı prototipleme (yavaş)
- Basit CSS değişiklikleri

### 📊 Performans
- Yanıt süresi: 8-15 saniye
- Token limiti: Yüksek
- Maliyet: Yüksek
- Kalite: Backend için en yüksek

### 🎯 İdeal Kullanım
```javascript
// ✅ Pro High için mükemmel
const createAuthMiddleware = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };
};

// ✅ Pro High için uygun
const optimizeQuery = async (filters) => {
  // Complex query optimization
  const query = Product.find(filters)
    .select('name price category')
    .populate('reviews')
    .lean()
    .cache(3600);
    
  return await query.exec();
};

// ❌ Pro High için uygun değil (overkill)
const Button = () => <button className="p-4">Click</button>;
```

## Karşılaştırma Tablosu

| Kriter | Flash | Pro Low | Pro High |
|--------|-------|---------|----------|
| Hız | ⚡⚡⚡⚡⚡ | ⚡⚡⚡⚡ | ⚡⚡⚡ |
| Tasarım | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Frontend Logic | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Backend | ⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Güvenlik | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Maliyet | 💰 | 💰💰 | 💰💰💰 |

## Proje Tipi → Agent Mapping

### Basit Landing Page
- **Flash**: 80% (tüm UI)
- **Pro Low**: 20% (form logic)
- **Pro High**: 0%

### Todo App
- **Flash**: 40% (UI components)
- **Pro Low**: 60% (CRUD logic)
- **Pro High**: 0% (opsiyonel backend)

### Blog Platform
- **Flash**: 30% (UI design)
- **Pro Low**: 30% (routing, comments)
- **Pro High**: 40% (CMS, database)

### E-commerce
- **Flash**: 25% (product cards, UI)
- **Pro Low**: 30% (cart, filters, search)
- **Pro High**: 45% (payments, auth, inventory)

### Social Media App
- **Flash**: 20% (feed UI, stories)
- **Pro Low**: 30% (interactions, real-time)
- **Pro High**: 50% (backend, notifications, scaling)

## Agent Seçim Karar Ağacı

```
Görev geldi
    │
    ├─ Sadece CSS/HTML/Design?
    │   └─ Flash ✅
    │
    ├─ UI + Form/Validation/API Call?
    │   └─ Pro Low ✅
    │
    ├─ Database/Auth/Complex Logic?
    │   └─ Pro High ✅
    │
    └─ Karma (Design + Logic + Backend)?
        └─ Multi-Agent (hepsi paralel) ✅
```

## Optimizasyon İpuçları

1. **Görev Granülaritesi**: Görevleri küçük parçalara böl
2. **Parallelization**: Bağımsız görevleri paralel çalıştır
3. **Agent Strengths**: Her ajanın güçlü yanını kullan
4. **Cost vs Speed**: Flash önce, Pro High son çare
5. **Integration**: API contract'ları önceden belirle
