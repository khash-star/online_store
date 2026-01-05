# Database Column Name Засах

## Асуудал:

Backend server ажиллаж байгаа ч database query-д алдаа гарч байна:

```
Error: error: column "created_date" does not exist
Hint: Perhaps you meant to reference the column "products.created_at"
```

## Шалтгаан:

Backend code-д `created_date` column name ашиглаж байгаа ч database schema-д `created_at` байна.

## Шийдэл:

Backend routes файлууд дээр `created_date`-ийг `created_at` болгож зассан.

### Зассан файлууд:

- `backend/routes/products.js`
- Бусад routes файлууд (хэрэв байвал)

### Шалгах:

Backend server nodemon ашиглаж байгаа тул автоматаар дахин эхлүүлнэ. Terminal-д шинэ алдаа гарахгүй бол амжилттай!

### Хэрэв алдаа үлдвэл:

Бусад файлуудыг шалгах:

```bash
# Backend directory-д created_date хайх:
cd backend
grep -r "created_date" .
```

Database schema-ийг шалгах:

```sql
-- pgAdmin-д:
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name LIKE '%created%';
```

## Анхаарах зүйлс:

- Database schema-д `created_at`, `updated_at` column-ууд байна
- Backend code-д `created_at`, `updated_at` ашиглах ёстой
- `created_date`, `updated_date` ашиглах ёсгүй

