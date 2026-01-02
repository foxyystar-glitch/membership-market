# 회원권마켓 웹사이트

골프, 콘도, 피트니스 회원권 거래 플랫폼

## 🚀 빠른 배포 방법

### 방법 1: Vercel (추천 ⭐)

가장 간단하고 무료입니다!

1. **GitHub에 코드 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/사용자명/저장소명.git
   git push -u origin main
   ```

2. **Vercel 배포**
   - https://vercel.com 접속
   - "Import Project" 클릭
   - GitHub 저장소 연결
   - 자동으로 빌드 및 배포!
   - 무료 도메인 제공: `your-project.vercel.app`

### 방법 2: Netlify

1. **Netlify 배포**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   ```

### 방법 3: GitHub Pages

1. **package.json에 추가**
   ```json
   {
     "homepage": "https://사용자명.github.io/저장소명",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **배포 실행**
   ```bash
   npm install gh-pages --save-dev
   npm run deploy
   ```

## 💻 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

## 📦 프로젝트 구조

```
membership-market/
├── src/
│   ├── pages/              # 각 페이지 컴포넌트
│   │   ├── MainPage.jsx    # 메인 페이지
│   │   ├── CategoryPage.jsx # 카테고리별 페이지
│   │   ├── PriceTablePage.jsx # 시세표
│   │   ├── UrgentSalePage.jsx # 급매
│   │   ├── PresalePage.jsx # 분양
│   │   └── InquiryPage.jsx # 문의
│   ├── components/         # 공통 컴포넌트
│   │   └── Header.jsx      # 네비게이션 헤더
│   ├── App.jsx             # 메인 앱 (라우팅)
│   ├── main.jsx            # 엔트리 포인트
│   └── index.css           # 스타일
├── index.html
├── package.json
└── vite.config.js
```

## ⚡ 빠른 수정 가이드

### 각 페이지 파일에 네비게이션 추가하기

각 페이지 파일(MainPage.jsx, CategoryPage.jsx 등)의 헤더 부분을:

```jsx
// 기존 코드
<a href="#" className="text-gray-700">시세표</a>

// 이렇게 변경
<button onClick={() => navigate('sise')} className="text-gray-700">시세표</button>
```

그리고 함수 시작 부분에 `navigate` props 추가:

```jsx
export default function MainPage({ navigate }) {
  // ... 나머지 코드
}
```

## 🔧 필요한 수정사항

현재 프로젝트는 기본 구조만 세팅되어 있습니다. 
각 페이지 파일의 헤더를 공통 Header 컴포넌트로 교체하고 
`navigate` 함수를 연결해야 합니다.

자동화 스크립트를 실행하려면:

```bash
# 프로젝트 디렉토리로 이동
cd /home/claude/membership-market

# 페이지 파일들에 네비게이션 자동 추가
# (수동으로 해야 함 - 각 파일의 헤더 부분 수정)
```

## 🌐 실제 도메인 연결

Vercel/Netlify 배포 후:

1. 도메인 구매 (가비아, Route53 등)
2. Vercel/Netlify 설정에서 커스텀 도메인 추가
3. DNS 설정 (A 레코드 또는 CNAME)

## 📝 라이센스

MIT License
