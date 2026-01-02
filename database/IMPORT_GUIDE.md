# Price Data Import Guide

## 📋 개요

public 폴더의 CSV 파일들을 Supabase의 `price_history` 테이블에 일괄 삽입하는 스크립트입니다.

## 📦 처리할 파일

1. `golf_baseData.csv` - 골프 회원권 가격 데이터
2. `condo_baseData_1.csv` - 콘도 회원권 가격 데이터 (1)
3. `condo_baseData_2.csv` - 콘도 회원권 가격 데이터 (2)
4. `fitness_baseData.csv` - 피트니스 회원권 가격 데이터

## 🔧 사전 준비

### 1. 환경 변수 설정

프로젝트 루트의 `.env` 파일에 Supabase 정보가 설정되어 있어야 합니다:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**중요:** `VITE_SUPABASE_SERVICE_ROLE_KEY`는 필수입니다!
- Supabase Dashboard → Settings → API → `service_role` (secret) 키를 복사
- 이 키는 모든 권한을 가지므로 **서버 사이드나 마이그레이션 스크립트에서만** 사용
- 절대 프론트엔드 코드나 GitHub에 노출하지 마세요!

### 2. 패키지 설치

database 폴더에서 필요한 패키지를 설치합니다:

```bash
cd database
npm install
```

필요한 패키지:
- `csv-parser` - CSV 파일 파싱
- `@supabase/supabase-js` - Supabase 클라이언트
- `dotenv` - 환경 변수 로드

## 🚀 실행 방법

### database 폴더에서 실행

```bash
cd database
node import-price-data.js
```

### 또는 프로젝트 루트에서 실행

```bash
node database/import-price-data.js
```

## 📊 처리 과정

1. **CSV 파일 읽기** - 각 CSV 파일을 순차적으로 읽습니다
2. **데이터 변환** - CSV 데이터를 `price_history` 테이블 형식으로 변환
3. **배치 삽입** - 1000개씩 배치로 나눠서 Supabase에 삽입
4. **결과 보고** - 각 파일의 처리 결과와 통계를 출력

## 📝 출력 예시

```
╔══════════════════════════════════════════════════════════╗
║     Price Data Import to Supabase (priceDB)             ║
╚══════════════════════════════════════════════════════════╝

🚀 시작 시간: 2025-01-02 10:30:00
📋 처리할 파일: 4개

============================================================
📄 파일 처리 시작: golf_baseData.csv
============================================================
   📖 CSV 파일 읽는 중...
   ✅ CSV 파일 읽기 완료: 104678개 레코드
   💾 Supabase에 데이터 삽입 중...
   📦 총 104678개 레코드를 105개 배치로 나눠서 삽입합니다...
   ✅ 배치 1/105 삽입 완료 (1000개 레코드)
   ✅ 배치 2/105 삽입 완료 (1000개 레코드)
   ...
   ✅ golf_baseData.csv 처리 완료!

============================================================
📄 파일 처리 시작: condo_baseData_1.csv
============================================================
   ...

╔══════════════════════════════════════════════════════════╗
║                    최종 결과                             ║
╚══════════════════════════════════════════════════════════╝

✅ 성공  golf_baseData.csv         - 104,678개 레코드
✅ 성공  condo_baseData_1.csv      - 3,447개 레코드
✅ 성공  condo_baseData_2.csv      - 517개 레코드
✅ 성공  fitness_baseData.csv      - 1,678개 레코드

────────────────────────────────────────────────────────────
총 처리: 4개 파일
성공: 4개
실패: 0개
총 레코드: 110,320개
소요 시간: 45.23초
────────────────────────────────────────────────────────────

🎉 모든 파일이 성공적으로 처리되었습니다!
```

## ⚙️ 설정 변경

### 배치 크기 조정

파일 상단의 `BATCH_SIZE` 상수를 변경하여 한번에 삽입할 레코드 수를 조정할 수 있습니다:

```javascript
const BATCH_SIZE = 1000; // 기본값: 1000
```

### 파일 순서 변경

`CSV_FILES` 배열의 순서를 변경하여 처리 순서를 조정할 수 있습니다.

## ⚠️ 주의사항

1. **중복 데이터**: `price_history` 테이블은 `(c_id, date)` 조합에 대해 UNIQUE 제약이 있습니다. 이미 존재하는 데이터를 다시 삽입하면 오류가 발생합니다.

2. **외래키 제약**: `c_id`는 `memberships` 테이블의 `id`를 참조합니다. 존재하지 않는 `c_id`를 삽입하면 오류가 발생합니다.

3. **대용량 데이터**: 파일이 매우 크면 시간이 오래 걸릴 수 있습니다. 배치 처리와 딜레이로 안정성을 확보했습니다.

## 🔍 트러블슈팅

### ❌ "relation 'memberships' does not exist" 오류

**원인:** Supabase에 데이터베이스 테이블이 생성되지 않았습니다.

**해결방법:**
1. `database/SCHEMA_SETUP_GUIDE.md` 파일 참고
2. Supabase Dashboard → SQL Editor에서 `database/schema.sql` 실행
3. 또는 `node database/setup-supabase.js` 실행

### ❌ "memberships 테이블에 데이터가 없습니다" 경고

**원인:** price_history는 memberships의 c_id를 참조하는데, 참조할 데이터가 없습니다.

**해결방법:**
1. 먼저 memberships 테이블에 회원권 데이터를 입력해야 합니다
2. `mainDB_data.csv` 파일을 이용하거나 수동으로 회원권 등록

### 환경 변수 오류

```
❌ 환경 변수가 설정되지 않았습니다.
   필요한 환경 변수: VITE_SUPABASE_URL, VITE_SUPABASE_SERVICE_ROLE_KEY
```

**해결방법:**
1. 프로젝트 루트의 `.env` 파일 확인
2. Supabase Dashboard → Settings → API로 이동
3. `service_role` 키 복사 (⚠️ secret 키입니다!)
4. `.env` 파일에 `VITE_SUPABASE_SERVICE_ROLE_KEY=복사한키` 추가

**Service Role Key 찾는 방법:**
```
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택
3. Settings (⚙️) 클릭
4. API 메뉴 클릭
5. "service_role" 섹션에서 "secret" 키 복사 (눈 아이콘 클릭하면 보임)
```

### 외래키 제약 오류

```
❌ 배치 X/Y 삽입 실패: insert or update on table "price_history" violates foreign key constraint
```

→ CSV 파일의 `c_id` 값이 `memberships` 테이블에 존재하는지 확인하세요.

### UNIQUE 제약 오류

```
❌ 배치 X/Y 삽입 실패: duplicate key value violates unique constraint
```

→ 이미 동일한 `(c_id, date)` 데이터가 존재합니다. 기존 데이터를 삭제하거나 CSV 파일을 확인하세요.

## 🧹 기존 데이터 삭제 (선택사항)

기존 데이터를 모두 삭제하고 새로 입력하려면 Supabase SQL Editor에서 실행:

```sql
-- ⚠️ 주의: 모든 가격 히스토리 데이터가 삭제됩니다!
DELETE FROM price_history;
```

## 📚 관련 파일

- `import-price-data.js` - 메인 스크립트
- `schema.sql` - 데이터베이스 스키마
- `package.json` - Node.js 패키지 설정

