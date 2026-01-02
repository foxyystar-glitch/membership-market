# GitHub에서 DB 접근 방법

## 🎯 추천 방법별 비교

| 방법 | 난이도 | 비용 | 용도 |
|------|--------|------|------|
| **1. Supabase** (추천) | ⭐ 쉬움 | 무료 | 프로덕션, 개발 |
| **2. Neon** | ⭐ 쉬움 | 무료 | 프로덕션, 개발 |
| **3. Railway** | ⭐⭐ 보통 | 무료 $5 | 프로덕션, 개발 |
| **4. GitHub Actions** | ⭐⭐⭐ 어려움 | 무료 | CI/CD 테스트 |
| **5. Vercel Postgres** | ⭐ 쉬움 | 유료 | Vercel 프로젝트 전용 |

---

## 방법 1: Supabase (가장 추천 ⭐⭐⭐)

### 장점
- ✅ 무료 (500MB DB)
- ✅ PostgreSQL 16 제공
- ✅ 웹 SQL 에디터 제공
- ✅ 실시간 DB 변경 감지
- ✅ 자동 백업
- ✅ REST API 자동 생성

### 설정 방법

#### 1단계: Supabase 프로젝트 생성
```
1. https://supabase.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. 프로젝트 이름: membership-market
5. Database Password 설정 (안전한 곳에 저장!)
6. Region: Northeast Asia (Seoul)
7. "Create new project" 클릭
```

#### 2단계: 스키마 적용
```sql
-- Supabase Dashboard > SQL Editor에서 실행

-- schema.sql 내용 복사해서 붙여넣기
-- 또는 아래 버튼 사용:
-- "RUN" 버튼 클릭
```

#### 3단계: 데이터 입력
```sql
-- mainDB_data.sql 내용 복사해서 붙여넣기
-- "RUN" 버튼 클릭
```

#### 4단계: 연결 정보 확인
```
Project Settings > Database > Connection string

PostgreSQL:
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

Connection pooling:
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres
```

#### 5단계: GitHub Secrets 설정
```
Repository > Settings > Secrets and variables > Actions > New repository secret

Name: DATABASE_URL
Value: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

---

## 방법 2: Neon

### 장점
- ✅ 무료 (512MB DB)
- ✅ Serverless PostgreSQL
- ✅ 자동 확장
- ✅ 빠른 브랜치 생성 (Git처럼)

### 설정 방법

```
1. https://neon.tech 접속
2. GitHub 계정으로 로그인
3. "Create Project" 클릭
4. Project name: membership-market
5. Region: AWS Seoul (ap-northeast-2)
6. PostgreSQL version: 16
7. "Create Project" 클릭

연결 URL:
postgresql://[username]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require
```

---

## 방법 3: Railway

### 장점
- ✅ 무료 $5 크레딧
- ✅ 간단한 배포
- ✅ 환경 변수 관리

### 설정 방법

```
1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" > "Provision PostgreSQL"
4. Database 선택 > "Variables" 탭에서 DATABASE_URL 확인
```

---

## 방법 4: GitHub Actions에서 DB 사용

### .github/workflows/test-db.yml

```yaml
name: Database Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: membership_market
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup PostgreSQL
        env:
          PGPASSWORD: postgres
        run: |
          psql -h localhost -U postgres -d membership_market -f database/schema.sql
          psql -h localhost -U postgres -d membership_market -f database/mainDB_data.sql

      - name: Verify Data
        env:
          PGPASSWORD: postgres
        run: |
          psql -h localhost -U postgres -d membership_market -c "SELECT COUNT(*) FROM memberships;"
```

---

## 방법 5: 로컬 DB를 외부에서 접근 (개발용)

### ngrok 사용 (임시 테스트용)

```bash
# ngrok 설치
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# PostgreSQL 포트 노출
ngrok tcp 5432

# 출력된 URL 사용
# tcp://0.tcp.ngrok.io:12345
```

⚠️ **주의**: 프로덕션 환경에서는 사용하지 마세요!

---

## 📝 환경 변수 설정

### .env.example (프로젝트 루트)

```env
# PostgreSQL Connection
DATABASE_URL=postgresql://username:password@host:5432/database

# Supabase (선택)
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Neon (선택)
NEON_DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname
```

### GitHub Actions에서 사용

```yaml
- name: Run database migrations
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  run: |
    npm run db:migrate
```

---

## 🔒 보안 주의사항

### ✅ DO (이렇게 하세요)
- GitHub Secrets에 DB 연결 정보 저장
- `.env` 파일을 `.gitignore`에 추가
- SSL/TLS 연결 사용
- 강력한 비밀번호 사용
- 필요한 IP만 화이트리스트 등록

### ❌ DON'T (하지 마세요)
- DB 비밀번호를 코드에 하드코딩
- `.env` 파일을 Git에 커밋
- 공개 저장소에 연결 정보 노출
- root/admin 계정 직접 사용

---

## 🚀 빠른 시작 (Supabase 추천)

```bash
# 1. Supabase 프로젝트 생성 (웹)
# 2. SQL Editor에서 스키마 생성
cat database/schema.sql  # 복사

# 3. 데이터 입력
cat database/mainDB_data.sql  # 복사

# 4. 연결 테스트
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" -c "SELECT COUNT(*) FROM memberships;"

# 5. GitHub Secrets 설정
# Repository Settings > Secrets > DATABASE_URL 추가
```

---

## 📊 현재 DB 데이터 내보내기

```bash
# 로컬 DB에서 데이터 덤프
sudo -u postgres pg_dump membership_market > membership_market_backup.sql

# 특정 테이블만
sudo -u postgres pg_dump membership_market -t memberships > memberships_only.sql

# 스키마만 (데이터 제외)
sudo -u postgres pg_dump membership_market --schema-only > schema_only.sql

# 데이터만 (스키마 제외)
sudo -u postgres pg_dump membership_market --data-only > data_only.sql
```

---

## 🔧 추천 설정 (프로덕션)

### 1단계: Supabase 선택
- 무료
- 관리 쉬움
- 자동 백업
- REST API 제공

### 2단계: GitHub Secrets 설정
```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...  (Prisma 사용 시)
```

### 3단계: 백엔드에서 연결
```javascript
// Node.js 예시
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 쿼리 실행
const result = await pool.query('SELECT * FROM memberships LIMIT 10');
```

---

**추천**: 지금 바로 [Supabase](https://supabase.com)에서 무료 계정을 만들고 시작하세요! 🚀
