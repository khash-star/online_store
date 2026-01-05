# Admin User үүсгэх заавар

## Admin Email: khashpay@gmail.com

### Арга 1: Node.js Script ашиглах (Зөвлөмжлөх)

```bash
cd backend
node scripts/create-admin.js
```

Энэ script:
- Admin user үүсгэнэ (хэрэв байхгүй бол)
- Эсвэл одоогийн user-ийг admin role-оор шинэчилнэ
- Temporary password үүсгэнэ (энэ нь terminal-д харагдана)

### Арга 2: SQL Script ашиглах

1. pgAdmin 4 нээнэ
2. `onlineshop` database-д холбогдоно
3. Query Tool нээнэ
4. `backend/scripts/create-admin.sql` файлыг ажиллуулна

**Анхаар:** SQL script-д password_hash-ийг гараар оруулах шаардлагатай. Node.js script илүү хялбар.

### Арга 3: Password Reset-ээр

1. Backend server ажиллуулаад password reset endpoint ашиглах
2. `khashpay@gmail.com` email-д reset link илгээх
3. Password шинэчлэх

## Backend-д Admin Check

Backend middleware (`backend/middleware/auth.js`) одоогоор `role` field-ийг шалгадаг.

Admin routes-д middleware ашиглах:
```javascript
import { authenticate, requireAdmin } from '../middleware/auth.js';

router.get('/admin/products', authenticate, requireAdmin, async (req, res) => {
  // Admin only
});
```

## Frontend-д Admin Check

Frontend-д `useAuth` hook ашиглаж admin check хийх:
```javascript
const { user, isAdmin } = useAuth();
```

## Анхааруулга

- Admin user үүсгэсний дараа password-аа солих хэрэгтэй
- Production environment-д admin email-ийг environment variable-аас унших нь дээр
- Admin access-ийг хамгаалах нь маш чухал

