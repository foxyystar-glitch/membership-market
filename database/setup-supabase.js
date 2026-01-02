const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔗 Supabase에 연결 중...');
    await client.connect();
    console.log('✅ 연결 성공!');

    // 1. 스키마 생성
    console.log('\n📋 스키마 생성 중...');
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );
    await client.query(schemaSQL);
    console.log('✅ 스키마 생성 완료!');

    // 2. 데이터 입력
    console.log('\n📦 데이터 입력 중...');
    const dataSQL = fs.readFileSync(
      path.join(__dirname, 'mainDB_data.sql'),
      'utf8'
    );
    await client.query(dataSQL);
    console.log('✅ 데이터 입력 완료!');

    // 3. 데이터 확인
    console.log('\n🔍 데이터 확인 중...');
    const result = await client.query(`
      SELECT 
        category, 
        COUNT(*) as count 
      FROM memberships 
      GROUP BY category
      ORDER BY category;
    `);
    
    console.log('\n📊 카테고리별 데이터:');
    result.rows.forEach(row => {
      console.log(`  - ${row.category}: ${row.count}개`);
    });

    const totalResult = await client.query('SELECT COUNT(*) FROM memberships');
    console.log(`\n✅ 총 ${totalResult.rows[0].count}개의 회원권이 입력되었습니다!`);

    console.log('\n🎉 Supabase 설정이 완료되었습니다!');
    console.log('\n다음 단계:');
    console.log('1. .env 파일에 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY 추가');
    console.log('2. npm run dev로 프론트엔드 실행');

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.stack) {
      console.error('\n상세 오류:', error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n🔒 연결 종료');
  }
}

// 실행
setupDatabase();

