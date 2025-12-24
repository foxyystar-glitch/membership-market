-- ============================================
-- 더미 데이터 생성
-- ============================================

-- 1. mainDB (memberships) - 각 카테고리별 20개 (총 60개)
-- ============================================

-- 골프 (20개)
INSERT INTO memberships (category, name, location) VALUES
('golf', '○○컨트리클럽', '경기 용인'),
('golf', '△△골프장', '경기 이천'),
('golf', '□□레이크CC', '강원 평창'),
('golf', '◇◇밸리', '경기 가평'),
('golf', '☆☆오션뷰CC', '부산 기장'),
('golf', '▽▽마운틴CC', '강원 홍천'),
('golf', '▷▷힐스CC', '경기 여주'),
('golf', '◁◁파크CC', '충북 제천'),
('golf', '♤♤포레스트CC', '경북 포항'),
('golf', '♧♧그린CC', '전남 여수'),
('golf', '★★스카이CC', '제주 서귀포'),
('golf', '◈◈리버사이드CC', '충남 천안'),
('golf', '●●레전드CC', '전북 전주'),
('golf', '◐◐선샤인CC', '강원 원주'),
('golf', '▣▣블루오션CC', '경남 거제'),
('golf', '■■로얄CC', '경기 파주'),
('golf', '◎◎프리미엄CC', '경기 안성'),
('golf', '◉◉챔피언CC', '충북 청주'),
('golf', '▲▲골든힐CC', '경북 경주'),
('golf', '▼▼실버레이크CC', '전남 목포');

-- 콘도 (20개)
INSERT INTO memberships (category, name, location) VALUES
('condo', '○○콘도', '제주 서귀포'),
('condo', '△△리조트', '강원 속초'),
('condo', '□□타운', '경북 경주'),
('condo', '◇◇빌리지', '전남 여수'),
('condo', '☆☆힐스테이', '충남 보령'),
('condo', '▽▽스파리조트', '강원 평창'),
('condo', '▷▷비치콘도', '부산 해운대'),
('condo', '◁◁마리나', '인천 영종도'),
('condo', '♤♤레이크뷰', '경기 가평'),
('condo', '♧♧힐링스테이', '전북 무주'),
('condo', '★★오션뷰콘도', '강원 양양'),
('condo', '◈◈밸리리조트', '강원 홍천'),
('condo', '●●파크콘도', '충북 제천'),
('condo', '◐◐마운틴리조트', '경북 안동'),
('condo', '▣▣시사이드콘도', '부산 기장'),
('condo', '■■레이크사이드', '경기 남양주'),
('condo', '◎◎포레스트빌', '충남 태안'),
('condo', '◉◉그린힐콘도', '전남 순천'),
('condo', '▲▲스노우리조트', '강원 정선'),
('condo', '▼▼선셋비치', '제주 애월');

-- 피트니스 (20개)
INSERT INTO memberships (category, name, location) VALUES
('fitness', '○○휘트니스', '서울 강남'),
('fitness', '△△스포츠센터', '서울 송파'),
('fitness', '□□헬스클럽', '서울 서초'),
('fitness', '◇◇PT센터', '경기 분당'),
('fitness', '☆☆애슬레틱', '서울 역삼'),
('fitness', '▽▽파워짐', '인천 송도'),
('fitness', '▷▷바디짐', '서울 잠실'),
('fitness', '◁◁피지컬센터', '경기 수원'),
('fitness', '♤♤스트롱짐', '부산 해운대'),
('fitness', '♧♧웰니스센터', '대구 수성'),
('fitness', '★★프리미엄짐', '서울 삼성'),
('fitness', '◈◈크로스핏박스', '경기 판교'),
('fitness', '●●요가필라테스', '서울 강북'),
('fitness', '◐◐퍼스널트레이닝', '인천 부평'),
('fitness', '▣▣스포츠클럽', '대전 유성'),
('fitness', '■■바디빌딩짐', '광주 서구'),
('fitness', '◎◎애슬릿센터', '울산 남구'),
('fitness', '◉◉머슬팩토리', '경기 고양'),
('fitness', '▲▲헬스앤피트니스', '서울 마포'),
('fitness', '▼▼트레이닝센터', '경기 성남');


-- 2. priceDB (price_history) - 각 회원권마다 최근 가격 1개씩
-- ============================================

-- 골프 가격 (id 1~20)
INSERT INTO price_history (c_id, category, date, price) VALUES
(1, 'golf', '2025-12-22', 45000),
(2, 'golf', '2025-12-22', 38500),
(3, 'golf', '2025-12-22', 52000),
(4, 'golf', '2025-12-22', 41200),
(5, 'golf', '2025-12-22', 47800),
(6, 'golf', '2025-12-22', 39800),
(7, 'golf', '2025-12-22', 54500),
(8, 'golf', '2025-12-22', 43200),
(9, 'golf', '2025-12-22', 36900),
(10, 'golf', '2025-12-22', 49500),
(11, 'golf', '2025-12-22', 60000),
(12, 'golf', '2025-12-22', 42000),
(13, 'golf', '2025-12-22', 48000),
(14, 'golf', '2025-12-22', 44500),
(15, 'golf', '2025-12-22', 51000),
(16, 'golf', '2025-12-22', 46000),
(17, 'golf', '2025-12-22', 50000),
(18, 'golf', '2025-12-22', 47000),
(19, 'golf', '2025-12-22', 53000),
(20, 'golf', '2025-12-22', 40000);

-- 콘도 가격 (id 21~40)
INSERT INTO price_history (c_id, category, date, price) VALUES
(21, 'condo', '2025-12-22', 12000),
(22, 'condo', '2025-12-22', 15800),
(23, 'condo', '2025-12-22', 9500),
(24, 'condo', '2025-12-22', 11200),
(25, 'condo', '2025-12-22', 13500),
(26, 'condo', '2025-12-22', 16200),
(27, 'condo', '2025-12-22', 14800),
(28, 'condo', '2025-12-22', 10800),
(29, 'condo', '2025-12-22', 13200),
(30, 'condo', '2025-12-22', 11900),
(31, 'condo', '2025-12-22', 19500),
(32, 'condo', '2025-12-22', 14000),
(33, 'condo', '2025-12-22', 16500),
(34, 'condo', '2025-12-22', 13800),
(35, 'condo', '2025-12-22', 17200),
(36, 'condo', '2025-12-22', 15000),
(37, 'condo', '2025-12-22', 14200),
(38, 'condo', '2025-12-22', 15500),
(39, 'condo', '2025-12-22', 18000),
(40, 'condo', '2025-12-22', 12500);

-- 피트니스 가격 (id 41~60)
INSERT INTO price_history (c_id, category, date, price) VALUES
(41, 'fitness', '2025-12-22', 3200),
(42, 'fitness', '2025-12-22', 2800),
(43, 'fitness', '2025-12-22', 4100),
(44, 'fitness', '2025-12-22', 3600),
(45, 'fitness', '2025-12-22', 3900),
(46, 'fitness', '2025-12-22', 3400),
(47, 'fitness', '2025-12-22', 4500),
(48, 'fitness', '2025-12-22', 3100),
(49, 'fitness', '2025-12-22', 3750),
(50, 'fitness', '2025-12-22', 4200),
(51, 'fitness', '2025-12-22', 4800),
(52, 'fitness', '2025-12-22', 3500),
(53, 'fitness', '2025-12-22', 3300),
(54, 'fitness', '2025-12-22', 4000),
(55, 'fitness', '2025-12-22', 3700),
(56, 'fitness', '2025-12-22', 4400),
(57, 'fitness', '2025-12-22', 3800),
(58, 'fitness', '2025-12-22', 4300),
(59, 'fitness', '2025-12-22', 4600),
(60, 'fitness', '2025-12-22', 3900);


-- 3. urgentDB (urgent_sales) - 각 카테고리별 10개
-- ============================================

-- 골프 급매 (10개)
INSERT INTO urgent_sales (c_id, category, original_price, urgent_price, status, display_flag) VALUES
(1, 'golf', 45000, 42000, 'available', true),
(3, 'golf', 52000, 48000, 'available', true),
(5, 'golf', 47800, 44500, 'sold_out', false),
(6, 'golf', 39800, 36500, 'available', true),
(7, 'golf', 54500, 50000, 'available', false),
(8, 'golf', 43200, 39800, 'sold_out', false),
(9, 'golf', 36900, 33500, 'available', false),
(10, 'golf', 49500, 45500, 'available', false),
(2, 'golf', 38500, 35200, 'sold_out', false),
(4, 'golf', 41200, 38000, 'available', false);

-- 콘도 급매 (10개)
INSERT INTO urgent_sales (c_id, category, original_price, urgent_price, status, display_flag) VALUES
(21, 'condo', 12000, 10500, 'available', true),
(22, 'condo', 15800, 14000, 'available', true),
(25, 'condo', 13500, 12000, 'sold_out', false),
(26, 'condo', 16200, 14500, 'available', true),
(27, 'condo', 14800, 13200, 'available', false),
(28, 'condo', 10800, 9800, 'sold_out', false),
(29, 'condo', 13200, 11800, 'available', false),
(30, 'condo', 11900, 10700, 'available', false),
(23, 'condo', 9500, 8500, 'sold_out', false),
(24, 'condo', 11200, 10000, 'available', false);

-- 피트니스 급매 (10개)
INSERT INTO urgent_sales (c_id, category, original_price, urgent_price, status, display_flag) VALUES
(41, 'fitness', 3200, 2800, 'available', true),
(43, 'fitness', 4100, 3700, 'available', true),
(45, 'fitness', 3900, 3400, 'sold_out', false),
(46, 'fitness', 3400, 3000, 'available', true),
(47, 'fitness', 4500, 4000, 'available', false),
(48, 'fitness', 3100, 2800, 'sold_out', false),
(49, 'fitness', 3750, 3300, 'available', false),
(50, 'fitness', 4200, 3800, 'available', false),
(42, 'fitness', 2800, 2500, 'sold_out', false),
(44, 'fitness', 3600, 3200, 'available', false);


-- 4. presaleDB (presales) - 각 카테고리별 10개
-- ============================================

-- 골프 분양 (10개)
INSERT INTO presales (c_id, category, original_price, presale_price, status, display_flag) VALUES
(1, 'golf', 45000, 55000, 'available', true),
(2, 'golf', 38500, 48000, 'available', true),
(3, 'golf', 52000, 42000, 'sold_out', false),
(4, 'golf', 41200, 51000, 'available', true),
(5, 'golf', 47800, 58000, 'available', true),
(6, 'golf', 39800, 46000, 'sold_out', false),
(7, 'golf', 54500, 52000, 'available', false),
(8, 'golf', 43200, 49000, 'available', false),
(9, 'golf', 36900, 54000, 'sold_out', false),
(10, 'golf', 49500, 60000, 'available', false);

-- 콘도 분양 (10개)
INSERT INTO presales (c_id, category, original_price, presale_price, status, display_flag) VALUES
(21, 'condo', 12000, 18000, 'available', true),
(22, 'condo', 15800, 15500, 'available', true),
(23, 'condo', 9500, 16800, 'sold_out', false),
(24, 'condo', 11200, 14200, 'available', true),
(25, 'condo', 13500, 19500, 'available', true),
(26, 'condo', 16200, 13800, 'sold_out', false),
(27, 'condo', 14800, 17200, 'available', false),
(28, 'condo', 10800, 15000, 'available', false),
(29, 'condo', 13200, 16500, 'sold_out', false),
(30, 'condo', 11900, 14800, 'available', false);

-- 피트니스 분양 (10개)
INSERT INTO presales (c_id, category, original_price, presale_price, status, display_flag) VALUES
(41, 'fitness', 3200, 4500, 'available', true),
(42, 'fitness', 2800, 3800, 'available', true),
(43, 'fitness', 4100, 3200, 'sold_out', false),
(44, 'fitness', 3600, 4100, 'available', true),
(45, 'fitness', 3900, 4800, 'available', false),
(46, 'fitness', 3400, 3500, 'sold_out', false),
(47, 'fitness', 4500, 4200, 'available', false),
(48, 'fitness', 3100, 3900, 'available', false),
(49, 'fitness', 3750, 4600, 'sold_out', false),
(50, 'fitness', 4200, 3700, 'available', false);


-- 5. rank 설정 (각 카테고리 TOP 5)
-- ============================================

-- 골프 TOP 5
UPDATE memberships SET rank = 1 WHERE id = 1;
UPDATE memberships SET rank = 2 WHERE id = 3;
UPDATE memberships SET rank = 3 WHERE id = 5;
UPDATE memberships SET rank = 4 WHERE id = 8;
UPDATE memberships SET rank = 5 WHERE id = 2;

-- 콘도 TOP 5
UPDATE memberships SET rank = 1 WHERE id = 21;
UPDATE memberships SET rank = 2 WHERE id = 22;
UPDATE memberships SET rank = 3 WHERE id = 25;
UPDATE memberships SET rank = 4 WHERE id = 27;
UPDATE memberships SET rank = 5 WHERE id = 23;

-- 피트니스 TOP 5
UPDATE memberships SET rank = 1 WHERE id = 43;
UPDATE memberships SET rank = 2 WHERE id = 41;
UPDATE memberships SET rank = 3 WHERE id = 44;
UPDATE memberships SET rank = 4 WHERE id = 46;
UPDATE memberships SET rank = 5 WHERE id = 42;


-- 6. display_flag 설정 (메인 페이지 시세표 섹션용)
-- ============================================

-- 골프 시세표 노출 (5개)
UPDATE memberships SET display_flag = true WHERE id IN (1, 2, 3, 4, 5);

-- 콘도 시세표 노출 (5개)
UPDATE memberships SET display_flag = true WHERE id IN (21, 22, 23, 24, 25);

-- 피트니스 시세표 노출 (5개)
UPDATE memberships SET display_flag = true WHERE id IN (41, 42, 43, 44, 45);
