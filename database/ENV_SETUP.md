# 환경 변수 설정 가이드

## 🔑 Service Role Key 추가 필요

`import-price-data.js` 스크립트를 실행하려면 **Service Role Key**가 필요합니다.

## ❓ 왜 Service Role Key가 필요한가요?

`price_history` 테이블에 데이터를 삽입하면 자동으로 실행되는 Trigger 함수들이 있습니다:

1. `auto_fill_price_category()` - `memberships` 테이블에서 category 자동 입력
2. `sync_membership_price()` - `memberships` 테이블의 가격 정보 자동 업데이트

이 Trigger 함수들은 `memberships` 테이블에 대한 **읽기/쓰기 권한**이 필요한데, 일반 `ANON_KEY`로는 권한이 부족할 수 있습니다.

**Service Role Key**는 모든 RLS(Row Level Security) 정책을 우회하는 관리자 권한을 가지고 있어 안전하게 데이터를 삽입할 수 있습니다.

## 📋 설정 방법

### 1단계: Service Role Key 찾기

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Settings 메뉴로 이동**
   - 왼쪽 하단의 ⚙️ Settings 클릭

3. **API 메뉴 선택**
   - Configuration → API 클릭

4. **Service Role Key 복사**
   - "Project API keys" 섹션에서
   - `service_role` 항목 찾기
   - 👁️ (눈 아이콘) 클릭하여 키 표시
   - 📋 복사 버튼 클릭

### 2단계: .env 파일에 추가

프로젝트 루트의 `.env` 파일을 열고 다음 줄을 추가:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**주의사항:**
- `VITE_SUPABASE_SERVICE_ROLE_KEY`에 복사한 service_role 키를 붙여넣기
- 키는 매우 길며 `eyJ`로 시작합니다
- 따옴표 없이 그대로 붙여넣기

### 3단계: .env 파일이 .gitignore에 있는지 확인

`.env` 파일은 민감한 정보를 포함하므로 **절대 Git에 커밋하면 안 됩니다!**

`.gitignore` 파일에 다음이 포함되어 있는지 확인:

```
.env
.env.local
.env.*.local
```

✅ 이미 프로젝트의 `.gitignore`에 포함되어 있습니다!

## ⚠️ 보안 주의사항

### Service Role Key는 매우 강력합니다!

- ✅ **사용해도 되는 곳:**
  - 서버 사이드 코드
  - 데이터 마이그레이션 스크립트 (지금 사용 중)
  - 백엔드 API
  - CI/CD 파이프라인

- ❌ **절대 사용하면 안 되는 곳:**
  - 프론트엔드 코드 (React, Vue 등)
  - 클라이언트 사이드 JavaScript
  - GitHub, GitLab 등 공개 저장소
  - 브라우저에서 실행되는 코드

### 만약 Service Role Key가 노출되었다면?

1. 즉시 Supabase Dashboard에서 키를 재생성
2. Settings → API → "Reset service_role key"
3. 모든 서버 사이드 코드의 `.env` 파일 업데이트

## 🧪 설정 확인

`.env` 파일 설정이 완료되었다면:

```bash
cd database
node import-price-data.js
```

스크립트 시작 시 다음 메시지가 표시되어야 합니다:

```
🔑 Service Role Key를 사용합니다. (관리자 권한)
```

만약 다음 메시지가 표시되면 `.env` 설정을 다시 확인하세요:

```
⚠️  Anon Key를 사용합니다. Trigger 권한 문제가 발생할 수 있습니다.
```

## 📚 참고 자료

- [Supabase API Keys 문서](https://supabase.com/docs/guides/api/api-keys)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

