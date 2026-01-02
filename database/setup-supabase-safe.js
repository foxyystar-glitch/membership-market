const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function setupDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Supabase 연결 성공!');

    // 기존 테이블 확인
    const tableCheck = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
        AND tablename = 'memberships';
    `);

    if (tableCheck.rows.length > 0) {
      console.log('⚠️  테이블이 이미 존재합니다.');
      
      // 기존 데이터 확인
      const dataCheck = await client.query('SELECT COUNT(*) FROM memberships');
      const count = parseInt(dataCheck.rows[0].count);
      
      if (count > 0) {
        console.log(`⚠️  기존 데이터 ${count}개가 존재합니다.`);
        console.log('\n옵션:');
        console.log('1. 모두 삭제하고 새로 시작하려면: npm run db:reset');
        console.log('2. 그대로 두고 싶으면: 이 스크립트를 종료하세요.');
        process.exit(0);
      }
    }

    // 스키마 생성
    console.log('\n📋 스키마 생성 중...');
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );
    
    // 트랜잭션 시작
    await client.query('BEGIN');
    
    try {
      await client.query(schemaSQL);
      console.log('✅ 스키마 생성 완료!');

      // 데이터 입력
      console.log('\n📦 데이터 입력 중...');
      const dataSQL = fs.readFileSync(
        path.join(__dirname, 'mainDB_data.sql'),
        'utf8'
      );
      await client.query(dataSQL);
      console.log('✅ 데이터 입력 완료!');

      // 트랜잭션 커밋
      await client.query('COMMIT');
      console.log('✅ 모든 변경사항이 저장되었습니다!');

      // 결과 확인
      const stats = await client.query(`
        SELECT 
          category,
          COUNT(*) as count,
          MIN(id) as min_id,
          MAX(id) as max_id
        FROM memberships 
        GROUP BY category
        ORDER BY 
          CASE category 
            WHEN 'golf' THEN 1 
            WHEN 'condo' THEN 2 
            WHEN 'fitness' THEN 3 
          END;
      `);

      console.log('\n📊 입력된 데이터:');
      console.log('┌─────────────┬────────┬────────────┬────────────┐');
      console.log('│  카테고리   │  개수  │   최소 ID  │   최대 ID  │');
      console.log('├─────────────┼────────┼────────────┼────────────┤');
      stats.rows.forEach(row => {
        const category = row.category.padEnd(11);
        const count = String(row.count).padStart(4);
        const minId = String(row.min_id).padStart(6);
        const maxId = String(row.max_id).padStart(6);
        console.log(`│ ${category} │ ${count}개 │ ${minId}     │ ${maxId}     │`);
      });
      console.log('└─────────────┴────────┴────────────┴────────────┘');

      console.log('\n🎉 설정 완료!');

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

setupDatabase();

