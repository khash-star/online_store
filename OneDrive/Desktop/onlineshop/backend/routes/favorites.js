import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's favorites
router.get('/', authenticate, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT f.*, 
              p.id as product_id, p.name, p.price, p.image_url, p.description
       FROM favorite_products f
       JOIN products p ON f.product_id = p.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.id]
    );

    const favorites = result.rows.map(row => ({
      id: row.id,
      product_id: row.product_id,
      product: {
        id: row.product_id,
        name: row.name,
        price: row.price,
        image_url: row.image_url,
        description: row.description
      },
      created_at: row.created_at
    }));

    res.json({ favorites });
  } catch (error) {
    next(error);
  }
});

// Add to favorites
router.post('/',
  authenticate,
  [
    body('product_id').isUUID()
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

      const { product_id } = req.body;

      // Check if product exists
      const productResult = await pool.query(
        'SELECT id FROM products WHERE id = $1',
        [product_id]
      );

      if (productResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Product not found'
        });
      }

      // Check if already favorited
      const existingResult = await pool.query(
        'SELECT id FROM favorite_products WHERE user_id = $1 AND product_id = $2',
        [req.user.id, product_id]
      );

      if (existingResult.rows.length > 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Product already in favorites'
        });
      }

      // Add to favorites
      const result = await pool.query(
        `INSERT INTO favorite_products (user_id, product_id)
         VALUES ($1, $2)
         RETURNING id, product_id, created_at`,
        [req.user.id, product_id]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      // Handle unique constraint violation
      if (error.code === '23505') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Product already in favorites'
        });
      }
      next(error);
    }
  }
);

// Remove from favorites
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM favorite_products WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Favorite not found'
      });
    }

    res.json({
      message: 'Removed from favorites successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;

