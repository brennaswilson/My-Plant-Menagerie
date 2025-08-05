// Alternative test script for Supabase connection using individual parameters
const db = require('./database/config-supabase-alt.js');

async function testConnection() {
  console.log('🌱 Testing Supabase connection (alternative config)...');
  
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
    const plantsResult = await db.query('SELECT COUNT(*) as count FROM "Plants"');
    console.log(`🌿 Plants in database: ${plantsResult.rows[0].count}`);
    
    const plantTypesResult = await db.query('SELECT COUNT(*) as count FROM "PlantTypes"');
    console.log(`🌱 Plant types in database: ${plantTypesResult.rows[0].count}`);
    
    const wateringEventsResult = await db.query('SELECT COUNT(*) as count FROM "WateringEvents"');
    console.log(`💧 Watering events in database: ${wateringEventsResult.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === '28P01') {
      console.log('\n💡 This might be an authentication issue. Check your:');
      console.log('   - DB_PASSWORD environment variable');
      console.log('   - Username and password');
    } else if (error.code === 'ENOTFOUND') {
      console.log('\n💡 This might be a connection issue. Check your:');
      console.log('   - DB_HOST environment variable');
      console.log('   - Network connection');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Connection refused. Check your:');
      console.log('   - DB_HOST and DB_PORT');
      console.log('   - Supabase project status');
    }
  } finally {
    await db.end();
    process.exit(0);
  }
}

testConnection(); 