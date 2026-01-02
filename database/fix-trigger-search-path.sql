-- ============================================
-- Trigger 함수 search_path 문제 해결
-- ============================================
-- 이 스크립트는 Trigger 함수가 memberships 테이블을 찾지 못하는 문제를 해결합니다.
-- Supabase SQL Editor에서 실행하세요.

-- 1. auto_fill_price_category 함수 수정
CREATE OR REPLACE FUNCTION auto_fill_price_category()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM public.memberships
    WHERE id = NEW.c_id;
  END IF;
  RETURN NEW;
END;
$$;

-- 2. sync_membership_price 함수 수정
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

-- 3. 다른 Trigger 함수들도 수정
CREATE OR REPLACE FUNCTION auto_fill_urgent_fields()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- category 자동 입력
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM public.memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- original_price 자동 입력 (current_price 참조)
  IF NEW.original_price IS NULL THEN
    SELECT current_price INTO NEW.original_price
    FROM public.memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- urgent_price 자동 입력 (original_price와 동일)
  IF NEW.urgent_price IS NULL THEN
    NEW.urgent_price := NEW.original_price;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION auto_fill_presale_fields()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- category 자동 입력
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM public.memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- original_price 자동 입력 (current_price 참조)
  IF NEW.original_price IS NULL THEN
    SELECT current_price INTO NEW.original_price
    FROM public.memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- presale_price 자동 입력 (original_price와 동일)
  IF NEW.presale_price IS NULL THEN
    NEW.presale_price := NEW.original_price;
  END IF;
  
  RETURN NEW;
END;
$$;

-- 완료 메시지
DO $$
BEGIN
  RAISE NOTICE '✅ 모든 Trigger 함수가 성공적으로 수정되었습니다!';
  RAISE NOTICE '   - SECURITY DEFINER 추가';
  RAISE NOTICE '   - search_path = public 설정';
  RAISE NOTICE '   - 테이블 이름을 public.테이블명으로 명시';
END $$;

