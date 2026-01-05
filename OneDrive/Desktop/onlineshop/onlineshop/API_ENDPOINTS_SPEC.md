# API Endpoints Тодорхойлолт

Энэ файл нь backend API-ийн endpoint-үүдийн дэлгэрэнгүй тодорхойлолтыг агуулна.

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.yourdomain.com/api
```

## Authentication

Бүх protected endpoint-үүд `Authorization: Bearer <token>` header шаарддаг.

---

## 🔐 Authentication Endpoints

### POST /api/auth/register
Бүртгүүлэх

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Бат-Эрдэнэ"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "full_name": "Бат-Эрдэнэ",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /api/auth/login
Нэвтрэх

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "full_name": "Бат-Эрдэнэ",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST /api/auth/logout
Гарах

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Амжилттай гарлаа"
}
```

---

### GET /api/auth/me
Одоогийн хэрэглэгчийн мэдээлэл

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "123",
  "email": "user@example.com",
  "full_name": "Бат-Эрдэнэ",
  "phone": "+976 99112233",
  "address": "Улаанбаатар",
  "role": "user",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### PUT /api/auth/me
Хэрэглэгчийн мэдээлэл шинэчлэх

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "Бат-Эрдэнэ",
  "phone": "+976 99112233",
  "address": "Улаанбаатар"
}
```

**Response (200):**
```json
{
  "id": "123",
  "email": "user@example.com",
  "full_name": "Бат-Эрдэнэ",
  "phone": "+976 99112233",
  "address": "Улаанбаатар",
  "role": "user"
}
```

---

### GET /api/auth/check
Нэвтрэлт шалгах

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "authenticated": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

## 📦 Product Endpoints

### GET /api/products
Барааны жагсаалт

**Query Parameters:**
- `category` (optional) - Ангилал
- `search` (optional) - Хайлтын үг
- `sort` (optional) - Эрэмбэлэх (`-created_date`, `price`, `-price`)
- `limit` (optional) - Хязгаар (default: 100)
- `offset` (optional) - Эхлэх байрлал (default: 0)

**Response (200):**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Барааны нэр",
      "description": "Тайлбар",
      "price": 50000,
      "image_url": "https://example.com/image.jpg",
      "category": "электроникс",
      "gender": "унисекс",
      "size": "M",
      "color": "Хар",
      "stock": 100,
      "is_available": true,
      "discount_percent": 10,
      "affiliate_link": "https://example.com/product",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 150
}
```

---

### GET /api/products/:id
Барааны дэлгэрэнгүй

**Response (200):**
```json
{
  "id": "1",
  "name": "Барааны нэр",
  "description": "Тайлбар",
  "price": 50000,
  "image_url": "https://example.com/image.jpg",
  "category": "электроникс",
  "gender": "унисекс",
  "size": "M",
  "color": "Хар",
  "stock": 100,
  "is_available": true,
  "discount_percent": 10,
  "affiliate_link": "https://example.com/product",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### POST /api/products
Бараа нэмэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Барааны нэр",
  "description": "Тайлбар",
  "price": 50000,
  "image_url": "https://example.com/image.jpg",
  "category": "электроникс",
  "gender": "унисекс",
  "size": "M",
  "color": "Хар",
  "stock": 100,
  "is_available": true,
  "discount_percent": 0,
  "affiliate_link": "https://example.com/product"
}
```

**Response (201):**
```json
{
  "id": "1",
  "name": "Барааны нэр",
  ...
}
```

---

### PUT /api/products/:id
Бараа шинэчлэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** (бүх талбар optional)
```json
{
  "name": "Шинэ нэр",
  "price": 45000,
  "stock": 90
}
```

**Response (200):**
```json
{
  "id": "1",
  "name": "Шинэ нэр",
  ...
}
```

---

### DELETE /api/products/:id
Бараа устгах (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Бараа амжилттай устгагдлаа"
}
```

---

## 🛒 Order Endpoints

### GET /api/orders
Миний захиалгууд

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `sort` (optional) - Эрэмбэлэх (`-created_date`, `created_date`)
- `status` (optional) - Төлөв (`шинэ`, `баталгаажсан`, `илгээгдсэн`, `хүргэгдсэн`, `цуцлагдсан`)

**Response (200):**
```json
{
  "orders": [
    {
      "id": "1",
      "customer_name": "Бат-Эрдэнэ",
      "customer_phone": "+976 99112233",
      "customer_email": "user@example.com",
      "delivery_address": "Улаанбаатар",
      "payment_method": "бэлэн_мөнгө",
      "total_amount": 150000,
      "status": "шинэ",
      "notes": "Тэмдэглэл",
      "items": [
        {
          "product_id": "1",
          "product_name": "Барааны нэр",
          "quantity": 2,
          "price": 50000
        }
      ],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### GET /api/orders/:id
Захиалгын дэлгэрэнгүй

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "1",
  "customer_name": "Бат-Эрдэнэ",
  ...
}
```

---

### POST /api/orders
Захиалга үүсгэх

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "customer_name": "Бат-Эрдэнэ",
  "customer_phone": "+976 99112233",
  "customer_email": "user@example.com",
  "delivery_address": "Улаанбаатар",
  "payment_method": "бэлэн_мөнгө",
  "notes": "Тэмдэглэл",
  "items": [
    {
      "product_id": "1",
      "product_name": "Барааны нэр",
      "quantity": 2,
      "price": 50000
    }
  ],
  "total_amount": 100000,
  "status": "шинэ"
}
```

**Response (201):**
```json
{
  "id": "1",
  "customer_name": "Бат-Эрдэнэ",
  ...
}
```

---

### GET /api/orders/admin
Бүх захиалгууд (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "orders": [...]
}
```

---

### PUT /api/orders/:id
Захиалга шинэчлэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "илгээгдсэн"
}
```

**Response (200):**
```json
{
  "id": "1",
  "status": "илгээгдсэн",
  ...
}
```

---

## ❤️ Favorite Endpoints

### GET /api/favorites
Дуртай бараанууд

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "favorites": [
    {
      "id": "1",
      "product_id": "1",
      "product": {
        "id": "1",
        "name": "Барааны нэр",
        "price": 50000,
        "image_url": "https://example.com/image.jpg"
      },
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/favorites
Дуртай бараанд нэмэх

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "product_id": "1"
}
```

**Response (201):**
```json
{
  "id": "1",
  "product_id": "1",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### DELETE /api/favorites/:id
Дуртай бараанаас хасах

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Дуртай бараанаас хасагдлаа"
}
```

---

## 🏪 OnlineStore Endpoints

### GET /api/stores
Онлайн дэлгүүрүүд

**Query Parameters:**
- `sort` (optional) - Эрэмбэлэх (`order`, `-created_date`)

**Response (200):**
```json
{
  "stores": [
    {
      "id": "1",
      "name": "Дэлгүүрийн нэр",
      "logo_url": "https://example.com/logo.jpg",
      "url": "https://store.com",
      "category": "Электроникс",
      "gradient": "from-purple-600 to-pink-600",
      "order": 1,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/stores
Дэлгүүр нэмэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Дэлгүүрийн нэр",
  "logo_url": "https://example.com/logo.jpg",
  "url": "https://store.com",
  "category": "Электроникс",
  "gradient": "from-purple-600 to-pink-600",
  "order": 1
}
```

**Response (201):**
```json
{
  "id": "1",
  "name": "Дэлгүүрийн нэр",
  ...
}
```

---

### PUT /api/stores/:id
Дэлгүүр шинэчлэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** (бүх талбар optional)
```json
{
  "name": "Шинэ нэр",
  "order": 2
}
```

**Response (200):**
```json
{
  "id": "1",
  "name": "Шинэ нэр",
  ...
}
```

---

### DELETE /api/stores/:id
Дэлгүүр устгах (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Дэлгүүр амжилттай устгагдлаа"
}
```

---

## 💬 Message Endpoints

### GET /api/messages
Мессежүүд (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `sort` (optional) - Эрэмбэлэх (`-created_date`)
- `is_read` (optional) - Уншсан эсэх (true/false)

**Response (200):**
```json
{
  "messages": [
    {
      "id": "1",
      "name": "Бат-Эрдэнэ",
      "email": "user@example.com",
      "phone": "+976 99112233",
      "subject": "Гарчиг",
      "message": "Мессежийн агуулга",
      "is_read": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/messages
Мессеж илгээх

**Request Body:**
```json
{
  "name": "Бат-Эрдэнэ",
  "email": "user@example.com",
  "phone": "+976 99112233",
  "subject": "Гарчиг",
  "message": "Мессежийн агуулга"
}
```

**Response (201):**
```json
{
  "id": "1",
  "name": "Бат-Эрдэнэ",
  ...
}
```

---

### PUT /api/messages/:id/read
Мессеж уншсан гэж тэмдэглэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "id": "1",
  "is_read": true,
  ...
}
```

---

### DELETE /api/messages/:id
Мессеж устгах (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Мессеж амжилттай устгагдлаа"
}
```

---

## 📢 PromoMessage Endpoints

### GET /api/promos
Урамшууллын мессежүүд

**Query Parameters:**
- `is_active` (optional) - Идэвхтэй эсэх (true/false)
- `sort` (optional) - Эрэмбэлэх (`-created_date`)

**Response (200):**
```json
{
  "promos": [
    {
      "id": "1",
      "message": "Урамшууллын мессеж",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/promos
Урамшууллын мессеж нэмэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "message": "Урамшууллын мессеж",
  "is_active": true
}
```

**Response (201):**
```json
{
  "id": "1",
  "message": "Урамшууллын мессеж",
  ...
}
```

---

### PUT /api/promos/:id
Урамшууллын мессеж шинэчлэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "message": "Шинэ мессеж",
  "is_active": false
}
```

**Response (200):**
```json
{
  "id": "1",
  "message": "Шинэ мессеж",
  ...
}
```

---

### DELETE /api/promos/:id
Урамшууллын мессеж устгах (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Урамшууллын мессеж амжилттай устгагдлаа"
}
```

---

## ⭐ FeaturedProduct Endpoints

### GET /api/featured
Онцлох бараанууд

**Query Parameters:**
- `sort` (optional) - Эрэмбэлэх (`order`)

**Response (200):**
```json
{
  "featured": [
    {
      "id": "1",
      "product_id": "1",
      "order": 1,
      "product": {
        "id": "1",
        "name": "Барааны нэр",
        "price": 50000,
        "image_url": "https://example.com/image.jpg"
      },
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/featured
Онцлох бараанд нэмэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "product_id": "1",
  "order": 1
}
```

**Response (201):**
```json
{
  "id": "1",
  "product_id": "1",
  "order": 1,
  ...
}
```

---

### DELETE /api/featured/:id
Онцлох бараанаас хасах (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Онцлох бараанаас хасагдлаа"
}
```

---

## 🔍 SearchQuery Endpoints

### GET /api/search-queries
Хайлтын асуултууд (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `sort` (optional) - Эрэмбэлэх (`-count`, `-created_date`)

**Response (200):**
```json
{
  "queries": [
    {
      "id": "1",
      "query": "утас",
      "count": 150,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/search-queries
Хайлтын асуулт нэмэх/шинэчлэх (auto-increment count)

**Request Body:**
```json
{
  "query": "утас"
}
```

**Response (200/201):**
```json
{
  "id": "1",
  "query": "утас",
  "count": 151,
  ...
}
```

---

## 💼 Deal Endpoints (CRM)

### GET /api/deals
Худалдааны саналууд

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `sort` (optional) - Эрэмбэлэх (`-created_date`)
- `stage` (optional) - Үе шат

**Response (200):**
```json
{
  "deals": [
    {
      "id": "1",
      "title": "Худалдааны санал",
      "company": "Компанийн нэр",
      "amount": 5000000,
      "stage": "prospecting",
      "probability": 25,
      "notes": "Тэмдэглэл",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/deals
Худалдааны санал үүсгэх

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Худалдааны санал",
  "company": "Компанийн нэр",
  "amount": 5000000,
  "stage": "prospecting",
  "probability": 25,
  "notes": "Тэмдэглэл"
}
```

**Response (201):**
```json
{
  "id": "1",
  "title": "Худалдааны санал",
  ...
}
```

---

### PUT /api/deals/:id
Худалдааны санал шинэчлэх

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "stage": "negotiation",
  "probability": 50
}
```

**Response (200):**
```json
{
  "id": "1",
  "stage": "negotiation",
  ...
}
```

---

### DELETE /api/deals/:id
Худалдааны санал устгах

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Худалдааны санал амжилттай устгагдлаа"
}
```

---

## 📁 File Upload Endpoints

### POST /api/upload
Файл байршуулах

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request:**
```
FormData:
  file: <File>
```

**Response (200):**
```json
{
  "file_url": "https://example.com/uploads/file.jpg",
  "file_id": "123"
}
```

---

### POST /api/upload/private
Хувийн файл байршуулах

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request:**
```
FormData:
  file: <File>
```

**Response (200):**
```json
{
  "file_id": "123",
  "file_url": "https://api.yourdomain.com/api/files/123"
}
```

---

### GET /api/files/:id/signed-url
Гарын үсэгтэй URL авах (хувийн файлын хувьд)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "signed_url": "https://example.com/files/123?signature=...",
  "expires_at": "2024-01-01T01:00:00Z"
}
```

---

## 📧 Contact Info Endpoints (Admin)

### GET /api/contacts
Холбоо барих мэдээлэл (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "contacts": [
    {
      "id": "1",
      "name": "Бат-Эрдэнэ",
      "phone": "+976 99112233",
      "email": "user@example.com",
      "address": "Улаанбаатар",
      "notes": "Тэмдэглэл",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### POST /api/contacts
Холбоо барих мэдээлэл нэмэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Бат-Эрдэнэ",
  "phone": "+976 99112233",
  "email": "user@example.com",
  "address": "Улаанбаатар",
  "notes": "Тэмдэглэл"
}
```

**Response (201):**
```json
{
  "id": "1",
  "name": "Бат-Эрдэнэ",
  ...
}
```

---

### PUT /api/contacts/:id
Холбоо барих мэдээлэл шинэчлэх (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Шинэ нэр",
  "phone": "+976 99223344"
}
```

**Response (200):**
```json
{
  "id": "1",
  "name": "Шинэ нэр",
  ...
}
```

---

### DELETE /api/contacts/:id
Холбоо барих мэдээлэл устгах (Admin only)

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Холбоо барих мэдээлэл амжилттай устгагдлаа"
}
```

---

## Error Responses

Бүх endpoint-үүд дараах error format ашиглана:

**400 Bad Request:**
```json
{
  "error": "Validation error",
  "message": "Email field is required",
  "details": {
    "email": "Email field is required"
  }
}
```

**401 Unauthorized:**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

**403 Forbidden:**
```json
{
  "error": "Forbidden",
  "message": "Admin access required"
}
```

**404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "Product not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Pagination (Optional)

Хэрэв pagination шаардлагатай бол:

**Query Parameters:**
- `page` (optional) - Хуудасны дугаар (default: 1)
- `limit` (optional) - Хуудас бүрт хэмжээ (default: 20)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

**Тэмдэглэл**: Энэ тодорхойлолт нь үндсэн зааварчилгаа бөгөөд backend хөгжүүлэлтийн явцад тохируулан өөрчлөх боломжтой.

