# 🏪 Seller/Marketplace System Setup

Marketplace систем нэмэгдлээ. Олон seller (дэд эрхтэй хэрэглэгч) өөрийн барааг оруулж, удирдах боломжтой.

## ✅ Хийгдсэн өөрчлөлт

### 1. Database Migration
- **Migration файл**: `backend/database/migration_add_seller.sql`
- Users table-д `seller` role нэмэгдсэн
- Products table-д `seller_id` талбар нэмэгдсэн
- Index үүсгэсэн (performance)

### 2. Backend Middleware
- `requireSellerOrAdmin` middleware нэмэгдсэн
- `requireSeller` middleware нэмэгдсэн

### 3. Products Routes
- **POST /api/products**: Admin эсвэл Seller зөвшөөрсөн
  - Seller-д: `seller_id = req.user.id`
  - Admin-д: `seller_id = NULL`
- **GET /api/products**: 
  - Admin: бүх бараа харуулна
  - Seller: зөвхөн өөрийн бараа (`WHERE seller_id = req.user.id`)
- **PUT /api/products/:id**: 
  - Admin: бүх барааг засах боломжтой
  - Seller: зөвхөн өөрийн барааг засах боломжтой
- **DELETE /api/products/:id**: 
  - Admin: бүх барааг устгах боломжтой
  - Seller: зөвхөн өөрийн барааг устгах боломжтой

## 📋 Database Migration

Migration script ажиллуулах:

```bash
cd backend
psql your_database_name < database/migration_add_seller.sql
```

Эсвэл PostgreSQL client ашиглах:

```sql
-- 1. Update users table to allow 'seller' role
ALTER TABLE users 
  DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE users 
  ADD CONSTRAINT users_role_check 
  CHECK (role IN ('user', 'admin', 'seller'));

-- 2. Add seller_id column to products table
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- 3. Create index on seller_id for better query performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
```

## 🔐 Role System

### User Roles:
- **user**: Энгийн хэрэглэгч (захиалга хийх, бараа үзэх)
- **seller**: Бараа оруулах, өөрийн барааг удирдах
- **admin**: Бүх барааг удирдах, системийг удирдах

### Seller Permissions:
- ✅ Бараа оруулах (POST /api/products)
- ✅ Өөрийн барааг засах (PUT /api/products/:id)
- ✅ Өөрийн барааг устгах (DELETE /api/products/:id)
- ✅ Зөвхөн өөрийн барааг харах (GET /api/products)

### Admin Permissions:
- ✅ Бүх барааг оруулах, засах, устгах
- ✅ Бүх барааг харах
- ✅ Seller-ийн барааг засах, устгах

## 📝 API Usage Examples

### Seller бараа оруулах:

```javascript
POST /api/products
Authorization: Bearer <seller_token>

{
  "name": "Барааны нэр",
  "price": 50000,
  "description": "Тайлбар",
  "category": "электроникс",
  "stock": 100,
  "is_available": true
}

// Response: seller_id автоматаар req.user.id болно
```

### Seller өөрийн барааг засах:

```javascript
PUT /api/products/:id
Authorization: Bearer <seller_token>

{
  "price": 45000,
  "stock": 80
}

// Seller зөвхөн өөрийн барааг засаж чадна
```

### Seller өөрийн барааг харах:

```javascript
GET /api/products
Authorization: Bearer <seller_token>

// Response: зөвхөн seller_id = req.user.id бараа
```

### Admin бүх барааг харах:

```javascript
GET /api/products
Authorization: Bearer <admin_token>

// Response: бүх бараа
```

## ⚠️ Анхаарах зүйлс

1. **Migration script ажиллуулах шаардлагатай** - seller_id талбар нэмэх
2. **User role-ийг 'seller' болгох** - Admin panel эсвэл database шууд засах
3. **Seller бараа оруулахад seller_id автоматаар req.user.id болно**
4. **Seller зөвхөн өөрийн барааг засах, устгах боломжтой**
5. **Admin бүх барааг удирдах боломжтой**

## 🧪 Testing

1. Migration script ажиллуулах
2. User-ийн role-ийг 'seller' болгох
3. Seller token-оор бараа оруулах
4. Seller token-оор GET /api/products хийх (зөвхөн өөрийн бараа)
5. Seller token-оор өөрийн барааг засах, устгах
6. Seller token-оор бусдын барааг засах гэж оролдох (403 Forbidden)

## 📚 Files Modified

- `backend/database/migration_add_seller.sql` (new)
- `backend/middleware/auth.js` (requireSellerOrAdmin, requireSeller нэмсэн)
- `backend/routes/products.js` (seller support нэмсэн)

