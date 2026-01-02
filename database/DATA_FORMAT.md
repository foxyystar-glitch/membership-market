# 데이터셋 제공 가이드

## 📝 각 DB별 필수 입력 항목

### 1. mainDB (memberships)

**필수 항목:**
```
- category: 'golf', 'condo', 'fitness' 중 하나
- product_name: 상품명 (예: 남서울컨트리클럽)
- membership_name: 회원권 종류 (예: 골프 회원권)
- location: 지역
```

**선택 항목 (자동 설정됨):**
```
- current_price: 0 (자동)
- change_value: 0 (자동)
- change_percent: 0 (자동)
- trend: 'stable' (자동)
- active_flag: true (자동)
- display_flag: false (자동)
- rank: NULL (자동)
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
```

**관리자가 수동 설정:**
```
- display_flag: true/false (메인 페이지 시세표 노출)
- rank: 1~5 또는 NULL (TOP 5 순위)
```

---

### 2. priceDB (price_history)

**필수 항목:**
```
- c_id: memberships 테이블의 id
- date: 시세 적용일 (YYYY-MM-DD)
- price: 가격 (만원 단위)
```

**자동 설정:**
```
- category: c_id로부터 자동 입력 (Trigger)
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
- mainDB의 current_price, change_value, change_percent, trend 자동 업데이트 (Trigger)
```

---

### 3. urgentDB (urgent_sales)

**필수 항목:**
```
- c_id: memberships 테이블의 id
```

**선택 항목 (수동 입력 가능):**
```
- urgent_price: 급매가 (만원 단위) - 입력하지 않으면 mainDB의 current_price와 동일하게 설정됨
```

**자동 설정:**
```
- category: c_id로부터 자동 입력 (Trigger)
- original_price: c_id로부터 mainDB의 current_price 자동 입력 (Trigger)
- urgent_price: 입력하지 않으면 original_price와 동일하게 자동 설정 (Trigger)
- status: 'available' (자동)
- display_flag: false (자동)
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
```

**관리자가 수동 설정:**
```
- urgent_price: 급매가 조정 (선택)
- status: 'available' 또는 'sold_out'
- display_flag: true/false (메인 페이지 급매정보 섹션 노출)
```

---

### 4. presaleDB (presales)

**필수 항목:**
```
- c_id: memberships 테이블의 id
```

**선택 항목 (수동 입력 가능):**
```
- presale_price: 분양가 (만원 단위) - 입력하지 않으면 mainDB의 current_price와 동일하게 설정됨
```

**자동 설정:**
```
- category: c_id로부터 자동 입력 (Trigger)
- original_price: c_id로부터 mainDB의 current_price 자동 입력 (Trigger)
- presale_price: 입력하지 않으면 original_price와 동일하게 자동 설정 (Trigger)
- status: 'available' (자동)
- display_flag: false (자동)
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
```

**관리자가 수동 설정:**
```
- presale_price: 분양가 조정 (선택)
- status: 'available' 또는 'sold_out'
- display_flag: true/false (메인 페이지 분양정보 섹션 노출)
```

---

## 📊 데이터셋 제공 형식

### 형식 1: CSV (추천) ✅

**mainDB_data.csv**
```csv
category,product_name,membership_name,location
golf,남서울컨트리클럽,골프 회원권,경기 용인
golf,레이크사이드CC,골프 회원권,경기 이천
golf,안양베네스트CC,골프 회원권,강원 평창
condo,한화리조트 설악,콘도 회원권,제주 서귀포
condo,제주 롯데리조트,콘도 회원권,강원 속초
fitness,이촌한강스포렉스,피트니스 회원권,서울 강남
fitness,타임스퀘어 휘트니스,피트니스 회원권,서울 송파
```

**priceDB_data.csv**
```csv
c_id,date,price
1,2025-12-20,45000
1,2025-12-21,44000
1,2025-12-22,45000
2,2025-12-22,38500
3,2025-12-22,52000
```

**urgentDB_data.csv**
```csv
c_id,urgent_price
1,42000
3,48000
5,44500
```
또는 c_id만 입력 (현재가와 동일한 가격으로 자동 설정):
```csv
c_id
1
3
5
```

**presaleDB_data.csv**
```csv
c_id,presale_price
1,55000
2,48000
4,51000
```
또는 c_id만 입력 (현재가와 동일한 가격으로 자동 설정):
```csv
c_id
1
2
4
```

---

### 형식 2: JSON

**mainDB_data.json**
```json
[
  {
    "category": "golf",
    "product_name": "남서울컨트리클럽",
    "membership_name": "골프 회원권",
    "location": "경기 용인"
  },
  {
    "category": "golf",
    "product_name": "레이크사이드CC",
    "membership_name": "골프 회원권",
    "location": "경기 이천"
  }
]
```

**priceDB_data.json**
```json
[
  {
    "c_id": 1,
    "date": "2025-12-22",
    "price": 45000
  },
  {
    "c_id": 2,
    "date": "2025-12-22",
    "price": 38500
  }
]
```

**urgentDB_data.json**
```json
[
  {
    "c_id": 1,
    "urgent_price": 42000
  },
  {
    "c_id": 3,
    "urgent_price": 48000
  }
]
```
또는 c_id만 입력 (현재가와 동일한 가격으로 자동 설정):
```json
[
  { "c_id": 1 },
  { "c_id": 3 }
]
```

**presaleDB_data.json**
```json
[
  {
    "c_id": 1,
    "presale_price": 55000
  },
  {
    "c_id": 2,
    "presale_price": 48000
  }
]
```
또는 c_id만 입력 (현재가와 동일한 가격으로 자동 설정):
```json
[
  { "c_id": 1 },
  { "c_id": 2 }
]
```

---

### 형식 3: SQL INSERT 문

**mainDB_data.sql**
```sql
INSERT INTO memberships (category, product_name, membership_name, location) VALUES
('golf', '남서울컨트리클럽', '골프 회원권', '경기 용인'),
('golf', '레이크사이드CC', '골프 회원권', '경기 이천'),
('golf', '안양베네스트CC', '골프 회원권', '강원 평창'),
('condo', '한화리조트 설악', '콘도 회원권', '제주 서귀포'),
('condo', '제주 롯데리조트', '콘도 회원권', '강원 속초'),
('fitness', '이촌한강스포렉스', '피트니스 회원권', '서울 강남');
```

**priceDB_data.sql**
```sql
INSERT INTO price_history (c_id, date, price) VALUES
(1, '2025-12-22', 45000),
(2, '2025-12-22', 38500),
(3, '2025-12-22', 52000);
```

**urgentDB_data.sql**
```sql
-- 급매가 지정
INSERT INTO urgent_sales (c_id, urgent_price) VALUES
(1, 42000),
(3, 48000),
(5, 44500);

-- 또는 c_id만 입력 (현재가와 동일하게 자동 설정)
INSERT INTO urgent_sales (c_id) VALUES
(1), (3), (5);
```

**presaleDB_data.sql**
```sql
-- 분양가 지정
INSERT INTO presales (c_id, presale_price) VALUES
(1, 55000),
(2, 48000),
(4, 51000);

-- 또는 c_id만 입력 (현재가와 동일하게 자동 설정)
INSERT INTO presales (c_id) VALUES
(1), (2), (4);
```

---

## 🎯 데이터 입력 순서

**중요: 반드시 이 순서대로 입력해야 합니다!**

1. **mainDB (memberships)** 먼저 입력
   - 이유: 다른 테이블들이 c_id로 memberships를 참조함

2. **priceDB (price_history)** 입력
   - 이유: mainDB의 current_price, change_percent 등이 자동 업데이트됨

3. **urgentDB (urgent_sales)** 입력
   - c_id는 memberships에 존재하는 id여야 함

4. **presaleDB (presales)** 입력
   - c_id는 memberships에 존재하는 id여야 함

---

## 📌 데이터 준비 시 주의사항

### ✅ DO (이렇게 하세요)
- CSV 형식 권장 (가장 간단하고 처리 쉬움)
- mainDB: category는 정확히 'golf', 'condo', 'fitness' 중 하나
- priceDB/urgentDB/presaleDB: category 입력 불필요 (자동 입력됨)
- price는 만원 단위 숫자 (콤마 없이)
- date는 'YYYY-MM-DD' 형식
- c_id는 memberships 테이블에 실제 존재하는 id

### ❌ DON'T (이렇게 하지 마세요)
- mainDB category에 '골프', '콘도' 같은 한글 입력
- price에 "45,000" 같은 문자열 (45000으로 입력)
- 존재하지 않는 c_id 참조
- date를 '2025/12/22' 형식으로 입력 (하이픈 사용)
- priceDB/urgentDB/presaleDB에 category 수동 입력 (자동으로 채워짐)

---

## 💡 추천: CSV 형식으로 제공

**가장 간단하고 처리하기 쉬운 형식입니다.**

각 테이블마다:
- `mainDB_data.csv`
- `priceDB_data.csv`
- `urgentDB_data.csv`
- `presaleDB_data.csv`

4개 파일로 제공해주시면 됩니다! 👍
