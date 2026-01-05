# User Role Шалгах - Хурдан

## Browser Console дээр:

```javascript
// 1. User object харах
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role);

// 2. Хэрэв role undefined бол database шалгах
// pgAdmin 4 эсвэл psql:
// SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

// 3. Хэрэв role != 'admin' бол admin эрх өгөх
// UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

// 4. Logout → Login → Refresh
// Ctrl+Shift+R

// 5. Дахин шалгах
const user2 = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user2?.role); // "admin" байх ёстой ✅
```

