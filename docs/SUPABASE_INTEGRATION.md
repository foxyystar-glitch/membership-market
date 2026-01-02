# Supabase 연동 가이드

## 🎯 데이터 읽고 쓰기 - 일일이 안해도 됩니다!

Supabase SDK를 사용하면 **자동으로** 데이터를 읽고 쓸 수 있습니다.

---

## ⚡ 빠른 시작 (3단계)

### 1단계: Supabase Anon Key 확인

1. https://supabase.com/dashboard 접속
2. 프로젝트 선택: `wdnaezkkdltbtugrqczh`
3. **Settings** > **API** 클릭
4. **Project API keys** 섹션에서 `anon` `public` 키 복사

### 2단계: 환경 변수 설정

`.env` 파일 생성:

```bash
# .env.example 파일을 복사
cp .env.example .env

# .env 파일 수정
VITE_SUPABASE_URL=https://wdnaezkkdltbtugrqczh.supabase.co
VITE_SUPABASE_ANON_KEY=여기에_복사한_anon_key_붙여넣기
```

### 3단계: 사용하기

```jsx
import { getAllMemberships } from './lib/supabase'

function MyComponent() {
  const [data, setData] = useState([])

  useEffect(() => {
    // 자동으로 데이터 가져오기!
    getAllMemberships().then(setData)
  }, [])

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.product_name}</div>
      ))}
    </div>
  )
}
```

---

## 📖 사용 가능한 함수들

### 데이터 읽기 (일일이 안해도 됨!)

```javascript
import {
  getAllMemberships,           // 전체 회원권 조회
  getMembershipsByCategory,    // 카테고리별 조회
  getMembershipById,           // ID로 상세 조회
  getDisplayedMemberships,     // 메인 페이지 노출 데이터
  getRankedMemberships,        // 랭킹 데이터
  getUrgentSales,              // 급매 정보
  getPresales,                 // 분양 정보
  getPriceHistory              // 가격 히스토리
} from './lib/supabase'

// 사용 예시
const memberships = await getAllMemberships()
const golfData = await getMembershipsByCategory('golf')
const detail = await getMembershipById(1)
const urgent = await getUrgentSales()
```

### 데이터 쓰기 (관리자용)

```javascript
import {
  addMembership,      // 회원권 추가
  updateMembership,   // 회원권 수정
  deleteMembership,   // 회원권 삭제
  addPrice,           // 가격 추가
  addUrgentSale,      // 급매 추가
  addPresale          // 분양 추가
} from './lib/supabase'

// 회원권 추가 예시
const newMembership = await addMembership({
  category: 'golf',
  product_name: '남서울',
  membership_name: '일반',
  location: '경기 성남'
})

// 가격 업데이트 (자동으로 current_price 업데이트됨!)
await addPrice(1, 'golf', '2026-01-02', 45000)
```

---

## 💡 실전 예제

### 예제 1: 골프 회원권 목록 표시

```jsx
import { useState, useEffect } from 'react'
import { getMembershipsByCategory } from './lib/supabase'

function GolfList() {
  const [golf, setGolf] = useState([])

  useEffect(() => {
    // 자동으로 골프 데이터 가져오기
    getMembershipsByCategory('golf').then(setGolf)
  }, [])

  return (
    <div>
      <h2>골프 회원권</h2>
      {golf.map(item => (
        <div key={item.id}>
          {item.product_name} - {item.membership_name}
        </div>
      ))}
    </div>
  )
}
```

### 예제 2: 급매 정보 표시

```jsx
import { useState, useEffect } from 'react'
import { getUrgentSales } from './lib/supabase'

function UrgentSalesList() {
  const [urgentSales, setUrgentSales] = useState([])

  useEffect(() => {
    // 자동으로 급매 데이터 가져오기
    getUrgentSales().then(setUrgentSales)
  }, [])

  return (
    <div>
      {urgentSales.map(sale => (
        <div key={sale.id}>
          <h3>{sale.memberships.product_name}</h3>
          <p>원가: {sale.original_price}만원</p>
          <p>급매가: {sale.urgent_price}만원</p>
        </div>
      ))}
    </div>
  )
}
```

### 예제 3: 실시간 데이터 업데이트

```jsx
import { useEffect } from 'react'
import { subscribeMemberships } from './lib/supabase'

function RealtimeData() {
  useEffect(() => {
    // 데이터 변경 시 자동으로 알림!
    const subscription = subscribeMemberships((payload) => {
      console.log('데이터 변경:', payload)
      // 여기서 UI 업데이트
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <div>실시간 모니터링 중...</div>
}
```

### 예제 4: 가격 차트 데이터

```jsx
import { useState, useEffect } from 'react'
import { getPriceHistory } from './lib/supabase'

function PriceChart({ membershipId }) {
  const [prices, setPrices] = useState([])

  useEffect(() => {
    // 최근 30일 가격 데이터 자동 조회
    getPriceHistory(membershipId, 30).then(setPrices)
  }, [membershipId])

  return (
    <div>
      {prices.map(p => (
        <div key={p.date}>
          {p.date}: {p.price}만원
        </div>
      ))}
    </div>
  )
}
```

---

## 🔧 완성된 예제 파일

프로젝트에 이미 만들어진 예제 파일들:

1. **`src/lib/supabase.js`**
   - 모든 데이터 읽기/쓰기 함수 포함
   - 복사해서 바로 사용 가능

2. **`src/examples/MembershipList.jsx`**
   - 회원권 목록 표시 예제
   - 카테고리 필터 포함
   - 실제 동작하는 완성된 컴포넌트

3. **`src/examples/AddMembership.jsx`**
   - 회원권 추가 폼 예제
   - 유효성 검사 포함
   - 관리자 페이지용

---

## 🚀 프로젝트에 적용하기

### 방법 1: 예제 컴포넌트 사용

```jsx
// App.jsx에서
import MembershipList from './examples/MembershipList'

function App() {
  return (
    <div>
      <MembershipList />
    </div>
  )
}
```

### 방법 2: 기존 코드 수정

```jsx
// 기존 방식 (하드코딩된 데이터)
import { memberships } from './data/memberships'

// 새로운 방식 (Supabase에서 자동으로)
import { useEffect, useState } from 'react'
import { getAllMemberships } from './lib/supabase'

function MyPage() {
  const [memberships, setMemberships] = useState([])

  useEffect(() => {
    getAllMemberships().then(setMemberships)
  }, [])

  // 나머지 코드는 동일하게 사용!
}
```

---

## 📊 데이터 구조

### memberships 테이블

```javascript
{
  id: 1,
  category: 'golf',
  product_name: '88',
  membership_name: '일반',
  location: '경기 용인',
  current_price: 45000,
  change_value: 500,
  change_percent: 1.12,
  trend: 'up',
  active_flag: true,
  display_flag: false,
  rank: null,
  created_at: '2026-01-02T00:00:00',
  updated_at: '2026-01-02T00:00:00'
}
```

### urgent_sales 테이블

```javascript
{
  id: 1,
  category: 'golf',
  c_id: 33,
  original_price: 40000,
  urgent_price: 38000,
  status: 'available',
  display_flag: true,
  memberships: {
    product_name: '남서울',
    membership_name: '일반',
    location: '경기 성남'
  }
}
```

---

## 🔒 보안 주의사항

### ✅ 안전한 방법

```javascript
// .env 파일에 키 저장
VITE_SUPABASE_ANON_KEY=eyJhbGc...

// import.meta.env로 사용
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
```

### ❌ 위험한 방법

```javascript
// 코드에 직접 키 입력 (절대 금지!)
const key = 'eyJhbGc...'
```

### Supabase Row Level Security (RLS) 설정

Supabase Dashboard에서:

1. **Table Editor** > 테이블 선택
2. **RLS** 탭 클릭
3. 정책 추가:

```sql
-- 읽기 권한 (모두에게)
CREATE POLICY "Allow public read"
ON memberships FOR SELECT
TO public
USING (true);

-- 쓰기 권한 (관리자만)
CREATE POLICY "Allow admin write"
ON memberships FOR ALL
TO authenticated
USING (auth.role() = 'admin');
```

---

## 🎯 일일이 안하는 방법 정리

### ❌ 일일이 하는 방법 (비추천)

```javascript
// 각 페이지마다 반복
fetch('https://supabase.co/...')
  .then(res => res.json())
  .then(data => setData(data))
```

### ✅ 자동화된 방법 (추천!)

```javascript
// 한 번만 설정 (src/lib/supabase.js)
export async function getAllMemberships() {
  const { data } = await supabase.from('memberships').select('*')
  return data
}

// 어디서든 간단하게 사용
import { getAllMemberships } from './lib/supabase'
const data = await getAllMemberships()  // 끝!
```

---

## 🚦 개발 서버 실행

```bash
# 1. 환경 변수 설정
cp .env.example .env
# .env 파일에 VITE_SUPABASE_ANON_KEY 입력

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:5173
```

---

## 🔍 디버깅

### 데이터가 안 불러와질 때

1. **Supabase 연결 확인**
```javascript
import { supabase } from './lib/supabase'

// 브라우저 콘솔에서
console.log(supabase)
```

2. **환경 변수 확인**
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)
```

3. **에러 확인**
```javascript
const { data, error } = await supabase.from('memberships').select('*')
console.log('Data:', data)
console.log('Error:', error)
```

4. **RLS 확인**
   - Supabase Dashboard > Table Editor > RLS 탭
   - 읽기 권한이 public에게 있는지 확인

---

## 📝 체크리스트

- [ ] `@supabase/supabase-js` 설치됨
- [ ] `.env` 파일 생성됨
- [ ] `VITE_SUPABASE_ANON_KEY` 입력됨
- [ ] `src/lib/supabase.js` 파일 존재
- [ ] Supabase Dashboard에서 테이블 생성됨
- [ ] 데이터 399개 입력됨
- [ ] RLS 정책 설정됨 (선택사항)
- [ ] 예제 컴포넌트 동작 확인

---

## 🎉 완료!

이제 **일일이 안해도** 됩니다!

- ✅ 데이터 읽기: `getAllMemberships()` 호출만
- ✅ 데이터 쓰기: `addMembership({...})` 호출만
- ✅ 실시간 업데이트: `subscribeMemberships()` 호출만

**모든 복잡한 처리는 `src/lib/supabase.js`가 자동으로 처리합니다!** 🚀
