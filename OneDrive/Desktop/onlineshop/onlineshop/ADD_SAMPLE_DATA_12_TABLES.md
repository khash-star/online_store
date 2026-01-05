# 12 Таблийн Бүрт 6-н Жишээ Өгөгдөл Оруулах

## 📋 Файл:

`backend/database/sample_data_all_tables.sql`

---

## 🎯 Ажиллуулах Арга:

### pgAdmin 4 ашиглах:

1. **pgAdmin 4 нээх**
2. **"onlineshop" database дээр right click** → **"Query Tool"**
3. **File → Open File** (эсвэл Query editor-д copy/paste)
4. **`backend/database/sample_data_all_tables.sql` файлыг сонгох**
5. **F5 дарх** (Execute)
6. ✅ **Бүх өгөгдөл оруулсан!**

---

## 📊 Оруулах Өгөгдөл:

1. **users** - 6 users (1 admin + 5 users)
2. **products** - 6 products
3. **online_stores** - 6 stores
4. **orders** - 6 orders
5. **order_items** - 6 order items
6. **favorite_products** - 6 favorites
7. **messages** - 6 messages
8. **promo_messages** - 6 promo messages
9. **featured_products** - 6 featured products
10. **search_queries** - 6 search queries
11. **contact_info** - 6 contacts
12. **deals** - 6 deals

---

## ✅ Шалгах:

SQL script-ийн төгсгөлд шалгах query байна. Execute хийсний дараа "Data Output" tab-д бүх таблийн тоонууд харагдана:

```
table_name          | count
--------------------|------
contact_info        | 6
deals               | 6
favorite_products   | 6
featured_products   | 6
messages            | 6
online_stores       | 6
order_items         | 6
orders              | 6
products            | 6
promo_messages      | 6
search_queries      | 6
users               | 6
```

---

## ⚠️ Анхаарах зүйлс:

- **ON CONFLICT DO NOTHING:** Зарим table-ууд дээр байгаа тул давхар оруулахгүй
- **User ID шаардлагатай:** orders, order_items, favorite_products, messages нь user_id шаардлагатай
- **Product ID шаардлагатай:** order_items, favorite_products, featured_products нь product_id шаардлагатай
- **DO $$ блок:** Foreign key constraint-уудтай table-уудад DO $$ блок ашигласан

---

## 🎉 Амжилттай!

Дараа нь browser дээр Shop page, PromoAdmin page зэрэг хуудасууд дээр өгөгдөл харагдана!

