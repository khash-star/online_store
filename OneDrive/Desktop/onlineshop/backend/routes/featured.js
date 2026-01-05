import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all featured products
router.get('/',
  [
    query('sort').optional().trim()
  ],
  async (req, res, next) => {
    try {
      const { sort = 'order' } = req.query;

      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';

      const result = await pool.query(
        `SELECT f.*, 
                p.id as product_id, p.name, p.price, p.image_url, p.description
         FROM featured_products f
         JOIN products p ON f.product_id = p.id
         ORDER BY f.${sortField} ${sortOrder}`
      );

      const featured = result.rows.map(row => ({
        id: row.id,
        product_id: row.product_id,
        order: row.order,
        product: {
          id: row.product_id,
          name: row.name,
          price: row.price,
          image_url: row.image_url,
          description: row.description
        },
        created_at: row.created_at
      }));

      res.json({ featured });
    } catch (error) {
      next(error);
    }
  }
);

// Add featured product (Admin only)
router.post('/',
  authenticate,
  requireAdmin,
  [
    body('product_id').isUUID(),
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

      const { product_id, order = 0 } = req.body;

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

      const result = await pool.query(
        `INSERT INTO featured_products (product_id, "order")
         VALUES ($1, $2)
         RETURNING id, product_id, "order", created_at`,
        [product_id, order]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Product already featured'
        });
      }
      next(error);
    }
  }
);

// Delete featured product (Admin only)
router.delete('/:id',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM featured_products WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Featured product not found'
        });
      }

      res.json({
        message: 'Removed from featured successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

