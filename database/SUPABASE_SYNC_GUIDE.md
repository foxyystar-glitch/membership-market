# Supabase 동기화 가이드

## ⚠️ 중요: 자동 동기화는 불가능합니다

로컬 파일 수정 → Supabase 자동 반영 ❌
**수동으로 SQL 실행 필요** ✅

---

## 📋 현재 연결 정보

```
PostgreSQL URL:
postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres

Project Reference: wdnaezkkdltbtugrqczh
Region: Northeast Asia (추정)
```

---

## 🔄 로컬 → Supabase 동기화 방법

### 방법 1: Supabase Dashboard (가장 쉬움 ⭐)

#### 1단계: 스키마 적용
```
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택: wdnaezkkdltbtugrqczh
3. SQL Editor 클릭
4. 새 쿼리 생성
5. database/schema.sql 파일 내용 복사 & 붙여넣기
6. "RUN" 버튼 클릭
```

#### 2단계: 데이터 입력
```
1. SQL Editor에서 새 쿼리 생성
2. database/mainDB_data.sql 파일 내용 복사 & 붙여넣기
3. "RUN" 버튼 클릭
```

#### 3단계: 확인
```sql
-- 테이블 목록 확인
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- 데이터 개수 확인
SELECT COUNT(*) FROM memberships;

-- 데이터 조회
SELECT id, category, product_name, membership_name
FROM memberships
ORDER BY id
LIMIT 10;
```

---

### 방법 2: psql 명령줄 (로컬에서)

```bash
# 1. 스키마 적용
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -f database/schema.sql

# 2. 데이터 입력
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -f database/mainDB_data.sql

# 3. 확인
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -c "SELECT id, category, product_name, membership_name FROM memberships LIMIT 5;"
```

---

### 방법 3: 마이그레이션 스크립트 만들기

database/sync-to-supabase.sh 파일 생성:

```bash
#!/bin/bash

DATABASE_URL="postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres"

echo "🔄 Supabase에 스키마 적용 중..."
psql "$DATABASE_URL" -f database/schema.sql

echo "📊 데이터 입력 중..."
psql "$DATABASE_URL" -f database/mainDB_data.sql

echo "✅ 동기화 완료!"
echo ""
echo "📋 확인:"
psql "$DATABASE_URL" -c "SELECT COUNT(*) as total_count FROM memberships;"
```

실행:
```bash
chmod +x database/sync-to-supabase.sh
./database/sync-to-supabase.sh
```

---

## 🔍 Supabase DB 현재 상태 확인

### Dashboard에서 확인
```
1. Supabase Dashboard > Table Editor
2. memberships 테이블 선택
3. 데이터 확인
```

### SQL로 확인
```sql
-- 전체 데이터 개수
SELECT COUNT(*) FROM memberships;

-- 카테고리별 통계
SELECT category, COUNT(*) as count
FROM memberships
GROUP BY category
ORDER BY category;

-- 전체 데이터 조회 (id, category, product_name, membership_name만)
SELECT id, category, product_name, membership_name
FROM memberships
ORDER BY id;

-- 골프 데이터 확인
SELECT id, category, product_name, membership_name
FROM memberships
WHERE category = 'golf'
ORDER BY id
LIMIT 10;

-- 콘도 데이터 확인
SELECT id, category, product_name, membership_name
FROM memberships
WHERE category = 'condo'
ORDER BY id
LIMIT 10;

-- 피트니스 데이터 확인
SELECT id, category, product_name, membership_name
FROM memberships
WHERE category = 'fitness'
ORDER BY id;
```

---

## 🔄 스키마 변경 시 워크플로우

로컬에서 `schema.sql` 파일을 수정했다면:

### 1단계: 로컬에서 테스트
```bash
# 로컬 PostgreSQL에 적용
sudo service postgresql start
sudo -u postgres psql -d membership_market -f database/schema.sql
```

### 2단계: Supabase에 적용
```bash
# 방법 A: psql 사용
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -f database/schema.sql

# 방법 B: Supabase Dashboard SQL Editor에서 수동 실행
```

### 3단계: 확인
```sql
-- 테이블 구조 확인
\d memberships

-- 또는 Supabase Dashboard에서 Table Editor로 확인
```

---

## ⚡ 자동화 옵션 (추후 고려사항)

완전 자동화를 원한다면:

### 옵션 1: GitHub Actions
```yaml
# .github/workflows/sync-db.yml
name: Sync to Supabase

on:
  push:
    paths:
      - 'database/schema.sql'
      - 'database/mainDB_data.sql'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Sync to Supabase
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          psql "$DATABASE_URL" -f database/schema.sql
```

### 옵션 2: Supabase CLI
```bash
# Supabase CLI 설치
npm install -g supabase

# 프로젝트 연결
supabase link --project-ref wdnaezkkdltbtugrqczh

# 마이그레이션 생성
supabase db push
```

---

## 📊 예상 데이터

Supabase에 데이터를 입력하면:

```
총 399개 레코드

카테고리별:
- golf: 286개 (ID 1-286)
- condo: 77개 (ID 287-363)
- fitness: 36개 (ID 364-399)

샘플 데이터:
ID 1: 88 - 일반 (경기 용인)
ID 287: 골드훼미리 - 25 (경기 용인)
ID 364: 그랜드앰배서더 서울 - 개인 (서울 중구)
```

---

## 🔒 보안 주의사항

⚠️ **절대 하지 마세요:**
- ❌ .env 파일을 Git에 커밋
- ❌ 연결 정보를 공개 저장소에 업로드

✅ **반드시 하세요:**
- ✅ .gitignore에 .env 추가
- ✅ GitHub Secrets에 DATABASE_URL 저장
- ✅ 필요시 IP 화이트리스트 설정

---

## 🎯 빠른 시작

**지금 바로 Supabase에 데이터 입력하기:**

1. https://supabase.com/dashboard 접속
2. SQL Editor 열기
3. `database/schema.sql` 복사 & 실행
4. `database/mainDB_data.sql` 복사 & 실행
5. 완료!

**확인:**
```sql
SELECT id, category, product_name, membership_name
FROM memberships
LIMIT 10;
```

---

**요약:**
- 자동 동기화: ❌ 불가능
- 수동 동기화: ✅ 가능 (SQL 실행 필요)
- 연결 정보: ✅ 저장됨 (.env 파일)
- 데이터 입력: Supabase Dashboard 또는 psql 사용
