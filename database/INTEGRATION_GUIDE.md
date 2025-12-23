# DB 연동 가이드

## 📋 예상 문제점 및 해결 방법

### 1. ✅ Status 값 불일치 → 프론트엔드 매핑

**DB 스키마:**
```sql
status: 'available', 'sold_out'
```

**프론트엔드 매핑:**
```javascript
// 급매 페이지 (UrgentSalePage.jsx)
const urgentStatusLabel = {
  available: '거래가능',
  sold_out: '거래완료'
};

// 사용
<div>{urgentStatusLabel[property.status]}</div>

// 분양 페이지 (PresalePage.jsx)
const presaleStatusLabel = {
  available: '분양가능',
  sold_out: '분양완료'
};

// 사용
<div>{presaleStatusLabel[property.status]}</div>
```

---

### 2. ✅ 필드명 케이스 불일치 → API에서 변환

**DB (snake_case) → 프론트엔드 (camelCase)**

```javascript
// 백엔드 API 응답 (Node.js 예시)
const formatMembership = (row) => ({
  id: row.id,
  category: row.category,
  name: row.name,
  location: row.location,
  currentPrice: row.current_price,
  changeValue: row.change_value,
  changePercent: row.change_percent,
  trend: row.trend,
  activeFlag: row.active_flag,
  displayFlag: row.display_flag,
  rank: row.rank,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});
```

---

### 3. ✅ 가격 표시 형식 → toLocaleString() 사용

**DB에서 받은 숫자를 포맷:**
```javascript
// DB: 45000 (INTEGER)
// 화면: "45,000"

{property.currentPrice.toLocaleString()}
```

---

### 4. ✅ original_price 처리

**original_price는 데이터 저장용이며, 화면에 표시하지 않음**

급매/분양 등록 시 mainDB의 current_price를 복사해서 저장만 하고 활용하지 않음.

---

### 5. ✅ active_flag 모든 쿼리에 반영

**모든 SELECT 쿼리에 active_flag 조건 추가:**

```sql
-- ❌ 나쁜 예
SELECT * FROM memberships WHERE category = 'golf';

-- ✅ 좋은 예
SELECT * FROM memberships
WHERE category = 'golf' AND active_flag = true;

-- 급매 조회
SELECT u.*, m.name, m.location
FROM urgent_sales u
JOIN memberships m ON u.c_id = m.id
WHERE m.active_flag = true          -- 필수!
  AND u.category = 'golf';

-- 분양 조회
SELECT p.*, m.name, m.location
FROM presales p
JOIN memberships m ON p.c_id = m.id
WHERE m.active_flag = true          -- 필수!
  AND p.category = 'golf';
```

---

### 6. ✅ 할인율 계산 로직 폐기

할인율 관련 로직은 사용하지 않음. original_price는 저장만 하고 화면에 표시하지 않음.

---

## 🔍 주요 쿼리 예시

### 메인 페이지 - 시세표 섹션
```sql
SELECT id, name, current_price, change_percent, trend
FROM memberships
WHERE category = 'golf'
  AND active_flag = true
  AND display_flag = true    -- 메인 페이지 시세표 섹션 노출
ORDER BY created_at DESC
LIMIT 5;
```

### 메인 페이지 - 급매 섹션
```sql
SELECT
  u.id,
  u.urgent_price,
  u.status,
  m.name,
  m.location
FROM urgent_sales u
JOIN memberships m ON u.c_id = m.id
WHERE m.active_flag = true
  AND u.display_flag = true  -- 메인 페이지 급매정보 섹션 노출
  AND u.category = 'golf'
  AND u.status = 'available'
ORDER BY u.created_at DESC
LIMIT 3;
```

### 메인 페이지 - 분양 섹션
```sql
SELECT
  p.id,
  p.presale_price,
  p.status,
  m.name,
  m.location
FROM presales p
JOIN memberships m ON p.c_id = m.id
WHERE m.active_flag = true
  AND p.display_flag = true  -- 메인 페이지 분양정보 섹션 노출
  AND p.category = 'golf'
  AND p.status = 'available'
ORDER BY p.created_at DESC
LIMIT 4;
```

### 카테고리 페이지 - TOP 5
```sql
SELECT id, name, location, current_price, rank
FROM memberships
WHERE category = 'golf'
  AND active_flag = true
  AND rank IS NOT NULL
ORDER BY rank ASC;
```

### 급매 페이지 전체 목록
```sql
SELECT
  u.id,
  u.urgent_price,
  u.status,
  u.created_at,
  m.name,
  m.location
FROM urgent_sales u
JOIN memberships m ON u.c_id = m.id
WHERE m.active_flag = true
  AND u.category = 'golf'
ORDER BY u.created_at DESC;
```

### 분양 페이지 전체 목록
```sql
SELECT
  p.id,
  p.presale_price,
  p.status,
  p.created_at,
  m.name,
  m.location
FROM presales p
JOIN memberships m ON p.c_id = m.id
WHERE m.active_flag = true
  AND p.category = 'golf'
ORDER BY p.created_at DESC;
```

### 시세표 페이지
```sql
SELECT
  id,
  name,
  current_price,
  change_value,
  change_percent,
  trend
FROM memberships
WHERE category = 'golf'
  AND active_flag = true
ORDER BY id ASC;
```

---

## 📊 Display Flag 역할 정리

| 테이블 | display_flag 의미 |
|--------|------------------|
| **memberships** | 메인 페이지 "실시간 시세표" 섹션에 노출 여부 |
| **urgent_sales** | 메인 페이지 "급매 정보" 섹션에 노출 여부 |
| **presales** | 메인 페이지 "분양 정보" 섹션에 노출 여부 |

**참고:**
- `active_flag = false` : 상품 자체가 비활성화 (모든 페이지에서 안 보임)
- `display_flag = false` : 메인 페이지 해당 섹션에만 안 보임 (상세 페이지에는 보임)
