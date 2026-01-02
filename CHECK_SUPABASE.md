# 🔍 Supabase 연결 문제 진단

## 현재 상태

### ✅ 완료된 것
- 환경 변수 설정 완료 (`.env` 파일)
- Supabase 패키지 설치 완료
- 설정 파일 생성 완료

### ❌ 문제 발생
1. **DNS 조회 실패**: `db.wdnaezkkdltbtugrqczh.supabase.co` 호스트를 찾을 수 없음
2. **API 키 오류**: "Invalid API key" 에러

---

## 🔧 해결 방법

### 1단계: Supabase 프로젝트 상태 확인

**Supabase Dashboard 접속**: https://supabase.com/dashboard

다음을 확인하세요:
- ✅ 프로젝트가 **"Active"** 상태인가?
- ✅ 프로젝트가 **일시 중지(Paused)** 되지 않았나?
- ✅ 프로젝트 생성 후 **2-3분 이상** 지났나?

### 2단계: 올바른 연결 정보 확인

#### A. Project URL 확인
1. Supabase Dashboard > **Project Settings** (톱니바퀴 아이콘)
2. **API** 탭 클릭
3. **Project URL** 복사
   ```
   예: https://xxxxxxxxxxxxx.supabase.co
   ```

#### B. API Keys 확인
1. 같은 **API** 탭에서
2. **anon public** 키 복사 (긴 문자열)
   ```
   예: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### C. Database Connection String 확인
1. **Database** 탭 클릭
2. **Connection string** 섹션
3. **URI** 선택
4. `[YOUR-PASSWORD]` 부분을 실제 비밀번호로 교체
   ```
   예: postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
   ```

### 3단계: .env 파일 업데이트

`.env` 파일을 열고 다음 형식으로 정확히 입력:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
```

⚠️ **주의사항**:
- 따옴표 없이 입력
- 앞뒤 공백 없이 입력
- 줄바꿈 없이 한 줄로 입력

### 4단계: 다시 테스트

```bash
npm run db:check
```

---

## 🌐 네트워크 문제인 경우

### 방화벽 확인
Windows 방화벽이 Node.js의 외부 연결을 차단하고 있을 수 있습니다.

### VPN 확인
VPN을 사용 중이라면 잠시 끄고 테스트해보세요.

### 프록시 확인
회사나 학교 네트워크에서는 프록시 설정이 필요할 수 있습니다.

---

## 🎯 대안: Supabase Dashboard에서 직접 확인

코드 없이 Supabase가 정상 작동하는지 확인:

1. **Supabase Dashboard** 접속
2. **Table Editor** 클릭
3. `memberships` 테이블이 보이나요?
   - ✅ **보인다**: 스키마 생성 완료, 연결 정보만 수정하면 됨
   - ❌ **안 보인다**: 스키마를 먼저 생성해야 함

### 스키마가 없는 경우

**SQL Editor**에서 다음 파일 내용을 복사하여 실행:
1. `database/schema.sql` 전체 복사 → 실행
2. `database/mainDB_data.sql` 전체 복사 → 실행

---

## 📞 다음 단계

1. ✅ Supabase Dashboard에서 프로젝트 상태 확인
2. ✅ 올바른 URL과 키를 복사하여 `.env` 업데이트
3. ✅ `npm run db:check` 재실행
4. ✅ 여전히 안 되면 Supabase Dashboard의 Table Editor에서 직접 데이터 확인

---

## 💡 빠른 확인 체크리스트

- [ ] Supabase 프로젝트가 Active 상태인가?
- [ ] Project URL이 정확한가?
- [ ] API Key가 정확한가? (anon public 키)
- [ ] DATABASE_URL의 비밀번호가 정확한가?
- [ ] .env 파일에 따옴표나 공백이 없는가?
- [ ] 인터넷 연결이 정상인가?
- [ ] 방화벽이나 VPN이 차단하고 있지 않은가?

---

**문제가 해결되면**: `npm run db:test` 실행하여 전체 연결 테스트

