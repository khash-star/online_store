import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// backend/routes/stores.js
router.get('/', async (req, res, next) => {
  try {
    const { sort = 'order' } = req.query;
    
    const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
    const allowedSortFields = ['order', 'created_at'];
    const validSortField = allowedSortFields.includes(sortField) ? sortField : 'order';
    
    // "order" нь reserved keyword тул double quotes ашиглах
    const quotedField = validSortField === 'order' ? '"order"' : validSortField;
    
    const result = await pool.query(
      `SELECT * FROM online_stores ORDER BY ${quotedField} ${sortOrder}`
    );
    
    res.json({ stores: result.rows });
  } catch (error) {
    next(error);
  }
});

// Create store (Admin only)
router.post('/',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().trim(),
    body('url').isURL(),
    body('logo_url').optional().trim(),
    body('category').optional().trim(),
    body('gradient').optional().trim(),
    body('order').optional().isInt({ min: 0 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation error',
          details: errors.array()
        });
      }

      const { name, url, logo_url, category, gradient, order = 0 } = req.body;

      const result = await pool.query(
        `INSERT INTO online_stores (name, url, logo_url, category, gradient, "order")
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [name, url, logo_url || null, category || null, gradient || null, order]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Update store (Admin only)
router.put('/:id',
  authenticate,
  requireAdmin,
  [
    body('name').optional().trim(),
    body('url').optional().isURL(),
    body('logo_url').optional().trim(),
    body('category').optional().trim(),
    body('gradient').optional().trim(),
    body('order').optional().isInt({ min: 0 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation error',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const updates = [];
      const values = [];
      let paramCount = 1;

      const allowedFields = ['name', 'url', 'logo_url', 'category', 'gradient', 'order'];
      
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          if (field === 'order') {
            updates.push(`"order" = $${paramCount++}`);
          } else {
            updates.push(`${field} = $${paramCount++}`);
          }
          values.push(req.body[field]);
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No fields to update'
        });
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const result = await pool.query(
        `UPDATE online_stores 
         SET ${updates.join(', ')} 
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Store not found'
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete store (Admin only)
router.delete('/:id',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM online_stores WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Store not found'
        });
      }

      res.json({
        message: 'Store deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

