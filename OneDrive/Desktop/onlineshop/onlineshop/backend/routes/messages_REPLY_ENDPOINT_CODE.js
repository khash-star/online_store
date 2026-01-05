// ============================================
// POST /api/messages/:id/reply endpoint
// Энэ код-г backend/routes/messages.js файлд нэмнэ
// ============================================

// Шаардлага:
// - POST /api/messages/:id/reply endpoint нэмэх
// - messages хүснэгтэд:
//   - reply (TEXT) - SET reply = $1
//   - replied_at (TIMESTAMP) - SET replied_at = NOW()
//   - is_read = true болгох - SET is_read = true
// - Хариу илгээсний дараа updated message буцаадаг болго - RETURNING *
// - existing code style-г эвдэхгүй

router.post('/:id/reply', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    
    // Validate - хариу мессеж оруулсан эсэхийг шалгах
    if (!reply || !reply.trim()) {
      return res.status(400).json({ error: 'Хариу мессеж оруулна уу' });
    }
    
    // Database query - messages table дээр reply, replied_at, is_read update хийх
    const result = await pool.query(
      `UPDATE messages 
       SET reply = $1, replied_at = NOW(), is_read = true 
       WHERE id = $2 
       RETURNING *`,
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

