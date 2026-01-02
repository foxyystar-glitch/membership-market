# 회원권마켓 데이터베이스 구축 완료 ✅

## 📋 생성된 테이블 (4개)

### 1. memberships (mainDB)
- **역할**: 회원권 마스터 테이블
- **중복 허용**: ❌
- **필수 입력**: category, product_name, membership_name, location

### 2. price_history (priceDB)
- **역할**: 가격 히스토리 관리
- **중복 허용**: ✅ (날짜별)
- **필수 입력**: c_id, date, price
- **자동 입력**: category (c_id로부터 자동)
- **자동 기능**: mainDB의 current_price, change_percent, trend 자동 업데이트

### 3. urgent_sales (urgentDB)
- **역할**: 급매 관리
- **중복 허용**: ✅
- **필수 입력**: c_id
- **선택 입력**: urgent_price (입력하지 않으면 현재가와 동일하게 설정)
- **자동 입력**: category, original_price, urgent_price (c_id로부터 자동)

### 4. presales (presaleDB)
- **역할**: 분양 관리
- **중복 허용**: ✅
- **필수 입력**: c_id
- **선택 입력**: presale_price (입력하지 않으면 현재가와 동일하게 설정)
- **자동 입력**: category, original_price, presale_price (c_id로부터 자동)

---

## 🎯 주요 기능

### ✅ Rank 자동 관리
- 카테고리별로 rank 1~5는 하나씩만 존재
- 새로운 rank 할당 시 기존 rank 자동으로 NULL 처리

### ✅ 가격 자동 동기화
- priceDB에 가격 INSERT 시 mainDB 자동 업데이트
- 전날 대비 변동률, 변동 금액, 트렌드 자동 계산

### ✅ 활성화/비활성화 관리
- **active_flag**: 상품 전체 활성화/비활성화
- **display_flag**: 메인 페이지 해당 섹션 노출 여부
  - memberships: 시세표 섹션
  - urgent_sales: 급매정보 섹션
  - presales: 분양정보 섹션

### ✅ 데이터 무결성
- Foreign Key로 참조 무결성 보장
- ON DELETE RESTRICT: 참조 중인 데이터 삭제 방지

---

## 📁 생성된 파일

```
database/
├── schema.sql              # 테이블 스키마 (실행 완료 ✅)
├── INTEGRATION_GUIDE.md    # DB 연동 가이드
├── DATA_FORMAT.md          # 데이터셋 제공 형식
└── README.md               # 이 파일
```

---

## 🚀 다음 단계

### 1. 데이터 준비
다음 형식 중 하나로 데이터 제공:
- **CSV 형식** (추천 ⭐)
- JSON 형식
- SQL INSERT 문

필요한 파일:
- `mainDB_data.csv` - 회원권 마스터 (category, name, location)
- `priceDB_data.csv` - 가격 히스토리 (c_id, date, price)
- `urgentDB_data.csv` - 급매 (c_id, urgent_price 선택)
- `presaleDB_data.csv` - 분양 (c_id, presale_price 선택)

자세한 형식은 `DATA_FORMAT.md` 참조

### 2. 백엔드 API 구현
- Node.js/Express 또는 다른 백엔드 프레임워크
- 각 테이블에 대한 CRUD API
- snake_case → camelCase 변환
- status 한글 매핑 ('available' → '거래가능')

### 3. 프론트엔드 연동
- 하드코딩된 데이터를 API 호출로 변경
- `INTEGRATION_GUIDE.md`의 쿼리 예시 참조

---

## 🔧 데이터베이스 접속 정보

```bash
# 데이터베이스명
membership_market

# 접속 (PostgreSQL)
sudo -u postgres psql -d membership_market

# 테이블 확인
\dt

# 특정 테이블 구조 확인
\d memberships
\d price_history
\d urgent_sales
\d presales
```

---

## 📊 현재 상태

✅ PostgreSQL 서비스 실행 중
✅ membership_market 데이터베이스 생성 완료
✅ 4개 테이블 생성 완료
✅ 인덱스 및 제약조건 설정 완료
✅ Trigger 2개 생성 완료
⏳ 데이터 입력 대기 중

---

## ⚠️ 주의사항

1. **데이터 입력 순서 준수**
   - mainDB → priceDB → urgentDB/presaleDB

2. **category 값**
   - 정확히 'golf', 'condo', 'fitness' 사용 (한글 ❌)

3. **c_id 참조**
   - memberships에 존재하는 id만 사용

4. **가격 단위**
   - 만원 단위 숫자 (콤마 없이)

5. **날짜 형식**
   - 'YYYY-MM-DD' (예: 2025-12-22)
