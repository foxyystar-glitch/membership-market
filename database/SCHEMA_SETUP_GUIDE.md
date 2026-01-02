# 스키마 설정 가이드

## ❌ 오류: "relation 'memberships' does not exist"

이 오류는 Supabase에 데이터베이스 테이블이 생성되지 않았을 때 발생합니다.

## ✅ 해결 방법

### 방법 1: Supabase Dashboard에서 직접 실행 (권장)

1. **Supabase Dashboard 접속**
   - [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - 프로젝트 선택

2. **SQL Editor 메뉴로 이동**
   - 왼쪽 메뉴에서 "SQL Editor" 클릭

3. **스키마 파일 내용 복사**
   - `database/schema.sql` 파일을 열기
   - 전체 내용 복사 (Ctrl+A → Ctrl+C)

4. **SQL Editor에 붙여넣기 및 실행**
   - SQL Editor의 새 쿼리 창에 붙여넣기
   - "Run" 버튼 클릭 또는 Ctrl+Enter
   - "Success" 메시지 확인

5. **테이블 생성 확인**
   - 왼쪽 메뉴에서 "Table Editor" 클릭
   - 다음 테이블들이 보이는지 확인:
     - ✅ memberships
     - ✅ price_history
     - ✅ urgent_sales
     - ✅ presales

### 방법 2: 기존 setup 스크립트 사용

프로젝트에 이미 스키마 설정 스크립트가 있습니다:

```bash
cd database
node setup-supabase.js
```

또는 안전 버전:

```bash
cd database
node setup-supabase-safe.js
```

## 📋 생성되는 테이블 목록

### 1. memberships (회원권 마스터 테이블)
- 골프, 콘도, 피트니스 회원권 기본 정보
- 현재 가격, 변동률 등 관리

### 2. price_history (가격 히스토리 테이블)
- 회원권별 일자별 가격 기록
- CSV 데이터가 여기에 입력됩니다

### 3. urgent_sales (급매 테이블)
- 급매 회원권 정보 관리

### 4. presales (분양 테이블)
- 분양 회원권 정보 관리

## 🔄 다음 단계

스키마 생성이 완료되면:

1. **memberships 테이블에 회원권 데이터 입력**
   - mainDB_data.csv 또는 수동으로 회원권 등록
   - price_history의 c_id는 memberships의 id를 참조합니다

2. **price_history 데이터 입력 (본 스크립트)**
   ```bash
   cd database
   node import-price-data.js
   ```

## ⚠️ 주의사항

- price_history 데이터를 입력하기 전에 **반드시** memberships 테이블에 회원권 데이터가 있어야 합니다
- c_id 값이 memberships 테이블에 존재하지 않으면 외래키 제약으로 인해 삽입이 실패합니다

## 🔍 트러블슈팅

### "permission denied" 오류
- VITE_SUPABASE_ANON_KEY가 올바른지 확인
- Supabase Dashboard에서 API Settings 확인

### "duplicate key" 오류
- 스키마가 이미 생성되어 있는 경우
- 테이블을 삭제하고 다시 생성하거나, 기존 테이블 사용

### 테이블은 있지만 데이터가 없음
```sql
-- Supabase SQL Editor에서 확인
SELECT COUNT(*) FROM memberships;
```

결과가 0이면 memberships 데이터를 먼저 입력해야 합니다.

