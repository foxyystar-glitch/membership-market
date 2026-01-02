const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function updateSyncFunction() {
  console.log('🔄 sync_membership_price 함수 업데이트 시작...\n');

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

    // 수정된 함수만 적용
    console.log('📝 sync_membership_price 함수 업데이트 중...');
    
    const updateFunctionSQL = `
-- sync_membership_price 함수 수정
CREATE OR REPLACE FUNCTION sync_membership_price()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  latest_price INTEGER;
  previous_price INTEGER;
  change_val INTEGER;
  change_pct DECIMAL(5,2);
  new_trend VARCHAR(10);
BEGIN
  -- 가장 최근 날짜의 가격 조회 (방금 INSERT된 레코드 포함)
  SELECT price INTO latest_price
  FROM public.price_history
  WHERE c_id = NEW.c_id
  ORDER BY date DESC, id DESC
  LIMIT 1;

  -- 바로 이전 날짜의 가격 조회 (최근 2번째)
  SELECT price INTO previous_price
  FROM public.price_history
  WHERE c_id = NEW.c_id
  ORDER BY date DESC, id DESC
  LIMIT 1 OFFSET 1;

  -- 변동 계산
  IF previous_price IS NOT NULL THEN
    change_val := latest_price - previous_price;
    change_pct := (change_val::DECIMAL / previous_price) * 100;

    IF change_val > 0 THEN
      new_trend := 'up';
    ELSIF change_val < 0 THEN
      new_trend := 'down';
    ELSE
      new_trend := 'stable';
    END IF;
  ELSE
    -- 첫 번째 가격 입력인 경우
    change_val := 0;
    change_pct := 0;
    new_trend := 'stable';
  END IF;

  -- memberships 테이블 자동 업데이트
  UPDATE public.memberships
  SET
    current_price = latest_price,
    change_value = change_val,
    change_percent = change_pct,
    trend = new_trend,
    updated_at = NOW()
  WHERE id = NEW.c_id;

  RETURN NEW;
END;
$$;
`;

    await client.query(updateFunctionSQL);
    console.log('✅ sync_membership_price 함수 업데이트 완료!\n');

    // 트리거 확인
    console.log('🔍 트리거 확인 중...');
    const triggerCheck = await client.query(`
      SELECT trigger_name, event_manipulation, event_object_table
      FROM information_schema.triggers
      WHERE trigger_name = 'trigger_sync_price'
      AND event_object_schema = 'public';
    `);

    if (triggerCheck.rows.length > 0) {
      console.log('✅ trigger_sync_price 트리거 존재 확인');
      triggerCheck.rows.forEach(row => {
        console.log(`   - ${row.trigger_name}: ${row.event_manipulation} on ${row.event_object_table}`);
      });
    } else {
      console.log('⚠️  trigger_sync_price 트리거가 없습니다. 트리거를 생성합니다...');
      await client.query(`
        DROP TRIGGER IF EXISTS trigger_sync_price ON price_history;
        CREATE TRIGGER trigger_sync_price
        AFTER INSERT ON price_history
        FOR EACH ROW
        EXECUTE FUNCTION sync_membership_price();
      `);
      console.log('✅ 트리거 생성 완료!');
    }

    console.log('\n✅ 모든 작업 완료!');
    console.log('🎉 sync_membership_price 함수가 성공적으로 업데이트되었습니다!\n');

  } catch (error) {
    console.error('\n❌ 오류 발생:', error.message);
    console.error('상세:', error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔒 연결 종료\n');
  }
}

updateSyncFunction();

