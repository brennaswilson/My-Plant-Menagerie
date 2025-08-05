// Test using Supabase connection pooler
const { Pool } = require('pg');

async function testPoolerConnection() {
  console.log('🌱 Testing Supabase pooler connection...');
  
  // Try with connection pooler
  const connectionString = 'postgresql://postgres:Specific3898!@iyailcjpwniyvgnxpumz.supabase.co:6543/postgres?sslmode=require';
  
  const pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
  });
  
  try {
    const result = await pool.query('SELECT 1 as test');
    console.log('✅ Pooler connection successful!');
    console.log('Test result:', result.rows[0]);
  } catch (error) {
    console.error('❌ Pooler connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testPoolerConnection(); 