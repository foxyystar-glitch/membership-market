const fs = require('fs');
const csvParser = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('   필요한 환경 변수: VITE_SUPABASE_URL, VITE_SUPABASE_SERVICE_ROLE_KEY');
  console.error('   .env 파일을 확인하세요.');
  console.error('');
  console.error('   💡 VITE_SUPABASE_SERVICE_ROLE_KEY는 Supabase Dashboard에서 확인:');
  console.error('      Settings → API → service_role key (secret)');
  console.error('');
  process.exit(1);
}

// Service Role Key 사용 여부 확인
if (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
  console.log('🔑 Service Role Key를 사용합니다. (관리자 권한)');
} else {
  console.log('⚠️  Anon Key를 사용합니다. Trigger 권한 문제가 발생할 수 있습니다.');
  console.log('   권장: .env에 VITE_SUPABASE_SERVICE_ROLE_KEY 추가');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// CSV 파일 목록 (순차 처리)
const CSV_FILES = [
  {
    name: 'golf_baseData.csv',
    path: '../public/golf_baseData.csv',
    category: 'golf'
  },
  {
    name: 'condo_baseData_1.csv',
    path: '../public/condo_baseData_1.csv',
    category: 'condo'
  },
  {
    name: 'condo_baseData_2.csv',
    path: '../public/condo_baseData_2.csv',
    category: 'condo'
  },
  {
    name: 'fitness_baseData.csv',
    path: '../public/fitness_baseData.csv',
    category: 'fitness'
  }
];

// 배치 사이즈 (Supabase는 한번에 많은 데이터를 처리할 수 있지만 안정성을 위해 분할)
const BATCH_SIZE = 1000;

/**
 * 필수 테이블 존재 여부 확인
 */
async function checkRequiredTables() {
  console.log('   🔍 필수 테이블 확인 중...\n');

  // memberships 테이블 확인
  const { data: membershipsData, error: membershipsError } = await supabase
    .from('memberships')
    .select('id')
    .limit(1);

  if (membershipsError) {
    console.error('   ❌ memberships 테이블이 존재하지 않습니다!');
    console.error('   📋 다음 단계를 수행하세요:\n');
    console.error('   1. Supabase Dashboard에 로그인');
    console.error('   2. SQL Editor 메뉴로 이동');
    console.error('   3. database/schema.sql 파일의 내용을 복사하여 실행');
    console.error('   4. 스키마가 정상적으로 생성되면 다시 이 스크립트를 실행\n');
    console.error('   💡 또는 database/setup-supabase.js 스크립트를 먼저 실행하세요.\n');
    return false;
  }

  // price_history 테이블 확인
  const { data: priceData, error: priceError } = await supabase
    .from('price_history')
    .select('id')
    .limit(1);

  if (priceError) {
    console.error('   ❌ price_history 테이블이 존재하지 않습니다!');
    console.error('   📋 schema.sql을 Supabase에 적용해주세요.\n');
    return false;
  }

  // memberships 테이블에 데이터가 있는지 확인
  const { count, error: countError } = await supabase
    .from('memberships')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('   ❌ memberships 테이블 조회 중 오류:', countError.message);
    return false;
  }

  if (count === 0) {
    console.error('   ⚠️  memberships 테이블에 데이터가 없습니다!');
    console.error('   📋 price_history 데이터는 memberships의 c_id를 참조합니다.');
    console.error('   💡 먼저 memberships 테이블에 회원권 데이터를 입력해주세요.\n');
    return false;
  }

  console.log('   ✅ memberships 테이블 확인 완료 (' + count + '개 레코드)');
  console.log('   ✅ price_history 테이블 확인 완료');
  console.log('   ✅ 모든 필수 테이블이 준비되었습니다!\n');
  
  return true;
}

/**
 * CSV 파일을 읽어서 데이터 배열로 반환
 */
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // c_id, date, price를 price_history 테이블 형식으로 변환
        results.push({
          c_id: parseInt(row.c_id),
          date: row.date,
          price: parseInt(row.price)
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

/**
 * 데이터를 배치로 Supabase에 삽입
 */
async function insertBatch(data, batchIndex, totalBatches, fileName) {
  const { data: result, error } = await supabase
    .from('price_history')
    .insert(data);

  if (error) {
    console.error(`   ❌ 배치 ${batchIndex}/${totalBatches} 삽입 실패:`, error.message);
    throw error;
  }

  console.log(`   ✅ 배치 ${batchIndex}/${totalBatches} 삽입 완료 (${data.length}개 레코드)`);
}

/**
 * 데이터를 배치로 나눠서 순차적으로 삽입
 */
async function insertDataInBatches(allData, fileName) {
  const totalBatches = Math.ceil(allData.length / BATCH_SIZE);
  
  console.log(`   📦 총 ${allData.length}개 레코드를 ${totalBatches}개 배치로 나눠서 삽입합니다...`);

  for (let i = 0; i < allData.length; i += BATCH_SIZE) {
    const batch = allData.slice(i, i + BATCH_SIZE);
    const batchIndex = Math.floor(i / BATCH_SIZE) + 1;
    
    await insertBatch(batch, batchIndex, totalBatches, fileName);
    
    // 배치 간 짧은 딜레이 (API Rate Limit 방지)
    if (i + BATCH_SIZE < allData.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

/**
 * 단일 CSV 파일 처리
 */
async function processFile(fileInfo) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 파일 처리 시작: ${fileInfo.name}`);
  console.log(`${'='.repeat(60)}`);

  try {
    // 1. CSV 파일 읽기
    console.log(`   📖 CSV 파일 읽는 중...`);
    const data = await readCSV(fileInfo.path);
    console.log(`   ✅ CSV 파일 읽기 완료: ${data.length}개 레코드`);

    // 2. 데이터 검증
    if (data.length === 0) {
      console.log(`   ⚠️  데이터가 없습니다. 건너뜁니다.`);
      return { fileName: fileInfo.name, success: true, count: 0, skipped: true };
    }

    // 3. Supabase에 삽입
    console.log(`   💾 Supabase에 데이터 삽입 중...`);
    await insertDataInBatches(data, fileInfo.name);
    
    console.log(`   ✅ ${fileInfo.name} 처리 완료!`);
    return { fileName: fileInfo.name, success: true, count: data.length };

  } catch (error) {
    console.error(`   ❌ ${fileInfo.name} 처리 실패:`, error.message);
    return { fileName: fileInfo.name, success: false, error: error.message };
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     Price Data Import to Supabase (priceDB)             ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(`\n🚀 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`📋 처리할 파일: ${CSV_FILES.length}개\n`);

  // 필수 테이블 존재 여부 확인
  console.log('='.repeat(60));
  console.log('📋 사전 검증: 데이터베이스 테이블 확인');
  console.log('='.repeat(60) + '\n');
  
  const tablesReady = await checkRequiredTables();
  
  if (!tablesReady) {
    console.error('❌ 필수 테이블이 준비되지 않았습니다. 스크립트를 종료합니다.\n');
    process.exit(1);
  }

  const results = [];
  const startTime = Date.now();

  // 순차적으로 각 파일 처리
  for (const fileInfo of CSV_FILES) {
    const result = await processFile(fileInfo);
    results.push(result);
  }

  // 최종 결과 출력
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                    최종 결과                             ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  let totalSuccess = 0;
  let totalFailed = 0;
  let totalRecords = 0;

  results.forEach((result) => {
    if (result.success) {
      totalSuccess++;
      totalRecords += result.count;
      const status = result.skipped ? '⚠️  건너뜀' : '✅ 성공';
      console.log(`${status}  ${result.fileName.padEnd(25)} - ${result.count.toLocaleString()}개 레코드`);
    } else {
      totalFailed++;
      console.log(`❌ 실패  ${result.fileName.padEnd(25)} - ${result.error}`);
    }
  });

  console.log('\n' + '─'.repeat(60));
  console.log(`총 처리: ${CSV_FILES.length}개 파일`);
  console.log(`성공: ${totalSuccess}개`);
  console.log(`실패: ${totalFailed}개`);
  console.log(`총 레코드: ${totalRecords.toLocaleString()}개`);
  console.log(`소요 시간: ${duration}초`);
  console.log('─'.repeat(60) + '\n');

  if (totalFailed > 0) {
    console.log('⚠️  일부 파일 처리에 실패했습니다.');
    process.exit(1);
  } else {
    console.log('🎉 모든 파일이 성공적으로 처리되었습니다!\n');
    process.exit(0);
  }
}

// 스크립트 실행
main().catch((error) => {
  console.error('\n❌ 치명적 오류 발생:', error);
  process.exit(1);
});

