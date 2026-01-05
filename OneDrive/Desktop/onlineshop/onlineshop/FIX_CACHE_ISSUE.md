# Vite Cache Асуудал Засах

## Асуудал:

Файлууд зөв засагдсан ч Vite terminal-д base44 import алдаа харагдаж байна.

## Шийдэл:

### 1. Dev Server дахин эхлүүлэх:

```bash
# Terminal-д Ctrl+C дарж зогсоох
# Дараа нь дахин эхлүүлэх:
npm run dev
```

### 2. Vite Cache цэвэрлэх:

```bash
# Windows PowerShell:
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
npm run dev
```

### 3. Browser cache цэвэрлэх:

- Browser-д F12 дарж Developer Tools нээх
- Application tab → Storage → Clear site data
- Эсвэл Hard Refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### 4. Бүрэн цэвэрлэх (хэрэв дээрх нь ажиллахгүй бол):

```bash
# node_modules устгах
Remove-Item -Recurse -Force node_modules

# package-lock.json устгах (optional)
Remove-Item package-lock.json

# Дахин суулгах
npm install

# Dev server эхлүүлэх
npm run dev
```

## Backend Server Асуудал:

Browser console-д `ERR_CONNECTION_REFUSED` харагдаж байна. Энэ нь backend server ажиллахгүй байгаа гэсэн үг.

Backend server эхлүүлэх:

```bash
cd backend
npm install  # Хэрэв анх удаа бол
npm start    # Эсвэл node server.js
```

Backend server `http://localhost:3000` дээр ажиллах ёстой.

