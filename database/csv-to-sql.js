const fs = require('fs');
const csvParser = require('csv-parser');

const results = [];

fs.createReadStream('../public/mainDB_data.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    results.push(row);
  })
  .on('end', () => {
    console.log(`CSV 파일 읽기 완료: ${results.length}개 레코드`);

    // SQL INSERT 문 생성
    let sql = `-- ============================================
-- mainDB (memberships) 초기 데이터
-- ============================================
-- 총 ${results.length}개 골프 회원권 데이터

INSERT INTO memberships (category, product_name, membership_name, location) VALUES\n`;

    const values = results.map((row, index) => {
      const category = row.category.replace(/'/g, "''");
      const productName = row.product_name.replace(/'/g, "''");
      const membershipName = row.membership_name.replace(/'/g, "''");
      const location = row.location.replace(/'/g, "''");

      const isLast = index === results.length - 1;
      return `('${category}', '${productName}', '${membershipName}', '${location}')${isLast ? ';' : ','}`;
    }).join('\n');

    sql += values;

    // 파일로 저장
    fs.writeFileSync('mainDB_data.sql', sql, 'utf8');
    console.log('SQL 파일 생성 완료: mainDB_data.sql');
  });
