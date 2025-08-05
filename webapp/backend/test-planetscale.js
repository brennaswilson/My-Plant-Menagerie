// Test script for PlanetScale connection
const db = require('./database/config-planetscale.js');

async function testConnection() {
  console.log('🌱 Testing PlanetScale connection...');
  
  try {
    // Test basic connection
    const [rows] = await db.query('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    console.log('Test result:', rows[0]);
    
    // Test if tables exist
    const [tables] = await db.query('SHOW TABLES');
    console.log('📋 Available tables:');
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });
    
    // Test sample data
    const [plants] = await db.query('SELECT COUNT(*) as count FROM Plants');
    console.log(`🌿 Plants in database: ${plants[0].count}`);
    
    const [plantTypes] = await db.query('SELECT COUNT(*) as count FROM PlantTypes');
    console.log(`🌱 Plant types in database: ${plantTypes[0].count}`);
    
    const [wateringEvents] = await db.query('SELECT COUNT(*) as count FROM WateringEvents');
    console.log(`💧 Watering events in database: ${wateringEvents[0].count}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 This might be an authentication issue. Check your:');
      console.log('   - Username and password');
      console.log('   - Database name');
      console.log('   - Host URL');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 This might be a connection issue. Check your:');
      console.log('   - Network connection');
      console.log('   - Host URL');
      console.log('   - SSL configuration');
    }
  } finally {
    process.exit(0);
  }
}

testConnection(); 