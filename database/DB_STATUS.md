# 데이터베이스 구축 상태

## ✅ 구축 완료

### 데이터베이스 정보
- **이름**: membership_market
- **서버**: PostgreSQL 16
- **상태**: 운영 중 (포트 5432)

### 테이블 구조 (4개)
1. **memberships** - 회원권 마스터 테이블
2. **price_history** - 가격 히스토리
3. **urgent_sales** - 급매 정보
4. **presales** - 분양 정보

---

## 📊 입력된 데이터 현황

### memberships (총 399개)

| 카테고리 | 개수 | ID 범위 |
|---------|------|---------|
| **golf** | 286개 | 1 ~ 286 |
| **condo** | 77개 | 287 ~ 363 |
| **fitness** | 36개 | 364 ~ 399 |

### 데이터 예시

**골프 (ID: 1-286)**
- ID 1: 88 - 일반 (경기 용인)
- ID 2-3: 가야 - 일반/우대 (경남 김해)
- ID 33-34: 남서울 - 일반/여자 (경기 성남)

**콘도 (ID: 287-363)**
- ID 287: 강촌 - 일반 (강원 춘천)
- ID 288: 경주 - 일반 (경북 경주)

**피트니스 (ID: 364-399)**
- ID 364: 그랜드워커힐 - 개인 (서울 광진)
- ID 390-391: 조선 - 개인/부부 (서울 중구)
- ID 396-399: 하얏트 - 개인남자/개인여자/부부/부부가족1 (서울 용산)

---

## 🎯 다음 단계

### 1. 가격 데이터 입력 필요 (priceDB)
- price_history 테이블에 데이터 입력
- 필요한 필드: c_id, category, date, price
- c_id는 위의 ID 범위 참조

**예시:**
```sql
INSERT INTO price_history (c_id, category, date, price) VALUES
(1, 'golf', '2026-01-02', 45000),
(33, 'golf', '2026-01-02', 38500),
(287, 'condo', '2026-01-02', 1200);
```

### 2. 급매 데이터 입력 필요 (urgentDB)
- urgent_sales 테이블에 데이터 입력
- 필요한 필드: c_id, category, original_price, urgent_price

### 3. 분양 데이터 입력 필요 (presaleDB)
- presales 테이블에 데이터 입력
- 필요한 필드: c_id, category, original_price, presale_price

---

## 🔍 데이터 확인 명령어

```bash
# 데이터베이스 접속
sudo -u postgres psql -d membership_market

# 전체 데이터 개수
SELECT COUNT(*) FROM memberships;

# 카테고리별 개수
SELECT category, COUNT(*) FROM memberships GROUP BY category;

# 특정 ID 조회
SELECT * FROM memberships WHERE id = 1;

# 골프 회원권 목록
SELECT id, product_name, membership_name, location
FROM memberships
WHERE category = 'golf'
ORDER BY id
LIMIT 10;
```

---

## ⚙️ 자동 기능

### 1. Rank 자동 관리
- 카테고리별 rank 1~5는 하나씩만 존재
- 새로운 rank 할당 시 기존 rank 자동 NULL 처리

### 2. 가격 동기화 트리거
- price_history에 가격 입력 시
- memberships의 current_price, change_percent, trend 자동 업데이트

---

**마지막 업데이트**: 2026-01-02
**입력 데이터**: mainDB_data.csv (399개 레코드)
