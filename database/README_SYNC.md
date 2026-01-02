# Supabase 동기화 방법 총정리

## 🚨 현재 상황

현재 GitHub Codespaces/클라우드 환경에서는 **네트워크 제한**으로 인해 Supabase PostgreSQL 포트(5432)에 직접 연결할 수 없습니다.

```
에러: getaddrinfo EAI_AGAIN (DNS 해석 실패)
```

---

## ✅ 사용 가능한 방법들

### 방법 1: Supabase Dashboard (가장 쉬움 ⭐⭐⭐)

**추천 이유:**
- ✅ 네트워크 제한 없음
- ✅ 복사 & 붙여넣기만 하면 됨
- ✅ 웹 브라우저만 있으면 가능

**단계:**

1. **https://supabase.com/dashboard** 접속
2. 프로젝트 선택: `wdnaezkkdltbtugrqczh`
3. **SQL Editor** 클릭
4. 새 쿼리 생성
5. **`database/schema.sql`** 파일 내용 전체 복사 → 붙여넣기 → **RUN**
6. 새 쿼리 생성
7. **`database/mainDB_data.sql`** 파일 내용 전체 복사 → 붙여넣기 → **RUN**
8. 완료! 아래 쿼리로 확인:

```sql
SELECT id, category, product_name, membership_name
FROM memberships
ORDER BY id
LIMIT 10;
```

---

### 방법 2: 로컬 컴퓨터에서 스크립트 실행

**준비물:**
- Node.js 설치된 로컬 컴퓨터
- 인터넷 연결

**단계:**

1. **프로젝트 클론 또는 다운로드**
```bash
git clone https://github.com/foxyystar-glitch/membership-market.git
cd membership-market/database
```

2. **의존성 설치**
```bash
npm install
```

3. **동기화 스크립트 실행**
```bash
node sync-to-supabase.js
```

**결과:**
```
🔄 Supabase에 연결 중...
✅ Supabase 연결 성공!

📋 스키마 적용 중...
✅ 스키마 적용 완료!

📊 데이터 입력 중...
✅ 데이터 입력 완료!

🔍 입력된 데이터 확인 중...

총 레코드 개수: 399개

카테고리별 통계:
  - condo: 77개
  - fitness: 36개
  - golf: 286개

🎉 Supabase 동기화 완료!
```

---

### 방법 3: psql 명령어 (로컬 컴퓨터)

PostgreSQL이 설치된 로컬 컴퓨터에서:

```bash
# 스키마 적용
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -f database/schema.sql

# 데이터 입력
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -f database/mainDB_data.sql

# 확인
psql "postgresql://postgres:dCun6kJ7utE2141j@db.wdnaezkkdltbtugrqczh.supabase.co:5432/postgres" \
  -c "SELECT COUNT(*) FROM memberships;"
```

---

### 방법 4: Supabase CLI

```bash
# 1. Supabase CLI 설치
npm install -g supabase

# 2. 로그인
supabase login

# 3. 프로젝트 링크
supabase link --project-ref wdnaezkkdltbtugrqczh

# 4. 마이그레이션 생성
supabase db push

# 5. 데이터 입력
supabase db push --include-seed
```

---

## 📊 입력될 데이터

총 **399개** 레코드:

| 카테고리 | 개수 | ID 범위 |
|---------|------|---------|
| golf | 286개 | 1-286 |
| condo | 77개 | 287-363 |
| fitness | 36개 | 364-399 |

**샘플 데이터:**
- ID 1: 88 - 일반 (경기 용인) [골프]
- ID 287: 골드훼미리 - 25 (경기 용인) [콘도]
- ID 364: 그랜드앰배서더 서울 - 개인 (서울 중구) [피트니스]

---

## 🔍 Supabase에서 데이터 확인 방법

### Dashboard에서 확인

1. Supabase Dashboard > **Table Editor**
2. `memberships` 테이블 선택
3. 데이터 확인

### SQL로 확인

```sql
-- 전체 개수
SELECT COUNT(*) FROM memberships;

-- 카테고리별 통계
SELECT category, COUNT(*) as count
FROM memberships
GROUP BY category
ORDER BY category;

-- id, category, product_name, membership_name만 조회
SELECT id, category, product_name, membership_name
FROM memberships
ORDER BY id;

-- 골프 데이터만
SELECT id, category, product_name, membership_name
FROM memberships
WHERE category = 'golf'
ORDER BY id
LIMIT 10;

-- 콘도 데이터만
SELECT id, category, product_name, membership_name
FROM memberships
WHERE category = 'condo'
ORDER BY id;

-- 피트니스 데이터만
SELECT id, category, product_name, membership_name
FROM memberships
WHERE category = 'fitness'
ORDER BY id;
```

---

## 💡 왜 여기서 자동으로 안 되나요?

**이유:**
- 현재 환경(GitHub Codespaces/클라우드)은 보안을 위해 외부 데이터베이스 포트 접근이 제한됩니다
- DNS 해석은 되지만 PostgreSQL 포트(5432)로의 연결이 차단됨
- HTTP/HTTPS는 가능하지만 직접 DB 연결은 불가

**해결책:**
- ✅ **Supabase Dashboard 사용** (웹 브라우저로 접근)
- ✅ **로컬 컴퓨터에서 스크립트 실행** (네트워크 제한 없음)

---

## 🎯 지금 바로 시작하기

**가장 빠른 방법:**

1. 웹 브라우저에서 https://supabase.com/dashboard 열기
2. SQL Editor로 이동
3. `database/schema.sql` 복사 & 실행
4. `database/mainDB_data.sql` 복사 & 실행
5. 완료!

**소요 시간:** 약 2-3분

---

## 🔧 파일 목록

현재 `database/` 폴더에 있는 파일들:

- ✅ `schema.sql` - 데이터베이스 스키마
- ✅ `mainDB_data.sql` - 399개 회원권 데이터
- ✅ `sync-to-supabase.js` - Node.js 동기화 스크립트
- ✅ `SUPABASE_SYNC_GUIDE.md` - 상세 가이드
- ✅ `README_SYNC.md` - 이 파일

---

## ❓ FAQ

**Q: 자동 동기화는 불가능한가요?**
A: 로컬 파일 수정 → Supabase 자동 반영은 불가능합니다. 수동으로 SQL을 실행해야 합니다.

**Q: GitHub에서 바로 실행할 수 없나요?**
A: GitHub Actions를 사용하면 가능하지만, 지금은 Supabase Dashboard를 사용하는 게 더 빠릅니다.

**Q: 스키마를 수정하면 어떻게 하나요?**
A: `schema.sql` 파일을 수정한 후, Supabase Dashboard에서 다시 실행하면 됩니다.

**Q: 데이터를 추가하려면?**
A: `mainDB_data.sql` 파일을 수정하거나, Dashboard의 Table Editor에서 직접 추가할 수 있습니다.

---

**추천:** 지금 바로 Supabase Dashboard를 사용하여 2-3분 안에 동기화를 완료하세요! 🚀
