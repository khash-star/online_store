-- 10 жишээ бараа нэмэх SQL script
-- Хэрэглэх: psql -U postgres -d onlineshop -f sample_products.sql

-- Эхлээд user_id олох (admin user)
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    SELECT id INTO admin_user_id FROM users WHERE email = 'khashpay@gmail.com' LIMIT 1;
    
    IF admin_user_id IS NULL THEN
        RAISE EXCEPTION 'Admin user олдсонгүй. Эхлээд admin user үүсгэнэ үү.';
    END IF;

    -- 1. iPhone 15 Pro
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'iPhone 15 Pro',
        'Apple-ийн шинэ утас, A17 Pro процессор, 256GB санах ой',
        2500000,
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        'электроникс',
        'унисекс',
        '',
        'Байгалийн титан',
        50,
        true,
        0,
        'https://www.apple.com/iphone-15-pro/',
        NOW(),
        NOW()
    );

    -- 2. Samsung Galaxy S24
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'Samsung Galaxy S24',
        'Samsung-ийн шинэ утас, Snapdragon 8 Gen 3, 128GB',
        2000000,
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        'электроникс',
        'унисекс',
        '',
        'Хар',
        30,
        true,
        5,
        'https://www.samsung.com/galaxy-s24/',
        NOW(),
        NOW()
    );

    -- 3. MacBook Pro 14"
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'MacBook Pro 14"',
        'M3 процессортой MacBook Pro, 16GB RAM, 512GB SSD',
        5000000,
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
        'электроникс',
        'унисекс',
        '14"',
        'Хар',
        20,
        true,
        0,
        'https://www.apple.com/macbook-pro-14/',
        NOW(),
        NOW()
    );

    -- 4. Rich Dad Poor Dad (Ном)
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'Rich Dad Poor Dad',
        'Роберт Кийосаки-гийн санхүүгийн хэмнэлт, хөрөнгө оруулалтын ном',
        42000,
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        'ном',
        'унисекс',
        '',
        '',
        100,
        true,
        0,
        'https://www.amazon.com/Rich-Dad-Poor-Dad/dp/1612680194',
        NOW(),
        NOW()
    );

    -- 5. The 48 Laws of Power (Ном)
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'The 48 Laws of Power',
        'Роберт Грийний хүч, нөлөөллийн ном',
        55000,
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        'ном',
        'унисекс',
        '',
        '',
        80,
        true,
        20,
        'https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197',
        NOW(),
        NOW()
    );

    -- 6. Nike Air Max 270
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'Nike Air Max 270',
        'Nike-ийн тав тухтай спортын гутал',
        300000,
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        'гутал',
        'унисекс',
        '42, 43, 44',
        'Хар, Цагаан',
        60,
        true,
        10,
        'https://www.nike.com/air-max-270',
        NOW(),
        NOW()
    );

    -- 7. Adidas Ultraboost 22
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'Adidas Ultraboost 22',
        'Adidas-ийн гүйлтийн гутал, Boost технологи',
        350000,
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
        'гутал',
        'унисекс',
        '41, 42, 43',
        'Хар, Цагаан',
        45,
        true,
        0,
        'https://www.adidas.com/ultraboost-22',
        NOW(),
        NOW()
    );

    -- 8. iPad Air
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'iPad Air',
        'Apple iPad Air, M2 процессор, 256GB, WiFi',
        1500000,
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        'электроникс',
        'унисекс',
        '',
        'Цэнхэр, Роз',
        40,
        true,
        5,
        'https://www.apple.com/ipad-air/',
        NOW(),
        NOW()
    );

    -- 9. Zara Classic Coat
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'Zara Classic Coat',
        'Zara-ийн сонгодог хүрэм, хөндий утас',
        200000,
        'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
        'хувцас',
        'унисекс',
        'S, M, L, XL',
        'Хар, Саарал',
        35,
        true,
        15,
        'https://www.zara.com/classic-coat',
        NOW(),
        NOW()
    );

    -- 10. Deep Work (Ном)
    INSERT INTO products (id, name, description, price, image_url, category, gender, size, color, stock, is_available, discount_percent, affiliate_link, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        'Deep Work',
        'Кал Ньюпортын ажлын бүтээмж, анхаарал тараах ном',
        40000,
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        'ном',
        'унисекс',
        '',
        '',
        90,
        true,
        0,
        'https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692',
        NOW(),
        NOW()
    );

    RAISE NOTICE '10 бараа амжилттай нэмэгдлээ!';
END $$;

