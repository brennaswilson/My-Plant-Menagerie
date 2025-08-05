// Simple URI connection test for Supabase
const { Pool } = require('pg');

async function testURIConnection() {
  console.log('🌱 Testing Supabase URI connection...');
  
  const connectionString = 'postgresql://postgres:Specific3898!@iyailcjpwniyvgnxpumz.supabase.co:5432/postgres?sslmode=require';
  
  const pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
  });
  
  try {
    const result = await pool.query('SELECT 1 as test');
    console.log('✅ URI connection successful!');
    console.log('Test result:', result.rows[0]);
  } catch (error) {
    console.error('❌ URI connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testURIConnection(); 