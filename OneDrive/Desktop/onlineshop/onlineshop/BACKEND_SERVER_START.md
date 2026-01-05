# Backend Server Эхлүүлэх Заавар

## Асуудал:

Browser console-д `ERR_CONNECTION_REFUSED` алдаа гарч байна. Энэ нь backend server ажиллахгүй байгаа гэсэн үг.

Frontend `http://localhost:3000/api` endpoint-ууд руу хандахыг оролдож байгаа ч backend server ажиллахгүй байна.

## Шийдэл:

### 1. Backend directory шалгах:

```bash
cd backend
dir  # Windows
# Эсвэл
ls   # Linux/Mac
```

### 2. Backend dependencies суулгах (хэрэв анх удаа бол):

```bash
cd backend
npm install
```

### 3. Environment variables шалгах:

Backend directory-д `.env` файл байх ёстой:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=onlineshop
DB_USER=postgres
DB_PASSWORD=your_password_here
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

### 4. Database холбогдсон эсэхийг шалгах:

PostgreSQL server ажиллаж байгаа эсэх:
- pgAdmin 4 нээнэ
- Эсвэл PostgreSQL service-ийг эхлүүлэх

### 5. Backend server эхлүүлэх:

```bash
cd backend
npm start
# Эсвэл
node server.js
```

Backend server `http://localhost:3000` дээр ажиллах ёстой.

### 6. Шалгах:

Browser-д очоод:
- `http://localhost:3000/api` endpoint-д хандах
- Эсвэл frontend-ийг дахин refresh хийх

## Анхаарах зүйлс:

1. **Port 3000 чөлөөтэй эсэх**: Өөр програм port 3000 ашиглаж байгаа эсэхийг шалгах
2. **Database connection**: PostgreSQL ажиллаж байгаа эсэхийг шалгах
3. **Environment variables**: `.env` файл зөв тохируулагдсан эсэхийг шалгах

## Хэрэв backend directory байхгүй бол:

Backend code-ийг үүсгэх шаардлагатай байна. Энэ нь том ажил тул тусад нь хийх хэрэгтэй.

Одоогоор frontend код migration хийгдсэн, гэхдээ backend server ажиллахгүй байгаа тул API call-ууд бүтэхгүй байна.

