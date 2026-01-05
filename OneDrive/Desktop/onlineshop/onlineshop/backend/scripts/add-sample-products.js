// 10 жишээ бараа нэмэх script
// Хэрэглэх: node backend/scripts/add-sample-products.js

import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'Apple-ийн шинэ утас, A17 Pro процессор, 256GB санах ой',
    price: 2500000,
    image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    category: 'электроникс',
    gender: 'унисекс',
    size: '',
    color: 'Байгалийн титан',
    stock: 50,
    is_available: true,
    discount_percent: 0,
    affiliate_link: 'https://www.apple.com/iphone-15-pro/',
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Samsung-ийн шинэ утас, Snapdragon 8 Gen 3, 128GB',
    price: 2000000,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'электроникс',
    gender: 'унисекс',
    size: '',
    color: 'Хар',
    stock: 30,
    is_available: true,
    discount_percent: 5,
    affiliate_link: 'https://www.samsung.com/galaxy-s24/',
  },
  {
    name: 'MacBook Pro 14"',
    description: 'M3 процессортой MacBook Pro, 16GB RAM, 512GB SSD',
    price: 5000000,
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
    category: 'электроникс',
    gender: 'унисекс',
    size: '14"',
    color: 'Хар',
    stock: 20,
    is_available: true,
    discount_percent: 0,
    affiliate_link: 'https://www.apple.com/macbook-pro-14/',
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'Роберт Кийосаки-гийн санхүүгийн хэмнэлт, хөрөнгө оруулалтын ном',
    price: 42000,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'ном',
    gender: 'унисекс',
    size: '',
    color: '',
    stock: 100,
    is_available: true,
    discount_percent: 0,
    affiliate_link: 'https://www.amazon.com/Rich-Dad-Poor-Dad/dp/1612680194',
  },
  {
    name: 'The 48 Laws of Power',
    description: 'Роберт Грийний хүч, нөлөөллийн ном',
    price: 55000,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'ном',
    gender: 'унисекс',
    size: '',
    color: '',
    stock: 80,
    is_available: true,
    discount_percent: 20,
    affiliate_link: 'https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197',
  },
  {
    name: 'Nike Air Max 270',
    description: 'Nike-ийн тав тухтай спортын гутал',
    price: 300000,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'гутал',
    gender: 'унисекс',
    size: '42, 43, 44',
    color: 'Хар, Цагаан',
    stock: 60,
    is_available: true,
    discount_percent: 10,
    affiliate_link: 'https://www.nike.com/air-max-270',
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Adidas-ийн гүйлтийн гутал, Boost технологи',
    price: 350000,
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
    category: 'гутал',
    gender: 'унисекс',
    size: '41, 42, 43',
    color: 'Хар, Цагаан',
    stock: 45,
    is_available: true,
    discount_percent: 0,
    affiliate_link: 'https://www.adidas.com/ultraboost-22',
  },
  {
    name: 'iPad Air',
    description: 'Apple iPad Air, M2 процессор, 256GB, WiFi',
    price: 1500000,
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    category: 'электроникс',
    gender: 'унисекс',
    size: '',
    color: 'Цэнхэр, Роз',
    stock: 40,
    is_available: true,
    discount_percent: 5,
    affiliate_link: 'https://www.apple.com/ipad-air/',
  },
  {
    name: 'Zara Classic Coat',
    description: 'Zara-ийн сонгодог хүрэм, хөндий утас',
    price: 200000,
    image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500',
    category: 'хувцас',
    gender: 'унисекс',
    size: 'S, M, L, XL',
    color: 'Хар, Саарал',
    stock: 35,
    is_available: true,
    discount_percent: 15,
    affiliate_link: 'https://www.zara.com/classic-coat',
  },
  {
    name: 'Deep Work',
    description: 'Кал Ньюпортын ажлын бүтээмж, анхаарал тараах ном',
    price: 40000,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'ном',
    gender: 'унисекс',
    size: '',
    color: '',
    stock: 90,
    is_available: true,
    discount_percent: 0,
    affiliate_link: 'https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692',
  },
];

async function addSampleProducts() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    console.log('10 жишээ бараа нэмж байна...\n');

    for (const product of products) {
      const query = `
        INSERT INTO products (
          name, description, price, image_url, category, gender, 
          size, color, stock, is_available, discount_percent, affiliate_link
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id, name
      `;
      
      const values = [
        product.name,
        product.description,
        product.price,
        product.image_url,
        product.category,
        product.gender,
        product.size,
        product.color,
        product.stock,
        product.is_available,
        product.discount_percent,
        product.affiliate_link,
      ];

      const result = await client.query(query, values);
      console.log(`✓ ${result.rows[0].name} - ID: ${result.rows[0].id}`);
    }

    await client.query('COMMIT');
    console.log('\n✅ 10 бараа амжилттай нэмэгдлээ!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Алдаа гарлаа:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

addSampleProducts();

