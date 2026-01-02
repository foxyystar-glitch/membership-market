# 데이터베이스 스키마 변경사항

## 📋 변경 개요

데이터 입력을 더 간편하게 만들기 위해 자동 입력 기능을 추가했습니다.

---

## 🔄 주요 변경사항

### 1. price_history (priceDB) 테이블

**변경 전:**
```sql
필수 입력: category, c_id, date, price
```

**변경 후:**
```sql
필수 입력: c_id, date, price
자동 입력: category (c_id로부터 자동 입력)
```

**예시:**
```sql
-- 변경 전 (category 필수)
INSERT INTO price_history (c_id, category, date, price) 
VALUES (1, 'golf', '2026-01-02', 45000);

-- 변경 후 (category 자동)
INSERT INTO price_history (c_id, date, price) 
VALUES (1, '2026-01-02', 45000);
```

---

### 2. urgent_sales (urgentDB) 테이블

**변경 전:**
```sql
필수 입력: category, c_id, original_price, urgent_price
```

**변경 후:**
```sql
필수 입력: c_id
선택 입력: urgent_price (입력하지 않으면 현재가와 동일)
자동 입력: 
  - category (c_id로부터)
  - original_price (memberships의 current_price 참조)
  - urgent_price (입력하지 않으면 original_price와 동일)
```

**예시:**
```sql
-- 변경 전 (모든 필드 필수)
INSERT INTO urgent_sales (c_id, category, original_price, urgent_price) 
VALUES (1, 'golf', 45000, 42000);

-- 변경 후 - 급매가 지정
INSERT INTO urgent_sales (c_id, urgent_price) 
VALUES (1, 42000);

-- 변경 후 - c_id만 입력 (현재가와 동일하게 설정)
INSERT INTO urgent_sales (c_id) 
VALUES (1);
```

---

### 3. presales (presaleDB) 테이블

**변경 전:**
```sql
필수 입력: category, c_id, original_price, presale_price
```

**변경 후:**
```sql
필수 입력: c_id
선택 입력: presale_price (입력하지 않으면 현재가와 동일)
자동 입력: 
  - category (c_id로부터)
  - original_price (memberships의 current_price 참조)
  - presale_price (입력하지 않으면 original_price와 동일)
```

**예시:**
```sql
-- 변경 전 (모든 필드 필수)
INSERT INTO presales (c_id, category, original_price, presale_price) 
VALUES (1, 'golf', 45000, 55000);

-- 변경 후 - 분양가 지정
INSERT INTO presales (c_id, presale_price) 
VALUES (1, 55000);

-- 변경 후 - c_id만 입력 (현재가와 동일하게 설정)
INSERT INTO presales (c_id) 
VALUES (1);
```

---

## 🔧 구현 방법

각 테이블에 **BEFORE INSERT/UPDATE 트리거**를 추가하여 자동 입력을 구현했습니다.

### 추가된 트리거:

1. **trigger_auto_fill_price_category**
   - price_history 테이블의 category 자동 입력

2. **trigger_auto_fill_urgent_fields**
   - urgent_sales 테이블의 category, original_price, urgent_price 자동 입력

3. **trigger_auto_fill_presale_fields**
   - presales 테이블의 category, original_price, presale_price 자동 입력

---

## ✅ 장점

### 1. 데이터 입력 간소화
- 필수 입력 필드가 줄어들어 입력 오류 감소
- CSV 파일 작성 시 컬럼 수 감소

### 2. 데이터 정합성 향상
- category가 자동으로 입력되어 memberships 테이블과 불일치 방지
- original_price가 자동으로 current_price를 참조하여 수동 입력 오류 방지

### 3. 유연성
- urgent_price/presale_price를 입력하지 않으면 현재가로 자동 설정
- 필요시 다른 가격을 지정할 수 있음

---

## 📊 CSV 파일 변경 예시

### priceDB_data.csv

**변경 전:**
```csv
c_id,category,date,price
1,golf,2025-12-22,45000
2,golf,2025-12-22,38500
```

**변경 후:**
```csv
c_id,date,price
1,2025-12-22,45000
2,2025-12-22,38500
```

### urgentDB_data.csv

**변경 전:**
```csv
c_id,category,original_price,urgent_price
1,golf,45000,42000
3,golf,52000,48000
```

**변경 후:**
```csv
c_id,urgent_price
1,42000
3,48000
```

또는 c_id만:
```csv
c_id
1
3
```

### presaleDB_data.csv

**변경 전:**
```csv
c_id,category,original_price,presale_price
1,golf,45000,55000
2,golf,38500,48000
```

**변경 후:**
```csv
c_id,presale_price
1,55000
2,48000
```

또는 c_id만:
```csv
c_id
1
2
```

---

## ⚠️ 주의사항

1. **기존 데이터 마이그레이션**
   - 이미 데이터가 있는 경우, 스키마 변경 전 백업 필요
   - 기존 데이터는 영향 없음 (NOT NULL 제약만 제거)

2. **memberships 테이블 선행 입력 필수**
   - price_history, urgent_sales, presales는 memberships의 id를 참조
   - memberships에 데이터가 먼저 입력되어야 함

3. **current_price 업데이트**
   - urgent_sales/presales의 original_price는 INSERT 시점의 current_price 참조
   - 이후 current_price 변경은 반영되지 않음

---

## 🔍 트리거 동작 확인

### 테스트 쿼리:

```sql
-- 1. memberships에 테스트 데이터 추가
INSERT INTO memberships (category, product_name, membership_name, location, current_price) 
VALUES ('golf', '테스트CC', '골프 회원권', '서울', 50000);

-- 2. price_history 입력 (category 자동 입력 확인)
INSERT INTO price_history (c_id, date, price) 
VALUES (1, '2026-01-02', 45000);

SELECT * FROM price_history WHERE c_id = 1;
-- 결과: category가 'golf'로 자동 입력됨

-- 3. urgent_sales 입력 (모든 필드 자동 입력 확인)
INSERT INTO urgent_sales (c_id) 
VALUES (1);

SELECT * FROM urgent_sales WHERE c_id = 1;
-- 결과: category='golf', original_price=45000, urgent_price=45000

-- 4. presales 입력 (presale_price만 지정)
INSERT INTO presales (c_id, presale_price) 
VALUES (1, 55000);

SELECT * FROM presales WHERE c_id = 1;
-- 결과: category='golf', original_price=45000, presale_price=55000
```

---

**변경일**: 2026-01-02  
**버전**: 2.0

