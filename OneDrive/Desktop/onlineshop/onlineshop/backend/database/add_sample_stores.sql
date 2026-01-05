-- Sample Online Stores нэмэх SQL Script
-- Хэрэглэх: pgAdmin 4 Query Tool-д copy/paste хийж F5 дарх
-- Эсвэл: psql -d onlineshop -f add_sample_stores.sql

-- Table нэрийг шалгах: online_stores эсвэл stores
-- Хэрэв table нэр өөр байвал засах хэрэгтэй

-- ============================================
-- ONLINE_STORES (10 stores)
-- ============================================
INSERT INTO online_stores (id, name, logo_url, url, category, gradient, "order", created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'Amazon', 'https://logo.clearbit.com/amazon.com', 'https://www.amazon.com', 'Электроникс', 'from-orange-500 to-orange-700', 1, NOW(), NOW()),
    (gen_random_uuid(), 'eBay', 'https://logo.clearbit.com/ebay.com', 'https://www.ebay.com', 'Электроникс', 'from-blue-500 to-blue-700', 2, NOW(), NOW()),
    (gen_random_uuid(), 'AliExpress', 'https://logo.clearbit.com/aliexpress.com', 'https://www.aliexpress.com', 'Электроникс', 'from-red-500 to-red-700', 3, NOW(), NOW()),
    (gen_random_uuid(), 'Apple Store', 'https://logo.clearbit.com/apple.com', 'https://www.apple.com', 'Электроникс', 'from-gray-600 to-gray-800', 4, NOW(), NOW()),
    (gen_random_uuid(), 'Samsung', 'https://logo.clearbit.com/samsung.com', 'https://www.samsung.com', 'Электроникс', 'from-blue-500 to-blue-700', 5, NOW(), NOW()),
    (gen_random_uuid(), 'Nike', 'https://logo.clearbit.com/nike.com', 'https://www.nike.com', 'Хувцас', 'from-black to-gray-800', 6, NOW(), NOW()),
    (gen_random_uuid(), 'Adidas', 'https://logo.clearbit.com/adidas.com', 'https://www.adidas.com', 'Хувцас', 'from-blue-600 to-black', 7, NOW(), NOW()),
    (gen_random_uuid(), 'Zara', 'https://logo.clearbit.com/zara.com', 'https://www.zara.com', 'Хувцас', 'from-red-500 to-red-700', 8, NOW(), NOW()),
    (gen_random_uuid(), 'H&M', 'https://logo.clearbit.com/hm.com', 'https://www.hm.com', 'Хувцас', 'from-red-600 to-pink-600', 9, NOW(), NOW()),
    (gen_random_uuid(), 'Walmart', 'https://logo.clearbit.com/walmart.com', 'https://www.walmart.com', 'Гэр ахуй', 'from-blue-600 to-blue-800', 10, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Шалгах Query
SELECT 'online_stores' as table_name, COUNT(*) as count FROM online_stores;

