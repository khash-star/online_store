// ЭНЭ ФАЙЛЫГ backend/routes/messages.js файлд нэмэх хэрэгтэй!

// ============================================
// POST /api/messages/:id/reply endpoint
// ============================================
// Энэ код-г backend/routes/messages.js файлын бусад endpoints (GET, POST, PUT, DELETE) -ын ДАРАА нэмнэ

router.post('/:id/reply', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    
    // Validate - хариу мессеж оруулсан эсэхийг шалгах
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
    
    // Мессеж олдсонгүй бол 404 error буцаах
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Мессеж олдсонгүй' });
    }
    
    // Амжилттай бол шинэчлэгдсэн мессежийг буцаах
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Reply error:', error);
    res.status(500).json({ error: 'Хариу илгээхэд алдаа гарлаа' });
  }
});

// ============================================
// АНХААРУУЛГА:
// ============================================
// 1. Энэ код-г backend/routes/messages.js файлд нэмнэ
// 2. Бусад endpoints (GET, POST, PUT, DELETE) -ын ДАРАА нэмнэ
// 3. requireAuth, requireAdmin middleware байгаа эсэхийг шалгах
// 4. pool (database connection) байгаа эсэхийг шалгах
// 5. Backend server RESTART хийх
// ============================================

