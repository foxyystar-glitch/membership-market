-- ============================================
-- 회원권마켓 데이터베이스 스키마
-- ============================================
-- 
-- 📌 자동 입력 기능:
-- 1. price_history: category는 c_id로부터 자동 입력
-- 2. urgent_sales: category, original_price, urgent_price 자동 입력
--    - category: c_id로부터 자동
--    - original_price: memberships의 current_price 참조
--    - urgent_price: 입력하지 않으면 original_price와 동일하게 설정
-- 3. presales: category, original_price, presale_price 자동 입력
--    - category: c_id로부터 자동
--    - original_price: memberships의 current_price 참조
--    - presale_price: 입력하지 않으면 original_price와 동일하게 설정
-- ============================================

-- 1. mainDB (memberships) - 회원권 마스터 테이블
-- ============================================
CREATE TABLE memberships (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- 기본 정보
  category VARCHAR(20) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  membership_name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,

  -- 가격 정보
  current_price INTEGER DEFAULT 0,
  change_value INTEGER DEFAULT 0,
  change_percent DECIMAL(5,2) DEFAULT 0,
  trend VARCHAR(10) DEFAULT 'stable',

  -- 표시 관리
  active_flag BOOLEAN DEFAULT true,        -- 전체 활성화/비활성화
  display_flag BOOLEAN DEFAULT false,      -- 메인 페이지 시세표 섹션 노출 여부
  rank INTEGER DEFAULT NULL CHECK (rank BETWEEN 1 AND 5),

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- 제약조건
  CONSTRAINT chk_category CHECK (category IN ('golf', 'condo', 'fitness')),
  CONSTRAINT chk_trend CHECK (trend IN ('up', 'down', 'stable'))
);

-- 인덱스
CREATE INDEX idx_category ON memberships(category);
CREATE INDEX idx_active_display ON memberships(active_flag, display_flag);
CREATE INDEX idx_category_rank ON memberships(category, rank);

-- 카테고리별 rank 중복 방지 (1~5 중복 불가)
CREATE UNIQUE INDEX idx_unique_category_rank
ON memberships (category, rank)
WHERE rank IS NOT NULL;

-- Rank 관리 Trigger: 새로운 rank 할당 시 기존 rank를 NULL로 변경
CREATE OR REPLACE FUNCTION manage_rank()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.rank IS NOT NULL THEN
    UPDATE public.memberships
    SET rank = NULL, updated_at = NOW()
    WHERE category = NEW.category
      AND rank = NEW.rank
      AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_manage_rank
BEFORE INSERT OR UPDATE OF rank ON memberships
FOR EACH ROW
EXECUTE FUNCTION manage_rank();


-- 2. priceDB (price_history) - 가격 히스토리 테이블
-- ============================================
CREATE TABLE price_history (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- 참조 정보
  category VARCHAR(20),  -- c_id로부터 자동 입력
  c_id INTEGER NOT NULL,

  -- 가격 정보
  date DATE NOT NULL,
  price INTEGER NOT NULL,

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- 제약조건
  CONSTRAINT fk_price_membership
    FOREIGN KEY (c_id) REFERENCES memberships(id) ON DELETE RESTRICT,
  CONSTRAINT chk_price_category CHECK (category IN ('golf', 'condo', 'fitness')),

  -- 하루에 하나의 가격만
  UNIQUE (c_id, date)
);

-- 인덱스
CREATE INDEX idx_price_c_id_date ON price_history(c_id, date DESC);
CREATE INDEX idx_price_category_date ON price_history(category, date DESC);

-- Category 자동 입력 Trigger
CREATE OR REPLACE FUNCTION auto_fill_price_category()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM memberships
    WHERE id = NEW.c_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_fill_price_category
BEFORE INSERT OR UPDATE ON price_history
FOR EACH ROW
EXECUTE FUNCTION auto_fill_price_category();

-- 가격 변동 자동 동기화 Trigger
CREATE OR REPLACE FUNCTION sync_membership_price()
RETURNS TRIGGER AS $$
DECLARE
  latest_price INTEGER;
  previous_price INTEGER;
  change_val INTEGER;
  change_pct DECIMAL(5,2);
  new_trend VARCHAR(10);
BEGIN
  -- 가장 최근 날짜의 가격 조회 (방금 INSERT된 레코드 포함)
  SELECT price INTO latest_price
  FROM price_history
  WHERE c_id = NEW.c_id
  ORDER BY date DESC, id DESC
  LIMIT 1;

  -- 바로 이전 날짜의 가격 조회 (최근 2번째)
  SELECT price INTO previous_price
  FROM price_history
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
  UPDATE memberships
  SET
    current_price = latest_price,
    change_value = change_val,
    change_percent = change_pct,
    trend = new_trend,
    updated_at = NOW()
  WHERE id = NEW.c_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_sync_price
AFTER INSERT ON price_history
FOR EACH ROW
EXECUTE FUNCTION sync_membership_price();


-- 3. urgentDB (urgent_sales) - 급매 테이블
-- ============================================
CREATE TABLE urgent_sales (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- 참조 정보
  category VARCHAR(20),                    -- c_id로부터 자동 입력
  c_id INTEGER NOT NULL,

  -- 가격 정보
  original_price INTEGER,                  -- c_id로부터 current_price 자동 입력
  urgent_price INTEGER,                    -- original_price로부터 자동 입력

  -- 상태 관리
  status VARCHAR(20) DEFAULT 'available',
  display_flag BOOLEAN DEFAULT false,      -- 메인 페이지 급매정보 섹션 노출 여부

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- 제약조건
  CONSTRAINT fk_urgent_membership
    FOREIGN KEY (c_id) REFERENCES memberships(id) ON DELETE RESTRICT,
  CONSTRAINT chk_urgent_category CHECK (category IN ('golf', 'condo', 'fitness')),
  CONSTRAINT chk_urgent_status CHECK (status IN ('available', 'sold_out'))
);

-- 인덱스
CREATE INDEX idx_urgent_category_display ON urgent_sales(category, display_flag);
CREATE INDEX idx_urgent_c_id ON urgent_sales(c_id);

-- Category, Original Price, Urgent Price 자동 입력 Trigger
CREATE OR REPLACE FUNCTION auto_fill_urgent_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- category 자동 입력
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- original_price 자동 입력 (current_price 참조)
  IF NEW.original_price IS NULL THEN
    SELECT current_price INTO NEW.original_price
    FROM memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- urgent_price 자동 입력 (original_price와 동일)
  IF NEW.urgent_price IS NULL THEN
    NEW.urgent_price := NEW.original_price;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_fill_urgent_fields
BEFORE INSERT OR UPDATE ON urgent_sales
FOR EACH ROW
EXECUTE FUNCTION auto_fill_urgent_fields();


-- 4. presaleDB (presales) - 분양 테이블
-- ============================================
CREATE TABLE presales (
  -- Primary Key
  id SERIAL PRIMARY KEY,

  -- 참조 정보
  category VARCHAR(20),                    -- c_id로부터 자동 입력
  c_id INTEGER NOT NULL,

  -- 가격 정보
  original_price INTEGER,                  -- c_id로부터 current_price 자동 입력
  presale_price INTEGER,                   -- original_price로부터 자동 입력

  -- 상태 관리
  status VARCHAR(20) DEFAULT 'available',
  display_flag BOOLEAN DEFAULT false,      -- 메인 페이지 분양정보 섹션 노출 여부

  -- 타임스탬프
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- 제약조건
  CONSTRAINT fk_presale_membership
    FOREIGN KEY (c_id) REFERENCES memberships(id) ON DELETE RESTRICT,
  CONSTRAINT chk_presale_category CHECK (category IN ('golf', 'condo', 'fitness')),
  CONSTRAINT chk_presale_status CHECK (status IN ('available', 'sold_out'))
);

-- 인덱스
CREATE INDEX idx_presale_category_display ON presales(category, display_flag);
CREATE INDEX idx_presale_c_id ON presales(c_id);

-- Category, Original Price, Presale Price 자동 입력 Trigger
CREATE OR REPLACE FUNCTION auto_fill_presale_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- category 자동 입력
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- original_price 자동 입력 (current_price 참조)
  IF NEW.original_price IS NULL THEN
    SELECT current_price INTO NEW.original_price
    FROM memberships
    WHERE id = NEW.c_id;
  END IF;
  
  -- presale_price 자동 입력 (original_price와 동일)
  IF NEW.presale_price IS NULL THEN
    NEW.presale_price := NEW.original_price;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_fill_presale_fields
BEFORE INSERT OR UPDATE ON presales
FOR EACH ROW
EXECUTE FUNCTION auto_fill_presale_fields();
