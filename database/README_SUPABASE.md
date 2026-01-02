# 🚀 Supabase 자동 설정 가이드

## ✅ 설치 완료된 패키지

- `@supabase/supabase-js` - Supabase 클라이언트
- `pg` - PostgreSQL 드라이버 (스크립트용)
- `dotenv` - 환경 변수 관리

## 📁 생성된 파일

```
src/
├── config/
│   └── supabaseClient.js          # Supabase 클라이언트 설정
├── services/
│   └── membershipService.js       # CRUD 함수 모음
└── examples/
    └── MembershipManager.jsx      # 사용 예제 컴포넌트

database/
├── setup-supabase.js              # 기본 설정 스크립트
├── setup-supabase-safe.js         # 안전 모드 스크립트
└── reset-supabase.js              # 초기화 스크립트

SUPABASE_SETUP.md                  # 상세 설정 가이드
```

## 🎯 빠른 시작

### 1단계: 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**값 확인 위치**:
- Supabase Dashboard > Project Settings > API
- Supabase Dashboard > Project Settings > Database

### 2단계: 자동 설정 실행 (선택사항)

이미 Supabase에서 스키마와 데이터를 입력했다면 이 단계를 건너뛰세요.

```bash
npm run db:setup
```

### 3단계: 개발 서버 시작

```bash
npm run dev
```

## 💡 사용 예제

### 예제 1: 모든 회원권 조회

```javascript
import { getAllMemberships } from './services/membershipService'

const memberships = await getAllMemberships()
console.log(memberships) // 399개 회원권
```

### 예제 2: 카테고리별 조회

```javascript
import { getMembershipsByCategory } from './services/membershipService'

const golfMemberships = await getMembershipsByCategory('golf')
console.log(golfMemberships) // 골프 회원권만
```

### 예제 3: 가격 업데이트

```javascript
import { updatePrice } from './services/membershipService'

await updatePrice(1, 50000) // ID 1번 회원권을 50000만원으로 변경
```

### 예제 4: React 컴포넌트에서 사용

```javascript
import { useEffect, useState } from 'react'
import { getAllMemberships } from './services/membershipService'

function MyComponent() {
  const [data, setData] = useState([])

  useEffect(() => {
    getAllMemberships().then(setData)
  }, [])

  return (
    <div>
      {data.map(m => (
        <div key={m.id}>{m.product_name}</div>
      ))}
    </div>
  )
}
```

## 🔧 사용 가능한 명령어

```bash
# 개발 서버 시작
npm run dev

# Supabase 초기 설정 (스키마 + 데이터)
npm run db:setup

# 안전 모드 설정 (기존 데이터 확인)
npm run db:setup-safe

# 데이터베이스 초기화 (모두 삭제)
npm run db:reset
```

## 📚 주요 함수 목록

### 조회 (Read)
- `getAllMemberships()` - 모든 회원권
- `getMembershipsByCategory(category)` - 카테고리별
- `getMembershipById(id)` - ID로 조회
- `getActiveMemberships()` - 활성 회원권
- `getDisplayMemberships()` - 메인 노출 회원권
- `getRankedMembershipsByCategory(category)` - 랭킹 회원권
- `searchMemberships(searchTerm)` - 검색
- `getCategoryStats()` - 통계

### 수정 (Update)
- `updateMembership(id, updates)` - 범용 업데이트
- `updatePrice(id, newPrice)` - 가격 수정
- `updateTrend(id, trend)` - 트렌드 수정
- `toggleActive(id, flag)` - 활성화 토글
- `toggleDisplay(id, flag)` - 노출 토글
- `setRank(id, rank)` - 랭킹 설정

### 추가 (Create)
- `addMembership(data)` - 회원권 추가
- `addPriceHistory(data)` - 가격 히스토리 추가
- `addUrgentSale(data)` - 급매 추가
- `addPresale(data)` - 분양 추가

### 삭제 (Delete)
- `deleteMembership(id)` - 회원권 삭제

## 🎨 예제 컴포넌트 사용

프로젝트에 포함된 `MembershipManager` 컴포넌트를 사용해보세요:

```javascript
// App.jsx
import MembershipManager from './examples/MembershipManager'

function App() {
  return <MembershipManager />
}
```

이 컴포넌트는 다음 기능을 제공합니다:
- ✅ 카테고리별 필터링
- ✅ 검색
- ✅ 가격 수정
- ✅ 트렌드 변경
- ✅ 랭킹 설정
- ✅ 메인 노출 토글
- ✅ 새 회원권 추가

## 🔐 보안 주의사항

1. ✅ `.env` 파일을 Git에 커밋하지 마세요 (이미 .gitignore에 추가됨)
2. ✅ `VITE_SUPABASE_ANON_KEY`는 공개 가능 (프론트엔드용)
3. ❌ `DATABASE_URL`에 포함된 비밀번호는 노출하지 마세요
4. ❌ `SERVICE_ROLE_KEY`는 절대 프론트엔드에서 사용하지 마세요

## 📖 상세 가이드

더 자세한 내용은 `SUPABASE_SETUP.md`를 참조하세요.

## ❓ 문제 해결

### "Supabase URL과 ANON KEY가 환경 변수에 설정되지 않았습니다"
→ `.env` 파일을 생성하고 변수를 설정한 후 개발 서버를 재시작하세요.

### "DATABASE_URL이 .env 파일에 설정되지 않았습니다"
→ 자동 설정 스크립트 사용 시 필요합니다. `.env`에 `DATABASE_URL`을 추가하세요.

### 데이터가 로드되지 않음
→ Supabase Dashboard에서 RLS(Row Level Security) 정책을 확인하세요.

---

**준비 완료! 🎉**

이제 Supabase를 사용하여 데이터베이스를 직접 관리할 수 있습니다!

