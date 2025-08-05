// Direct connection test for Supabase
const { Pool } = require('pg');

async function testDirectConnection() {
  console.log('🌱 Testing direct Supabase connection...');
  
  const pool = new Pool({
    host: 'iyailcjpwniyvgnxpumz.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Specific3898!',
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000,
    query_timeout: 5000
  });
  
  try {
    const result = await pool.query('SELECT 1 as test');
    console.log('✅ Direct connection successful!');
    console.log('Test result:', result.rows[0]);
  } catch (error) {
    console.error('❌ Direct connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testDirectConnection(); 