# Base44 SDK Миграцийн Хураангуй

## 🎯 Зорилго

Base44 SDK-г бүрэн устгаж, өөрийн backend API-тай холбох.

---

## 📊 Одоогийн Баталгаажсан Мэдээлэл

### Tech Stack
- ✅ React 18.2.0 + Vite 6.1.0
- ✅ React Router DOM 7.2.0
- ✅ Tailwind CSS + shadcn/ui
- ✅ React Hook Form + Zod
- ⚠️ **React Query ашиглаж байгаа ч package.json-д байхгүй** - нэмэх шаардлагатай

### Base44 SDK Ашиглалт
- **15+ файл** base44 SDK ашиглаж байна
- **10+ Entity төрөл**: Product, Order, Deal, PromoMessage, FeaturedProduct, ContactInfo, SearchQuery, FavoriteProduct, OnlineStore, Message
- **7+ Integration**: UploadFile, SendEmail, InvokeLLM, GenerateImage, ExtractDataFromUploadedFile, CreateFileSignedUrl, UploadPrivateFile
- **5 Authentication функц**: me, updateMe, logout, isAuthenticated, redirectToLogin

---

## 🚀 Санал Болгох Tech Stack

### Backend
**Node.js + Express + PostgreSQL** ⭐⭐⭐⭐⭐ (Санал болгох)

**Шалтгаан:**
- JavaScript ecosystem - frontend болон backend ижил хэл
- Хурдан хөгжүүлэлт
- PostgreSQL - e-commerce-д тохиромжтой, ACID дэмжлэг
- Сайн ачаалал даах чадвар
- Олон npm пакет

### Database
**PostgreSQL** ⭐⭐⭐⭐⭐ (100% үнэгүй, enterprise түвшин)

**Шалтгаан:**
- ACID transaction дэмжлэг
- Relational structure - e-commerce-д тохиромжтой
- JSON/JSONB дэмжлэг
- Сайн performance
- Open source, үнэгүй
- Render/Railway-д included (managed service)

### Frontend
**Одоогийн stack хадгалах** ✅

- React 18.2.0
- Vite 6.1.0
- React Router DOM
- Tailwind CSS + shadcn/ui
- React Query (нэмэх шаардлагатай: `npm install @tanstack/react-query`)

**Нэмэх:**
- `@tanstack/react-query` - API state management (package.json-д нэмэх)
- `axios` - API дуудлага

### Hosting & Infrastructure ⭐⭐⭐⭐⭐

**Frontend Hosting:**
- **Vercel** (Free tier) - Perfect for React + Vite

**Backend + PostgreSQL:**
- **Render** (Free tier) - PostgreSQL included
- **Railway** (Free tier) - Alternative option

**File Storage:**
- **Cloudflare R2** ⭐⭐⭐⭐⭐ (МАШ ЧУХАЛ!)
  - Үнэгүй egress (AWS S3-тэй харьцуулахад $1000+ хэмнэнэ!)
  - S3-compatible API
  - Fast global access
  - $0.015/GB storage

**Auth:**
- **JWT** (өөрийн backend) - Full control

---

## 📋 Шаардлагатай Backend API Endpoints

### Authentication (6 endpoints)
- POST `/api/auth/register` - Бүртгүүлэх
- POST `/api/auth/login` - Нэвтрэх
- POST `/api/auth/logout` - Гарах
- GET `/api/auth/me` - Хэрэглэгчийн мэдээлэл
- PUT `/api/auth/me` - Хэрэглэгчийн мэдээлэл шинэчлэх
- GET `/api/auth/check` - Нэвтрэлт шалгах

### Products (5 endpoints)
- GET `/api/products` - Жагсаалт, хайлт, шүүлт
- GET `/api/products/:id` - Дэлгэрэнгүй
- POST `/api/products` - Нэмэх (admin)
- PUT `/api/products/:id` - Шинэчлэх (admin)
- DELETE `/api/products/:id` - Устгах (admin)

### Orders (5 endpoints)
- GET `/api/orders` - Миний захиалгууд
- GET `/api/orders/:id` - Дэлгэрэнгүй
- POST `/api/orders` - Захиалга үүсгэх
- GET `/api/orders/admin` - Бүх захиалгууд (admin)
- PUT `/api/orders/:id` - Шинэчлэх (admin)

### Favorites (3 endpoints)
- GET `/api/favorites` - Дуртай бараанууд
- POST `/api/favorites` - Нэмэх
- DELETE `/api/favorites/:id` - Хасах

### Stores (4 endpoints)
- GET `/api/stores` - Дэлгүүрүүд
- POST `/api/stores` - Нэмэх (admin)
- PUT `/api/stores/:id` - Шинэчлэх (admin)
- DELETE `/api/stores/:id` - Устгах (admin)

### Messages (4 endpoints)
- GET `/api/messages` - Мессежүүд (admin)
- POST `/api/messages` - Мессеж илгээх
- PUT `/api/messages/:id/read` - Уншсан тэмдэглэх (admin)
- DELETE `/api/messages/:id` - Устгах (admin)

### Promos (4 endpoints)
- GET `/api/promos` - Урамшууллын мессежүүд
- POST `/api/promos` - Нэмэх (admin)
- PUT `/api/promos/:id` - Шинэчлэх (admin)
- DELETE `/api/promos/:id` - Устгах (admin)

### Featured (3 endpoints)
- GET `/api/featured` - Онцлох бараанууд
- POST `/api/featured` - Нэмэх (admin)
- DELETE `/api/featured/:id` - Хасах (admin)

### Search Queries (2 endpoints)
- GET `/api/search-queries` - Хайлтын асуултууд (admin)
- POST `/api/search-queries` - Нэмэх/шинэчлэх

### Deals (4 endpoints)
- GET `/api/deals` - Худалдааны саналууд
- POST `/api/deals` - Үүсгэх
- PUT `/api/deals/:id` - Шинэчлэх
- DELETE `/api/deals/:id` - Устгах

### File Upload (3 endpoints)
- POST `/api/upload` - Файл байршуулах
- POST `/api/upload/private` - Хувийн файл байршуулах
- GET `/api/files/:id/signed-url` - Гарын үсэгтэй URL

### Contacts (4 endpoints) - Admin only
- GET `/api/contacts` - Холбоо барих мэдээлэл
- POST `/api/contacts` - Нэмэх
- PUT `/api/contacts/:id` - Шинэчлэх
- DELETE `/api/contacts/:id` - Устгах

**Нийт: ~47 endpoints**

---

## 🔄 Миграцийн Алхмууд

### 1. Backend Бэлдэх (1-2 долоо хоног)
- [ ] Backend project үүсгэх
- [ ] PostgreSQL database schema үүсгэх
- [ ] Authentication system (JWT)
- [ ] API endpoints хөгжүүлэх
- [ ] File upload system
- [ ] Testing

### 2. Frontend API Client Бэлдэх (2-3 өдөр)
- [ ] API client үүсгэх (axios instance)
- [ ] Authentication context/provider
- [ ] React Query hooks
- [ ] Error handling

### 3. Frontend Файлуудыг Өөрчлөх (3-5 өдөр)
- [ ] Base44 SDK устгах
- [ ] Файлуудыг шинэ API-тай холбох
- [ ] Authentication flow өөрчлөх
- [ ] Testing

### 4. Cleanup ба Deployment (1-2 өдөр)
- [ ] Code cleanup
- [ ] Environment variables
- [ ] Deployment

---

## 📁 Файлын Өөрчлөлт

### Устгах ❌
- `src/api/base44Client.js`
- `src/api/entities.js` (шинээр бичнэ)
- `src/api/integrations.js` (шинээр бичнэ)
- `package.json`: `"@base44/sdk": "^0.1.2"`

### Шинэ Файлууд ➕
- `src/api/client.js` - Axios instance
- `src/api/auth.js` - Authentication API
- `src/api/products.js` - Product API
- `src/api/orders.js` - Order API
- `src/api/favorites.js` - Favorite API
- `src/api/stores.js` - Store API
- `src/api/messages.js` - Message API
- `src/api/promos.js` - Promo API
- `src/api/featured.js` - Featured API
- `src/api/deals.js` - Deal API
- `src/api/upload.js` - File upload
- `src/contexts/AuthContext.jsx` - Auth context
- `src/hooks/useAuth.js` - Auth hook

### Өөрчлөх ✏️
**Pages (15 файл):**
- Shop.jsx
- Profile.jsx
- Checkout.jsx
- MyOrders.jsx
- Favorites.jsx
- CategoryProducts.jsx
- Contact.jsx
- PromoAdmin.jsx
- OnlineStores.jsx
- Pipeline.jsx
- index.jsx (route guards)

**Components (7 файл):**
- FeaturedProducts.jsx
- PopularStores.jsx
- ProductCard.jsx
- ProductMarquee.jsx
- ContactManagement.jsx
- ProductManagement.jsx
- DealCard.jsx (хэрэв шаардлагатай)

**Package.json:**
```json
{
  "dependencies": {
    "@base44/sdk": "^0.1.2", // ❌ Устгах
    "@tanstack/react-query": "^5.x.x", // ✅ Нэмэх
    "axios": "^1.6.2" // ✅ Нэмэх
  }
}
```

---

## 📝 Шаардлагатай Мэдээлэл (Хэрэглэгчээс)

Миграцийг эхлүүлэхийн тулд:

1. **Backend домэйн/URL**: 
   - Development: `http://localhost:3000`
   - Production: `https://api.yourdomain.com`

2. **Database**:
   - PostgreSQL connection string
   - Database name

3. **JWT Secret**: Token гарын үсэглэх нууц үг

4. **File Storage**:
   - Local filesystem path эсвэл
   - S3 credentials (access key, secret key, bucket name, region)

5. **Email Service** (optional):
   - SMTP server эсвэл
   - SendGrid/Mailgun API key

6. **Environment Variables**:
   - Development болон production тохиргоо

---

## 📚 Дэлгэрэнгүй Баримт

- **MIGRATION_PLAN.md** - Дэлгэрэнгүй төлөвлөгөө
- **API_ENDPOINTS_SPEC.md** - API endpoints-ийн дэлгэрэнгүй тодорхойлолт

---

## ⏭️ Дараагийн Алхам

1. ✅ Төслийн шинжилгээ хийсэн
2. ✅ Технологийн стек судалсан
3. ✅ Миграцийн төлөвлөгөө боловсруулсан
4. ✅ API endpoints тодорхойлсон
5. ⏳ **Хэрэглэгчээс мэдээлэл авах** (backend URL, database, гэх мэт)
6. ⏳ Backend хөгжүүлэлт эхлүүлэх
7. ⏳ Frontend API client хөгжүүлэх
8. ⏳ Миграци хийх
9. ⏳ Testing болон deployment

---

**Асуулт эсвэл тусламж хэрэгтэй бол хэлнэ үү!** 🚀

