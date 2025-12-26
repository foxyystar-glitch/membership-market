/**
 * 브랜드 아이덴티티 색상 설정
 * 이 파일의 색상값만 수정하면 전체 애플리케이션에 적용됩니다.
 */

export const colors = {
  // 브랜드 색상
  brand: '#284AB5',

  // 카테고리 색상
  golf: '#10A369',
  condo: '#FD8100',
  fitness: '#8850BF',

  // 특수 카테고리
  urgent: '#FA3766',
  presale: '#4f46e5',  // indigo-600 (기존값 유지)

  // 기타 UI 색상
  textGray: '#999999',
  textWhite: '#FFFFFF',
  selectedLight: '#AFC6FD'
};

// Tailwind border 클래스 매핑 (기존 코드 호환성)
export const borderColors = {
  golf: 'border-green-600',
  condo: 'border-blue-600',
  fitness: 'border-purple-600',
  urgent: 'border-red-600',
  presale: 'border-indigo-600'
};
