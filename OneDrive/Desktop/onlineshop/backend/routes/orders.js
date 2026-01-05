import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { sendOrderStatusEmail } from '../utils/email.js';

const router = express.Router();

// Get user's orders
router.get('/', 
  authenticate,
  [
    query('sort').optional().trim(),
    query('status').optional().trim()
  ],
  async (req, res, next) => {
    try {
      const { sort = '-created_at', status } = req.query;

      let queryText = `
        SELECT o.*, 
               json_agg(
                 json_build_object(
                   'id', oi.id,
                   'product_id', oi.product_id,
                   'product_name', oi.product_name,
                   'quantity', oi.quantity,
                   'price', oi.price
                 )
               ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.created_by = $1
      `;
      const params = [req.user.id];
      let paramCount = 2;

      if (status) {
        queryText += ` AND o.status = $${paramCount++}`;
        params.push(status);
      }

      queryText += ` GROUP BY o.id`;

      // Sort
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      const allowedSortFields = ['created_at', 'total_amount'];
      const validSortField = allowedSortFields.includes(sortField) ? sortField : 'created_at';
      
      queryText += ` ORDER BY o.${validSortField} ${sortOrder}`;

      const result = await pool.query(queryText, params);

      res.json({
        orders: result.rows.map(row => ({
          ...row,
          items: row.items[0].id ? row.items : []
        }))
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get single order
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND created_by = $2',
      [id, req.user.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Order not found'
      });
    }

    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    );

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error) {
    next(error);
  }
});

// Create order
router.post('/',
  authenticate,
  [
    body('customer_name').notEmpty().trim(),
    body('customer_phone').notEmpty().trim(),
    body('customer_email').isEmail().normalizeEmail(),
    body('delivery_address').notEmpty().trim(),
    body('payment_method').optional().trim(),
    body('notes').optional().trim(),
    body('items').isArray({ min: 1 }),
    body('items.*.product_id').isUUID(),
    body('items.*.product_name').notEmpty(),
    body('items.*.quantity').isInt({ min: 1 }),
    body('items.*.price').isFloat({ min: 0 }),
    body('total_amount').isFloat({ min: 0 })
  ],
  async (req, res, next) => {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          error: 'Validation error',
          details: errors.array()
        });
      }

      const {
        customer_name,
        customer_phone,
        customer_email,
        delivery_address,
        payment_method = 'бэлэн_мөнгө',
        notes,
        items,
        total_amount,
        status = 'шинэ'
      } = req.body;

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders 
         (customer_name, customer_phone, customer_email, delivery_address, payment_method, notes, total_amount, status, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [customer_name, customer_phone, customer_email, delivery_address, payment_method, notes || null, total_amount, status, req.user.id]
      );

      const order = orderResult.rows[0];

      // Create order items
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, item.product_id, item.product_name, item.quantity, item.price]
        );
      }

      await client.query('COMMIT');

      // Get order with items
      const itemsResult = await pool.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [order.id]
      );

      res.status(201).json({
        ...order,
        items: itemsResult.rows
      });
    } catch (error) {
      await client.query('ROLLBACK');
      next(error);
    } finally {
      client.release();
    }
  }
);

// Get all orders (Admin only)
router.get('/admin/all',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const result = await pool.query(
        `SELECT o.*, 
                json_agg(
                  json_build_object(
                    'id', oi.id,
                    'product_id', oi.product_id,
                    'product_name', oi.product_name,
                    'quantity', oi.quantity,
                    'price', oi.price
                  )
                ) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         GROUP BY o.id
         ORDER BY o.created_at DESC`
      );

      res.json({
        orders: result.rows.map(row => ({
          ...row,
          items: row.items[0].id ? row.items : []
        }))
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update order (Admin only)
router.put('/:id',
  authenticate,
  requireAdmin,
  [
    body('status').optional().trim()
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
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Status is required'
        });
      }

      // Get current order to check if status changed
      const currentOrderResult = await pool.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
      );

      if (currentOrderResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Order not found'
        });
      }

      const currentOrder = currentOrderResult.rows[0];
      const statusChanged = currentOrder.status !== status;

      // Update order status
      const result = await pool.query(
        `UPDATE orders 
         SET status = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, id]
      );

      const updatedOrder = result.rows[0];

      // Send email notification if status changed
      if (statusChanged) {
        // Send email asynchronously (don't wait for it)
        sendOrderStatusEmail(updatedOrder, status)
          .then((emailResult) => {
            if (emailResult.success) {
              console.log(`✅ Order status email sent for order ${id}`);
            } else if (emailResult.skipped) {
              console.log(`⏭️  Order status email skipped for order ${id}`);
            } else {
              console.error(`❌ Failed to send order status email for order ${id}:`, emailResult.error);
            }
          })
          .catch((error) => {
            console.error(`❌ Error sending order status email for order ${id}:`, error);
          });
      }

      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

