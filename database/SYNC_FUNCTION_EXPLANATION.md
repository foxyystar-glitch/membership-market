# sync_membership_price 함수 설명

## 📌 개요

`sync_membership_price()` 함수는 `price_history` 테이블에 새로운 가격 데이터가 추가될 때마다 자동으로 실행되어, `memberships` 테이블의 가격 관련 필드들을 업데이트하는 트리거 함수입니다.

## 🔄 동작 방식

```sql
CREATE TRIGGER trigger_sync_price
AFTER INSERT ON price_history
FOR EACH ROW
EXECUTE FUNCTION sync_membership_price();
```

- **트리거 시점**: `AFTER INSERT` - 데이터가 `price_history`에 완전히 삽입된 후 실행
- **실행 단위**: `FOR EACH ROW` - 삽입되는 각 행마다 한 번씩 실행

## 📊 계산 로직

### 1️⃣ current_price (현재 가격)

**정의**: 해당 회원권의 가장 최근 날짜의 가격

**계산 방식**:
```sql
SELECT price INTO latest_price
FROM price_history
WHERE c_id = NEW.c_id
ORDER BY date DESC, id DESC
LIMIT 1;
```

**설명**:
- `price_history`에서 해당 회원권(`c_id`)의 모든 가격 데이터 중
- 날짜(`date`)가 가장 최근인 것을 선택
- 같은 날짜가 여러 개 있다면 `id`가 가장 큰 것(가장 나중에 입력된 것) 선택

---

### 2️⃣ change_value (변동 금액)

**정의**: 가장 최근 가격과 그 바로 이전 가격의 차이 (원 단위)

**계산 방식**:
```sql
-- 바로 이전 날짜의 가격 조회
SELECT price INTO previous_price
FROM price_history
WHERE c_id = NEW.c_id
ORDER BY date DESC, id DESC
LIMIT 1 OFFSET 1;

-- 변동 금액 계산
change_val := latest_price - previous_price;
```

**설명**:
- `OFFSET 1`을 사용하여 두 번째로 최근인 가격 조회
- 최신 가격에서 이전 가격을 뺀 값
- **양수**: 가격 상승
- **음수**: 가격 하락
- **0**: 변동 없음

**예시**:
```
2025-01-01: 100,000원
2025-01-05: 105,000원 (최신)
→ change_value = 105,000 - 100,000 = +5,000원
```

---

### 3️⃣ change_percent (변동률)

**정의**: 가격 변동을 퍼센트(%)로 표현

**계산 방식**:
```sql
change_pct := (change_val::DECIMAL / previous_price) * 100;
```

**설명**:
- (변동 금액 ÷ 이전 가격) × 100
- 소수점 둘째 자리까지 표시 (`DECIMAL(5,2)`)

**예시**:
```
이전 가격: 100,000원
변동 금액: +5,000원
→ change_percent = (5,000 / 100,000) × 100 = +5.00%
```

---

### 4️⃣ trend (추세)

**정의**: 가격 변동 방향을 나타내는 상태값

**계산 방식**:
```sql
IF change_val > 0 THEN
  new_trend := 'up';      -- 상승
ELSIF change_val < 0 THEN
  new_trend := 'down';    -- 하락
ELSE
  new_trend := 'stable';  -- 보합
END IF;
```

**설명**:
- `change_value`의 부호에 따라 결정
- **'up'**: 가격 상승 (change_value > 0)
- **'down'**: 가격 하락 (change_value < 0)
- **'stable'**: 변동 없음 (change_value = 0)

---

## 🎯 특수 케이스

### 첫 번째 가격 입력

해당 회원권에 대한 첫 번째 가격 데이터인 경우:

```sql
IF previous_price IS NOT NULL THEN
  -- 정상 계산
ELSE
  -- 첫 번째 가격인 경우
  change_val := 0;
  change_pct := 0;
  new_trend := 'stable';
END IF;
```

- `change_value` = 0
- `change_percent` = 0.00
- `trend` = 'stable'
- 비교할 이전 가격이 없으므로 모두 기본값으로 설정

---

## 📝 실행 예시

### 시나리오 1: 첫 가격 입력

```sql
INSERT INTO price_history (c_id, date, price) 
VALUES (1, '2025-01-01', 100000);
```

**결과 (memberships 테이블)**:
- `current_price` = 100,000
- `change_value` = 0
- `change_percent` = 0.00
- `trend` = 'stable'

---

### 시나리오 2: 가격 상승

```sql
-- 기존: 2025-01-01, 100,000원
INSERT INTO price_history (c_id, date, price) 
VALUES (1, '2025-01-05', 105000);
```

**결과 (memberships 테이블)**:
- `current_price` = 105,000
- `change_value` = 5,000
- `change_percent` = 5.00
- `trend` = 'up'

---

### 시나리오 3: 가격 하락

```sql
-- 기존: 2025-01-05, 105,000원
INSERT INTO price_history (c_id, date, price) 
VALUES (1, '2025-01-10', 98000);
```

**결과 (memberships 테이블)**:
- `current_price` = 98,000
- `change_value` = -7,000
- `change_percent` = -6.67
- `trend` = 'down'

---

### 시나리오 4: 가격 유지

```sql
-- 기존: 2025-01-10, 98,000원
INSERT INTO price_history (c_id, date, price) 
VALUES (1, '2025-01-15', 98000);
```

**결과 (memberships 테이블)**:
- `current_price` = 98,000
- `change_value` = 0
- `change_percent` = 0.00
- `trend` = 'stable'

---

## ⚠️ 중요 참고사항

1. **날짜 기준**: 실제 달력상의 "전날"이 아니라, 데이터베이스에 저장된 **"바로 이전 날짜"** 기준
   - 예: 1월 1일 → 1월 15일로 데이터를 입력해도 정상 작동

2. **자동 실행**: 수동으로 `memberships` 테이블을 업데이트할 필요 없음
   - `price_history`에 INSERT만 하면 자동으로 계산 및 업데이트

3. **데이터 일관성**: 트리거를 통해 항상 최신 가격 정보와 정확한 변동률 유지

4. **성능**: `AFTER INSERT` 트리거이므로 대량 데이터 입력 시 각 행마다 실행됨
   - 대량 입력 시 처리 시간 고려 필요

---

## 🔧 유지보수

함수 수정이 필요한 경우:

1. **schema.sql 수정** - 기본 스키마 파일
2. **fix-trigger-search-path.sql 수정** - Supabase용 (search_path 포함)
3. 두 파일 모두 동일한 로직을 유지해야 함

---

## 📚 관련 파일

- `database/schema.sql` - 기본 함수 정의
- `database/fix-trigger-search-path.sql` - Supabase용 함수 정의
- `database/TRIGGER_FIX_GUIDE.md` - 트리거 문제 해결 가이드

