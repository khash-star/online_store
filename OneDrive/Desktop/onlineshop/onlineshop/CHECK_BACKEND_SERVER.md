# Backend Server Шалгах

## Асуудал: Хэрэглэгчдийн бүртгэл нэмэгдэхгүй байна

## Шалгах зүйлс:

### 1. Browser Console дээрх алдааг шалгах
- F12 дарж Developer Tools нээх
- Console tab дээр алдаа байгаа эсэхийг шалгах
- Network tab дээр `/api/auth/register` request-ийг шалгах

### 2. Backend Server ажиллаж байгаа эсэхийг шалгах

**Backend server эхлүүлэх:**

```bash
cd backend
npm start
```

Эсвэл:

```bash
cd backend
node server.js
```

Эсвэл nodemon ашиглаж байвал:

```bash
cd backend
npm run dev
```

### 3. Backend Server ажиллаж байгаа эсэхийг шалгах

Browser дээр эсвэл Postman ашиглан:

```
GET http://localhost:3000/api/health
```

Эсвэл:

```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123",
  "full_name": "Test User"
}
```

### 4. Backend .env файл шалгах

`backend/.env` файл байгаа эсэхийг шалгах:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### 5. Database холболт шалгах

PostgreSQL database ажиллаж байгаа эсэхийг шалгах:

```bash
psql -U postgres -d your_database_name
```

### 6. Common Алдаанууд:

#### ERR_CONNECTION_REFUSED
- Backend server ажиллахгүй байна
- Backend server эхлүүлнэ үү

#### 500 Internal Server Error
- Database холболт алдаатай байна
- .env файлыг шалгана уу

#### 400 Bad Request
- Request body буруу байна
- Browser console дээрх алдааг шалгана уу

#### 401 Unauthorized
- Token алдаатай байна
- Login дахин хийх хэрэгтэй

## Засах:

1. Backend server эхлүүлэх
2. Database холболт шалгах
3. .env файл зөв байгаа эсэхийг шалгах
4. Browser console дээрх алдааг шалгах

