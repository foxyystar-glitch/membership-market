# 🚀 Supabase 설정 가이드

## ✅ 완료된 단계

- [x] 1단계: Supabase 프로젝트 생성
- [x] 2단계: 스키마 및 데이터 입력
- [x] 3단계: Supabase 클라이언트 설치 (`@supabase/supabase-js`, `pg`, `dotenv`)
- [x] 4단계: 설정 파일 생성
  - `src/config/supabaseClient.js`
  - `src/services/membershipService.js`
  - `database/setup-supabase.js`
  - `database/setup-supabase-safe.js`
  - `database/reset-supabase.js`

## 📝 다음 단계: 환경 변수 설정

### 1. `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 만들고 다음 내용을 입력하세요:

```env
# Supabase URL (프론트엔드용)
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Supabase Anon Key (프론트엔드용 - 공개 가능)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PostgreSQL 직접 연결 (백엔드/스크립트용)
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### 2. 값 확인 방법

**Supabase Dashboard** 접속:

1. **VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY**:
   - `Project Settings` > `API` 탭
   - Project URL 복사
   - anon/public key 복사

2. **DATABASE_URL**:
   - `Project Settings` > `Database` 탭
   - Connection string 섹션에서 "URI" 복사
   - `[YOUR-PASSWORD]` 부분을 실제 비밀번호로 교체

### 3. `.gitignore` 확인

`.env` 파일이 Git에 커밋되지 않도록 확인하세요 (이미 추가되어 있음):

```gitignore
.env
.env.local
```

---

## 🤖 자동 설정 스크립트 사용법

### 기본 설정 (처음 한 번)

```bash
npm run db:setup
```

이 명령은:
- ✅ Supabase에 스키마 생성
- ✅ 399개의 회원권 데이터 입력
- ✅ 트리거 및 함수 설정
- ✅ 데이터 확인

### 안전 모드 (기존 데이터 확인)

```bash
npm run db:setup-safe
```

이 명령은:
- 기존 테이블이 있는지 확인
- 데이터가 있으면 경고 후 종료
- 안전하게 설정 진행

### 데이터베이스 초기화 (모두 삭제)

```bash
npm run db:reset
```

⚠️ **주의**: 모든 테이블과 데이터를 삭제합니다!

---

## 📚 생성된 파일 설명

### 1. `src/config/supabaseClient.js`

Supabase 클라이언트 초기화 파일입니다.

```javascript
import { supabase } from './config/supabaseClient'
```

### 2. `src/services/membershipService.js`

모든 CRUD 함수가 포함된 서비스 파일입니다:

#### 📖 조회 함수
- `getAllMemberships()` - 모든 회원권
- `getMembershipsByCategory(category)` - 카테고리별
- `getMembershipById(id)` - ID로 조회
- `getActiveMemberships()` - 활성화된 회원권만
- `getDisplayMemberships()` - 메인 노출 회원권
- `getRankedMembershipsByCategory(category)` - 랭킹 회원권
- `searchMemberships(searchTerm)` - 검색
- `getCategoryStats()` - 카테고리 통계

#### ✏️ 수정 함수
- `updateMembership(id, updates)` - 범용 업데이트
- `updatePrice(id, newPrice)` - 가격 수정
- `updateTrend(id, trend)` - 트렌드 수정
- `toggleActive(id, activeFlag)` - 활성화 토글
- `toggleDisplay(id, displayFlag)` - 노출 토글
- `setRank(id, rank)` - 랭킹 설정

#### ➕ 추가 함수
- `addMembership(membershipData)` - 회원권 추가
- `addPriceHistory(priceData)` - 가격 히스토리 추가
- `addUrgentSale(urgentData)` - 급매 추가
- `addPresale(presaleData)` - 분양 추가

#### 🗑️ 삭제 함수
- `deleteMembership(id)` - 회원권 삭제

---

## 💡 사용 예제

### React 컴포넌트에서 사용

```javascript
import React, { useEffect, useState } from 'react'
import { 
  getAllMemberships,
  updatePrice,
  addMembership 
} from './services/membershipService'

function App() {
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await getAllMemberships()
      setMemberships(data)
    } catch (error) {
      console.error('로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePrice = async (id, newPrice) => {
    try {
      await updatePrice(id, newPrice)
      alert('가격이 업데이트되었습니다!')
      loadData() // 새로고침
    } catch (error) {
      alert('실패: ' + error.message)
    }
  }

  if (loading) return <div>로딩 중...</div>

  return (
    <div>
      <h1>회원권 관리 ({memberships.length}개)</h1>
      {memberships.map(m => (
        <div key={m.id}>
          {m.product_name} - {m.current_price}만원
          <button onClick={() => handleUpdatePrice(m.id, m.current_price + 100)}>
            +100만원
          </button>
        </div>
      ))}
    </div>
  )
}
```

---

## 🔧 트러블슈팅

### 에러: "Supabase URL과 ANON KEY가 환경 변수에 설정되지 않았습니다"

→ `.env` 파일을 생성하고 `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`를 설정하세요.

### 에러: "DATABASE_URL이 .env 파일에 설정되지 않았습니다"

→ `.env` 파일에 `DATABASE_URL` 추가 (스크립트 실행용)

### 개발 서버를 재시작하지 않았을 경우

→ `.env` 파일을 수정한 후에는 반드시 개발 서버를 재시작하세요:

```bash
# Ctrl+C로 종료 후
npm run dev
```

---

## 🎯 다음 단계

1. ✅ `.env` 파일 생성 및 설정
2. ✅ `npm run db:setup` 실행
3. ✅ 프론트엔드에서 `membershipService` 사용
4. 🔜 기존 하드코딩된 데이터를 Supabase 데이터로 교체
5. 🔜 실시간 업데이트 기능 추가 (선택)

---

## 📞 문제가 있나요?

설정 중 문제가 발생하면:
1. `.env` 파일이 올바른지 확인
2. Supabase 프로젝트가 활성화되어 있는지 확인
3. 네트워크 연결 확인
4. 콘솔 오류 메시지 확인

**행운을 빕니다! 🚀**

