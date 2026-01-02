const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function refreshAllMemberships() {
  console.log('🔄 모든 memberships 항목 업데이트 시작...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL이 .env 파일에 설정되지 않았습니다.');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Supabase 연결 성공!\n');

    // 현재 memberships 상태 확인
    console.log('📊 현재 memberships 상태 확인 중...');
    const totalCount = await client.query('SELECT COUNT(*) FROM memberships');
    console.log(`   전체 항목: ${totalCount.rows[0].count}개\n`);

    // 카테고리별 통계
    const categoryStats = await client.query(`
      SELECT category, COUNT(*) as count 
      FROM memberships 
      GROUP BY category 
      ORDER BY category;
    `);
    console.log('📋 카테고리별 항목:');
    categoryStats.rows.forEach(row => {
      console.log(`   - ${row.category}: ${row.count}개`);
    });

    // 모든 memberships 업데이트
    console.log('\n🔄 모든 memberships 항목 업데이트 중...');
    console.log('   (이 작업은 시간이 걸릴 수 있습니다...)\n');

    // 업데이트 쿼리 실행
    const updateSQL = `
WITH latest_prices AS (
  SELECT DISTINCT ON (c_id)
    c_id,
    price as latest_price,
    date as latest_date
  FROM price_history
  ORDER BY c_id, date DESC, id DESC
),
previous_prices AS (
  SELECT DISTINCT ON (ph.c_id)
    ph.c_id,
    ph.price as previous_price
  FROM price_history ph
  INNER JOIN latest_prices lp ON ph.c_id = lp.c_id
  WHERE ph.date < lp.latest_date
     OR (ph.date = lp.latest_date AND ph.id < (
       SELECT id FROM price_history 
       WHERE c_id = ph.c_id 
       ORDER BY date DESC, id DESC 
       LIMIT 1
     ))
  ORDER BY ph.c_id, ph.date DESC, ph.id DESC
),
calculated_changes AS (
  SELECT 
    lp.c_id,
    lp.latest_price,
    CASE 
      WHEN pp.previous_price IS NOT NULL 
      THEN lp.latest_price - pp.previous_price 
      ELSE 0 
    END as change_val,
    CASE 
      WHEN pp.previous_price IS NOT NULL AND pp.previous_price > 0
      THEN ROUND(((lp.latest_price - pp.previous_price)::DECIMAL / pp.previous_price) * 100, 2)
      ELSE 0 
    END as change_pct,
    CASE 
      WHEN pp.previous_price IS NULL THEN 'stable'
      WHEN lp.latest_price > pp.previous_price THEN 'up'
      WHEN lp.latest_price < pp.previous_price THEN 'down'
      ELSE 'stable'
    END as trend
  FROM latest_prices lp
  LEFT JOIN previous_prices pp ON lp.c_id = pp.c_id
)
UPDATE memberships m
SET
  current_price = cc.latest_price,
  change_value = cc.change_val,
  change_percent = cc.change_pct,
  trend = cc.trend,
  updated_at = NOW()
FROM calculated_changes cc
WHERE m.id = cc.c_id;
`;

    const result = await client.query(updateSQL);
    console.log(`✅ ${result.rowCount}개 항목 업데이트 완료!\n`);

    // 업데이트 후 상태 확인
    console.log('📊 업데이트 후 상태 확인...');
    
    // 추세별 통계
    const trendStats = await client.query(`
      SELECT trend, COUNT(*) as count 
      FROM memberships 
      GROUP BY trend 
      ORDER BY trend;
    `);
    console.log('📈 추세별 분포:');
    trendStats.rows.forEach(row => {
      const trendIcon = row.trend === 'up' ? '📈' : row.trend === 'down' ? '📉' : '➡️';
      console.log(`   ${trendIcon} ${row.trend}: ${row.count}개`);
    });

    // 샘플 데이터 확인
    console.log('\n🔍 업데이트된 샘플 데이터 (각 추세별 2개씩):');
    
    for (const trend of ['up', 'down', 'stable']) {
      const samples = await client.query(`
        SELECT id, category, product_name, membership_name, 
               current_price, change_value, change_percent, trend
        FROM memberships 
        WHERE trend = $1
        ORDER BY id 
        LIMIT 2;
      `, [trend]);

      if (samples.rows.length > 0) {
        const trendIcon = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️';
        console.log(`\n   ${trendIcon} ${trend.toUpperCase()}:`);
        samples.rows.forEach(row => {
          const sign = row.change_value > 0 ? '+' : '';
          console.log(`      ID ${row.id}: ${row.product_name} - ${row.membership_name}`);
          console.log(`      현재가: ${row.current_price}만원 (${sign}${row.change_value}만원, ${sign}${row.change_percent}%)`);
        });
      }
    }

    // 가격 정보가 없는 항목 확인
    const noPriceCount = await client.query(`
      SELECT COUNT(*) 
      FROM memberships m
      WHERE NOT EXISTS (
        SELECT 1 FROM price_history ph WHERE ph.c_id = m.id
      );
    `);
    
    if (parseInt(noPriceCount.rows[0].count) > 0) {
      console.log(`\n⚠️  가격 정보가 없는 항목: ${noPriceCount.rows[0].count}개`);
      console.log('   (이 항목들은 current_price = 0, trend = stable로 유지됩니다)');
    }

    console.log('\n✅ 모든 작업 완료!');
    console.log('🎉 memberships 테이블이 성공적으로 업데이트되었습니다!\n');

  } catch (error) {
    console.error('\n❌ 오류 발생:', error.message);
    console.error('상세:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔒 연결 종료\n');
  }
}

refreshAllMemberships();

