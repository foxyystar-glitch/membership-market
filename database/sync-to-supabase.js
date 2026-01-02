const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Supabase 연결 정보
const connectionString = 'postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres';

async function syncToSupabase() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Supabase에 연결 중...');
    await client.connect();
    console.log('✅ Supabase 연결 성공!\n');

    // 1. 스키마 적용
    console.log('📋 스키마 적용 중...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schemaSQL);
    console.log('✅ 스키마 적용 완료!\n');

    // 2. 데이터 입력
    console.log('📊 데이터 입력 중...');
    const dataSQL = fs.readFileSync(path.join(__dirname, 'mainDB_data.sql'), 'utf-8');
    await client.query(dataSQL);
    console.log('✅ 데이터 입력 완료!\n');

    // 3. 확인
    console.log('🔍 입력된 데이터 확인 중...\n');

    // 전체 개수
    const countResult = await client.query('SELECT COUNT(*) as count FROM memberships');
    console.log(`총 레코드 개수: ${countResult.rows[0].count}개\n`);

    // 카테고리별 통계
    const categoryResult = await client.query(`
      SELECT category, COUNT(*) as count
      FROM memberships
      GROUP BY category
      ORDER BY category
    `);
    console.log('카테고리별 통계:');
    categoryResult.rows.forEach(row => {
      console.log(`  - ${row.category}: ${row.count}개`);
    });
    console.log('');

    // 샘플 데이터 조회
    const sampleResult = await client.query(`
      SELECT id, category, product_name, membership_name
      FROM memberships
      ORDER BY id
      LIMIT 10
    `);
    console.log('샘플 데이터 (처음 10개):');
    console.log('ID | Category | Product Name | Membership Name');
    console.log('---|----------|--------------|----------------');
    sampleResult.rows.forEach(row => {
      console.log(`${row.id} | ${row.category} | ${row.product_name} | ${row.membership_name}`);
    });
    console.log('');

    console.log('🎉 Supabase 동기화 완료!');

  } catch (error) {
    console.error('❌ 에러 발생:', error.message);
    if (error.code) {
      console.error('   에러 코드:', error.code);
    }
    if (error.detail) {
      console.error('   상세:', error.detail);
    }
    throw error;
  } finally {
    await client.end();
    console.log('\n🔌 연결 종료');
  }
}

// 실행
syncToSupabase().catch(err => {
  console.error('동기화 실패:', err);
  process.exit(1);
});
