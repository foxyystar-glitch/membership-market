const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function testConnection() {
  console.log('🔍 Supabase 연결 테스트 시작...\n');

  // 환경 변수 확인
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL이 .env 파일에 설정되지 않았습니다.');
    process.exit(1);
  }

  if (!process.env.VITE_SUPABASE_URL) {
    console.warn('⚠️  VITE_SUPABASE_URL이 설정되지 않았습니다. (프론트엔드에서 필요)');
  }

  if (!process.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('⚠️  VITE_SUPABASE_ANON_KEY가 설정되지 않았습니다. (프론트엔드에서 필요)');
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // 연결 시도
    console.log('📡 연결 중...');
    await client.connect();
    console.log('✅ 연결 성공!\n');

    // 테이블 확인
    console.log('📋 테이블 확인 중...');
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log('✅ 발견된 테이블:');
    if (tables.rows.length === 0) {
      console.log('   (테이블 없음 - npm run db:setup 실행 필요)');
    } else {
      tables.rows.forEach(row => {
        console.log(`   - ${row.tablename}`);
      });
    }

    // memberships 테이블 데이터 확인
    const membershipCheck = await client.query(`
      SELECT COUNT(*) FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'memberships';
    `);

    if (parseInt(membershipCheck.rows[0].count) > 0) {
      console.log('\n📊 memberships 테이블 데이터:');
      
      const totalCount = await client.query('SELECT COUNT(*) FROM memberships');
      console.log(`   전체: ${totalCount.rows[0].count}개`);

      const categoryStats = await client.query(`
        SELECT category, COUNT(*) as count 
        FROM memberships 
        GROUP BY category 
        ORDER BY category;
      `);

      categoryStats.rows.forEach(row => {
        console.log(`   - ${row.category}: ${row.count}개`);
      });

      // 샘플 데이터 5개 조회
      console.log('\n🔍 샘플 데이터 (처음 5개):');
      const samples = await client.query(`
        SELECT id, category, product_name, membership_name, location, current_price
        FROM memberships 
        ORDER BY id 
        LIMIT 5;
      `);

      samples.rows.forEach(row => {
        console.log(`   ID ${row.id}: ${row.product_name} - ${row.membership_name} (${row.location}) - ${row.current_price}만원`);
      });
    }

    console.log('\n✅ 모든 테스트 통과!');
    console.log('\n🎉 Supabase 연결이 정상적으로 작동합니다!');
    
  } catch (error) {
    console.error('\n❌ 오류 발생:');
    console.error('   메시지:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('\n💡 해결 방법: DATABASE_URL의 호스트 주소를 확인하세요.');
    } else if (error.code === '28P01') {
      console.error('\n💡 해결 방법: DATABASE_URL의 비밀번호를 확인하세요.');
    } else if (error.code === '3D000') {
      console.error('\n💡 해결 방법: 데이터베이스 이름을 확인하세요.');
    }
    
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔒 연결 종료\n');
  }
}

testConnection();

