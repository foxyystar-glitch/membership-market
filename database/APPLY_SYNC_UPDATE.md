# sync_membership_price 함수 업데이트 가이드

## 📌 Supabase 웹 콘솔에서 적용하기

### 1단계: Supabase 프로젝트 접속

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **SQL Editor** 클릭

### 2단계: 함수 업데이트 SQL 실행

아래 SQL을 복사하여 SQL Editor에 붙여넣고 실행하세요:

```sql
-- sync_membership_price 함수 업데이트
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
```

### 3단계: 모든 memberships 항목 업데이트

함수 업데이트 후, 아래 SQL을 실행하여 모든 memberships 항목을 새로고침하세요:

```sql
-- 모든 memberships 항목 업데이트
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
```

### 4단계: 확인

업데이트 후 다음 쿼리로 결과를 확인하세요:

```sql
-- 추세별 통계
SELECT trend, COUNT(*) as count 
FROM memberships 
GROUP BY trend 
ORDER BY trend;

-- 샘플 데이터 확인
SELECT id, category, product_name, membership_name, 
       current_price, change_value, change_percent, trend
FROM memberships 
ORDER BY id 
LIMIT 10;
```

## ✅ 완료!

이제 `price_history`에 새로운 가격을 추가할 때마다 자동으로 `memberships` 테이블이 업데이트됩니다!

---

## 🔄 또는 스크립트로 실행 (DATABASE_URL이 있는 경우)

DATABASE_URL이 유효하다면, 다음 명령어로 한 번에 적용할 수 있습니다:

```bash
cd database
node update-sync-function.js
node refresh-all-memberships.js
```

또는 npm 스크립트로:

```bash
cd database
npm run update-function
npm run refresh-memberships
```

