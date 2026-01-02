## ✅ 로컬 PostgreSQL DB 구축 완료 확인

### 📊 현재 DB 상태

```
✅ 데이터베이스: membership_market
✅ PostgreSQL: 16 (포트 5432)
✅ 상태: 온라인

테이블 현황:
- memberships: 399개 ✅
- price_history: 0개 (입력 대기)
- urgent_sales: 0개 (입력 대기)
- presales: 0개 (입력 대기)
```

### 🔍 빠른 확인 명령어

#### 1. PostgreSQL 시작
```bash
sudo service postgresql start
sudo service postgresql status
```

#### 2. DB 접속
```bash
# 방법 1: 대화형 접속
sudo -u postgres psql -d membership_market

# 접속 후 명령어
\dt                  # 테이블 목록
\d memberships       # 테이블 구조
\q                   # 나가기
```

#### 3. 원라인 명령어 (접속 없이)
```bash
# 전체 개수
sudo -u postgres psql -d membership_market -c "SELECT COUNT(*) FROM memberships;"

# 카테고리별 통계
sudo -u postgres psql -d membership_market -c "SELECT category, COUNT(*) FROM memberships GROUP BY category;"

# 처음 5개
sudo -u postgres psql -d membership_market -c "SELECT id, product_name, membership_name FROM memberships LIMIT 5;"

# 골프 데이터 (ID 1-286)
sudo -u postgres psql -d membership_market -c "SELECT * FROM memberships WHERE category = 'golf' LIMIT 5;"

# 콘도 데이터 (ID 287-363)
sudo -u postgres psql -d membership_market -c "SELECT * FROM memberships WHERE category = 'condo' LIMIT 5;"

# 피트니스 데이터 (ID 364-399)
sudo -u postgres psql -d membership_market -c "SELECT * FROM memberships WHERE category = 'fitness' LIMIT 5;"
```

---

### 📋 현재 입력된 데이터

**카테고리별 ID 범위:**

| 카테고리 | ID 범위 | 개수 | 샘플 |
|---------|---------|------|------|
| 골프 | 1 ~ 286 | 286개 | ID 1: 88 - 일반 (경기 용인) |
| 콘도 | 287 ~ 363 | 77개 | ID 287: 골드훼미리 - 25 (경기 용인) |
| 피트니스 | 364 ~ 399 | 36개 | ID 364: 그랜드앰배서더 서울 - 개인 (서울 중구) |

**샘플 데이터:**
```
ID 1: 88 - 일반 (경기 용인)
ID 33: 남서울 - 여자 (경기 성남)
ID 100: 선산 - 일반 (경북 구미)
ID 287: 골드훼미리 - 25 (경기 용인)
ID 330: 용평 - 버치힐(FULL구좌) 37 (강원 평창)
ID 364: 그랜드앰배서더 서울 - 개인 (서울 중구)
ID 390: 조선 - 개인 (서울 중구)
```

---

### 🔧 대화형 접속 (권장)

```bash
# 1. 접속
sudo -u postgres psql -d membership_market

# 2. 접속 후 SQL 실행
SELECT COUNT(*) FROM memberships;

SELECT id, product_name, membership_name, location
FROM memberships
WHERE category = 'golf'
LIMIT 10;

# 3. 나가기
\q
```

---

### 📊 테이블 구조

**memberships 테이블:**
```
- id (자동 증가)
- category (golf/condo/fitness)
- product_name (상품명)
- membership_name (회원권 종류)
- location (지역)
- current_price (현재가 - 초기값 0)
- change_value (변동금액 - 초기값 0)
- change_percent (변동률 - 초기값 0)
- trend (트렌드 - 초기값 'stable')
- active_flag (활성화 여부 - 초기값 true)
- display_flag (메인 노출 여부 - 초기값 false)
- rank (순위 1-5 또는 NULL)
- created_at (생성일시)
- updated_at (수정일시)
```

---

### 🎯 다음 단계

이제 각 회원권에 ID가 할당되었으므로:

1. **가격 데이터 입력** (price_history)
   - 가격 입력 시 memberships의 current_price가 자동 업데이트됨

2. **급매 데이터 입력** (urgent_sales)
   - c_id는 1~399 중 선택

3. **분양 데이터 입력** (presales)
   - c_id는 1~399 중 선택

---

**빠른 테스트:**
```bash
# 터미널에서 바로 실행
sudo -u postgres psql -d membership_market -c "SELECT id, product_name, membership_name FROM memberships WHERE id IN (1, 287, 364);"
```
