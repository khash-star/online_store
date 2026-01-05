# promo_messages Column Алдаа - Засах

## 🔴 Асуудал:

```
ERROR: column "icon" of relation "promo_messages" does not exist
```

**Энэ нь promo_messages table-д `icon` column байхгүй гэсэн үг!**

---

## ✅ Засах:

API specification-оос харахад promo_messages table-д:
- ✅ `message` column байна
- ❌ `icon` column байхгүй
- ❌ `text` column байхгүй

**SQL script засаж:** `icon` болон `text`-ийг `message` column-ээр сольсон.

---

## 📝 Зассан SQL:

```sql
INSERT INTO promo_messages (id, message, is_active, created_at, updated_at)
VALUES 
    (gen_random_uuid(), '🎉 Шинэ жилд 50% хямдрал!', true, NOW(), NOW()),
    (gen_random_uuid(), '🔥 Хурдан захиалга, хурдан хүргэлт!', true, NOW(), NOW()),
    ...
```

**Өмнө:** `icon, text` → **Одоо:** `message` (icon-ийг message дотор оруулсан)

---

## ✅ Одоо Ажиллуулах:

SQL script-ийг дахин ажиллуулж болно!

