# Proje Planlama Şablonu

## Kullanıcı İsteği Analizi

### Orijinal İstek
[Kullanıcının tam isteği]

### İşlevsel Gereksinimler
- Core özellik 1
- Core özellik 2
- Core özellik 3

### Teknik Gereksinimler
- Frontend: [React/Next.js/HTML]
- Backend: [Node/Python/Supabase]
- Database: [PostgreSQL/Firebase/Supabase]
- Auth: [Supabase/Firebase/Custom]

## Mimari Tasarım

### Bileşen Yapısı
```
project/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── utils/
├── backend/
│   ├── api/
│   ├── services/
│   └── models/
└── database/
    └── schema.sql
```

### API Endpoints
- `GET /api/...` - [Açıklama]
- `POST /api/...` - [Açıklama]
- `PUT /api/...` - [Açıklama]
- `DELETE /api/...` - [Açıklama]

### Database Schema
```sql
-- Ana tablolar
CREATE TABLE users (
  id UUID PRIMARY KEY,
  ...
);
```

## Uygulama Adımları

### Adım 1: Backend Setup (5 dakika)
- Database schema oluştur
- API endpoints yaz
- Auth middleware ekle
- Test et

### Adım 2: Frontend Development (10 dakika)
- Component'leri oluştur
- API entegrasyonu
- State management
- UI/UX polish

### Adım 3: Entegrasyon (5 dakika)
- Frontend-Backend bağlantı
- Error handling
- Loading states
- Edge cases

### Adım 4: Deployment (5 dakika)
- Environment variables
- Build & deploy
- Domain setup
- SSL/HTTPS

### Adım 5: Test (5 dakika)
- Manual testing
- Automated tests
- Performance check
- Security scan

## Teslim Kriterleri

✅ Tüm core özellikler çalışıyor
✅ Deployment URL aktif
✅ Error handling tamamlandı
✅ Responsive design
✅ Production-ready code
✅ Kullanım kılavuzu hazır

## Zaman Tahmini
**Toplam: 30 dakika**
