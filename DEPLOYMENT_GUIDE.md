# 🚀 회원권마켓 - 5분 안에 배포하기

## ✅ 준비물
- GitHub 계정 (무료)
- Vercel 계정 (무료) - https://vercel.com

## 📋 배포 단계별 가이드

### 1단계: 파일 압축 해제
다운로드 받은 `membership-market.zip` 파일을 원하는 위치에 압축 해제하세요.

### 2단계: GitHub에 업로드

```bash
# 터미널/명령 프롬프트에서 프로젝트 폴더로 이동
cd membership-market

# Git 초기화
git init
git add .
git commit -m "Initial commit"

# GitHub에서 새 저장소 생성 후
git branch -M main
git remote add origin https://github.com/당신의아이디/저장소이름.git
git push -u origin main
```

### 3단계: Vercel에서 배포

1. **Vercel 가입/로그인**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "New Project" 버튼 클릭
   - GitHub 저장소 선택
   - "Import" 클릭

3. **자동 배포**
   - Framework Preset: Vite 자동 선택됨
   - 그대로 "Deploy" 버튼 클릭
   - 2-3분 기다리면 배포 완료!

4. **완료!**
   - `https://당신의프로젝트.vercel.app` 주소로 접속 가능
   - 이제 누구나 접속할 수 있는 웹사이트입니다!

## 🎯 더 간단한 방법: Vercel CLI

```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 프로젝트 폴더에서 실행
cd membership-market
npm install
npm run build

# 3. 배포
vercel deploy --prod

# 끝! 배포 완료된 URL이 출력됩니다
```

## 🔧 로컬에서 테스트하기

배포 전에 로컬에서 먼저 확인하고 싶다면:

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

## 📱 다른 배포 옵션

### Netlify로 배포
1. https://netlify.com 접속
2. "Add new site" > "Import an existing project"
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

### GitHub Pages로 배포
```bash
# package.json에 추가
{
  "homepage": "https://당신의아이디.github.io/저장소이름"
}

# gh-pages 설치 및 배포
npm install gh-pages --save-dev
npm run build
npx gh-pages -d dist
```

## 🌐 커스텀 도메인 연결

1. 도메인 구매 (가비아, Namecheap 등)
2. Vercel 프로젝트 설정 > Domains
3. 구매한 도메인 입력
4. DNS 설정 (Vercel이 자동으로 안내)
5. 10-20분 후 본인 도메인으로 접속 가능!

## 💡 꿀팁

1. **자동 배포**: GitHub에 push하면 Vercel이 자동으로 재배포
2. **무료**: Vercel은 개인 프로젝트 무료
3. **HTTPS**: 자동으로 SSL 인증서 적용됨
4. **빠름**: 글로벌 CDN으로 전 세계 어디서나 빠른 로딩

## ❓ 문제 해결

### "npm not found" 에러
→ Node.js 설치 필요: https://nodejs.org

### 빌드 실패
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
npm run build
```

### 페이지가 안보임
- 브라우저 캐시 삭제 (Ctrl+Shift+R / Cmd+Shift+R)
- Vercel 배포 로그 확인

## 🎉 완료!

이제 당신의 회원권마켓 웹사이트가 전 세계에 공개되었습니다!
친구들에게 URL을 공유해보세요. 🚀
