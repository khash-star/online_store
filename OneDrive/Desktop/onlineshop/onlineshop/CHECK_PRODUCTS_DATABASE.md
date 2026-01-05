# Бараа Database-д байгаа эсэхийг шалгах

## Шалгах арга:

### 1. PostgreSQL Command Line ашиглах:

```powershell
# PostgreSQL-д нэвтрэх
psql -U postgres -d onlineshop

# Барааны тоог шалгах
SELECT COUNT(*) FROM products;

# Барааны жагсаалтыг харах (эхний 10)
SELECT id, name, price, category, created_at FROM products ORDER BY created_at DESC LIMIT 10;

# Гарах
\q
```

### 2. pgAdmin 4 ашиглах:

1. pgAdmin 4 нээх
2. Servers > PostgreSQL > Databases > onlineshop > Schemas > public > Tables > products
3. Right-click > View/Edit Data > All Rows
4. Барааны жагсаалтыг харах

### 3. Backend API шалгах:

Browser дээр эсвэл curl ашиглах:

```powershell
# Backend server ажиллаж байгаа эсэхийг шалгах
curl http://localhost:3000/api/health

# Барааны жагсаалтыг шалгах
curl http://localhost:3000/api/products
```

Эсвэл browser дээр:
```
http://localhost:3000/api/products
```

---

## Асуудал байвал:

### 1. Database-д бараа байхгүй бол:

PromoAdmin page-аас бараа нэмэх:
- `http://localhost:5173/PromoAdmin`
- "Бараа" tab
- "Бараа нэмэх" товч

### 2. Backend server ажиллахгүй бол:

```powershell
cd backend
npm run dev
```

### 3. Backend routes байхгүй бол:

Backend code workspace-д олдохгүй байна. Backend code-ийг дахин үүсгэх эсвэл өгөх хэрэгтэй.

### 4. CORS алдаа гарвал:

FIX_CORS_ERROR.md файл үзнэ үү.

### 5. Database connection алдаа гарвал:

- PostgreSQL ажиллаж байгаа эсэхийг шалгах
- `.env` файл дээр `DATABASE_URL` зөв эсэхийг шалгах

