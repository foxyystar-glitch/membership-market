-- ============================================
-- 각 카테고리별 최상위 5개 항목 설정
-- ============================================
-- display_flag를 true로 설정하고 rank를 1~5로 지정
-- 이 항목들은 메인 페이지 시세표 섹션에 노출됩니다

-- Golf 카테고리 최상위 5개 (ID 1-5)
UPDATE memberships SET display_flag = true, rank = 1, updated_at = NOW() WHERE id = 1;   -- 88 - 일반
UPDATE memberships SET display_flag = true, rank = 2, updated_at = NOW() WHERE id = 2;   -- 가야 - 일반
UPDATE memberships SET display_flag = true, rank = 3, updated_at = NOW() WHERE id = 3;   -- 가야 - 우대
UPDATE memberships SET display_flag = true, rank = 4, updated_at = NOW() WHERE id = 4;   -- 가평베네스트 - 일반
UPDATE memberships SET display_flag = true, rank = 5, updated_at = NOW() WHERE id = 5;   -- 강남300 - 일반

-- Condo 카테고리 최상위 5개 (ID 287-291)
UPDATE memberships SET display_flag = true, rank = 1, updated_at = NOW() WHERE id = 287; -- 골드훼미리 - 25
UPDATE memberships SET display_flag = true, rank = 2, updated_at = NOW() WHERE id = 288; -- 골드훼미리 - 30
UPDATE memberships SET display_flag = true, rank = 3, updated_at = NOW() WHERE id = 289; -- 금호 - 16
UPDATE memberships SET display_flag = true, rank = 4, updated_at = NOW() WHERE id = 290; -- 금호 - 27
UPDATE memberships SET display_flag = true, rank = 5, updated_at = NOW() WHERE id = 291; -- 금호 - 60

-- Fitness 카테고리 최상위 5개 (ID 364-368)
UPDATE memberships SET display_flag = true, rank = 1, updated_at = NOW() WHERE id = 364; -- 그랜드앰배서더 서울 - 개인
UPDATE memberships SET display_flag = true, rank = 2, updated_at = NOW() WHERE id = 365; -- 그랜드앰배서더 서울 - 부부
UPDATE memberships SET display_flag = true, rank = 3, updated_at = NOW() WHERE id = 366; -- 그랜드 인터컨티넨탈 - 개인
UPDATE memberships SET display_flag = true, rank = 4, updated_at = NOW() WHERE id = 367; -- 그랜드 인터컨티넨탈 - 부부
UPDATE memberships SET display_flag = true, rank = 5, updated_at = NOW() WHERE id = 368; -- 노보텔앰버서더 강남 - 개인

-- ============================================
-- presales 테이블에 해당 항목 추가
-- ============================================
-- category, original_price, presale_price는 trigger에 의해 자동 입력됩니다

-- Golf 분양권 (ID 1-5)
INSERT INTO presales (c_id) VALUES (1), (2), (3), (4), (5);

-- Condo 분양권 (ID 287-291)
INSERT INTO presales (c_id) VALUES (287), (288), (289), (290), (291);

-- Fitness 분양권 (ID 364-368)
INSERT INTO presales (c_id) VALUES (364), (365), (366), (367), (368);

-- 모든 presales의 display_flag를 TRUE로 설정
UPDATE presales SET display_flag = true, updated_at = NOW();

-- ============================================
-- urgent_sales 테이블에 해당 항목 추가
-- ============================================
-- category, original_price, urgent_price는 trigger에 의해 자동 입력됩니다

-- Golf 급매 (ID 1-5)
INSERT INTO urgent_sales (c_id) VALUES (1), (2), (3), (4), (5);

-- Condo 급매 (ID 287-291)
INSERT INTO urgent_sales (c_id) VALUES (287), (288), (289), (290), (291);

-- Fitness 급매 (ID 364-368)
INSERT INTO urgent_sales (c_id) VALUES (364), (365), (366), (367), (368);

-- 모든 urgent_sales의 display_flag를 TRUE로 설정
UPDATE urgent_sales SET display_flag = true, updated_at = NOW();

