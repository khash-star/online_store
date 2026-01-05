# Database Column Name Засах

## Асуудал:

Backend server terminal-д алдаа гарч байна:

```
Error: error: column "created_date" does not exist
Hint: Perhaps you meant to reference the column "products.created_at"
```

## Шалтгаан:

Backend code-д `created_date` column name ашиглаж байгаа ч database schema-д `created_at` байна.

## Шийдэл:

Backend routes файлууд дээр `created_date`-ийг `created_at` болгож засах хэрэгтэй.

### Заах шаардлагатай файлууд:

1. `backend/routes/products.js` (line 73 орчим)
2. Бусад routes файлууд (хэрэв байвал)

### Засах арга:

#### PowerShell-оор (Backend directory-д):

```powershell
cd backend

# Бүх routes файлууд дээр created_date-ийг created_at болгох:
Get-ChildItem -Path "routes" -Filter "*.js" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "created_date") {
        $newContent = $content -replace "created_date", "created_at"
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Host "✅ $($_.Name) зассан"
    }
}
```

#### Manual засах:

1. `backend/routes/products.js` файл нээх
2. `created_date` гэсэн бүх байрлалыг `created_at` болгож засах
3. Бусад routes файлуудыг ч шалгаж засах

### Шалгах:

Backend server nodemon ашиглаж байгаа тул файл засварласны дараа автоматаар дахин эхлүүлнэ.

Terminal-д шинэ алдаа гарахгүй бол амжилттай!

### Хэрэв алдаа үлдвэл:

```powershell
cd backend

# Бүх created_date олох:
Select-String -Path "routes\*.js" -Pattern "created_date"
```

## Анхаарах зүйлс:

- Database schema-д `created_at`, `updated_at` column-ууд байна
- Backend code-д `created_at`, `updated_at` ашиглах ёстой
- `created_date`, `updated_date` ашиглах ёсгүй

## Мөн шалгах:

`updated_date` байвал `updated_at` болгож засах хэрэгтэй:

```powershell
Get-ChildItem -Path "routes" -Filter "*.js" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "updated_date", "updated_at"
    Set-Content -Path $_.FullName -Value $newContent -NoNewline
}
```

