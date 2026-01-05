# Бараа Харагдахгүй Байгаа Асуудал Засах

## ✅ Зарласан:

Frontend код дээр `-created_date` sort параметрийг `-created_at` болгож заслаа (database schema-д `created_at` байгаа тул).

**Зассан файлууд:**
- `src/pages/Shop.jsx`
- `src/pages/CategoryProducts.jsx`
- `src/pages/Favorites.jsx`
- `src/pages/MyOrders.jsx`

---

## 🔍 Database-д Бараа Байгаа Эсэхийг Шалгах:

### Арга 1: PostgreSQL Command Line:

```powershell
# PostgreSQL-д нэвтрэх
psql -U postgres -d onlineshop

# Барааны тоог шалгах
SELECT COUNT(*) FROM products;

# Барааны жагсаалтыг харах
SELECT id, name, price, category, created_at FROM products ORDER BY created_at DESC LIMIT 10;

# Гарах
\q
```

### Арга 2: pgAdmin 4:

1. pgAdmin 4 нээх
2. Servers > PostgreSQL > Databases > onlineshop > Schemas > public > Tables > products
3. Right-click > View/Edit Data > All Rows
4. Барааны жагсаалтыг харах

### Арга 3: Backend API Test:

Browser дээр:
```
http://localhost:3000/api/products
```

Эсвэл PowerShell:
```powershell
curl http://localhost:3000/api/products
```

---

## 🔧 Асуудал байвал:

### 1. Database-д бараа байхгүй бол:

**Шийдэл:** PromoAdmin page-аас бараа нэмэх:

1. `http://localhost:5173/Login` - Нэвтрэх (admin: khashpay@gmail.com)
2. `http://localhost:5173/PromoAdmin` - Admin panel
3. "Бараа" tab сонгох
4. "Бараа нэмэх" товч дарна
5. Мэдээлэл оруулах

### 2. Backend server ажиллахгүй бол:

```powershell
cd backend
npm run dev
```

### 3. Backend routes байхгүй бол:

Backend code workspace-д олдохгүй байна. Backend code-ийг дахин үүсгэх эсвэл өгөх хэрэгтэй.

### 4. Database connection алдаа гарвал:

- PostgreSQL ажиллаж байгаа эсэхийг шалгах
- `backend/.env` файл дээр `DATABASE_URL` зөв эсэхийг шалгах

### 5. CORS алдаа гарвал:

FIX_CORS_ERROR.md файл үзнэ үү.

---

## 📝 Дараагийн Алхам:

1. Browser refresh хийх (Ctrl+Shift+R)
2. Database-д бараа байгаа эсэхийг шалгах
3. Backend server ажиллаж байгаа эсэхийг шалгах
4. Browser console-д алдаа байгаа эсэхийг шалгах (F12)

