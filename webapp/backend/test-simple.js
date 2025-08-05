// Simple test script for Supabase connection with timeout
const db = require('./database/config-supabase-alt.js');

async function testConnection() {
  console.log('🌱 Testing Supabase connection...');
  
  // Set a timeout
  const timeout = setTimeout(() => {
    console.log('⏰ Connection timeout after 10 seconds');
    process.exit(1);
  }, 10000);
  
  try {
    // Test basic connection
    const result = await db.query('SELECT 1 as test');
    clearTimeout(timeout);
    console.log('✅ Database connection successful!');
    console.log('Test result:', result.rows[0]);
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await db.end();
    process.exit(0);
  }
}

testConnection(); 