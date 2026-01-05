-- 12 таблийн бүрт 6-н жишээ өгөгдөл оруулах SQL script
-- Хэрэглэх: pgAdmin 4 Query Tool-д copy/paste хийж F5 дарх

-- ============================================
-- 1. USERS (6 users)
-- NOTE: Users table-д password_hash column байхгүй бол энэ хэсгийг ашиглахгүй
-- Эсвэл users table-ийг schema.sql-ээс шалгаад зөв column нэр ашиглах
-- ============================================
-- Хэрэв password column байхгүй бол энэ INSERT-ийг алгасах
-- Эсвэл Browser дээр register хийж user үүсгэх

-- INSERT INTO users (id, email, role, full_name, created_at, updated_at)
-- VALUES 
--     (gen_random_uuid(), 'admin@example.com', 'admin', 'Админ Хэрэглэгч', NOW(), NOW()),
--     (gen_random_uuid(), 'user1@example.com', 'user', 'Бат-Эрдэнэ', NOW(), NOW()),
--     (gen_random_uuid(), 'user2@example.com', 'user', 'Сараа', NOW(), NOW()),
--     (gen_random_uuid(), 'user3@example.com', 'user', 'Төмөр', NOW(), NOW()),
--     (gen_random_uuid(), 'user4@example.com', 'user', 'Энхбат', NOW(), NOW()),
--     (gen_random_uuid(), 'user5@example.com', 'user', 'Цэцэг', NOW(), NOW())
-- ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 2. PRODUCTS (6 products)
-- ============================================
INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'iPhone 15 Pro', 'Apple-ийн шинэ утас, A17 Pro процессор', 2500000, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', 'электроникс', 'унисекс', '', 'Байгалийн титан', 50, true, 0, 'https://www.apple.com/iphone-15-pro/', NOW(), NOW()),
    (gen_random_uuid(), 'Samsung Galaxy S24', 'Samsung-ийн шинэ утас, 256GB', 1900000, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', 'электроникс', 'унисекс', '', 'Хар', 30, true, 5, 'https://www.samsung.com/galaxy-s24/', NOW(), NOW()),
    (gen_random_uuid(), 'Nike Air Max 90', 'Спортын шаахай, 42 хэмжээ', 450000, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'хувцас', 'унисекс', '42', 'Цагаан', 100, true, 10, 'https://www.nike.com/air-max-90/', NOW(), NOW()),
    (gen_random_uuid(), 'Adidas Originals', 'Классик шаахай, 40-44 хэмжээ', 380000, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500', 'хувцас', 'унисекс', '40-44', 'Цагаан', 80, true, 0, 'https://www.adidas.com/originals/', NOW(), NOW()),
    (gen_random_uuid(), 'MacBook Pro 14"', 'Apple-ийн зөөврийн компьютер, M3 процессор', 5000000, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 'электроникс', 'унисекс', '', 'Мөнгө', 20, true, 0, 'https://www.apple.com/macbook-pro-14/', NOW(), NOW()),
    (gen_random_uuid(), 'iPad Air', 'Apple-ийн планшет, 256GB', 1425000, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', 'электроникс', 'унисекс', '', 'Цэнхэр', 40, true, 5, 'https://www.apple.com/ipad-air/', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. ONLINE_STORES (6 stores)
-- ============================================
INSERT INTO online_stores (id, name, logo_url, url, category, gradient, "order", created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'Apple Store', 'https://logo.clearbit.com/apple.com', 'https://www.apple.com', 'Электроникс', 'from-gray-600 to-gray-800', 1, NOW(), NOW()),
    (gen_random_uuid(), 'Samsung', 'https://logo.clearbit.com/samsung.com', 'https://www.samsung.com', 'Электроникс', 'from-blue-500 to-blue-700', 2, NOW(), NOW()),
    (gen_random_uuid(), 'Nike', 'https://logo.clearbit.com/nike.com', 'https://www.nike.com', 'Хувцас', 'from-black to-gray-800', 3, NOW(), NOW()),
    (gen_random_uuid(), 'Adidas', 'https://logo.clearbit.com/adidas.com', 'https://www.adidas.com', 'Хувцас', 'from-blue-600 to-black', 4, NOW(), NOW()),
    (gen_random_uuid(), 'Zara', 'https://logo.clearbit.com/zara.com', 'https://www.zara.com', 'Хувцас', 'from-red-500 to-red-700', 5, NOW(), NOW()),
    (gen_random_uuid(), 'H&M', 'https://logo.clearbit.com/hm.com', 'https://www.hm.com', 'Хувцас', 'from-red-600 to-pink-600', 6, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. ORDERS (6 orders) - User ID шаардлагатай
-- ============================================
DO $$
DECLARE
    user1_id UUID;
    user2_id UUID;
    user3_id UUID;
BEGIN
    SELECT id INTO user1_id FROM users WHERE email = 'user1@example.com' LIMIT 1;
    SELECT id INTO user2_id FROM users WHERE email = 'user2@example.com' LIMIT 1;
    SELECT id INTO user3_id FROM users WHERE email = 'user3@example.com' LIMIT 1;
    
    IF user1_id IS NOT NULL AND user2_id IS NOT NULL AND user3_id IS NOT NULL THEN
        INSERT INTO orders (id, user_id, total_amount, status, shipping_address, created_at, updated_at)
        VALUES 
            (gen_random_uuid(), user1_id, 2500000, 'completed', 'Улаанбаатар хот, Сүхбаатар дүүрэг', NOW(), NOW()),
            (gen_random_uuid(), user2_id, 1900000, 'pending', 'Улаанбаатар хот, Баянзүрх дүүрэг', NOW(), NOW()),
            (gen_random_uuid(), user1_id, 450000, 'completed', 'Улаанбаатар хот, Сүхбаатар дүүрэг', NOW(), NOW()),
            (gen_random_uuid(), user3_id, 5000000, 'processing', 'Дархан хот, 1-р хороо', NOW(), NOW()),
            (gen_random_uuid(), user2_id, 380000, 'completed', 'Улаанбаатар хот, Баянзүрх дүүрэг', NOW(), NOW()),
            (gen_random_uuid(), user1_id, 1425000, 'pending', 'Улаанбаатар хот, Сүхбаатар дүүрэг', NOW(), NOW());
    END IF;
END $$;

-- ============================================
-- 5. ORDER_ITEMS (6 items) - Order ID шаардлагатай
-- ============================================
DO $$
DECLARE
    order_ids UUID[];
    product_ids UUID[];
BEGIN
    SELECT ARRAY_AGG(id) INTO order_ids FROM orders LIMIT 6;
    SELECT ARRAY_AGG(id) INTO product_ids FROM products LIMIT 6;
    
    IF array_length(order_ids, 1) >= 6 AND array_length(product_ids, 1) >= 6 THEN
        INSERT INTO order_items (id, order_id, product_id, quantity, price, created_at, updated_at)
        VALUES 
            (gen_random_uuid(), order_ids[1], product_ids[1], 1, 2500000, NOW(), NOW()),
            (gen_random_uuid(), order_ids[2], product_ids[2], 1, 1900000, NOW(), NOW()),
            (gen_random_uuid(), order_ids[3], product_ids[3], 2, 450000, NOW(), NOW()),
            (gen_random_uuid(), order_ids[4], product_ids[4], 1, 5000000, NOW(), NOW()),
            (gen_random_uuid(), order_ids[5], product_ids[5], 1, 380000, NOW(), NOW()),
            (gen_random_uuid(), order_ids[6], product_ids[6], 1, 1425000, NOW(), NOW());
    END IF;
END $$;

-- ============================================
-- 6. FAVORITE_PRODUCTS (6 favorites) - User ID, Product ID шаардлагатай
-- ============================================
DO $$
DECLARE
    user_ids UUID[];
    product_ids UUID[];
BEGIN
    SELECT ARRAY_AGG(id) INTO user_ids FROM users WHERE role = 'user' LIMIT 6;
    SELECT ARRAY_AGG(id) INTO product_ids FROM products LIMIT 6;
    
    IF array_length(user_ids, 1) >= 6 AND array_length(product_ids, 1) >= 6 THEN
        INSERT INTO favorite_products (id, user_id, product_id, created_at, updated_at)
        VALUES 
            (gen_random_uuid(), user_ids[1], product_ids[1], NOW(), NOW()),
            (gen_random_uuid(), user_ids[2], product_ids[2], NOW(), NOW()),
            (gen_random_uuid(), user_ids[3], product_ids[3], NOW(), NOW()),
            (gen_random_uuid(), user_ids[4], product_ids[4], NOW(), NOW()),
            (gen_random_uuid(), user_ids[5], product_ids[5], NOW(), NOW()),
            (gen_random_uuid(), user_ids[6], product_ids[6], NOW(), NOW());
    END IF;
END $$;

-- ============================================
-- 7. MESSAGES (6 messages) - User ID шаардлагатай
-- ============================================
DO $$
DECLARE
    user_ids UUID[];
BEGIN
    SELECT ARRAY_AGG(id) INTO user_ids FROM users LIMIT 6;
    
    IF array_length(user_ids, 1) >= 6 THEN
        INSERT INTO messages (id, user_id, subject, message, is_read, created_at, updated_at)
        VALUES 
            (gen_random_uuid(), user_ids[1], 'Захиалгын асуулт', 'Миний захиалга хэзээ хүрэх вэ?', false, NOW(), NOW()),
            (gen_random_uuid(), user_ids[2], 'Барааны мэдээлэл', 'Энэ бараа хэмжээ ямар байна вэ?', false, NOW(), NOW()),
            (gen_random_uuid(), user_ids[3], 'Төлбөрийн асуулт', 'Картаар төлөх боломжтой юу?', true, NOW(), NOW()),
            (gen_random_uuid(), user_ids[4], 'Худалдааны санал', 'Хямдрал хэзээ эхлэх вэ?', false, NOW(), NOW()),
            (gen_random_uuid(), user_ids[5], 'Буцаах асуулт', 'Барааг буцааж болох уу?', false, NOW(), NOW()),
            (gen_random_uuid(), user_ids[6], 'Холбоо барих', 'Дэлгэрэнгүй мэдээлэл авах хүсэлтэй', true, NOW(), NOW());
    END IF;
END $$;

-- ============================================
-- 8. PROMO_MESSAGES (6 promos)
-- NOTE: promo_messages table-д "message" column байна, "icon" болон "text" биш
-- ============================================
INSERT INTO promo_messages (id, message, is_active, created_at, updated_at)
VALUES 
    (gen_random_uuid(), '🎉 Шинэ жилд 50% хямдрал!', true, NOW(), NOW()),
    (gen_random_uuid(), '🔥 Хурдан захиалга, хурдан хүргэлт!', true, NOW(), NOW()),
    (gen_random_uuid(), '⚡ Электроникс бараанд 20% хямдрал', true, NOW(), NOW()),
    (gen_random_uuid(), '👕 Хувцасны зөвлөмж: 30% хямдрал', false, NOW(), NOW()),
    (gen_random_uuid(), '💎 Элит бараанд онцгой үнэ', true, NOW(), NOW()),
    (gen_random_uuid(), '🚀 Шинэ бараа ирлээ!', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ============================================
-- 9. FEATURED_PRODUCTS (6 featured) - Product ID шаардлагатай
-- NOTE: featured_products table-д product_id unique constraint байна
-- ============================================
DO $$
DECLARE
    product_ids UUID[];
BEGIN
    SELECT ARRAY_AGG(id) INTO product_ids FROM products LIMIT 6;
    
    IF array_length(product_ids, 1) >= 6 THEN
        INSERT INTO featured_products (id, product_id, created_at)
        VALUES 
            (gen_random_uuid(), product_ids[1], NOW()),
            (gen_random_uuid(), product_ids[2], NOW()),
            (gen_random_uuid(), product_ids[3], NOW()),
            (gen_random_uuid(), product_ids[4], NOW()),
            (gen_random_uuid(), product_ids[5], NOW()),
            (gen_random_uuid(), product_ids[6], NOW())
        ON CONFLICT (product_id) DO NOTHING;
    END IF;
END $$;

-- ============================================
-- 10. SEARCH_QUERIES (6 queries)
-- ============================================
INSERT INTO search_queries (id, query, count, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'iPhone', 25, NOW(), NOW()),
    (gen_random_uuid(), 'Samsung', 18, NOW(), NOW()),
    (gen_random_uuid(), 'Nike', 30, NOW(), NOW()),
    (gen_random_uuid(), 'MacBook', 12, NOW(), NOW()),
    (gen_random_uuid(), 'iPad', 20, NOW(), NOW()),
    (gen_random_uuid(), 'Adidas', 15, NOW(), NOW())
ON CONFLICT (query) DO UPDATE SET count = search_queries.count + 1;

-- ============================================
-- 11. CONTACT_INFO (6 contacts)
-- NOTE: contact_info table-д name, phone, email, address columns байна, "order" байхгүй
-- ============================================
INSERT INTO contact_info (id, name, phone, email, address, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'Утасны дугаар', '+976 99112233', NULL, NULL, NOW(), NOW()),
    (gen_random_uuid(), 'Имэйл хаяг', NULL, 'info@onlineshop.mn', NULL, NOW(), NOW()),
    (gen_random_uuid(), 'Хаяг', NULL, NULL, 'Улаанбаатар хот, Сүхбаатар дүүрэг', NOW(), NOW()),
    (gen_random_uuid(), 'Facebook', NULL, NULL, 'https://facebook.com/onlineshop', NOW(), NOW()),
    (gen_random_uuid(), 'Instagram', NULL, NULL, 'https://instagram.com/onlineshop', NOW(), NOW()),
    (gen_random_uuid(), 'Twitter', NULL, NULL, 'https://twitter.com/onlineshop', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ============================================
-- 12. DEALS (6 deals)
-- NOTE: deals table-д title, company, amount, stage, probability, notes columns байна
-- ============================================
INSERT INTO deals (id, title, company, amount, stage, probability, notes, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'Шинэ жилийн хямдрал', 'ABC Компани', 5000000, 'prospecting', 25, 'Бүх бараанд 50% хямдрал', NOW(), NOW()),
    (gen_random_uuid(), 'Электроникс хямдрал', 'XYZ Дэлгүүр', 3000000, 'qualified', 40, 'Электроникс бараанд 20% хямдрал', NOW(), NOW()),
    (gen_random_uuid(), 'Хувцасны хямдрал', 'Fashion Store', 2500000, 'proposal', 60, 'Хувцасны бараанд 30% хямдрал', NOW(), NOW()),
    (gen_random_uuid(), 'Хурдан хүргэлт', 'Quick Delivery Co', 1000000, 'negotiation', 75, 'Энэ долоо хоногт үнэгүй хүргэлт', NOW(), NOW()),
    (gen_random_uuid(), 'Онцгой санал', 'Premium Shop', 8000000, 'closed_won', 100, 'Элит бараанд онцгой үнэ', NOW(), NOW()),
    (gen_random_uuid(), 'Шинэ бараа', 'New Products Inc', 4000000, 'lead', 20, 'Шинэ бараа ирлээ, эхний 100 захиалгад хямдрал', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- ============================================
-- Шалгах Query
-- ============================================
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'online_stores', COUNT(*) FROM online_stores
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL
SELECT 'favorite_products', COUNT(*) FROM favorite_products
UNION ALL
SELECT 'messages', COUNT(*) FROM messages
UNION ALL
SELECT 'promo_messages', COUNT(*) FROM promo_messages
UNION ALL
SELECT 'featured_products', COUNT(*) FROM featured_products
UNION ALL
SELECT 'search_queries', COUNT(*) FROM search_queries
UNION ALL
SELECT 'contact_info', COUNT(*) FROM contact_info
UNION ALL
SELECT 'deals', COUNT(*) FROM deals
ORDER BY table_name;

