# Base44 SDK Миграцийн Төлөвлөгөө

## 📋 Агуулга

1. [Одоогийн Төслийн Шинжилгээ](#одоогийн-төслийн-шинжилгээ)
2. [Технологийн Стекийн Санал](#технологийн-стек-санал)
3. [Шаардлагатай Backend API Endpoints](#шаардлагатай-backend-api-endpoints)
4. [Миграцийн Алхмууд](#миграцийн-алхмууд)
5. [Өөрчлөх Файлуудын Жагсаалт](#өөрчлөх-файлуудын-жагсаалт)

---

## Одоогийн Төслийн Шинжилгээ

### Одоогийн Tech Stack
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 6.1.0
- **Routing**: React Router DOM 7.2.0
- **State Management**: React Query (@tanstack/react-query) - байгаа эсэхийг баталгаажуулах шаардлагатай
- **UI Library**: Radix UI + shadcn/ui + Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Backend SDK**: @base44/sdk ^0.1.2 ❌ (устгах)

### Base44 SDK-ийн Ашиглалт

#### 1. Authentication (Нэвтрэлт)
```javascript
base44.auth.me()              // Хэрэглэгчийн мэдээлэл авах
base44.auth.updateMe(data)    // Хэрэглэгчийн мэдээлэл шинэчлэх
base44.auth.logout()          // Гарах
base44.auth.isAuthenticated() // Нэвтрэлт шалгах
base44.auth.redirectToLogin() // Нэвтрэх хуудас руу чиглүүлэх
```

#### 2. Entities (Бүтээгдэхүүн)
- `Product` - Бараа
- `Order` - Захиалга
- `Deal` - Худалдааны санал
- `PromoMessage` - Урамшууллын мессеж
- `FeaturedProduct` - Онцлох бараа
- `ContactInfo` - Холбоо барих мэдээлэл
- `SearchQuery` - Хайлтын асуулт
- `FavoriteProduct` - Дуртай бараа
- `OnlineStore` - Онлайн дэлгүүр
- `Message` - Мессеж

**CRUD үйлдлүүд:**
- `.list()` - Жагсаалт авах
- `.filter({...})` - Шүүлт хийх
- `.create(data)` - Үүсгэх
- `.update(id, data)` - Шинэчлэх
- `.delete(id)` - Устгах

#### 3. Integrations (Холболтууд)
- `Core.UploadFile` - Файл байршуулах
- `Core.SendEmail` - Имэйл илгээх
- `Core.InvokeLLM` - LLM дуудах
- `Core.GenerateImage` - Зураг үүсгэх
- `Core.ExtractDataFromUploadedFile` - Файлаас өгөгдөл гаргах
- `Core.CreateFileSignedUrl` - Гарын үсэгтэй URL үүсгэх
- `Core.UploadPrivateFile` - Хувийн файл байршуулах

### Ашиглалтын Статистик
- **Файлуудын тоо**: ~15 файл base44 SDK ашиглаж байна
- **Entity төрөл**: 10+ төрөл
- **Integration төрөл**: 7+ төрөл
- **Authentication функцийн дугаарын тоо**: 5

---

## Технологийн Стек Санал

### 🎯 Backend Stack Сонголт

#### Сонголт 1: Node.js + Express + PostgreSQL (Санал болгох) ⭐
**Давуу тал:**
- JavaScript ecosystem - frontend болон backend ижил хэл
- Хурдан хөгжүүлэлт
- Олон npm пакет, бэлэн шийдэл
- Express.js - хөнгөн, уян хатан
- PostgreSQL - найдвартай, ACID дэмжлэг, нарийн өгөгдлийн бүтэц

**Ачаалал даах чадвар:**
- Cluster mode дэмжлэг
- Redis кэш интеграци
- Horizontal scaling боломжтой
- Nginx load balancer-тэй сайн ажилладаг

**Хурд:**
- Async/await дэмжлэг
- Connection pooling
- Query optimization

**Хэрэглэх пакет:**
```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",              // PostgreSQL client
  "bcryptjs": "^2.4.3",         // Password hashing
  "jsonwebtoken": "^9.0.2",     // JWT authentication (өөрийн backend)
  "@aws-sdk/client-s3": "^3.x", // Cloudflare R2 (S3-compatible)
  "multer": "^1.4.5",           // File upload middleware
  "multer-s3": "^3.0.1",        // Multer + S3/R2 integration
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1",
  "nodemailer": "^6.9.7",       // Email sending (optional)
  "sharp": "^0.33.0"            // Image optimization
}
```

#### Сонголт 2: Python + FastAPI + PostgreSQL
**Давуу тал:**
- Маш хурдан (Uvicorn ASGI server)
- Автомат API documentation (Swagger)
- Type hints дэмжлэг
- Machine learning интеграци хялбар

**Ачаалал даах чадвар:**
- Async дэмжлэг
- Gunicorn + Uvicorn workers
- High concurrency

#### Сонголт 3: Go + Gin + PostgreSQL
**Давуу тал:**
- Маш хурдан гүйцэтгэл
- Бага memory ашиглалт
- Concurrent programming дэмжлэг
- Single binary deployment

**Сул тал:**
- Хөгжүүлэлт удаан (statically typed)
- Ecosystem бага

### 💾 Database Сонголт

#### PostgreSQL (Санал болгох) ⭐
**Давуу тал:**
- ACID transaction дэмжлэг
- Relational data structure - e-commerce-д тохиромжтой
- JSON/JSONB дэмжлэг
- Full-text search (tsvector)
- Маш сайн performance
- Open source, үнэгүй

**Index болон Optimization:**
- B-tree indexes
- Partial indexes
- Composite indexes
- Query planner optimization

#### MongoDB (Альтернатив)
**Давуу тал:**
- NoSQL - уян хатан schema
- Horizontal scaling
- Document-based

**Сул тал:**
- Transaction дэмжлэг хязгаартай (4.0+)
- E-commerce-д relational structure илүү тохиромжтой

### 🎨 Frontend Stack (Одоогийн - хадгалах)

Одоогийн stack маш сайн, өөрчлөх шаардлагагүй:
- ✅ React 18.2.0
- ✅ Vite 6.1.0 (маш хурдан build)
- ✅ React Router DOM
- ✅ Tailwind CSS + shadcn/ui (маш сайхан UI)
- ✅ React Query (API state management-д маш сайн)

**Нэмэх пакет:**
- `axios` эсвэл `fetch` - API дуудлага (axios илүү сайн error handling)

### 📦 Infrastructure Сонголт ⭐⭐⭐⭐⭐

#### Development
- **Database**: PostgreSQL (Docker эсвэл local)
- **File Storage**: Local filesystem (dev)

#### Production (SUPER STACK - ҮНЭГҮЙ, ХУРДАН, SCALABLE) ⭐
- **Frontend Hosting**: 
  - **Vercel** (Free tier) ⭐⭐⭐⭐⭐
    - Automatic HTTPS
    - Global CDN
    - Instant deployments
    - Perfect for React + Vite
  
- **Backend Hosting**: 
  - **Render** (Free tier) ⭐⭐⭐⭐⭐
    - PostgreSQL included
    - Automatic SSL
    - Zero-downtime deployments
    - ЭСВЭЛ
  - **Railway** (Free tier) ⭐⭐⭐⭐
    - PostgreSQL included
    - Simple deployment
    - Good performance

- **Database**: 
  - **PostgreSQL** (100% үнэгүй, enterprise түвшин) ⭐⭐⭐⭐⭐
    - Render/Railway-д included
    - Managed service
    - Automated backups

- **File Storage**: 
  - **Cloudflare R2** ⭐⭐⭐⭐⭐ (МАШ ЧУХАЛ!)
    - S3-compatible API
    - Үнэгүй egress (маш чухал!)
    - Fast global access
    - CDN integration
    - $0.015/GB storage (маш хямд)
    - Perfect for images/files

#### Performance Optimization
- **CDN**: Vercel (frontend) + Cloudflare R2 (files)
- **Image Optimization**: Sharp library, WebP format
- **Caching**: Vercel edge caching + Cloudflare R2 CDN

---

## Шаардлагатай Backend API Endpoints

### 🔐 Authentication Endpoints

```
POST   /api/auth/register       - Бүртгүүлэх
POST   /api/auth/login          - Нэвтрэх
POST   /api/auth/logout         - Гарах
GET    /api/auth/me             - Одоогийн хэрэглэгчийн мэдээлэл
PUT    /api/auth/me             - Хэрэглэгчийн мэдээлэл шинэчлэх
GET    /api/auth/check          - Нэвтрэлт шалгах
POST   /api/auth/refresh        - Token шинэчлэх (optional)
```

### 📦 Product Endpoints

```
GET    /api/products            - Бүх барааны жагсаалт
GET    /api/products/:id        - Барааны дэлгэрэнгүй
POST   /api/products            - Бараа нэмэх (admin)
PUT    /api/products/:id        - Бараа шинэчлэх (admin)
DELETE /api/products/:id        - Бараа устгах (admin)
GET    /api/products?category=  - Ангилалаар шүүх
GET    /api/products?search=    - Хайлт хийх
```

### 🛒 Order Endpoints

```
GET    /api/orders              - Миний захиалгууд
GET    /api/orders/:id          - Захиалгын дэлгэрэнгүй
POST   /api/orders              - Захиалга үүсгэх
PUT    /api/orders/:id          - Захиалга шинэчлэх (admin)
GET    /api/orders/admin        - Бүх захиалгууд (admin)
```

### ❤️ Favorite Endpoints

```
GET    /api/favorites           - Дуртай бараанууд
POST   /api/favorites           - Дуртай бараанд нэмэх
DELETE /api/favorites/:id       - Дуртай бараанаас хасах
```

### 🏪 OnlineStore Endpoints

```
GET    /api/stores              - Онлайн дэлгүүрүүд
POST   /api/stores              - Дэлгүүр нэмэх (admin)
PUT    /api/stores/:id          - Дэлгүүр шинэчлэх (admin)
DELETE /api/stores/:id          - Дэлгүүр устгах (admin)
```

### 💬 Message/Contact Endpoints

```
GET    /api/messages            - Мессежүүд (admin)
POST   /api/messages            - Мессеж илгээх
PUT    /api/messages/:id/read   - Мессеж уншсан гэж тэмдэглэх
DELETE /api/messages/:id        - Мессеж устгах (admin)
GET    /api/contacts            - Холбоо барих мэдээлэл (admin)
POST   /api/contacts            - Холбоо барих мэдээлэл нэмэх (admin)
PUT    /api/contacts/:id        - Холбоо барих мэдээлэл шинэчлэх (admin)
DELETE /api/contacts/:id        - Холбоо барих мэдээлэл устгах (admin)
```

### 📢 PromoMessage Endpoints

```
GET    /api/promos              - Урамшууллын мессежүүд
POST   /api/promos              - Урамшууллын мессеж нэмэх (admin)
PUT    /api/promos/:id          - Урамшууллын мессеж шинэчлэх (admin)
DELETE /api/promos/:id          - Урамшууллын мессеж устгах (admin)
```

### ⭐ FeaturedProduct Endpoints

```
GET    /api/featured            - Онцлох бараанууд
POST   /api/featured            - Онцлох бараанд нэмэх (admin)
DELETE /api/featured/:id        - Онцлох бараанаас хасах (admin)
```

### 🔍 SearchQuery Endpoints

```
GET    /api/search-queries      - Хайлтын асуултууд (admin)
POST   /api/search-queries      - Хайлтын асуулт нэмэх/шинэчлэх
```

### 💼 Deal Endpoints (CRM)

```
GET    /api/deals               - Худалдааны саналууд
POST   /api/deals               - Худалдааны санал үүсгэх
PUT    /api/deals/:id           - Худалдааны санал шинэчлэх
DELETE /api/deals/:id           - Худалдааны санал устгах
```

### 📁 File Upload Endpoint

```
POST   /api/upload              - Файл байршуулах
POST   /api/upload/private      - Хувийн файл байршуулах
GET    /api/files/:id/signed-url - Гарын үсэгтэй URL авах
```

### 📧 Email Endpoint (Optional)

```
POST   /api/email/send          - Имэйл илгээх (admin/internal)
```

---

## Миграцийн Алхмууд

### Үе шат 1: Backend Бэлдэх (1-2 долоо хоног)

1. **Backend project үүсгэх**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express pg bcryptjs jsonwebtoken multer cors dotenv express-validator
   npm install --save-dev nodemon
   ```

2. **Database schema үүсгэх**
   - PostgreSQL database үүсгэх
   - Users table
   - Products table
   - Orders table
   - Favorites table
   - Stores table
   - Messages table
   - гэх мэт...

3. **Authentication system хөгжүүлэх**
   - JWT token generation
   - Password hashing (bcrypt)
   - Middleware (auth, admin)

4. **API endpoints хөгжүүлэх**
   - Entity endpoints (CRUD)
   - File upload
   - Email sending

5. **Testing**
   - Postman эсвэл Thunder Client
   - Unit tests (optional)

### Үе шат 2: Frontend API Client Бэлдэх (2-3 өдөр)

1. **API client үүсгэх**
   - `src/api/client.js` - axios instance
   - `src/api/auth.js` - authentication functions
   - `src/api/products.js` - product functions
   - `src/api/orders.js` - order functions
   - гэх мэт...

2. **Authentication context/provider үүсгэх**
   - `src/contexts/AuthContext.jsx`
   - Token storage (localStorage эсвэл httpOnly cookies)
   - Auto token refresh

3. **React Query hooks үүсгэх**
   - Custom hooks для API calls
   - Error handling
   - Loading states

### Үе шат 3: Frontend Файлуудыг Өөрчлөх (3-5 өдөр)

1. **Base44 SDK-ийг устгах**
   - `package.json`-аас `@base44/sdk` устгах
   - `src/api/base44Client.js` устгах
   - `src/api/entities.js` өөрчлөх
   - `src/api/integrations.js` өөрчлөх

2. **Файлуудыг шинэ API-тай холбох**
   - Бүх `base44.*` дуудлгуудыг шинэ API client руу шилжүүлэх
   - Authentication flow өөрчлөх
   - Error handling нэмэх

3. **Testing**
   - Бүх функцүүдийг турших
   - UI тест хийх

### Үе шат 4: Cleanup ба Deployment (1-2 өдөр)

1. **Cleanup**
   - Unused imports устгах
   - Code formatting
   - Linting

2. **Deployment**
   - Backend deployment
   - Frontend deployment
   - Environment variables тохируулах

---

## Өөрчлөх Файлуудын Жагсаалт

### Устгах Файлууд ❌
- `src/api/base44Client.js`
- `src/api/entities.js` (шинээр бичнэ)
- `src/api/integrations.js` (шинээр бичнэ)

### Шинэ Файлууд ➕
- `src/api/client.js` - Axios instance, base config
- `src/api/auth.js` - Authentication API functions
- `src/api/products.js` - Product API functions
- `src/api/orders.js` - Order API functions
- `src/api/favorites.js` - Favorite API functions
- `src/api/stores.js` - Store API functions
- `src/api/messages.js` - Message API functions
- `src/api/promos.js` - Promo API functions
- `src/api/featured.js` - Featured API functions
- `src/api/deals.js` - Deal API functions
- `src/api/upload.js` - File upload functions
- `src/contexts/AuthContext.jsx` - Authentication context
- `src/hooks/useAuth.js` - Authentication hook

### Өөрчлөх Файлууд ✏️

#### Pages (15 файл)
- `src/pages/Shop.jsx`
- `src/pages/Profile.jsx`
- `src/pages/Checkout.jsx`
- `src/pages/MyOrders.jsx`
- `src/pages/Favorites.jsx`
- `src/pages/CategoryProducts.jsx`
- `src/pages/Contact.jsx`
- `src/pages/PromoAdmin.jsx`
- `src/pages/OnlineStores.jsx`
- `src/pages/Pipeline.jsx`
- `src/pages/index.jsx` (route guards нэмэх)

#### Components (7 файл)
- `src/components/shop/FeaturedProducts.jsx`
- `src/components/shop/PopularStores.jsx`
- `src/components/shop/ProductCard.jsx`
- `src/components/shop/ProductMarquee.jsx`
- `src/components/admin/ContactManagement.jsx`
- `src/components/admin/ProductManagement.jsx`
- `src/components/crm/DealCard.jsx` (хэрэв base44 ашиглаж байвал)

### Package.json Өөрчлөлт
```json
{
  "dependencies": {
    // Устгах
    "@base44/sdk": "^0.1.2", // ❌
    
    // Нэмэх
    "axios": "^1.6.2" // ✅
  }
}
```

---

## Шаардлагатай Мэдээлэл (Хэрэглэгчээс)

Миграцийг эхлүүлэхийн тулд дараах мэдээлэл шаардлагатай:

1. **Backend домэйн/URL**: `https://api.yourdomain.com` эсвэл `http://localhost:3000`
2. **Database connection**: PostgreSQL connection string
3. **JWT Secret**: Token-ийг гарын үсэглэх нууц үг
4. **File Storage**: 
   - Local filesystem path эсвэл
   - S3 credentials (access key, secret key, bucket name)
5. **Email Service** (хэрэв шаардлагатай):
   - SMTP server details эсвэл
   - SendGrid/Mailgun API key
6. **Environment Variables**: Production болон development тохиргоо

---

## Дараагийн Алхам

1. ✅ Төлөвлөгөө боловсруулсан
2. ⏳ Хэрэглэгчээс мэдээлэл авах (backend URL, database, гэх мэт)
3. ⏳ Backend хөгжүүлэлт эхлүүлэх
4. ⏳ Frontend API client хөгжүүлэх
5. ⏳ Миграци хийх
6. ⏳ Testing болон deployment

---

**Тэмдэглэл**: Энэ төлөвлөгөө нь үндсэн зааварчилгаа бөгөөд төслийн хэрэгцээнд тохируулан өөрчлөх боломжтой.

