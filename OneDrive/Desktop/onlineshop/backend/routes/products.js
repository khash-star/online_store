import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin, requireSellerOrAdmin, optionalAuthenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all products (Public access, but authenticated sellers see only their products)
router.get('/', 
  optionalAuthenticate,
  [
    query('category').optional().trim(),
    query('search').optional().trim(),
    query('sort').optional().trim(),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('offset').optional().isInt({ min: 0 })
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

      const { category, search, sort = '-created_at', limit = 100, offset = 0 } = req.query;
      const user = req.user; // May be null if not authenticated

      let queryText = 'SELECT * FROM products WHERE 1=1';
      const params = [];
      let paramCount = 1;

      // If user is seller, filter by seller_id
      if (user && user.role === 'seller') {
        queryText += ` AND seller_id = $${paramCount++}`;
        params.push(user.id);
      }
      // Admin and public users see all products (no filter)

      if (category && category !== 'all') {
        queryText += ` AND category = $${paramCount++}`;
        params.push(category);
      }

      if (search) {
        queryText += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
        params.push(`%${search}%`);
        paramCount++;
      }

      // Sort
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      
      const allowedSortFields = ['created_at', 'price', 'name'];
      const validSortField = allowedSortFields.includes(sortField) ? sortField : 'created_at';
      
      queryText += ` ORDER BY ${validSortField} ${sortOrder}`;

      // Limit and offset
      queryText += ` LIMIT $${paramCount++} OFFSET $${paramCount++}`;
      params.push(parseInt(limit), parseInt(offset));

      // Get total count
      let countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1';
      const countParams = [];
      let countParamCount = 1;

      // If user is seller, filter by seller_id
      if (user && user.role === 'seller') {
        countQuery += ` AND seller_id = $${countParamCount++}`;
        countParams.push(user.id);
      }
      // Admin and public users see all products (no filter)

      if (category && category !== 'all') {
        countQuery += ` AND category = $${countParamCount++}`;
        countParams.push(category);
      }

      if (search) {
        countQuery += ` AND (name ILIKE $${countParamCount} OR description ILIKE $${countParamCount})`;
        countParams.push(`%${search}%`);
        countParamCount++;
      }

      const [productsResult, countResult] = await Promise.all([
        pool.query(queryText, params),
        pool.query(countQuery, countParams)
      ]);

      res.json({
        products: productsResult.rows,
        total: parseInt(countResult.rows[0].count)
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get single product
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Product not found'
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Create product (Admin or Seller)
router.post('/', 
  authenticate,
  requireSellerOrAdmin,
  [
    body('name').notEmpty().trim(),
    body('price').isFloat({ min: 0 }),
    body('description').optional().trim(),
    body('image_url').optional().trim(),
    body('category').optional().trim(),
    body('gender').optional().trim(),
    body('size').optional().trim(),
    body('color').optional().trim(),
    body('stock').optional().isInt({ min: 0 }),
    body('is_available').optional().isBoolean(),
    body('discount_percent').optional().isInt({ min: 0, max: 100 }),
    body('affiliate_link').optional().trim()
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

      const {
        name,
        description,
        price,
        image_url,
        category,
        gender,
        size,
        color,
        stock = 100,
        is_available = true,
        discount_percent = 0,
        affiliate_link
      } = req.body;

      // Set seller_id: for seller, use req.user.id; for admin, can be null
      const seller_id = req.user.role === 'seller' ? req.user.id : null;

      const result = await pool.query(
        `INSERT INTO products 
         (name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, seller_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING *`,
        [name, description || null, price, image_url || null, category || null, gender || null, size || null, color || null, stock, is_available, discount_percent, affiliate_link || null, seller_id]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Update product (Admin or Seller - seller can only update their own products)
router.put('/:id',
  authenticate,
  requireSellerOrAdmin,
  [
    body('name').optional().trim(),
    body('description').optional().trim(),
    body('price').optional().isFloat({ min: 0 }),
    body('image_url').optional().trim(),
    body('category').optional().trim(),
    body('gender').optional().trim(),
    body('size').optional().trim(),
    body('color').optional().trim(),
    body('stock').optional().isInt({ min: 0 }),
    body('is_available').optional().isBoolean(),
    body('discount_percent').optional().isInt({ min: 0, max: 100 }),
    body('affiliate_link').optional().trim()
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
      const user = req.user;

      // Check if product exists and verify ownership (for sellers)
      const productResult = await pool.query(
        'SELECT seller_id FROM products WHERE id = $1',
        [id]
      );

      if (productResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Product not found'
        });
      }

      const product = productResult.rows[0];

      // If user is seller, check if they own this product
      if (user.role === 'seller' && product.seller_id !== user.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only update your own products'
        });
      }

      const updates = [];
      const values = [];
      let paramCount = 1;

      const allowedFields = ['name', 'description', 'price', 'image_url', 'category', 'gender', 'size', 'color', 'stock', 'is_available', 'discount_percent', 'affiliate_link'];
      
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates.push(`${field} = $${paramCount++}`);
          values.push(req.body[field]);
        }
      }

      if (updates.length === 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No fields to update'
        });
      }

      // Add updated_at
      updates.push(`updated_at = CURRENT_TIMESTAMP`);

      values.push(id);

      const result = await pool.query(
        `UPDATE products 
         SET ${updates.join(', ')} 
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Product not found'
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete product (Admin or Seller - seller can only delete their own products)
router.delete('/:id',
  authenticate,
  requireSellerOrAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;

      // Check if product exists and verify ownership (for sellers)
      const productResult = await pool.query(
        'SELECT seller_id FROM products WHERE id = $1',
        [id]
      );

      if (productResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Product not found'
        });
      }

      const product = productResult.rows[0];

      // If user is seller, check if they own this product
      if (user.role === 'seller' && product.seller_id !== user.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only delete your own products'
        });
      }

      const result = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Product not found'
        });
      }

      res.json({
        message: 'Product deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

