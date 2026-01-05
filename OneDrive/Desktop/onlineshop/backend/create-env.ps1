# .env файл үүсгэх PowerShell script

Write-Host "Backend .env файл үүсгэж байна..." -ForegroundColor Cyan

# PostgreSQL password асуух
$password = Read-Host "PostgreSQL password оруулах (postgres user-ийн)"

# JWT Secret generate (хэрэв хүсвэл)
Write-Host "`nJWT Secret:"
Write-Host "1. Random generate хийх (автомат)"
Write-Host "2. Өөрийн secret оруулах"
$jwtChoice = Read-Host "Сонголт (1 эсвэл 2)"

if ($jwtChoice -eq "1") {
    # Random string generate (32 characters)
    $jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Write-Host "JWT Secret generated: $jwtSecret" -ForegroundColor Green
} else {
    $jwtSecret = Read-Host "JWT Secret оруулах (min 32 characters)"
}

# .env content
$envContent = @"
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:$password@localhost:5432/onlineshop

# JWT Authentication
JWT_SECRET=$jwtSecret
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cloudflare R2 (Optional - development-д хэрэггүй)
# R2_ACCOUNT_ID=
# R2_ACCESS_KEY_ID=
# R2_SECRET_ACCESS_KEY=
# R2_BUCKET_NAME=
# R2_ENDPOINT=
# R2_PUBLIC_URL=

# Email (Optional - development-д хэрэггүй)
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_USER=
# SMTP_PASS=
"@

# .env файл үүсгэх
$envContent | Out-File -Encoding utf8 .env

Write-Host "`n✅ .env файл амжилттай үүсгэгдлээ!" -ForegroundColor Green
Write-Host "`nФайл байрлал: backend/.env" -ForegroundColor Yellow
Write-Host "`nДараагийн алхам: npm run dev (backend test хийх)" -ForegroundColor Cyan

