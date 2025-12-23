# 데이터셋 제공 가이드

## 📝 각 DB별 필수 입력 항목

### 1. mainDB (memberships)

**필수 항목:**
```
- category: 'golf', 'condo', 'fitness' 중 하나
- name: 회원권명
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
- category: 'golf', 'condo', 'fitness' 중 하나
- c_id: memberships 테이블의 id
- date: 시세 적용일 (YYYY-MM-DD)
- price: 가격 (만원 단위)
```

**자동 설정:**
```
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
- mainDB의 current_price, change_value, change_percent, trend 자동 업데이트 (Trigger)
```

---

### 3. urgentDB (urgent_sales)

**필수 항목:**
```
- category: 'golf', 'condo', 'fitness' 중 하나
- c_id: memberships 테이블의 id
- original_price: 원가 (만원 단위)
- urgent_price: 급매가 (만원 단위)
```

**선택 항목 (자동 설정됨):**
```
- status: 'available' (자동)
- display_flag: false (자동)
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
```

**관리자가 수동 설정:**
```
- status: 'available' 또는 'sold_out'
- display_flag: true/false (메인 페이지 급매정보 섹션 노출)
```

---

### 4. presaleDB (presales)

**필수 항목:**
```
- category: 'golf', 'condo', 'fitness' 중 하나
- c_id: memberships 테이블의 id
- original_price: 원가 (만원 단위)
- presale_price: 분양가 (만원 단위)
```

**선택 항목 (자동 설정됨):**
```
- status: 'available' (자동)
- display_flag: false (자동)
- created_at: NOW() (자동)
- updated_at: NOW() (자동)
```

**관리자가 수동 설정:**
```
- status: 'available' 또는 'sold_out'
- display_flag: true/false (메인 페이지 분양정보 섹션 노출)
```

---

## 📊 데이터셋 제공 형식

### 형식 1: CSV (추천) ✅

**mainDB_data.csv**
```csv
category,name,location
golf,○○컨트리클럽,경기 용인
golf,△△골프장,경기 이천
golf,□□레이크CC,강원 평창
condo,○○콘도,제주 서귀포
condo,△△리조트,강원 속초
fitness,○○휘트니스,서울 강남
fitness,△△스포츠센터,서울 송파
```

**priceDB_data.csv**
```csv
c_id,category,date,price
1,golf,2025-12-20,45000
1,golf,2025-12-21,44000
1,golf,2025-12-22,45000
2,golf,2025-12-22,38500
3,golf,2025-12-22,52000
```

**urgentDB_data.csv**
```csv
c_id,category,original_price,urgent_price
1,golf,45000,42000
3,golf,52000,48000
5,golf,47800,44500
```

**presaleDB_data.csv**
```csv
c_id,category,original_price,presale_price
1,golf,45000,55000
2,golf,38500,48000
4,golf,41200,51000
```

---

### 형식 2: JSON

**mainDB_data.json**
```json
[
  {
    "category": "golf",
    "name": "○○컨트리클럽",
    "location": "경기 용인"
  },
  {
    "category": "golf",
    "name": "△△골프장",
    "location": "경기 이천"
  }
]
```

**priceDB_data.json**
```json
[
  {
    "c_id": 1,
    "category": "golf",
    "date": "2025-12-22",
    "price": 45000
  },
  {
    "c_id": 2,
    "category": "golf",
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
    "category": "golf",
    "original_price": 45000,
    "urgent_price": 42000
  }
]
```

**presaleDB_data.json**
```json
[
  {
    "c_id": 1,
    "category": "golf",
    "original_price": 45000,
    "presale_price": 55000
  }
]
```

---

### 형식 3: SQL INSERT 문

**mainDB_data.sql**
```sql
INSERT INTO memberships (category, name, location) VALUES
('golf', '○○컨트리클럽', '경기 용인'),
('golf', '△△골프장', '경기 이천'),
('golf', '□□레이크CC', '강원 평창'),
('condo', '○○콘도', '제주 서귀포'),
('condo', '△△리조트', '강원 속초'),
('fitness', '○○휘트니스', '서울 강남');
```

**priceDB_data.sql**
```sql
INSERT INTO price_history (c_id, category, date, price) VALUES
(1, 'golf', '2025-12-22', 45000),
(2, 'golf', '2025-12-22', 38500),
(3, 'golf', '2025-12-22', 52000);
```

**urgentDB_data.sql**
```sql
INSERT INTO urgent_sales (c_id, category, original_price, urgent_price) VALUES
(1, 'golf', 45000, 42000),
(3, 'golf', 52000, 48000),
(5, 'golf', 47800, 44500);
```

**presaleDB_data.sql**
```sql
INSERT INTO presales (c_id, category, original_price, presale_price) VALUES
(1, 'golf', 45000, 55000),
(2, 'golf', 38500, 48000),
(4, 'golf', 41200, 51000);
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
- category는 정확히 'golf', 'condo', 'fitness' 중 하나
- price는 만원 단위 숫자 (콤마 없이)
- date는 'YYYY-MM-DD' 형식
- c_id는 memberships 테이블에 실제 존재하는 id

### ❌ DON'T (이렇게 하지 마세요)
- category에 '골프', '콘도' 같은 한글 입력
- price에 "45,000" 같은 문자열 (45000으로 입력)
- 존재하지 않는 c_id 참조
- date를 '2025/12/22' 형식으로 입력 (하이픈 사용)

---

## 💡 추천: CSV 형식으로 제공

**가장 간단하고 처리하기 쉬운 형식입니다.**

각 테이블마다:
- `mainDB_data.csv`
- `priceDB_data.csv`
- `urgentDB_data.csv`
- `presaleDB_data.csv`

4개 파일로 제공해주시면 됩니다! 👍
