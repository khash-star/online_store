# Backend Test

## ✅ Setup Complete

- ✅ Database created: `onlineshop`
- ✅ Schema applied: 12 tables created
- ✅ .env file created

## 🧪 Testing Backend

### Start Backend Server

```powershell
cd backend
npm run dev
```

### Expected Output:

```
✅ Database connected
🚀 Server running on http://localhost:3000
📡 API endpoint: http://localhost:3000/api
🌍 Environment: development
```

### Test Health Endpoint

Browser эсвэл curl:
```
http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Database Connection

Backend log-д:
- ✅ "Database connected" харагдах ёстой
- ❌ Хэрэв алдаа гарвал DATABASE_URL-ийг шалгах

---

## ❌ Common Issues

### Database Connection Error

**Алдаа**: "connection refused" эсвэл "password authentication failed"

**Шийдэл**:
1. .env файлд DATABASE_URL-ийг шалгах
2. PostgreSQL password зөв эсэхийг шалгах
3. PostgreSQL service ажиллаж байгаа эсэхийг шалгах

### Port Already in Use

**Алдаа**: "Port 3000 is already in use"

**Шийдэл**:
1. Өөр port ашиглах (.env-д PORT=3001)
2. Эсвэл 3000 port-д ажиллаж байгаа process-ийг зогсоох

---

## ✅ Success Checklist

- [ ] Backend server starts
- [ ] Database connects successfully
- [ ] Health endpoint works
- [ ] No errors in console

---

**Backend test хийсний дараа frontend integration хийх боломжтой!** 🚀

