// Production test script for database connection
const db = require('./database/config-supabase.js');

async function testProductionConnection() {
  console.log('🌱 Testing production database connection...');
  
  try {
    // Test basic connection
    const result = await db.query('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    console.log('Test result:', result.rows[0]);
    
    // Test if tables exist
    const tablesResult = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 Available tables:');
    tablesResult.rows.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    // Test sample data
    const plantsResult = await db.query('SELECT COUNT(*) as count FROM plants');
    console.log(`🌿 Plants in database: ${plantsResult.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === '28P01') {
      console.log('\n💡 Authentication issue. Check:');
      console.log('   - DATABASE_URL environment variable');
      console.log('   - Password in connection string');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Connection issue. Check:');
      console.log('   - DATABASE_URL host');
      console.log('   - Supabase project status');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Connection refused. Check:');
      console.log('   - Supabase project is active');
      console.log('   - IP restrictions in Supabase');
    }
  } finally {
    await db.end();
    process.exit(0);
  }
}

testProductionConnection(); 