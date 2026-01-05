import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'onlineshop',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

const ADMIN_EMAIL = 'khashpay@gmail.com';

async function createAdmin() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Check if admin already exists
    const existingUser = await client.query(
      'SELECT id, email FROM users WHERE email = $1',
      [ADMIN_EMAIL]
    );
    
    if (existingUser.rows.length > 0) {
      // Update existing user to admin
      await client.query(
        'UPDATE users SET role = $1 WHERE email = $2',
        ['admin', ADMIN_EMAIL]
      );
      console.log(`✅ User ${ADMIN_EMAIL} updated to admin role`);
    } else {
      // Create new admin user (password will need to be set via password reset or manual entry)
      // For security, we create with a random password that needs to be reset
      const tempPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      const result = await client.query(
        `INSERT INTO users (email, password_hash, role, full_name, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING id, email, role`,
        [ADMIN_EMAIL, hashedPassword, 'admin', 'Admin User']
      );
      
      console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
      console.log(`⚠️  Temporary password: ${tempPassword}`);
      console.log(`⚠️  Please change password after first login!`);
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating admin:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

createAdmin()
  .then(() => {
    console.log('✅ Admin user setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed to create admin:', error);
    process.exit(1);
  });

