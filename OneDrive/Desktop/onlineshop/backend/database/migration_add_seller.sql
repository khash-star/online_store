-- Migration: Add seller support to products table
-- Run this migration to add seller_id column and update user roles

-- 1. Update users table to allow 'seller' role
ALTER TABLE users 
  DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE users 
  ADD CONSTRAINT users_role_check 
  CHECK (role IN ('user', 'admin', 'seller'));

-- 2. Add seller_id column to products table
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- 3. Create index on seller_id for better query performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);

-- 4. (Optional) Update existing products to set seller_id to NULL
-- This allows existing products to remain without a seller
-- UPDATE products SET seller_id = NULL WHERE seller_id IS NULL;

