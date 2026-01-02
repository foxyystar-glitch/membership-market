const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('🔍 환경 변수 확인\n');

console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ 설정됨' : '❌ 없음');
if (process.env.DATABASE_URL) {
  // 비밀번호 부분만 마스킹하여 표시
  const url = process.env.DATABASE_URL;
  const masked = url.replace(/:[^:@]+@/, ':****@');
  console.log('   값:', masked);
  
  // URL 파싱
  try {
    const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    if (match) {
      console.log('\n📋 연결 정보:');
      console.log('   사용자:', match[1]);
      console.log('   비밀번호:', '****' + match[2].slice(-4));
      console.log('   호스트:', match[3]);
      console.log('   포트:', match[4]);
      console.log('   데이터베이스:', match[5]);
    }
  } catch (e) {
    console.log('   (파싱 실패)');
  }
}

console.log('\nVITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✅ 설정됨' : '❌ 없음');
if (process.env.VITE_SUPABASE_URL) {
  console.log('   값:', process.env.VITE_SUPABASE_URL);
}

console.log('\nVITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 없음');
if (process.env.VITE_SUPABASE_ANON_KEY) {
  console.log('   값:', process.env.VITE_SUPABASE_ANON_KEY.substring(0, 20) + '...');
}

console.log('\n---\n');

// DNS 조회 테스트
const dns = require('dns');
const url = process.env.DATABASE_URL;

if (url) {
  const match = url.match(/@([^:]+):/);
  if (match) {
    const host = match[1];
    console.log(`🌐 DNS 조회 테스트: ${host}\n`);
    
    dns.lookup(host, (err, address, family) => {
      if (err) {
        console.error('❌ DNS 조회 실패:', err.code);
        console.log('\n💡 가능한 원인:');
        console.log('   1. 인터넷 연결 문제');
        console.log('   2. Supabase 프로젝트가 아직 준비 중 (2-3분 소요)');
        console.log('   3. 호스트 주소가 잘못됨');
        console.log('\n💡 해결 방법:');
        console.log('   1. 인터넷 연결 확인');
        console.log('   2. 잠시 후 다시 시도: npm run db:test');
        console.log('   3. Supabase Dashboard에서 호스트 주소 재확인');
      } else {
        console.log('✅ DNS 조회 성공!');
        console.log('   IP 주소:', address);
        console.log('   IP 버전:', family === 4 ? 'IPv4' : 'IPv6');
        console.log('\n✅ 네트워크 연결은 정상입니다!');
        console.log('\n다음 단계: npm run db:test');
      }
    });
  }
}

