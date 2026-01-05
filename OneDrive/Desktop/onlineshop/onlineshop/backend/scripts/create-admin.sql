-- Create admin user script
-- Run this in pgAdmin or psql

-- First, check if user exists and update to admin
UPDATE users 
SET role = 'admin', updated_date = NOW()
WHERE email = 'khashpay@gmail.com';

-- If no rows were updated, create the user
-- Note: You'll need to set password_hash manually or use the Node.js script
INSERT INTO users (email, password_hash, role, full_name, created_date, updated_date)
SELECT 
    'khashpay@gmail.com',
    '$2b$10$YourHashedPasswordHere', -- Replace with actual hash or use Node.js script
    'admin',
    'Admin User',
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'khashpay@gmail.com'
);

-- Verify
SELECT id, email, role, full_name, created_date 
FROM users 
WHERE email = 'khashpay@gmail.com';

