# Trigger 함수 오류 해결 가이드

## 🔴 문제 증상

```
✅ memberships 테이블 확인 완료 (399개 레코드)
✅ price_history 테이블 확인 완료
✅ 모든 필수 테이블이 준비되었습니다!

❌ 배치 1/105 삽입 실패: relation "memberships" does not exist
```

사전 검증은 통과했지만 실제 데이터 삽입 시 오류가 발생합니다.

## 🎯 원인

`price_history` 테이블에 데이터를 삽입하면 자동으로 실행되는 **Trigger 함수들**이 `memberships` 테이블을 찾지 못하는 문제입니다.

### 왜 사전 검증은 통과했나요?

- 사전 검증: JavaScript에서 직접 Supabase 클라이언트로 테이블 조회 → ✅ 정상
- 데이터 삽입: Trigger 함수가 PostgreSQL 내부에서 실행 → ❌ search_path 문제

## ✅ 해결 방법

### 🔧 Supabase SQL Editor에서 실행

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 왼쪽 메뉴에서 "SQL Editor" 클릭

3. **수정 SQL 실행**
   - `database/fix-trigger-search-path.sql` 파일 열기
   - 전체 내용 복사 (Ctrl+A → Ctrl+C)
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭 또는 Ctrl+Enter

4. **성공 확인**
   - "Success. No rows returned" 또는 성공 메시지 확인
   - Notice 메시지: "✅ 모든 Trigger 함수가 성공적으로 수정되었습니다!"

## 🔍 수정 내용

### Before (문제 있는 코드)

```sql
CREATE OR REPLACE FUNCTION auto_fill_price_category()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM memberships  -- ❌ 스키마를 찾지 못함
    WHERE id = NEW.c_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### After (수정된 코드)

```sql
CREATE OR REPLACE FUNCTION auto_fill_price_category()
RETURNS TRIGGER
SECURITY DEFINER           -- ✅ 추가: 함수 정의자 권한으로 실행
SET search_path = public   -- ✅ 추가: 명시적 스키마 지정
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.category IS NULL THEN
    SELECT category INTO NEW.category
    FROM public.memberships  -- ✅ 수정: 스키마 명시
    WHERE id = NEW.c_id;
  END IF;
  RETURN NEW;
END;
$$;
```

## 🚀 수정 후 다시 실행

SQL을 실행한 후 다시 스크립트를 실행하세요:

```bash
cd database
node import-price-data.js
```

이제 정상적으로 작동해야 합니다! 🎉

## 📋 수정되는 함수 목록

1. ✅ `auto_fill_price_category()` - price_history의 category 자동 입력
2. ✅ `sync_membership_price()` - memberships 가격 정보 자동 동기화
3. ✅ `auto_fill_urgent_fields()` - urgent_sales 자동 입력
4. ✅ `auto_fill_presale_fields()` - presales 자동 입력

## ❓ FAQ

### Q: 왜 이런 문제가 발생하나요?

A: Supabase는 PostgreSQL을 사용하는데, Trigger 함수가 실행될 때 기본 `search_path`가 설정되지 않아 `public` 스키마의 테이블을 찾지 못합니다.

### Q: SECURITY DEFINER는 무엇인가요?

A: Trigger 함수를 함수 정의자(소유자)의 권한으로 실행하도록 합니다. 이렇게 하면 RLS 정책에 관계없이 테이블에 접근할 수 있습니다.

### Q: 기존 데이터에 영향이 있나요?

A: 없습니다. 이 스크립트는 **함수 정의만 수정**하며, 기존 데이터는 건드리지 않습니다.

### Q: SQL 실행이 실패하면?

A: 오류 메시지를 확인하세요. 대부분 권한 문제인데, Supabase 프로젝트의 소유자 계정으로 로그인했는지 확인하세요.

## 🔐 보안 참고

- `SECURITY DEFINER`는 함수가 소유자 권한으로 실행되므로 신중하게 사용해야 합니다
- 이 함수들은 데이터 무결성을 위한 시스템 함수이므로 안전합니다
- `SET search_path = public`으로 명시적으로 스키마를 제한하여 보안을 강화했습니다

