# CORS Алдаа Засах

## Асуудал:

Browser console-д CORS алдаа гарч байна:

```
Access to XMLHttpRequest at 'http://localhost:3000/api/products' from origin 'http://localhost:5174' 
has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:5173' 
that is not equal to the supplied origin.
```

## Шалтгаан:

Backend CORS configuration-д `http://localhost:5173` байгаа ч frontend `http://localhost:5174` дээр ажиллаж байна (Vite порт 5173 ашиглаж болохгүй байгаа тул 5174 ашиглаж байна).

## Шийдэл:

Backend server.js файл дээр CORS configuration-ийг засах хэрэгтэй.

### Backend server.js файл олох:

Backend directory-д `server.js` файл байх ёстой.

### CORS засах:

#### Option 1: Бүх localhost port-уудыг зөвшөөрөх (Development-д тохиромжтой):

```javascript
const cors = require('cors');

app.use(cors({
  origin: /^http:\/\/localhost:\d+$/,  // Бүх localhost port-ууд
  credentials: true
}));
```

#### Option 2: Тодорхой port-уудыг зөвшөөрөх:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

#### Option 3: Environment variable ашиглах:

```javascript
const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

### .env файлд нэмэх (Option 3 ашиглавал):

```env
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
```

## Засах алхам:

1. `backend/server.js` файл нээх
2. CORS configuration олох
3. Дээрх Option-уудын аль нэгийг ашиглах
4. Backend server дахин эхлүүлэх (nodemon автоматаар хийх ёстой)

## Шалгах:

Backend server дахин эхлэсний дараа browser-д refresh хийх (Ctrl+Shift+R).

CORS алдаа алга болох ёстой!

## Анхаарах зүйлс:

- Development-д Option 1 (regex) хамгийн хялбар
- Production-д Option 3 (environment variable) ашиглах нь дээр
- Credentials: true нэмэх нь cookies/tokens ашиглах үед шаардлагатай

