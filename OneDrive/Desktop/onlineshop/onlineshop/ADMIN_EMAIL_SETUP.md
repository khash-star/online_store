# Admin Email Тохируулах

## Admin Email: khashpay@gmail.com

Энэ email-ийг admin role-оор тохируулах шаардлагатай.

### Арга 1: pgAdmin 4 ашиглах (Хамгийн хурдан)

1. pgAdmin 4 нээнэ
2. `onlineshop` database-д холбогдоно
3. Query Tool нээнэ (Tools → Query Tool)
4. Доорх SQL командыг ажиллуулах:

```sql
-- Хэрэв user байгаа бол admin role өгөх
UPDATE users 
SET role = 'admin', updated_date = NOW()
WHERE email = 'khashpay@gmail.com';

-- Хэрэв user байхгүй бол шинээр үүсгэх (password-ийг дараа нь солих)
-- Анхаар: password_hash-ийг bcrypt ашиглан hash хийх шаардлагатай
INSERT INTO users (email, password_hash, role, full_name, created_date, updated_date)
SELECT 
    'khashpay@gmail.com',
    '$2b$10$PlaceholderHash', -- Password reset ашиглах нь дээр
    'admin',
    'Admin User',
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'khashpay@gmail.com'
);

-- Шалгах
SELECT id, email, role, full_name, created_date 
FROM users 
WHERE email = 'khashpay@gmail.com';
```

### Арга 2: Backend Script (Backend бэлэн болсон үед)

Backend directory-д очиж script ажиллуулах:
```bash
cd backend
node scripts/create-admin.js
```

### Арга 3: Backend API-аар (Backend server ажиллаж байвал)

1. Backend server эхлүүлэх
2. Register эсвэл login хийх
3. Admin panel-оос user-ийг admin role-оор шинэчлэх

### Анхаарах зүйлс:

- ✅ Email: `khashpay@gmail.com`
- ✅ Role: `admin`
- ⚠️ Password-ийг анх удаа login хийхэд солих
- ⚠️ Admin access-ийг хамгаалах нь маш чухал

### Database Schema:

Users table-д `role` field байх ёстой. Хэрэв байхгүй бол:

```sql
ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
```

Admin role-той user-үүдийг шалгах:
```sql
SELECT id, email, role, full_name FROM users WHERE role = 'admin';
```

