const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function resetDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Supabase 연결 성공!');

    console.log('\n⚠️  모든 데이터와 테이블을 삭제합니다...');
    
    await client.query('BEGIN');
    
    try {
      // 트리거 삭제
      await client.query('DROP TRIGGER IF EXISTS trigger_manage_rank ON memberships CASCADE;');
      await client.query('DROP TRIGGER IF EXISTS trigger_auto_fill_price_category ON price_history CASCADE;');
      await client.query('DROP TRIGGER IF EXISTS trigger_sync_price ON price_history CASCADE;');
      await client.query('DROP TRIGGER IF EXISTS trigger_auto_fill_urgent_fields ON urgent_sales CASCADE;');
      await client.query('DROP TRIGGER IF EXISTS trigger_auto_fill_presale_fields ON presales CASCADE;');
      
      // 함수 삭제
      await client.query('DROP FUNCTION IF EXISTS manage_rank() CASCADE;');
      await client.query('DROP FUNCTION IF EXISTS auto_fill_price_category() CASCADE;');
      await client.query('DROP FUNCTION IF EXISTS sync_membership_price() CASCADE;');
      await client.query('DROP FUNCTION IF EXISTS auto_fill_urgent_fields() CASCADE;');
      await client.query('DROP FUNCTION IF EXISTS auto_fill_presale_fields() CASCADE;');
      
      // 테이블 삭제 (외래키 때문에 순서 중요)
      await client.query('DROP TABLE IF EXISTS presales CASCADE;');
      await client.query('DROP TABLE IF EXISTS urgent_sales CASCADE;');
      await client.query('DROP TABLE IF EXISTS price_history CASCADE;');
      await client.query('DROP TABLE IF EXISTS memberships CASCADE;');
      
      await client.query('COMMIT');
      console.log('✅ 모든 데이터가 삭제되었습니다!');
      console.log('\n이제 다음을 실행하세요:');
      console.log('  npm run db:setup');
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

resetDatabase();

