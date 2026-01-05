# 10 Жишээ Бараа Нэмэх Заавар

## 🚀 Хурдан арга (SQL Script):

### 1. PostgreSQL-д холбогдох:

```bash
psql -U postgres -d onlineshop
```

### 2. SQL script ажиллуулах:

```bash
\i backend/database/sample_products.sql
```

Эсвэл terminal дээр:
```bash
psql -U postgres -d onlineshop -f backend/database/sample_products.sql
```

---

## 🚀 JavaScript Script (Node.js):

### 1. Backend directory руу очих:

```bash
cd backend
```

### 2. Script ажиллуулах:

```bash
node scripts/add-sample-products.js
```

---

## 📦 Нэмэгдэх 10 Бараа:

1. **iPhone 15 Pro** - 2,500,000₮ (электроникс)
2. **Samsung Galaxy S24** - 2,000,000₮ (электроникс, -5%)
3. **MacBook Pro 14"** - 5,000,000₮ (электроникс)
4. **Rich Dad Poor Dad** - 42,000₮ (ном)
5. **The 48 Laws of Power** - 55,000₮ (ном, -20%)
6. **Nike Air Max 270** - 300,000₮ (гутал, -10%)
7. **Adidas Ultraboost 22** - 350,000₮ (гутал)
8. **iPad Air** - 1,500,000₮ (электроникс, -5%)
9. **Zara Classic Coat** - 200,000₮ (хувцас, -15%)
10. **Deep Work** - 40,000₮ (ном)

---

## ✅ Шалгах:

1. Browser дээр `http://localhost:5173/Shop` руу очих
2. Эсвэл `http://localhost:5173/PromoAdmin` → "Бараа" tab

---

## ⚠️ Анхаарах зүйлс:

- Database-д admin user (`khashpay@gmail.com`) байх ёстой
- PostgreSQL ажиллаж байх ёстой
- `DATABASE_URL` зөв тохируулсан байх ёстой

---

## 🔄 Бараа устгах (хэрэв дахин нэмэх хэрэгтэй бол):

```sql
DELETE FROM products WHERE name IN (
  'iPhone 15 Pro',
  'Samsung Galaxy S24',
  'MacBook Pro 14"',
  'Rich Dad Poor Dad',
  'The 48 Laws of Power',
  'Nike Air Max 270',
  'Adidas Ultraboost 22',
  'iPad Air',
  'Zara Classic Coat',
  'Deep Work'
);
```

