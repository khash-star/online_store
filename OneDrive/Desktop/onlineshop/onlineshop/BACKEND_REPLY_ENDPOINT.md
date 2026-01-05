# Backend Reply Endpoint Нэмэх Заавар

## 📝 messages.js файлд нэмэх код:

`backend/routes/messages.js` файлд дараах endpoint нэмэх:

```javascript
// POST /api/messages/:id/reply - Мессежинд хариу өгөх (Admin only)
router.post('/:id/reply', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    
    // Validate
    if (!reply || !reply.trim()) {
      return res.status(400).json({ error: 'Хариу мессеж оруулна уу' });
    }
    
    // Database query - messages table дээр reply column update хийх
    const result = await pool.query(
      `UPDATE messages 
       SET reply = $1, replied_at = NOW() 
       WHERE id = $2 
       RETURNING id, name, email, phone, subject, message, reply, is_read, created_at, replied_at`,
      [reply.trim(), id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Мессеж олдсонгүй' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Reply error:', error);
    res.status(500).json({ error: 'Хариу илгээхэд алдаа гарлаа' });
  }
});
```

## 🔧 Хэрэглэх:

1. `backend/routes/messages.js` файлыг нээх
2. Одоогийн endpoints (GET, POST, PUT, DELETE) -ын дараа дээрх код нэмэх
3. Database дээр `replied_at` column байгаа эсэхийг шалгах
4. Хэрэв `replied_at` column байхгүй бол зөвхөн `reply` column-г update хийх:

```javascript
// Хэрэв replied_at column байхгүй бол:
const result = await pool.query(
  `UPDATE messages 
   SET reply = $1 
   WHERE id = $2 
   RETURNING id, name, email, phone, subject, message, reply, is_read, created_at`,
  [reply.trim(), id]
);
```

## ✅ Шалгах:

1. Backend server restart хийх
2. Postman эсвэл Thunder Client ашиглан тест хийх:
   - POST `http://localhost:3000/api/messages/{message_id}/reply`
   - Headers: `Authorization: Bearer {admin_token}`
   - Body: `{ "reply": "Хариу мессеж" }`

