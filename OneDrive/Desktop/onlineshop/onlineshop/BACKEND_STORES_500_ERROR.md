# Backend Stores API 500 Error - Засах заавар

## Асуудал

Console дээр `GET /api/stores?sort=order 500 (Internal Server Error)` алдаа гарч байна.

Database дээр 16 дэлгүүр байгаа ч backend API 500 буцааж байна.

## Шалтгаан

Backend route `/api/stores` дээр алдаа гарч байна. Магадгүй:
1. Backend route файл байхгүй (`backend/routes/stores.js`)
2. Database query алдаатай
3. Table нэр буруу (`online_stores` vs `stores`)
4. Column нэр буруу

## Засах арга

### 1. Backend route файл шалгах

Backend дээр `backend/routes/stores.js` файл байгаа эсэхийг шалгах:

```bash
ls backend/routes/stores.js
```

### 2. Table нэр шалгах

Database дээр table нэрийг шалгах:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%store%';
```

Магадгүй table нэр нь:
- `online_stores` (schema.sql дээр)
- `stores` (API дээр)

### 3. Backend route үүсгэх

Хэрэв `backend/routes/stores.js` байхгүй бол үүсгэх:

```javascript
// backend/routes/stores.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// GET /api/stores
router.get('/', async (req, res) => {
  try {
    const { sort = 'order' } = req.query;
    
    let orderBy = 'ORDER BY "order" ASC';
    if (sort === '-created_at') {
      orderBy = 'ORDER BY created_at DESC';
    } else if (sort === 'order') {
      orderBy = 'ORDER BY "order" ASC';
    }
    
    const result = await db.query(
      `SELECT * FROM online_stores ${orderBy}`
    );
    
    res.json({ stores: result.rows });
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/stores (Admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  // ... create store
});

// PUT /api/stores/:id (Admin only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  // ... update store
});

// DELETE /api/stores/:id (Admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  // ... delete store
});

module.exports = router;
```

### 4. Server.js дээр route нэмэх

`backend/server.js` дээр:

```javascript
const storesRoutes = require('./routes/stores');
app.use('/api/stores', storesRoutes);
```

## Шалгах

Backend server ажиллаж байгаа эсэхийг шалгах:

```bash
cd backend
npm run dev
```

Browser дээр:
```
http://localhost:3000/api/stores?sort=order
```

Энэ нь JSON буцаах ёстой:
```json
{
  "stores": [...]
}
```

## Түр шийдэл

Хэрэв backend засах боломжгүй бол, frontend дээр mock data ашиглах:

```javascript
// src/api/stores.js
export const getStores = async (params = {}) => {
  try {
    const response = await apiClient.get('/stores', { params });
    return response.data;
  } catch (error) {
    // Mock data буцаах
    console.warn('Using mock stores data');
    return {
      stores: [
        { id: '1', name: 'Amazon', logo_url: '...', url: 'https://amazon.com', ... },
        // ...
      ]
    };
  }
};
```

